#!/usr/bin/env python3
"""
mksettings.py - Generate a Zephyr NVS settings partition binary image from a JSON config.

Usage:
    python mksettings.py <json_file> <root_path> <output_file>
                         [--sector-size N] [--partition-size N]
                         [--write-block-size N]

JSON structure expected:
    {
      "schema_version": 1,
      "<name>": {
        "type": "...",   # ignored
        "ver": <int>,    # -> <root>/<name>/s
        "cfg_ver": <int>,# -> <root>/<name>/v
        "cfg": { "<key>": <value>, ... },  # -> <root>/<name>/c/<key>
        "cmp": {         # nested components
          "<cmp_name>": { "ver": ..., "cfg_ver": ..., "cfg": {...}, "cmp": {...} }
          # -> <root>/<name>/n/<cmp_name>/...
        }
      }
    }

NVS settings backend ID scheme (settings_nvs.h):
    NVS_NAMECNT_ID    = 0x8000  -> stores last_name_id as uint16_t
    NVS_NAME_ID_OFFSET = 0x4000
    Entry i (1-based): name at NVS ID (0x8000 + i), value at NVS ID (0xC000 + i)

NVS sector binary layout (nvs.c):
    [offset 0 ...............]  data area (grows forward)
    [...................0xFF ]  unused
    [sector_size-(N+1)*8 ..]  data ATE N-1  (most recently written, lowest address)
    [......................]  ...
    [sector_size-16 .......]  data ATE 0    (first written, highest data-ATE address)
    [sector_size-8  .......]  close ATE     (id=0xFFFF,len=0) OR 0xFF if sector is open
"""

import argparse
import json
import struct
import sys

# ---------------------------------------------------------------------------
# NVS settings constants (from settings_nvs.h)
# ---------------------------------------------------------------------------
NVS_NAMECNT_ID     = 0x8000   # NVS ID that stores last_name_id counter
NVS_NAME_ID_OFFSET = 0x4000   # value_id = name_id + NVS_NAME_ID_OFFSET

ATE_SIZE = 8  # sizeof(struct nvs_ate), always 8 bytes


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def align_up(n, align):
    """Round n up to the next multiple of align (align must be a power of 2)."""
    if align <= 1:
        return n
    return (n + align - 1) & ~(align - 1)


def crc8_ccitt(data):
    """CRC8 with CCITT polynomial 0x07, initial value 0xFF (matches Zephyr crc8_ccitt)."""
    crc = 0xFF
    for byte in data:
        crc ^= byte
        for _ in range(8):
            crc = ((crc << 1) ^ 0x07) & 0xFF if (crc & 0x80) else (crc << 1) & 0xFF
    return crc


def make_ate(nvs_id, offset, length, part=0xFF):
    """
    Build an 8-byte NVS Allocation Table Entry.

    struct nvs_ate {
        uint16_t id;     // data id
        uint16_t offset; // data offset within sector
        uint16_t len;    // data len within sector
        uint8_t  part;   // 0xFF = complete (non-multipart)
        uint8_t  crc8;   // crc8_ccitt over the first 7 bytes
    }
    """
    header = struct.pack('<HHHB', nvs_id, offset, length, part)
    return header + struct.pack('B', crc8_ccitt(header))


# ---------------------------------------------------------------------------
# JSON → settings key-value extraction
# ---------------------------------------------------------------------------

def extract_entries(obj, path):
    """
    Recursively extract (key_path: str, value: bytes) pairs from a config object.

    Mapping rules:
      obj[type]          -> path/t  : UTF-8 string
      obj['ver']         -> path/s  : uint32 LE
      obj['cfg_ver']     -> path/v  : uint32 LE
      obj['cfg'][key]    -> path/c/<key> : uint32 LE (int) or raw UTF-8 (str/float)
      obj['cmp'][name]   -> path/n/<name>/... (recursive)
    """
    entries = []

    if 'type' in obj:
        entries.append((f"{path}/t", obj['type'].encode('utf-8')))

    if 'ver' in obj:
        entries.append((f"{path}/s", struct.pack('<I', int(obj['ver']))))

    if 'cfg_ver' in obj:
        entries.append((f"{path}/v", struct.pack('<I', int(obj['cfg_ver']))))

    if 'cfg' in obj:
        for key, val in obj['cfg'].items():
            key_path = f"{path}/c/{key}"
            if isinstance(val, str):
                entries.append((key_path, val.encode('utf-8')))
            elif isinstance(val, int):
                entries.append((key_path, struct.pack('<I', val)))
            elif isinstance(val, float):
                entries.append((key_path, struct.pack('<f', val)))
            else:
                raise ValueError(f"Unsupported value type for '{key_path}': {type(val)}")

    if 'cmp' in obj:
        for name, nested in obj['cmp'].items():
            entries.extend(extract_entries(nested, f"{path}/n/{name}"))

    return entries


def parse_config(json_data, root_path):
    """Extract all (key_path, value_bytes) settings from the top-level JSON object."""
    entries = []
    for key, val in json_data.items():
        if key == 'schema_version':
            continue
        if isinstance(val, dict):
            entries.extend(extract_entries(val, f"{root_path}/{key}"))
    return entries


# ---------------------------------------------------------------------------
# NVS binary image builder
# ---------------------------------------------------------------------------

def _build_sector(entries, sector_size, closed):
    """
    Build one NVS sector.

    entries : list of (nvs_id, data_bytes, data_offset_in_sector)
    closed  : if True, write a close ATE at sector_size-8

    Sector ATE layout (address relative to sector start):
      sector_size - 8              : close ATE  (if closed) or 0xFF (if open)
      sector_size - 16             : ATE for entries[0]  (first/oldest)
      sector_size - 24             : ATE for entries[1]
      ...
      sector_size - (N+1)*ATE_SIZE : ATE for entries[N-1] (last/most-recent)
    """
    sector = bytearray(b'\xFF' * sector_size)

    # Write data blobs
    for nvs_id, data_bytes, offset in entries:
        sector[offset:offset + len(data_bytes)] = data_bytes

    n = len(entries)

    # Write data ATEs: entry[0] → sector_size-16 (first written = oldest)
    #                  entry[1] → sector_size-24
    #                  ...
    for j, (nvs_id, data_bytes, offset) in enumerate(entries):
        ate = make_ate(nvs_id, offset, len(data_bytes))
        ate_pos = sector_size - (j + 2) * ATE_SIZE  # +2: slot 0 is the close-ATE slot
        print(f"  Entry id=0x{nvs_id:04X}, offset={offset}, len={len(data_bytes)} → ATE at sector offset {ate_pos}")
        sector[ate_pos:ate_pos + ATE_SIZE] = ate

    if closed:
        # close_ate.offset must point to the LAST data ATE address (relative to sector).
        # The last data ATE is at sector_size - (n+1)*ATE_SIZE.
        # nvs_prev_ate uses this to jump directly to the newest entry when crossing sectors.
        close_offset = sector_size - (n + 1) * ATE_SIZE
        close_ate = make_ate(0xFFFF, close_offset, 0)
        print(f"  Close ATE at sector offset {sector_size - ATE_SIZE}")
        sector[sector_size - ATE_SIZE:sector_size] = close_ate

    return sector


def build_nvs_image(settings, sector_size, partition_size, wb_size):
    """
    Build the full NVS partition binary image.

    settings       : list of (key_path: str, value: bytes)
    sector_size    : NVS sector size in bytes
    partition_size : total partition size in bytes
    wb_size        : flash write-block size for data alignment
    """
    n_total_sectors = partition_size // sector_size

    # ------------------------------------------------------------------
    # Build the flat list of NVS ID → data mappings
    # ------------------------------------------------------------------
    N = len(settings)
    last_name_id = NVS_NAMECNT_ID + N  # Zephyr settings_nvs: last_name_id starts at NVS_NAMECNT_ID (0x8000)

    nvs_entries = []

    # Counter entry first (settings backend reads this on init)
    nvs_entries.append((NVS_NAMECNT_ID, struct.pack('<H', last_name_id)))

    # One name + one value entry per setting
    for i, (path, value_bytes) in enumerate(settings, start=1):
        name_id = NVS_NAMECNT_ID + i               # 0x8001 .. 0x8000+N
        val_id  = name_id + NVS_NAME_ID_OFFSET     # 0xC001 .. 0xC000+N
        # Name stored WITHOUT null terminator (matches settings_nvs_save: strlen, not strlen+1)
        nvs_entries.append((name_id, path.encode('utf-8')))
        nvs_entries.append((val_id,  value_bytes))

    # ------------------------------------------------------------------
    # Distribute NVS entries across sectors
    #
    # Fitting condition (ensures data and ATEs never overlap, and
    # one slot is always reserved for the close ATE at sector_size-8):
    #
    #   data_ptr + align_up(entry_len) + (n_ates + 2) * ATE_SIZE <= sector_size
    #
    # (n_ates+1 for the new data ATE, +1 for the close ATE slot)
    # ------------------------------------------------------------------
    sector_batches = []   # list of lists of (nvs_id, data_bytes, offset)
    current_batch  = []
    data_ptr = 0
    n_ates   = 0

    for nvs_id, data_bytes in nvs_entries:
        entry_len   = len(data_bytes)
        padded_len  = align_up(entry_len, wb_size)

        if data_ptr + padded_len + (n_ates + 2) * ATE_SIZE <= sector_size:
            current_batch.append((nvs_id, data_bytes, data_ptr))
            data_ptr += padded_len
            n_ates   += 1
        else:
            if not current_batch:
                raise ValueError(
                    f"NVS entry id=0x{nvs_id:04X} ({entry_len} bytes) is too large "
                    f"to fit in a single sector (sector_size={sector_size}). "
                    f"Maximum data per entry: {sector_size - 4 * ATE_SIZE} bytes."
                )
            sector_batches.append(current_batch)
            current_batch = [(nvs_id, data_bytes, 0)]
            data_ptr = padded_len
            n_ates   = 1

    sector_batches.append(current_batch)

    # ------------------------------------------------------------------
    # Validate partition has enough sectors:
    #   n_closed_sectors + 1 open sector + 1 spare (GC) sector
    # ------------------------------------------------------------------
    n_closed   = len(sector_batches)
    n_required = n_closed + 2
    if n_total_sectors < n_required:
        raise ValueError(
            f"Partition too small: need at least {n_required} sectors "
            f"({n_required * sector_size} bytes), but partition has only "
            f"{n_total_sectors} ({partition_size} bytes). "
            f"Increase --partition-size or --sector-size."
        )

    # ------------------------------------------------------------------
    # Build the binary image
    # ------------------------------------------------------------------
    image = bytearray(b'\xFF' * partition_size)

    for i, batch in enumerate(sector_batches):
        sector = _build_sector(batch, sector_size, closed=True)
        start  = i * sector_size
        image[start:start + sector_size] = sector

    print(f"Distributed {len(nvs_entries)} NVS entries across {n_closed} closed sectors "
          f"({n_closed * sector_size} bytes), out of {n_total_sectors} total sectors in the partition.")

    # Pre-write the GC done ATE into the first open sector.
    #
    # On startup, nvs_startup checks:
    #   if (ate_wra & ADDR_OFFS_MASK) == (sector_size - 2*ATE_SIZE)
    # and if so calls nvs_add_gc_done_ate() to write a marker ATE to flash.
    # This fails with -EIO if the flash programmer skipped writing the all-0xFF
    # open sector (smart programming optimisation), leaving stale content there.
    #
    # By pre-writing the GC done ATE here the programmer is forced to erase+write
    # that flash page, and nvs_startup will find ate_wra one slot lower so the
    # condition no longer triggers.
    #
    # GC done ATE: id=0xFFFF, offset=0 (data_wra=0 since nothing written yet),
    #              len=0, placed at open_sector + sector_size - 2*ATE_SIZE.
    open_sector_start = n_closed * sector_size
    gc_done_ate = make_ate(0xFFFF, 0, 0)
    gc_done_pos = open_sector_start + sector_size - 2 * ATE_SIZE
    image[gc_done_pos:gc_done_pos + ATE_SIZE] = gc_done_ate
    print(f"  Pre-wrote GC done ATE at open sector offset {sector_size - 2 * ATE_SIZE} "
          f"(binary offset {gc_done_pos})")

    # Sector layout after generation:
    #   sector[0 .. n_closed-1]   -> closed (data + close ATE)
    #   sector[n_closed]          -> open/active (GC done ATE pre-written, close ATE = 0xFF)
    #   sector[n_closed+1 .. end] -> spare (GC buffer, all 0xFF)

    return bytes(image)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description='Generate a Zephyr NVS settings partition image from a JSON config file.'
    )
    parser.add_argument('json_file',    help='Path to the JSON config file')
    parser.add_argument('root_path',    help='Settings root path, e.g. "xube/cfg"')
    parser.add_argument('output_file',  help='Output binary image path')
    parser.add_argument(
        '--sector-size', type=int, default=4096,
        help='NVS sector size in bytes (default: 4096). '
             'Must be a divisor of --partition-size.'
    )
    parser.add_argument(
        '--partition-size', type=int, default=32768,
        help='Total partition size in bytes (default: 32768 = 8 × 4 KB sectors). '
             'Must be a multiple of --sector-size.'
    )
    parser.add_argument(
        '--write-block-size', type=int, default=4,
        help='Flash write-block size for data alignment (default: 4). '
             'Match your MCU\'s flash write granularity.'
    )
    args = parser.parse_args()

    # Validate geometry
    if args.partition_size % args.sector_size != 0:
        print(
            f"Error: --partition-size ({args.partition_size}) must be a multiple of "
            f"--sector-size ({args.sector_size}).",
            file=sys.stderr
        )
        sys.exit(1)

    if args.partition_size // args.sector_size < 2:
        print("Error: partition must contain at least 2 sectors.", file=sys.stderr)
        sys.exit(1)

    # Load JSON
    with open(args.json_file) as f:
        config = json.load(f)

    # Extract settings
    settings = parse_config(config, args.root_path)

    if not settings:
        print("Warning: no settings found in JSON (check root_path and JSON structure).",
              file=sys.stderr)

    # Print summary
    print(f"Settings ({len(settings)} entries):")
    for path, val_bytes in settings:
        if len(val_bytes) > 40:
            preview = val_bytes[:40].hex() + f"…  ({len(val_bytes)} bytes)"
        else:
            try:
                preview = repr(val_bytes.decode('utf-8')) + f"  ({len(val_bytes)} bytes)"
            except UnicodeDecodeError:
                preview = val_bytes.hex() + f"  ({len(val_bytes)} bytes)"
        print(f"  {path}: {preview}")

    # Build image
    image = build_nvs_image(
        settings,
        sector_size=args.sector_size,
        partition_size=args.partition_size,
        wb_size=args.write_block_size,
    )

    # Write output
    with open(args.output_file, 'wb') as f:
        f.write(image)

    n_sectors = args.partition_size // args.sector_size
    print(
        f"\nWrote {len(image)} bytes → {args.output_file}\n"
        f"  sector_size={args.sector_size}, sectors={n_sectors}, "
        f"write_block_size={args.write_block_size}"
    )


if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""
bin_to_sparse_hex.py - Convert a binary file to a sparse Intel HEX file.

Skips double-words (64-bit) that are all 0xFF, preserving the flash ECC
erased state on STM32WB55. Programming 0xFF words via a binary write burns
the ECC bits for those addresses, causing PROGERR on the next NVS write.

Usage: bin_to_sparse_hex.py <input.bin> <output.hex> <base_address>
"""

import sys
from intelhex import IntelHex

DWORD_SIZE = 8  # STM32WB55 programs in 64-bit double-words
ERASED_DWORD = b'\xff' * DWORD_SIZE


def bin_to_sparse_hex(bin_path, hex_path, base_addr):
    with open(bin_path, 'rb') as f:
        data = f.read()

    # Pad to double-word boundary
    remainder = len(data) % DWORD_SIZE
    if remainder:
        data += b'\xff' * (DWORD_SIZE - remainder)

    sparse = IntelHex()
    for i in range(0, len(data), DWORD_SIZE):
        dword = data[i:i + DWORD_SIZE]
        if dword != ERASED_DWORD:
            sparse.puts(base_addr + i, dword)

    sparse.write_hex_file(hex_path)
    print(f"Wrote sparse HEX: {hex_path} "
          f"({sum(1 for i in range(0, len(data), DWORD_SIZE) if data[i:i+DWORD_SIZE] != ERASED_DWORD)} "
          f"of {len(data) // DWORD_SIZE} double-words programmed)")


if __name__ == '__main__':
    if len(sys.argv) != 4:
        print(f"Usage: {sys.argv[0]} <input.bin> <output.hex> <base_address>")
        sys.exit(1)
    bin_to_sparse_hex(sys.argv[1], sys.argv[2], int(sys.argv[3], 16))

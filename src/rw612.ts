import { $ } from "bun";
import { readFile, stat, writeFile } from "fs/promises";
import ora from "ora";
import { tmpdir } from "os";
import { resolve } from "path";
import which from "which";

const SUCCESS_LINE = /Erased \d+ bytes \(\d+ sectors\), programmed \d+ bytes \(\d+ pages\)/;
const TRANSIENT_SWD_FAILURE = /SWD\/JTAG communication failure/;

// SRAM-based custom flasher constants (mirrors rw612_flash.py)
const CODE_ADDR = 0x20000000;
const RESULT_ADDR = 0x20003000;
const PARAM_ADDR = 0x20003100;
const DATA_ADDR = 0x20010000;
const CHUNK_SIZE = 0xb0000; // 704 KB — fits in SRAM data area
const DONE_SENTINEL = 0x600d600d;
const SRAM_FLASHER_BIN = resolve(import.meta.dir, "bin", "sram_flasher.bin");

export interface Rw612FlashEntry {
  path: string;
  flashBase: string;
  label: string;
}

export interface Rw612FlashOptions {
  deviceId: string;
  entries: Rw612FlashEntry[];
}

const requireCli = async (cli: string, install: string): Promise<void> => {
  try {
    await which(cli);
  } catch {
    throw new Error(
      `${cli} is required to flash RW612 devices but was not found on PATH. ${install}`
    );
  }
};

const detectProbeUID = async (): Promise<string> => {
  const command = $`pyocd list --probe`;
  const { exitCode, stdout, stderr } = await command.nothrow().quiet();
  if (exitCode !== 0) {
    const stderrStr = stderr.toString();
    throw new Error(
      `Failed to list pyocd probes. Exit code ${exitCode}. Stderr: ${stderrStr}`
    );
  }
  // Locate "Unique ID" column
  const stdoutStr = stdout.toString();
  const lines = stdoutStr.split("\n").map((line) => line.trim());
  const header = lines.find((line) => line.includes("Unique ID"));
  if (header) {
    const uidIndex = header.split(/\s{2,}/).indexOf("Unique ID");
    if (uidIndex !== -1) {
      // Locate line containing "CMSIS-DAP" and extract UID
      const probeLine = lines.find((line) => line.includes("CMSIS-DAP"));
      if (probeLine) {
        const columns = probeLine.split(/\s{2,}/);
        if (columns.length > uidIndex) {
          const uid = columns[uidIndex];
          if (uid) {
            return uid;
          }
        }
      }
    }
  }
  throw new Error(`Failed to detect debug probe UID`);
}

const hex = (n: number) => `0x${n.toString(16)}`;

const pyocdCmds = async (probeUID: string, cmds: string[]): Promise<string> => {
  const command = `pyocd commander --target rw612 --uid ${probeUID} ${cmds.map((c) => `-c ${JSON.stringify(c)}`).join(" ")}`;
  const result = await $`${{ raw: command }}`.nothrow().quiet();
  const raw = result.stdout.toString() + result.stderr.toString();
  return raw
    .split("\n")
    .filter(
      (l) =>
        !l.includes("UserWarning") &&
        !l.includes("capstone") &&
        !l.includes("pkg_resources") &&
        !l.includes("setuptools")
    )
    .join("\n")
    .trim();
};

const readResultWords = (output: string): number[] => {
  const values: number[] = [];
  for (const line of output.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.includes(":") || !/^[0-9a-fA-F]/.test(trimmed)) continue;
    const colonIdx = trimmed.indexOf(":");
    let hexPart = trimmed.slice(colonIdx + 1).trim();
    if (hexPart.includes("|")) hexPart = hexPart.slice(0, hexPart.indexOf("|")).trim();
    for (const word of hexPart.split(/\s+/)) {
      if (word.length === 8 && /^[0-9a-fA-F]+$/.test(word)) {
        values.push(parseInt(word, 16));
      }
    }
  }
  return values;
};

const resetAndDebug = async (probeUID: string): Promise<void> => {
  const output = await pyocdCmds(probeUID, ["reset halt"]);
  if (!output.toLowerCase().includes("successfully halted")) {
    throw new Error("Failed to reset device and start debug session");
  }
};

const resetDevice = async (probeUID: string): Promise<void> => {
  const output = await pyocdCmds(probeUID, ["reset --type hardware", "go"]);
  if (!output.toLowerCase().includes("resetting target")) {
    throw new Error("Failed to reset device");
  }
};

const programChunk = async (
  probeUID: string,
  chunkData: Buffer,
  flashAddr: number,
  chunkNum: number,
  skipBpClear: boolean,
  bytesBeforeChunk: number,
  totalBytes: number
): Promise<void> => {
  const dataFile = resolve(tmpdir(), `flash_chunk_${chunkNum}.bin`);
  const paramFile = resolve(tmpdir(), `flash_params_${chunkNum}.bin`);

  const pad = (4 - (chunkData.length % 4)) % 4;
  const padded = pad ? Buffer.concat([chunkData, Buffer.alloc(pad, 0xff)]) : chunkData;
  await writeFile(dataFile, padded);

  const params = Buffer.alloc(12);
  params.writeUInt32LE(flashAddr, 0);
  params.writeUInt32LE(chunkData.length, 4);
  params.writeUInt32LE(skipBpClear ? 1 : 0, 8);
  await writeFile(paramFile, params);

  const loadOutput = await pyocdCmds(probeUID, [
    "halt",
    `fill 32 ${hex(RESULT_ADDR)} 32 0`,
    `loadmem ${hex(CODE_ADDR)} ${SRAM_FLASHER_BIN}`,
    `loadmem ${hex(PARAM_ADDR)} ${paramFile}`,
    `loadmem ${hex(DATA_ADDR)} ${dataFile}`,
    `wreg pc ${hex(CODE_ADDR)}`,
    "go",
  ]);

  if (
    loadOutput.toLowerCase().includes("error") &&
    !loadOutput.toLowerCase().includes("successfully")
  ) {
    process.stdout.write("\n");
    console.error(`Load failed:\n${loadOutput}`);
    throw new Error("Failed to load chunk");
  }

  const sectors = Math.ceil(chunkData.length / 4096);
  const pages = Math.ceil((chunkData.length - sectors * 4096) / 256);
  const maxWaitMs = Math.max(30, sectors + pages * 0.01 + 5) * 1000;
  const start = Date.now();

  while (Date.now() - start < maxWaitMs) {
    await Bun.sleep(1000);

    const pollOutput = await pyocdCmds(probeUID, [
      "halt",
      `read32 ${hex(RESULT_ADDR + 0x18)}`,
      `read32 ${hex(RESULT_ADDR + 0x04)}`,
    ]);

    const vals = readResultWords(pollOutput);
    if (vals.length >= 2 && vals[0] === DONE_SENTINEL) {
      const resultOutput = await pyocdCmds(probeUID, [
        `read32 ${hex(RESULT_ADDR)}`,
        `read32 ${hex(RESULT_ADDR + 0x04)}`,
        `read32 ${hex(RESULT_ADDR + 0x08)}`,
        `read32 ${hex(RESULT_ADDR + 0x0c)}`,
        `read32 ${hex(RESULT_ADDR + 0x10)}`,
        `read32 ${hex(RESULT_ADDR + 0x14)}`,
      ]);
      const rvals = readResultWords(resultOutput);
      if (rvals.length >= 6) {
        const rStatus = rvals[1]!;
        const rVerr = rvals[4]!;
        const rLastSr = rvals[5]!;
        if (rStatus !== 1) {
          const extra =
            rVerr > 0
              ? `  mismatch @0x${rLastSr.toString(16).toUpperCase().padStart(6, "0")}`
              : "";
          throw new Error(`Chunk ${chunkNum} failed (status=0x${rStatus.toString(16)})${extra}, output:\n++${resultOutput}++`);
        }
        return;
      }
      console.error(`Unexpected result format for chunk ${chunkNum}, output:\n++${resultOutput}++`);
      break;
    }

    await pyocdCmds(probeUID, ["go"]);
  }
  throw new Error(`Chunk ${chunkNum} programming timed out`);
};

const flashCustom = async (entry: Rw612FlashEntry): Promise<void> => {
  const probeUID = await detectProbeUID();
  const data = await readFile(entry.path);

  let flashBase = parseInt(entry.flashBase, 16);
  if (flashBase >= 0x18000000) {
    flashBase -= 0x18000000;
  } else if (flashBase >= 0x08000000) {
    flashBase -= 0x08000000;
  }

  const chunks: Array<{ addr: number; data: Buffer }> = [];
  for (let offset = 0; offset < data.length; offset += CHUNK_SIZE) {
    const end = Math.min(offset + CHUNK_SIZE, data.length);
    chunks.push({ addr: flashBase + offset, data: Buffer.from(data.subarray(offset, end)) });
  }
  await resetAndDebug(probeUID);

  let bytesBefore = 0;

  for (let i = 0; i < chunks.length; i++) {
    const { addr, data: chunkData } = chunks[i]!;
    let result: boolean = false;
    for (let retry = 0; retry < 3; retry++) {
      try {
        await programChunk(probeUID, chunkData, addr, i, i > 0, bytesBefore, data.length);
        result = true;
        break;
      } catch (error) {
      }
    }
    if (!result) {
      throw new Error(`Failed to program chunk ${i} after 3 attempts`);
    }
    bytesBefore += chunkData.length;
  }

  await resetDevice(probeUID);
};

const verifyEntries = async (entries: Rw612FlashEntry[]): Promise<void> => {
  for (const entry of entries) {
    const info = await stat(entry.path).catch(() => null);
    if (!info) throw new Error(`artefact missing: ${entry.path}`);
    if (info.size === 0) throw new Error(`artefact is empty: ${entry.path}`);
  }
};

const loadOne = async (entry: Rw612FlashEntry): Promise<boolean> => {
  let spinner = ora();
  spinner.start(
    `Programming ${entry.label} (${entry.path}) at ${entry.flashBase}...`
  );
  try {
    await flashCustom(entry);
    spinner.succeed(`Successfully programmed ${entry.label}`);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    spinner.fail(`Failed to program ${entry.label}: ${message}`);
    return false;
  }
};

export async function flashWithRw612(
  options: Rw612FlashOptions
): Promise<boolean> {
  console.log(
    `⚡Flashing ${options.deviceId} (MCU-Link / CMSIS-DAP, RW612)...`
  );

  try {
    await verifyEntries(options.entries);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ Pre-flight check failed: ${message}`);
    return false;
  }

  try {
    await requireCli(
      "pyocd",
      "Install with: pipx install pyocd  (or pip install pyocd)."
    );
  } catch (error) {
    console.error(
      `❌ ${error instanceof Error ? error.message : String(error)}`
    );
    return false;
  }

  for (const entry of options.entries) {
    const ok = await loadOne(entry);
    if (!ok) return false;
  }
  return true;
}

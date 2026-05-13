import { $ } from "bun";
import { stat } from "fs/promises";
import which from "which";

const SUCCESS_LINE = /Erased \d+ bytes \(\d+ sectors\), programmed \d+ bytes \(\d+ pages\)/;
const TRANSIENT_SWD_FAILURE = /SWD\/JTAG communication failure/;

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
  const { exitCode, stdout, stderr } = await command.nothrow();
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
  if (!header) {
    throw new Error(`Could not find "Unique ID" column in pyocd list output.`);
  }
  const uidIndex = header.split(/\s{2,}/).indexOf("Unique ID");
  if (uidIndex === -1) {
    throw new Error(`Could not determine index of "Unique ID" column.`);
  }
  // Locate line containing "CMSIS-DAP" and extract UID
  const probeLine = lines.find((line) => line.includes("CMSIS-DAP"));
  if (!probeLine) {
    throw new Error(`Could not find a CMSIS-DAP probe in pyocd list output.`);
  }
  const columns = probeLine.split(/\s{2,}/);
  if (columns.length <= uidIndex) {
    throw new Error(
      `Probe line does not have enough columns to extract UID: ${probeLine}`
    );
  }
  const uid = columns[uidIndex];
  if (!uid) {
    throw new Error(`Extracted UID is empty from line: ${probeLine}`);
  }
  return uid;
}

const verifyEntries = async (entries: Rw612FlashEntry[]): Promise<void> => {
  for (const entry of entries) {
    const info = await stat(entry.path).catch(() => null);
    if (!info) throw new Error(`artefact missing: ${entry.path}`);
    if (info.size === 0) throw new Error(`artefact is empty: ${entry.path}`);
  }
};

interface LoadResult {
  ok: boolean;
  transient: boolean;
}

const loadOnce = async (entry: Rw612FlashEntry): Promise<LoadResult> => {
  const fileArg = `${entry.path}@${entry.flashBase}`;
  const probeUID = await detectProbeUID();
  const command = $`pyocd load --target rw612 --format bin --uid ${probeUID} ${fileArg}`;
  const { exitCode, stdout, stderr } = await command.nothrow();
  const stdoutStr = stdout.toString();
  const stderrStr = stderr.toString();
  const combined = stdoutStr + stderrStr;

  if (stdoutStr.length > 0) {
    process.stdout.write(stdoutStr);
    if (!stdoutStr.endsWith("\n")) process.stdout.write("\n");
  }
  if (stderrStr.length > 0) {
    console.log("--- pyocd Stderr ---");
    process.stdout.write(stderrStr);
    if (!stderrStr.endsWith("\n")) process.stdout.write("\n");
  }

  const success = SUCCESS_LINE.test(combined);
  const transient = TRANSIENT_SWD_FAILURE.test(combined);

  if (exitCode !== 0) {
    console.error(
      `❌ pyocd load exited with code ${exitCode} while programming ${entry.label}.`
    );
    return { ok: false, transient };
  }

  if (!success) {
    console.error(
      `❌ pyocd did not emit the expected "Erased … programmed …" success line for ${entry.label}. Treating as failure.`
    );
    return { ok: false, transient };
  }

  return { ok: true, transient: false };
};

const loadOne = async (entry: Rw612FlashEntry): Promise<boolean> => {
  console.log(
    `→ Programming ${entry.label} (${entry.path}) at ${entry.flashBase}...`
  );
  const first = await loadOnce(entry);
  if (first.ok) return true;

  if (!first.transient) return false;

  console.log(
    `↻ Transient SWD/JTAG glitch detected. Retrying ${entry.label} once...`
  );
  const retry = await loadOnce(entry);
  return retry.ok;
};

export async function flashWithRw612(
  options: Rw612FlashOptions
): Promise<boolean> {
  console.log(
    `⚡ Flashing ${options.deviceId} with pyocd (MCU-Link / CMSIS-DAP, RW612)...`
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

  console.log(`✅ pyocd load completed successfully for all binaries.`);
  return true;
}

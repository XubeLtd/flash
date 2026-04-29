import { $ } from "bun";
import { stat } from "fs/promises";

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
  const result = await $`command -v ${cli}`.nothrow().quiet();
  if (result.exitCode !== 0) {
    throw new Error(
      `${cli} is required to flash RW612 devices but was not found on PATH. ${install}`
    );
  }
};

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
  const command = $`pyocd load --target rw612 --format bin ${fileArg}`;
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

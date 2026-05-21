import { $ } from "bun";
import { stat } from "fs/promises";
import ora from "ora";
import { resolve } from "path";
import which from "which";

const NRF_UTIL_CONFIG = resolve("./tools/nrfutil_config.json");

export interface NRFFlashEntry {
  path: string;
  core: "application" | "network";
  address: string;
  label: string;
}

export interface NRFFlashOptions {
  deviceId: string;
  entries: NRFFlashEntry[];
}

const requireCli = async (cli: string, install: string): Promise<void> => {
  try {
    await which(cli);
  } catch {
    throw new Error(
      `${cli} is required to flash NRF devices but was not found on PATH. ${install}`
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
      // Locate line containing "Segger J-Link" and extract UID
      const probeLine = lines.find((line) => line.includes("Segger J-Link"));
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

const nrfutilCmds = async (probeUID: string, action: string, cmds: string[]): Promise<void> => {
  const command = `nrfutil device ${action} --serial-number ${probeUID} --family nrf53 ${cmds.join(" ")}`;
  const result = await $`${{ raw: command }}`.nothrow().quiet();
  if (result.exitCode !== 0) {
    const raw = result.stdout.toString() + result.stderr.toString();
    throw new Error(`nrfutil exited with code ${result.exitCode}:\n${raw}`);
  }
};

const resetDevice = async (probeUID: string): Promise<void> => {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await nrfutilCmds(probeUID, "reset", [
        "--core application",
        "--reset-kind RESET_PIN"
      ]);
      return;
    } catch {
      await Bun.sleep(500);
    }
  }
  throw new Error("Failed to reset device");
};

const flashCustom = async (entry: NRFFlashEntry): Promise<void> => {
  const probeUID = await detectProbeUID();

  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await nrfutilCmds(probeUID, "program", [
        `--firmware ${entry.path}`,
        `--core ${entry.core}`,
        `--options chip_erase_mode=ERASE_RANGES_TOUCHED_BY_FIRMWARE,verify=VERIFY_READ`
      ]);

      await resetDevice(probeUID);
      return;

    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      // Recover when explicitly told to, or when device shows as (Generic) meaning
      // it couldn't be identified (e.g. APPROTECT enabled, brand new device).
      // Recovery unlocks the device so its full memory map becomes accessible.
      try {
        const needsRecovery = message.includes("recover");
        await resetDevice(probeUID);
        if (needsRecovery) {
          await nrfutilCmds(probeUID, "recover", [`--core ${entry.core}`]);
        }
      } catch {
        throw new Error(`Failed to program ${entry.label} after ${attempt + 1} attempts. Last error: ${message}`);
      }
    }
  }
};

const verifyEntries = async (entries: NRFFlashEntry[]): Promise<void> => {
  for (const entry of entries) {
    const info = await stat(entry.path).catch(() => null);
    if (!info) throw new Error(`artefact missing: ${entry.path}`);
    if (info.size === 0) throw new Error(`artefact is empty: ${entry.path}`);
  }
};

const loadOne = async (entry: NRFFlashEntry): Promise<boolean> => {
  let spinner = ora();
  spinner.start(
    `Programming ${entry.label} (${entry.path}) at ${entry.address}...`
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

export async function flashWithNRFUtil(
  options: NRFFlashOptions
): Promise<boolean> {
  console.log(
    `⚡Flashing ${options.deviceId} (NRFUtil)...`
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
      "nrfutil",
      "Install nrfutil by following the instructions at https://docs.nordicsemi.com/bundle/nrfutil/page/guides/installing.html."
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

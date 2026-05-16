import { $ } from "bun";
import { stat } from "fs/promises";
import ora from "ora";
import { join, resolve } from "path";
import which from "which";

const DEFAULT_MAC_INSTALL_BIN = resolve(
  "/Applications/STMicroelectronics/STM32Cube/STM32CubeProgrammer/STM32CubeProgrammer.app/Contents/Resources/bin"
);

const PROGRAMMER_FAILURE_MARKERS = [
  "Error",
  "ERROR",
  "failed",
  "FAILED",
  "No STLink detected",
  "no STLink detected",
];

export interface StmFlashEntry {
  label: string;
  path: string;
  address?: string;
}

export interface StmFlashOptions {
  deviceId: string;
  entries: StmFlashEntry[];
}

const resolveProgrammerCli = async (): Promise<string> => {
  const fromEnv = process.env.STM32_PRG_PATH;
  if (fromEnv) {
    const candidate = join(fromEnv, "STM32_Programmer_CLI");
    try {
      return await which(candidate);
    } catch {
      throw new Error(
        `STM32_PRG_PATH=${fromEnv} but STM32_Programmer_CLI not found`
      );
    }
  }
  try {
    return await which("STM32_Programmer_CLI");
  } catch {
    throw new Error(
      `STM32_Programmer_CLI not found`
    );
  }
};

const verifyEntries = async (entries: StmFlashEntry[]): Promise<void> => {
  for (const entry of entries) {
    const info = await stat(entry.path).catch(() => null);
    if (!info) throw new Error(`artefact missing: ${entry.path}`);
    if (info.size === 0) throw new Error(`artefact is empty: ${entry.path}`);
  }
};

const findFailureMarker = (output: string): string | undefined =>
  PROGRAMMER_FAILURE_MARKERS.find((marker) => output.includes(marker));

const flashOne = async (entry: StmFlashEntry, cli: string): Promise<boolean> => {
  let spinner = ora();
  spinner.start(
    `Programming ${entry.label} (${entry.path}) at ${entry.address}...`
  );
  const filePath = entry.path.replaceAll("\\", "/");
  const result = await $`${cli} -c port=SWD mode=UR reset=HWrst -w ${filePath} ${entry.address} -v -rst`.nothrow().quiet();
  if ((result.exitCode !== 0) || (findFailureMarker(result.stdout.toString()) ?? findFailureMarker(result.stderr.toString()))) {
    spinner.fail(
      `Failed to program ${entry.label}:\n${result.stderr.toString() || result.stdout.toString() || `exit code ${result.exitCode}`}`
    );
    return false;
  }
  spinner.succeed(`Successfully programmed ${entry.label}`);
  return true;
}

export async function flashWithStm32Programmer(
  options: StmFlashOptions
): Promise<boolean> {
  console.log(
    `⚡Flashing ${options.deviceId} with STM32_Programmer_CLI (ST-Link)...`
  );

  try {
    await verifyEntries(options.entries);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ Pre-flight check failed: ${message}`);
    return false;
  }

  let cli: string;
  try {
    cli = await resolveProgrammerCli();
  } catch (error) {
    console.error(
      `❌ ${error instanceof Error ? error.message : String(error)}`
    );
    return false;
  }

  for (const entry of options.entries) {
    const success = await flashOne(entry, cli);
    if (!success) {
      return false;
    }
  }
  return true;
}

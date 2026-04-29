import { $ } from "bun";
import { stat } from "fs/promises";
import { join, resolve } from "path";

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
  path: string;
  address?: string;
}

export interface StmFlashOptions {
  deviceId: string;
  entries: StmFlashEntry[];
}

const fileExists = async (path: string): Promise<boolean> => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

const resolveProgrammerCli = async (): Promise<string> => {
  const fromEnv = process.env.STM32_PRG_PATH;
  if (fromEnv) {
    const candidate = join(fromEnv, "STM32_Programmer_CLI");
    if (await fileExists(candidate)) return candidate;
    throw new Error(
      `STM32_PRG_PATH=${fromEnv} but STM32_Programmer_CLI is not at ${candidate}.`
    );
  }
  const which = await $`command -v STM32_Programmer_CLI`.nothrow().quiet();
  const onPath = which.stdout.toString().trim();
  if (which.exitCode === 0 && onPath.length > 0) return onPath;

  const macDefault = join(DEFAULT_MAC_INSTALL_BIN, "STM32_Programmer_CLI");
  if (await fileExists(macDefault)) return macDefault;

  throw new Error(
    `STM32_Programmer_CLI not found. Install STM32CubeProgrammer (https://www.st.com/en/development-tools/stm32cubeprog.html) or set STM32_PRG_PATH to the directory containing the CLI.`
  );
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

export async function flashWithStm32Programmer(
  options: StmFlashOptions
): Promise<boolean> {
  console.log(
    `⚡ Flashing ${options.deviceId} with STM32_Programmer_CLI (ST-Link)...`
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

  const writeArgs: string[] = [];
  for (const entry of options.entries) {
    writeArgs.push("-w", entry.path);
    if (entry.address) writeArgs.push(entry.address);
  }

  try {
    const command = $`${cli} -c port=SWD mode=UR reset=HWrst ${writeArgs} -v -rst`;
    console.log(`Executing: STM32_Programmer_CLI -c port=SWD ${writeArgs.join(" ")} -v -rst`);

    const { exitCode, stdout, stderr } = await command.nothrow();
    const stdoutStr = stdout.toString();
    const stderrStr = stderr.toString();

    console.log("--- STM32_Programmer_CLI Output ---");
    console.log(stdoutStr);
    if (stderrStr.length > 0) {
      console.log("--- STM32_Programmer_CLI Stderr ---");
      console.log(stderrStr);
    }

    if (exitCode !== 0) {
      console.warn(
        `⚠️ STM32_Programmer_CLI finished with non-zero exit code: ${exitCode}`
      );
      return false;
    }

    const failure =
      findFailureMarker(stdoutStr) ?? findFailureMarker(stderrStr);
    if (failure) {
      console.error(
        `❌ STM32_Programmer_CLI reported failure in output: "${failure}"`
      );
      return false;
    }

    const expectedDownloads = options.entries.length;
    const downloaded = (stdoutStr.match(/File download complete/g) ?? []).length;
    if (downloaded < expectedDownloads) {
      console.error(
        `❌ STM32_Programmer_CLI only completed ${downloaded}/${expectedDownloads} writes — likely lost the probe mid-flash.`
      );
      return false;
    }

    console.log(`✅ STM32_Programmer_CLI completed successfully.`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to invoke STM32_Programmer_CLI.`);
    console.error(error instanceof Error ? error.message : String(error));
    return false;
  }
}

import { $ } from "bun";
import { rm, stat, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

export interface FlashImageOptions {
  deviceId: string;
  commanderScript: string;
}

const LOADFILE_PATH = /^\s*loadfile\s+(\S+)/gm;
// "J-Link connection not established yet but required for command." is a
// benign informational line JLink prints during autoconnect *before* it
// actually connects — it does not indicate failure. The real failure modes
// are caught by "FAILED:" and the "Cannot connect …" markers below.
const JLINK_FAILURE_MARKERS = [
  "Failed to open file",
  "Cannot connect to target",
  "Could not connect to target",
  "Cannot connect to J-Link",
  "FAILED:",
  "ERROR:",
];

async function verifyArtefacts(script: string): Promise<void> {
  for (const match of script.matchAll(LOADFILE_PATH)) {
    const path = match[1];
    if (!path) continue;
    let info;
    try {
      info = await stat(path);
    } catch {
      throw new Error(`artefact missing: ${path}`);
    }
    if (info.size === 0) {
      throw new Error(`artefact is empty: ${path}`);
    }
  }
}

function countLoadFiles(script: string): number {
  return [...script.matchAll(LOADFILE_PATH)].length;
}

function countDownloads(output: string): number {
  return (output.match(/Downloading file/g) ?? []).length;
}

function findFailureMarker(output: string): string | undefined {
  return JLINK_FAILURE_MARKERS.find((marker) => output.includes(marker));
}

export async function flashWithJLink(
  options: FlashImageOptions
): Promise<boolean> {
  console.log(`⚡ Flashing ${options.deviceId} with J-Link...`);

  try {
    await verifyArtefacts(options.commanderScript);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ Pre-flight check failed: ${message}`);
    return false;
  }

  const tempFilePath = join(tmpdir(), `flash-${options.deviceId}.jlink`);

  try {
    await writeFile(tempFilePath, options.commanderScript);

    const command = $`JLinkExe -CommandFile ${tempFilePath} -if swd -autoconnect 1 -NoGui 1`;
    console.log(`Executing: ${command.text}`);

    const { exitCode, stdout, stderr } = await command.nothrow();
    const stdoutStr = stdout.toString();
    const stderrStr = stderr.toString();

    console.log("--- J-Link Output ---");
    console.log(stdoutStr);

    if (stderrStr.length > 0) {
      console.log("--- J-Link Stderr ---");
      console.log(stderrStr);
    }

    await rm(tempFilePath);

    if (exitCode !== 0) {
      console.warn(`⚠️ J-Link finished with non-zero exit code: ${exitCode}`);
      return false;
    }

    const failure = findFailureMarker(stdoutStr) ?? findFailureMarker(stderrStr);
    if (failure) {
      console.error(`❌ J-Link reported failure in output: "${failure}"`);
      return false;
    }

    const expectedLoadFiles = countLoadFiles(options.commanderScript);
    const downloadedFiles = countDownloads(stdoutStr);
    if (downloadedFiles < expectedLoadFiles) {
      console.error(
        `❌ J-Link only programmed ${downloadedFiles}/${expectedLoadFiles} loadfile(s). The probe likely never connected.`
      );
      return false;
    }

    console.log(`✅ J-Link process completed successfully.`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to flash using JLinkExe.`);
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.", error);
    }
    return false;
  }
}

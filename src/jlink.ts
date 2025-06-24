import { $ } from "bun";
import { rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

export interface FlashImageOptions {
  deviceId: string;
  commanderScript: string;
}

export async function flashWithJLink(
  options: FlashImageOptions
): Promise<boolean> {
  console.log(`⚡ Flashing ${options.deviceId} with J-Link...`);

  const tempFilePath = join(tmpdir(), `flash-${options.deviceId}.jlink`);

  try {
    await writeFile(tempFilePath, options.commanderScript);

    const command = $`JLinkExe -CommandFile ${tempFilePath} -if swd -autoconnect 1 -NoGui 1`;
    console.log(`Executing: ${command.text}`);

    const { exitCode, stdout, stderr } = await command.nothrow();

    console.log("--- J-Link Output ---");
    console.log(stdout.toString());

    if (stderr.length > 0) {
      console.log("--- J-Link Stderr ---");
      console.log(stderr.toString());
    }

    await rm(tempFilePath);

    if (exitCode === 0) {
      console.log(`✅ J-Link process completed successfully.`);
      return true;
    } else {
      console.warn(`⚠️ J-Link finished with non-zero exit code: ${exitCode}`);
      return false;
    }
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

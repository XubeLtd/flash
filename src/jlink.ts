import { $ } from "bun";

export interface FlashImageOptions {
  deviceId: string;
  commanderScript: string;
}

export async function flashWithJLink(
  options: FlashImageOptions
): Promise<boolean> {
  console.log(`Flashing with J-Link`);

  try {
    const command = $`echo ${options.commanderScript} | JLinkExe -if swd -autoconnect 1 -NoGui 1`;

    console.log(`Executing: ${command.text}`);

    const { exitCode, stdout, stderr } = await command.nothrow();

    console.log("--- J-Link Output ---");
    console.log(stdout.toString());

    if (stderr.length > 0) {
      console.log("--- J-Link Stderr ---");
      console.log(stderr.toString());
    }

    if (exitCode === 0) {
      console.log(`✅ J-Link process completed successfully.`);
      return true;
    } else {
      console.warn(
        `⚠️ J-Link process finished with a non-zero exit code: ${exitCode}`
      );
      return false;
    }
  } catch (error) {
    console.error(`❌ Failed to execute JLinkExe command.`);
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred during execution.", error);
    }
    return false;
  }
}

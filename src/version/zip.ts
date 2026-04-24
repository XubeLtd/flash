import AdmZip from "adm-zip";
import { resolve } from "path";
import ora from "ora";
import { VERSION_ZIP_FILE_NAME } from "../constants";

export const buildVersionZip = async (stagedDir: string): Promise<string> => {
  const spinner = ora("Building version.zip").start();
  const zipPath = resolve(stagedDir, VERSION_ZIP_FILE_NAME);

  try {
    const zip = new AdmZip();
    zip.addLocalFolder(stagedDir, undefined, (filename: string) => {
      if (filename.endsWith(".zip")) return false;
      if (filename.startsWith(".fs-src")) return false;
      if (filename.startsWith(".")) return false;
      return true;
    });
    zip.writeZip(zipPath);
    spinner.succeed(`Built ${zipPath}`);
    return zipPath;
  } catch (error) {
    spinner.fail("Failed to build version.zip");
    throw error;
  }
};

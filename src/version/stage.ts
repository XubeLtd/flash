import { cp, mkdir, rm, stat } from "fs/promises";
import { resolve } from "path";
import ora from "ora";

export const getVersionDir = (deviceId: string, version: string): string =>
  resolve("./devices", deviceId, version);

export const getStagedDir = (deviceId: string): string =>
  resolve(
    "./devices",
    deviceId,
    `.staged-${new Date().toISOString().replace(/[:.]/g, "-")}`
  );

export const copyVersionToStaged = async (
  sourceVersionDir: string,
  stagedDir: string
): Promise<void> => {
  const spinner = ora(`Staging version files at ${stagedDir}`).start();
  try {
    await mkdir(stagedDir, { recursive: true });
    await cp(sourceVersionDir, stagedDir, { recursive: true });
    spinner.succeed("Version files staged");
  } catch (error) {
    spinner.fail("Failed to stage version files");
    throw error;
  }
};

export const removeStagedDir = async (stagedDir: string): Promise<void> => {
  await rm(stagedDir, { recursive: true, force: true });
};

export const versionDirExists = async (path: string): Promise<boolean> => {
  try {
    const s = await stat(path);
    return s.isDirectory();
  } catch {
    return false;
  }
};

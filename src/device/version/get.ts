import { mkdir } from "fs/promises";
import ora from "ora";
import { resolve } from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import unzipper from "unzipper";
import type { Authentication } from "../../auth";
import { xubeSdk } from "../../constants";

export const getDeviceVersions = async (
  auth: Authentication,
  device: string
): Promise<number[]> => {
  let spinner = ora();
  spinner.start(`Fetching versions for ${device}`);
  const versions: { versions: number[] } = await xubeSdk[
    "List Device Versions"
  ]({
    params: { device },
    headers: {
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  });

  spinner.succeed(`Fetched ${versions.versions.length} versions for ${device}`);
  return versions.versions;
};

export const fetchAndExtractDeviceVersion = async (
  auth: Authentication,
  device: string,
  version: number,
  destinationDir: string = "./devices"
): Promise<boolean> => {
  let spinner = ora();
  try {
    spinner.start(`Getting download URL for ${version} for ${device}`);

    const extractPath = resolve(destinationDir, device, version.toString());

    const url = await xubeSdk["Get Device Version Download URL"]({
      params: { device, version: version.toString() },
      headers: {
        Authorization: `Bearer ${await auth.getToken()}`,
      },
    });
    spinner.succeed(`Got download URL for ${version} for ${device}`);

    spinner.start(`Downloading version ${version} for ${device}`);
    const response = await fetch(url);
    if (!response.ok || !response.body) {
      spinner.fail(
        `Failed to download file: ${response.status} ${response.statusText}`
      );
      throw new Error(
        `Failed to download file: ${response.status} ${response.statusText}`
      );
    }
    spinner.succeed(`Downloaded version ${version} for ${device}`);

    spinner.start(`Extracting version ${version} for ${device}`);
    const bodyNodeStream = Readable.fromWeb(response.body);
    await mkdir(extractPath, { recursive: true });
    const extractionStream = unzipper.Extract({ path: extractPath });
    await pipeline(bodyNodeStream, extractionStream);

    spinner.succeed(`Successfully downloaded and extracted to ${extractPath}`);
    return true;
  } catch (error) {
    spinner.fail(
      `An error occurred while processing version ${version} for device ${device}`
    );
    throw new Error(JSON.stringify(error, null, 2));
  }
};

import ora from "ora";
import type { Authentication } from "../auth";
import { xubeSdk } from "../constants";
import { fetchAndExtractDeviceVersion } from "../device/version/get";

const UPLOAD_CONFIRM_ATTEMPTS = 5;
const UPLOAD_CONFIRM_DELAY_MS = 2000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type UploadResult = {
  newVersion: string;
};

export const uploadVersionZip = async (
  auth: Authentication,
  deviceId: string,
  zipPath: string,
  priorVersions: string[]
): Promise<UploadResult> => {
  const uploadSpinner = ora("Requesting device version upload URL").start();
  let uploadUrl: string;
  try {
    uploadUrl = await xubeSdk["Get Device Version Upload URL"]({
      params: { device: deviceId },
      headers: {
        Authorization: `Bearer ${await auth.getToken()}`,
      },
    });
    uploadSpinner.succeed("Got upload URL");
  } catch (error) {
    uploadSpinner.fail("Failed to get upload URL");
    throw error;
  }

  const putSpinner = ora("Uploading version.zip to backend").start();
  try {
    const file = Bun.file(zipPath);
    const buffer = await file.arrayBuffer();
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/zip" },
      body: buffer,
    });
    if (!response.ok) {
      putSpinner.fail(
        `Upload failed: ${response.status} ${response.statusText}`
      );
      throw new Error(
        `Upload failed: ${response.status} ${response.statusText}`
      );
    }
    putSpinner.succeed("Version uploaded");
  } catch (error) {
    putSpinner.fail("Upload failed");
    throw error;
  }

  const confirmSpinner = ora(
    "Confirming new version appears on the backend"
  ).start();
  const priorSet = new Set(priorVersions);
  for (let attempt = 1; attempt <= UPLOAD_CONFIRM_ATTEMPTS; attempt++) {
    try {
      const listResponse = await xubeSdk["List Device Versions"]({
        params: { device: deviceId },
        headers: {
          Authorization: `Bearer ${await auth.getToken()}`,
        },
      });
      const newVersions = listResponse.versions.filter(
        (v) => !priorSet.has(v)
      );
      if (newVersions.length > 0) {
        const newVersion = newVersions[0]!;
        confirmSpinner.succeed(`New version ${newVersion} confirmed on backend`);

        await fetchAndExtractDeviceVersion(auth, deviceId, newVersion);

        return { newVersion };
      }
    } catch (err) {
      // swallow and retry
    }
    if (attempt < UPLOAD_CONFIRM_ATTEMPTS) {
      await sleep(UPLOAD_CONFIRM_DELAY_MS);
    }
  }

  confirmSpinner.fail(
    "Uploaded but could not confirm the new version on the backend"
  );
  throw new Error(
    "Upload succeeded but the new version did not appear in the version list within the retry window"
  );
};

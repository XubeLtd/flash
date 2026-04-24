import { search, select } from "@inquirer/prompts";
import { resolve } from "path";
import { creds } from "../config";
import { getUserAccounts } from "./account/get";
import { Authentication } from "./auth";
import { promptReadyToFlash } from "./config-edit/prompt-edits";
import { type TXubeAccountDevices } from "./constants";
import { type IDeviceType } from "./device-type/device-type.interface";
import { DeviceTypeFactory } from "./device-type/factory/device-type-factory";
import { getDeviceTypeByDeviceId } from "./device-type/get";
import { getAccountDevices } from "./device/get";
import {
  fetchAndExtractDeviceVersion,
  getDeviceVersions,
  sortVersionsDescending,
} from "./device/version/get";
import { ensureBackendReachable } from "./version/connectivity";
import { promptAndPrepareEdit } from "./version/prepare-edit";
import { removeStagedDir } from "./version/stage";
import { uploadVersionZip } from "./version/upload";

async function main() {
  console.log("--------------------------------------------------");
  console.log("📦 Welcome to the Xube Device Flash Tool 🏗");
  console.log("--------------------------------------------------\n");

  const auth = new Authentication(creds);

  try {
    await flashDevice(auth);
    return;
  } catch (error) {
    console.error("Error in main function:", error);
    process.exit(1);
  }
}

const promptToSelectAccount = async (
  userAccounts: string[]
): Promise<string> => {
  const account: string = await select({
    message: "Select the account the device is assigned to:",
    choices: userAccounts,
  });
  return account;
};

const promptToSelectDevice = async (
  devices: TXubeAccountDevices
): Promise<string> => {
  const deviceIds = devices.data.map((device) => device.id);
  const device = await search<string>({
    message: "Select the device you want to flash:",
    source: (input) => {
      if (!input) {
        return deviceIds;
      }
      return deviceIds.filter((id) => id.includes(input));
    },
  });
  return device;
};

const promptToSelectDeviceVersion = async (
  deviceVersions: string[]
): Promise<string> => {
  const version: string = await select({
    message: "Select the device version you want to flash:",
    choices: sortVersionsDescending(deviceVersions),
  });
  return version;
};

const flashDevice = async (auth: Authentication): Promise<void> => {
  const userAccounts = await getUserAccounts(auth);
  if (!userAccounts) {
    console.error("❌ Failed to fetch user accounts.");
    return;
  }
  const account = await promptToSelectAccount(userAccounts);

  const accountDevices = await getAccountDevices(auth, account);
  if (accountDevices.data.length === 0) {
    console.error("❌ No devices found for account.");
    return;
  }
  const deviceId = await promptToSelectDevice(accountDevices);

  const priorVersions = await getDeviceVersions(auth, deviceId);
  const version = await promptToSelectDeviceVersion(priorVersions);

  const fetched = await fetchAndExtractDeviceVersion(auth, deviceId, version);
  if (!fetched) {
    console.error(
      `❌ Failed to fetch device version ${version} for device ${deviceId}`
    );
    return;
  }

  const deviceType: IDeviceType = await getDeviceTypeByDeviceId(
    auth,
    deviceId,
    new DeviceTypeFactory()
  );

  const originalVersionDir = resolve("./devices", deviceId, version);

  let prepared: Awaited<ReturnType<typeof promptAndPrepareEdit>> = null;
  if (deviceType.hasFileSystem) {
    prepared = await promptAndPrepareEdit(
      deviceId,
      deviceType,
      originalVersionDir
    );
  } else {
    console.log(
      `ℹ️  Config editing is not supported for ${deviceType.type} devices. Flashing the fetched version as-is.`
    );
  }

  const sourceDir = prepared ? prepared.stagedDir : originalVersionDir;

  const readyToFlash = await promptReadyToFlash();
  if (!readyToFlash) {
    console.log("Cancelled before flashing.");
    if (prepared) {
      console.log(
        `ℹ️  Edited version staged at ${prepared.stagedDir} (and zip at ${prepared.zipPath}). Not uploaded.`
      );
    }
    return;
  }

  if (prepared) {
    const reachable = await ensureBackendReachable(auth, deviceId);
    if (!reachable) {
      console.error(
        "❌ Cannot reach the Xube backend. Refusing to flash — resolve connectivity and retry."
      );
      console.log(
        `ℹ️  Edited version staged at ${prepared.stagedDir} (and zip at ${prepared.zipPath}).`
      );
      return;
    }
  }

  const flashSuccess = await deviceType.flash(deviceId, sourceDir);
  if (!flashSuccess) {
    console.error("❌ Failed to flash device.");
    if (prepared) {
      console.log(
        `ℹ️  Edited version kept at ${prepared.stagedDir} — no version uploaded to backend.`
      );
    }
    process.exit(1);
  }
  console.log("✅ Device flashed successfully.");

  if (prepared) {
    try {
      const { newVersion } = await uploadVersionZip(
        auth,
        deviceId,
        prepared.zipPath,
        priorVersions
      );
      console.log(`✅ New version ${newVersion} uploaded and re-fetched.`);
      await removeStagedDir(prepared.stagedDir);
    } catch (error) {
      console.error(
        "❌ Device was flashed but the new version failed to upload to the backend."
      );
      console.error(
        `   Zip kept at: ${prepared.zipPath}. Please contact Xube or retry with \`bun push\`.`
      );
      console.error(error);
      process.exit(1);
    }
  }

  console.log(`🎉 ${deviceId} successfully provisioned!`);
};

main().catch((error) => {
  console.error("Unhandled error in main:", error);
  process.exit(1);
});

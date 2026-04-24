import { search, select } from "@inquirer/prompts";
import { readdir, stat } from "fs/promises";
import { resolve } from "path";
import { creds } from "../config";
import { getUserAccounts } from "./account/get";
import { Authentication } from "./auth";
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
import {
  formatValidationError,
  validateSunVersionForRebuild,
} from "./version/validate";

async function main() {
  console.log("--------------------------------------------------");
  console.log("📤 Welcome to the Xube Device Config Push Tool 📝");
  console.log("--------------------------------------------------\n");

  const auth = new Authentication(creds);

  try {
    await pushDeviceConfig(auth);
    return;
  } catch (error) {
    console.error("Error in main function:", error);
    process.exit(1);
  }
}

const LOCAL = "local";
const BACKEND = "backend";

const promptToSelectAccount = async (
  userAccounts: string[]
): Promise<string> => {
  return await select<string>({
    message: "Select the account the device is assigned to:",
    choices: userAccounts,
  });
};

const promptSource = async (): Promise<typeof LOCAL | typeof BACKEND> => {
  return await select<typeof LOCAL | typeof BACKEND>({
    message: "Use a device version already on disk, or fetch from the backend?",
    choices: [
      { name: "Use an existing local version", value: LOCAL },
      { name: "Fetch a fresh version from the backend", value: BACKEND },
    ],
  });
};

const promptToSelectDeviceFromBackend = async (
  devices: TXubeAccountDevices
): Promise<string> => {
  const deviceIds = devices.data.map((device) => device.id);
  return await search<string>({
    message: "Select the device whose config you want to push:",
    source: (input) => {
      if (!input) return deviceIds;
      return deviceIds.filter((id) => id.includes(input));
    },
  });
};

const promptToSelectDeviceVersion = async (
  deviceVersions: string[],
  message: string
): Promise<string> => {
  return await select<string>({
    message,
    choices: sortVersionsDescending(deviceVersions),
  });
};

const listLocalDevices = async (): Promise<string[]> => {
  try {
    const entries = await readdir("./devices");
    const devices: string[] = [];
    for (const entry of entries) {
      if (entry.startsWith(".")) continue;
      const s = await stat(resolve("./devices", entry));
      if (s.isDirectory()) devices.push(entry);
    }
    return devices;
  } catch {
    return [];
  }
};

const listLocalDeviceVersions = async (deviceId: string): Promise<string[]> => {
  try {
    const entries = await readdir(resolve("./devices", deviceId));
    const versions: string[] = [];
    for (const entry of entries) {
      if (entry.startsWith(".")) continue;
      const s = await stat(resolve("./devices", deviceId, entry));
      if (s.isDirectory()) versions.push(entry);
    }
    return versions;
  } catch {
    return [];
  }
};

const validateLocalVersion = async (
  deviceId: string,
  version: string
): Promise<boolean> => {
  const base = resolve("./devices", deviceId, version);
  const result = await validateSunVersionForRebuild(base);
  if (result.ok) return true;
  console.error("❌ " + formatValidationError(result, base));
  return false;
};

const pushDeviceConfig = async (auth: Authentication): Promise<void> => {
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

  const source = await promptSource();

  let deviceId: string;
  let version: string;
  let originalVersionDir: string;

  if (source === LOCAL) {
    const accountDeviceIds = new Set(accountDevices.data.map((d) => d.id));
    const localDevices = (await listLocalDevices()).filter((d) =>
      accountDeviceIds.has(d)
    );
    if (localDevices.length === 0) {
      console.error(
        "❌ No local devices found in ./devices for the selected account. Try the backend source instead."
      );
      return;
    }
    deviceId = await search<string>({
      message: "Select a local device:",
      source: (input) => {
        if (!input) return localDevices;
        return localDevices.filter((id) => id.includes(input));
      },
    });
    const localVersions = await listLocalDeviceVersions(deviceId);
    if (localVersions.length === 0) {
      console.error(`❌ No versions found locally for ${deviceId}.`);
      return;
    }
    version = await promptToSelectDeviceVersion(
      localVersions,
      "Select a local version to edit:"
    );
    originalVersionDir = resolve("./devices", deviceId, version);
    const isValid = await validateLocalVersion(deviceId, version);
    if (!isValid) {
      console.error(
        "❌ Local version is missing required files. Re-fetch from the backend."
      );
      return;
    }
  } else {
    deviceId = await promptToSelectDeviceFromBackend(accountDevices);
    const versions = await getDeviceVersions(auth, deviceId);
    version = await promptToSelectDeviceVersion(
      versions,
      "Select a device version to edit:"
    );
    const fetched = await fetchAndExtractDeviceVersion(auth, deviceId, version);
    if (!fetched) {
      console.error(
        `❌ Failed to fetch device version ${version} for device ${deviceId}`
      );
      return;
    }
    originalVersionDir = resolve("./devices", deviceId, version);
  }

  const deviceType: IDeviceType = await getDeviceTypeByDeviceId(
    auth,
    deviceId,
    new DeviceTypeFactory()
  );

  if (!deviceType.hasFileSystem) {
    console.error(
      `❌ ${deviceType.type} devices don't have a filesystem config — nothing to push.`
    );
    return;
  }

  const prepared = await promptAndPrepareEdit(
    deviceId,
    deviceType,
    originalVersionDir,
    { requireEdits: true }
  );

  if (!prepared) {
    return;
  }

  const reachable = await ensureBackendReachable(auth, deviceId);
  if (!reachable) {
    console.error(
      "❌ Cannot reach the Xube backend. Zip kept at " + prepared.zipPath
    );
    return;
  }

  const priorVersions = await getDeviceVersions(auth, deviceId);

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
    console.error("❌ Upload failed.");
    console.error(
      `   Zip kept at: ${prepared.zipPath}. Please contact Xube or retry.`
    );
    console.error(error);
    process.exit(1);
  }

  console.log(`🎉 ${deviceId} configuration pushed!`);
};

main().catch((error) => {
  console.error("Unhandled error in main:", error);
  process.exit(1);
});

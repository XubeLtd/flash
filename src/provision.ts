import { search, select } from "@inquirer/prompts";
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
} from "./device/version/get";

async function main() {
  console.log("--------------------------------------------------");
  console.log("📦 Welcome to the Xube Device Flash Tool 🏗");
  console.log("--------------------------------------------------\n");

  const auth = new Authentication(creds);

  try {
    await provisionExistingDevice(auth);

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
    message: "Select the device you want to provision:",
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
    message: "Select the device version you want to provision:",
    choices: [...deviceVersions].sort().reverse(),
  });
  return version;
};

const promptToFlashDevice = async (): Promise<boolean> => {
  const flashDeviceChoice: boolean = await select({
    message: "Do you want to flash the device?",
    choices: [
      {
        name: "Yes",
        value: true,
      },
      {
        name: "No",
        value: false,
      },
    ],
  });
  return flashDeviceChoice;
};

const provisionExistingDevice = async (auth: Authentication): Promise<void> => {
  const userAccounts: string[] | undefined = await getUserAccounts(auth);
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

  const deviceVersions: string[] = await getDeviceVersions(auth, deviceId);
  const version = await promptToSelectDeviceVersion(deviceVersions);
  const fetchedAndExtractedDeviceVersion: boolean =
    await fetchAndExtractDeviceVersion(auth, deviceId, version);

  if (!fetchedAndExtractedDeviceVersion) {
    console.error(
      `❌ Failed to fetch device version ${version} for device ${deviceId}`
    );
    return;
  }

  const deviceType: IDeviceType | undefined = await getDeviceTypeByDeviceId(
    auth,
    deviceId,
    new DeviceTypeFactory()
  );
  if (!deviceType) {
    console.error(`❌ Failed to get device type for device ${deviceId}`);
    return;
  }

  const flashDeviceChoice = await promptToFlashDevice();
  if (flashDeviceChoice) {
    const flashSuccess = await deviceType.flash(deviceId, version);
    if (!flashSuccess) {
      console.error("❌ Failed to flash device.");
      return;
    }
    console.log("✅ Device flashed successfully.");
  }

  console.log(`🎉 ${deviceId} successfully provisioned!`);
};

main().catch((error) => {
  console.error("Unhandled error in main:", error);
  process.exit(1);
});

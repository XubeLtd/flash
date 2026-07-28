import { xubeSdk, type TXubeAccountDevices, type TXubeDevice } from "../constants";
import type { Authentication } from "../auth";
import ora from "ora";

export const getAccountDeviceIds = (
  devices: TXubeAccountDevices,
): string[] =>
  devices.data.map((device) => {
    const accountDevice = device as typeof device & {
      entityId?: string;
      deviceId?: string;
    };
    const deviceId = accountDevice.entityId ?? accountDevice.deviceId;
    if (!deviceId) {
      throw new Error("Account device response did not contain a device ID.");
    }
    return deviceId;
  });

export const getAccountDevices = async (
  auth: Authentication,
  account: string
): Promise<TXubeAccountDevices> => {
  let spinner = ora();
  spinner.start(`Fetching devices for account ${account}`);
  const devices = await xubeSdk["Get Account Devices"]({
    params: {
      account,
    },
    headers: {
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  });

  spinner.succeed(`Fetched ${devices.data.length} devices for account ${account}`);
  return devices;
};


export const getDevice = async (auth: Authentication, deviceId: string): Promise<TXubeDevice> => {
  let spinner = ora();
  spinner.start(`Fetching device information for ${deviceId}`);
  const device: TXubeDevice = await xubeSdk["Get Device"]({
    params: { device: deviceId },
    headers: {
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  });

  spinner.succeed(`Found device: ${deviceId}`);
  return device;
};

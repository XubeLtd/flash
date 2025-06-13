import type { Authentication } from "../../auth";
import { getDeviceModelByDeviceId } from "../../device/model/get";
import { DeviceTypeFactory } from "../factory/device-type-factory";
import type { IDeviceType } from "../device-type.interface";
import ora from "ora";
import type { TXubeDeviceModel } from "../../constants";

export const getDeviceTypeByDeviceId = async (
  auth: Authentication,
  deviceId: string,
  deviceTypeFactory: DeviceTypeFactory
): Promise<IDeviceType> => {

  let spinner = ora();
  spinner.start(`Fetching device model for ${deviceId}`);
  const deviceModel: TXubeDeviceModel | undefined = await getDeviceModelByDeviceId(auth, deviceId);
  
  if (!deviceModel) {
      console.error(`❌ Failed to get device model for device ${deviceId}`);
      throw new Error(`Failed to get device model for device ${deviceId}`);
    }
    spinner.succeed(`Fetched device model for ${deviceId}`);

  spinner.start(`Creating device type for ${deviceModel.name}`);

  if (!deviceModel.name) {
    console.error(`❌ Failed to get device model name for device ${deviceId}`);
    throw new Error(`Failed to get device model name for device ${deviceId}`);
  }

  const deviceType : IDeviceType | undefined = deviceTypeFactory.createDeviceType(deviceModel);

  if (!deviceType) {
    spinner.fail(`Device Model ${deviceModel.name} is not supported`);
    throw new Error(`Device Model ${deviceModel.name} is not supported`);
  }

  spinner.succeed(`Created device type for ${deviceModel.name}`);

  return deviceType;
};

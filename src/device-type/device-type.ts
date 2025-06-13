import ora from "ora";
import type { Authentication } from "../auth";
import { xubeSdk, type TXubeGetDeviceModelsResponse } from "../constants";
import {
  DeviceTypeOptionSchema,
  type IDeviceType,
  type TDeviceTypeOption,
} from "./device-type.interface";
import type { IDeviceTypeFactory } from "./factory/device-type-factory.interface";

export abstract class DeviceType implements IDeviceType {
  abstract hasFileSystem: boolean;

  constructor(
    public readonly model: TXubeGetDeviceModelsResponse[number],
    public readonly type: TDeviceTypeOption
  ) {}

  abstract flash(deviceId: string, version: number): Promise<boolean>;
}

export const getDeviceTypes = async (
  auth: Authentication,
  deviceTypeFactory: IDeviceTypeFactory
): Promise<IDeviceType[]> => {
  const spinner = ora("Fetching device models...").start();

  const deviceModels: TXubeGetDeviceModelsResponse = await xubeSdk[
    "Get Device Models"
  ]({
    headers: {
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  });

  const deviceTypes = deviceModels.reduce<IDeviceType[]>((acc, deviceModel) => {
    const deviceModelName = deviceModel.name;

    const result = DeviceTypeOptionSchema.safeParse(deviceModelName);

    if (result.success) {
      const deviceType = deviceTypeFactory.createDeviceType(deviceModel);
      if (deviceType) {
        acc.push(deviceType);
      }
    }

    return acc;
  }, []);

  spinner.succeed(`Device models fetched`);

  return deviceTypes;
};

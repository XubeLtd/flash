import ora from "ora";
import type { Authentication } from "../auth";
import { xubeSdk, type TXubeGetDeviceModelsResponse } from "../constants";
import type { MonitorChannel } from "../serial-monitor";
import type { ValidationResult } from "../version/validate";
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

  get generation(): string {
    return this.model.generation;
  }

  abstract flash(deviceId: string, sourceDir: string): Promise<boolean>;

  abstract validateForRebuild(versionDir: string): Promise<ValidationResult>;
  abstract rebuildFileSystem(stagedDir: string): Promise<void>;

  abstract discoverProbe(): Promise<MonitorChannel | null>;
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

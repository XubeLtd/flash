import { z } from "zod";
import type { TXubeGetDeviceModelsResponse } from "../constants";

export const DEVICE_TYPE_PLANET = "PLANET";
export const DEVICE_TYPE_SUN = "SUN";
export const DEVICE_TYPE_OPTIONS = [
  DEVICE_TYPE_PLANET,
  DEVICE_TYPE_SUN,
] as const;

export const DeviceTypeOptionSchema = z.enum(DEVICE_TYPE_OPTIONS);
export type TDeviceTypeOption = z.infer<typeof DeviceTypeOptionSchema>;

export interface IDeviceType {
  model: TXubeGetDeviceModelsResponse[number];
  type: TDeviceTypeOption;

  hasFileSystem: boolean;

  flash: (deviceId: string, version: string) => Promise<boolean>;
}

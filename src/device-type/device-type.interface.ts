import { z } from "zod";
import type { TXubeGetDeviceModelsResponse } from "../constants";
import type { MonitorChannel } from "../serial-monitor";
import type { ValidationResult } from "../version/validate";

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
  generation: string;

  hasFileSystem: boolean;

  flash: (deviceId: string, sourceDir: string) => Promise<boolean>;

  validateForRebuild: (versionDir: string) => Promise<ValidationResult>;
  rebuildFileSystem: (stagedDir: string) => Promise<void>;

  /**
   * Locate the device's debug probe (and its VCOM endpoint, if any) for the
   * post-flash monitor. Returns null when no probe matching this device type
   * is connected (post-flash monitoring is skipped in that case).
   */
  discoverProbe: () => Promise<MonitorChannel | null>;
}

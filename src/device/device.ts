import type { TDeviceCertificates } from "../certificate";
import type { IDevice } from "./device.interface";

export class Device implements IDevice {
  constructor(
    public readonly deviceId: string,
    public readonly certificates: TDeviceCertificates
  ) {}
}

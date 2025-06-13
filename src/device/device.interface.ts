import type { TDeviceCertificates } from "../certificate";

export interface IDevice {
  deviceId: string;
  certificates: TDeviceCertificates;
}

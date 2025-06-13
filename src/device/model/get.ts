import { xubeSdk, type TXubeDeviceModel } from "../../constants";
import type { Authentication } from "../../auth";

export const getDeviceModelByDeviceId = async (
  auth: Authentication,
  deviceId: string
): Promise<TXubeDeviceModel | undefined> => {
  const deviceModel = await xubeSdk["Get Device Model By Device Id"]({
    params: { device: deviceId },
    headers: {
      Authorization: `Bearer ${await auth.getToken()}`,
    },
  });
  return deviceModel;
};

import ora from "ora";
import type { Authentication } from "../auth";
import { xubeSdk } from "../constants";

export const ensureBackendReachable = async (
  auth: Authentication,
  deviceId: string
): Promise<boolean> => {
  const spinner = ora("Checking backend reachability").start();
  try {
    await xubeSdk["List Device Versions"]({
      params: { device: deviceId },
      headers: {
        Authorization: `Bearer ${await auth.getToken()}`,
      },
    });
    spinner.succeed("Backend is reachable");
    return true;
  } catch (error) {
    spinner.fail("Backend is not reachable — aborting before flash.");
    console.error(error);
    return false;
  }
};

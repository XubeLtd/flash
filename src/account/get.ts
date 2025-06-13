import type { Authentication } from "../auth";
import { xubeSdk } from "../constants";
import type { IDevice } from "../device/device.interface";
import ora from "ora";

export const getUserAccounts = async (
  auth: Authentication
): Promise<string[] | undefined> => {
  const spinner = ora("Fetching user accounts...").start();

  try {
    const userAccounts = await xubeSdk["Get User Accounts"]({
      params: {
        user: auth.email,
      },
      headers: {
        Authorization: `Bearer ${await auth.getToken()}`,
      },
    });

    if (userAccounts.data.length === 0) {
      spinner.fail("No user accounts found");
      return undefined;
    }

    spinner.succeed("User accounts fetched successfully");
    return userAccounts.data.map((account) => account.account);
  } catch (error) {
    spinner.fail("Fetching user accounts failed due to an exception.");
    console.error(error);
    return undefined;
  }
};
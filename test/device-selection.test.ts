import { describe, expect, test } from "bun:test";
import { getAccountDeviceIds } from "../src/device/get";
import type { TXubeAccountDevices } from "../src/constants";

describe("account device selection", () => {
  test("uses the production device entity ID rather than the account-facet ID", () => {
    const response = {
      data: [
        {
          accountId: "ACCOUNT_TEST",
          facetType: "ACCOUNT",
          entityId: "DEVICE_TEST",
          id: "FACET_TEST",
        },
      ],
    } as unknown as TXubeAccountDevices;

    expect(getAccountDeviceIds(response)).toEqual(["DEVICE_TEST"]);
  });

  test("uses the development device ID rather than the account-facet ID", () => {
    const response = {
      data: [
        {
          accountId: "ACCOUNT_TEST",
          facetType: "ACCOUNT",
          componentType: "DEVICE",
          deviceId: "DEVICE_DEV",
          id: "FACET_TEST",
        },
      ],
    } as unknown as TXubeAccountDevices;

    expect(getAccountDeviceIds(response)).toEqual(["DEVICE_DEV"]);
  });
});

import { describe, expect, test } from "bun:test";
import {
  isNrfRecoveryRequired,
  parseNrf53ProbeUids,
} from "../src/nrfutil";

describe("parseNrf53ProbeUids", () => {
  test("returns unique nRF53 J-Link serial numbers only", () => {
    const output = [
      JSON.stringify({ data: { type: "task_start" } }),
      JSON.stringify({
        data: {
          type: "devices",
          data: {
            devices: [
              {
                serialNumber: "000960104814",
                traits: { jlink: true },
                devkit: { deviceFamily: "NRF53_FAMILY" },
              },
              {
                serialNumber: "SUN_PROBE",
                traits: { jlink: false },
                devkit: { deviceFamily: "NRF54L_FAMILY" },
              },
              {
                serialNumber: "000960104814",
                traits: { jlink: true },
                devkit: { deviceFamily: "NRF53_FAMILY" },
              },
            ],
          },
        },
      }),
      "nrfutil diagnostic text",
    ].join("\n");

    expect(parseNrf53ProbeUids(output)).toEqual(["000960104814"]);
  });
});

describe("isNrfRecoveryRequired", () => {
  test("recognises access-protection failures", () => {
    expect(isNrfRecoveryRequired("APPROTECT is enabled; recover required")).toBe(
      true,
    );
  });

  test("does not recover for an unrelated programming failure", () => {
    expect(isNrfRecoveryRequired("firmware file is malformed")).toBe(false);
  });
});

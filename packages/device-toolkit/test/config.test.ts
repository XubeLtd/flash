import { describe, expect, test } from "bun:test";
import {
  applyWifiCredentials,
  getAtPath,
  resolvePlanetCommAddressPath,
  resolveWifiConfigPaths,
  setAtPath,
  type JsonObject,
} from "../src/config";

const deviceId = "DEVICE_TEST";

const flatSunConfig = (): JsonObject => ({
  schema_version: "1",
  net: {
    cfg: {
      wlan0: {
        wifi_cfg: {
          ssid: "old-flat",
          pass: "old-password",
        },
      },
    },
  },
});

const wrappedSunConfig = (): JsonObject => ({
  schema_version: "1",
  [deviceId]: {
    cmp: {
      net: {
        cfg: {
          wlan0: {
            wifi_cfg: {
              ssid: "old-wrapped",
              pass: "old-password",
            },
          },
        },
      },
    },
  },
});

describe("WiFi config paths", () => {
  test("updates the legacy flat Sun schema", () => {
    const config = flatSunConfig();
    const paths = applyWifiCredentials(config, deviceId, {
      ssid: "customer-network",
      password: "customer-password",
    });

    expect(paths).toEqual({
      ssid: "net.cfg.wlan0.wifi_cfg.ssid",
      password: "net.cfg.wlan0.wifi_cfg.pass",
    });
    expect(getAtPath(config, paths.ssid)).toBe("customer-network");
    expect(getAtPath(config, paths.password)).toBe("customer-password");
  });

  test("updates the device-wrapped Sun schema", () => {
    const config = wrappedSunConfig();
    const paths = applyWifiCredentials(config, deviceId, {
      ssid: "customer-network",
      password: "customer-password",
    });

    expect(paths).toEqual({
      ssid: `${deviceId}.cmp.net.cfg.wlan0.wifi_cfg.ssid`,
      password: `${deviceId}.cmp.net.cfg.wlan0.wifi_cfg.pass`,
    });
    expect(getAtPath(config, paths.ssid)).toBe("customer-network");
    expect(getAtPath(config, paths.password)).toBe("customer-password");
  });

  test("resolves a sole wrapped device key when the expected ID differs", () => {
    const config = wrappedSunConfig();
    expect(resolveWifiConfigPaths(config, "DEVICE_EXPECTED").ssid).toBe(
      `${deviceId}.cmp.net.cfg.wlan0.wifi_cfg.ssid`,
    );
  });

  test("fails closed when WiFi fields are absent", () => {
    expect(() => resolveWifiConfigPaths({}, deviceId)).toThrow(
      "missing from cfg.json",
    );
  });
});

describe("Planet config paths", () => {
  test("updates the wrapped communication address", () => {
    const config: JsonObject = {
      schema_version: "1",
      [deviceId]: { cfg: { comm_addr: "0X0A" } },
    };
    const path = resolvePlanetCommAddressPath(config, deviceId);
    setAtPath(config, path, deviceId);
    expect(getAtPath(config, path)).toBe(deviceId);
  });

  test("does not invent missing paths", () => {
    const config: JsonObject = { existing: true };
    expect(() => setAtPath(config, "missing.value", 1)).toThrow(
      "does not exist",
    );
  });
});

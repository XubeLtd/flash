import { input, password, select } from "@inquirer/prompts";
import {
  getAtPath,
  resolvePlanetCommAddressPath,
  resolveWifiConfigPaths,
  setAtPath,
  type JsonObject,
} from "@xube/device-toolkit/config";
import {
  DEVICE_TYPE_PLANET,
  DEVICE_TYPE_SUN,
  type TDeviceTypeOption,
} from "../device-type/device-type.interface";

export type EditableFieldPatch = {
  paths: string[];
  values: Record<string, unknown>;
};

export type EditableFieldContext = {
  deviceId: string;
  currentConfig: unknown;
};

export type EditableFieldDef = {
  key: string;
  label: string;
  appliesTo: readonly TDeviceTypeOption[];
  jsonPaths: (deviceId: string) => readonly string[];
  prompt: (ctx: EditableFieldContext) => Promise<EditableFieldPatch | null>;
};

const WIFI_SSID_PATH = "net.cfg.wlan0.wifi_cfg.ssid";
const WIFI_PASS_PATH = "net.cfg.wlan0.wifi_cfg.pass";

const asConfigObject = (config: unknown): JsonObject => {
  if (typeof config !== "object" || config === null || Array.isArray(config)) {
    throw new Error("cfg.json must contain a JSON object.");
  }
  return config as JsonObject;
};

const promptForWifi = async (
  ctx: EditableFieldContext
): Promise<EditableFieldPatch | null> => {
  const config = asConfigObject(ctx.currentConfig);
  const paths = resolveWifiConfigPaths(config, ctx.deviceId);
  const currentSsid = getAtPath(config, paths.ssid);
  const currentPass = getAtPath(config, paths.password);

  const ssid = await input({
    message: "WiFi SSID:",
    default: typeof currentSsid === "string" ? currentSsid : undefined,
    validate: (value) =>
      value.trim().length > 0 ? true : "SSID cannot be empty",
  });

  const pass = await password({
    message: "WiFi password:",
    mask: "*",
    validate: (value) =>
      value.length > 0 ? true : "Password cannot be empty",
  });

  if (ssid === currentSsid && pass === currentPass) {
    return null;
  }

  return {
    paths: [paths.ssid, paths.password],
    values: {
      [paths.ssid]: ssid,
      [paths.password]: pass,
    },
  };
};

const HEX_BYTE_PATTERN = /^0[xX][0-9a-fA-F]{1,2}$/;

const normaliseHexByte = (raw: string): string => {
  const digits = raw.slice(2).toUpperCase().padStart(2, "0");
  return `0X${digits}`;
};

const validateI2cHex = (value: string): true | string => {
  const trimmed = value.trim();
  if (!HEX_BYTE_PATTERN.test(trimmed)) {
    return "Enter a hex byte like 0x0A or 0xAA (0x followed by 1–2 hex digits).";
  }
  const parsed = parseInt(trimmed.slice(2), 16);
  if (parsed < 0x08 || parsed > 0x77) {
    return `0x${parsed.toString(16).toUpperCase()} is outside the usable 7-bit I²C range (0x08–0x77).`;
  }
  return true;
};

const promptForPlanetCommAddr = async (
  ctx: EditableFieldContext
): Promise<EditableFieldPatch | null> => {
  const config = asConfigObject(ctx.currentConfig);
  const path = resolvePlanetCommAddressPath(config, ctx.deviceId);
  const currentRaw = getAtPath(config, path);
  const current = typeof currentRaw === "string" ? currentRaw : undefined;
  const currentLooksHex = current ? HEX_BYTE_PATTERN.test(current) : false;

  if (current) {
    console.log(`   Current communication address: ${current}`);
  }

  const mode = await select<"ble" | "i2c">({
    message: "How should this device communicate?",
    choices: [
      {
        name: `Bluetooth (BLE) — name will be set to the device ID (${ctx.deviceId})`,
        value: "ble",
      },
      {
        name: "I²C — enter a hex address (e.g. 0x0A)",
        value: "i2c",
      },
    ],
    default: currentLooksHex ? "i2c" : "ble",
  });

  let nextValue: string;
  if (mode === "ble") {
    nextValue = ctx.deviceId;
  } else {
    const raw = await input({
      message: "I²C address (hex):",
      default: currentLooksHex ? current : "0x0A",
      validate: validateI2cHex,
    });
    nextValue = normaliseHexByte(raw.trim());
  }

  if (nextValue === current) {
    console.log("   No change — communication address already matches.");
    return null;
  }

  return {
    paths: [path],
    values: { [path]: nextValue },
  };
};

export const EDITABLE_FIELDS: readonly EditableFieldDef[] = [
  {
    key: "wifi",
    label: "WiFi credentials (SSID + password)",
    appliesTo: [DEVICE_TYPE_SUN],
    jsonPaths: (deviceId) => [
      WIFI_SSID_PATH,
      WIFI_PASS_PATH,
      `${deviceId}.cmp.${WIFI_SSID_PATH}`,
      `${deviceId}.cmp.${WIFI_PASS_PATH}`,
    ],
    prompt: promptForWifi,
  },
  {
    key: "planet-comm-addr",
    label: "Communication address (Bluetooth name or I²C address)",
    appliesTo: [DEVICE_TYPE_PLANET],
    jsonPaths: (deviceId) => [`${deviceId}.cfg.comm_addr`],
    prompt: promptForPlanetCommAddr,
  },
] as const;

export const editableFieldsForDeviceType = (
  deviceType: TDeviceTypeOption
): EditableFieldDef[] =>
  EDITABLE_FIELDS.filter((f) => f.appliesTo.includes(deviceType));

export { getAtPath, setAtPath };

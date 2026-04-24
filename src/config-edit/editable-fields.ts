import { input, password } from "@inquirer/prompts";
import {
  DEVICE_TYPE_SUN,
  type TDeviceTypeOption,
} from "../device-type/device-type.interface";

export type EditableFieldPatch = {
  paths: string[];
  values: Record<string, unknown>;
};

export type EditableFieldDef = {
  key: string;
  label: string;
  appliesTo: readonly TDeviceTypeOption[];
  jsonPaths: readonly string[];
  prompt: (currentConfig: unknown) => Promise<EditableFieldPatch | null>;
};

const WIFI_SSID_PATH = "net.cfg.wlan0.wifi_cfg.ssid";
const WIFI_PASS_PATH = "net.cfg.wlan0.wifi_cfg.pass";

const promptForWifi = async (
  currentConfig: unknown
): Promise<EditableFieldPatch | null> => {
  const currentSsid = getAtPath(currentConfig, WIFI_SSID_PATH);
  const currentPass = getAtPath(currentConfig, WIFI_PASS_PATH);

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
    paths: [WIFI_SSID_PATH, WIFI_PASS_PATH],
    values: {
      [WIFI_SSID_PATH]: ssid,
      [WIFI_PASS_PATH]: pass,
    },
  };
};

export const EDITABLE_FIELDS: readonly EditableFieldDef[] = [
  {
    key: "wifi",
    label: "WiFi credentials (SSID + password)",
    appliesTo: [DEVICE_TYPE_SUN],
    jsonPaths: [WIFI_SSID_PATH, WIFI_PASS_PATH],
    prompt: promptForWifi,
  },
] as const;

export const editableFieldsForDeviceType = (
  deviceType: TDeviceTypeOption
): EditableFieldDef[] =>
  EDITABLE_FIELDS.filter((f) => f.appliesTo.includes(deviceType));

export const getAtPath = (obj: unknown, path: string): unknown => {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
};

export const setAtPath = (
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): void => {
  const parts = path.split(".");
  const last = parts.pop();
  if (!last) throw new Error(`Invalid path: ${path}`);
  let current: Record<string, unknown> = obj;
  for (const part of parts) {
    const next = current[part];
    if (next === null || next === undefined || typeof next !== "object") {
      throw new Error(`Path ${path} does not exist in config (stopped at ${part})`);
    }
    current = next as Record<string, unknown>;
  }
  current[last] = value;
};

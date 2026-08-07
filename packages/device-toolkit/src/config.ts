export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | JsonObject;

export type JsonObject = { [key: string]: JsonValue };

const isJsonObject = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const getAtPath = (
  obj: JsonObject,
  path: string
): JsonValue | undefined => {
  const segments = path.split(".");
  let current: JsonValue | undefined = obj;
  for (const segment of segments) {
    if (!isJsonObject(current)) {
      return undefined;
    }
    current = current[segment];
  }
  return current;
};

export const setAtPath = (
  obj: JsonObject,
  path: string,
  value: JsonValue
): void => {
  const segments = path.split(".");
  let current: JsonObject = obj;
  for (const segment of segments.slice(0, -1)) {
    const next = current[segment];
    if (!isJsonObject(next)) {
      throw new Error(`Path "${path}" does not exist in the config.`);
    }
    current = next;
  }
  const lastSegment = segments[segments.length - 1]!;
  if (!(lastSegment in current)) {
    throw new Error(`Path "${path}" does not exist in the config.`);
  }
  current[lastSegment] = value;
};

const WIFI_SSID_SUFFIX = "net.cfg.wlan0.wifi_cfg.ssid";
const WIFI_PASS_SUFFIX = "net.cfg.wlan0.wifi_cfg.pass";

export type WifiConfigPaths = {
  ssid: string;
  password: string;
};

export const resolveWifiConfigPaths = (
  config: JsonObject,
  deviceId: string
): WifiConfigPaths => {
  if (getAtPath(config, WIFI_SSID_SUFFIX) !== undefined) {
    return { ssid: WIFI_SSID_SUFFIX, password: WIFI_PASS_SUFFIX };
  }

  const expectedSsid = `${deviceId}.cmp.${WIFI_SSID_SUFFIX}`;
  if (getAtPath(config, expectedSsid) !== undefined) {
    return {
      ssid: expectedSsid,
      password: `${deviceId}.cmp.${WIFI_PASS_SUFFIX}`,
    };
  }

  const wrappedKeys = Object.keys(config).filter(
    (key) => getAtPath(config, `${key}.cmp.${WIFI_SSID_SUFFIX}`) !== undefined
  );

  if (wrappedKeys.length === 1) {
    const key = wrappedKeys[0]!;
    return {
      ssid: `${key}.cmp.${WIFI_SSID_SUFFIX}`,
      password: `${key}.cmp.${WIFI_PASS_SUFFIX}`,
    };
  }

  throw new Error("WiFi configuration fields are missing from cfg.json.");
};

export const applyWifiCredentials = (
  config: JsonObject,
  deviceId: string,
  credentials: { ssid: string; password: string }
): WifiConfigPaths => {
  const paths = resolveWifiConfigPaths(config, deviceId);
  setAtPath(config, paths.ssid, credentials.ssid);
  setAtPath(config, paths.password, credentials.password);
  return paths;
};

export const resolvePlanetCommAddressPath = (
  config: JsonObject,
  deviceId: string
): string => {
  const parent = getAtPath(config, `${deviceId}.cfg`);
  if (!isJsonObject(parent) || !("comm_addr" in parent)) {
    throw new Error(
      `Communication address field is missing from cfg.json for device ${deviceId}.`
    );
  }
  return `${deviceId}.cfg.comm_addr`;
};

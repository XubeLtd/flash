export interface NrfutilDevice {
  serialNumber?: unknown;
  traits?: { jlink?: unknown };
  devkit?: { deviceFamily?: unknown };
}

/**
 * Parse nrfutil's JSONL device-list stream. Only nRF53 J-Link probes are
 * eligible for Planet gen 2 flashing.
 */
export const parseNrf53ProbeUids = (output: string): string[] => {
  const uids = new Set<string>();
  for (const line of output.split(/\r?\n/)) {
    if (line.trim().length === 0) continue;
    try {
      const event = JSON.parse(line);
      if (event?.data?.type !== "devices") continue;
      const devices: unknown = event?.data?.data?.devices;
      if (!Array.isArray(devices)) continue;
      for (const device of devices as NrfutilDevice[]) {
        if (device?.traits?.jlink !== true) continue;
        if (device?.devkit?.deviceFamily !== "NRF53_FAMILY") continue;
        if (typeof device?.serialNumber !== "string") continue;
        const uid = device.serialNumber.trim();
        if (uid.length > 0) uids.add(uid);
      }
    } catch {
      // Ignore non-JSON diagnostic lines in the JSONL stream.
    }
  }
  return [...uids];
};

const RECOVERY_MARKERS = [
  "approtect",
  "access port protection",
  "recover",
  "device is protected",
] as const;

export const isNrfRecoveryRequired = (output: string): boolean => {
  const normalised = output.toLowerCase();
  return RECOVERY_MARKERS.some((marker) => normalised.includes(marker));
};

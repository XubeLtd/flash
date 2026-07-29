export * from "./sdk/dev/xube-sdk";

import { xubeDev } from "./sdk/dev/xube-sdk";
import { xube as xubeProd } from "./sdk/prod/xube-sdk";

export type TXubeEnvironment = "dev" | "prod";

export const resolveXubeEnvironment = (
  value: string | undefined,
): TXubeEnvironment => {
  const environment = value?.trim().toLowerCase() || "dev";
  if (environment !== "dev" && environment !== "prod") {
    throw new Error(
      `Unsupported XUBE_ENV "${value}". Expected "dev" or "prod".`,
    );
  }
  return environment;
};

export const xubeEnvironment = resolveXubeEnvironment(process.env.XUBE_ENV);

// Dev remains the public tool's default. Both generated clients expose the
// operations used by the flash workflow; the cast keeps the stable local type
// surface while allowing the runtime endpoint and response schemas to differ.
export const xubeSdk =
  xubeEnvironment === "prod"
    ? (xubeProd as unknown as typeof xubeDev)
    : xubeDev;

export const BOOTLOADER_FOLDER_NAME = "bootloader";
export const CONFIG_FOLDER_NAME = "config";
export const CERTIFICATES_FOLDER_NAME = "certificates";
export const FIRMWARE_FOLDER_NAME = "firmware";
export const FILE_SYSTEM_FOLDER_NAME = "filesystem";

export const CERT_NAME_CRT = "cert.pem.crt";
export const CERT_NAME_PRV = "prv.pem.key";
export const CERT_NAME_PUB = "pub.pem.key";
export const CERT_NAME_CA = "rootca.pem";

export const FIRMWARE_FILE_NAME = "firmware.bin";
export const FIRMWARE_NET_FILE_NAME = "firmware_net.bin";
export const BOOTLOADER_FILE_NAME = "bootloader.bin";
export const STORAGE_PARTITION_FILE_NAME = "storage_partition.bin";

export const VERSION_ZIP_FILE_NAME = "version.zip";

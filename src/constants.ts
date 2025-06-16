export * from "./sdk/prod/xube-sdk";
export { xubeSdk };

import { xube as xubeSdk } from "./sdk/prod/xube-sdk";

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
export const BOOTLOADER_FILE_NAME = "bootloader.bin";
export const STORAGE_PARTITION_FILE_NAME = "storage_partition.bin";

export const VERSION_ZIP_FILE_NAME = "version.zip";

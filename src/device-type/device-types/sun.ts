import { resolve } from "path";
import {
  BOOTLOADER_FILE_NAME,
  BOOTLOADER_FOLDER_NAME,
  FILE_SYSTEM_FOLDER_NAME,
  FIRMWARE_FILE_NAME,
  FIRMWARE_FOLDER_NAME,
  STORAGE_PARTITION_FILE_NAME,
  type TXubeGetDeviceModelsResponse,
} from "../../constants";
import { flashWithJLink } from "../../jlink";
import { DeviceType } from "../device-type";
import { DEVICE_TYPE_SUN, type IDeviceType } from "../device-type.interface";

export const getCommanderScript = (sourceDir: string) => {
  const bootloader = resolve(
    sourceDir,
    BOOTLOADER_FOLDER_NAME,
    BOOTLOADER_FILE_NAME
  );
  const firmware = resolve(sourceDir, FIRMWARE_FOLDER_NAME, FIRMWARE_FILE_NAME);
  const fs = resolve(
    sourceDir,
    FILE_SYSTEM_FOLDER_NAME,
    STORAGE_PARTITION_FILE_NAME
  );
  return `
  device RW612
  speed 4000
  r
  h
  loadfile ${bootloader} 0x08000000
  loadfile ${firmware} 0x08020000
  loadfile ${fs} 0x09620000
  r
  g
  exit
`;
};

export class SunDeviceType extends DeviceType implements IDeviceType {
  hasFileSystem = true;

  constructor(model: TXubeGetDeviceModelsResponse[number]) {
    super(model, DEVICE_TYPE_SUN);
  }

  flash = async (deviceId: string, sourceDir: string): Promise<boolean> => {
    return flashWithJLink({
      deviceId,
      commanderScript: getCommanderScript(sourceDir),
    });
  };
}

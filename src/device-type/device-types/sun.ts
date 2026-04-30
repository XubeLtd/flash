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
import { flashWithRw612 } from "../../rw612";
import {
  findRw612RttChannel,
  type MonitorChannel,
} from "../../serial-monitor";
import {
  rebuildLittleFsImage,
  type LittleFsParams,
} from "../../version/build-filesystem";
import {
  SUN_REBUILD_REQUIRED_FILES,
  validateRequiredFiles,
  type ValidationResult,
} from "../../version/validate";
import { DeviceType } from "../device-type";
import { DEVICE_TYPE_SUN, type IDeviceType } from "../device-type.interface";

const SUN_JLINK_DEVICE = "RW612";
const SUN_JLINK_SPEED = 4000;

const SUN_LITTLEFS_BASE = {
  blockSize: 4096,
  readSize: 256,
  progSize: 256,
  cacheSize: 4096,
  blockCycles: 512,
  lookaheadSize: 256,
} as const;

const GEN1_FS_BLOCK_COUNT = 4096;
const GEN2_FS_BLOCK_COUNT = 1536;

interface SunFlashOffsets {
  bootloader: string;
  firmware: string;
  fileSystem: string;
}

const GEN1_OFFSETS: SunFlashOffsets = {
  bootloader: "0x08000000",
  firmware: "0x08020000",
  fileSystem: "0x09620000",
};

const GEN2_OFFSETS: SunFlashOffsets = {
  bootloader: "0x08000000",
  firmware: "0x08020000",
  fileSystem: "0x08920000",
};

const sourcePaths = (sourceDir: string) => ({
  bootloader: resolve(sourceDir, BOOTLOADER_FOLDER_NAME, BOOTLOADER_FILE_NAME),
  firmware: resolve(sourceDir, FIRMWARE_FOLDER_NAME, FIRMWARE_FILE_NAME),
  fileSystem: resolve(
    sourceDir,
    FILE_SYSTEM_FOLDER_NAME,
    STORAGE_PARTITION_FILE_NAME
  ),
});

const buildCommanderScript = (
  sourceDir: string,
  offsets: SunFlashOffsets
): string => {
  const { bootloader, firmware, fileSystem } = sourcePaths(sourceDir);
  return `
  device ${SUN_JLINK_DEVICE}
  speed ${SUN_JLINK_SPEED}
  r
  h
  loadfile ${bootloader} ${offsets.bootloader}
  loadfile ${firmware} ${offsets.firmware}
  loadfile ${fileSystem} ${offsets.fileSystem}
  r
  g
  exit
`;
};

abstract class BaseSunDeviceType extends DeviceType implements IDeviceType {
  hasFileSystem = true;

  protected abstract offsets: SunFlashOffsets;
  protected abstract fsBlockCount: number;

  constructor(model: TXubeGetDeviceModelsResponse[number]) {
    super(model, DEVICE_TYPE_SUN);
  }

  abstract flash(deviceId: string, sourceDir: string): Promise<boolean>;

  validateForRebuild = async (versionDir: string): Promise<ValidationResult> => {
    return validateRequiredFiles(versionDir, SUN_REBUILD_REQUIRED_FILES);
  };

  rebuildFileSystem = async (stagedDir: string): Promise<void> => {
    const params: LittleFsParams = {
      ...SUN_LITTLEFS_BASE,
      blockCount: this.fsBlockCount,
    };
    await rebuildLittleFsImage(stagedDir, params);
  };

  discoverProbe = async (): Promise<MonitorChannel | null> => {
    return findRw612RttChannel();
  };
}

export class Gen1SunDeviceType extends BaseSunDeviceType {
  protected offsets = GEN1_OFFSETS;
  protected fsBlockCount = GEN1_FS_BLOCK_COUNT;

  flash = async (deviceId: string, sourceDir: string): Promise<boolean> => {
    return flashWithJLink({
      deviceId,
      commanderScript: buildCommanderScript(sourceDir, this.offsets),
    });
  };
}

export class Gen2SunDeviceType extends BaseSunDeviceType {
  protected offsets = GEN2_OFFSETS;
  protected fsBlockCount = GEN2_FS_BLOCK_COUNT;

  flash = async (deviceId: string, sourceDir: string): Promise<boolean> => {
    const { bootloader, firmware, fileSystem } = sourcePaths(sourceDir);
    return flashWithRw612({
      deviceId,
      entries: [
        {
          path: bootloader,
          flashBase: this.offsets.bootloader,
          label: "bootloader",
        },
        {
          path: firmware,
          flashBase: this.offsets.firmware,
          label: "firmware",
        },
        {
          path: fileSystem,
          flashBase: this.offsets.fileSystem,
          label: "filesystem",
        },
      ],
    });
  };
}

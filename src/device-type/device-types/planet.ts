import { $ } from "bun";
import { mkdir, rm } from "fs/promises";
import { tmpdir } from "os";
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
import { flashWithStm32Programmer } from "../../stm32-programmer";
import { ensurePythonEnv } from "../../version/python-setup";
import {
  rebuildSettingsFsImage,
  type SettingsFsParams,
} from "../../version/build-filesystem";
import {
  PLANET_REBUILD_REQUIRED_FILES,
  validateRequiredFiles,
  type ValidationResult,
} from "../../version/validate";
import { DeviceType } from "../device-type";
import { DEVICE_TYPE_PLANET, type IDeviceType } from "../device-type.interface";

const BIN_TO_SPARSE_HEX_SCRIPT = resolve("./tools/bin_to_sparse_hex.py");

interface Stm32wb55Offsets {
  bootloader: string;
  firmware: string;
  fileSystem: string;
}

const STM32WB55_OFFSETS: Stm32wb55Offsets = {
  bootloader: "0x08000000",
  firmware: "0x0800C000",
  fileSystem: "0x080A2000",
};

const PLANET_SETTINGS_PARAMS: SettingsFsParams = {
  rootPath: "xube/cfg",
  sectorSize: 16384,
  partitionSize: 65536,
};

const convertBinToSparseHex = async (
  binPath: string,
  hexPath: string,
  baseAddress: string
): Promise<void> => {
  const pythonExecutable = await ensurePythonEnv();
  const result =
    await $`${pythonExecutable} ${BIN_TO_SPARSE_HEX_SCRIPT} ${binPath} ${hexPath} ${baseAddress}`
      .nothrow()
      .quiet();
  if (result.exitCode !== 0) {
    console.error("--- bin_to_sparse_hex.py stdout ---");
    console.error(result.stdout.toString());
    console.error("--- bin_to_sparse_hex.py stderr ---");
    console.error(result.stderr.toString());
    throw new Error(
      `bin_to_sparse_hex.py exited with code ${result.exitCode}`
    );
  }
};

abstract class BasePlanetDeviceType extends DeviceType implements IDeviceType {
  hasFileSystem = true;

  constructor(model: TXubeGetDeviceModelsResponse[number]) {
    super(model, DEVICE_TYPE_PLANET);
  }

  validateForRebuild = async (versionDir: string): Promise<ValidationResult> => {
    return validateRequiredFiles(versionDir, PLANET_REBUILD_REQUIRED_FILES);
  };

  rebuildFileSystem = async (stagedDir: string): Promise<void> => {
    await rebuildSettingsFsImage(stagedDir, PLANET_SETTINGS_PARAMS);
  };
}

export class Gen1PlanetDeviceType extends BasePlanetDeviceType {
  flash = async (deviceId: string, sourceDir: string): Promise<boolean> => {
    const fsBin = resolve(
      sourceDir,
      FILE_SYSTEM_FOLDER_NAME,
      STORAGE_PARTITION_FILE_NAME
    );
    const tempDir = resolve(tmpdir(), `flash-${deviceId}-planet-stm32wb55`);

    try {
      await mkdir(tempDir, { recursive: true });
      const fsHex = resolve(tempDir, "storage_partition.hex");

      await convertBinToSparseHex(
        fsBin,
        fsHex,
        STM32WB55_OFFSETS.fileSystem
      );

      const bootloader = resolve(
        sourceDir,
        BOOTLOADER_FOLDER_NAME,
        BOOTLOADER_FILE_NAME
      );
      const firmware = resolve(
        sourceDir,
        FIRMWARE_FOLDER_NAME,
        FIRMWARE_FILE_NAME
      );

      return await flashWithStm32Programmer({
        deviceId,
        entries: [
          { path: bootloader, address: STM32WB55_OFFSETS.bootloader },
          { path: firmware, address: STM32WB55_OFFSETS.firmware },
          { path: fsHex },
        ],
      });
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  };
}

export class Gen2PlanetDeviceType extends BasePlanetDeviceType {
  flash = async (
    _deviceId: string,
    _sourceDir: string
  ): Promise<boolean> => {
    throw new Error(
      `Flashing planet generation 2 devices is not currently supported via the flash repo.`
    );
  };
}

import { $ } from "bun";
import {
  PLANET_GEN1_FLASH_LAYOUT,
  PLANET_GEN2_FLASH_LAYOUT,
  type PlanetFlashLayout,
  type PlanetGen2FlashLayout,
} from "@xube/device-toolkit/layouts";
import { mkdir, rm } from "fs/promises";
import { tmpdir } from "os";
import { resolve } from "path";
import {
  BOOTLOADER_FILE_NAME,
  BOOTLOADER_FOLDER_NAME,
  FILE_SYSTEM_FOLDER_NAME,
  FIRMWARE_FILE_NAME,
  FIRMWARE_FOLDER_NAME,
  FIRMWARE_NET_FILE_NAME,
  STORAGE_PARTITION_FILE_NAME,
  type TXubeGetDeviceModelsResponse
} from "../../constants";
import { flashWithNRFUtil } from "../../nrf-programmer";
import {
  findJLinkChannel,
  findStLinkChannel,
  type MonitorChannel,
} from "../../serial-monitor";
import { flashWithStm32Programmer } from "../../stm32-programmer";
import {
  rebuildSettingsFsImage,
  type SettingsFsParams,
} from "../../version/build-filesystem";
import { ensurePythonEnv } from "../../version/python-setup";
import {
  PLANET_REBUILD_REQUIRED_FILES,
  validateRequiredFiles,
  type ValidationResult,
} from "../../version/validate";
import { DeviceType } from "../device-type";
import { DEVICE_TYPE_PLANET, type FlashOptions, type IDeviceType } from "../device-type.interface";

const BIN_TO_SPARSE_HEX_SCRIPT = resolve("./tools/bin_to_sparse_hex.py");

const planetSettingsParams = (
  layout: PlanetFlashLayout,
): SettingsFsParams => ({
  rootPath: "xube/cfg",
  sectorSize: 16384,
  partitionSize: 65536,
  writeBlockSize: layout.settingsWriteBlockSize,
});

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
  protected abstract layout: PlanetFlashLayout;

  constructor(model: TXubeGetDeviceModelsResponse[number]) {
    super(model, DEVICE_TYPE_PLANET);
  }

  validateForRebuild = async (versionDir: string): Promise<ValidationResult> => {
    return validateRequiredFiles(versionDir, PLANET_REBUILD_REQUIRED_FILES);
  };

  rebuildFileSystem = async (stagedDir: string): Promise<void> => {
    await rebuildSettingsFsImage(
      stagedDir,
      planetSettingsParams(this.layout),
    );
  };

  discoverProbe = async (): Promise<MonitorChannel | null> => {
    return null;
  };
}

export class Gen1PlanetDeviceType extends BasePlanetDeviceType {
  protected layout = PLANET_GEN1_FLASH_LAYOUT;

  override discoverProbe = async (): Promise<MonitorChannel | null> => {
    return findStLinkChannel();
  };

  flash = async (
    deviceId: string,
    sourceDir: string,
    options: FlashOptions = {}
  ): Promise<boolean> => {
    const fsBin = resolve(
      sourceDir,
      FILE_SYSTEM_FOLDER_NAME,
      STORAGE_PARTITION_FILE_NAME
    );
    const tempDir = resolve(tmpdir(), `flash-${deviceId}-planet-stm32wb55`);

    try {
      await mkdir(tempDir, { recursive: true });
      const fsHex = resolve(tempDir, "storage_partition.hex");

      if (!options.skipFileSystem) {
        await convertBinToSparseHex(fsBin, fsHex, this.layout.fileSystem);
      }

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
          { label: "bootloader", path: bootloader, address: this.layout.bootloader },
          { label: "firmware", path: firmware, address: this.layout.firmware },
          ...(options.skipFileSystem
            ? []
            : [{ label: "filesystem", path: fsHex, address: this.layout.fileSystem }]),
        ],
      });
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  };
}

export class Gen2PlanetDeviceType extends BasePlanetDeviceType {
  protected layout: PlanetGen2FlashLayout = PLANET_GEN2_FLASH_LAYOUT;

  override discoverProbe = async (): Promise<MonitorChannel | null> => {
    return findJLinkChannel();
  };

  flash = async (
    deviceId: string,
    sourceDir: string,
    options: FlashOptions = {}
  ): Promise<boolean> => {
    const bootloaderBin = resolve(
      sourceDir,
      BOOTLOADER_FOLDER_NAME,
      BOOTLOADER_FILE_NAME
    );
    const firmwareBin = resolve(
      sourceDir,
      FIRMWARE_FOLDER_NAME,
      FIRMWARE_FILE_NAME
    );
    const firmwareNetBin = resolve(
      sourceDir,
      FIRMWARE_FOLDER_NAME,
      FIRMWARE_NET_FILE_NAME
    );
    const fsBin = resolve(
      sourceDir,
      FILE_SYSTEM_FOLDER_NAME,
      STORAGE_PARTITION_FILE_NAME
    );

    const tempDir = resolve(tmpdir(), `flash-${deviceId}-planet-nrf5340`);

    try {
      await mkdir(tempDir, { recursive: true });
      const bootloaderHex = resolve(tempDir, "bootloader.hex");
      const firmwareHex = resolve(tempDir, "firmware.hex");
      const firmwareNetHex = resolve(tempDir, "firmware_net.hex");
      const fsHex = resolve(tempDir, "storage_partition.hex");

      await convertBinToSparseHex(
        bootloaderBin,
        bootloaderHex,
        this.layout.bootloader
      );
      await convertBinToSparseHex(
        firmwareBin,
        firmwareHex,
        this.layout.firmware
      );
      await convertBinToSparseHex(
        firmwareNetBin,
        firmwareNetHex,
        this.layout.firmwareNet
      );
      if (!options.skipFileSystem) {
        await convertBinToSparseHex(fsBin, fsHex, this.layout.fileSystem);
      }

      return await flashWithNRFUtil({
        deviceId,
        entries: [
          { label: "firmware-net", path: firmwareNetHex, address: this.layout.firmwareNet, core: "network" },
          { label: "bootloader", path: bootloaderHex, address: this.layout.bootloader, core: "application" },
          { label: "firmware", path: firmwareHex, address: this.layout.firmware, core: "application" },
          ...(options.skipFileSystem
            ? []
            : [{ label: "filesystem", path: fsHex, address: this.layout.fileSystem, core: "application" as const }]),
        ],
      });
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  };
}

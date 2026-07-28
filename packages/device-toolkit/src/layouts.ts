export interface PlanetFlashLayout {
  bootloader: string;
  firmware: string;
  fileSystem: string;
  settingsWriteBlockSize: number;
}

export interface PlanetGen2FlashLayout extends PlanetFlashLayout {
  firmwareNet: string;
}

/**
 * These values must match the current Zephyr board DTS partitions.
 * Keep them in the public core so the customer flasher, private provisioner,
 * and controller can consume one layout definition.
 */
export const PLANET_GEN1_FLASH_LAYOUT: PlanetFlashLayout = {
  bootloader: "0x08000000",
  firmware: "0x0800C000",
  fileSystem: "0x080B2000",
  settingsWriteBlockSize: 8,
};

export const PLANET_GEN2_FLASH_LAYOUT: PlanetGen2FlashLayout = {
  firmwareNet: "0x01000000",
  bootloader: "0x00000000",
  firmware: "0x0000C000",
  fileSystem: "0x000B2000",
  settingsWriteBlockSize: 4,
};

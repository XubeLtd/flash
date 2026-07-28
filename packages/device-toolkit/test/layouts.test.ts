import { describe, expect, test } from "bun:test";
import {
  PLANET_GEN1_FLASH_LAYOUT,
  PLANET_GEN2_FLASH_LAYOUT,
} from "../src/layouts";

describe("current Planet flash layouts", () => {
  test("matches the current B2000 filesystem partitions", () => {
    expect(PLANET_GEN1_FLASH_LAYOUT.fileSystem).toBe("0x080B2000");
    expect(PLANET_GEN2_FLASH_LAYOUT.fileSystem).toBe("0x000B2000");
  });

  test("uses the MCU-specific NVS write block alignment", () => {
    expect(PLANET_GEN1_FLASH_LAYOUT.settingsWriteBlockSize).toBe(8);
    expect(PLANET_GEN2_FLASH_LAYOUT.settingsWriteBlockSize).toBe(4);
  });
});

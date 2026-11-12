import { beforeEach, describe, expect, mock, test } from "bun:test";

// Capture what each device type would hand to the low-level flasher instead of
// touching real hardware. Mocks must be registered before the device types load.
let calls: { tool: string; options: any }[] = [];
const record = (tool: string) => async (options: any) => {
  calls.push({ tool, options });
  return true;
};

mock.module("../src/jlink", () => ({ flashWithJLink: record("jlink") }));
mock.module("../src/rw612", () => ({ flashWithRw612: record("rw612") }));
mock.module("../src/nrf-programmer", () => ({
  flashWithNRFUtil: record("nrfutil"),
  selectNrf53ProbeUid: async () => "0",
}));
mock.module("../src/stm32-programmer", () => ({
  flashWithStm32Programmer: record("stm32"),
  resolveStm32ProgrammerCli: async () => "true",
}));
// Planet converts .bin -> .hex via a python script; `true` makes that a no-op.
mock.module("../src/version/python-setup", () => ({
  ensurePythonEnv: async () => "true",
}));

const { Gen1SunDeviceType, Gen2SunDeviceType } = await import(
  "../src/device-type/device-types/sun"
);
const { Gen1PlanetDeviceType, Gen2PlanetDeviceType } = await import(
  "../src/device-type/device-types/planet"
);

const model = (generation: string) => ({ generation }) as any;
const SOURCE_DIR = "/tmp/xube-skip-fs-test";

const deviceTypes = [
  ["Gen1 Planet", () => new Gen1PlanetDeviceType(model("1"))],
  ["Gen2 Planet", () => new Gen2PlanetDeviceType(model("2"))],
  ["Gen2 Sun", () => new Gen2SunDeviceType(model("2"))],
] as const;

const lastLabels = (): string[] =>
  calls.at(-1)!.options.entries.map((e: { label: string }) => e.label);

beforeEach(() => {
  calls = [];
});

describe("--skip-fs", () => {
  for (const [name, make] of deviceTypes) {
    test(`${name} flashes the filesystem by default`, async () => {
      expect(await make().flash("dev", SOURCE_DIR)).toBe(true);
      expect(lastLabels()).toContain("filesystem");
    });

    test(`${name} omits only the filesystem when skipFileSystem is set`, async () => {
      await make().flash("dev", SOURCE_DIR);
      const full = lastLabels();

      expect(
        await make().flash("dev", SOURCE_DIR, { skipFileSystem: true })
      ).toBe(true);
      expect(lastLabels()).toEqual(full.filter((l) => l !== "filesystem"));
    });
  }

  describe("Gen1 Sun (J-Link Commander script)", () => {
    const script = () => calls.at(-1)!.options.commanderScript as string;
    const loadfiles = () =>
      script()
        .split("\n")
        .filter((line) => line.trim().startsWith("loadfile"));

    test("loads the filesystem by default", async () => {
      await new Gen1SunDeviceType(model("1")).flash("dev", SOURCE_DIR);
      expect(loadfiles()).toHaveLength(3);
      expect(script()).toContain("0x09620000");
    });

    test("drops only the filesystem loadfile when skipFileSystem is set", async () => {
      await new Gen1SunDeviceType(model("1")).flash("dev", SOURCE_DIR, {
        skipFileSystem: true,
      });
      expect(loadfiles()).toHaveLength(2);
      expect(script()).not.toContain("0x09620000");
      // Reset + go must still follow the remaining loads.
      expect(script()).toMatch(/loadfile[^\n]*0x08020000\n\s*r\n\s*g\n/);
    });
  });
});

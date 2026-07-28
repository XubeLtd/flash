import { describe, expect, test } from "bun:test";
import { readdir, readFile } from "fs/promises";
import { resolve } from "path";

const packageDir = resolve("packages/device-toolkit");

const sourceFiles = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = resolve(dir, entry.name);
      return entry.isDirectory() ? sourceFiles(path) : [path];
    }),
  );
  return nested.flat().filter((path) => path.endsWith(".ts"));
};

describe("public toolkit boundary", () => {
  test("has no private runtime dependencies", async () => {
    const manifest = JSON.parse(
      await readFile(resolve(packageDir, "package.json"), "utf8"),
    );
    const runtimeDependencies = Object.keys(manifest.dependencies ?? {});
    expect(runtimeDependencies).toEqual([]);
    expect(
      runtimeDependencies.some((name) => name.startsWith("@xubeltd/")),
    ).toBe(false);
  });

  test("contains no factory-only capabilities", async () => {
    const files = await sourceFiles(resolve(packageDir, "src"));
    const source = (
      await Promise.all(files.map((file) => readFile(file, "utf8")))
    ).join("\n");

    for (const forbidden of [
      "internal-devices",
      "generateCertificates",
      "createNewDevice",
      "assignDeviceToAccount",
      "CreateKeysAndCertificate",
      "BEGIN PRIVATE KEY",
    ]) {
      expect(source.includes(forbidden)).toBe(false);
    }
  });
});

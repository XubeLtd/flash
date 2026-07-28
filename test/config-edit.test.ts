import { describe, expect, test } from "bun:test";
import { mkdtemp, readFile, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import {
  applyPatchesToConfig,
  assertOnlyAllowedPathsChanged,
} from "../src/config-edit/apply-edits";

describe("config edit enforcement", () => {
  test("accepts only the selected wrapped WiFi fields", async () => {
    const dir = await mkdtemp(join(tmpdir(), "xube-flash-config-"));
    const original = join(dir, "original.json");
    const updated = join(dir, "updated.json");
    const ssidPath = "DEVICE_TEST.cmp.net.cfg.wlan0.wifi_cfg.ssid";
    const passPath = "DEVICE_TEST.cmp.net.cfg.wlan0.wifi_cfg.pass";
    const config = {
      schema_version: "1",
      DEVICE_TEST: {
        cmp: {
          net: {
            cfg: {
              wlan0: {
                wifi_cfg: { ssid: "old", pass: "old-pass", sec: 1 },
              },
            },
          },
        },
      },
    };

    try {
      const json = `${JSON.stringify(config, null, 2)}\n`;
      await writeFile(original, json);
      await writeFile(updated, json);
      await applyPatchesToConfig(updated, [
        {
          paths: [ssidPath, passPath],
          values: {
            [ssidPath]: "new-network",
            [passPath]: "new-password",
          },
        },
      ]);

      const result = await assertOnlyAllowedPathsChanged(original, updated, [
        ssidPath,
        passPath,
      ]);
      expect(result.changedPaths.sort()).toEqual([passPath, ssidPath].sort());

      const written = JSON.parse(await readFile(updated, "utf8"));
      expect(
        written.DEVICE_TEST.cmp.net.cfg.wlan0.wifi_cfg.ssid,
      ).toBe("new-network");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  test("rejects unrelated changes", async () => {
    const dir = await mkdtemp(join(tmpdir(), "xube-flash-config-"));
    const original = join(dir, "original.json");
    const updated = join(dir, "updated.json");
    try {
      await writeFile(original, '{"wifi":"old","other":1}\n');
      await writeFile(updated, '{"wifi":"new","other":2}\n');
      await expect(
        assertOnlyAllowedPathsChanged(original, updated, ["wifi"]),
      ).rejects.toThrow("Unauthorised changes");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

import { describe, expect, test } from "bun:test";
import { resolveXubeEnvironment } from "../src/constants";

describe("resolveXubeEnvironment", () => {
  test("defaults to dev", () => {
    expect(resolveXubeEnvironment(undefined)).toBe("dev");
    expect(resolveXubeEnvironment("")).toBe("dev");
  });

  test("accepts explicit dev and prod values", () => {
    expect(resolveXubeEnvironment("dev")).toBe("dev");
    expect(resolveXubeEnvironment(" PROD ")).toBe("prod");
  });

  test("rejects unknown environments", () => {
    expect(() => resolveXubeEnvironment("production")).toThrow(
      'Unsupported XUBE_ENV "production"',
    );
  });
});

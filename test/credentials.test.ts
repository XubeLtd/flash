import { describe, expect, test } from "bun:test";
import { resolveCredentials } from "../src/credentials";

const configured = {
  email: "configured@example.com",
  password: "configured-password",
};

describe("resolveCredentials", () => {
  test("uses config.ts credentials by default", () => {
    expect(resolveCredentials(configured, {})).toEqual(configured);
  });

  test("uses a complete environment override", () => {
    expect(
      resolveCredentials(configured, {
        XUBE_EMAIL: " override@example.com ",
        XUBE_PASSWORD: "override-password",
      }),
    ).toEqual({
      email: "override@example.com",
      password: "override-password",
    });
  });

  test("rejects partial environment overrides", () => {
    expect(() =>
      resolveCredentials(configured, {
        XUBE_EMAIL: "override@example.com",
      }),
    ).toThrow("Set both XUBE_EMAIL and XUBE_PASSWORD");
    expect(() =>
      resolveCredentials(configured, {
        XUBE_PASSWORD: "override-password",
      }),
    ).toThrow("Set both XUBE_EMAIL and XUBE_PASSWORD");
  });
});

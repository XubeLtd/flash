import { stat } from "fs/promises";
import { resolve } from "path";
import {
  CERT_NAME_CA,
  CERT_NAME_CRT,
  CERT_NAME_PRV,
  CERT_NAME_PUB,
  CERTIFICATES_FOLDER_NAME,
  CONFIG_FOLDER_NAME,
} from "../constants";

const CFG_JSON_FILE_NAME = "cfg.json";

export const SUN_REBUILD_REQUIRED_FILES = [
  [CONFIG_FOLDER_NAME, CFG_JSON_FILE_NAME],
  [CERTIFICATES_FOLDER_NAME, CERT_NAME_CRT],
  [CERTIFICATES_FOLDER_NAME, CERT_NAME_PRV],
  [CERTIFICATES_FOLDER_NAME, CERT_NAME_PUB],
  [CERTIFICATES_FOLDER_NAME, CERT_NAME_CA],
] as const;

export const PLANET_REBUILD_REQUIRED_FILES = [
  [CONFIG_FOLDER_NAME, CFG_JSON_FILE_NAME],
] as const;

export type ValidationResult =
  | { ok: true }
  | { ok: false; missing: string[]; empty: string[] };

export const validateRequiredFiles = async (
  versionDir: string,
  requiredFiles: ReadonlyArray<ReadonlyArray<string>>
): Promise<ValidationResult> => {
  const missing: string[] = [];
  const empty: string[] = [];

  for (const parts of requiredFiles) {
    const path = resolve(versionDir, ...parts);
    try {
      const s = await stat(path);
      if (!s.isFile()) {
        missing.push(path);
      } else if (s.size === 0) {
        empty.push(path);
      }
    } catch {
      missing.push(path);
    }
  }

  if (missing.length === 0 && empty.length === 0) return { ok: true };
  return { ok: false, missing, empty };
};

export const formatValidationError = (
  result: Extract<ValidationResult, { ok: false }>,
  versionDir: string
): string => {
  const lines = [
    `Version at ${versionDir} is missing files required to rebuild the filesystem image:`,
  ];
  if (result.missing.length > 0) {
    lines.push("  Missing:");
    for (const path of result.missing) lines.push(`    - ${path}`);
  }
  if (result.empty.length > 0) {
    lines.push("  Empty (zero bytes):");
    for (const path of result.empty) lines.push(`    - ${path}`);
  }
  lines.push(
    "Re-fetch the version from the backend and try again. If it persists, the version on the backend is incomplete."
  );
  return lines.join("\n");
};

import { readFile, writeFile } from "fs/promises";
import {
  setAtPath,
  type EditableFieldDef,
  type EditableFieldPatch,
} from "./editable-fields";

export type ConfigEditResult = {
  changedPaths: string[];
  allowedPaths: string[];
};

const readJson = async (path: string): Promise<Record<string, unknown>> => {
  const raw = await readFile(path, "utf8");
  return JSON.parse(raw) as Record<string, unknown>;
};

const writeJson = async (path: string, obj: unknown): Promise<void> => {
  await writeFile(path, `${JSON.stringify(obj, null, 4)}\n`, "utf8");
};

export const collectPatches = async (
  configPath: string,
  fields: EditableFieldDef[],
  deviceId: string
): Promise<{ patches: EditableFieldPatch[]; allowedPaths: string[] }> => {
  const config = await readJson(configPath);
  const patches: EditableFieldPatch[] = [];
  const allowedPaths: string[] = [];

  for (const field of fields) {
    allowedPaths.push(...field.jsonPaths(deviceId));
    const patch = await field.prompt({ deviceId, currentConfig: config });
    if (patch) {
      patches.push(patch);
    }
  }

  return { patches, allowedPaths };
};

export const applyPatchesToConfig = async (
  configPath: string,
  patches: EditableFieldPatch[]
): Promise<void> => {
  if (patches.length === 0) return;

  const config = await readJson(configPath);
  for (const patch of patches) {
    for (const [path, value] of Object.entries(patch.values)) {
      setAtPath(config, path, value);
    }
  }
  await writeJson(configPath, config);
};

export const diffChangedPaths = (
  original: unknown,
  updated: unknown,
  prefix = ""
): string[] => {
  if (Object.is(original, updated)) return [];

  const isObj = (v: unknown): v is Record<string, unknown> =>
    typeof v === "object" && v !== null && !Array.isArray(v);

  if (!isObj(original) || !isObj(updated)) {
    return JSON.stringify(original) === JSON.stringify(updated) ? [] : [prefix || "<root>"];
  }

  const changes: string[] = [];
  const keys = new Set([...Object.keys(original), ...Object.keys(updated)]);
  for (const key of keys) {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    if (!(key in original) || !(key in updated)) {
      changes.push(nextPrefix);
      continue;
    }
    changes.push(...diffChangedPaths(original[key], updated[key], nextPrefix));
  }
  return changes;
};

export const assertOnlyAllowedPathsChanged = async (
  originalConfigPath: string,
  updatedConfigPath: string,
  allowedPaths: string[]
): Promise<ConfigEditResult> => {
  const [original, updated] = await Promise.all([
    readJson(originalConfigPath),
    readJson(updatedConfigPath),
  ]);

  const changedPaths = diffChangedPaths(original, updated);
  const allowed = new Set(allowedPaths);
  const unauthorised = changedPaths.filter((p) => !allowed.has(p));

  if (unauthorised.length > 0) {
    throw new Error(
      `Unauthorised changes detected in cfg.json: ${unauthorised.join(
        ", "
      )}. Only these paths are editable: ${allowedPaths.join(", ")}`
    );
  }

  return { changedPaths, allowedPaths };
};

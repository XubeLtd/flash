import { resolve } from "path";
import { CONFIG_FOLDER_NAME } from "../constants";
import {
  applyPatchesToConfig,
  assertOnlyAllowedPathsChanged,
  collectPatches,
} from "../config-edit/apply-edits";
import {
  promptEditBeforeFlash,
  promptEditableFields,
} from "../config-edit/prompt-edits";
import type { IDeviceType } from "../device-type/device-type.interface";
import { rebuildSunFilesystem } from "./build-filesystem";
import {
  copyVersionToStaged,
  getStagedDir,
  removeStagedDir,
} from "./stage";
import {
  formatValidationError,
  validateSunVersionForRebuild,
} from "./validate";
import { buildVersionZip } from "./zip";

const CFG_JSON_FILE_NAME = "cfg.json";

export type PreparedEdit = {
  stagedDir: string;
  zipPath: string;
  changedPaths: string[];
};

export type PrepareEditOptions = {
  requireEdits?: boolean;
};

export const promptAndPrepareEdit = async (
  deviceId: string,
  deviceType: IDeviceType,
  sourceVersionDir: string,
  options: PrepareEditOptions = {}
): Promise<PreparedEdit | null> => {
  const requireEdits = options.requireEdits ?? false;

  const wantsEdit = await promptEditBeforeFlash();
  if (!wantsEdit) {
    if (requireEdits) {
      console.log(
        "ℹ️  No edits selected — nothing to push. Exiting without creating a new version."
      );
    }
    return null;
  }

  const fields = await promptEditableFields(deviceType.type);
  if (fields.length === 0) {
    return null;
  }

  if (deviceType.hasFileSystem) {
    const validation = await validateSunVersionForRebuild(sourceVersionDir);
    if (!validation.ok) {
      throw new Error(formatValidationError(validation, sourceVersionDir));
    }
  }

  const sourceConfigPath = resolve(
    sourceVersionDir,
    CONFIG_FOLDER_NAME,
    CFG_JSON_FILE_NAME
  );

  const { patches, allowedPaths } = await collectPatches(
    sourceConfigPath,
    fields
  );

  if (patches.length === 0) {
    console.log("ℹ️  No actual changes — skipping new version creation.");
    return null;
  }

  const stagedDir = getStagedDir(deviceId);
  await copyVersionToStaged(sourceVersionDir, stagedDir);

  const stagedConfigPath = resolve(
    stagedDir,
    CONFIG_FOLDER_NAME,
    CFG_JSON_FILE_NAME
  );

  try {
    await applyPatchesToConfig(stagedConfigPath, patches);

    const { changedPaths } = await assertOnlyAllowedPathsChanged(
      sourceConfigPath,
      stagedConfigPath,
      allowedPaths
    );

    if (changedPaths.length === 0) {
      console.log("ℹ️  Applied edits resulted in no real changes. Cleaning up.");
      await removeStagedDir(stagedDir);
      return null;
    }

    if (deviceType.hasFileSystem) {
      await rebuildSunFilesystem(stagedDir);
    }

    const { changedPaths: changedAfterBuild } =
      await assertOnlyAllowedPathsChanged(
        sourceConfigPath,
        stagedConfigPath,
        allowedPaths
      );

    if (
      changedAfterBuild.length !== changedPaths.length ||
      !changedAfterBuild.every((p) => changedPaths.includes(p))
    ) {
      throw new Error(
        "cfg.json unexpectedly changed during filesystem build. Aborting."
      );
    }

    const zipPath = await buildVersionZip(stagedDir);

    return { stagedDir, zipPath, changedPaths };
  } catch (error) {
    await removeStagedDir(stagedDir);
    throw error;
  }
};

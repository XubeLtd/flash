import { $ } from "bun";
import { cp, mkdir, rm } from "fs/promises";
import { resolve } from "path";
import ora from "ora";
import {
  CERT_NAME_CA,
  CERT_NAME_CRT,
  CERT_NAME_PRV,
  CERT_NAME_PUB,
  CERTIFICATES_FOLDER_NAME,
  CONFIG_FOLDER_NAME,
  FILE_SYSTEM_FOLDER_NAME,
  STORAGE_PARTITION_FILE_NAME,
} from "../constants";
import { ensurePythonEnv } from "./python-setup";

const CFG_JSON_FILE_NAME = "cfg.json";

const MKLITTLEFS_SCRIPT = resolve("./tools/mklittlefs.py");
const MKSETTINGS_SCRIPT = resolve("./tools/mksettings.py");

export interface LittleFsParams {
  blockSize: number;
  blockCount: number;
  readSize: number;
  progSize: number;
  cacheSize: number;
  blockCycles: number;
  lookaheadSize: number;
}

export const rebuildLittleFsImage = async (
  stagedDir: string,
  params: LittleFsParams
): Promise<void> => {
  const pythonExecutable = await ensurePythonEnv();

  const spinner = ora(
    "Rebuilding storage_partition.bin (littlefs) from edited cfg.json"
  ).start();

  const fsSrcDir = resolve(stagedDir, ".fs-src");
  const fsSrcCfgDir = resolve(fsSrcDir, "cfg");
  const fsSrcCertDir = resolve(fsSrcDir, "cert/mqtt");

  const stagedConfig = resolve(stagedDir, CONFIG_FOLDER_NAME, CFG_JSON_FILE_NAME);
  const stagedCertDir = resolve(stagedDir, CERTIFICATES_FOLDER_NAME);
  const stagedFsDir = resolve(stagedDir, FILE_SYSTEM_FOLDER_NAME);
  const outputBin = resolve(stagedFsDir, STORAGE_PARTITION_FILE_NAME);

  try {
    await rm(fsSrcDir, { recursive: true, force: true });
    await mkdir(fsSrcCfgDir, { recursive: true });
    await mkdir(fsSrcCertDir, { recursive: true });
    await mkdir(stagedFsDir, { recursive: true });

    await cp(stagedConfig, resolve(fsSrcCfgDir, CFG_JSON_FILE_NAME));
    await cp(
      resolve(stagedCertDir, CERT_NAME_CRT),
      resolve(fsSrcCertDir, CERT_NAME_CRT)
    );
    await cp(
      resolve(stagedCertDir, CERT_NAME_PRV),
      resolve(fsSrcCertDir, CERT_NAME_PRV)
    );
    await cp(
      resolve(stagedCertDir, CERT_NAME_PUB),
      resolve(fsSrcCertDir, CERT_NAME_PUB)
    );
    await cp(
      resolve(stagedCertDir, CERT_NAME_CA),
      resolve(fsSrcCertDir, CERT_NAME_CA)
    );

    const result =
      await $`${pythonExecutable} ${MKLITTLEFS_SCRIPT} \
        -s ${fsSrcDir} \
        -d ${outputBin} \
        --blocksize ${params.blockSize} \
        --blockcount ${params.blockCount} \
        --readsize ${params.readSize} \
        --progsize ${params.progSize} \
        --cachesize ${params.cacheSize} \
        --blockcycles ${params.blockCycles} \
        --lookahead ${params.lookaheadSize}`
        .nothrow()
        .quiet();

    if (result.exitCode !== 0) {
      spinner.fail("mklittlefs.py failed");
      console.error("--- stdout ---");
      console.error(result.stdout.toString());
      console.error("--- stderr ---");
      console.error(result.stderr.toString());
      throw new Error(`mklittlefs.py exited with code ${result.exitCode}`);
    }

    await rm(fsSrcDir, { recursive: true, force: true });
    spinner.succeed("Rebuilt storage_partition.bin (littlefs)");
  } catch (error) {
    spinner.fail("Failed to rebuild littlefs image");
    throw error;
  }
};

export interface SettingsFsParams {
  rootPath: string;
  sectorSize: number;
  partitionSize: number;
}

export const rebuildSettingsFsImage = async (
  stagedDir: string,
  params: SettingsFsParams
): Promise<void> => {
  const pythonExecutable = await ensurePythonEnv();

  const spinner = ora(
    "Rebuilding storage_partition.bin (NVS settings) from edited cfg.json"
  ).start();

  const stagedConfig = resolve(stagedDir, CONFIG_FOLDER_NAME, CFG_JSON_FILE_NAME);
  const stagedFsDir = resolve(stagedDir, FILE_SYSTEM_FOLDER_NAME);
  const outputBin = resolve(stagedFsDir, STORAGE_PARTITION_FILE_NAME);

  try {
    await mkdir(stagedFsDir, { recursive: true });

    const result =
      await $`${pythonExecutable} ${MKSETTINGS_SCRIPT} \
        ${stagedConfig} ${params.rootPath} ${outputBin} \
        --sector-size ${params.sectorSize} \
        --partition-size ${params.partitionSize}`
        .nothrow()
        .quiet();

    if (result.exitCode !== 0) {
      spinner.fail("mksettings.py failed");
      console.error("--- stdout ---");
      console.error(result.stdout.toString());
      console.error("--- stderr ---");
      console.error(result.stderr.toString());
      throw new Error(`mksettings.py exited with code ${result.exitCode}`);
    }

    spinner.succeed("Rebuilt storage_partition.bin (NVS settings)");
  } catch (error) {
    spinner.fail("Failed to rebuild NVS settings image");
    throw error;
  }
};

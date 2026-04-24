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

// LittleFS build params for SUN, matching
// zephyr-fw/tools/src/device-type/device-types/sun.ts buildFileSystem().
const SUN_LITTLEFS_PARAMS = {
  blockSize: 4096,
  blockCount: 4096,
  readSize: 256,
  progSize: 256,
  cacheSize: 4096,
  blockCycles: 512,
  lookaheadSize: 256,
};

export const rebuildSunFilesystem = async (stagedDir: string): Promise<void> => {
  const pythonExecutable = await ensurePythonEnv();

  const spinner = ora("Rebuilding storage_partition.bin from edited cfg.json").start();

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

    const scriptPath = resolve("./tools/mklittlefs.py");

    const p = SUN_LITTLEFS_PARAMS;
    const result =
      await $`${pythonExecutable} ${scriptPath} \
        -s ${fsSrcDir} \
        -d ${outputBin} \
        --blocksize ${p.blockSize} \
        --blockcount ${p.blockCount} \
        --readsize ${p.readSize} \
        --progsize ${p.progSize} \
        --cachesize ${p.cacheSize} \
        --blockcycles ${p.blockCycles} \
        --lookahead ${p.lookaheadSize}`.nothrow().quiet();

    if (result.exitCode !== 0) {
      spinner.fail("mklittlefs.py failed");
      console.error("--- stdout ---");
      console.error(result.stdout.toString());
      console.error("--- stderr ---");
      console.error(result.stderr.toString());
      throw new Error(`mklittlefs.py exited with code ${result.exitCode}`);
    }

    await rm(fsSrcDir, { recursive: true, force: true });
    spinner.succeed("Rebuilt storage_partition.bin");
  } catch (error) {
    spinner.fail("Failed to rebuild filesystem image");
    throw error;
  }
};

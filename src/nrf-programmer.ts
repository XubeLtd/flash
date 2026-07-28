import { select } from "@inquirer/prompts";
import {
  isNrfRecoveryRequired,
  parseNrf53ProbeUids,
} from "@xube/device-toolkit/nrfutil";
import { $ } from "bun";
import { stat } from "fs/promises";
import ora from "ora";
import which from "which";

export interface NRFFlashEntry {
  path: string;
  core: "application" | "network";
  address: string;
  label: string;
}

export interface NRFFlashOptions {
  deviceId: string;
  entries: NRFFlashEntry[];
}

interface CommandResult {
  exitCode: number;
  output: string;
}

const requireCli = async (cli: string, install: string): Promise<void> => {
  try {
    await which(cli);
  } catch {
    throw new Error(
      `${cli} is required to flash nRF devices but was not found on PATH. ${install}`,
    );
  }
};

const runNrfutil = async (args: string[]): Promise<CommandResult> => {
  const result = await $`nrfutil device ${args}`.nothrow().quiet();
  return {
    exitCode: result.exitCode,
    output: `${result.stdout.toString()}${result.stderr.toString()}`,
  };
};

const listNrf53ProbeUids = async (): Promise<string[]> => {
  const result = await runNrfutil(["--json", "list"]);
  if (result.exitCode !== 0) {
    throw new Error(
      `Could not enumerate nRF53 probes (nrfutil exit ${result.exitCode}).\n${result.output}`,
    );
  }
  return parseNrf53ProbeUids(result.output);
};

export const selectNrf53ProbeUid = async (): Promise<string> => {
  const configured = process.env.PROBE_UID?.trim();
  if (configured) return configured;

  const uids = await listNrf53ProbeUids();
  if (uids.length === 0) {
    throw new Error(
      "No connected nRF53 J-Link probe was found. Check power, USB, and probe access.",
    );
  }
  if (uids.length === 1) return uids[0]!;

  return select<string>({
    message: "Which nRF53 debug probe should be used?",
    choices: uids.map((uid) => ({ name: uid, value: uid })),
  });
};

const resetDevice = async (probeUid: string): Promise<void> => {
  let lastOutput = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    const result = await runNrfutil([
      "reset",
      "--serial-number",
      probeUid,
      "--core",
      "Application",
      "--reset-kind",
      "RESET_PIN",
    ]);
    if (result.exitCode === 0) return;
    lastOutput = result.output;
    await Bun.sleep(500);
  }
  throw new Error(`Failed to reset device.\n${lastOutput}`);
};

/**
 * Nordic's required nRF5340 recovery order is Network first (erases both
 * cores), then Application (leaves debug access open for programming).
 */
const recoverDevice = async (probeUid: string): Promise<void> => {
  const spinner = ora(
    "Recovering nRF5340 network core (clears APPROTECT and erases both cores)...",
  ).start();
  const network = await runNrfutil([
    "recover",
    "--core",
    "Network",
    "--serial-number",
    probeUid,
  ]);
  if (network.exitCode !== 0) {
    spinner.fail("nRF5340 network-core recovery failed.");
    throw new Error(network.output);
  }

  spinner.text =
    "Recovering nRF5340 application core (keeps debug access open)...";
  const application = await runNrfutil([
    "recover",
    "--core",
    "Application",
    "--serial-number",
    probeUid,
  ]);
  if (application.exitCode !== 0) {
    spinner.fail("nRF5340 application-core recovery failed.");
    throw new Error(application.output);
  }
  spinner.succeed("nRF5340 recovered in Network → Application order.");
};

const verifyEntries = async (entries: NRFFlashEntry[]): Promise<void> => {
  if (entries.length === 0) {
    throw new Error("No nRF flash artefacts were provided.");
  }
  for (const entry of entries) {
    const info = await stat(entry.path).catch(() => null);
    if (!info) throw new Error(`artefact missing: ${entry.path}`);
    if (!info.isFile()) throw new Error(`artefact is not a file: ${entry.path}`);
    if (info.size === 0) throw new Error(`artefact is empty: ${entry.path}`);
  }
};

const programEntry = async (
  probeUid: string,
  entry: NRFFlashEntry,
): Promise<void> => {
  const spinner = ora(
    `Programming ${entry.label} (${entry.path}) at ${entry.address}...`,
  ).start();
  const result = await runNrfutil([
    "program",
    "--serial-number",
    probeUid,
    "--family",
    "nrf53",
    "--firmware",
    entry.path,
    "--core",
    entry.core,
    "--options",
    "chip_erase_mode=ERASE_RANGES_TOUCHED_BY_FIRMWARE,verify=VERIFY_READ",
  ]);
  if (result.exitCode !== 0) {
    spinner.fail(`Failed to program ${entry.label}.`);
    throw new Error(
      `nrfutil failed while programming ${entry.label} (exit ${result.exitCode}).\n${result.output}`,
    );
  }
  spinner.succeed(`Successfully programmed ${entry.label}`);
};

const programAll = async (
  probeUid: string,
  entries: NRFFlashEntry[],
): Promise<void> => {
  for (const entry of entries) {
    await programEntry(probeUid, entry);
  }
  await resetDevice(probeUid);
};

export async function flashWithNRFUtil(
  options: NRFFlashOptions,
): Promise<boolean> {
  console.log(`⚡ Flashing ${options.deviceId} (nrfutil)...`);

  try {
    await verifyEntries(options.entries);
    await requireCli(
      "nrfutil",
      "Install it by following https://docs.nordicsemi.com/bundle/nrfutil/page/guides/installing.html.",
    );

    const probeUid = await selectNrf53ProbeUid();
    console.log(`✔ Using nRF53 probe ${probeUid}.`);

    try {
      await programAll(probeUid, options.entries);
      return true;
    } catch (firstError) {
      const message =
        firstError instanceof Error ? firstError.message : String(firstError);
      if (!isNrfRecoveryRequired(message)) throw firstError;

      console.warn(
        "⚠️ nRF53 access protection blocked programming. Recovering once, then restarting the complete flash plan.",
      );
      await recoverDevice(probeUid);
      await programAll(probeUid, options.entries);
      return true;
    }
  } catch (error) {
    console.error(
      `❌ nRF53 flash failed: ${error instanceof Error ? error.message : String(error)}`,
    );
    return false;
  }
}

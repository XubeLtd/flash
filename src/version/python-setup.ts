import { $ } from "bun";
import { stat } from "fs/promises";
import { resolve } from "path";
import ora from "ora";

const VENV_DIR = resolve("./.venv");
const VENV_PYTHON = resolve(VENV_DIR, "bin/python");
const VENV_PIP = resolve(VENV_DIR, "bin/pip");
const REQUIREMENTS_PATH = resolve("./tools/requirements.txt");
const MKLITTLEFS_SCRIPT = resolve("./tools/mklittlefs.py");

const MIN_PYTHON_MAJOR = 3;
const MIN_PYTHON_MINOR = 13;

const fileExists = async (path: string): Promise<boolean> => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

const findSystemPython = async (): Promise<string | null> => {
  const candidates = [
    "python3.13",
    "python3.14",
    "/opt/homebrew/bin/python3.13",
    "/usr/local/bin/python3.13",
    "python3",
  ];
  for (const cmd of candidates) {
    try {
      const result =
        await $`${{ raw: cmd }} -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')"`
          .nothrow()
          .quiet();
      if (result.exitCode === 0) {
        const [majorStr, minorStr] = result.stdout.toString().trim().split(".");
        const major = Number(majorStr);
        const minor = Number(minorStr);
        if (
          Number.isFinite(major) &&
          Number.isFinite(minor) &&
          (major > MIN_PYTHON_MAJOR ||
            (major === MIN_PYTHON_MAJOR && minor >= MIN_PYTHON_MINOR))
        ) {
          return cmd;
        }
      }
    } catch {
      // try next
    }
  }
  return null;
};

const venvIsReady = async (): Promise<boolean> => {
  if (!(await fileExists(VENV_PYTHON))) return false;
  const result = await $`${VENV_PYTHON} -c "import littlefs"`.nothrow().quiet();
  return result.exitCode === 0;
};

const createVenv = async (systemPython: string): Promise<void> => {
  const spinner = ora(`Creating Python venv at ${VENV_DIR}`).start();
  try {
    const result =
      await $`${{ raw: systemPython }} -m venv ${VENV_DIR}`.nothrow().quiet();
    if (result.exitCode !== 0) {
      spinner.fail("Failed to create venv");
      console.error(result.stderr.toString());
      throw new Error(`python -m venv exited with code ${result.exitCode}`);
    }
    spinner.succeed("Created Python venv");
  } catch (error) {
    spinner.fail("Failed to create venv");
    throw error;
  }
};

const installRequirements = async (): Promise<void> => {
  const spinner = ora("Installing Python dependencies (littlefs-python)").start();
  try {
    const upgrade = await $`${VENV_PIP} install --upgrade pip`.nothrow().quiet();
    if (upgrade.exitCode !== 0) {
      spinner.fail("Failed to upgrade pip");
      console.error(upgrade.stderr.toString());
      throw new Error(`pip upgrade exited with code ${upgrade.exitCode}`);
    }
    const install =
      await $`${VENV_PIP} install -r ${REQUIREMENTS_PATH}`.nothrow().quiet();
    if (install.exitCode !== 0) {
      spinner.fail("Failed to install requirements");
      console.error(install.stderr.toString());
      throw new Error(`pip install exited with code ${install.exitCode}`);
    }
    spinner.succeed("Python dependencies installed");
  } catch (error) {
    spinner.fail("Failed to install Python dependencies");
    throw error;
  }
};

/**
 * Ensures ./.venv exists with littlefs-python installed. Idempotent: a no-op
 * when the venv is already usable. On first run, creates the venv from a
 * system Python 3.13+ interpreter and installs tools/requirements.txt.
 */
export const ensurePythonEnv = async (): Promise<string> => {
  if (!(await fileExists(MKLITTLEFS_SCRIPT))) {
    throw new Error(
      `Expected mklittlefs.py at ${MKLITTLEFS_SCRIPT}. The flash repo is incomplete.`
    );
  }

  if (await venvIsReady()) {
    return VENV_PYTHON;
  }

  const hasVenvPython = await fileExists(VENV_PYTHON);

  if (!hasVenvPython) {
    const systemPython = await findSystemPython();
    if (!systemPython) {
      throw new Error(
        `Python ${MIN_PYTHON_MAJOR}.${MIN_PYTHON_MINOR}+ is required to rebuild the filesystem image but was not found on PATH. Install from https://www.python.org/downloads/ and re-run.`
      );
    }
    await createVenv(systemPython);
  }

  await installRequirements();

  if (!(await venvIsReady())) {
    throw new Error(
      `Python venv at ${VENV_DIR} was set up but 'import littlefs' still fails.`
    );
  }

  return VENV_PYTHON;
};

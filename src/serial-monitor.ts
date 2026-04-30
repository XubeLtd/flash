import { $ } from "bun";
import { readdir, stat, unlink, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { select } from "@inquirer/prompts";

const SERIAL_BAUD = 115200;
const TTY_DIR = "/dev";

// SRAM-alias range that covers all of RW612's RAM where Zephyr places the
// SEGGER RTT control block. Wide enough to be future-proof; pyocd / JLink
// scan it for the "SEGGER RTT" magic and connect to the first match.
const RW612_RTT_SEARCH_BASE = "0x20000000";
const RW612_RTT_SEARCH_SIZE = "0x130000";

// STM32WB55 SWV settings — match xubeplanet defconfig:
//   CONFIG_LOG_BACKEND_SWO_REF_FREQ_HZ=64000000  (64 MHz core / TPIU ref)
//   CONFIG_LOG_BACKEND_SWO_FREQ_HZ=2000000      (2 MHz SWO output)
const STM32WB55_SWV_SYSCLK_MHZ = "64";
const STM32WB55_SWV_ITM_PORT = "0";

const fileExists = async (path: string): Promise<boolean> => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

const listUsbModemTtys = async (): Promise<string[]> => {
  try {
    const entries = await readdir(TTY_DIR);
    return entries
      .filter((e) => e.startsWith("tty.usbmodem"))
      .map((e) => `${TTY_DIR}/${e}`);
  } catch {
    return [];
  }
};

const parsePyocdProbes = (
  pyocdListOutput: string
): {
  mcuLinkUids: string[];
  stLinkUids: string[];
  jlinkUids: string[];
} => {
  const mcuLinkUids: string[] = [];
  const stLinkUids: string[] = [];
  const jlinkUids: string[] = [];
  for (const line of pyocdListOutput.split("\n")) {
    // J-Link must be checked first — some MCU-Link probes get reflashed with
    // Segger firmware and report as "Segger J-Link MCU-Link", which would
    // also match the MCU-Link regex. The first match wins.
    const isJLink = /J-Link|JLink|Segger/i.test(line);
    const isMcuLink = !isJLink && /MCU-LINK|MCU-Link/.test(line);
    const isStLink = !isJLink && /STLINK|ST-LINK/i.test(line);
    if (!isJLink && !isMcuLink && !isStLink) continue;
    const tokens = line.trim().split(/\s+/);
    const target = tokens[tokens.length - 1];
    const uid = tokens[tokens.length - 2];
    if (!uid || !target || !/^[A-Z0-9]{6,}$/i.test(uid)) continue;
    if (isJLink) jlinkUids.push(uid);
    else if (isMcuLink) mcuLinkUids.push(uid);
    else if (isStLink) stLinkUids.push(uid);
  }
  return { mcuLinkUids, stLinkUids, jlinkUids };
};

export type MonitorChannelKind =
  | "rtt-rw612-mcu-link"
  | "uart-rw612-jlink"
  | "uart-vcom"
  | "swv-stm32";

export interface MonitorChannel {
  kind: MonitorChannelKind;
  /** UID for probe-targeted tools (MCU-Link / ST-Link); tty path for vcom. */
  ref: string;
  label: string;
}


/**
 * Enumerate every monitoring channel available right now: one per connected
 * probe. Sun firmware (RW612) logs over SEGGER RTT via the MCU-Link's CMSIS-DAP
 * link; Planet firmware (STM32WB55) logs over SWO via the ST-Link, which is
 * unreliable on macOS so we report it as such.
 */
export const listMonitorChannels = async (): Promise<MonitorChannel[]> => {
  const pyocdResult = await $`pyocd list`.nothrow().quiet();
  if (pyocdResult.exitCode !== 0) return [];
  const { mcuLinkUids, stLinkUids, jlinkUids } = parsePyocdProbes(
    pyocdResult.stdout.toString()
  );
  const channels: MonitorChannel[] = [];
  for (const uid of mcuLinkUids) {
    channels.push({
      kind: "rtt-rw612-mcu-link",
      ref: uid,
      label: `Sun · MCU-Link ${uid} (RTT via pyocd)`,
    });
  }
  for (const uid of jlinkUids) {
    channels.push({
      kind: "uart-rw612-jlink",
      ref: uid,
      label: `Sun · J-Link ${uid} (UART via VCOM, 115200 8N1)`,
    });
  }
  for (const uid of stLinkUids) {
    channels.push({
      kind: "swv-stm32",
      ref: uid,
      label: `Planet · ST-Link ${uid} (SWV via STM32_Programmer_CLI)`,
    });
  }
  return channels;
};

export const pickAnyMonitorChannel =
  async (): Promise<MonitorChannel | null> => {
    const channels = await listMonitorChannels();
    if (channels.length === 0) return null;
    if (channels.length === 1) return channels[0]!;
    const ref = await select<string>({
      message: "Which device do you want to monitor?",
      choices: channels.map((c) => ({ name: c.label, value: c.ref })),
    });
    return channels.find((c) => c.ref === ref)!;
  };

const streamRw612Rtt = async (uid: string): Promise<void> => {
  console.log(
    `📡 Connecting to RW612 RTT via MCU-Link ${uid}. The first ` +
      `connection scans SRAM for the SEGGER RTT control block (~10s). ` +
      `Press Ctrl+C to exit.\n`
  );
  const child = Bun.spawn(
    [
      "pyocd",
      "rtt",
      "--target",
      "rw612",
      "--uid",
      uid,
      "-M",
      "attach",
      "-a",
      RW612_RTT_SEARCH_BASE,
      "-s",
      RW612_RTT_SEARCH_SIZE,
    ],
    { stdin: "inherit", stdout: "inherit", stderr: "inherit" }
  );
  const onSigint = (): void => {
    child.kill("SIGTERM");
  };
  process.on("SIGINT", onSigint);
  try {
    await child.exited;
  } finally {
    process.off("SIGINT", onSigint);
  }
};

/**
 * Stream RW612 UART logs from a J-Link's VCOM call-out tty. Used for Sun
 * Gen 1 (FRDM-RW612), where the firmware logs over UART (MCUboot boot text
 * etc.) and the on-board NXP MCU-Link — reflashed with Segger J-Link OB
 * firmware — exposes a USB CDC-ACM endpoint mapped to the chip's UART.
 *
 * Two macOS specifics that matter:
 *   • use `/dev/cu.usbmodem…` (call-out), not `/dev/tty.usbmodem…` — the
 *     `tty.` variant blocks on DCD signaling for raw reads and gives us
 *     "Device not configured" errors after a chip reset.
 *   • the J-Link tty path is `/dev/cu.usbmodem<12-digit-zero-padded-SN>1`.
 *
 * We reset the chip via JLinkExe on attach so MCUboot prints its boot text.
 * Without that, attaching mid-run gets you nothing — the running app may
 * not be writing to UART by then.
 */
const streamRw612UartJLink = async (uid: string): Promise<void> => {
  const padded = uid.padStart(12, "0");
  const cu = `/dev/cu.usbmodem${padded}1`;

  const sttyResult =
    await $`stty -f ${cu} ${SERIAL_BAUD} cs8 -cstopb -parenb -ixon -ixoff`
      .nothrow()
      .quiet();
  if (sttyResult.exitCode !== 0) {
    console.error(`❌ Failed to configure ${cu} at ${SERIAL_BAUD} 8N1.`);
    console.error(sttyResult.stderr.toString());
    return;
  }

  console.log(
    `📡 Resetting chip via J-Link ${uid} so you see logs from boot…`
  );

  // Reset+run FIRST and let the JLink session fully exit. The J-Link OB
  // firmware buffers VCOM bytes from the chip while the SWD session is
  // active, then makes them available to readers once SWD is released. If we
  // open the cu while JLinkExe is still attached, we get garbage instead of
  // the buffered boot text.
  const reset = Bun.spawn(
    [
      "JLinkExe",
      "-device",
      "RW612",
      "-if",
      "SWD",
      "-speed",
      "4000",
      "-USB",
      padded,
      "-autoconnect",
      "1",
      "-NoGui",
      "1",
      "-CommanderScript",
      "/dev/stdin",
    ],
    { stdin: "pipe", stdout: "ignore", stderr: "ignore" }
  );
  reset.stdin.write("r\ng\nexit\n");
  reset.stdin.end();
  await reset.exited;

  // Brief settle window before opening the cu — the J-Link OB needs a moment
  // to finish flushing the VCOM buffer.
  await new Promise((r) => setTimeout(r, 1000));

  console.log(
    `📡 Streaming UART from ${cu} at ${SERIAL_BAUD} baud. Press Ctrl+C to exit.\n`
  );

  // cat the cu into a tmp file and tail it. Direct `stdout: "inherit"` on
  // cat sometimes buffers small bursts (the MCUboot boot lines are < 200 B),
  // and `tail -F` is line-flushed so the user sees output as it arrives.
  const logPath = join(tmpdir(), `xube-uart-${uid}.log`);
  await writeFile(logPath, "");

  const cat = Bun.spawn(["bash", "-lc", `cat '${cu}' > '${logPath}'`], {
    stdout: "ignore",
    stderr: "ignore",
  });
  const tail = Bun.spawn(["tail", "-n", "+1", "-f", logPath], {
    stdout: "inherit",
    stderr: "inherit",
  });

  const cleanup = (): void => {
    cat.kill("SIGTERM");
    tail.kill("SIGTERM");
  };
  const onSigint = (): void => cleanup();
  process.on("SIGINT", onSigint);

  try {
    await Promise.race([cat.exited, tail.exited]);
  } finally {
    cleanup();
    process.off("SIGINT", onSigint);
    try {
      await unlink(logPath);
    } catch {
      // ignore
    }
  }
};

/**
 * Stream STM32 SWV ITM port 0 to stdout via STM32_Programmer_CLI. We run the
 * CLI in `mode=NORMAL` (software reset on connect) — `mode=HOTPLUG` and
 * `mode=UR` both trip a libusb-darwin USB driver bug (`data overrun`) when
 * reading the ST-Link V3 trace endpoint, but `mode=NORMAL` doesn't. The CLI
 * writes to a log file, which we tail in real time.
 */
const streamStm32Swv = async (uid: string): Promise<void> => {
  const logPath = join(tmpdir(), `xube-swv-${uid}.log`);
  await writeFile(logPath, ""); // truncate any previous run

  console.log(
    `📡 Connecting to STM32WB55 SWV via ST-Link ${uid} (mode=NORMAL — ` +
      `the chip will be soft-reset on attach). Press Ctrl+C to exit.\n`
  );

  const swv = Bun.spawn(
    [
      "STM32_Programmer_CLI",
      "-c",
      "port=SWD",
      "mode=NORMAL",
      `-startswv`,
      `freq=${STM32WB55_SWV_SYSCLK_MHZ}`,
      `portnumber=${STM32WB55_SWV_ITM_PORT}`,
      logPath,
    ],
    { stdout: "ignore", stderr: "ignore" }
  );

  // Give the CLI a moment to initialise before tailing — otherwise we miss
  // the fact that the file is the active log and not a stale one.
  await new Promise((r) => setTimeout(r, 500));

  const tail = Bun.spawn(["tail", "-n", "+1", "-f", logPath], {
    stdout: "inherit",
    stderr: "inherit",
  });

  const cleanup = (): void => {
    swv.kill("SIGTERM");
    tail.kill("SIGTERM");
  };
  const onSigint = (): void => cleanup();
  process.on("SIGINT", onSigint);

  try {
    await Promise.race([swv.exited, tail.exited]);
  } finally {
    cleanup();
    process.off("SIGINT", onSigint);
    try {
      await unlink(logPath);
    } catch {
      // ignore
    }
  }
};

/** Configure tty for 115200 8N1 and stream until SIGINT. */
const streamUartVcom = async (port: string): Promise<void> => {
  const sttyResult =
    await $`stty -f ${port} ${SERIAL_BAUD} cs8 -cstopb -parenb`
      .nothrow()
      .quiet();
  if (sttyResult.exitCode !== 0) {
    console.error(`❌ Failed to configure ${port} at ${SERIAL_BAUD} 8N1.`);
    console.error(sttyResult.stderr.toString());
    return;
  }
  console.log(
    `📡 Streaming UART from ${port} at ${SERIAL_BAUD} baud. Press Ctrl+C to exit.\n`
  );
  const child = Bun.spawn(["cat", port], {
    stdout: "inherit",
    stderr: "inherit",
  });
  const onSigint = (): void => {
    child.kill("SIGTERM");
  };
  process.on("SIGINT", onSigint);
  try {
    await child.exited;
  } finally {
    process.off("SIGINT", onSigint);
  }
};

/**
 * Run the monitor for a chosen channel. RW612 → pyocd RTT. STM32 → SWV via
 * STM32_Programmer_CLI in mode=NORMAL. Plain UART → cat the VCOM.
 */
export const runMonitor = async (channel: MonitorChannel): Promise<void> => {
  switch (channel.kind) {
    case "rtt-rw612-mcu-link":
      await streamRw612Rtt(channel.ref);
      return;
    case "uart-rw612-jlink":
      await streamRw612UartJLink(channel.ref);
      return;
    case "swv-stm32":
      await streamStm32Swv(channel.ref);
      return;
    case "uart-vcom":
      await streamUartVcom(channel.ref);
      return;
  }
};

// Convenience wrappers used by the bun-flash post-flash hook on each device
// type — they pick the channel matching that device family.

/**
 * For the post-flash hook on Sun device types: prefer the RW612 RTT channel,
 * regardless of probe family. MCU-Link → pyocd-driven; J-Link → JLinkRTTLogger
 * (FRDM-RW612 dev boards typically have a Segger-OB reflashed MCU-Link).
 */
export const findRw612RttChannel = async (): Promise<MonitorChannel | null> => {
  const channels = await listMonitorChannels();
  return (
    channels.find((c) => c.kind === "rtt-rw612-mcu-link") ??
    channels.find((c) => c.kind === "uart-rw612-jlink") ??
    null
  );
};

export const findStLinkChannel = async (): Promise<MonitorChannel | null> => {
  const channels = await listMonitorChannels();
  return channels.find((c) => c.kind === "swv-stm32") ?? null;
};

// Helpers retained for the rare case anyone wants direct VCOM listing.
export const listSerialTtys = listUsbModemTtys;
export const checkPathExists = fileExists;

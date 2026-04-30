# Flash

A small helper for flashing Xube devices and updating their configuration.

> Tip — listening to ["Flash" by Queen](https://open.spotify.com/track/5aswWmjJLHBSYFknQjegfg?si=c433f1559c124688) while flashing is encouraged.

## When to use what

- **Device plugged into your computer?** → `bun flash` Reflashes the device end-to-end. You can optionally tweak the configuration first.
- **Device already in the field?** → `bun push` Updates the configuration on the backend so the device picks it up over-the-air or over Bluetooth. No physical connection needed.

## Setup

1. [Install Bun](https://bun.sh/docs/installation), then from this folder run:

   ```bash
   bun install
   ```

2. Install the tool that matches the device you're flashing. Skip this step if you're only ever using `bun push`.

   | Device         | Install                                                                                |
   | -------------- | -------------------------------------------------------------------------------------- |
   | Sun Gen 1      | [SEGGER J‑Link Software](https://www.segger.com/downloads/jlink/)                      |
   | Sun Gen 2      | `pipx install pyocd`                                                                   |
   | Planet (Gen 1) | [STM32CubeProgrammer](https://www.st.com/en/development-tools/stm32cubeprog.html)      |

   Python 3.13+ also needs to be on your PATH. Everything else is set up automatically the first time you flash.

3. Copy `config.example.ts` to `config.ts` and fill in the email and password you use to log into the Xube Console:

   ```bash
   cp config.example.ts config.ts
   ```

That's it — you're ready.

## `bun flash` — flash a connected device

```bash
bun flash
```

You'll be asked which account, device, and version to flash. Before flashing, you'll be offered the chance to change a few config values (currently just WiFi SSID and password). If you make changes, a new version is automatically saved on the backend after the device is successfully flashed, so the next time anyone touches this device they start from the up-to-date config.

If you don't want to change anything, just say "use as-is" and the device is flashed exactly as it is on the backend.

Once flashing finishes, `bun flash` automatically starts streaming firmware logs to your terminal. Hit Ctrl+C to stop.

## `bun monitor` — stream firmware logs from a connected device

```bash
bun monitor
```

Streams logs from whatever device is plugged in. If both a Sun and a Planet are connected, you'll be asked which one to monitor. Ctrl+C exits.

For Planet, attaching the monitor briefly resets the firmware so it starts logging from boot — that's expected.

## `bun push` — update config without flashing

```bash
bun push
```

Pick a device, edit the same set of config values, and the new version is pushed to the backend. The device will pick it up the next time it syncs (over-the-air or over Bluetooth).

If you don't actually change anything, nothing is uploaded.

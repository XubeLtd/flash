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

2. Install the right flashing tool for the device you'll be programming. These are only needed if you'll use `bun flash`; `bun push` needs none of them.

   | Device         | Probe                | Tools you need                                                                                                      |
   | -------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
   | Sun Gen 1      | J‑Link               | [SEGGER J‑Link Software](https://www.segger.com/downloads/jlink/) — `JLinkExe` on PATH                              |
   | Sun Gen 2      | MCU‑Link / CMSIS‑DAP | `pyocd` on PATH (`pipx install pyocd`)                                                                              |
   | Planet (Gen 1) | ST‑LINK              | [STM32CubeProgrammer](https://www.st.com/en/development-tools/stm32cubeprog.html) — `STM32_Programmer_CLI` on PATH¹ |

   ¹ The Mac installer puts the CLI in the app bundle. If it isn't on your PATH, set `STM32_PRG_PATH` to the directory containing `STM32_Programmer_CLI` (e.g. `/Applications/STMicroelectronics/STM32Cube/STM32CubeProgrammer/STM32CubeProgrammer.app/Contents/Resources/bin`).

   You also need Python 3.13+ available on PATH — the rest is bootstrapped into a local `.venv` automatically the first time you flash.

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

## `bun push` — update config without flashing

```bash
bun push
```

Pick a device, edit the same set of config values, and the new version is pushed to the backend. The device will pick it up the next time it syncs (over-the-air or over Bluetooth).

If you don't actually change anything, nothing is uploaded.

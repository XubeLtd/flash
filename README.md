# Flash

Note - It is recommended to listen to ["Flash" by Queen](https://open.spotify.com/track/5aswWmjJLHBSYFknQjegfg?si=c433f1559c124688) while flashing Xube devices.

## Installation

[Install the Bun runtime](https://bun.sh/docs/installation)

Install dependencies by running the following from the root directory of this repository

```bash
bun install
```

Install flashing tools:

- Download and install J Link [from here](https://www.segger.com/downloads/jlink/) and ensure J Link is in your PATH

## Setup

Create a new file from a copy of `config.example.ts` called `config.ts`

In `config.ts` replace the email and password with your credentials used to log into the Xube Console.

You're now ready to flash some devices 💥💥💥

## Flashing Devices:

Simply run the script and following the prompts:

```bash
bun flash
```

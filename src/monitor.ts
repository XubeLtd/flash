import { pickAnyMonitorChannel, runMonitor } from "./serial-monitor";

async function main(): Promise<void> {
  console.log("--------------------------------------------------");
  console.log("📡 Xube Device Serial Monitor 📟");
  console.log("--------------------------------------------------\n");

  const channel = await pickAnyMonitorChannel();
  if (!channel) {
    console.error("❌ No connected debug probe detected.");
    console.error(
      "   Plug a Sun (MCU-Link) or Planet (ST-Link) device in and retry."
    );
    process.exit(1);
  }

  await runMonitor(channel);
}

main().catch((error) => {
  console.error("Unhandled error in monitor:", error);
  process.exit(1);
});

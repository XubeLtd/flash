import { ensurePythonEnv } from "./version/python-setup";

async function main() {
  console.log("--------------------------------------------------");
  console.log("⚙️  Xube Flash — Setup");
  console.log("--------------------------------------------------\n");

  try {
    const pythonPath = await ensurePythonEnv();
    console.log(`\n✅ Ready. Python environment at ${pythonPath}`);
  } catch (error) {
    console.error("\n❌ Setup failed.");
    console.error(error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Unhandled error in setup:", error);
  process.exit(1);
});

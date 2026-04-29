import AdmZip from "adm-zip";
import { $ } from "bun";
import { mkdtemp, readdir, rm, stat } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

const rawArgs = process.argv.slice(2);
let env: string | undefined;
let profile: string | undefined = process.env.AWS_PROFILE || undefined;
let bucket: string | undefined = process.env.DEVICE_BUCKET || undefined;
let dryRun = false;
const positional: string[] = [];

const takeValue = (i: number, flag: string): [string, number] => {
  const v = rawArgs[i + 1];
  if (!v) throw new Error(`${flag} requires a value`);
  return [v, i + 1];
};

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i]!;
  if (arg === "--env" || arg === "-e") {
    [env, i] = takeValue(i, arg);
  } else if (arg.startsWith("--env=")) {
    env = arg.slice("--env=".length);
  } else if (arg === "--profile" || arg === "-p") {
    [profile, i] = takeValue(i, arg);
  } else if (arg.startsWith("--profile=")) {
    profile = arg.slice("--profile=".length);
  } else if (arg === "--bucket" || arg === "-b") {
    [bucket, i] = takeValue(i, arg);
  } else if (arg.startsWith("--bucket=")) {
    bucket = arg.slice("--bucket=".length);
  } else if (arg === "--dry-run" || arg === "-n") {
    dryRun = true;
  } else {
    positional.push(arg);
  }
}

const usage = () => {
  console.error(
    "Usage: bun run scripts/repack-version-zip.ts [--env <name>] [--profile <name>] [--bucket <name>] [--dry-run] <deviceId>/<versionId> [...]"
  );
  console.error("");
  console.error("Resolution:");
  console.error("  --env <name>      shortcut for --profile xube-<name> --bucket xube-device-<name>");
  console.error("  --profile <name>  AWS profile (overrides --env's profile)");
  console.error("  --bucket <name>   S3 bucket (overrides --env's bucket)");
  console.error("  --dry-run, -n     download + build the zip locally; skip upload");
  console.error("");
  console.error("Without --env, profile falls back to $AWS_PROFILE / AWS CLI default,");
  console.error("and bucket falls back to $DEVICE_BUCKET. One of --env or --bucket is required.");
};

if (positional.length === 0) {
  usage();
  process.exit(1);
}

if (env) {
  profile = profile ?? `xube-${env}`;
  bucket = bucket ?? `xube-device-${env}`;
}

if (!bucket) {
  console.error("❌ No bucket resolved. Pass --env or --bucket (or set DEVICE_BUCKET).");
  usage();
  process.exit(1);
}

const targets = positional.map((arg) => {
  const [deviceId, versionId] = arg.split("/");
  if (!deviceId || !versionId) {
    throw new Error(`Invalid arg "${arg}", expected "<deviceId>/<versionId>"`);
  }
  return { deviceId, versionId };
});

const BUCKET = bucket;
const profileFlag = profile ? ["--profile", profile] : [];

console.log(`Env:     ${env ?? "(not set)"}`);
console.log(`Profile: ${profile ?? "(AWS CLI default)"}`);
console.log(`Bucket:  ${BUCKET}`);
console.log(`Targets: ${targets.length}`);
if (dryRun) {
  console.log(`Mode:    DRY RUN (no upload, work dirs kept for inspection)`);
}

let okCount = 0;
let failCount = 0;

for (const { deviceId, versionId } of targets) {
  console.log(`\n📦 ${deviceId}/${versionId}`);

  const s3Prefix = `s3://${BUCKET}/${deviceId}/versions/${versionId}/`;
  const workDir = await mkdtemp(join(tmpdir(), `repack-${versionId}-`));
  const syncDir = join(workDir, "contents");
  const zipPath = join(workDir, "version.zip");

  try {
    console.log(`   ↓ aws s3 sync ${s3Prefix} (excluding version.zip)`);
    await $`aws ${profileFlag} s3 sync ${s3Prefix} ${syncDir} --exclude version.zip`.quiet();

    const entries = await readdir(syncDir).catch(() => [] as string[]);
    if (entries.length === 0) {
      console.warn(`   ⚠️  Nothing under ${s3Prefix} (excluding version.zip). Skipping.`);
      failCount++;
      continue;
    }
    console.log(`   • Top-level entries: ${entries.join(", ")}`);

    const zip = new AdmZip();
    zip.addLocalFolder(syncDir);
    zip.writeZip(zipPath);

    const size = (await stat(zipPath)).size;
    console.log(`   ✓ Built version.zip (${size.toLocaleString()} bytes)`);

    if (dryRun) {
      console.log(`   ⏭  Dry run — skipping upload to ${s3Prefix}version.zip`);
      console.log(`   📁 Inspect at: ${zipPath}`);
      console.log(`      Sync dir:   ${syncDir}`);
      okCount++;
      continue;
    }

    console.log(`   ↑ aws s3 cp → ${s3Prefix}version.zip`);
    await $`aws ${profileFlag} s3 cp ${zipPath} ${s3Prefix}version.zip --content-type application/zip`.quiet();

    console.log(`   ✅ Done.`);
    okCount++;
  } catch (error) {
    console.error(`   ❌ Failed:`, error);
    failCount++;
  } finally {
    if (!dryRun) {
      await rm(workDir, { recursive: true, force: true });
    }
  }
}

console.log(`\n———\nSucceeded: ${okCount}   Failed: ${failCount}`);
process.exit(failCount === 0 ? 0 : 1);

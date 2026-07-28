# @xube/device-toolkit

Public, credential-agnostic primitives shared by Xube's customer flasher,
private factory provisioner, and controller.

The package may contain:

- device flash layouts and artifact contracts;
- schema-aware config mutations such as Wi-Fi credentials;
- probe discovery/parsing and hardware-operation plans;
- runtime-neutral validation used before destructive hardware operations.

It must not contain:

- internal device-creation endpoints;
- certificate or private-key issuance;
- factory account-assignment authority;
- `@xubeltd/*` or CodeArtifact-only dependencies;
- embedded credentials or downloaded device artifacts.

The public flash CLI consumes the package directly through this Bun workspace.
Build the npm artifact with:

```bash
bun run build:toolkit
```

Publishing is intentionally a separate release action.

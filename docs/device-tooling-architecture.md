# Device tooling architecture

## Decision

Use a capability-layered architecture with a public, runtime-neutral core and
thin product-specific orchestrators.

```text
                         @xube/device-toolkit
                  public npm, no platform authority
            config • layouts • probes • plans • validation
                       /          |          \
                      /           |           \
             public flash   private provisioner   controller daemon
             existing only  create + certificates existing only
```

The first public core lives in this repository at
`packages/device-toolkit`. Keeping it beside the customer CLI means a fresh
clone remains self-contained while the package is prepared and released to
public npm.

## Hard security boundary

`@xube/device-toolkit` is allowed to:

- validate and mutate a caller-supplied device configuration;
- build filesystem images from caller-supplied files;
- select a locally attached debug probe;
- validate caller-supplied artifacts;
- execute an explicit flash plan against an explicitly selected probe;
- monitor a locally attached device.

It is not allowed to:

- create a platform device;
- issue, rotate, or download certificates or private keys;
- assign a device to an account;
- call internal device APIs;
- depend on `@xubeltd/*`, CodeArtifact, or another private registry;
- persist credentials, certificates, or downloaded device bundles;
- choose a platform environment implicitly.

The public CLI may authenticate a customer to public, permission-checked
platform APIs so they can select an existing device and fetch or upload one of
its versions. Authentication does not grant the core package extra
capabilities.

The private provisioner owns device creation, certificate issuance, initial
account assignment, source builds, and factory-only APIs. Those capabilities
belong in a future `@xubeltd/device-provisioning` package. It should depend on
the public toolkit, never the reverse.

The controller should depend only on the public toolkit for flashing/building
existing devices. If a future controller flow requires factory provisioning,
that must be a separately installed private adapter with an explicit
capability grant.

## Shared contracts

The reusable core should converge on four contracts:

1. `DeviceLayout`: model/generation, memory addresses, filesystem geometry,
   required artifacts, and monitor strategy.
2. `ArtifactBundle`: immutable paths plus hashes and sizes for bootloader,
   application firmware, optional network-core firmware, filesystem, config,
   and certificates supplied by the caller.
3. `FlashPlan`: ordered, inspectable operations with the selected probe UID,
   recovery policy, addresses, verification, and reset behavior.
4. `OperationRunner`: injected process/filesystem/time implementation. Bun,
   Node/controller, and tests can provide different adapters without changing
   device policy.

The core must validate a complete plan before the first hardware write. A
recovery that erases a device must restart the complete plan, because artifacts
written before recovery no longer exist.

## Current implementation

The first extraction centralizes the behavior that caused immediate drift:

- both current Planet filesystem offsets (`B2000`);
- per-MCU NVS write-block alignment (STM32WB55 = 8, nRF5340 = 4);
- flat and device-wrapped Sun Wi-Fi config paths;
- wrapped Planet communication-address paths;
- nRF53-only probe parsing and access-protection detection;
- current public API schemas and device `entityId` selection (never the
  account-facet `id`).

The public CLI consumes those definitions through its Bun workspace. Low-level
process adapters remain in the CLI for this release and are the next extraction
target after hardware validation.

## Migration sequence

1. Stabilize and hardware-test the public flash CLI with the shared constants
   and config logic.
2. Add fixture tests for every supported model/generation and version-bundle
   schema.
3. Move artifact validation and flash-plan construction into the public core;
   retain Bun command execution as an injected adapter.
4. Publish `@xube/device-toolkit` to public npm only after the package tarball
   is inspected and install-tested without Xube credentials.
5. Replace duplicated helpers in `zephyr-fw/tools` with the released public
   package. Keep device creation, certificates, account assignment, private
   SDK generation, and source checkout/build orchestration private.
6. Add `@xubeltd/device-provisioning` in the private commons repository as the
   factory orchestration layer.
7. Integrate the controller with the public package and a Node-compatible
   operation runner.

Cross-repository migration must not use a relative `file:` dependency: that
would work only in this workspace and fail for customers or CI. Until the
public package is published, the private provisioner keeps its known-good
implementation.

## Release gates

Before a public release:

- `bun install` succeeds using only the public npm registry;
- the package tarball contains `dist` and documentation only;
- a clean-room scan finds no config credentials, device bundles, certificates,
  private keys, internal endpoints, or `@xubeltd/*` dependencies;
- unit tests cover both live Sun config shapes and Planet layouts;
- generated filesystem images have the expected size and alignment;
- each supported device generation passes a real flash, boot verification, and
  monitor smoke test;
- Wi-Fi credentials are changed in the image actually flashed and are not
  printed in logs;
- a failed flash never uploads a newly edited version;
- an edited version is uploaded only after a successful flash;
- nRF recovery runs only for access-protection failures and restarts the full
  flash plan.

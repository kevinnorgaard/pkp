# Security Audit — 2026-08-13

15 HIGH vulnerabilities found. Manual semver upgrades required.
npm audit fix was run but made no changes (packages are at latest compatible versions).

## Required Upgrades

- Upgrade `@angular/*` and `@angular-devkit/build-angular` from v21 → v22
- Upgrade `undici` from 7.28.0 → >=7.29.0
- Upgrade `postcss` (no fix available yet — track advisory)

## Advisories

- GHSA-jhpw-976m-542j — Angular HttpTransferCache cross-request poisoning
- GHSA-jj27-h5hq-8x99 — Angular i18n XSS via event-handler attributes
- GHSA-w3rx-r6r6-pgpr / GHSA-5p2g-fcmc-qvqq — image-size DoS (infinite loop)
- GHSA-8xcm-r25x-g524 / GHSA-4cwx-7wf7-3272 / GHSA-m8rv-5g2x-5cg5 / GHSA-jr45-8vmc-qm54 / GHSA-v3r7-h72x-cjcm — undici vulnerabilities
- GHSA-r28c-9q8g-f849 / GHSA-fxqj-rqcc-2cmp — PostCSS path traversal

Delete this file after applying manual fixes.

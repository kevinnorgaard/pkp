# Security Audit — 2026-07-04

## HIGH Vulnerabilities

### http-proxy-middleware (via @angular-devkit/build-angular)
- **GHSA-gcq2-9pq2-cxqm**: multipart/form-data field injection via unescaped CRLF in `fixRequestBody`
- **GHSA-64mm-vxmg-q3vj**: `router` host+path substring matching allows Host-header-driven backend routing bypass

## Manual Fix Required
Update `@angular-devkit/build-angular` to `^19.2.8` (semver major bump):
```
npm install @angular-devkit/build-angular@^19.2.8 --save-dev
```

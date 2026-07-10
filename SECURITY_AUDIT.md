# Security Audit Note - 2026-07-10

npm audit fix could not automatically resolve HIGH vulnerabilities due to peer dependency conflicts with @angular/fire@21.0.0-rc.0 and rxfire.

## Manual steps required

1. Upgrade @angular/fire to a stable release compatible with firebase@12
   OR downgrade firebase to ^11.x in package.json to match rxfire's peer requirement
2. Then run: npm audit fix

## Vulnerabilities

- @angular-devkit/build-angular (HIGH): contains http-proxy-middleware <3.0.3
  - https://github.com/advisories/GHSA-gcq2-9pq2-cxqm
  - https://github.com/advisories/GHSA-64mm-vxmg-q3vj
- http-proxy-middleware 3.0.0-3.0.6 (HIGH): CRLF injection + host routing bypass
  - https://github.com/advisories/GHSA-gcq2-9pq2-cxqm
  - https://github.com/advisories/GHSA-64mm-vxmg-q3vj

# Add CI build with mocked Firebase/GraphQL

## Context
pkp embeds Firebase config from Angular environment files and uses GraphQL/Apollo.
`ng build` may fail in CI without real Firebase credentials. CI currently runs
`npm ci` + `lint` — no build step until mocking is in place.

## Plan

1. Read `src/environments/environment.ts` to identify all Firebase/GraphQL key names
2. Create `src/environments/environment.ci.ts` with matching keys set to empty strings:
   ```ts
   export const environment = {
     production: false,
     firebaseApiKey: '',
     firebaseAuthDomain: '',
     firebaseProjectId: '',
     // ... mirror all keys from environment.ts, set to ''
   };
   ```
3. Add `ci` build configuration to `angular.json` under
   `projects.<project-name>.architect.build.configurations`:
   ```json
   "ci": {
     "fileReplacements": [
       {
         "replace": "src/environments/environment.ts",
         "with": "src/environments/environment.ci.ts"
       }
     ]
   }
   ```
4. Add script to `package.json`:
   ```json
   "build:ci": "ng build --configuration=ci"
   ```
5. Update `.github/workflows/ci.yml` — add after `npm run lint`:
   ```yaml
   - run: npm run build:ci
   ```
6. Verify locally: `npm run build:ci` should compile without errors
7. Commit and push

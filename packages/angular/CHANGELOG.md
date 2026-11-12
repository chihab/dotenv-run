# @ngx-env/builder

## 22.1.0

### Minor Changes

- a9da0fa: Runtime mode now injects `ngx-env.js` right after `<base href>` with a relative src, so it resolves against the base href.

  Before, the tag was always the root-absolute `/ngx-env.js` at the start of `<head>`, which failed for apps served under a sub-path (`--base-href /app/`) and for localized builds. Documents without a `<base href>` keep the root-absolute `/ngx-env.js`.

  Localized builds (`localize: true` or a list of locales) now write `ngx-env.js` next to every locale's `index.html`, plus the root one if there is one.

  **This changes the URL the browser requests.** If you overwrite `ngx-env.js` at deploy time, or rewrite the script tag in `index.html`, check your scripts: with a base href, the file is now loaded from `<base href>ngx-env.js` instead of `/ngx-env.js`, and localized builds have one file per locale.

### Patch Changes

- 51eff47: Bump `glob` from `^10.4.5` to `^11.1.0` to resolve CVE-2025-64756.

  The builder only uses the `glob` library API (`glob.sync`) and never the
  vulnerable `-c/--cmd` CLI, so it was not exploitable in practice — but the
  `^10.4.5` range still permitted affected versions and tripped security
  scanners (e.g. Amazon Inspector). Upgrading to the patched `11.1.0` line
  clears the advisory. `glob.sync` remains available, so no code changes were
  required.

## 20.1.1

### Patch Changes

- Fix SSR with runtime option

## 20.1.0

### Minor Changes

- Use @angular/build in all builders

## 20.0.1

### Patch Changes

- fix dev-server builder

## 20.0.0

### Major Changes

- feat(angular): support ng 20

### Patch Changes

- Updated dependencies
  - @dotenv-run/webpack@1.5.2

## 19.1.0

### Minor Changes

- release: upgrade to ngx-version 19.2.0 to fix extract isue

### Patch Changes

- Updated dependencies
  - @dotenv-run/webpack@1.5.1

## 19.0.5

### Patch Changes

- feat(ngx-env): update builder schemas

## 19.0.4

### Patch Changes

- doc: remove karma non support

## 19.0.3

### Patch Changes

- add support to karma browser builder after cli fix

## 19.0.2

### Patch Changes

- dfb69c0: fix: csr angular 19 support

## 19.0.0

### Major Changes

- 8f83f0c: feat: add compatibility with Angular 19

### Patch Changes

- Updated dependencies [8f83f0c]
  - @dotenv-run/webpack@1.5.0

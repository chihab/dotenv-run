# @dotenv-run/esbuild

## 1.5.3

### Patch Changes

- a95e7d7: Dependency hygiene across the bundler integrations:

  - `@dotenv-run/vite`: `vite` is now a `peerDependency` (+ `devDependency`) instead
    of a hard runtime `dependency`. A bundler plugin should never bundle its own
    copy of the bundler — the previous setup risked duplicate Vite instances and
    version conflicts with the host project. The plugin only imports the `Plugin`
    type from Vite, which the consumer always provides.
  - `@dotenv-run/rollup`: widen the `rollup` peer range to `^3.0.0 || ^4.0.0` so
    Rollup 4 consumers are supported.
  - `@dotenv-run/esbuild`: align the `@dotenv-run/core` range to `^1.3.7` for
    consistency with every other package (was `~1.3.7`).

## 1.5.2

### Patch Changes

- Relax the `esbuild` peer dependency range to `>=0.21.0`.

## 1.5.1

### Patch Changes

- release: upgrade to ngx-version 19.2.0 to fix extract isue
- Updated dependencies
  - @dotenv-run/core@1.3.7

## 1.5.0

### Minor Changes

- 8f83f0c: feat: add compatibility with Angular 19

## 1.4.2

### Patch Changes

- chore: use pnpm workspace protocol for dependencies
- Updated dependencies
  - @dotenv-run/core@1.3.6

## 1.4.0

### Minor Changes

- bump up webpack and esbuild versions

## 1.3.4

### Patch Changes

- docs: updates packages' README files
- Updated dependencies
  - @dotenv-run/core@1.3.4

## 1.3.3

### Patch Changes

- fix(cli): fix unsecure mode alias
- Updated dependencies
  - @dotenv-run/core@1.3.3

## 1.3.2

### Patch Changes

- feat(angular): add unsecure mode option
- Updated dependencies
  - @dotenv-run/core@1.3.2

## 1.3.1

### Patch Changes

- feat: add secure mode to debug info
- Updated dependencies
  - @dotenv-run/core@1.3.1

## 1.3.0

### Minor Changes

- refactor and docs initialization

### Patch Changes

- Updated dependencies
  - @dotenv-run/core@1.3.0

## 1.2.3

### Patch Changes

- feat(core): support sub-module level turbo.json
- Updated dependencies
  - @dotenv-run/core@1.2.3

## 1.2.2

### Patch Changes

- fix(core): filter out undefined env values
- Updated dependencies
  - @dotenv-run/core@1.2.2

## 1.2.1

### Patch Changes

- refactor(esbuild): usde esbuild define option
- Updated dependencies
  - @dotenv-run/core@1.2.1

## 1.2.0

### Minor Changes

- f63ecac: feat: add esbuild plugin

### Patch Changes

- Updated dependencies [f63ecac]
  - @dotenv-run/core@1.2.0

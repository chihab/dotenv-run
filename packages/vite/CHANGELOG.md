# @dotenv-run/vite

## 1.0.2

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

## 1.0.1

### Patch Changes

- release: upgrade to ngx-version 19.2.0 to fix extract isue
- Updated dependencies
  - @dotenv-run/core@1.3.7

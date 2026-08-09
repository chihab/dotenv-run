---
"@dotenv-run/vite": patch
"@dotenv-run/rollup": patch
"@dotenv-run/esbuild": patch
---

Dependency hygiene across the bundler integrations:

- `@dotenv-run/vite`: `vite` is now a `peerDependency` (+ `devDependency`) instead
  of a hard runtime `dependency`. A bundler plugin should never bundle its own
  copy of the bundler — the previous setup risked duplicate Vite instances and
  version conflicts with the host project. The plugin only imports the `Plugin`
  type from Vite, which the consumer always provides.
- `@dotenv-run/rollup`: widen the `rollup` peer range to `^3.0.0 || ^4.0.0` so
  Rollup 4 consumers are supported.
- `@dotenv-run/esbuild`: align the `@dotenv-run/core` range to `^1.3.7` for
  consistency with every other package (was `~1.3.7`).

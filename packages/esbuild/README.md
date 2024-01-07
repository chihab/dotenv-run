# @dotenv-run/esbuild

- ✅ Load environment variables from the command line `API_BASE=/v1/ node esbuild.mjs`
- ✅ Load environment variables from `.env` files
- ✅ Expand environment variables `API_URL=$API_BASE/users`
- ✅ Define environment variables for a specific environment (e.g. `.env.production`)
- ✅ Load priorities of `.env.*` files (e.g. `.env.production` > `.env`)
- ✅ Hierarchical cascading configuration in monorepo projects ([Nx](https://nx.dev), [Turbo](https://turbo.build/), etc.)
  `apps/next-app/.env` > `apps/.env` > `.env`

## Install

```console
npm add @dotenv-run/esbuild --save-dev
```

## Usage

### Using define (recommended)

```js
import { build } from "esbuild";
import { env } from "@dotenv-run/esbuild";

const { full } = env({
  prefix: "MY_",
  verbose: true,
});

await build({
  bundle: true,
  write: false,
  entryPoints: [`test/app.js`],
  define: full,
});
```

### Using esbuild plugin

```js
import { build } from "esbuild";
import { env } from "@dotenv-run/esbuild";

const { full } = env({
  prefix: "MY_",
  verbose: true,
});

await build({
  bundle: true,
  write: false,
  entryPoints: [`test/app.js`],
  define: full,
});
```

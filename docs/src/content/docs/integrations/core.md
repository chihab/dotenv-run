---
title: Core · @dotenv-run/core
description: The programmatic API that powers every dotenv-run integration. Load .env files, expand variables and cascade configuration across a monorepo from your own code.
---

`@dotenv-run/core` is the engine behind every dotenv-run integration. Use it to
load `.env` files from your own scripts, or to build a custom integration for a
tool that isn't covered yet. Every plugin (CLI, Vite, Webpack, Rollup, esbuild,
Angular) is a thin wrapper around this package.

## Install

```sh
npm add @dotenv-run/core
```

## Usage

```js
// index.js
import { env } from '@dotenv-run/core';

env({
  root: '../..',    // walk up to the workspace root (monorepo)
  prefix: '^API_',  // only inject API_* variables
  files: ['.env'],
  verbose: true,    // print which .env files were loaded
});

console.log(process.env.API_USERS);
```

Given the following files:

```sh
.env       # API_USERS=$API_BASE/v1/users
.env.dev   # API_BASE=https://localhost:3000
.env.prod  # API_BASE=https://dotenv-run.app
```

then:

```sh
NODE_ENV=dev node index.js
https://localhost:3000/v1/users

NODE_ENV=prod node index.js
https://dotenv-run.app/v1/users
```

`env()` returns the resolved variables so you can inject them yourself (for
example into a bundler's `define`):

```js
const { full, filtered } = env({ prefix: '^NG_APP_' });
// full     -> every resolved variable, keyed as process.env.KEY
// filtered -> only the variables matching `prefix`
```

## Options

| Option        | Type               | Description                                              |
| ------------- | ------------------ | -------------------------------------------------------- |
| `root`        | `string`           | Path to the workspace root to search up to (monorepo).   |
| `cwd`         | `string`           | Directory to start searching for `.env` files from.      |
| `files`       | `string[]`         | Base `.env` file names to load (default `['.env']`).     |
| `environment` | `string`           | Environment name, e.g. `prod` → also loads `.env.prod`.  |
| `prefix`      | `string \| RegExp` | Only inject variables matching this prefix / pattern.    |
| `verbose`     | `boolean`          | Print the `.env` files that were loaded.                 |
| `unsecure`    | `boolean`          | Also print variable values in verbose output.            |
| `nodeEnv`     | `boolean`          | Read the current environment from `NODE_ENV`.            |

`environment` defaults to `NODE_ENV`, so `NODE_ENV=prod` loads `.env.prod` on top
of `.env`. See [loading priorities](/getting-started/loading-priorities/).

## License

MIT © [Chihab Otmani](mailto:chihab@gmail.com)

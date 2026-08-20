---
title: esbuild
description: Load .env environment variables into your esbuild builds with @dotenv-run/esbuild, using define or an esbuild plugin.
---

`@dotenv-run/esbuild` loads your `.env` files and exposes the variables to your
[esbuild](https://esbuild.github.io/) build — with the same `.env.*` files,
expansion and monorepo cascading as the rest of dotenv-run.

## Install

```sh
npm add -D @dotenv-run/esbuild
```

## Using `define` (recommended)

```js
import { build } from 'esbuild';
import { env } from '@dotenv-run/esbuild';

const { full } = env({
  prefix: 'MY_',
  files: ['.env'],
});

await build({
  bundle: true,
  entryPoints: ['src/app.js'],
  define: full,
});
```

## Using the plugin

```js
import { build } from 'esbuild';
import { dotenvRun } from '@dotenv-run/esbuild';

await build({
  bundle: true,
  entryPoints: ['src/app.js'],
  plugins: [dotenvRun({ prefix: 'MY_', files: ['.env'] })],
});
```

The available options are the same as [`@dotenv-run/core`](/integrations/core/).

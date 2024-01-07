---
title: Quick Start
---

`@dotenv-run` can be installed as a **standalone CLI** or as a **plugin** for your favorite bundler.

You can also use `@dotenv-run/core` to build your own integration.

They all share the same API and can be used as a drop-in replacement.

`@dotenv-run/cli` is a standalone CLI that can be used to run a script with environment variables defined in a `.env` file.

## install

```sh
npm install -D @dotenv-run/cli
```

## .env file
Create a `.env` file with the following content:

```sh
# .env
API_HOST=api-sandbox.com
API_INSTANCE=$USER-instance
API_BASE=https://$API_INSTANCE.$API_HOST/
```

## npx dotenv-run

Run `dotenv-run` using npx:

```sh
npx dotenv-run -- printenv
✔ /sample/.env # output the `.env` files being consumed
...
API_HOST=api-sandbox.com
API_INSTANCE=chihab-instance
API_BASE=https://chihab-instance.api-sandbox.com/
```

## command line

Override the value of `API_INSTANCE` from the command line:

```sh
API_INSTANCE=prod-instance npx dotenv-run -- printenv
✔ /sample/.env
...
API_HOST=api-sandbox.com
API_INSTANCE=prod-instance
API_BASE=https://prod-instance.api-sandbox.com/
```

## multiple .env files

Override the value of `API_INSTANCE` and `API_HOST` inside the `.env.prod` file:

```sh
# .env.prod
API_HOST=api.com
API_INSTANCE=prod-instance
```

Use `NODE_ENV` to instruct `dotenv-run` to load `.env.prod` in addition to `.env`:

```sh
NODE_ENV=prod npx dotenv-run -- printenv
✔ /sample/.env.prod
✔ /sample/.env
...
API_HOST=api.com
API_INSTANCE=prod-instance # the value of API_INSTANCE is taken from `.env.prod`
API_BASE=https://prod-instance.api.com/
```

## process.env

Environment variables are available in `process.env`:

```sh
NODE_ENV=prod npx dotenv-run -- node -e "console.log(process.env.API_BASE)"
✔ /sample/.env.prod
✔ /sample/.env
https://prod-instance.api.com/
```

## monorepo setup ✨

In a monorepo configuration, `.env.*` files can be defined in the root workspace and overriden by each application.

```shell
cd /nx-workspace/apps/frontend1
dotenv-run -- node -e "console.log(process.env.API_BASE)"
✔ /nx-workspace/apps/frontend1/.env # API_INSTANCE=chihab-instance
✔ /nx-workspace/.env
https://chihab-instance.api.com/
```

## bundler

`dotenv-run` can be used as a plugin for your favorite bundler. It support all the features of the CLI like `.env.*` files, cascading configuration, monorepo setup, etc.


```sh
npm install -D @dotenv-run/webpack
```

```js
// webpack.config.mjs
import { DotenvRunPlugin } from '@dotenv-run/webpack';
export default {
  plugins: [
    new DotenvRunPlugin()
  ],
  ...
}
```

PS: you don't need to install `@dotenv-run/cli` if you are using `@dotenv-run/webpack`.

The list of options of `@dotenv-run/webpack` is the same as `@dotenv-run/cli` as well as all the other plugins as they all share the same [API](/docs/api/).




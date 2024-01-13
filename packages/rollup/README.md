# @dotenv-run/rollup

- ✅ Load environment variables from the command line `API_BASE=/v1/ rollup`
- ✅ Load environment variables from `.env` files
- ✅ Expand environment variables `API_URL=$API_BASE/users`
- ✅ Define environment variables for a specific environment (e.g. `.env.production`)
- ✅ Load priorities of `.env.*` files (e.g. `.env.production` > `.env`)
- ✅ Hierarchical cascading configuration in monorepo projects ([Nx](https://nx.dev), [Turbo](https://turbo.build/), etc.)
  `apps/next-app/.env` > `apps/.env` > `.env`

## Install

```sh
npm add @dotenv-run/rollup --save-dev
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import env from "@dotenv-run/rollup";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
  },
  plugins: [env({ prefix: "API", verbose: true, root: "../../.." })],
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

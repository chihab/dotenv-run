# @dotenv-run/webpack

- ✅ Load environment variables from the command line `API_BASE=/v1/ webpack`
- ✅ Load environment variables from `.env` files
- ✅ Expand environment variables `API_URL=$API_BASE/users`
- ✅ Define environment variables for a specific environment (e.g. `.env.production`)
- ✅ Load priorities of `.env.*` files (e.g. `.env.production` > `.env`)
- ✅ Hierarchical cascading configuration in monorepo projects ([Nx](https://nx.dev), [Turbo](https://turbo.build/), etc.)
  `apps/next-app/.env` > `apps/.env` > `.env`

## Install

```console
npm add @dotenv-run/webpack --save-dev
```

## Usage

Create a `webpack.config.js` [configuration file](https://www.webpackjs.org/guide/en/#configuration-files) and import the plugin:

```js
import { DotenvRunPlugin } from "@dotenv-run/webpack";
import path from "path";

const __dirname = path.resolve();

export default {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new DotenvRunPlugin(
      { prefix: "API", verbose: true, root: "../../.." },
      __dirname
    ),
  ],
};
```

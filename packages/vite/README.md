# @dotenv-run/vite

- ✅ Load environment variables from the command line `API_BASE=/v1/ vite`
- ✅ Load environment variables from `.env` files
- ✅ Expand environment variables `API_URL=$API_BASE/users`
- ✅ Define environment variables for a specific environment (e.g. `.env.production`)
- ✅ Load priorities of `.env.*` files (e.g. `.env.production` > `.env`)
- ✅ Hierarchical cascading configuration in monorepo projects ([Nx](https://nx.dev), [Turbo](https://turbo.build/), etc.)
  `apps/next-app/.env` > `apps/.env` > `.env`

## Install

```sh
npm add @dotenv-run/vite --save-dev
```

## Usage

Create a `vite.config.js` [configuration file](https://vite.dev/config) and import the plugin:

```js
import env from "@dotenv-run/vite";

export default {
  envPrefix: 'MY_PREFIX_',
  envDir: './my-env-directory',
  plugins: [env()],
};
```

Then call `vite` or `vite build` either via the [CLI](https://vite.dev/guide/cli.html).

The available options are similar to those supported by [`@dotenv-run/core`](https://www.npmjs.com/package/@dotenv-run/core), but this plugin seamlessly integrates with Vite by automatically deriving the root, prefix, and environment values from its standard configuration, ensuring a more cohesive experience. For more details, refer to the API section.

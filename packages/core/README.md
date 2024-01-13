# @dotenv-run/core

- ✅ Load environment variables from the command line `API_BASE=/v1/ core`
- ✅ Load environment variables from `.env` files
- ✅ Expand environment variables `API_URL=$API_BASE/users`
- ✅ Define environment variables for a specific environment (e.g. `.env.production`)
- ✅ Load priorities of `.env.*` files (e.g. `.env.production` > `.env`)
- ✅ Hierarchical cascading configuration in monorepo projects ([Nx](https://nx.dev), [Turbo](https://turbo.build/), etc.)
  `apps/next-app/.env` > `apps/.env` > `.env`

# Install

```console
npm add @dotenv-run/core
```

# Usage

```js
// index.js
import { env } from "@dotenv-run/core";
env({
  root: "../..",
  verbose: true,
  prefix: "^API_",
  files: [".env"],
});
console.log(process.env.API_USERS);
```

given the following files:

```shell
.env
    API_USERS=$API_BASE/v1/users
    API_AUTH=$API_BASE/v1/auth
.env.dev
    API_BASE=https://localhost:3000
.env.prod
    API_BASE=https://dotenv-run.app
```

then:

```shell
NODE_ENV=dev node index.js
https://localhost:3000/v1/users

NODE_ENV=prod node index.js
https://dotenv-run.app/v1/users
```

# License

MIT © [Chihab Otmani](mailto:chihab@gmail.com)

<h1>dotenv-run</h1>

[![monthly downloads](https://img.shields.io/npm/dm/@dotenv-run/core.svg)](https://www.npmjs.com/package/@dotenv-run/core)

`dotenv-run` is a collection of packages that use **dotenv** to support loading environment variables from `.env` files with multiple integrations.

Here are some of the benefits of using `dotenv-run`:

- ✅ **Monorepo ✨**: supports monorepo projects with multiple applications.
- ✅ **Universal**: supports multiple integrations including CLI, Webpack, Rollup, Vite, ESbuild and Angular.
- ✅ **TypeScript**: supports TS projects with type definitions for `process.env` and `import.meta.env`.
- ✅ **ESM**: supports `process.env` and `import.meta.env` in ESM modules.
- ✅ **Secure**: supports filtering environment variables by prefix.

<h2>Integrations</h2>

| Integration     | Package                                   | Status |
| --------------- | ----------------------------------------- | ------ |
| CLI             | [@dotenv-run/cli](#dotenv-runcli)         | ✅     |
| Core            | [@dotenv-run/core](#dotenv-runcore)       | ✅     |
| ESBuild         | [@dotenv-run/esbuild](#dotenv-runesbuild) | ✅     |
| webpack         | [@dotenv-run/webpack](#dotenv-runwebpack) | ✅     |
| Rollup          | [@dotenv-run/rollup](#dotenv-runrollup)   | ✅     |
| Vite            | [@dotenv-run/vite](#dotenv-runvite)       | ✅     |
| Rspack          | [@dotenv-run/rspack](#dotenv-runrspack)   | ✅     |
| Node.js preload | @dotenv-run/load                          | ✅     |
| Angular         | [@ngx-env/builder](#ngx-envbuilder)       | ✅     |

## Quick start

- [Quick start](#quick-start)
  - [@dotenv-run/cli](#dotenv-runcli)
  - [@dotenv-run/core](#dotenv-runcore)
  - [@dotenv-run/esbuild](#dotenv-runesbuild)
  - [@ngx-env/builder](#ngx-envbuilder)
- [Testimonials](#testimonials)
  - [Demos](#demos)
  - [Quick start](#quick-start-1)
  - [@dotenv-run/webpack](#dotenv-runwebpack)
  - [@dotenv-run/rollup](#dotenv-runrollup)
  - [@dotenv-run/vite](#dotenv-runvite)
  - [@dotenv-run/rspack](#dotenv-runrspack)
- [Credits](#credits)
- [License](#license)

Assuming you have the following monorepo structure:

```shell
platform
├── apps
│   ├── vite-app
│   ├── ng-app
│   └── esbuild-app
│   │   ├── .env.local # API_BASE=http://localhost:3001
│   │   ├── package.json
│   │   └── webapp.config.mjs
├── libs
│   └── rollup-lib
│       ├── package.json
│       └── rollup.config.mjs
├── .env.dev # API_BASE=https://dev.dotenv.run
├── .env.prod # API_BASE=https://prod.dotenv.run
├── .env # API_USERS=$API_BASE/api/v1/users;API_AUTH=https://$API_BASE/auth
├── nx.json
└── package.json
```

and the following `dotenv-run` options:

```json
{
  "verbose": true, // print debug information
  "unsecure": true, // display environment variables values
  "root": "../..", // root directory to search for .env files
  "environment": "dev", // environment to load (default: NODE_ENV)
  "files": [".env"], // .env files to load (default: .env)
  "prefix": "^API_" // prefix to filter environment variables (used with bundlers)
}
```

`dotenv-run` will search and load `.env.*` files located in the root workspace `/home/code/platform` down to the current working directory of the application.

```sh
- Root directory: /home/code/platform
- Working directory:  /codes/code/platform/apps/esbuild-app
- Files: .env
- Environment: dev
- Environment files:
 ✔ /home/code/platform/apps/esbuild-app/.env.local
 ✔ /home/code/platform/.env.dev
 ✔ /home/code/platform/.env
- Environment variables: API (Unsecure Mode)
 ✔ API_USERS http://localhost:3001/api/v1/users
 ✔ API_AUTH https://localhost:3001/auth
```

### @dotenv-run/cli

[`@dotenv-run/cli`](https://www.npmjs.com/package/@dotenv-run/cli) is a standalone CLI that can be used to run a script.

```sh
❯ npx dotenv-run

  Usage: dotenv-run [options] -- <command>

  Options:
    -v, --verbose [regexp]         display debug information
    -u, --unsecure                 display environment variables values
    -e, --env [environment]        environment to load (default: NODE_ENV)
    -r, --root                     root directory to search for .env files
    -f, --file [.env,.secrets]     .env files to load (default: .env)
    -h, --help                     output usage information

  Examples:
    dotenv-run -d
    dotenv-run -- npm start
    dotenv-run -r ../.. -f .env,.secrets -- npm start
    dotenv-run -f ../.env,../.env.api -- npm start
```

### @dotenv-run/core

[`@dotenv-run/core`](https://www.npmjs.com/package/@dotenv-run/core) is the core package that can be used to load environment variables from `.env` files.

```ts
env({
  root: "../..",
  verbose: true,
  prefix: "^API_",
  files: [".env"],
});
```

### @dotenv-run/esbuild

[`@dotenv-run/esbuild`](https://www.npmjs.com/package/@dotenv-run/esbuild) is a plugin for esbuild that can be used to inject environment variables into your applications.

```ts
import { dotenvRun } from "@dotenv-run/esbuild";

await build({
  write: false,
  bundle: true,
  entryPoints: [`test/app.js`],
  plugins: [
    dotenvRun({
      verbose: true,
      root: "../../",
      prefix: "^API",
    }),
  ],
});
```

### @ngx-env/builder

[`@ngx-env/builder`](https://www.npmjs.com/package/@ngx-env/builder) is a plugin for Angular CLI and a wrapper around `@dotenv-run/esbuild` or `@dotenv-run/webpack` that can be used to inject environment variables into your Angular applications.

- ✅ Official recommendation in [dotenv documentation](https://www.dotenv.org/docs/frameworks/angular/vercel) 🔥
- ✅ Webpack and ESBuild support 🚀
- ✅ Runtime environment variables 🎉
- ✅ Loading priorities of environment variables with Monorepo Support ([Nx](https://nx.dev), [Turbo](https://turborepo.com/), etc.) ✨
- ✅ Easy to use, no configuration required
- ✅ Up to date with latest Angular versions
- ✅ Supports all Angular CLI commands
- ✅ Supports `process.env` and `import.meta.env` usage in TypeScript
- ✅ Filters sensitive variables using a Regular Expression
- ✅ Used by popular repositories
  - [Official Microsoft Azure Samples](https://github.com/Azure-Samples/contoso-real-estate) ![GitHub Repo stars](https://img.shields.io/github/stars/Azure-Samples/contoso-real-estate)
  - [Official Quarkus Workshop](https://github.com/quarkusio/quarkus-workshops) ![GitHub Repo stars](https://img.shields.io/github/stars/quarkusio/quarkus-workshops)
  - [Scholarsome by Redhat](https://github.com/hwgilbert16/scholarsome) ![GitHub Repo stars](https://img.shields.io/github/stars/hwgilbert16/scholarsome)
  - [Dan Wahlin's Angular-JumpStart](https://github.com/DanWahlin/Angular-JumpStart) ![GitHub Repo stars](https://img.shields.io/github/stars/DanWahlin/Angular-JumpStart)
- ✅ Active development and support

#### Demos

- [v22 with vite/esbuild builder](https://stackblitz.com/edit/ngx-env-3ey8js?file=src%2Fapp.component.ts)
- [v16 with webpack builder](https://stackblitz.com/edit/ngx-env?file=src%2Fapp.component.ts)

## Testimonials

[motdotla](https://github.com/motdotla) - dotenv author and maintainer @**dotenvx**
<img src="https://github.com/chihab/dotenv-run/raw/main/packages/angular/motdotla.png" alt="Description" width="600">

NB: Angular not Angular.js :P

[manekinekko](https://github.com/manekinekko) - SSE @**microsoft**
<img src="https://github.com/chihab/dotenv-run/raw/main/packages/angular/manekinekko.png" alt="Description" width="600">

#### Quick start

```sh
ng add @ngx-env/builder
```

Environment variables should start with `NG_APP_` prefix, you can define a custom prefix.

```sh
NG_APP_VERSION=$npm_package_version
NG_APP_COMMIT=$GITHUB_SHA
NG_APP_ENABLE_SENTRY=false
```

```ts
@Component({
  selector: "app-footer",
  template: `{{ branch }} - {{ commit }}`,
  standalone: true,
})
export class MainComponent {
  branch = import.meta.env.NG_APP_BRANCH_NAME; // Recommended
  commit = process.env.NG_APP_COMMIT; // Deprecated
}
```

```html
<!-- index.html -->
<head>
  <title>NgApp on %NG_APP_BRANCH_NAME% - %NG_APP_COMMIT%</title>
</head>
```

Configuration options can be passed to `@ngx-env/builder` using `ngxEnv` section in `angular.json` file.

```json
{
  "builder": "@ngx-env/builder:application",
  "options": {
    "ngxEnv": {
      "verbose": true,
      "root": "../..",
      "prefix": "^NG_APP_"
    }
  }
}
```

If you want to update the environment variables at runtime, you can use the `runtime` option.

You can find the full `@ngx-env/builder` documentation [here](https://github.com/chihab/dotenv-run/tree/main/packages/angular).

### @dotenv-run/webpack

[`@dotenv-run/webpack`](https://www.npmjs.com/package/@dotenv-run/webpack) is a plugin for webpack that can be used to inject environment variables into your applications.

```ts
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
      { prefix: "^API", verbose: true, root: "../.." },
      __dirname
    ),
  ],
};
```

### @dotenv-run/rollup

[`@dotenv-run/rollup`](https://www.npmjs.com/package/@dotenv-run/rollup) is a plugin for Rollup that can be used to inject environment variables into your applications.

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

### @dotenv-run/vite

[`@dotenv-run/vite`](https://www.npmjs.com/package/@dotenv-run/vite) is a plugin for Vite that can be used to inject environment variables into your applications.

```js
import env from "@dotenv-run/vite";

export default {
  envPrefix: "MY_PREFIX_",
  envDir: "./my-env-directory",
  plugins: [env()],
};
```

### @dotenv-run/rspack

[`@dotenv-run/rspack`](https://www.npmjs.com/package/@dotenv-run/rspack) is a plugin for Rspack that can be used to inject environment variables into your applications.

```js
import { DotenvRunPlugin } from "@dotenv-run/rspack";

export default {
  plugins: [
    new DotenvRunPlugin({
      root: __dirname,
    }),
  ],
};
```

## Credits

- [dotenv](https://github.com/motdotla/dotenv)

## License

MIT © [Chihab Otmani](https://chihab.dev)

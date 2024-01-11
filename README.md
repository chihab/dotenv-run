# dotenv-run

`@dotenv-run` is a collection of packages that use **dotenv** to support loading environment variables from `.env` files with multiple integrations.

Here are some of the benefits of using @dotenv-run:

- ✅ **Simple**: seamelessly integrates with your existing workflow.
- ✅ **Flexible**: supports multiple `.env` files and loading priorities.
- ✅ **Expand**: supports expanding variables already available on your machine for use in your `.env` files.
- ✅ **Monorepo ✨**: supports monorepo projects with multiple applications. 
- ✅ **Secure**: supports filtering environment variables by prefix.
- ✅ **TypeScript**: supports TypeScript projects with type definitions for `process.env` and `import.meta.env`.
- ✅ **ESM**: supports `process.env` and `import.meta.env` in ESM modules.
- ✅ **Universal**: supports multiple intergrations including CLI, Node.js preload, Webpack, Rollup, Vite, and esbuild.

`@dotenv-run` can be installed as a standalone CLI or as a plugin for your favorite bundler.

- [@dotenv-run/cli](#dotenv-runcli)
- [@dotenv-run/esbuild](#dotenv-runesbuild)
- [@ngx-env/builder](#ngx-envbuilder)
  - [Quick Demo](#quick-demo)
  - [Quick start](#quick-start)
- [@dotenv-run/core](#dotenv-runcore)
- [Credits](#credits)
- [License](#license)

You can use it to build your own integration.

# @dotenv-run/cli

`@dotenv-run/cli `is a standalone CLI that can be used to run a script.

```sh
❯ npx dotenv-run

  Usage: dotenv-run [options] -- <command>
  
  Options:
    -d, --debug [regexp]                    print debug information
    -u, --unsecure                          display environment variables values
    -e, --env [environment]                 environment to load (default: NODE_ENV)
    -r, --root                              root directory to search for .env files
    -p, --prefix [.env,.secrets,.env.api]   .env file prefixes to load (default: .env)
    -f, --file [.env,.secrets,.env.api]     specific .env files to load (default: .env)
    -o, --override                          override existing environment variables
    -h, --help                              output usage information
    
  Examples:
    dotenv-run -d
    dotenv-run -- npm start
    dotenv-run -r ../.. -p .env,.secrets -- npm start
    dotenv-run -f ../.env,../.env.api -- npm start
```

```sh
❯ npx dotenv-run -e prod -r ../.. -d 'NGX' -u  --  next build # -d 'NGX' -u are debug options
---------------------------------
- Root directory: /home/chihab/Platform
- Working directory:  /Users/chihab/Platform/apps/next-app
- Files: .env
- Environment:  prod
- Environment files:
 ✔ /home/chihab/Platform/apps/next-app/.env.prod
 ✔ /home/chihab/Platform/apps/next-app/.env.local
 ✔ /home/chihab/Platform/.env.prod
 ✔ /home/chihab/Platform/.env
- Environment variables: NGX (Unsecure Mode)
 ✔ NGX_USER_HOME /home/chihab
 ✔ NGX_VERSION 0.0.0
---------------------------------
```

# @dotenv-run/esbuild

```ts
import { dotenvRun } from "@dotenv-run/esbuild";

await build({
  write: false,
  bundle: true,
  entryPoints: [`test/app.js`],
  plugins: [
    dotenvRun({
      verbose: true,
      root: '../../',
      prefix: "NGX_",
    }),
  ],
});
```

# @ngx-env/builder

`@ngx-env/builder` is a plugin for Angular CLI that can be used to inject environment variables into your Angular applications.

<img src="https://raw.githubusercontent.com/chihab/dotenv-run/main/packages/angular/logo.png" alt="@ngx-env/builder" width="90px" align="right" />

**Easily inject environment variables into your Angular applications**

- ✅ Official recommendation in [dotenv documentation](https://www.dotenv.org/docs/frameworks/angular/vercel) 🔥
- ✅ Webpack and ESBuild support 🚀
- ✅ Easy to use, no configuration required
- ✅ Up to date with latest Angular versions
- ✅ Supports all Angular CLI commands
- ✅ Used by popular repositories
  - [Official Microsoft Azure Samples](https://github.com/Azure-Samples/contoso-real-estate) ![GitHub Repo stars](https://img.shields.io/github/stars/Azure-Samples/contoso-real-estate)
  - [Official Quarkus Workshop](https://github.com/quarkusio/quarkus-workshops) ![GitHub Repo stars](https://img.shields.io/github/stars/quarkusio/quarkus-workshops)
  - [Scholarsome by Redhat](https://github.com/hwgilbert16/scholarsome) ![GitHub Repo stars](https://img.shields.io/github/stars/hwgilbert16/scholarsome)
  - [Dan Wahlin's Angular-JumpStart](https://github.com/DanWahlin/Angular-JumpStart) ![GitHub Repo stars](https://img.shields.io/github/stars/DanWahlin/Angular-JumpStart)
- ✅ Active development and support

## Quick Demo

- [v17 with vite/esbuild builder](https://stackblitz.com/edit/ngx-env-3ey8js?file=src%2Fapp.component.ts)
- [v16 with webpack builder](https://stackblitz.com/edit/ngx-env?file=src%2Fapp.component.ts)

## Quick start

1. **Add @ngx-env to your CLI project**

```sh
ng add @ngx-env/builder
```

2. **Define Environment Variables in `.env`** (optional)

```sh
NG_APP_VERSION=$npm_package_version
NG_APP_COMMIT=$GITHUB_SHA
NG_APP_ENABLE_SENTRY=false
```

3. **Usage in TS**

```ts
@Component({
  selector: "app-footer",
  template: `{{ branch }} - {{ commit }}`,
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

4. **Run your CLI commands**

```sh
npm start
# Command-line environment variables
NG_APP_BRANCH_NAME=$GITHUB_HEAD_REF ng test
NG_APP_ENABLE_SENTRY=true npm run build
```

# @dotenv-run/core

`@dotenv-run/core` is the core package that can be used to load environment variables from `.env` files.

```ts
const { full, stringified, raw } = env({
  root: "..",
  verbose: true,
  prefix: "^API_",
  files: [".env"],
});
```

# Credits

- [dotenv](https://github.com/motdotla/dotenv)

# License

MIT © [Chihab Otmani](https://twitter.com/chihabotmani)

# @ngx-env/core

[![npm version](https://badge.fury.io/js/%40ngx-env%2Fbuilder.svg)](https://www.npmjs.com/package/@ngx-env/builder)

**Easily inject environment variables into your Angular applications**

# Quick start

1. Add @ngx-env to your CLI project

```sh
ng add @ngx-env/builder
```

2. Define Environment Variables in `.env`

```sh
NG_APP_ENABLE_ANALYTICS=false
NG_APP_VERSION=$npm_package_version
```

3. Run CLI commands

```sh
npm start
NG_APP_BRANCH_NAME=`git branch --show-current` npm run build
```

4. Use the `env` pipe

```
npm install @ngx-env/core
```

```ts
import { NgxEnvModule } from "@ngx-env/core";

@NgModule({
  declarations: [FoooterComponent],
  imports: [CommonModule, NgxEnvModule],
})
export class FooterModule {}
```

```
{{ 'process.env.NG_APP_ENV' | env }}
{{ 'NG_APP_ENV' | env }}
{{ 'NG_APP_BRANCH_NAME' | env }}
```

# License

MIT © [Chihab Otmani](mailto:chihab@gmail.com)

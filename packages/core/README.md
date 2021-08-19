# @ngx-env/core [WIP - Not ready for production]

<img src="./logo.png" alt="dotenv" width="100px" align="right" />

[![npm version](https://badge.fury.io/js/%40ngx-env%2Fcli.svg)](https://www.npmjs.com/package/@ngx-env/builder)

**Add environment variables to your Angular apps**

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
{{ 'process.env.NODE_ENV' | env }}
{{ 'NODE_ENV' | env }}
```

# License

MIT © [Chihab Otmani](mailto:chihab@gmail.com)

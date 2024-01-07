---
title: Core
---

## install

```console
npm add @dotenv-run/core
```

## usage

```js
// index.js
import { expand, paths } from "@dotenv-run/core";
expand(paths(process.env.NODE_ENV, '../../'));
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
```

```shell
NODE_ENV=prod node index.js
https://dotenv-run.app/v1/users
```

The list of options is the same as the ones supported by `@dotenv-run/core`. Please refer to the [API](#api) section for more details.

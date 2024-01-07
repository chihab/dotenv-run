---
title: Loader
---

# install

```console
npm add @dotenv-run/load
```

# usage

```js
// index.js
console.log(process.env.API_USERS);
```

Given the following `.env` files:

```shell
.env
    API_USERS=$API_BASE/v1/users
    API_AUTH=$API_BASE/v1/auth
.env.dev
    API_BASE=https://localhost:3000
.env.prod 
    API_BASE=https://dotenv-run.app
```

```shell
NODE_ENV=dev node -r @dotenv-run/load ./index.js
https://localhost:3000/v1/users
```

```shell
NODE_ENV=prod node -r @dotenv-run/load ./index.js
https://dotenv-run.app/v1/users
```

```shell
NODE_ENV=prod NODE_OPTIONS='-r @dotenv-run/load' node ./index.js
https://dotenv-run.app/v1/users
```



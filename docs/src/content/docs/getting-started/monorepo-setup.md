---
title: Monorepo Setup
---

In a monorepo configuration, `.env.*` files can be defined in the root workspace and overriden by each application:

Let's say we have the following monorepo structure:

```shell
platform
├── apps
│   ├── vite-app
│   │   ├── .env.local # API_USERS=http://localhost:3001/users
│   │   └── vite.config.js
│   └── webpack-app
│   │   ├── package.json
│   │   └── webapp.config.mjs
│   └── node-app
│       └── package.json
├── libs
│   └── rollup-lib
│       ├── package.json
│       └── rollup.config.mjs
├── .env.dev # API_BASE=https://dotenv-run.dev
├── .env.prod # API_BASE=https://dotenv-run.app
├── .env # API_USERS=$API_BASE/api/v1/users API_AUTH=https://$API_BASE/auth
├── nx.json
└── package.json
```

`dotenv-run` will search and load `.env.*` files located in the root workspace down to the current working directory.

### cli

```sh
NODE_ENV=prod nx run build
✔ /platform/.env.prod
✔ /platform/.env
https://dotenv-run.app/api/v1/users
```

```shell
cd /platform/apps/frontend1
NODE_ENV=dev vite
✔ /platform/apps/frontend1/.env.local
✔ /platform/.env.dev
✔ /platform/.env
API_USERS http://localhost:3001/users
```

See [vite plugin](/docs/integrations/vite) for more details.

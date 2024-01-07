---
title: Introduction
---

Defining configuration as environment variables is one of the tenets of a [twelve-factor app](https://12factor.net/config), it separates the config from your codebase and keeps it under your control.

`@dotenv-run` is a collection of packages that use **dotenv** to support loading environment variables from `.env` files with multiple integrations.

Here are some of the benefits of using @dotenv-run:

- **Simple**: seamelessly integrates with your existing workflow.
- **Flexible**: supports multiple `.env` files and loading priorities.
- **Expand**: supports expanding variables already available on your machine for use in your `.env` files.
- **Secure**: supports filtering environment variables by prefix.
- **Monorepo ✨**: supports monorepo projects with multiple applications. .env files can be defined in the root workspace and overriden by each application.
- **TypeScript**: supports TypeScript projects with type definitions for `process.env` and `import.meta.env`.
- **ESM**: supports `process.env` and `import.meta.env` in ESM modules.
- **Universal**: supports multiple intergrations including CLI, Node.js preload, Webpack, Rollup, Vite, and esbuild.




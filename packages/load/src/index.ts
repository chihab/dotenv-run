import { env, findRootPath } from "@dotenv-run/core";
env({
  environment: process.env.NODE_ENV,
  cwd: process.cwd(),
  root: findRootPath(),
  files: [".env"]
});
env();

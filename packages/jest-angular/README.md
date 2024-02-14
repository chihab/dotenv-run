## Install

```sh
npm install --save-dev @dotenv-run/jest-angular
```

## Usage

Add the following to your `jest.config.js`:

```js
const jestConfig = {
  preset: "jest-preset-angular/presets/defaults-esm",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testMatch: ["<rootDir>/src/app/**/*.(spec|jest).ts"],
  cache: false,
  moduleNameMapper: {
    "^rxjs(/operators$)?$":
      "<rootDir>/node_modules/rxjs/dist/bundles/rxjs.umd.js",
    tslib: "<rootDir>/node_modules/tslib/tslib.es6.mjs",
  },
  transform: {
    "^.+\\.(ts)$": [
      "@dotenv-run/jest-angular",
      {
        useESM: true,
      },
    ],
  },
};

export default jestConfig;
```

Create a `setup-jest.ts` file in your project root:

```ts
import { env } from "@dotenv-run/core";
env({ root: "../../..", files: [".env", ".env.app"] });
import "jest-preset-angular/setup-jest.mjs";
```

Run your tests with `jest`.

```sh
NODE_OPTIONS=--experimental-vm-modules npx jest
```

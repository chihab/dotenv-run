const jestConfig = {
  preset: "jest-preset-angular/presets/defaults-esm",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testMatch: ["<rootDir>/src/app/**/*.(spec|jest).ts"],
  cache: false,
  moduleNameMapper: {
    "^rxjs(/operators$)?$":
      "<rootDir>/../../../../node_modules/rxjs/dist/bundles/rxjs.umd.js",
    tslib: "<rootDir>/../../../../node_modules/tslib/tslib.es6.mjs",
  },
  transform: {
    "^.+\\.(ts)$": [
      "@dotenv-run/jest-angular",
      {
        useESM: true,
        stringifyContentPathRegex: "\\.(html|svg)$",
      },
    ],
  },
};

export default jestConfig;

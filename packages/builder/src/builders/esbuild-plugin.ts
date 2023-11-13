import { ApplicationBuilderOptions } from "@angular-devkit/build-angular";
import { Dict, DotenvRunOptions, env } from "@dotenv-run/core";
import type { Plugin } from "esbuild";
import { NgxEnvSchema } from "./ngx-env/ngx-env-schema";
import { resolve } from "path";
import { writeFileSync, readFileSync } from "fs";

function escapeStringRegexp(str: string) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

function replacer(content: string, dotEnvOptions: DotenvRunOptions) {
  const raw = env(dotEnvOptions).raw;

  return Object.keys(raw).reduce(
    (html, key) =>
      html.replace(
        new RegExp("%" + escapeStringRegexp(key) + "%", "g"),
        raw[key]
      ),
    content
  );
}

export function plugin(options: DotenvRunOptions): Plugin[] {
  const _options = {
    ...options,
    appEnv: "NG_APP_ENV",
  };
  return [
    {
      name: "dotenv-run",
      setup: (build) => {
        let full: Dict = undefined;
        const define = build.initialOptions.define ?? {};
        full = env(_options).full;
        build.initialOptions.define = {
          ...full,
          ...define,
        };
      },
    },
  ];
}

export function indexHtml(
  options: ApplicationBuilderOptions & NgxEnvSchema,
  dotEnvOptions: DotenvRunOptions
) {
  const browserPath = resolve(
    dotEnvOptions.cwd,
    options.outputPath,
    "browser/index.html"
  );
  const serverPath = resolve(
    dotEnvOptions.cwd,
    options.outputPath,
    "server/index.server.html"
  );
  const browserIndex = readFileSync(browserPath, "utf-8");
  const serverIndex = readFileSync(serverPath, "utf-8");
  writeFileSync(
    browserPath,
    replacer(browserIndex, {
      ...dotEnvOptions,
      appEnv: "NG_APP_ENV",
    })
  );
  writeFileSync(
    serverPath,
    replacer(serverIndex, {
      ...dotEnvOptions,
      appEnv: "NG_APP_ENV",
    })
  );
}

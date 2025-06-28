import { type Dict } from "@dotenv-run/core";
import { readFileSync, writeFileSync } from "fs";
import * as glob from "glob";
import { variablesReducer } from "./variables-reducer";

export function indexHtml(
  browserOutputDir: string,
  serverOutputDir: string | null,
  locales: string[] = [],
  raw: Dict,
  runtime = false
) {
  try {
    glob
      .sync(`${browserOutputDir}/**/index{.html,.csr.html}`)
      .forEach((filePath) => {
        const html = readFileSync(filePath, "utf-8");
        const content = variablesReducer(html, raw); // Replace %VARIABLE% with the actual value
        try {
          writeFileSync(
            filePath,
            runtime
              ? content.replace(
                  /<head>/,
                  `<head><script src="/ngx-env.js"></script>`
                )
              : content
          );
        } catch (e) {
          console.log(`❌ Failed to replace variables in ${filePath} ❌`);
          throw e;
        }
      });
    if (serverOutputDir) {
      glob
        .sync(`${serverOutputDir}/**/index.server.html`)
        .forEach((filePath) => {
          const html = readFileSync(filePath, "utf-8");
          const content = variablesReducer(html, raw); // Replace %VARIABLE% with the actual value
          try {
            writeFileSync(filePath, content);
          } catch (e) {
            console.log(`❌ Failed to replace variables in ${filePath} ❌`);
            throw e;
          }
        });
    }
    if (runtime) {
      // NODE_ENV should not be controlled via runtime
      delete raw.NODE_ENV;
      const runtimeStmt = `globalThis._NGX_ENV_ = ${JSON.stringify(
        raw,
        null,
        2
      )};`;
      if (locales.length > 0) {
        locales.forEach((locale) => {
          console.log(
            `📦 Writing ngx-env.js to ${browserOutputDir}/${locale}/ngx-env.js`
          );
          try {
            writeFileSync(
              `${browserOutputDir}/${locale}/ngx-env.js`,
              runtimeStmt
            );
          } catch (e) {
            console.log(
              `❌ Failed to create ngx-env.js at ${browserOutputDir}/${locale}/ngx-env.js ❌`
            );
            throw e;
          }
        });
      } else {
        try {
          console.log(
            `📦 Writing ngx-env.js to ${browserOutputDir}/ngx-env.js`
          );
          writeFileSync(`${browserOutputDir}/ngx-env.js`, runtimeStmt);
        } catch (e) {
          console.log(
            `❌ Failed to create ngx-env.js at ${browserOutputDir}/ngx-env.js ❌`
          );
          throw e;
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
}

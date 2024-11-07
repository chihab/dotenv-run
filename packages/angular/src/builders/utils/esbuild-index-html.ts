import { type Dict } from "@dotenv-run/core";
import { readFileSync, writeFileSync } from "fs";
import * as glob from "glob";
import { variablesReducer } from "./variables-reducer";

export function indexHtml(
  outputDir: string,
  locales: string[] = [],
  raw: Dict,
  ssr = false,
  runtime = false
) {
  try {
    glob.sync(`${outputDir}/browser/**/index.html`).forEach((filePath) => {
      const html = readFileSync(filePath, "utf-8");
      const content = variablesReducer(html, raw);
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
    if (ssr) {
      glob
        .sync(`${outputDir}/server/**/index.server.html`)
        .forEach((filePath) => {
          const html = readFileSync(filePath, "utf-8");
          const content = variablesReducer(html, raw);
          try {
            writeFileSync(filePath, content);
          } catch (e) {
            console.log(`❌ Failed to replace variables in ${filePath} ❌`);
            throw e;
          }
        });
    }
    if (runtime) {
      const runtimeStmt = `globalThis._NGX_ENV_ = ${JSON.stringify(
        raw,
        null,
        2
      )};`;
      if (locales.length > 0) {
        locales.forEach((locale) => {
          console.log(
            `📦 Writing ngx-env.js to ${outputDir}/browser/${locale}/ngx-env.js`
          );
          writeFileSync(
            `${outputDir}/browser/${locale}/ngx-env.js`,
            runtimeStmt
          );
        });
      } else {
        console.log(`📦 Writing ngx-env.js to ${outputDir}/browser/ngx-env.js`);
        writeFileSync(`${outputDir}/browser/ngx-env.js`, runtimeStmt);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export function devServerIndexHtml(
  content: string,
  raw: Dict,
  runtime = false
) {
  const html = variablesReducer(content, raw);
  return runtime
    ? html.replace(
        /<head>/,
        `<head><script>globalThis._NGX_ENV_ = ${JSON.stringify(raw)}</script>`
      )
    : html;
}

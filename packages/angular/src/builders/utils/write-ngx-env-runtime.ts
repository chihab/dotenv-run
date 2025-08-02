import { type Dict } from "@dotenv-run/core";
import { writeFileSync } from "fs";

export function writeRuntimeFile(
  browserOutputDir: string,
  locales: string[] = [],
  raw: Dict
) {
  // NODE_ENV should not be controlled via runtime
  delete raw.NODE_ENV;
  const runtimeStmt = `globalThis._NGX_ENV_ = ${JSON.stringify(raw, null, 2)};`;
  if (locales.length > 0) {
    locales.forEach((locale) => {
      console.log(
        `📦 Writing ngx-env.js to ${browserOutputDir}/${locale}/ngx-env.js`
      );
      try {
        writeFileSync(`${browserOutputDir}/${locale}/ngx-env.js`, runtimeStmt);
      } catch (e) {
        console.log(
          `❌ Failed to create ngx-env.js at ${browserOutputDir}/${locale}/ngx-env.js ❌`
        );
        throw e;
      }
    });
  } else {
    try {
      console.log(`📦 Writing ngx-env.js to ${browserOutputDir}/ngx-env.js`);
      writeFileSync(`${browserOutputDir}/ngx-env.js`, runtimeStmt);
    } catch (e) {
      console.log(
        `❌ Failed to create ngx-env.js at ${browserOutputDir}/ngx-env.js ❌`
      );
      throw e;
    }
  }
}

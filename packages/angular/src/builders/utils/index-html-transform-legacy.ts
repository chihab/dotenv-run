import { type Dict } from "@dotenv-run/core";
import { readFileSync, writeFileSync } from "fs";
import * as glob from "glob";
import { injectRuntimeScript } from "./inject-runtime-script";
import { replaceHtmlVars } from "./replace-html-vars";
import { writeRuntimeFile } from "./write-ngx-env-runtime";

export function indexHtmlTransformerLegacy(
  browserOutputDir: string,
  serverOutputDir: string | null,
  localized: boolean,
  raw: Dict,
  runtime = false
) {
  glob
    .sync(`${browserOutputDir}/**/index{.html,.csr.html}`)
    .forEach((filePath) => {
      const html = readFileSync(filePath, "utf-8");
      const content = replaceHtmlVars(html, raw); // Replace %VARIABLE% with the actual value
      try {
        writeFileSync(
          filePath,
          runtime ? injectRuntimeScript(content) : content
        );
      } catch (e) {
        console.log(`❌ Failed to replace variables in ${filePath} ❌`);
        throw e;
      }
    });
  if (serverOutputDir) {
    glob.sync(`${serverOutputDir}/**/*html*`).forEach((filePath) => {
      const html = readFileSync(filePath, "utf-8");
      const content = replaceHtmlVars(html, raw); // Replace %VARIABLE% with the actual value
      console.log(`📦 Replace variables in ${filePath}`);
      try {
        writeFileSync(
          filePath,
          runtime ? injectRuntimeScript(content) : content
        );
      } catch (e) {
        console.log(`❌ Failed to replace variables in ${filePath} ❌`);
        throw e;
      }
    });
  }
  if (runtime) {
    writeRuntimeFile(browserOutputDir, localized, raw);
  }
}

import { type Dict } from "@dotenv-run/core";
import { existsSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

const INDEX_FILES = ["index.html", "index.csr.html"];

export function isLocalized(localize: unknown): boolean {
  return localize === true || (Array.isArray(localize) && localize.length > 0);
}

function hasIndex(dir: string): boolean {
  return INDEX_FILES.some((file) => existsSync(join(dir, file)));
}

/**
 * A localized build writes one index per locale (`<locale>/index.html`), and
 * each index loads `ngx-env.js` relative to its own base href. So the file is
 * written next to every first-level index, plus the root one if there is one.
 */
function getRuntimeDirs(
  browserOutputDir: string,
  localized: boolean
): string[] {
  if (!localized) {
    return [browserOutputDir];
  }
  const localeDirs = readdirSync(browserOutputDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(browserOutputDir, entry.name))
    .filter(hasIndex);
  return hasIndex(browserOutputDir)
    ? [browserOutputDir, ...localeDirs]
    : localeDirs;
}

export function writeRuntimeFile(
  browserOutputDir: string,
  localized: boolean,
  raw: Dict
) {
  // NODE_ENV should not be controlled via runtime
  delete raw.NODE_ENV;
  const runtimeStmt = `globalThis._NGX_ENV_ = ${JSON.stringify(raw, null, 2)};`;
  getRuntimeDirs(browserOutputDir, localized).forEach((dir) => {
    const filePath = join(dir, "ngx-env.js");
    console.log(`📦 Writing ngx-env.js to ${filePath}`);
    try {
      writeFileSync(filePath, runtimeStmt);
    } catch (e) {
      console.log(`❌ Failed to create ngx-env.js at ${filePath} ❌`);
      throw e;
    }
  });
}

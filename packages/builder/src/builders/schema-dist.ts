/**
 * For each builder
 * - Copy the schema
 * - Validate the generated schema
 */

import * as cpy from "cpy";
import * as fs from "fs";

function copyDistSchemas() {
  console.log("Copying Angular CLI target schemas");
  ["dev-server", "browser", "extract-i18n", "karma", "server"].forEach(
    async (target) => {
      console.log(`${target}/schema.json ✅`);
      await cpy(
        [
          `../../node_modules/@angular-devkit/build-angular/src/builders/${target}/schema.json`,
        ],
        `src/builders/${target}`
      );
      fs.renameSync(
        `src/builders/${target}/schema.json`,
        `src/builders/${target}/${target}.json`
      );
    }
  );
}

(() => {
  copyDistSchemas();
})();

// cp node_modules/@angular-devkit/build-angular/src/builders/dev-server/schema.json ./packages/builder/src/builders/dev-server/dev-server.json

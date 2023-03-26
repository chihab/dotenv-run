import * as cpy from "cpy";
import * as fs from "fs";

function copyDistSchemas() {
  console.log("Copying Angular CLI target schemas");
  ["dev-server", "browser", "extract-i18n", "karma", "server"].forEach(
    async (target) => {
      await cpy(
        [
          `./node_modules/@angular-devkit/build-angular/src/builders/${target}/schema.json`,
        ],
        `src/builders/${target}`
      );
      console.log(`./node_modules/@angular-devkit/build-angular/src/builders/${target}/schema.json ==> src/builders/${target} ✅`);
      fs.renameSync(
        `src/builders/${target}/schema.json`,
        `src/builders/${target}/${target}.json`
      );
    }
  );
}

copyDistSchemas();

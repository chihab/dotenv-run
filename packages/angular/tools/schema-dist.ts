import * as cpy from "cpy";
import * as fs from "fs";
import { cliTargets } from "./cli-targets";

async function copyDistSchemas() {
  console.log("Copying Angular CLI target schemas");
  // All but the application target
  cliTargets
    .filter((target) => target != "application")
    .forEach(async (target) => {
      await cpy(
        [
          `./node_modules/@angular-devkit/build-angular/src/builders/${target}/schema.json`,
        ],
        `src/builders/${target}`
      );
      console.log(
        `./node_modules/@angular-devkit/build-angular/src/builders/${target}/schema.json ==> src/builders/${target} ✅`
      );
      fs.renameSync(
        `src/builders/${target}/schema.json`,
        `src/builders/${target}/${target}.json`
      );
    });
  // Application target
  await cpy(
    [`./node_modules/@angular/build/src/builders/application/schema.json`],
    `src/builders/application`
  );
  console.log(
    `./node_modules/@angular/build/src/builders/application/schema.json ==> src/builders/application ✅`
  );
  fs.renameSync(
    `src/builders/application/schema.json`,
    `src/builders/application/application.json`
  );
}
(async () => {
  await copyDistSchemas();
})();

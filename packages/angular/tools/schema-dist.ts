import * as cpy from "cpy";
import * as fs from "fs";
import { cliTargets, devkitCliTargets } from "./cli-targets";

async function copyBuildTargets(targets: string[], from: string) {
  targets.forEach(async (target) => {
    await cpy([`${from}/${target}/schema.json`], `src/builders/${target}`);
    console.log(`${from}/${target}/schema.json ==> src/builders/${target} ✅`);
    fs.renameSync(
      `src/builders/${target}/schema.json`,
      `src/builders/${target}/${target}.json`
    );
  });
}

async function copyDistSchemas() {
  console.log("Copying Angular  target schemas");
  copyBuildTargets(
    cliTargets,
    "../../node_modules/@angular/build/src/builders"
  );
  copyBuildTargets(
    devkitCliTargets,
    "../../node_modules/@angular-devkit/build-angular/src/builders"
  );
}

(async () => {
  await copyDistSchemas();
})();

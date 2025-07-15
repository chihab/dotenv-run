import * as cpy from "cpy";
import * as fs from "fs";
import { buildCliTargets, cliTargets, devkitCliTargets } from "./cli-targets";

export default async function () {
  console.log("Adding @ngx-env/builder schema");
  const ngxEnvConf = JSON.parse(
    fs.readFileSync(`src/builders/ngx-env/ngx-env.json`, "utf-8")
  );
  await cpy(["src/builders/**/*.json"], "dist/builders/schemas");
  buildCliTargets.forEach(async (target) => {
    const builderConf = JSON.parse(
      fs.readFileSync(`src/builders/${target}/${target}.json`, "utf-8")
    );
    builderConf.properties = { ...builderConf.properties, ...ngxEnvConf };
    await fs.writeFileSync(
      `dist/builders/schemas/${target}.json`,
      JSON.stringify(builderConf, null, 4)
    );
    console.log(`Populated ngx-env schema for ${target} builder`);
  });
}

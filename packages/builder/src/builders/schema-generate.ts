import *  as fs from 'fs';
import * as cpy from 'cpy';

export default async function () {
    console.log("Adding @ngx-env/builder schema");
    const ngxEnvConf = JSON.parse(fs.readFileSync(`src/builders/ngx-env/ngx-env.json`, 'utf-8'));
    await cpy(['src/builders/**/*.json'], 'dist/builders/schemas');
    ["dev-server", "browser", "extract-i18n", "karma", "server"].forEach(
      async (target) => {
        const builderConf = JSON.parse(fs.readFileSync(`src/builders/${target}/${target}.json`, 'utf-8'));
        builderConf.properties = {...builderConf.properties, ...ngxEnvConf};
        await fs.writeFileSync(`dist/builders/schemas/${target}.json`, JSON.stringify(builderConf, null, 4))
      }
    );
}

import * as cpy from 'cpy';

export default async function () {
  await cpy(['src/schematics/ng-add/schema.json'], 'dist/schematics/ng-add');
}

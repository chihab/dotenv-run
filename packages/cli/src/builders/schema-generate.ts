/**
 * For each builder
 * - Merge the common schema and the plugin builder schema with the original schema from @angular/devkit
 * - Validate the generated schema
 */

import * as cpy from 'cpy';

(async () => {
  await cpy(['src/builders/**/*.json'], 'dist/builders/schemas');
})();

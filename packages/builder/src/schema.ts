import copySchematicsSchema from './schematics/schema-copy';
import copyBuildersSchemas from './builders/schema-generate';

(async () => {
  await copySchematicsSchema();
  await copyBuildersSchemas();
})();

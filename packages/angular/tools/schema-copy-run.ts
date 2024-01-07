import copySchematicsSchema from './schema-copy';
import copyBuildersSchemas from './schema-generate';

(async () => {
  await copySchematicsSchema();
  await copyBuildersSchemas();
})();

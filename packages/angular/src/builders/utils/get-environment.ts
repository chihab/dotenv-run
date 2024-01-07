export function getEnvironment(configuration: string) {
  return (
    process.env.NG_APP_ENV || // @deprecated
    process.env.NODE_ENV || // default in @dotenv-run/core
    configuration // default in @angular-devkit/build-angular
  );
}

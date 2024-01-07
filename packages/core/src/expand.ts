import { config, DotenvConfigOptions } from "dotenv";
import { expand as dotenvExpand } from "dotenv-expand";

export function expand(envPaths: string[], dotenvConfig?: DotenvConfigOptions) {
  envPaths.forEach((dotenvFile) => {
    dotenvExpand(
      config({
        path: dotenvFile,
        ...dotenvConfig,
      })
    );
  });
}

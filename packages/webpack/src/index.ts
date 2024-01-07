import { type DotenvRunOptions, type Dict, env } from "@dotenv-run/core";
import type { WebpackPluginInstance, Compiler } from "webpack";
import { DefinePlugin } from "webpack";

class DotenvRunPlugin implements WebpackPluginInstance {
  public raw: Dict = {};
  public full: Dict = {};
  public stringified: Dict = {};

  constructor(options: DotenvRunOptions, private ssr = false) {
    const { full, stringified, raw } = env(options);
    this.raw = raw;
    this.full = full;
    this.stringified = stringified;
  }

  apply(compiler: Compiler) {
    const definePlugin = new DefinePlugin(
      this.ssr
        ? { ...this.full }
        : {
            "process.env": this.stringified,
            "import.meta.env": this.stringified,
            "import.meta.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
          }
    );
    definePlugin.apply(compiler);
  }
}

export { DotenvRunOptions, DotenvRunPlugin };

export default DotenvRunPlugin;

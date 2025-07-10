import { DotenvRunPlugin } from "@dotenv-run/rspack";
import path from "path";

const __dirname = path.resolve();

export default {
  plugins: [
    new DotenvRunPlugin(
      {
        environment: process.env.NODE_ENV,
        prefix: "^API",
        cwd: process.cwd(),
        verbose: true,
        root: "../..",
        files: [".env.app"],
        nodeEnv: false,
        dotenv: { override: true },
      },
      __dirname
    ),
  ],
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};

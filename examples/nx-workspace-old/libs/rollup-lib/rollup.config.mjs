import env from "@dotenv-run/rollup";

export default {
  input: "src/index.mjs",
  output: {
    file: "dist/index.js",
  },
  plugins: [
    env({
      prefix: "^API",
      verbose: true,
      root: "../../..",
      files: [".env.app"],
      environment: process.env.NODE_ENV,
      cwd: process.cwd(),
    }),
  ],
};

import { build } from "esbuild";
import { describe, expect, it } from "vitest";
import { dotenvRun } from "../src/";
import { env } from "@dotenv-run/core";

describe("Usage with esbuild", () => {
  it("should replace environment variables using esbuild plugin", async () => {
    const results = await build({
      write: false,
      bundle: true,
      entryPoints: [`test/app.js`],
      plugins: [
        dotenvRun({
          prefix: "MY_",
          verbose: false,
          files: [".env"],
        }),
      ],
    });

    expect(results.outputFiles.at(0)?.text).toMatchSnapshot();
  });


  it("should replace environment variables using esbuild plugin and a custom define", async () => {
    const results = await build({
      write: false,
      bundle: true,
      entryPoints: [`test/app.js`],
      define: {
        "process.env.MY_API_BASE": '"https://dotenv-run.define"',
        "import.meta.env.MY_API_BASE": '"https://dotenv-run.define"',
      },
      plugins: [
        dotenvRun({
          prefix: "MY_",
          verbose: false,
          files: [".env"],
        }),
      ],
    });

    expect(results.outputFiles.at(0)?.text).toMatchSnapshot();
  });

  it("should replace environment variables using define option", async () => {
    const { full } = env({
      prefix: "MY_",
      verbose: false,
      files: [".env"],
    });

    const results = await build({
      bundle: true,
      write: false,
      entryPoints: [`test/app.js`],
      define: full,
    });

    expect(results.outputFiles.at(0)?.text.trim()).toMatchSnapshot();
  });
});

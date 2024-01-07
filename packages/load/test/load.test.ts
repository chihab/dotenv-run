import { execSync } from "child_process";
import { describe, it, expect } from "vitest";

describe("dotenv-run should give the expected output", () => {
  it("preload dev", () => {
    const actual = execSync(
      "NODE_ENV=dev node -r ./dist/index.js ./test/server.js",
      {
        encoding: "utf8",
      }
    );
    expect(actual).toContain("https://dotenv-run.dev/");
  });

  it("preload prod", () => {
    const actual = execSync(
      "NODE_ENV=prod node -r ./dist/index.js ./test/server.js",
      {
        encoding: "utf8",
      }
    );
    expect(actual).toContain("https://dotenv-run.app/");
  });

  it("NODE_OPTIONS prod", () => {
    const actual = execSync(
      "NODE_ENV=prod NODE_OPTIONS='-r ./dist/index.js' node ./test/server.js",
      {
        encoding: "utf8",
      }
    );
    expect(actual).toContain("https://dotenv-run.app/");
  });
});

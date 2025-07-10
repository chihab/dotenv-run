import { execSync } from "child_process";
import { describe, it, expect } from "vitest";

describe("dotenv-run should give the expected output", () => {
  it("prod", () => {
    const actual = execSync("node dist/prod/main.js", {
      encoding: "utf8",
    });
    expect(actual).toMatchSnapshot();
  });
});

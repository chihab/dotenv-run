import { execSync } from "child_process";
import { describe, it, expect } from "vitest";

describe("dotenv-run should give the expected output", () => {
  it("dev", () => {
    const actual = execSync("node dist/dev/main.js", {
      encoding: "utf8",
    });
    expect(actual).toMatchSnapshot();
  });
});

import { execSync } from "child_process";
import { describe, it, expect } from "vitest";

describe("dotenv-run should give the expected output", () => {
  it("empty", () => {
    const actual = execSync(
      "dotenv-run -f .env.app -- bash -c 'echo \"Hello World $API_USERS\"'",
      {
        encoding: "utf8",
      }
    );
    expect(actual).toMatchSnapshot();
  });

  it("dev", () => {
    const actual = execSync(
      "NODE_ENV=dev dotenv-run -f .env.app -- bash -c 'echo \"Hello World $API_USERS\"'",
      {
        encoding: "utf8",
      }
    );
    expect(actual).toMatchSnapshot();
  });

  it("prod", () => {
    const actual = execSync(
      "NODE_ENV=prod dotenv-run -f .env.app -e prod -- bash -c 'echo \"Hello World $API_USERS\"'",
      {
        encoding: "utf8",
      }
    );
    expect(actual).toMatchSnapshot();
  });

  it("multi", () => {
    const actual = execSync(
      "NODE_ENV=prod dotenv-run -e prod -f .secrets,.env.app -- bash -c 'echo \"Hello World $API_USERS\"'",
      {
        encoding: "utf8",
      }
    );
    expect(actual).toMatchSnapshot();
  });
});

import { expect, it } from "vitest";
import { env } from "../src";

it("should load prod environment", () => {
  process.env.NODE_ENV = "prod";
  const { full, stringified, raw } = env({
    root: "..",
    verbose: true,
    prefix: "^API_",
  });
  expect(raw).toEqual({
    API_AUTH: "https://dotenv-run.app/api/v1/auth",
    API_BASE: "https://dotenv-run.app",
    API_USERS: "https://dotenv-run.app/api/v1/users",
    NODE_ENV: "prod",
  });
  expect(stringified).toEqual({
    API_AUTH: '"https://dotenv-run.app/api/v1/auth"',
    API_BASE: '"https://dotenv-run.app"',
    API_USERS: '"https://dotenv-run.app/api/v1/users"',
    NODE_ENV: '"prod"',
  });
  expect(full).toEqual({
    "import.meta.env.API_AUTH": '"https://dotenv-run.app/api/v1/auth"',
    "import.meta.env.API_BASE": '"https://dotenv-run.app"',
    "import.meta.env.API_USERS": '"https://dotenv-run.app/api/v1/users"',
    "import.meta.env.NODE_ENV": '"prod"',
    "process.env.API_AUTH": '"https://dotenv-run.app/api/v1/auth"',
    "process.env.API_BASE": '"https://dotenv-run.app"',
    "process.env.API_USERS": '"https://dotenv-run.app/api/v1/users"',
    "process.env.NODE_ENV": '"prod"',
  });
  expect(process.env.API_USERS).toBe("https://dotenv-run.app/api/v1/users");
});

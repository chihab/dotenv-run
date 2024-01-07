import { it, expect } from "vitest";
import { env } from "../src";

it("should load dev environment from the root workspace", () => {
  process.env.NODE_ENV = "dev";
  const { full, stringified, raw } = env({
    root: "..",
    verbose: true,
    prefix: "^API_",
    files: [".env"],
  });
  expect(raw).toEqual({
    API_AUTH: "https://dotenv-run.dev/api/v1/auth",
    API_BASE: "https://dotenv-run.dev",
    API_USERS: "https://dotenv-run.dev/api/v1/users",
    NODE_ENV: "dev",
  });
  expect(stringified).toEqual({
    API_AUTH: '"https://dotenv-run.dev/api/v1/auth"',
    API_BASE: '"https://dotenv-run.dev"',
    API_USERS: '"https://dotenv-run.dev/api/v1/users"',
    NODE_ENV: '"dev"',
  });
  expect(full).toEqual({
    "import.meta.env.API_AUTH": '"https://dotenv-run.dev/api/v1/auth"',
    "import.meta.env.API_BASE": '"https://dotenv-run.dev"',
    "import.meta.env.API_USERS": '"https://dotenv-run.dev/api/v1/users"',
    "import.meta.env.NODE_ENV": '"dev"',
    "process.env.API_AUTH": '"https://dotenv-run.dev/api/v1/auth"',
    "process.env.API_BASE": '"https://dotenv-run.dev"',
    "process.env.API_USERS": '"https://dotenv-run.dev/api/v1/users"',
    "process.env.NODE_ENV": '"dev"',
  });
  expect(process.env.API_USERS).toBe("https://dotenv-run.dev/api/v1/users");
});

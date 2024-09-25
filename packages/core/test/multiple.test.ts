import { it, expect } from "vitest";
import { env } from "../src";

it("should correctly handle priorities", () => {
  process.env.NODE_ENV = "prod";
  const { full, stringified, raw } = env({
    root: "..",
    verbose: true,
    prefix: "^API_",
    files: [".env", ".secrets"],
  });
  expect(raw).toEqual({
    API_AUTH: "https://dotenv-run.app/api/v1/auth",
    API_BASE: "https://dotenv-run.app",
    API_SECRET: "API_SECRET_PROD",
    API_USERS: "https://dotenv-run.app/api/v1/users",
    NODE_ENV: "prod",
  });
  expect(process.env.API_USERS).toBe("https://dotenv-run.app/api/v1/users");
});

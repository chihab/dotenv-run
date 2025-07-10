import { it, expect } from "vitest";
import { getApiUrl } from "../dist/index.js";

it("dotenv-run should give the expected output", () => {
  expect(getApiUrl()).toBe("https://dotenv-run.dev/api/v1/users");
});

import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { writeRuntimeFile } from "../src/builders/utils/write-ngx-env-runtime";

let outputDir: string;

function addIndex(dir: string, file = "index.html") {
  mkdirSync(join(outputDir, dir), { recursive: true });
  writeFileSync(join(outputDir, dir, file), "<html></html>");
}

describe("writeRuntimeFile", () => {
  beforeEach(() => {
    outputDir = mkdtempSync(join(tmpdir(), "ngx-env-"));
  });

  afterEach(() => {
    rmSync(outputDir, { recursive: true, force: true });
  });

  it("writes only to the root when the build is not localized", () => {
    addIndex("");
    addIndex("fr");

    writeRuntimeFile(outputDir, false, {
      NG_APP_API: "https://api.example.com",
    });

    expect(existsSync(join(outputDir, "ngx-env.js"))).toBe(true);
    expect(existsSync(join(outputDir, "fr", "ngx-env.js"))).toBe(false);
  });

  it("writes one file per locale directory when the build is localized", () => {
    addIndex("fr");
    addIndex("en-US", "index.csr.html");
    addIndex(join("fr", "about"));
    mkdirSync(join(outputDir, "media"));

    writeRuntimeFile(outputDir, true, {
      NG_APP_API: "https://api.example.com",
    });

    expect(existsSync(join(outputDir, "fr", "ngx-env.js"))).toBe(true);
    expect(existsSync(join(outputDir, "en-US", "ngx-env.js"))).toBe(true);
    expect(existsSync(join(outputDir, "fr", "about", "ngx-env.js"))).toBe(
      false
    );
    expect(existsSync(join(outputDir, "media", "ngx-env.js"))).toBe(false);
    expect(existsSync(join(outputDir, "ngx-env.js"))).toBe(false);
  });

  it("also writes to the root of a localized build when it has an index", () => {
    addIndex("");
    addIndex("fr");

    writeRuntimeFile(outputDir, true, {
      NG_APP_API: "https://api.example.com",
    });

    expect(existsSync(join(outputDir, "ngx-env.js"))).toBe(true);
    expect(existsSync(join(outputDir, "fr", "ngx-env.js"))).toBe(true);
  });
});

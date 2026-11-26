import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

describe("formDelivery client helper", () => {
  it("posts to the same-origin inquiry route and does not embed an n8n webhook URL", () => {
    const source = fs.readFileSync(path.resolve("client/src/lib/formDelivery.ts"), "utf8");
    expect(source).toContain('"/api/inquiry"');
    expect(source).not.toMatch(/n8n\.cloud/);
    expect(source).not.toMatch(/https:\/\//);
  });
});

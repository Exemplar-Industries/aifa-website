import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

describe("Free Video Training form", () => {
  it("posts to the same-origin free-training route and does not embed an n8n webhook URL", () => {
    const source = fs.readFileSync(path.resolve("client/src/pages/FreeVideoTraining.tsx"), "utf8");
    expect(source).toContain('"/api/free-training"');
    expect(source).not.toMatch(/n8n\.cloud/);
    expect(source).not.toMatch(/https:\/\/.*webhook/);
    expect(source.match(/fetch\(FORM_WEBHOOK_URL/g)?.length).toBe(2);
  });
});

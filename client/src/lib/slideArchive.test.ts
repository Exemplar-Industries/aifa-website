import { describe, expect, it } from "vitest";
import { ARCHIVE_BUCKET, archiveCategories, archiveCategoryClass } from "./slideArchive";

describe("slide archive metadata", () => {
  it("keeps all approved archive categories available", () => {
    expect(archiveCategories).toEqual([
      "Course Lessons",
      "Strategy",
      "Free Training Funnel",
      "Workshops & Events",
      "Operations",
      "Other",
    ]);
  });

  it("creates stable visual category identifiers", () => {
    expect(archiveCategoryClass("Course Lessons")).toBe("course-lessons");
    expect(archiveCategoryClass("Workshops & Events")).toBe("workshops-events");
  });

  it("keeps the archive bucket explicitly separate from public application assets", () => {
    expect(ARCHIVE_BUCKET).toBe("aifa-slide-archive");
    expect(ARCHIVE_BUCKET).not.toContain("public");
  });
});

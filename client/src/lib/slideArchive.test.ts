import { describe, expect, it } from "vitest";
import { ARCHIVE_BUCKET, archiveCategories, archiveCategoryClass, privateStoryboardAssets } from "./slideArchive";

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
    expect(archiveCategoryClass("Free Training Funnel")).toBe("free-training-funnel");
    expect(archiveCategoryClass("Workshops & Events")).toBe("workshops-events");
  });

  it("keeps the archive bucket explicitly separate from public application assets", () => {
    expect(ARCHIVE_BUCKET).toBe("aifa-slide-archive");
    expect(ARCHIVE_BUCKET).not.toContain("public");
  });

  it("keeps Camera Angles storyboard assets in a closed private-media allowlist", () => {
    expect(privateStoryboardAssets).toEqual([
      "storyboard-football.png",
      "storyboard-forest.png",
      "storyboard-creator.png",
    ]);
    expect(privateStoryboardAssets.every((asset) => !asset.includes("/"))).toBe(true);
  });
});

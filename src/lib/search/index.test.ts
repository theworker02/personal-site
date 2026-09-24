import { describe, expect, it } from "vitest";
import { searchSite } from "@/lib/search";

describe("search", () => {
  it("finds chimera", async () => {
    const result = await searchSite("chimera");
    const titles = result.groups.flatMap((g) => g.items.map((i) => i.title.toLowerCase()));
    expect(titles.some((t) => t.includes("chimera"))).toBe(true);
  });

  it("groups empty query results", async () => {
    const result = await searchSite("");
    expect(result.groups.length).toBeGreaterThan(0);
  });
});

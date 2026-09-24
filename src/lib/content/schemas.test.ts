import { describe, expect, it } from "vitest";
import { projects } from "@/lib/content/projects";
import { projectSchema } from "@/lib/content/schemas";
import { getGraph } from "@/lib/graph";
import { researchEntries } from "@/lib/content/research";
import { labEntries } from "@/lib/content/lab";

describe("content schemas", () => {
  it("validates all projects", () => {
    for (const project of projects) {
      expect(() => projectSchema.parse(project)).not.toThrow();
    }
  });

  it("has unique project slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("builds a graph with nodes and edges", () => {
    const graph = getGraph();
    expect(graph.nodes.length).toBeGreaterThan(5);
    expect(graph.edges.length).toBeGreaterThan(5);
  });

  it("keeps research and lab entries non-empty", () => {
    expect(researchEntries.length).toBeGreaterThan(0);
    expect(labEntries.length).toBeGreaterThan(0);
  });
});

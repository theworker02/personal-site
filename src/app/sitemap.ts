import type { MetadataRoute } from "next";
import { projects } from "@/lib/content/projects";
import { researchEntries } from "@/lib/content/research";
import { writingEntries } from "@/lib/content/writing";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/projects",
    "/research",
    "/lab",
    "/writing",
    "/archive",
    "/timeline",
    "/graph",
    "/acquire",
    "/contact",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified: new Date(),
    })),
    ...researchEntries.map((r) => ({
      url: absoluteUrl(`/research/${r.slug}`),
      lastModified: new Date(),
    })),
    ...writingEntries.map((w) => ({
      url: absoluteUrl(`/writing/${w.slug}`),
      lastModified: new Date(),
    })),
  ];
}

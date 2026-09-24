import Fuse from "fuse.js";
import { projects } from "@/lib/content/projects";
import { researchEntries } from "@/lib/content/research";
import { labEntries } from "@/lib/content/lab";
import { writingEntries } from "@/lib/content/writing";
import { getGithubRepos } from "@/lib/github/sync";

export type SearchHit = {
  id: string;
  kind: "project" | "research" | "writing" | "lab" | "repository";
  title: string;
  summary: string;
  href: string;
  meta?: string;
};

async function buildCorpus(): Promise<SearchHit[]> {
  const hits: SearchHit[] = [];

  for (const p of projects) {
    hits.push({
      id: `project:${p.id}`,
      kind: "project",
      title: p.name,
      summary: p.description,
      href: `/projects/${p.slug}`,
      meta: [...p.languages, ...p.domains, p.status].join(" · "),
    });
  }

  for (const r of researchEntries) {
    hits.push({
      id: `research:${r.id}`,
      kind: "research",
      title: r.title,
      summary: r.summary,
      href: `/research/${r.slug}`,
      meta: r.status,
    });
  }

  for (const w of writingEntries) {
    hits.push({
      id: `writing:${w.slug}`,
      kind: "writing",
      title: w.title,
      summary: w.summary,
      href: `/writing/${w.slug}`,
      meta: `${w.readingMinutes} min`,
    });
  }

  for (const l of labEntries) {
    hits.push({
      id: `lab:${l.id}`,
      kind: "lab",
      title: l.title,
      summary: l.summary,
      href: `/lab#${l.id}`,
      meta: `${l.category} · ${l.status}`,
    });
  }

  try {
    const gh = await getGithubRepos();
    for (const repo of gh.repos) {
      if (projects.some((p) => p.repository?.includes(`/${repo.name}`))) continue;
      hits.push({
        id: `repo:${repo.name}`,
        kind: "repository",
        title: repo.name,
        summary: repo.description ?? "GitHub repository",
        href: repo.html_url,
        meta: [repo.language, ...(repo.topics ?? [])].filter(Boolean).join(" · "),
      });
    }
  } catch {
    // Search still works without GitHub cache.
  }

  return hits;
}

export async function searchSite(query: string, limit = 24) {
  const q = query.trim();
  const corpus = await buildCorpus();
  if (!q) {
    return { query: q, groups: groupHits(corpus.slice(0, limit)) };
  }

  const fuse = new Fuse(corpus, {
    keys: [
      { name: "title", weight: 0.45 },
      { name: "summary", weight: 0.3 },
      { name: "meta", weight: 0.25 },
    ],
    threshold: 0.38,
    ignoreLocation: true,
  });

  const results = fuse.search(q, { limit }).map((r) => r.item);
  return { query: q, groups: groupHits(results) };
}

function groupHits(hits: SearchHit[]) {
  const order: SearchHit["kind"][] = [
    "project",
    "research",
    "writing",
    "lab",
    "repository",
  ];
  const groups: Record<string, SearchHit[]> = {};
  for (const kind of order) groups[kind] = [];
  for (const hit of hits) groups[hit.kind].push(hit);
  return order
    .filter((k) => groups[k].length)
    .map((kind) => ({ kind, items: groups[kind] }));
}

export async function getCommandItems() {
  const corpus = await buildCorpus();
  const actions: SearchHit[] = [
    {
      id: "action:research",
      kind: "project",
      title: "Go to Research",
      summary: "Open the research laboratory notebook",
      href: "/research",
    },
    {
      id: "action:lab",
      kind: "lab",
      title: "Go to Lab",
      summary: "Experiments, prototypes, failed approaches",
      href: "/lab",
    },
    {
      id: "action:archive",
      kind: "repository",
      title: "Open Archive",
      summary: "Dense searchable index of work",
      href: "/archive",
    },
    {
      id: "action:timeline",
      kind: "project",
      title: "View Timeline",
      summary: "Chronology and lineage",
      href: "/timeline",
    },
    {
      id: "action:graph",
      kind: "project",
      title: "Explore project graph",
      summary: "Relationship knowledge graph",
      href: "/graph",
    },
    {
      id: "action:acquire",
      kind: "project",
      title: "View Acquisition",
      summary: "Collaboration and technology discussions",
      href: "/acquire",
    },
    {
      id: "action:contact",
      kind: "project",
      title: "Contact",
      summary: "Reach out by intent",
      href: "/contact",
    },
    {
      id: "action:rust",
      kind: "project",
      title: "Show Rust projects",
      summary: "Filter archive to Rust",
      href: "/archive?language=Rust",
    },
    {
      id: "action:ai",
      kind: "project",
      title: "Show AI projects",
      summary: "Filter archive to AI domain",
      href: "/archive?domain=ai",
    },
  ];
  return [...actions, ...corpus];
}

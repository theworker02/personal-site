"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/content/schemas";
import type { GithubRepo } from "@/lib/github/sync";

type Props = {
  projects: Project[];
  repos: GithubRepo[];
  initialQuery?: string;
  initialDomain?: string;
  initialLanguage?: string;
};

export function ArchiveExplorer({
  projects,
  repos,
  initialQuery = "",
  initialDomain,
  initialLanguage,
}: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [domain, setDomain] = useState(initialDomain ?? "all");
  const [language, setLanguage] = useState(initialLanguage ?? "all");

  const languages = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.languages.forEach((l) => set.add(l)));
    return Array.from(set).sort();
  }, [projects]);

  const curated = useMemo(() => {
    let list = projects.filter((p) => !p.excludedFromArchive);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.name, p.description, ...p.languages, ...p.domains].join(" ").toLowerCase().includes(q),
      );
    }
    if (domain !== "all") list = list.filter((p) => p.domains.includes(domain as Project["domains"][number]));
    if (language !== "all") list = list.filter((p) => p.languages.includes(language));
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [projects, query, domain, language]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search work"
          className="min-w-[16rem] flex-1 border border-current/20 bg-transparent px-3 py-2 text-sm"
        />
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="border border-current/20 bg-transparent px-3 py-2 text-sm"
        >
          <option value="all">All domains</option>
          {["infrastructure", "research", "ai", "systems", "hardware", "science", "networking", "developer-tools"].map(
            (d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ),
          )}
        </select>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-current/20 bg-transparent px-3 py-2 text-sm"
        >
          <option value="all">All languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div>
        {curated.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-current/10 py-4 no-underline md:grid-cols-[1fr_8rem_9rem]"
          >
            <span className="display text-xl font-bold">{p.name}</span>
            <span className="mono hidden text-[0.68rem] uppercase opacity-45 md:block">
              {p.languages.join(" · ") || "—"}
            </span>
            <span className="mono text-right text-[0.68rem] uppercase opacity-45">
              {p.domains[0]}
            </span>
          </Link>
        ))}
      </div>

      <p className="mono mt-10 text-[0.68rem] uppercase tracking-[0.12em] opacity-40">
        + {repos.length} repositories in GitHub cache
      </p>
    </div>
  );
}

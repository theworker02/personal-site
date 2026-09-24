"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/content/schemas";

export function Timeline({ projects }: { projects: Project[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, Project[]>();
    for (const p of projects) {
      const year = p.startedAt?.slice(0, 4) ?? "undated";
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(p);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [projects]);

  const [focus, setFocus] = useState(groups[groups.length - 1]?.[0] ?? "2026");

  return (
    <div className="grid gap-10 lg:grid-cols-[140px_1fr]">
      <div className="flex gap-2 overflow-x-auto lg:flex-col">
        {groups.map(([year]) => (
          <button
            key={year}
            type="button"
            onClick={() => setFocus(year)}
            className={`text-left font-[family-name:var(--font-display)] text-sm font-semibold ${
              focus === year ? "text-[var(--ink)] underline" : "text-[var(--mute)]"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
      <div className="border-l border-black/15 pl-6">
        {groups.map(([year, items]) => (
          <section
            key={year}
            className={`mb-12 ${focus === year ? "opacity-100" : "opacity-35"}`}
          >
            <h2 className="display text-3xl font-bold">{year}</h2>
            <ul className="mt-5 space-y-5">
              {items.map((p) => (
                <li key={p.id}>
                  <Link href={`/projects/${p.slug}`} className="display text-xl font-bold no-underline">
                    {p.name}
                  </Link>
                  <p className="mt-1 text-sm text-[var(--mute)]">{p.description}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projects } from "@/lib/content/projects";

export default function DesignArchivePage() {
  const [hover, setHover] = useState<string | null>(null);
  const active = useMemo(
    () => projects.find((p) => p.id === hover) ?? null,
    [hover],
  );

  return (
    <div className="world-index min-h-screen">
      <section className="page-pad py-20">
        <div className="page-max grid gap-12 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <p className="eyebrow opacity-50">{projects.length} curated works</p>
            <h1 className="display display-lg mt-4">Archive</h1>
            <div className="mt-12">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-white/10 py-4 no-underline transition-opacity md:grid-cols-[1fr_8rem_9rem]"
                  onMouseEnter={() => setHover(p.id)}
                  onFocus={() => setHover(p.id)}
                  style={{ opacity: hover && hover !== p.id ? 0.35 : 1 }}
                >
                  <span className="display text-xl font-bold md:text-2xl">{p.name}</span>
                  <span className="mono hidden text-[0.68rem] uppercase tracking-[0.1em] opacity-50 md:block">
                    {p.languages.join(" · ") || "—"}
                  </span>
                  <span className="mono text-right text-[0.68rem] uppercase tracking-[0.1em] opacity-50">
                    {p.domains[0]}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 border border-white/10 p-6">
              <p className="eyebrow opacity-50">Preview</p>
              {active ? (
                <>
                  <h2 className="display mt-4 text-3xl font-bold">{active.name}</h2>
                  <p className="editorial mt-4 text-base opacity-65">{active.description}</p>
                  <p className="mono mt-6 text-[0.68rem] uppercase tracking-[0.12em] opacity-45">
                    {active.status} · {active.startedAt ?? "—"}
                  </p>
                </>
              ) : (
                <p className="mt-4 text-sm opacity-45">Hover a row.</p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

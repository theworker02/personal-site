import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/shell/SiteFrame";
import { researchEntries } from "@/lib/content/research";

export const metadata: Metadata = {
  title: "Research",
  description: "Laboratory notebook — questions, methods, limitations.",
};

export default function ResearchIndexPage() {
  return (
    <SiteFrame world="paper">
      <p className="eyebrow text-[var(--mute)]">Research</p>
      <h1 className="display display-lg mt-4">Investigations</h1>
      <p className="editorial measure mt-8 text-xl text-[var(--mute)]">
        Status labels are honest. Active work is not presented as established scientific fact.
      </p>
      <div className="mt-16 divide-y divide-black/10">
        {researchEntries.map((r) => (
          <Link key={r.id} href={`/research/${r.slug}`} className="block py-10 no-underline">
            <div className="mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--domain-research)]">
              {r.status} · {r.updatedAt ?? r.startedAt}
            </div>
            <h2 className="display mt-3 text-3xl font-bold md:text-4xl">{r.title}</h2>
            <p className="editorial mt-4 max-w-2xl text-lg text-[var(--mute)]">{r.question}</p>
          </Link>
        ))}
      </div>
    </SiteFrame>
  );
}

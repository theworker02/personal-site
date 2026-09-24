import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/shell/SiteFrame";
import { writingEntries } from "@/lib/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Engineering notes and technical essays.",
};

export default function WritingIndexPage() {
  return (
    <SiteFrame world="paper">
      <p className="eyebrow text-[var(--mute)]">Writing</p>
      <h1 className="display display-lg mt-4">Notes</h1>
      <div className="mt-16 divide-y divide-black/10">
        {writingEntries.map((w) => (
          <Link key={w.slug} href={`/writing/${w.slug}`} className="block py-8 no-underline">
            <div className="mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--mute)]">
              {w.published} · {w.readingMinutes} min
            </div>
            <h2 className="display mt-3 text-3xl font-bold">{w.title}</h2>
            <p className="editorial mt-3 max-w-2xl text-[var(--mute)]">{w.summary}</p>
          </Link>
        ))}
      </div>
    </SiteFrame>
  );
}

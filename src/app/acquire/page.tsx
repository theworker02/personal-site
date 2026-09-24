import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/shell/SiteFrame";
import { projects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Acquire",
  description: "Technology acquisition and collaboration discussions.",
};

export default function AcquirePage() {
  const available = projects.filter((p) => p.acquisition?.available);

  return (
    <SiteFrame world="paper">
      <p className="eyebrow text-[var(--mute)]">Acquisition</p>
      <h1 className="display display-lg mt-4">
        Collaboration &
        <br />
        technology
      </h1>
      <p className="editorial measure mt-8 text-xl text-[var(--mute)]">
        Understated on purpose. The work establishes value first.
      </p>
      <div className="mt-16 space-y-4 border-t border-black/10 pt-8">
        {available.map((p) => (
          <div key={p.id} className="border-b border-black/10 py-6">
            <Link href={`/projects/${p.slug}`} className="display text-2xl font-bold no-underline">
              {p.name}
            </Link>
            <p className="mt-2 text-[var(--mute)]">{p.description}</p>
          </div>
        ))}
      </div>
      <Link
        href="/contact?intent=Acquisition"
        className="mt-12 inline-block font-[family-name:var(--font-display)] text-lg font-semibold no-underline"
      >
        Discuss →
      </Link>
    </SiteFrame>
  );
}

import type { Metadata } from "next";
import { SiteFrame } from "@/components/shell/SiteFrame";
import { labEntries } from "@/lib/content/lab";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experiments, prototypes, failed approaches.",
};

export default function LabPage() {
  return (
    <SiteFrame world="workshop" footerWorld="ink">
      <p className="eyebrow text-[var(--mute)]">Lab</p>
      <h1 className="display display-lg mt-4">Workshop</h1>
      <p className="editorial measure mt-8 text-xl text-[var(--mute)]">
        Unfinished work and failures stay visible when they produced knowledge.
      </p>
      <div className="mt-16 space-y-10">
        {labEntries.map((entry) => (
          <article key={entry.id} id={entry.id} className="border-t border-black/15 pt-8">
            <div className="mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--mute)]">
              {entry.category} · {entry.status}
            </div>
            <h2 className="display mt-3 text-3xl font-bold">{entry.title}</h2>
            <p className="editorial mt-3 max-w-2xl text-[var(--mute)]">{entry.summary}</p>
            {entry.learned ? (
              <p className="mt-5 border-l-2 border-black/30 pl-4 text-sm">
                <span className="mono text-[0.65rem] uppercase tracking-[0.12em]">Learned</span>
                <br />
                {entry.learned}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </SiteFrame>
  );
}

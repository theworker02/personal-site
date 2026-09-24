import Link from "next/link";
import { researchEntries } from "@/lib/content/research";

export default function DesignResearchPage() {
  const entry = researchEntries[1] ?? researchEntries[0];

  return (
    <div className="world-paper min-h-screen">
      <section className="page-pad py-24 md:py-32">
        <div className="page-max max-w-4xl">
          <p className="eyebrow text-[var(--mute)]">Research / 2026</p>
          <h1 className="display display-lg mt-6">{entry.title}</h1>
          <hr className="rule mt-10" />
          <p className="editorial mt-10 text-2xl leading-snug text-[var(--mute)] md:text-3xl">
            {entry.question}
          </p>

          <div className="mt-16 grid gap-10 border-t border-black/10 pt-10 sm:grid-cols-3">
            <div>
              <div className="display text-4xl font-bold">15</div>
              <div className="mono mt-2 text-[0.68rem] uppercase tracking-[0.12em] text-[var(--mute)]">
                Seeds / trials
                <span className="mt-1 block normal-case tracking-normal opacity-70">
                  illustrative layout metric — not a published result
                </span>
              </div>
            </div>
            <div>
              <div className="display text-4xl font-bold text-[var(--domain-research)]">
                ACTIVE
              </div>
              <div className="mono mt-2 text-[0.68rem] uppercase tracking-[0.12em] text-[var(--mute)]">
                Status
              </div>
            </div>
            <div>
              <div className="display text-4xl font-bold">4</div>
              <div className="mono mt-2 text-[0.68rem] uppercase tracking-[0.12em] text-[var(--mute)]">
                Related systems
              </div>
            </div>
          </div>

          <div className="editorial measure mt-16 space-y-6 text-lg text-[var(--mute)]">
            <p>
              <strong className="text-[var(--ink)]">Hypothesis.</strong> {entry.hypothesis}
            </p>
            <p>
              <strong className="text-[var(--ink)]">Limitations.</strong> {entry.limitations}
            </p>
          </div>

          <Link
            href={`/research/${entry.slug}`}
            className="mt-14 inline-block font-[family-name:var(--font-display)] text-lg font-semibold no-underline"
          >
            Read investigation →
          </Link>
        </div>
      </section>

      <section className="world-workshop page-pad py-24">
        <div className="page-max">
          <p className="eyebrow">Index</p>
          <div className="mt-8 divide-y divide-black/15">
            {researchEntries.map((r) => (
              <Link
                key={r.id}
                href={`/research/${r.slug}`}
                className="grid gap-2 py-6 no-underline md:grid-cols-[8rem_1fr]"
              >
                <span className="mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--domain-research)]">
                  {r.status}
                </span>
                <span>
                  <span className="display text-2xl font-bold">{r.title}</span>
                  <span className="mt-2 block text-[var(--mute)]">{r.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

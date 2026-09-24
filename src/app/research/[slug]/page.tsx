import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/shell/SiteFrame";
import { getResearch, researchEntries } from "@/lib/content/research";
import { projects } from "@/lib/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return researchEntries.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResearch(slug);
  if (!entry) return { title: "Research" };
  return { title: entry.title, description: entry.summary };
}

export default async function ResearchPage({ params }: Props) {
  const { slug } = await params;
  const entry = getResearch(slug);
  if (!entry) notFound();

  return (
    <SiteFrame world="paper">
      <article className="max-w-3xl">
        <p className="eyebrow text-[var(--mute)]">Research entry</p>
        <p className="mono mt-4 text-[0.7rem] uppercase tracking-[0.12em] text-[var(--domain-research)]">
          {entry.status}
        </p>
        <h1 className="display display-lg mt-4">{entry.title}</h1>
        <p className="editorial mt-6 text-xl text-[var(--mute)]">{entry.summary}</p>
        <div className="editorial mt-12 space-y-8 text-lg text-[var(--mute)]">
          <section>
            <h2 className="display text-2xl font-bold text-[var(--ink)]">Research question</h2>
            <p className="mt-3">{entry.question}</p>
          </section>
          {entry.hypothesis ? (
            <section>
              <h2 className="display text-2xl font-bold text-[var(--ink)]">Hypothesis</h2>
              <p className="mt-3">{entry.hypothesis}</p>
            </section>
          ) : null}
          {entry.methodology ? (
            <section>
              <h2 className="display text-2xl font-bold text-[var(--ink)]">Methodology</h2>
              <p className="mt-3">{entry.methodology}</p>
            </section>
          ) : null}
          {entry.results ? (
            <section>
              <h2 className="display text-2xl font-bold text-[var(--ink)]">Results</h2>
              <p className="mt-3">{entry.results}</p>
            </section>
          ) : null}
          {entry.limitations ? (
            <section>
              <h2 className="display text-2xl font-bold text-[var(--ink)]">Limitations</h2>
              <p className="mt-3">{entry.limitations}</p>
            </section>
          ) : null}
          {entry.relatedRepositories.length ? (
            <section>
              <h2 className="display text-2xl font-bold text-[var(--ink)]">Related</h2>
              <ul className="mt-3 space-y-2">
                {entry.relatedRepositories.map((id) => {
                  const project = projects.find((p) => p.id === id);
                  return (
                    <li key={id}>
                      {project ? (
                        <a href={`/projects/${project.slug}`}>{project.name}</a>
                      ) : (
                        id
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}
        </div>
      </article>
    </SiteFrame>
  );
}

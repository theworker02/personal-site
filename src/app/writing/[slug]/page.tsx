import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SiteFrame } from "@/components/shell/SiteFrame";
import { getWriting, writingEntries } from "@/lib/content/writing";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return writingEntries.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getWriting(slug);
  if (!entry) return { title: "Writing" };
  return { title: entry.title, description: entry.summary };
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getWriting(slug);
  if (!entry) notFound();

  return (
    <SiteFrame world="paper">
      <article className="max-w-3xl">
        <p className="eyebrow text-[var(--mute)]">Writing</p>
        <h1 className="display display-lg mt-4">{entry.title}</h1>
        <p className="mono mt-4 text-[0.7rem] text-[var(--mute)]">
          {entry.published} · {entry.readingMinutes} min
        </p>
        <div className="editorial mt-12 space-y-5 text-lg text-[var(--mute)] [&_a]:underline [&_h2]:mt-10 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--ink)] [&_strong]:text-[var(--ink)]">
          <MDXRemote source={entry.body} />
        </div>
      </article>
    </SiteFrame>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/shell/SiteFrame";
import { getFeaturedProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected systems with cinematic presentations.",
};

export default function ProjectsPage() {
  const featured = getFeaturedProjects().filter((p) =>
    ["parallax", "chimera", "stackglass", "aftermath", "kraftverk"].includes(p.slug),
  );

  return (
    <SiteFrame world="ink" footerWorld="paper">
      <p className="eyebrow opacity-50">Selected work</p>
      <h1 className="display display-lg mt-4">Systems</h1>
      <p className="editorial measure mt-8 text-xl opacity-65">
        A few systems shown with room to breathe — not a card grid.
      </p>
      <div className="mt-20">
        {featured.map((p, i) => (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            className="block border-t border-white/12 py-10 no-underline"
          >
            <div className="mono text-[0.68rem] uppercase tracking-[0.14em] opacity-45">
              {String(i + 1).padStart(2, "0")} / {p.domains[0]}
            </div>
            <h2 className="display mt-3 text-4xl font-bold md:text-6xl">{p.name}</h2>
            <p className="editorial mt-4 max-w-2xl text-lg opacity-60">{p.description}</p>
          </Link>
        ))}
      </div>
      <Link href="/archive" className="mt-12 inline-block font-[family-name:var(--font-display)] font-semibold no-underline opacity-70">
        Full archive →
      </Link>
    </SiteFrame>
  );
}

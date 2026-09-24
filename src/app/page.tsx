"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { EditorialNav } from "@/components/shell/EditorialNav";
import { EditorialFooter } from "@/components/shell/EditorialFooter";
import { TheField, type FieldMode } from "@/components/visual/TheField";
import { SignalRibbon } from "@/components/visual/SignalRibbon";
import {
  MarkBracket,
  MarkGrid,
  MarkNodes,
  MarkOrbit,
  MarkWave,
  SectionRule,
} from "@/components/visual/Marks";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Magnetic } from "@/components/motion/Magnetic";
import { currently, siteConfig } from "@/lib/site";
import { projects } from "@/lib/content/projects";

const ParallaxDemo = dynamic(
  () => import("@/components/projects/ProjectDemos").then((m) => m.ParallaxDemo),
  { ssr: false },
);
const ChimeraDemo = dynamic(
  () => import("@/components/projects/ProjectDemos").then((m) => m.ChimeraDemo),
  { ssr: false },
);
const StackglassDemo = dynamic(
  () => import("@/components/projects/ProjectDemos").then((m) => m.StackglassDemo),
  { ssr: false },
);
const StickyResearchPipeline = dynamic(
  () =>
    import("@/components/home/StickyResearchPipeline").then((m) => m.StickyResearchPipeline),
  { ssr: false },
);

const featured = [
  {
    n: "01",
    domain: "Systems",
    name: "Parallax",
    slug: "parallax",
    blurb:
      "Language boundaries are operational boundaries. Parallax treats migration as an IR problem: capture program state in one language, encode it as language-neutral representation, and restore or execute it elsewhere — so polyglot systems stop paying rewrite cost every time the runtime changes.",
    body: "The work sits with Centralizer and Chimera in a broader computation stack: interop supervision, distributed execution, and evidence about what actually ran. Status is experimental — useful as architecture and machinery, not as a finished product claim.",
    meta: ["Rust", "Runtime", "Systems"],
    Demo: ParallaxDemo,
    Mark: MarkNodes,
    flip: false,
  },
  {
    n: "02",
    domain: "Compute",
    name: "Chimera",
    slug: "chimera",
    blurb:
      "Most distributed-compute stories assume a rented control plane. Chimera asks what happens when peers discover each other, share work without a central broker, and keep storage honest as machines come and go — gossip membership, QUIC transport, Wasm-bounded jobs, content-addressed results.",
    body: "It is a concrete Rust grid rather than a decentralization slide deck. Trust, incentives, and failure domains remain open research questions attached to running code. The interesting part is that those questions stay tied to machinery you can inspect.",
    meta: ["Rust", "Mesh", "Wasm"],
    Demo: ChimeraDemo,
    Mark: MarkOrbit,
    flip: true,
  },
  {
    n: "03",
    domain: "Agents",
    name: "Stackglass",
    slug: "stackglass",
    blurb:
      "Coding agents write fluently and still guess about repository truth. Stackglass is an observability and verification layer for AI-assisted development: local-first evidence about state, tests, failures, configuration, contracts, and documentation — consumable by humans and by agents.",
    body: "It pairs with Aftermath (durable verification receipts) and Cartographer / Arcframe (orientation and blast radius). The bias is simple: show me is cheaper than trust me. Fluency is abundant; evidence is not.",
    meta: ["TypeScript", "MCP", "Evidence"],
    Demo: StackglassDemo,
    Mark: MarkGrid,
    flip: false,
    full: true,
  },
] as const;

export default function HomePage() {
  const [fieldMode, setFieldMode] = useState<FieldMode>("abstract");
  const archivePreview = projects.filter((p) => p.featured).slice(0, 8);

  return (
    <div>
      <ScrollProgress />

      {/* 00 / INTRODUCTION */}
      <div id="intro" className="world-paper">
        <EditorialNav />
        <section className="page-pad relative overflow-hidden">
          <div className="page-max relative grid min-h-0 items-center gap-8 py-8 sm:gap-10 sm:py-12 lg:min-h-[min(88svh,820px)] lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.95fr)] lg:gap-14">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-5 flex items-center gap-3">
                <MarkBracket className="h-8 w-4 text-[var(--mute)]" />
                <p className="eyebrow text-[var(--mute)]">00 / Introduction</p>
              </div>
              <TextReveal
                className="display display-xl"
                lineClassName="display display-xl"
                lines={[
                  "Building systems",
                  "for questions",
                  "without easy answers.",
                ]}
              />
              <Reveal delay={0.25}>
                <p className="editorial mt-6 text-base leading-relaxed text-[var(--mute)] sm:mt-8 sm:text-lg md:text-xl">
                  {siteConfig.statement}
                </p>
              </Reveal>
              <Reveal delay={0.35}>
                <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-6">
                  <Magnetic>
                    <a
                      href="#systems"
                      className="touch-target inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-semibold no-underline"
                    >
                      Explore <span aria-hidden>↓</span>
                    </a>
                  </Magnetic>
                  <div className="flex flex-wrap gap-1 sm:gap-2" role="group" aria-label="Field mode">
                    {(
                      [
                        ["Research", "research"],
                        ["Systems", "systems"],
                        ["Agents", "ai"],
                      ] as const
                    ).map(([label, mode]) => (
                      <button
                        key={mode}
                        type="button"
                        className={`touch-target px-2 mono text-[0.68rem] uppercase tracking-[0.14em] ${
                          fieldMode === mode
                            ? "text-[var(--ink)] underline"
                            : "text-[var(--mute-soft)]"
                        }`}
                        onClick={() => setFieldMode(mode)}
                        onMouseEnter={() => setFieldMode(mode)}
                        onFocus={() => setFieldMode(mode)}
                        aria-pressed={fieldMode === mode}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
              <div className="mt-10 flex items-center gap-6 opacity-50 sm:mt-12">
                <MarkOrbit className="h-10 w-10" />
                <MarkWave className="h-6 w-28" />
                <MarkNodes className="h-8 w-20" />
              </div>
            </div>

            <Parallax strength={0.06} className="relative h-[220px] w-full min-w-0 border border-black/10 sm:h-[280px] lg:h-[min(68vh,560px)]">
              <TheField mode={fieldMode} className="absolute inset-0" />
              <div className="pointer-events-none absolute bottom-3 left-3 mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--mute)]">
                Field · {fieldMode}
              </div>
            </Parallax>
          </div>
        </section>
        <div className="page-pad pb-8">
          <div className="page-max">
            <SignalRibbon />
          </div>
        </div>
      </div>

      {/* 01 / CURRENTLY */}
      <section id="currently" className="world-workshop page-pad py-16 md:py-24">
        <div className="page-max grid gap-10 md:grid-cols-[auto_1fr] md:items-start">
          <div className="flex items-start gap-3">
            <MarkGrid className="mt-1 h-12 w-12 opacity-60" />
            <p className="eyebrow pt-2">01 / Currently</p>
          </div>
          <Reveal>
            <div className="space-y-5">
              <p className="editorial max-w-2xl text-xl leading-relaxed md:text-2xl">
                {currently.researching}
              </p>
              <p className="editorial max-w-2xl text-lg leading-relaxed text-[var(--mute)]">
                That splits into active builds and exploratory threads — not a single product
                pitch, but a coherent investigation surface.
              </p>
            </div>
            <div className="mt-10 grid gap-8 border-t border-black/15 pt-8 sm:grid-cols-2">
              <div>
                <div className="mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--mute)]">
                  Building
                </div>
                <p className="mt-2 font-[family-name:var(--font-display)] text-sm font-semibold leading-relaxed md:text-base">
                  {currently.building}
                </p>
              </div>
              <div>
                <div className="mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--mute)]">
                  Exploring
                </div>
                <p className="mt-2 font-[family-name:var(--font-display)] text-sm font-semibold leading-relaxed md:text-base">
                  {currently.exploring}
                </p>
              </div>
            </div>
            <p className="editorial mt-8 max-w-2xl text-base leading-relaxed text-[var(--mute)]">
              <span className="mono text-[0.65rem] uppercase tracking-[0.12em]">Also experimenting · </span>
              {currently.experimenting}
            </p>
          </Reveal>
        </div>
      </section>

      {/* breath */}
      <section className="world-paper page-pad py-16 md:py-24">
        <div className="page-max">
          <SectionRule label="Note" className="mb-8 max-w-xl" />
          <div className="grid gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <TextReveal
              className="display display-lg"
              lineClassName="display display-lg"
              lines={["I build to", "understand."]}
            />
            <Reveal>
              <MarkOrbit className="mb-4 h-14 w-14 opacity-40" />
              <p className="editorial text-lg leading-relaxed text-[var(--mute)]">
                Sometimes that produces software. Sometimes research. Sometimes an experiment
                fails and still leaves a useful constraint — a scheduling assumption that
                collapsed, a metaphor that stalled without a runtime, a benchmark suite that was
                not ready to publish numbers.
              </p>
              <p className="editorial mt-4 text-lg leading-relaxed text-[var(--mute)]">
                Those outcomes belong here too. The Lab keeps unfinished and failed approaches
                visible when they produced knowledge. The polished systems on this page are not
                the whole story; they are the parts worth entering first.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 / SELECTED SYSTEMS */}
      <div id="systems" className="world-ink">
        <div className="page-pad pt-16">
          <div className="page-max">
            <p className="eyebrow opacity-50">02 / Selected systems</p>
            <hr className="rule mt-6 opacity-40" />
          </div>
        </div>
        {featured.map((item) => (
          <section
            key={item.slug}
            className="page-pad border-b border-white/10 py-16 md:py-24"
          >
            <div className="page-max">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="eyebrow opacity-50">
                  {item.n} / {item.domain}
                </p>
                <item.Mark className="h-8 w-auto opacity-40" />
              </div>

              <div
                className={`mt-6 grid gap-8 lg:items-start ${
                  "full" in item && item.full
                    ? ""
                    : item.flip
                      ? "lg:grid-cols-[1.05fr_0.95fr]"
                      : "lg:grid-cols-[0.95fr_1.05fr]"
                }`}
              >
                <Reveal className={item.flip ? "lg:order-2" : ""}>
                  <h2 className="display display-lg">{item.name}</h2>
                  <p className="editorial mt-5 max-w-xl text-lg leading-relaxed opacity-70">
                    {item.blurb}
                  </p>
                  <p className="editorial mt-4 max-w-xl text-base leading-relaxed opacity-55">
                    {item.body}
                  </p>
                  <div className="mono mt-5 text-[0.7rem] uppercase tracking-[0.14em] opacity-45">
                    {item.meta.join(" · ")}
                  </div>
                  <Link
                    href={`/projects/${item.slug}`}
                    className="mt-8 inline-block font-[family-name:var(--font-display)] text-base font-semibold no-underline"
                  >
                    Explore {item.name} →
                  </Link>
                </Reveal>
                <Reveal
                  delay={0.12}
                  className={`border border-white/12 p-4 md:p-6 ${item.flip ? "lg:order-1" : ""}`}
                >
                  <item.Demo />
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* 03 / RESEARCH — sticky storytelling */}
      <div id="research">
        <StickyResearchPipeline />
      </div>

      {/* 04 / GRAPH tease */}
      <section id="graph" className="world-paper page-pad py-20 md:py-28">
        <div className="page-max grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-[var(--mute)]">04 / The graph</p>
            <h2 className="display display-lg mt-4 max-w-2xl">
              How the work
              <br />
              connects
            </h2>
            <hr className="rule mt-8 max-w-sm" />
            <p className="editorial mt-8 max-w-xl text-lg leading-relaxed text-[var(--mute)]">
              Domains, lineage, and shared infrastructure form one knowledge graph — not a list of
              unrelated repositories. Agent tooling feeds verification planes; polyglot runtimes
              sit beside distributed meshes; hardware and science projects share the same bias
              toward provenance and inspectable state.
            </p>
            <p className="editorial mt-4 max-w-xl text-base leading-relaxed text-[var(--mute)]">
              The graph powers constellation thinking, archive lineage, and related-work links on
              project pages. Open it when you want relationships instead of a flat index.
            </p>
            <Link
              href="/graph"
              className="mt-8 inline-block font-[family-name:var(--font-display)] font-semibold no-underline"
            >
              Open graph →
            </Link>
          </Reveal>
          <Parallax strength={0.05} className="relative h-[240px] border border-black/10 lg:h-[300px]">
            <TheField mode="systems" className="absolute inset-0" />
          </Parallax>
        </div>
      </section>

      {/* 05 / ARCHIVE */}
      <section id="archive" className="world-index page-pad py-20 md:py-28">
        <div className="page-max">
          <p className="eyebrow opacity-50">05 / Archive</p>
          <h2 className="display display-lg mt-4">Complete body of work</h2>
          <p className="editorial mt-6 max-w-2xl text-lg leading-relaxed opacity-60">
            Selected systems above are the cinematic path. The archive is the dense index —
            curated metadata plus the GitHub cache — for when you need language, domain, and
            status filters rather than a guided tour.
          </p>
          <hr className="rule mt-8 opacity-30" />
          <div className="mt-10">
            {archivePreview.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-white/10 py-4 no-underline md:grid-cols-[1fr_8rem_9rem]"
              >
                <span className="display text-xl font-bold">{p.name}</span>
                <span className="mono hidden text-[0.68rem] uppercase opacity-45 md:block">
                  {p.languages.join(" · ") || "—"}
                </span>
                <span className="mono text-right text-[0.68rem] uppercase opacity-45">
                  {p.domains[0]}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/archive"
            className="mt-10 inline-block font-[family-name:var(--font-display)] font-semibold no-underline opacity-80"
          >
            Open full archive →
          </Link>
        </div>
      </section>

      {/* 06 / WORK WITH ME */}
      <section id="collaborate" className="world-paper page-pad py-20 md:py-28">
        <div className="page-max">
          <p className="eyebrow text-[var(--mute)]">06 / Work with me</p>
          <h2 className="display display-lg mt-4 max-w-3xl">
            Research · Engineering · Acquisition
          </h2>
          <p className="editorial mt-6 max-w-2xl text-lg leading-relaxed text-[var(--mute)]">
            Serious conversations usually start from a specific system, a research thread, or a
            portfolio-level diligence request. Prefer intent over a generic hello — engineering,
            research, collaboration, acquisition, or employment each map to different next steps.
          </p>
          <p className="editorial mt-4 max-w-2xl text-base leading-relaxed text-[var(--mute)]">
            Acquisition and licensing details stay understated on purpose. The work should
            establish value before transactional talk; `/acquire` exists for parties ready for that
            discussion.
          </p>
          <div className="mt-10 flex flex-wrap gap-8 font-[family-name:var(--font-display)] font-semibold">
            <Link href="/contact" className="no-underline">
              Contact →
            </Link>
            <Link href="/acquire" className="no-underline opacity-60">
              Acquisition
            </Link>
            <Link href="/research" className="no-underline opacity-60">
              Research
            </Link>
          </div>
        </div>
      </section>

      {/* 07 / END */}
      <div id="end">
        <EditorialFooter world="ink" />
      </div>
    </div>
  );
}

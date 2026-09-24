"use client";

import { useEffect, useState } from "react";
import { motion, useTransform } from "motion/react";
import {
  StickyProgressBar,
  StickyScene,
  useStickyProgress,
} from "@/components/motion/StickyScene";
import { shouldEnableStickyScenes } from "@/lib/motion/scroll";

const stages = [
  { title: "Question", body: "A research question enters the system." },
  { title: "Sources", body: "Relevant sources are gathered without trusting any single voice." },
  { title: "Evidence", body: "Observations are normalized into inspectable evidence." },
  { title: "Claims", body: "Claims form — and contradictions stay visible." },
  { title: "Synthesis", body: "Verification precedes the answer." },
];

function PipelineCopy() {
  return (
    <div>
      <p className="eyebrow opacity-50">03 / Research</p>
      <h2 className="display display-lg mt-4">
        Omniresearch
        <br />
        loop
      </h2>
      <p className="editorial mt-6 max-w-md text-base leading-relaxed opacity-65 sm:text-lg">
        Research should not merely retrieve answers. It should construct evidence — sources,
        claims, contradictions, and verification that can be inspected after the session ends.
      </p>
      <p className="editorial mt-4 max-w-md text-sm leading-relaxed opacity-50 sm:text-base">
        This sequence sketches that loop. It is a demonstration of structure, not a claim that
        every stage is fully productized. Aftermath and Stackglass are the concrete systems
        closest to the verification end of the pipeline.
      </p>
    </div>
  );
}

function StaticStages() {
  return (
    <div className="mt-8 space-y-3 lg:mt-0">
      {stages.map((s, i) => (
        <div key={s.title} className="border border-current/15 px-4 py-3">
          <div className="mono text-[0.65rem] uppercase tracking-[0.12em] opacity-50">
            {String(i + 1).padStart(2, "0")} · {s.title}
          </div>
          <p className="editorial mt-1 text-sm opacity-80">{s.body}</p>
        </div>
      ))}
    </div>
  );
}

function PipelineInner() {
  return (
    <div className="page-pad page-max grid w-full gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <PipelineCopy />
        <StickyProgressBar className="mt-10 max-w-xs" />
        <p className="mono mt-4 text-[0.68rem] uppercase tracking-[0.14em] opacity-45">
          Scroll to advance stages
        </p>
      </div>
      <div className="space-y-3">
        {stages.map((s, i) => (
          <StageRow key={s.title} index={i} title={s.title} body={s.body} />
        ))}
      </div>
    </div>
  );
}

function StageRow({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  const progress = useStickyProgress();
  const start = index / stages.length;
  const mid = (index + 0.45) / stages.length;
  const end = (index + 1) / stages.length;
  const opacity = useTransform(progress, [start, mid, end], [0.25, 1, 0.4]);
  const x = useTransform(progress, [start, mid], [16, 0]);

  return (
    <motion.div
      style={{ opacity, x, willChange: "transform, opacity" }}
      className="border border-current/15 px-4 py-3"
    >
      <div className="mono text-[0.65rem] uppercase tracking-[0.12em] opacity-50">
        {String(index + 1).padStart(2, "0")} · {title}
      </div>
      <p className="editorial mt-1 text-sm opacity-80">{body}</p>
    </motion.div>
  );
}

export function StickyResearchPipeline() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setSticky(shouldEnableStickyScenes());
    update();
    mq.addEventListener("change", update);
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionMq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  if (!sticky) {
    return (
      <section className="world-ink page-pad py-16 text-[var(--paper)] md:py-24">
        <div className="page-max grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <PipelineCopy />
          <StaticStages />
        </div>
      </section>
    );
  }

  return (
    <StickyScene heightVh={260} className="world-ink text-[var(--paper)]">
      <PipelineInner />
    </StickyScene>
  );
}

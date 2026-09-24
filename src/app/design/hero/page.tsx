"use client";

import { useState } from "react";
import { TheField, type FieldMode } from "@/components/visual/TheField";
import { EditorialNav } from "@/components/shell/EditorialNav";

const modes: FieldMode[] = [
  "abstract",
  "research",
  "systems",
  "infrastructure",
  "hardware",
  "ai",
];

export default function DesignHeroPage() {
  const [mode, setMode] = useState<FieldMode>("abstract");

  return (
    <div className="world-paper min-h-screen">
      <EditorialNav />
      <section className="page-pad relative min-h-[calc(100svh-5rem)]">
        <div className="page-max grid min-h-[calc(100svh-5rem)] items-end gap-10 pb-16 pt-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative z-10">
            <p className="eyebrow text-[var(--mute)]">Independent technology</p>
            <h1 className="display display-xl mt-6 text-[var(--ink)]">
              Building
              <br />
              systems for
              <br />
              questions
              <br />
              without easy
              <br />
              answers.
            </h1>
            <p className="editorial measure mt-10 text-xl text-[var(--mute)]">
              Research, infrastructure, agents, hardware — one body of experimentation.
            </p>
            <p className="mono mt-12 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--mute-soft)]">
              Explore ↓
            </p>
          </div>

          <div className="relative h-[42vh] min-h-[280px] lg:h-full lg:min-h-[520px]">
            <TheField mode={mode} className="absolute inset-0" />
          </div>
        </div>
      </section>

      <section className="page-pad border-t border-black/10 py-10">
        <div className="page-max">
          <p className="eyebrow text-[var(--mute)]">Field mode</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {modes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`font-[family-name:var(--font-display)] text-sm font-semibold ${
                  mode === m ? "text-[var(--ink)] underline" : "text-[var(--mute)]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

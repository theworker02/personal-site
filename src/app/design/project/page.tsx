"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { ParallaxDemo } from "@/components/projects/ProjectDemos";

export default function DesignProjectPage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const clip = useTransform(scrollYProgress, [0.1, 0.45], ["inset(0 40% 0 0)", "inset(0 0% 0 0)"]);
  const scale = useTransform(scrollYProgress, [0.2, 0.6], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0.15, 0.45], [0.35, 1]);

  return (
    <div>
      <section className="world-ink page-pad min-h-[70vh] py-24">
        <div className="page-max">
          <p className="eyebrow opacity-50">01 / Systems</p>
          <motion.h1
            className="display display-xl mt-6"
            style={reduced ? undefined : { clipPath: clip }}
          >
            PARALLAX
          </motion.h1>
          <p className="editorial mt-10 max-w-xl text-2xl opacity-70">
            A polyglot execution runtime designed to move computation across language boundaries.
          </p>
        </div>
      </section>

      <section ref={stageRef} className="world-ink page-pad pb-32">
        <div className="page-max">
          <motion.div
            className="origin-top border border-white/15 p-4 md:p-8"
            style={reduced ? undefined : { scale, opacity }}
          >
            <ParallaxDemo />
          </motion.div>
          <div className="mt-12 grid gap-8 border-t border-white/15 pt-10 md:grid-cols-[1fr_auto]">
            <p className="editorial max-w-xl text-lg opacity-70">
              Languages enter a shared IR. Execution and migration happen below the language
              surface — demonstrated here as a living schematic, not a screenshot.
            </p>
            <div className="mono text-[0.7rem] uppercase tracking-[0.12em] opacity-50">
              Rust
              <br />
              Runtime
              <br />
              Systems
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

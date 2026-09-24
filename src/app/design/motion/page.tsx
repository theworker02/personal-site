"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { TheField } from "@/components/visual/TheField";

export default function DesignMotionPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const fieldOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0.25, 1]);
  const copyOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const resultOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);

  return (
    <div ref={ref} className="world-ink relative h-[280vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="page-pad page-max grid w-full gap-10 lg:grid-cols-2">
          <motion.h1 style={{ y: titleY }} className="display display-xl">
            Scroll
            <br />
            choreography
          </motion.h1>
          <div className="relative h-[40vh] lg:h-[60vh]">
            <motion.div style={{ opacity: fieldOpacity }} className="absolute inset-0">
              <TheField mode="systems" inverse intensity={1.1} />
            </motion.div>
          </div>
        </div>
        <motion.div
          style={{ opacity: copyOpacity }}
          className="pointer-events-none absolute bottom-24 left-[var(--space-page)] max-w-md"
        >
          <p className="editorial text-xl opacity-80">
            Headline holds. The field assembles. Explanation arrives. The system executes.
          </p>
        </motion.div>
        <motion.div
          style={{ opacity: resultOpacity }}
          className="pointer-events-none absolute bottom-24 right-[var(--space-page)]"
        >
          <p className="display text-3xl font-bold">Result appears.</p>
        </motion.div>
      </div>
    </div>
  );
}

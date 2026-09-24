"use client";

import { motion, useReducedMotion } from "motion/react";
import { lineRevealVariants, staggerContainer } from "@/lib/motion/transitions";

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
};

/** Clip-path style line reveals — no per-letter chaos. */
export function TextReveal({ lines, className = "", lineClassName = "" }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className}>
        {lines.map((line) => (
          <div key={line} className={lineClassName}>
            {line}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerContainer}
    >
      {lines.map((line) => (
        <div key={line} className="overflow-hidden">
          <motion.div className={lineClassName} variants={lineRevealVariants}>
            {line}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { transitions } from "@/lib/motion/transitions";

type Props = {
  children: ReactNode;
  className?: string;
  label?: string;
};

/** Soft breath between worlds — mask + fade, not a card wipe. */
export function SectionTransition({ children, className = "", label }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.2 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={transitions.editorial}
    >
      {label ? (
        <div className="page-pad page-max pt-10">
          <p className="eyebrow opacity-45">{label}</p>
        </div>
      ) : null}
      {children}
    </motion.div>
  );
}

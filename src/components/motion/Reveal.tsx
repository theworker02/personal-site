"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { revealVariants, staggerContainer } from "@/lib/motion/transitions";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
};

export function Reveal({ children, className = "", delay = 0, as = "div" }: Props) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
      variants={{
        ...revealVariants,
        show: {
          ...revealVariants.show,
          transition: {
            ...revealVariants.show.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </Comp>
  );
}

export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

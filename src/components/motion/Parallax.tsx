"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motionTokens } from "@/lib/motion/tokens";
import { isCoarsePointer, isNarrowViewport } from "@/lib/motion/scroll";

type Props = {
  children: ReactNode;
  className?: string;
  /** 0–1 strength; keep subtle. */
  strength?: number;
};

export function Parallax({ children, className = "", strength = motionTokens.parallaxSubtle }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(!isNarrowViewport() && !isCoarsePointer());
    update();
    const mq = window.matchMedia("(max-width: 1023px)");
    const coarse = window.matchMedia("(pointer: coarse)");
    mq.addEventListener("change", update);
    coarse.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [strength * 80, strength * -80]);

  if (reduced || !enabled) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}

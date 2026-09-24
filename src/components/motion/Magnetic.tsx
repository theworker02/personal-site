"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { springs } from "@/lib/motion/tokens";
import { isCoarsePointer } from "@/lib/motion/scroll";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/** Subtle pointer magnetism for CTAs — disabled on coarse pointers / reduced motion. */
export function Magnetic({ children, className = "", strength = 10 }: Props) {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springs.responsive);
  const sy = useSpring(y, springs.responsive);

  useEffect(() => {
    const update = () => setFine(!isCoarsePointer());
    update();
    const mq = window.matchMedia("(pointer: coarse)");
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduced || !fine) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set((dx / rect.width) * strength);
        y.set((dy / rect.height) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

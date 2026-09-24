"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const ProgressCtx = createContext<MotionValue<number> | null>(null);

type Props = {
  children: ReactNode;
  heightVh?: number;
  className?: string;
  stickyClassName?: string;
};

export function StickyScene({
  children,
  heightVh = 220,
  className = "",
  stickyClassName = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ height: `${heightVh}vh` }}>
      <div className={`sticky top-0 flex h-screen items-center ${stickyClassName}`}>
        <ProgressCtx.Provider value={scrollYProgress}>{children}</ProgressCtx.Provider>
      </div>
    </div>
  );
}

export function useStickyProgress() {
  const ctx = useContext(ProgressCtx);
  if (!ctx) throw new Error("useStickyProgress must be used inside StickyScene");
  return ctx;
}

export function useStickyStage(stages: number) {
  const progress = useStickyProgress();
  return useTransform(progress, (v) => Math.min(stages - 1, Math.floor(v * stages)));
}

/** Opacity for a stage band within sticky progress. */
export function useStageOpacity(stageIndex: number, stages: number) {
  const progress = useStickyProgress();
  const start = stageIndex / stages;
  const mid = (stageIndex + 0.5) / stages;
  const end = (stageIndex + 1) / stages;
  return useTransform(progress, [start, mid, end], [0.25, 1, 0.35]);
}

export function StickyProgressBar({ className = "" }: { className?: string }) {
  const progress = useStickyProgress();
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className={`h-px w-full bg-current/15 ${className}`}>
      <motion.div className="h-px bg-current" style={{ width }} />
    </div>
  );
}

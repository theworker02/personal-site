"use client";

import { useEffect, useState } from "react";
import { homepageChapters, type ChapterId } from "@/lib/motion/scroll";

type Props = {
  className?: string;
};

/**
 * Thin chapter indicator. Uses IntersectionObserver — not scrollY React state.
 */
export function ScrollProgress({ className = "" }: Props) {
  const [active, setActive] = useState<ChapterId>("intro");

  useEffect(() => {
    const nodes = homepageChapters
      .map((c) => document.getElementById(c.id))
      .filter(Boolean) as HTMLElement[];

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        setActive(visible.target.id as ChapterId);
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-15% 0px -35% 0px" },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const chapter = homepageChapters.find((c) => c.id === active) ?? homepageChapters[0];
  const idx = homepageChapters.findIndex((c) => c.id === active);

  return (
    <div
      className={`pointer-events-none fixed bottom-5 right-5 z-40 hidden md:block ${className}`}
      aria-hidden
    >
      <div className="pointer-events-auto border border-black/15 bg-[var(--paper)] px-3 py-2 text-[var(--ink)] shadow-sm">
        <div className="mono text-[0.62rem] uppercase tracking-[0.14em] opacity-55">
          {chapter.index} / {String(homepageChapters.length - 1).padStart(2, "0")} · {chapter.label}
        </div>
        <div className="mt-2 flex gap-1">
          {homepageChapters.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`h-1 w-4 ${i <= idx ? "bg-current" : "bg-current/20"}`}
              aria-label={`Go to ${c.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

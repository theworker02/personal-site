export const homepageChapters = [
  { id: "intro", label: "Intro", index: "00" },
  { id: "currently", label: "Now", index: "01" },
  { id: "systems", label: "Systems", index: "02" },
  { id: "research", label: "Research", index: "03" },
  { id: "graph", label: "Graph", index: "04" },
  { id: "archive", label: "Archive", index: "05" },
  { id: "collaborate", label: "Work", index: "06" },
] as const;

export type ChapterId = (typeof homepageChapters)[number]["id"];

/** Prefer Motion useScroll / IntersectionObserver — never React scrollY state. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/** Narrow layout / phone-first breakpoints (matches Tailwind `lg`). */
export function isNarrowViewport(maxWidth = 1023) {
  if (typeof window === "undefined") return true;
  return window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
}

/**
 * Sticky scroll storytelling + parallax are desktop/fine-pointer only.
 * Mobile gets static stacked layouts to avoid tall scroll traps and jank.
 */
export function shouldEnableStickyScenes() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(min-width: 1024px)").matches &&
    !prefersReducedMotion()
  );
}

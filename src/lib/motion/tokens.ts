export const easings = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  soft: [0.16, 1, 0.3, 1] as const,
  cinematic: [0.19, 1, 0.22, 1] as const,
};

export const springs = {
  snappy: { type: "spring" as const, stiffness: 420, damping: 36, mass: 0.75 },
  responsive: { type: "spring" as const, stiffness: 260, damping: 28, mass: 0.85 },
  soft: { type: "spring" as const, stiffness: 140, damping: 24, mass: 1 },
  heavy: { type: "spring" as const, stiffness: 90, damping: 22, mass: 1.15 },
};

export const durations = {
  fast: 0.2,
  normal: 0.45,
  editorial: 0.75,
  cinematic: 1.1,
};

export const motionTokens = {
  easings,
  springs,
  durations,
  revealDistance: 28,
  parallaxSubtle: 0.08,
  parallaxMedium: 0.15,
} as const;

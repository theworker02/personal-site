import { durations, easings, springs } from "./tokens";

export const transitions = {
  fastInteraction: {
    duration: durations.fast,
    ease: easings.out,
  },
  normal: {
    duration: durations.normal,
    ease: easings.out,
  },
  editorial: {
    duration: durations.editorial,
    ease: easings.cinematic,
  },
  softSpring: springs.soft,
  responsiveSpring: springs.responsive,
  cinematic: {
    duration: durations.cinematic,
    ease: easings.cinematic,
  },
} as const;

export const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitions.editorial,
  },
};

export const lineRevealVariants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: transitions.editorial,
  },
};

export const fadeVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: transitions.normal,
  },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

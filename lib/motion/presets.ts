import type { Transition } from "motion/react";

export const MOTION_SPRINGS = {
  snappy: { type: "spring", stiffness: 420, damping: 28, mass: 0.7 } satisfies Transition,
  smooth: { type: "spring", stiffness: 320, damping: 28 } satisfies Transition,
  elastic: { type: "spring", stiffness: 380, damping: 16, mass: 0.65 } satisfies Transition,
  gentle: { type: "spring", stiffness: 220, damping: 26 } satisfies Transition,
};

export const MOTION_DURATIONS = {
  micro: 0.14,
  panel: 0.22,
  section: 0.34,
} as const;

export function getReducedMotionTransition(
  prefersReduced: boolean | null,
  transition: Transition = MOTION_SPRINGS.smooth
): Transition {
  return prefersReduced ? { duration: 0 } : transition;
}

export function createStaggerContainer(staggerSeconds = 0.05) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerSeconds },
    },
  };
}

export const STAGGER_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: MOTION_SPRINGS.smooth },
};

"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface MotionRevealProps {
  children: React.ReactNode;
  variant?: "fadeUp" | "blurIn" | "scaleIn" | "slideLeft";
  delay?: number;
  duration?: number;
  className?: string;
}

export function MotionReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.34,
  className,
}: MotionRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const initialMap = {
    fadeUp: { opacity: 0, y: 14 },
    blurIn: { opacity: 0, filter: "blur(6px)" },
    scaleIn: { opacity: 0, scale: 0.94 },
    slideLeft: { opacity: 0, x: 18 },
  }[variant];

  const animateMap = {
    fadeUp: { opacity: 1, y: 0 },
    blurIn: { opacity: 1, filter: "blur(0px)" },
    scaleIn: { opacity: 1, scale: 1 },
    slideLeft: { opacity: 1, x: 0 },
  }[variant];

  return (
    <motion.div
      initial={initialMap}
      whileInView={animateMap}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

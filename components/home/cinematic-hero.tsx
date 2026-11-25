"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, ArrowDown, Workflow, Sparkles } from "lucide-react";
import { ThinkingLoader } from "@/registry/components/thinking-loader";
import { PhysicalKnob } from "@/registry/components/physical-knob";
import { ProgressRing } from "@/registry/components/progress-ring";
import { RippleButton } from "@/registry/components/ripple-button";
import { MotionMintTheme } from "@/components/theme/theme-scope";
import { SculpturalSilk } from "@/components/home/sculptural-silk";

export function CinematicHero() {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const [knobVal, setKnobVal] = useState(68);
  const [ringVal, setRingVal] = useState(76);
  const [scrollVal, setScrollVal] = useState(0);
  const [pointerCoords, setPointerCoords] = useState({ x: 0, y: 0 });

  // Scroll-driven 4-stage progression (Outer layer)
  const { scrollYProgress } = useScroll({
    target: scrollWrapperRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollVal(latest);
  });

  // Stage 1 -> 2 -> 3 -> 4 scroll transforms
  const silkScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 0.94]);
  const silkOpacity = useTransform(scrollYProgress, [0, 0.55, 0.95], [1, 0.9, 0.35]);
  const markScale = useTransform(scrollYProgress, [0, 0.45, 0.9], [1, 1.12, 0.88]);
  const markOpacity = useTransform(scrollYProgress, [0, 0.6, 0.95], [0.1, 0.14, 0.04]);

  const headlineY = useTransform(scrollYProgress, [0, 0.5, 0.95], [0, -18, -36]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.72, 0.98], [1, 1, 0.25]);

  // Orbiting components emerge and step forward in Stages 2 & 3
  const leftOrbitX = useTransform(scrollYProgress, [0, 0.45, 0.9], [0, 14, 24]);
  const rightOrbitX = useTransform(scrollYProgress, [0, 0.45, 0.9], [0, -14, -24]);
  const orbitScale = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.96, 1.04, 1]);

  // Pointer-driven local parallax (Inner nested layer — never conflicts with Scroll!)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.6 });

  const markPX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const markPY = useTransform(springY, [-0.5, 0.5], [-10, 10]);
  const nearPX = useTransform(springX, [-0.5, 0.5], [16, -16]);
  const nearPY = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const farPX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const farPY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    if (prefersReduced) {
      pointerX.set(0);
      pointerY.set(0);
      setPointerCoords({ x: 0, y: 0 });
    }
  }, [prefersReduced, pointerX, pointerY]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReduced || e.pointerType === "touch" || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(nx);
    pointerY.set(ny);
    setPointerCoords({ x: nx, y: ny });
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    setPointerCoords({ x: 0, y: 0 });
  };

  return (
    <div
      ref={scrollWrapperRef}
      data-hero-scroll-stage={
        scrollVal < 0.25 ? "reveal" : scrollVal < 0.55 ? "formation" : scrollVal < 0.85 ? "exhibition" : "transition"
      }
      className={prefersReduced ? "relative" : "relative lg:h-[145vh]"}
    >
      <section
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={
          prefersReduced
            ? "relative isolate flex min-h-[82svh] flex-col items-center justify-center overflow-hidden border-b border-[var(--ws-border)] bg-[var(--ws-bg)] px-4 py-16 sm:px-6"
            : "relative isolate flex min-h-[84svh] lg:sticky lg:top-0 lg:h-svh flex-col items-center justify-center overflow-hidden border-b border-[var(--ws-border)] bg-[var(--ws-bg)] px-4 py-16 sm:px-6"
        }
      >
        {/* Architectural calibrated dot-matrix */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 opacity-55"
          style={{
            backgroundImage: "radial-gradient(var(--ws-border-strong) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 100%)",
          }}
        />

        {/* Layer 1A: Sculptural Flowing Silk Ribbons (Scroll-controlled outer wrapper) */}
        <motion.div
          aria-hidden="true"
          style={prefersReduced ? undefined : { scale: silkScale, opacity: silkOpacity }}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <SculpturalSilk
            scrollProgress={prefersReduced ? 0 : scrollVal}
            pointerX={prefersReduced ? 0 : pointerCoords.x}
            pointerY={prefersReduced ? 0 : pointerCoords.y}
          />
        </motion.div>

        {/* Layer 1B: Central Sculptural MotionMint Mark (Scroll outer + Pointer inner) */}
        <motion.div
          aria-hidden="true"
          style={prefersReduced ? { opacity: 0.08 } : { scale: markScale, opacity: markOpacity }}
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={prefersReduced ? undefined : { x: markPX, y: markPY }}
          >
            <svg
              viewBox="0 0 440 440"
              className="h-[320px] w-[320px] sm:h-[430px] sm:w-[430px] text-[var(--ws-text-primary)]"
              fill="none"
            >
              <circle cx="220" cy="220" r="200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="220" cy="220" r="148" stroke="currentColor" strokeWidth="1" />
              <circle cx="220" cy="220" r="92" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
              <path
                d="M220 40v360M64 130l312 180M376 130L64 310"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <polygon
                points="220,148 282,184 282,256 220,292 158,256 158,184"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[1320px]">
          {/* Layer 2: Desktop Orbiting Living Component Specimens (Scroll outer + Pointer inner) */}
          <div className="hidden lg:block">
            {/* Top Left: Thinking Loader */}
            <motion.div
              style={prefersReduced ? undefined : { x: leftOrbitX, scale: orbitScale }}
              className="absolute left-0 top-2 w-[256px]"
            >
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={prefersReduced ? undefined : { x: farPX, y: farPY }}
                className="rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-floating)]/95 p-3.5 shadow-[var(--ws-shadow-floating)] backdrop-blur-md"
              >
                <div className="mb-2 flex items-center justify-between text-[10px] font-mono text-[var(--ws-text-muted)]">
                  <span>AI · STATUS</span>
                  <Link href="/components/thinking-loader" className="hover:text-[var(--ws-text-primary)]">
                    Inspect →
                  </Link>
                </div>
                <MotionMintTheme theme="minimalism" mode="light" className="rounded-xl p-2">
                  <ThinkingLoader
                    stages={["Auditing tokens", "Composing spring", "Ready"]}
                    intervalMs={1800}
                  />
                </MotionMintTheme>
              </motion.div>
            </motion.div>

            {/* Top Right: Physical Knob */}
            <motion.div
              style={prefersReduced ? undefined : { x: rightOrbitX, scale: orbitScale }}
              className="absolute right-0 top-0 w-[232px]"
            >
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={prefersReduced ? undefined : { x: nearPX, y: farPY }}
                className="rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-floating)]/95 p-3.5 shadow-[var(--ws-shadow-floating)] backdrop-blur-md"
              >
                <div className="mb-2 flex items-center justify-between text-[10px] font-mono text-[var(--ws-text-muted)]">
                  <span>CONTROLS · DIAL</span>
                  <Link href="/components/physical-knob" className="hover:text-[var(--ws-text-primary)]">
                    Inspect →
                  </Link>
                </div>
                <MotionMintTheme theme="minimalism" mode="light" className="flex justify-center py-1">
                  <PhysicalKnob value={knobVal} onValueChange={setKnobVal} label="Damping" />
                </MotionMintTheme>
              </motion.div>
            </motion.div>

            {/* Bottom Left: Flow Node Connection */}
            <motion.div
              style={prefersReduced ? undefined : { x: leftOrbitX, scale: orbitScale }}
              className="absolute left-6 bottom-0 w-[264px]"
            >
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                style={prefersReduced ? undefined : { x: nearPX, y: nearPY }}
              >
                <Link
                  href="/flow"
                  className="block rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-floating)]/95 p-3.5 shadow-[var(--ws-shadow-floating)] backdrop-blur-md transition-transform hover:-translate-y-0.5"
                >
                  <div className="mb-2 flex items-center justify-between text-[10px] font-mono text-[var(--ws-text-muted)]">
                    <span className="flex items-center gap-1">
                      <Workflow className="h-3 w-3" aria-hidden="true" />
                      FLOW · DAG
                    </span>
                    <span>/flow →</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="rounded-lg border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2 py-1 font-medium text-[var(--ws-text-primary)]">
                      Input
                    </span>
                    <span className="h-px flex-1 bg-[var(--ws-border-strong)]" />
                    <span className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-2 py-1 font-medium text-indigo-600 dark:text-indigo-400">
                      LLM
                    </span>
                    <span className="h-px flex-1 bg-[var(--ws-border-strong)]" />
                    <span className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 font-medium text-emerald-600 dark:text-emerald-400">
                      Output
                    </span>
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Bottom Right: Progress Ring + Neo-Brutalism Ripple */}
            <motion.div
              style={prefersReduced ? undefined : { x: rightOrbitX, scale: orbitScale }}
              className="absolute right-6 bottom-0 w-[256px]"
            >
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                style={prefersReduced ? undefined : { x: farPX, y: nearPY }}
                className="rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-floating)]/95 p-3.5 shadow-[var(--ws-shadow-floating)] backdrop-blur-md"
              >
                <div className="mb-2 flex items-center justify-between text-[10px] font-mono text-[var(--ws-text-muted)]">
                  <span>58 VARIANTS</span>
                  <Link href="/themes" className="hover:text-[var(--ws-text-primary)]">
                    Themes →
                  </Link>
                </div>
                <MotionMintTheme
                  theme="neo-brutalism"
                  mode="light"
                  className="flex items-center justify-between gap-3 rounded-xl p-2"
                >
                  <ProgressRing value={ringVal} size={52} strokeWidth={5} />
                  <RippleButton
                    size="sm"
                    onClick={() => setRingVal((v) => (v >= 100 ? 25 : v + 25))}
                  >
                    Pulse +25%
                  </RippleButton>
                </MotionMintTheme>
              </motion.div>
            </motion.div>
          </div>

          {/* Center Editorial Headline & CTAs (Scroll-driven y/opacity) */}
          <motion.div
            style={prefersReduced ? undefined : { y: headlineY, opacity: headlineOpacity }}
            className="relative z-10 mx-auto max-w-2xl py-6 text-center space-y-6"
          >
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3.5 py-1 text-xs font-medium text-[var(--ws-text-secondary)] shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--ws-text-primary)]" aria-hidden="true" />
              <span>44 Components · 58 Theme Variants · MotionMint Flow</span>
            </motion.div>

            <motion.h1
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-semibold tracking-[-0.04em] text-[var(--ws-text-primary)] sm:text-6xl lg:text-[72px] lg:leading-[1.03]"
            >
              Interfaces should feel alive.
            </motion.h1>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-xl text-base leading-relaxed text-[var(--ws-text-secondary)] sm:text-lg"
            >
              Beautiful React components. Extraordinary interactions. Designed to be used,
              not just admired.
            </motion.p>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              <Link
                href="/components"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--ws-text-primary)] px-6 text-sm font-medium text-[var(--ws-bg)] shadow-sm transition-opacity hover:opacity-90"
              >
                Explore Components
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/themes"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--ws-border-strong)] bg-[var(--ws-floating)] px-6 text-sm font-medium text-[var(--ws-text-primary)] transition-colors hover:bg-[var(--ws-surface-hover)]"
              >
                Explore Themes
              </Link>
            </motion.div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="pt-1"
            >
              <Link
                href="/flow"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] transition-colors"
              >
                <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Discover MotionMint Flow →</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile / Tablet Compact Live Specimen Strip */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
            <div className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)] p-3.5 flex items-center justify-between gap-3">
              <MotionMintTheme theme="minimalism" mode="light" className="w-full">
                <ThinkingLoader
                  stages={["Auditing tokens", "Composing spring", "Ready"]}
                  intervalMs={2000}
                />
              </MotionMintTheme>
            </div>
            <div className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)] p-3.5 flex items-center justify-between gap-3">
              <MotionMintTheme
                theme="neo-brutalism"
                mode="light"
                className="flex w-full items-center justify-between gap-3 rounded-xl p-2"
              >
                <ProgressRing value={ringVal} size={46} strokeWidth={5} />
                <RippleButton
                  size="sm"
                  onClick={() => setRingVal((v) => (v >= 100 ? 25 : v + 25))}
                >
                  Pulse +25%
                </RippleButton>
              </MotionMintTheme>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#exhibition"
          aria-label="Scroll to product exhibition"
          className="mt-8 inline-flex items-center gap-1.5 text-xs text-[var(--ws-text-muted)] hover:text-[var(--ws-text-primary)] transition-colors"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="h-3.5 w-3.5 motion-safe:animate-bounce" aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}

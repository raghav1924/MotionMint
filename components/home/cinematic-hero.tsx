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
import { ArrowRight, ArrowDown, Workflow } from "lucide-react";
import { ThinkingLoader } from "@/registry/components/thinking-loader";
import { PhysicalKnob } from "@/registry/components/physical-knob";
import { ProgressRing } from "@/registry/components/progress-ring";
import { RippleButton } from "@/registry/components/ripple-button";
import { MotionMintTheme } from "@/components/theme/theme-scope";
import { SculpturalSilk } from "@/components/home/sculptural-silk";
import { useMotionMint } from "@/components/site/providers";

export function CinematicHero() {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { resolvedAppearance } = useMotionMint();
  const specimenMode = resolvedAppearance === "dark" ? "dark" : "light";

  const [knobVal, setKnobVal] = useState(68);
  const [ringVal, setRingVal] = useState(76);
  const [scrollVal, setScrollVal] = useState(0);
  const [pointerCoords, setPointerCoords] = useState({ x: 0, y: 0 });

  // Scroll-driven 4-stage progression (Outer layer)
  const { scrollYProgress } = useScroll({
    target: scrollWrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollVal(latest);
  });

  // Stage 1 -> 2 -> 3 -> 4 scroll transforms
  const silkScale = useTransform(scrollYProgress, [0, 0.45, 0.9], [1, 1.06, 0.96]);
  const silkOpacity = useTransform(scrollYProgress, [0, 0.6, 0.95], [1, 0.92, 0.4]);

  const headlineY = useTransform(scrollYProgress, [0, 0.5, 0.95], [0, -18, -40]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.72, 0.98], [1, 1, 0.28]);

  // Specimens emerge along the silk curve in Stage 2 & become primary focus in Stage 3
  const leftOrbitX = useTransform(scrollYProgress, [0, 0.45, 0.9], [0, 16, 26]);
  const rightOrbitX = useTransform(scrollYProgress, [0, 0.45, 0.9], [0, -16, -26]);
  const orbitScale = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.95, 1.05, 1]);

  // Pointer-driven local parallax (Inner nested layer — never conflicts with Scroll!)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.6 });

  const nearPX = useTransform(springX, [-0.5, 0.5], [18, -18]);
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
        scrollVal < 0.25
          ? "reveal"
          : scrollVal < 0.55
            ? "formation"
            : scrollVal < 0.85
              ? "exhibition"
              : "transition"
      }
      className={prefersReduced ? "relative" : "relative lg:h-[165vh]"}
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
        {/* Layer A: Dominant 3D-Shaded Sculptural Silk Ribbon (Scroll outer + Pointer-reactive Canvas) */}
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

        {/* Soft readability scrim behind center typography */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 46% 42% at 50% 48%, var(--ws-bg) 35%, transparent 100%)",
            opacity: 0.72,
          }}
        />

        <div className="relative mx-auto w-full max-w-[1320px]">
          {/* Layer B: Living UI Specimens Integrated Along the Sculptural Flow (Desktop) */}
          <div className="hidden lg:block">
            {/* Upper Left along ribbon crest: Thinking Loader */}
            <motion.div
              style={prefersReduced ? undefined : { x: leftOrbitX, scale: orbitScale }}
              className="absolute left-4 -top-6 w-[248px]"
            >
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={prefersReduced ? undefined : { x: farPX, y: farPY }}
                className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)]/88 p-3 shadow-[var(--ws-shadow-floating)] backdrop-blur-md"
              >
                <div className="mb-1.5 flex items-center justify-between text-[10px] font-mono text-[var(--ws-text-muted)]">
                  <span>AI · THINKING LOADER</span>
                  <Link href="/components/thinking-loader" className="hover:text-[var(--ws-text-primary)]">
                    Inspect →
                  </Link>
                </div>
                <MotionMintTheme theme="minimalism" mode={specimenMode} className="rounded-xl p-1.5">
                  <ThinkingLoader
                    stages={["Sculpting silk", "Composing spring", "Ready"]}
                    intervalMs={1800}
                  />
                </MotionMintTheme>
              </motion.div>
            </motion.div>

            {/* Upper Right along ribbon curve: Physical Knob */}
            <motion.div
              style={prefersReduced ? undefined : { x: rightOrbitX, scale: orbitScale }}
              className="absolute right-6 -top-8 w-[210px]"
            >
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={prefersReduced ? undefined : { x: nearPX, y: farPY }}
                className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)]/88 p-3 shadow-[var(--ws-shadow-floating)] backdrop-blur-md"
              >
                <div className="mb-1 flex items-center justify-between text-[10px] font-mono text-[var(--ws-text-muted)]">
                  <span>ROTARY DIAL</span>
                  <Link href="/components/physical-knob" className="hover:text-[var(--ws-text-primary)]">
                    Inspect →
                  </Link>
                </div>
                <MotionMintTheme theme="minimalism" mode={specimenMode} className="flex justify-center py-0.5">
                  <PhysicalKnob value={knobVal} onValueChange={setKnobVal} label="Tension" />
                </MotionMintTheme>
              </motion.div>
            </motion.div>

            {/* Lower Left along ribbon fold: Connected Flow Node */}
            <motion.div
              style={prefersReduced ? undefined : { x: leftOrbitX, scale: orbitScale }}
              className="absolute left-10 -bottom-6 w-[256px]"
            >
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                style={prefersReduced ? undefined : { x: nearPX, y: nearPY }}
              >
                <Link
                  href="/flow"
                  className="block rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)]/88 p-3 shadow-[var(--ws-shadow-floating)] backdrop-blur-md transition-transform hover:-translate-y-0.5"
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

            {/* Lower Right along ribbon tail: Progress Ring + Neo-Brutalism Ripple */}
            <motion.div
              style={prefersReduced ? undefined : { x: rightOrbitX, scale: orbitScale }}
              className="absolute right-10 -bottom-6 w-[248px]"
            >
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                style={prefersReduced ? undefined : { x: farPX, y: nearPY }}
                className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)]/88 p-3 shadow-[var(--ws-shadow-floating)] backdrop-blur-md"
              >
                <div className="mb-1.5 flex items-center justify-between text-[10px] font-mono text-[var(--ws-text-muted)]">
                  <span>58 THEME VARIANTS</span>
                  <Link href="/themes" className="hover:text-[var(--ws-text-primary)]">
                    Themes →
                  </Link>
                </div>
                <MotionMintTheme
                  theme="neo-brutalism"
                  mode="light"
                  className="flex items-center justify-between gap-3 rounded-xl p-2"
                >
                  <ProgressRing value={ringVal} size={48} strokeWidth={5} />
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

          {/* Center Editorial Headline & CTAs */}
          <motion.div
            style={prefersReduced ? undefined : { y: headlineY, opacity: headlineOpacity }}
            className="relative z-10 mx-auto max-w-2xl py-8 text-center space-y-6"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ws-text-secondary)]">
              MotionMint · 44 Components · 58 Theme Variants · Flow
            </p>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--ws-text-primary)] sm:text-6xl lg:text-[72px] lg:leading-[1.03]">
              Interfaces should feel alive.
            </h1>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-[var(--ws-text-secondary)] sm:text-lg">
              Beautiful React components. Extraordinary interactions. Designed to be used,
              not just admired.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/components"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--ws-text-primary)] px-6 text-sm font-medium text-[var(--ws-bg)] shadow-sm transition-opacity hover:opacity-90"
              >
                Explore Components
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/themes"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--ws-border-strong)] bg-[var(--ws-floating)]/90 px-6 text-sm font-medium text-[var(--ws-text-primary)] backdrop-blur-sm transition-colors hover:bg-[var(--ws-surface-hover)]"
              >
                Explore Themes
              </Link>
            </div>

            <div className="pt-1">
              <Link
                href="/flow"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] transition-colors"
              >
                <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Discover MotionMint Flow →</span>
              </Link>
            </div>
          </motion.div>

          {/* Mobile / Tablet Compact Live Specimen Strip */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
            <div className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)]/90 p-3.5 flex items-center justify-between gap-3 backdrop-blur-md">
              <MotionMintTheme theme="minimalism" mode={specimenMode} className="w-full">
                <ThinkingLoader
                  stages={["Sculpting silk", "Composing spring", "Ready"]}
                  intervalMs={2000}
                />
              </MotionMintTheme>
            </div>
            <div className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)]/90 p-3.5 flex items-center justify-between gap-3 backdrop-blur-md">
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

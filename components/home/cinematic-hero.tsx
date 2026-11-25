"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowRight, ArrowDown, Workflow, Sparkles } from "lucide-react";
import { ThinkingLoader } from "@/registry/components/thinking-loader";
import { PhysicalKnob } from "@/registry/components/physical-knob";
import { ProgressRing } from "@/registry/components/progress-ring";
import { RippleButton } from "@/registry/components/ripple-button";
import { MotionMintTheme } from "@/components/theme/theme-scope";
import { cn } from "@/lib/utils";

export function CinematicHero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [knobVal, setKnobVal] = useState(68);
  const [ringVal, setRingVal] = useState(76);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.6 });

  const markX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const markY = useTransform(springY, [-0.5, 0.5], [-10, 10]);
  const nearX = useTransform(springX, [-0.5, 0.5], [16, -16]);
  const nearY = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const farX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const farY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(nx);
    pointerY.set(ny);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex min-h-[86svh] flex-col items-center justify-center overflow-hidden border-b border-[var(--ws-border)] bg-[var(--ws-bg)] px-4 py-16 sm:px-6 lg:py-20"
    >
      {/* Architectural calibrated dot-matrix & radial spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(var(--ws-border-strong) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 100%)",
        }}
      />

      {/* Sculptural Central MotionMint Mark (behind headline with subtle depth) */}
      <motion.div
        aria-hidden="true"
        initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={prefersReduced ? undefined : { x: markX, y: markY }}
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 440 440"
          className="h-[340px] w-[340px] sm:h-[440px] sm:w-[440px] text-[var(--ws-text-primary)] opacity-[0.07]"
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

      <div className="relative mx-auto w-full max-w-[1320px]">
        {/* Desktop Spatial Orbiting Live Component Specimens */}
        <div className="hidden lg:block">
          {/* Top Left: Thinking Loader */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={prefersReduced ? undefined : { x: farX, y: farY }}
            className="absolute left-0 top-2 w-[256px]"
          >
            <div className="rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-floating)]/95 p-3.5 shadow-[var(--ws-shadow-floating)] backdrop-blur-md">
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
            </div>
          </motion.div>

          {/* Top Right: Physical Knob */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={prefersReduced ? undefined : { x: nearX, y: farY }}
            className="absolute right-0 top-0 w-[232px]"
          >
            <div className="rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-floating)]/95 p-3.5 shadow-[var(--ws-shadow-floating)] backdrop-blur-md">
              <div className="mb-2 flex items-center justify-between text-[10px] font-mono text-[var(--ws-text-muted)]">
                <span>CONTROLS · DIAL</span>
                <Link href="/components/physical-knob" className="hover:text-[var(--ws-text-primary)]">
                  Inspect →
                </Link>
              </div>
              <MotionMintTheme theme="minimalism" mode="light" className="flex justify-center py-1">
                <PhysicalKnob value={knobVal} onValueChange={setKnobVal} label="Damping" />
              </MotionMintTheme>
            </div>
          </motion.div>

          {/* Bottom Left: Connected Flow Node Specimen */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={prefersReduced ? undefined : { x: nearX, y: nearY }}
            className="absolute left-6 bottom-0 w-[264px]"
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

          {/* Bottom Right: Progress Ring + Tactile Ripple */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={prefersReduced ? undefined : { x: farX, y: nearY }}
            className="absolute right-6 bottom-0 w-[256px]"
          >
            <div className="rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-floating)]/95 p-3.5 shadow-[var(--ws-shadow-floating)] backdrop-blur-md">
              <div className="mb-2 flex items-center justify-between text-[10px] font-mono text-[var(--ws-text-muted)]">
                <span>58 VARIANTS</span>
                <Link href="/themes" className="hover:text-[var(--ws-text-primary)]">
                  Themes →
                </Link>
              </div>
              <MotionMintTheme theme="neo-brutalism" mode="light" className="flex items-center justify-between gap-3 rounded-xl p-2">
                <ProgressRing value={ringVal} size={52} strokeWidth={5} />
                <RippleButton
                  size="sm"
                  onClick={() => setRingVal((v) => (v >= 100 ? 25 : v + 25))}
                >
                  Pulse +25%
                </RippleButton>
              </MotionMintTheme>
            </div>
          </motion.div>
        </div>

        {/* Center Editorial Composition */}
        <div className="relative z-10 mx-auto max-w-2xl py-6 text-center space-y-6">
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
            copied into your codebase, and styled across 29 design languages.
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
            className="flex flex-col items-center gap-4 pt-1"
          >
            <Link
              href="/flow"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] transition-colors"
            >
              <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Discover MotionMint Flow →</span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile / Tablet Compact Live Specimen Strip (no heavy spatial workload) */}
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
            <MotionMintTheme theme="neo-brutalism" mode="light" className="flex w-full items-center justify-between gap-3 rounded-xl p-2">
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
        className={cn(
          "mt-10 inline-flex items-center gap-1.5 text-xs text-[var(--ws-text-muted)] hover:text-[var(--ws-text-primary)] transition-colors"
        )}
      >
        <span>Scroll to exhibition</span>
        <ArrowDown className="h-3.5 w-3.5 motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}

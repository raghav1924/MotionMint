"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { RotateCcw, Sun, Moon } from "lucide-react";
import { ALL_THEMES } from "@/lib/themes/registry";
import { MOTION_SPRINGS } from "@/lib/motion/presets";
import { useMotionMint } from "@/components/site/providers";
import { WorkspacePage, WorkspaceHeader } from "@/components/workspace/workspace-page";
import { MotionMintTheme } from "@/components/theme/theme-scope";
import {
  DesktopBrowserFrame,
  TabletPreviewFrame,
  MobileDeviceFrame,
} from "@/components/preview/device-frames";
import { RippleButton } from "@/registry/components/ripple-button";
import { JellyButton } from "@/registry/components/jelly-button";
import { WiggleText } from "@/registry/components/wiggle-text";
import { BounceDotsLoader } from "@/registry/components/bounce-dots-loader";
import { ThinkingLoader } from "@/registry/components/thinking-loader";
import { ProgressRing } from "@/registry/components/progress-ring";
import { FlipCard } from "@/registry/components/flip-card";
import { SwipeCardDeck, type DeckCardItem } from "@/registry/components/swipe-card-deck";
import { PhysicalKnob } from "@/registry/components/physical-knob";
import { MotionReveal } from "@/registry/components/motion-reveal";
import { ParticleWordmark } from "@/components/site/particle-wordmark";
import { CopyButton } from "@/registry/components/copy-button";
import { cn } from "@/lib/utils";

type MotionCategory =
  | "Hover"
  | "Drag"
  | "Press"
  | "Swipe"
  | "Scroll"
  | "Loading"
  | "Text"
  | "Transitions";

const CATEGORIES: MotionCategory[] = [
  "Hover",
  "Drag",
  "Press",
  "Swipe",
  "Scroll",
  "Loading",
  "Text",
  "Transitions",
];

const DECK_ITEMS: DeckCardItem[] = [
  {
    id: "m1",
    tag: "Spring",
    title: "Stiffness 320 / Damping 28",
    subtitle: "Balanced studio spring preset for panels and decks.",
  },
  {
    id: "m2",
    tag: "Gesture",
    title: "Drag & Keyboard",
    subtitle: "Supports pointer drag, ArrowLeft/Right, and Cmd+Z undo.",
  },
];

export default function MotionLabPage() {
  const { skin, setTheme, themeMode, setThemeMode, viewportMode, previewKey } =
    useMotionMint();
  const [category, setCategory] = useState<MotionCategory>("Hover");
  const [replayKey, setReplayKey] = useState(0);
  const [disableNonEssential, setDisableNonEssential] = useState(false);

  const springCode = `import { MOTION_SPRINGS } from "@/lib/motion/presets";
import { MotionReveal } from "@/components/motionmint/motion-reveal";

<MotionReveal variant="fadeUp">
  <YourComponent />
</MotionReveal>`;

  const stageBody = (
    <MotionMintTheme
      theme={skin}
      mode={themeMode}
      padded
      className="flex min-h-[320px] w-full flex-col items-center justify-center gap-6"
    >
      {disableNonEssential ? (
        <div className="max-w-md space-y-2 text-center">
          <p className="text-xs font-mono uppercase tracking-wider opacity-70">
            Reduced Motion Simulated
          </p>
          <p className="text-sm font-medium">
            Spring physics and continuous keyframes settle immediately while preserving
            state transitions, contrast, and keyboard usability.
          </p>
        </div>
      ) : (
        <div
          key={`${category}-${replayKey}-${previewKey}`}
          className="flex w-full max-w-2xl flex-wrap items-center justify-center gap-6"
        >
          {category === "Hover" && (
            <div className="flex flex-wrap items-center justify-center gap-6">
              <JellyButton>Magnetic Hover</JellyButton>
              <FlipCard
                front={
                  <div className="p-4 text-center space-y-1">
                    <p className="text-sm font-semibold">Hover & Flip</p>
                    <p className="text-xs opacity-75">Direction-aware 3D flip surface.</p>
                  </div>
                }
                back={
                  <div className="p-4 text-center space-y-1">
                    <p className="text-sm font-semibold">Spring Physics</p>
                    <p className="text-xs opacity-75">GPU-composited rotateX/Y transforms.</p>
                  </div>
                }
              />
            </div>
          )}
          {category === "Drag" && (
            <div className="flex flex-wrap items-center justify-center gap-8">
              <PhysicalKnob label="Stiffness" defaultValue={65} unit="%" />
              <SwipeCardDeck cards={DECK_ITEMS} />
            </div>
          )}
          {category === "Press" && (
            <div className="flex flex-wrap items-center justify-center gap-4">
              <RippleButton>Pointer Ripple</RippleButton>
              <JellyButton>Tactile Press</JellyButton>
              <CopyButton value="npx shadcn@latest add @motionmint/motion-reveal" />
            </div>
          )}
          {category === "Swipe" && <SwipeCardDeck cards={DECK_ITEMS} />}
          {category === "Scroll" && (
            <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
              <MotionReveal variant="fadeUp">
                <div className="rounded-xl border border-current/20 p-4 text-center">
                  <p className="text-sm font-semibold">MotionReveal · fadeUp</p>
                  <p className="text-xs opacity-75">Viewport-triggered entrance</p>
                </div>
              </MotionReveal>
              <MotionReveal variant="blurIn">
                <div className="rounded-xl border border-current/20 p-4 text-center">
                  <p className="text-sm font-semibold">MotionReveal · blurIn</p>
                  <p className="text-xs opacity-75">Smooth editorial reveal</p>
                </div>
              </MotionReveal>
            </div>
          )}
          {category === "Loading" && (
            <div className="flex flex-wrap items-center justify-center gap-8">
              <BounceDotsLoader rhythm="wave" />
              <ThinkingLoader stages={["Analysing", "Composing", "Ready"]} />
              <ProgressRing value={72} />
            </div>
          )}
          {category === "Text" && (
            <div className="space-y-5 text-center w-full">
              <WiggleText text="Hover or focus these letters" className="text-2xl font-bold" />
              <ParticleWordmark text="MotionMint" />
            </div>
          )}
          {category === "Transitions" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={MOTION_SPRINGS.elastic}
              className="rounded-2xl border border-current/20 p-6 text-center space-y-2"
            >
              <p className="text-sm font-semibold">MOTION_SPRINGS.elastic</p>
              <p className="text-xs opacity-75">
                Shared spring presets across Component Studio, drawers, and cards.
              </p>
            </motion.div>
          )}
        </div>
      )}
    </MotionMintTheme>
  );

  return (
    <WorkspacePage>
      <WorkspaceHeader
        eyebrow="MOTION LAB"
        title="Motion and interaction primitives"
        description="Explore expressive interactions, reusable animation patterns, and spring presets inside scoped component themes."
        actions={
          <>
            <label className="inline-flex h-8 items-center gap-2 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3 text-xs text-[var(--ws-text-secondary)] cursor-pointer">
              <input
                type="checkbox"
                checked={disableNonEssential}
                onChange={(e) => setDisableNonEssential(e.target.checked)}
                className="accent-[var(--ws-text-primary)]"
              />
              <span>Reduced Motion</span>
            </label>

            <select
              aria-label="Preview theme"
              value={skin}
              onChange={(e) => setTheme(e.target.value)}
              className="h-8 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3 text-xs text-[var(--ws-text-primary)] cursor-pointer"
            >
              {ALL_THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            <div
              role="group"
              aria-label="Component preview mode"
              className="inline-flex h-8 items-center rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] p-0.5 text-xs"
            >
              {(["light", "dark"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setThemeMode(m)}
                  aria-pressed={themeMode === m}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 capitalize cursor-pointer",
                    themeMode === m
                      ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                      : "text-[var(--ws-text-secondary)]"
                  )}
                >
                  {m === "light" ? (
                    <Sun className="h-3 w-3" aria-hidden="true" />
                  ) : (
                    <Moon className="h-3 w-3" aria-hidden="true" />
                  )}
                  {m}
                </button>
              ))}
            </div>
          </>
        }
      />

      {/* Category Navigation */}
      <div role="group" aria-label="Motion categories" className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            aria-pressed={category === cat}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium cursor-pointer transition-colors",
              category === cat
                ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                : "border-[var(--ws-border)] bg-[var(--ws-floating)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prominent Central Preview Stage */}
      <section className="rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-[var(--ws-text-secondary)]">{category}</span>
          <button
            type="button"
            onClick={() => setReplayKey((k) => k + 1)}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Replay
          </button>
        </div>

        {viewportMode === "mobile" ? (
          <MobileDeviceFrame slug="motion-reveal">{stageBody}</MobileDeviceFrame>
        ) : viewportMode === "tablet" ? (
          <TabletPreviewFrame slug="motion-reveal">{stageBody}</TabletPreviewFrame>
        ) : (
          <DesktopBrowserFrame slug="motion-reveal">{stageBody}</DesktopBrowserFrame>
        )}
      </section>

      {/* Spring Reference & Install Code */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[22px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-6 space-y-4">
          <h2 className="text-sm font-semibold text-[var(--ws-text-primary)]">
            Shared Spring Presets
          </h2>
          <dl className="grid grid-cols-2 gap-3 text-xs">
            {Object.entries(MOTION_SPRINGS).map(([name, cfg]) => (
              <div
                key={name}
                className="rounded-xl border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] p-3"
              >
                <dt className="font-mono font-semibold text-[var(--ws-text-primary)]">{name}</dt>
                <dd className="mt-1 font-mono text-[11px] text-[var(--ws-text-secondary)]">
                  {`stiffness: ${cfg.stiffness}, damping: ${cfg.damping}`}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-[22px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--ws-text-primary)]">
              Portable Usage (`@motionmint/motion-reveal`)
            </h2>
            <Link
              href="/docs/installation"
              className="text-xs font-medium text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
            >
              Install CLI →
            </Link>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] p-4 font-mono text-xs text-[var(--ws-text-primary)]">
            <code>{springCode}</code>
          </pre>
        </div>
      </section>
    </WorkspacePage>
  );
}

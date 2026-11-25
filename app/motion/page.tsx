"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { RotateCcw, Zap } from "lucide-react";
import { ALL_THEMES } from "@/lib/themes/registry";
import { themeToInlineStyle } from "@/lib/themes/theme-utils";
import { MOTION_SPRINGS } from "@/lib/motion/presets";
import { useMotionMint } from "@/components/site/providers";
import { RippleButton } from "@/registry/components/ripple-button";
import { JellyButton } from "@/registry/components/jelly-button";
import { WiggleText } from "@/registry/components/wiggle-text";
import { BounceDotsLoader } from "@/registry/components/bounce-dots-loader";
import { ThinkingLoader } from "@/registry/components/thinking-loader";
import { ProgressRing } from "@/registry/components/progress-ring";
import { FlipCard } from "@/registry/components/flip-card";
import { SwipeCardDeck, type DeckCardItem } from "@/registry/components/swipe-card-deck";
import { MotionReveal } from "@/registry/components/motion-reveal";
import { ParticleWordmark } from "@/components/site/particle-wordmark";
import { CopyButton } from "@/registry/components/copy-button";
import { cn } from "@/lib/utils";

type MotionCategory =
  | "Button Interactions"
  | "Text Animations"
  | "Card & Media"
  | "Loading"
  | "Background & Visual"
  | "Layout & Transitions";

const CATEGORIES: MotionCategory[] = [
  "Button Interactions",
  "Text Animations",
  "Card & Media",
  "Loading",
  "Background & Visual",
  "Layout & Transitions",
];

const DECK_ITEMS: DeckCardItem[] = [
  { id: "m1", tag: "Spring", title: "Stiffness 320 / Damping 28", subtitle: "Balanced studio spring preset for panels and decks." },
  { id: "m2", tag: "Gesture", title: "Drag & Keyboard", subtitle: "Supports pointer drag, ArrowLeft/Right, and Cmd+Z undo." },
];

export default function MotionLabPage() {
  const { skin, theme, setTheme } = useMotionMint();
  const [category, setCategory] = useState<MotionCategory>("Button Interactions");
  const [replayKey, setReplayKey] = useState(0);
  const [disableNonEssential, setDisableNonEssential] = useState(false);

  const springCode = `import { MOTION_SPRINGS } from "@/lib/motion/presets";
import { MotionReveal } from "@/components/motionmint/motion-reveal";

<MotionReveal variant="fadeUp">
  <YourComponent />
</MotionReveal>`;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--ws-accent)]">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Motion Lab</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--ws-text-primary)] sm:text-3xl">
            Reusable Motion &amp; Interaction Primitives
          </h1>
          <p className="text-sm text-[var(--ws-text-secondary)] max-w-2xl">
            CSS/WAAPI for lightweight transitions and <code className="font-mono text-xs">motion/react</code>{" "}
            for spring physics. Every primitive respects <code className="font-mono text-xs">prefers-reduced-motion</code>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex items-center gap-2 rounded-lg border border-[var(--ws-border)] bg-[var(--ws-surface)] px-3 py-1.5 text-xs text-[var(--ws-text-secondary)] cursor-pointer">
            <input
              type="checkbox"
              checked={disableNonEssential}
              onChange={(e) => setDisableNonEssential(e.target.checked)}
              className="accent-[var(--ws-accent)]"
            />
            <span>Simulate Reduced Motion</span>
          </label>

          <select
            aria-label="Preview theme"
            value={skin}
            onChange={(e) => setTheme(e.target.value)}
            className="h-8 rounded-lg border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2.5 text-xs text-[var(--ws-text-primary)] cursor-pointer"
          >
            {ALL_THEMES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

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
                ? "border-[var(--ws-accent)] bg-[var(--ws-accent-soft)] text-[var(--ws-accent)]"
                : "border-[var(--ws-border)] bg-[var(--ws-surface)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Stage */}
      <div
        key={replayKey}
        style={themeToInlineStyle(theme)}
        data-theme={theme.id}
        className={cn(
          "ws-dot-grid rounded-xl border border-[var(--ws-border)] bg-[var(--mm-bg)] text-[var(--mm-fg)] p-8 sm:p-12 min-h-[320px] flex flex-col items-center justify-center gap-6",
          disableNonEssential && "[&_*]:!animate-none [&_*]:!transition-none"
        )}
      >
        {category === "Button Interactions" && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <RippleButton variant="primary">Pointer Ripple</RippleButton>
            <RippleButton variant="outline">Outline Ripple</RippleButton>
            <JellyButton magneticStrength={0.3}>Magnetic Jelly</JellyButton>
          </div>
        )}

        {category === "Text Animations" && (
          <div className="space-y-5 text-center">
            <WiggleText text="Character Wiggle" splitBy="char" variant="accent" className="text-2xl" />
            <div>
              <WiggleText text="Word Stagger Rhythm" splitBy="word" intensity="playful" className="text-xl" />
            </div>
            <MotionReveal variant="blurIn">
              <p className="text-sm text-[var(--mm-fg-muted)]">
                Blur-in entrance powered by MotionReveal
              </p>
            </MotionReveal>
          </div>
        )}

        {category === "Card & Media" && (
          <div className="grid gap-8 md:grid-cols-2 items-center w-full max-w-3xl justify-items-center">
            <SwipeCardDeck cards={DECK_ITEMS} />
            <FlipCard
              front={
                <div className="flex h-full flex-col justify-between">
                  <span className="font-mono text-[10px] uppercase text-[var(--mm-accent)]">Front</span>
                  <p className="text-base font-bold">Direction-Aware Flip</p>
                </div>
              }
              back={
                <div className="flex h-full flex-col justify-between">
                  <span className="font-mono text-[10px] uppercase text-[var(--mm-accent)]">Back</span>
                  <p className="text-xs text-[var(--mm-fg-muted)]">Keyboard &amp; touch ready.</p>
                </div>
              }
            />
          </div>
        )}

        {category === "Loading" && (
          <div className="flex flex-wrap items-center justify-center gap-6">
            <BounceDotsLoader size="md" rhythm="elastic" />
            <ThinkingLoader variant="orbit" />
            <ThinkingLoader variant="pulse-grid" />
            <ProgressRing value={78} size={68} />
          </div>
        )}

        {category === "Background & Visual" && (
          <div className="w-full space-y-3 text-center">
            <ParticleWordmark text="MotionMint" />
            <p className="text-xs text-[var(--mm-fg-muted)]">
              Hover to scatter points, click for radial shockwave.
            </p>
          </div>
        )}

        {category === "Layout & Transitions" && (
          <div className="w-full max-w-md space-y-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={disableNonEssential ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  disableNonEssential
                    ? { duration: 0 }
                    : { ...MOTION_SPRINGS.smooth, delay: i * 0.08 }
                }
                className="rounded-[var(--mm-radius-sm)] border border-[var(--mm-border)] bg-[var(--mm-surface)] px-4 py-3 text-xs font-medium"
              >
                Staggered Spring Item #{i + 1}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Presets & Usage */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--ws-border)] bg-[var(--ws-surface)] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--ws-text-primary)]">
              Shared Motion Presets
            </h2>
            <button
              type="button"
              onClick={() => setReplayKey((k) => k + 1)}
              className="inline-flex items-center gap-1.5 rounded-md border border-[var(--ws-border)] px-2.5 py-1 text-xs text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Replay
            </button>
          </div>
          <p className="text-xs text-[var(--ws-text-secondary)] leading-relaxed">
            Use <code className="font-mono">MOTION_SPRINGS</code> (<code className="font-mono">snappy</code>,{" "}
            <code className="font-mono">smooth</code>, <code className="font-mono">elastic</code>,{" "}
            <code className="font-mono">gentle</code>) and <code className="font-mono">MotionReveal</code>{" "}
            for consistent, interruptible transitions.
          </p>
          <Link
            href="/components/swipe-card-deck"
            className="inline-block text-xs font-medium text-[var(--ws-accent)] hover:underline"
          >
            Inspect full primitives in Component Studio →
          </Link>
        </div>

        <div className="rounded-xl border border-[var(--ws-border)] bg-[var(--ws-surface)] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--ws-text-primary)]">
              Usage Example
            </h2>
            <CopyButton value={springCode} label="Copy Snippet" />
          </div>
          <pre className="overflow-x-auto rounded-lg border border-[var(--ws-border)] bg-[var(--ws-bg)] p-3 font-mono text-[11px] text-[var(--ws-text-secondary)]">
            <code>{springCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

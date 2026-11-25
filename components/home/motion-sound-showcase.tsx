"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Volume2, Zap } from "lucide-react";
import { MotionMintTheme } from "@/components/theme/theme-scope";
import { JellyButton } from "@/registry/components/jelly-button";
import { WiggleText } from "@/registry/components/wiggle-text";
import { SoundToggle } from "@/registry/components/sound-toggle";
import { playSoundEffect, triggerHapticPreset } from "@/lib/audio/sound-engine";
import { useMotionMint } from "@/components/site/providers";
import { cn } from "@/lib/utils";

const SPRING_PRESETS = [
  { id: "snappy", label: "Snappy", note: "stiffness: 420 · damping: 28" },
  { id: "bouncy", label: "Bouncy", note: "stiffness: 340 · damping: 14" },
  { id: "gentle", label: "Gentle", note: "stiffness: 180 · damping: 24" },
] as const;

export function MotionSoundShowcase() {
  const { soundEnabled } = useMotionMint();
  const [preset, setPreset] = useState<(typeof SPRING_PRESETS)[number]["id"]>("bouncy");
  const [lastCue, setLastCue] = useState<string>("Off by default — opt-in on user gesture");

  const handleCue = (type: "click" | "success" | "toggleOn") => {
    if (soundEnabled) {
      playSoundEffect(type);
      triggerHapticPreset("tap");
      setLastCue(`Played "${type}" Web Audio cue + haptic check`);
    } else {
      triggerHapticPreset("tap");
      setLastCue(`Audio muted (global Sound is OFF) — visual & haptic fallback active`);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
      <div className="max-w-2xl space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--ws-text-muted)]">
          Motion &amp; Sound Engine
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--ws-text-primary)] sm:text-4xl">
          Every interaction has a personality.
        </h2>
        <p className="text-sm leading-relaxed text-[var(--ws-text-secondary)]">
          Physics-driven springs with full{" "}
          <code className="font-mono text-xs text-[var(--ws-text-primary)]">
            prefers-reduced-motion
          </code>{" "}
          fallbacks, paired with an explicit opt-in Web Audio synthesizer (never auto-played).
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Motion Panel */}
        <div className="flex flex-col justify-between gap-6 rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ws-text-primary)]">
                <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                Tactile Motion Primitives
              </span>
              <Link
                href="/motion"
                className="inline-flex items-center gap-1 text-xs text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
              >
                Motion Lab <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {SPRING_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPreset(p.id)}
                  aria-pressed={preset === p.id}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                    preset === p.id
                      ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                      : "border-[var(--ws-border)] bg-[var(--ws-floating)] text-[var(--ws-text-secondary)]"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <MotionMintTheme
            theme="minimalism"
            mode="light"
            padded
            className="flex min-h-[160px] flex-col items-center justify-center gap-4"
          >
            <WiggleText text="Hover or tap for spring physics" className="text-base font-semibold" />
            <JellyButton
              magneticStrength={preset === "bouncy" ? 12 : preset === "snappy" ? 8 : 4}
            >
              Spring {preset}
            </JellyButton>
          </MotionMintTheme>

          <p className="font-mono text-[11px] text-[var(--ws-text-muted)]">
            {SPRING_PRESETS.find((p) => p.id === preset)?.note}
          </p>
        </div>

        {/* Sound & Haptics Panel */}
        <div className="flex flex-col justify-between gap-6 rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ws-text-primary)]">
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
              Web Audio &amp; Haptics (Off by Default)
            </span>
            <Link
              href="/sounds"
              className="inline-flex items-center gap-1 text-xs text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
            >
              Sound Lab <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <MotionMintTheme
            theme="minimalism"
            mode="light"
            padded
            className="flex min-h-[160px] flex-col items-center justify-center gap-4"
          >
            <SoundToggle />
            <div className="flex flex-wrap justify-center gap-2">
              {(["click", "success", "toggleOn"] as const).map((cue) => (
                <button
                  key={cue}
                  type="button"
                  onClick={() => handleCue(cue)}
                  className="rounded-full border border-[var(--mm-border-strong,#d4d4d8)] bg-[var(--mm-surface,#ffffff)] px-3 py-1 text-xs font-medium text-[var(--mm-fg,#111827)] hover:brightness-95 cursor-pointer"
                >
                  Trigger {cue}
                </button>
              ))}
            </div>
          </MotionMintTheme>

          <p className="font-mono text-[11px] text-[var(--ws-text-secondary)]">{lastCue}</p>
        </div>
      </div>
    </section>
  );
}

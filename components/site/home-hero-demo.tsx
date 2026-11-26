"use client";

import React, { useState } from "react";
import { RippleButton } from "@/registry/components/ripple-button";
import { JellyButton } from "@/registry/components/jelly-button";
import { CopyButton } from "@/registry/components/copy-button";
import { SoundToggle } from "@/registry/components/sound-toggle";
import { ProgressRing } from "@/registry/components/progress-ring";
import { BounceDotsLoader } from "@/registry/components/bounce-dots-loader";
import { LAUNCH_SKINS } from "@/lib/themes/skins";
import { themeToInlineStyle } from "@/lib/themes/theme-utils";
import { useMotionMint } from "@/components/site/providers";
import { cn } from "@/lib/utils";

export function HomeHeroDemo() {
  const { skin, theme, setSkin, soundEnabled, toggleSound } = useMotionMint();
  const [progress, setProgress] = useState(74);
  const [activeToggle, setActiveToggle] = useState(true);

  return (
    <div style={themeToInlineStyle(theme)} className="mm-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--mm-border)] pb-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--mm-accent)]">
            Live Interaction Stage
          </p>
          <p className="text-sm text-[var(--mm-fg-muted)]">
            Switch skins or enable sound to feel every control adapt in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {LAUNCH_SKINS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSkin(s.id)}
              aria-pressed={skin === s.id}
              className={cn(
                "px-2.5 py-1 text-xs font-medium rounded-[var(--mm-radius-sm)] border cursor-pointer transition-colors",
                skin === s.id
                  ? "border-[var(--mm-accent)] bg-[var(--mm-accent)] text-[var(--mm-accent-fg)]"
                  : "border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)]"
              )}
            >
              {s.shortLabel}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-[var(--mm-radius-sm)] border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] p-4 flex flex-col justify-between gap-4">
          <span className="text-xs font-medium text-[var(--mm-fg-muted)]">
            Tactile Buttons
          </span>
          <div className="flex flex-wrap items-center gap-2.5">
            <RippleButton
              size="sm"
              onClick={() => setProgress((p) => (p >= 100 ? 20 : Math.min(100, p + 13)))}
            >
              Ripple +13%
            </RippleButton>
            <JellyButton>Magnetic</JellyButton>
          </div>
        </div>

        <div className="rounded-[var(--mm-radius-sm)] border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] p-4 flex flex-col justify-between gap-4">
          <span className="text-xs font-medium text-[var(--mm-fg-muted)]">
            Sound &amp; State Controls
          </span>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <SoundToggle
                checked={soundEnabled}
                onCheckedChange={toggleSound}
                label="Global UI sound"
              />
              <span className="text-xs text-[var(--mm-fg)]">
                Global Sound: <strong>{soundEnabled ? "ON" : "OFF"}</strong>
              </span>
            </div>
            <SoundToggle
              checked={activeToggle}
              onCheckedChange={setActiveToggle}
              label="Feature toggle"
            />
          </div>
        </div>

        <div className="rounded-[var(--mm-radius-sm)] border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] p-4 flex items-center justify-between gap-4 sm:col-span-2 lg:col-span-1">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-[var(--mm-fg-muted)]">
              Feedback &amp; CLI
            </span>
            <div className="flex items-center gap-3">
              <CopyButton value="npx shadcn add @renderjoy/ripple-button" label="Copy CLI" />
              <BounceDotsLoader size="sm" />
            </div>
          </div>
          <ProgressRing value={progress} size={56} strokeWidth={5} />
        </div>
      </div>
    </div>
  );
}

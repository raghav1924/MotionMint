"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { getThemeById } from "@/lib/themes/registry";
import type { ComponentThemeMode, ThemeId } from "@/lib/themes/types";
import { MotionMintTheme } from "@/components/theme/theme-scope";
import { RippleButton } from "@/registry/components/ripple-button";
import { cn } from "@/lib/utils";

const SHOWCASE_THEMES: ThemeId[] = [
  "minimalism",
  "neo-brutalism",
  "scrapbook",
  "blueprint",
  "cyberpunk",
  "victorian",
  "wabi-sabi",
];

export function ThemeDifferentiator() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>("neo-brutalism");
  const [mode, setMode] = useState<ComponentThemeMode>("light");
  const [clicks, setClicks] = useState(0);

  const active = getThemeById(selectedTheme);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--ws-text-muted)]">
            Scoped Component Styling
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--ws-text-primary)] sm:text-4xl">
            One component. Fifty-eight expressions.
          </h2>
          <p className="text-sm leading-relaxed text-[var(--ws-text-secondary)]">
            Every MotionMint component consumes scoped{" "}
            <code className="font-mono text-xs text-[var(--ws-text-primary)]">--mm-*</code>{" "}
            tokens and theme recipes. Switch among 29 design languages in Light or Dark mode
            without changing your global website chrome.
          </p>
        </div>

        <Link
          href="/themes"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ws-text-primary)] hover:underline"
        >
          <span>Open Theme Studio</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-5 sm:p-7">
        {/* Controls */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[var(--ws-text-primary)]">
              Select Design Pattern
            </span>
            <div
              role="group"
              aria-label="Component theme mode"
              className="inline-flex rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] p-0.5 text-xs"
            >
              {(["light", "dark"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1 capitalize transition-colors cursor-pointer",
                    mode === m
                      ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                      : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
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
          </div>

          <div className="flex flex-wrap gap-2">
            {SHOWCASE_THEMES.map((id) => {
              const t = getThemeById(id);
              const isSelected = selectedTheme === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedTheme(id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                    isSelected
                      ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                      : "border-[var(--ws-border)] bg-[var(--ws-floating)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                  )}
                >
                  {t.name}
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--ws-text-primary)]">
                {active.name} · {mode === "light" ? "Light" : "Dark"}
              </span>
              <span className="font-mono text-[10px] text-[var(--ws-text-muted)]">
                {active.motionPersonality}
              </span>
            </div>
            <p className="text-xs text-[var(--ws-text-secondary)] leading-relaxed">
              {active.description}
            </p>
            <pre className="overflow-x-auto rounded-xl border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] px-3 py-2 font-mono text-[11px] text-[var(--ws-text-primary)]">
              <code>{`<MotionMintTheme theme="${active.id}" mode="${mode}">\n  <RippleButton>Continue</RippleButton>\n</MotionMintTheme>`}</code>
            </pre>
          </div>
        </div>

        {/* Live Scoped Specimen */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] p-4 sm:p-5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ws-text-muted)]">
            <span>
              button:{active.recipes.buttonStyle} · card:{active.recipes.cardStyle}
            </span>
            <span>Clicks: {clicks}</span>
          </div>

          <MotionMintTheme
            theme={active.id}
            mode={mode}
            padded
            className="flex min-h-[210px] flex-col items-center justify-center gap-4"
          >
            <RippleButton onClick={() => setClicks((c) => c + 1)}>Continue</RippleButton>
            <span className="text-[11px] opacity-75">
              Identical props &amp; state — styled purely via MotionMintTheme
            </span>
          </MotionMintTheme>
        </div>
      </div>
    </section>
  );
}

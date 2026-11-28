"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import type { ThemeDefinition } from "@/lib/themes/types";
import { ALL_THEMES } from "@/lib/themes/registry";
import { RenderJoyTheme } from "@/components/theme/theme-scope";
import { RippleButton } from "@/registry/components/ripple-button";
import { JellyButton } from "@/registry/components/jelly-button";
import { SegmentedControl } from "@/registry/components/segmented-control";
import { GlowInput } from "@/registry/components/glow-input";
import { ProgressRing } from "@/registry/components/progress-ring";
import { AnimatedCharts } from "@/registry/components/animated-charts";
import { BentoDashboardBlock } from "@/registry/components/bento-dashboard-block";
import { cn } from "@/lib/utils";

export function ThemeDemoWebsite({ theme }: { theme: ThemeDefinition }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [segment, setSegment] = useState("overview");

  return (
    <div className="mx-auto max-w-[1320px] px-4 pt-20 pb-24 sm:px-8 space-y-6">
      {/* Demo Chrome Controls (outside RenderJoyTheme scope) */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)] px-4 py-3 text-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/themes"
            className="inline-flex items-center gap-1.5 font-medium text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>All 29 Themes</span>
          </Link>
          <span className="text-[var(--ws-border-strong)]">/</span>
          <span className="font-semibold text-[var(--ws-text-primary)]">{theme.name}</span>
          <span className="rounded-md bg-[var(--ws-surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--ws-text-muted)]">
            {theme.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Demo theme mode"
            className="inline-flex rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] p-0.5"
          >
            {(["light", "dark"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 capitalize cursor-pointer",
                  mode === m
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
        </div>
      </div>

      {/* Scoped Full-Page Theme Demo Website */}
      <RenderJoyTheme
        theme={theme.id}
        mode={mode}
        padded
        className="rounded-[28px] border border-[var(--mm-border)] p-6 sm:p-10 space-y-10 shadow-sm"
      >
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--mm-border)] pb-6">
          <div className="space-y-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--mm-fg-muted)]">
              {theme.name} · {mode} expression
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{theme.description}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <RippleButton>Primary Action</RippleButton>
            <JellyButton variant="glass">Explore Spec</JellyButton>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 space-y-4">
              <p className="text-sm font-semibold">Interactive Controls</p>
              <SegmentedControl
                value={segment}
                onValueChange={setSegment}
                options={[
                  { value: "overview", label: "Overview" },
                  { value: "tokens", label: "Tokens" },
                  { value: "motion", label: "Motion" },
                ]}
              />
              <GlowInput label="Workspace Name" placeholder={`${theme.id}-studio`} />
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[var(--mm-fg-muted)]">Recipe: {theme.recipes.buttonStyle}</span>
                <ProgressRing value={84} size={46} />
              </div>
            </div>

            <AnimatedCharts title={`${theme.name} Metrics`} />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <BentoDashboardBlock />

            <div className="rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--mm-fg-muted)]">
                Switch Theme Demo
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ALL_THEMES.slice(0, 10).map((t) => (
                  <Link
                    key={t.id}
                    href={`/themes/${t.id}/demo`}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[11px] transition-opacity hover:opacity-80",
                      t.id === theme.id
                        ? "border-[var(--mm-accent)] bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-medium"
                        : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
                    )}
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RenderJoyTheme>
    </div>
  );
}

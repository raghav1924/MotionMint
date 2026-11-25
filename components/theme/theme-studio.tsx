"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Columns2, RotateCcw, Sun, Moon, Sparkles, ArrowUpRight } from "lucide-react";
import { ALL_THEMES, DEFAULT_THEME_ID, getThemeById } from "@/lib/themes/registry";
import type { ComponentThemeMode, ThemeCategory, ThemeId } from "@/lib/themes/types";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { useMotionMint } from "@/components/site/providers";
import { MotionMintTheme } from "@/components/theme/theme-scope";
import { ComponentLivePreview } from "@/components/shared/component-preview-card";
import {
  DesktopBrowserFrame,
  TabletPreviewFrame,
  MobileDeviceFrame,
} from "@/components/preview/device-frames";
import { RippleButton } from "@/registry/components/ripple-button";
import { cn } from "@/lib/utils";

const CATEGORIES: ("All" | ThemeCategory)[] = [
  "All",
  "Modern",
  "Minimal & Editorial",
  "Tactile & Dimensional",
  "Retro & Futuristic",
  "Expressive & Artistic",
];

const COMPARE_SET: ThemeId[] = [
  "minimalism",
  "neo-brutalism",
  "scrapbook",
  "cyberpunk",
  "victorian",
  "blueprint",
];

export function ThemeStudio() {
  const {
    skin,
    setTheme,
    themeMode,
    setThemeMode,
    viewportMode,
    previewKey,
    setActiveComponentSlug,
  } = useMotionMint();
  const implemented = useMemo(
    () => CATALOG_ITEMS.filter((c) => c.status === "implemented"),
    []
  );

  const [previewSlug, setPreviewSlug] = useState("ripple-button");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ThemeCategory>("All");
  const [compareOpen, setCompareOpen] = useState(false);

  useEffect(() => {
    setActiveComponentSlug(previewSlug);
    return () => setActiveComponentSlug(null);
  }, [previewSlug, setActiveComponentSlug]);

  const activeTheme = getThemeById(skin);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_THEMES.filter((t) => {
      if (category !== "All" && t.category !== category) return false;
      if (
        q &&
        !t.name.toLowerCase().includes(q) &&
        !t.description.toLowerCase().includes(q) &&
        !t.category.toLowerCase().includes(q) &&
        !t.motionPersonality.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [query, category]);

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-14 sm:px-8 space-y-10">
      {/* Minimalist Header */}
      <header className="mx-auto max-w-2xl text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] px-3 py-1 text-xs font-medium text-[var(--ws-text-secondary)]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>29 Design Patterns × Light/Dark = 58 Variants</span>
        </div>
        <h1 className="text-[30px] sm:text-[36px] font-semibold tracking-tight text-[var(--ws-text-primary)]">
          Component Theme Studio
        </h1>
        <p className="text-sm text-[var(--ws-text-secondary)]">
          Design themes apply strictly to components inside{" "}
          <code className="font-mono text-xs text-[var(--ws-text-primary)]">
            &lt;MotionMintTheme&gt;
          </code>
          — never altering the website chrome.
        </p>
      </header>

      {/* Live Scoped Component Stage + Controls */}
      <section className="rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-4 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs font-medium text-[var(--ws-text-secondary)]">
              Preview Component:
            </label>
            <select
              aria-label="Select component to theme"
              value={previewSlug}
              onChange={(e) => setPreviewSlug(e.target.value)}
              className="h-8 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3 text-xs text-[var(--ws-text-primary)] cursor-pointer"
            >
              {implemented.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <div
              role="group"
              aria-label="Active component theme mode"
              className="inline-flex h-8 items-center rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] p-0.5 text-xs"
            >
              {(["light", "dark"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setThemeMode(m)}
                  aria-pressed={themeMode === m}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1 capitalize transition-colors cursor-pointer",
                    themeMode === m
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCompareOpen((v) => !v)}
              aria-pressed={compareOpen}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors cursor-pointer",
                compareOpen
                  ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                  : "border-[var(--ws-border)] bg-[var(--ws-floating)] text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)]"
              )}
            >
              <Columns2 className="h-3.5 w-3.5" aria-hidden="true" />
              {compareOpen ? "Exit Comparison" : "Compare Mode"}
            </button>
            <button
              type="button"
              onClick={() => {
                setTheme(DEFAULT_THEME_ID);
                setThemeMode("light");
              }}
              aria-label="Reset component theme"
              className="inline-flex h-8 items-center gap-1 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3 text-xs text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>

        {/* Comparison Mode vs Single Active Stage */}
        {compareOpen ? (
          <div className="space-y-4">
            <p className="text-xs text-[var(--ws-text-secondary)]">
              Comparing <strong className="text-[var(--ws-text-primary)]">{previewSlug}</strong> across{" "}
              <strong className="text-[var(--ws-text-primary)]">{activeTheme.name} (Light vs Dark)</strong> and contrasting theme families:
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Active Theme Light vs Dark */}
              {(["light", "dark"] as ComponentThemeMode[]).map((m) => (
                <div
                  key={`active-${m}`}
                  className="rounded-[18px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-3 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[var(--ws-text-primary)]">
                      {activeTheme.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-[var(--ws-text-secondary)]">
                      {m}
                    </span>
                  </div>
                  <MotionMintTheme
                    theme={activeTheme.id}
                    mode={m}
                    padded
                    className="flex min-h-[160px] items-center justify-center overflow-hidden"
                  >
                    <ComponentLivePreview slug={previewSlug} />
                  </MotionMintTheme>
                </div>
              ))}

              {/* Contrasting Theme Families */}
              {COMPARE_SET.filter((id) => id !== activeTheme.id)
                .slice(0, 6)
                .map((id) => {
                  const t = getThemeById(id);
                  return (
                    <div
                      key={id}
                      className="rounded-[18px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-3 space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[var(--ws-text-primary)]">
                          {t.name}
                        </span>
                        <span className="font-mono text-[10px] uppercase text-[var(--ws-text-secondary)]">
                          {themeMode}
                        </span>
                      </div>
                      <MotionMintTheme
                        theme={t.id}
                        mode={themeMode}
                        padded
                        className="flex min-h-[160px] items-center justify-center overflow-hidden"
                      >
                        <ComponentLivePreview slug={previewSlug} />
                      </MotionMintTheme>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="rounded-[18px] border border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[var(--ws-text-primary)]">
                  {activeTheme.name}
                </span>
                <span className="rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2 py-0.5 font-mono text-[10px] uppercase text-[var(--ws-text-secondary)]">
                  {themeMode}
                </span>
                <span className="font-mono text-[10px] text-[var(--ws-text-muted)]">
                  button:{activeTheme.recipes.buttonStyle} · card:{activeTheme.recipes.cardStyle}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <code className="hidden sm:inline font-mono text-[11px] text-[var(--ws-text-secondary)]">
                  &lt;MotionMintTheme theme=&quot;{activeTheme.id}&quot; mode=&quot;{themeMode}&quot;&gt;
                </code>
                <Link
                  href={`/components/${previewSlug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)]"
                >
                  Open Docs
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {viewportMode === "mobile" ? (
              <MobileDeviceFrame key={`m-${previewSlug}-${previewKey}`} slug={previewSlug}>
                <MotionMintTheme
                  theme={activeTheme.id}
                  mode={themeMode}
                  padded
                  className="flex min-h-[380px] w-full items-center justify-center overflow-hidden"
                >
                  <ComponentLivePreview slug={previewSlug} />
                </MotionMintTheme>
              </MobileDeviceFrame>
            ) : viewportMode === "tablet" ? (
              <TabletPreviewFrame key={`t-${previewSlug}-${previewKey}`} slug={previewSlug}>
                <MotionMintTheme
                  theme={activeTheme.id}
                  mode={themeMode}
                  padded
                  className="flex min-h-[300px] w-full items-center justify-center overflow-hidden"
                >
                  <ComponentLivePreview slug={previewSlug} />
                </MotionMintTheme>
              </TabletPreviewFrame>
            ) : (
              <DesktopBrowserFrame key={`d-${previewSlug}-${previewKey}`} slug={previewSlug}>
                <MotionMintTheme
                  theme={activeTheme.id}
                  mode={themeMode}
                  padded
                  className="flex min-h-[260px] w-full items-center justify-center overflow-hidden"
                >
                  <ComponentLivePreview slug={previewSlug} />
                </MotionMintTheme>
              </DesktopBrowserFrame>
            )}
          </div>
        )}
      </section>

      {/* Search & Category Filter */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ws-text-muted)]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 29 themes (e.g. Scrapbook, Victorian)..."
            aria-label="Search themes"
            className="h-9 w-full rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] pl-9 pr-3 text-xs text-[var(--ws-text-primary)] placeholder:text-[var(--ws-text-muted)] focus:outline-none focus:border-[var(--ws-border-strong)]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter themes by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-full border cursor-pointer transition-colors",
                category === cat
                  ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                  : "border-[var(--ws-border)] bg-[var(--ws-floating)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 29 Theme Cards (showing Light & Dark specimens) */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => {
          const isSelected = t.id === activeTheme.id;
          return (
            <div
              key={t.id}
              className={cn(
                "flex flex-col justify-between rounded-[22px] border bg-[var(--ws-surface)] p-4 transition-all space-y-4",
                isSelected
                  ? "border-[var(--ws-text-primary)] shadow-[var(--ws-shadow-floating)]"
                  : "border-[var(--ws-border)] hover:border-[var(--ws-border-strong)]"
              )}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold text-[var(--ws-text-primary)]">
                    {t.name}
                  </h2>
                  <span className="font-mono text-[10px] text-[var(--ws-text-muted)]">
                    {t.category}
                  </span>
                </div>
                <p className="text-xs text-[var(--ws-text-secondary)] leading-relaxed">
                  {t.description}
                </p>
                <p className="font-mono text-[10px] text-[var(--ws-text-muted)]">
                  {t.motionPersonality}
                </p>
              </div>

              {/* Dual Light + Dark Live Specimens */}
              <div className="grid grid-cols-2 gap-2.5">
                {(["light", "dark"] as ComponentThemeMode[]).map((m) => (
                  <div key={m} className="space-y-1.5">
                    <MotionMintTheme
                      theme={t.id}
                      mode={m}
                      padded
                      className="flex min-h-[84px] items-center justify-center p-2.5 overflow-hidden"
                    >
                      <RippleButton size="sm">{m === "light" ? "Light" : "Dark"}</RippleButton>
                    </MotionMintTheme>
                    <button
                      type="button"
                      onClick={() => {
                        setTheme(t.id);
                        setThemeMode(m);
                      }}
                      className={cn(
                        "w-full rounded-full border py-1 text-[11px] font-medium capitalize transition-colors cursor-pointer",
                        isSelected && themeMode === m
                          ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                          : "border-[var(--ws-border)] bg-[var(--ws-floating)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                      )}
                    >
                      Apply {m}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

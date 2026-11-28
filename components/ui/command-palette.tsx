"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Component, Palette, Volume2, BookOpen, Play, ArrowRight } from "lucide-react";
import { useRenderJoy } from "@/components/site/providers";
import { ModalDialog } from "@/components/ui/overlay";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { ALL_THEMES } from "@/lib/themes/registry";
import { cn } from "@/lib/utils";

interface CommandEntry {
  id: string;
  group: "Navigation" | "Components" | "Themes";
  label: string;
  hint: string;
  href?: string;
  themeId?: string;
}

export function CommandPalette() {
  const router = useRouter();
  const { commandOpen, setCommandOpen, setTheme } = useRenderJoy();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const entries = useMemo<CommandEntry[]>(() => {
    const nav: CommandEntry[] = [
      { id: "nav-home", group: "Navigation", label: "Home", hint: "/", href: "/" },
      { id: "nav-comp", group: "Navigation", label: "Components", hint: "/components", href: "/components" },
      { id: "nav-themes", group: "Navigation", label: "Themes (29)", hint: "/themes", href: "/themes" },
      { id: "nav-bench", group: "Navigation", label: "Bench", hint: "/bench", href: "/bench" },
      { id: "nav-motion", group: "Navigation", label: "Motion Lab", hint: "/motion", href: "/motion" },
      { id: "nav-sounds", group: "Navigation", label: "Sound Lab", hint: "/sounds", href: "/sounds" },
      { id: "nav-flow", group: "Navigation", label: "Flow Orchestrator", hint: "/flow", href: "/flow" },
      { id: "nav-pricing", group: "Navigation", label: "Pricing & Pro", hint: "/pricing", href: "/pricing" },
      { id: "nav-install", group: "Navigation", label: "Installation", hint: "/docs/installation", href: "/docs/installation" },
    ];

    const comps: CommandEntry[] = CATALOG_ITEMS.filter((c) => c.status === "implemented").map((c) => ({
      id: `comp-${c.slug}`,
      group: "Components",
      label: c.name,
      hint: c.category,
      href: `/components/${c.slug}`,
    }));

    const themes: CommandEntry[] = ALL_THEMES.map((t) => ({
      id: `theme-${t.id}`,
      group: "Themes",
      label: `Apply ${t.name}`,
      hint: t.category,
      themeId: t.id,
    }));

    return [...nav, ...comps, ...themes];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries.slice(0, 14);
    return entries
      .filter(
        (e) =>
          e.label.toLowerCase().includes(q) ||
          e.hint.toLowerCase().includes(q) ||
          e.group.toLowerCase().includes(q)
      )
      .slice(0, 16);
  }, [entries, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, commandOpen]);

  const execute = (entry: CommandEntry) => {
    if (entry.themeId) {
      setTheme(entry.themeId);
    } else if (entry.href) {
      router.push(entry.href);
    }
    setCommandOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      execute(filtered[activeIndex]);
    }
  };

  return (
    <ModalDialog
      open={commandOpen}
      onClose={() => setCommandOpen(false)}
      title="Command Palette"
    >
      <div onKeyDown={handleKeyDown} className="overflow-hidden rounded-[22px] bg-[var(--ws-floating)]">
        <div className="flex items-center gap-2.5 border-b border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] px-4 py-3">
          <Search className="h-4 w-4 text-[var(--ws-text-secondary)]" aria-hidden="true" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search interactions, components..."
            aria-label="Command search"
            className="flex-1 bg-transparent text-sm text-[var(--ws-text-primary)] placeholder:text-[var(--ws-text-muted)] outline-none"
          />
          <kbd className="rounded-md border border-[var(--ws-border)] bg-[var(--ws-floating)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--ws-text-secondary)]">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-xs text-[var(--ws-text-muted)]">
              No matching commands for &quot;{query}&quot;
            </p>
          ) : (
            filtered.map((entry, idx) => {
              const active = idx === activeIndex;
              const Icon =
                entry.group === "Components"
                  ? Component
                  : entry.group === "Themes"
                    ? Palette
                    : entry.label.includes("Sound")
                      ? Volume2
                      : entry.label.includes("Playground")
                        ? Play
                        : BookOpen;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => execute(entry)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-[12px] px-3 py-2 text-left text-xs cursor-pointer transition-colors",
                    active
                      ? "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
                      : "text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)]"
                  )}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--ws-text-secondary)]" aria-hidden="true" />
                    <span className="truncate font-medium">{entry.label}</span>
                  </span>
                  <span className="flex items-center gap-1.5 shrink-0 text-[10px] font-mono text-[var(--ws-text-muted)]">
                    <span>{entry.hint}</span>
                    {active && <ArrowRight className="h-3 w-3 text-[var(--ws-text-primary)]" aria-hidden="true" />}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Keyboard-help footer strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] px-4 py-2 text-[11px] text-[var(--ws-text-secondary)]">
          <span className="font-medium">Actions</span>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <span>Open</span>
              <kbd className="rounded border border-[var(--ws-border)] bg-[var(--ws-floating)] px-1 font-mono text-[10px]">
                ↵
              </kbd>
            </span>
            <span className="inline-flex items-center gap-1">
              <span>Navigate</span>
              <kbd className="rounded border border-[var(--ws-border)] bg-[var(--ws-floating)] px-1 font-mono text-[10px]">
                ↑↓
              </kbd>
            </span>
            <span className="inline-flex items-center gap-1">
              <span>Close</span>
              <kbd className="rounded border border-[var(--ws-border)] bg-[var(--ws-floating)] px-1 font-mono text-[10px]">
                Esc
              </kbd>
            </span>
          </div>
        </div>
      </div>
    </ModalDialog>
  );
}

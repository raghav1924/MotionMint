"use client";

import React, { useMemo, useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Search, Layers } from "lucide-react";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { ComponentStudio } from "@/components/studio/component-studio";
import { Drawer } from "@/components/ui/overlay";
import { cn } from "@/lib/utils";

export function PlaygroundShell() {
  const implemented = useMemo(
    () => CATALOG_ITEMS.filter((c) => c.status === "implemented"),
    []
  );

  const [selectedSlug, setSelectedSlug] = useState("swipe-card-deck");
  const [query, setQuery] = useState("");
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filteredByCategory = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? implemented.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.category.toLowerCase().includes(q) ||
            c.slug.toLowerCase().includes(q)
        )
      : implemented;

    const map = new Map<string, typeof list>();
    for (const item of list) {
      const group = map.get(item.category) ?? [];
      group.push(item);
      map.set(item.category, group);
    }
    return Array.from(map.entries());
  }, [implemented, query]);

  const activeItem =
    implemented.find((c) => c.slug === selectedSlug) ?? implemented[0];

  const navContent = (onSelect?: () => void) => (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--ws-text-secondary)]">
          Components ({implemented.length})
        </span>
      </div>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--ws-text-muted)]"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter components..."
          aria-label="Filter playground components"
          className="h-8 w-full rounded-[10px] border border-[var(--ws-border)] bg-[var(--ws-floating)] pl-8 pr-2.5 text-xs text-[var(--ws-text-primary)] placeholder:text-[var(--ws-text-muted)] focus:outline-none focus:border-[var(--ws-border-strong)]"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {filteredByCategory.map(([cat, items]) => (
          <div key={cat} className="space-y-1">
            <p className="px-2 font-mono text-[10px] uppercase tracking-wider text-[var(--ws-text-muted)]">
              {cat} ({items.length})
            </p>
            <div className="space-y-0.5">
              {items.map((c) => {
                const active = c.slug === activeItem.slug;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => {
                      setSelectedSlug(c.slug);
                      onSelect?.();
                    }}
                    aria-pressed={active}
                    className={cn(
                      "flex w-full items-center justify-between rounded-[10px] px-2.5 py-1.5 text-left text-xs transition-colors cursor-pointer",
                      active
                        ? "bg-[var(--ws-surface-active)] font-medium text-[var(--ws-text-primary)]"
                        : "text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)]"
                    )}
                  >
                    <span className="truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 pt-8 pb-12">
      {/* Top Playground Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="inline-flex lg:hidden items-center gap-1.5 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3 py-1.5 text-xs font-medium text-[var(--ws-text-primary)] cursor-pointer"
          >
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            Components ({implemented.length})
          </button>
          <button
            type="button"
            onClick={() => setNavCollapsed((c) => !c)}
            aria-label={navCollapsed ? "Show component list" : "Hide component list"}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3 py-1.5 text-xs font-medium text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] cursor-pointer"
          >
            {navCollapsed ? (
              <PanelLeftOpen className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <PanelLeftClose className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>{navCollapsed ? "Show Components" : "Hide Components"}</span>
          </button>
          <span className="text-xs font-mono text-[var(--ws-text-secondary)]">
            Playground · {activeItem.name}
          </span>
        </div>
      </div>

      {/* Three-Region Playground: Left Navigation + Central Stage & Inspector */}
      <div
        className={cn(
          "grid gap-6 items-start",
          navCollapsed ? "grid-cols-1" : "lg:grid-cols-[240px_1fr]"
        )}
      >
        {!navCollapsed && (
          <aside
            aria-label="Playground component navigation"
            className="hidden lg:block sticky top-14 h-[calc(100vh-140px)] rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-3"
          >
            {navContent()}
          </aside>
        )}

        <div className="min-w-0">
          <ComponentStudio item={activeItem} sourceCode={null} />
        </div>
      </div>

      <Drawer
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        title={`Components (${implemented.length})`}
        side="left"
      >
        {navContent(() => setMobileNavOpen(false))}
      </Drawer>
    </div>
  );
}

"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Clock,
  ArrowUpRight,
  Lock,
  LayoutGrid,
  Folder,
} from "lucide-react";
import { CATALOG_ITEMS, type ComponentTier } from "@/lib/catalog";
import { FULL_INVENTORY } from "@/lib/inventory";
import { ComponentLivePreview } from "@/components/shared/component-preview-card";
import { cn } from "@/lib/utils";

const LARGE_STAGE_SLUGS = new Set([
  "ai-chat",
  "image-generation",
  "pixel-image-generation",
  "infinity-canvas",
  "card-stack",
  "receipt-printer",
  "swipe-card-deck",
]);

export function CatalogueBrowser() {
  const [viewMode, setViewMode] = useState<"available" | "roadmap">("available");
  const [layoutMode, setLayoutMode] = useState<"grid" | "categories">("grid");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tier, setTier] = useState<"all" | ComponentTier>("all");

  const implementedAll = useMemo(
    () => CATALOG_ITEMS.filter((c) => c.status === "implemented"),
    []
  );
  const freeCount = useMemo(
    () => implementedAll.filter((c) => c.tier === "free").length,
    [implementedAll]
  );
  const proCount = useMemo(
    () => FULL_INVENTORY.filter((c) => c.tier === "pro").length,
    []
  );

  const availableItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATALOG_ITEMS.filter((item) => {
      if (item.status !== "implemented") return false;
      if (category !== "All" && item.category !== category) return false;
      if (tier !== "all" && item.tier !== tier) return false;
      if (
        q &&
        !item.name.toLowerCase().includes(q) &&
        !item.description.toLowerCase().includes(q) &&
        !item.category.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [query, category, tier]);

  const roadmapItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FULL_INVENTORY.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (tier !== "all" && item.tier !== tier) return false;
      if (
        q &&
        !item.name.toLowerCase().includes(q) &&
        !item.description.toLowerCase().includes(q) &&
        !item.category.toLowerCase().includes(q) &&
        !item.tags.some((t) => t.includes(q))
      ) {
        return false;
      }
      return true;
    });
  }, [query, category, tier]);

  const groupedAvailable = useMemo(() => {
    const map = new Map<string, typeof availableItems>();
    for (const item of availableItems) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return Array.from(map.entries());
  }, [availableItems]);

  const categorySummaries = useMemo(() => {
    const map = new Map<string, typeof implementedAll>();
    for (const item of implementedAll) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return Array.from(map.entries()).map(([name, items]) => ({
      name,
      count: items.length,
      previewItem: items[0],
    }));
  }, [implementedAll]);

  const switchView = (mode: "available" | "roadmap") => {
    setViewMode(mode);
    setCategory("All");
  };

  return (
    <div className="space-y-10">
      {/* Centered Floating Filter & Search Pill */}
      <div className="relative mx-auto max-w-[680px]">
        <div
          className={cn(
            "flex h-12 w-full items-center gap-1.5 rounded-full border border-[var(--ws-border)]",
            "bg-[var(--ws-floating)] px-2 shadow-[var(--ws-shadow-floating)]"
          )}
        >
          {/* Mode + Tier filter pills */}
          <div
            role="group"
            aria-label="Catalogue view mode"
            className="flex items-center gap-0.5 shrink-0"
          >
            <button
              type="button"
              onClick={() => {
                switchView("available");
                setTier("all");
              }}
              aria-pressed={viewMode === "available" && tier === "all"}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors",
                viewMode === "available" && tier === "all"
                  ? "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)] border border-[var(--ws-border-subtle)]"
                  : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
              )}
            >
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              <span>Available Now ({implementedAll.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                switchView("roadmap");
                setTier("all");
                setLayoutMode("grid");
              }}
              aria-pressed={viewMode === "roadmap" && tier === "all"}
              className={cn(
                "hidden sm:inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors",
                viewMode === "roadmap" && tier === "all"
                  ? "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)] border border-[var(--ws-border-subtle)]"
                  : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
              )}
            >
              <span>Full Inventory</span>
              <span className="text-[var(--ws-text-muted)]">{FULL_INVENTORY.length}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                switchView("available");
                setTier("free");
              }}
              aria-pressed={tier === "free"}
              className={cn(
                "hidden md:inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-colors",
                tier === "free"
                  ? "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
                  : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
              )}
            >
              <span>Free</span>
              <span className="text-[var(--ws-text-muted)]">{freeCount}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                switchView("roadmap");
                setTier("pro");
                setLayoutMode("grid");
              }}
              aria-pressed={tier === "pro"}
              className={cn(
                "hidden md:inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-colors",
                tier === "pro"
                  ? "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
                  : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
              )}
            >
              <span>Pro</span>
              <span className="text-[var(--ws-text-muted)]">{proCount}</span>
            </button>
          </div>

          <div className="h-5 w-px bg-[var(--ws-border-subtle)] shrink-0" aria-hidden="true" />

          {/* Expanding Search Input */}
          <div className="relative flex flex-1 items-center min-w-0 px-1.5">
            <Search
              className="h-3.5 w-3.5 shrink-0 text-[var(--ws-text-muted)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search components"
              className="w-full bg-transparent pl-2 text-xs text-[var(--ws-text-primary)] placeholder:text-[var(--ws-text-muted)] focus:outline-none"
            />
          </div>

          <div className="h-5 w-px bg-[var(--ws-border-subtle)] shrink-0" aria-hidden="true" />

          {/* Grid View & Category Folder View Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setLayoutMode("grid")}
              aria-label="Grid view"
              aria-pressed={layoutMode === "grid"}
              title="Grid view"
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors cursor-pointer",
                layoutMode === "grid"
                  ? "border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] text-[var(--ws-text-primary)] shadow-2xs"
                  : "text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)]"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("available");
                setLayoutMode((m) => (m === "categories" ? "grid" : "categories"));
              }}
              aria-expanded={layoutMode === "categories"}
              aria-label="Category folder view"
              title="Categories"
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors cursor-pointer",
                layoutMode === "categories"
                  ? "border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] text-[var(--ws-text-primary)] shadow-2xs"
                  : "text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)]"
              )}
            >
              <Folder className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Active Category Reset Pill */}
        {category !== "All" && (
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={() => setCategory("All")}
              className="rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] px-3 py-1 text-xs text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] cursor-pointer"
            >
              Category: <strong className="text-[var(--ws-text-primary)]">{category}</strong> · Clear ×
            </button>
          </div>
        )}
      </div>

      {/* Category Overview Cards Mode */}
      {layoutMode === "categories" && viewMode === "available" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {categorySummaries.map((cat) => (
            <div
              key={cat.name}
              className="group flex flex-col rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--ws-border-strong)] hover:shadow-[var(--ws-shadow-floating)]"
            >
              <div className="flex min-h-[240px] w-full items-center justify-center overflow-hidden rounded-[18px] border border-[var(--ws-border-subtle)] bg-[var(--ws-preview-bg)] p-6">
                {cat.previewItem && <ComponentLivePreview slug={cat.previewItem.slug} />}
              </div>
              <button
                type="button"
                onClick={() => {
                  setCategory(cat.name);
                  setLayoutMode("grid");
                }}
                className="flex w-full items-center justify-between px-3 pt-3.5 pb-1.5 text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-[var(--ws-text-secondary)]" aria-hidden="true" />
                  <span className="text-[15px] font-medium text-[var(--ws-text-primary)]">
                    {cat.name}
                  </span>
                  <span className="font-mono text-xs text-[var(--ws-text-muted)]">
                    {cat.count}
                  </span>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 text-[var(--ws-text-secondary)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--ws-text-primary)]"
                  aria-hidden="true"
                />
              </button>
            </div>
          ))}
        </div>
      ) : viewMode === "available" ? (
        availableItems.length === 0 ? (
          <div className="rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-12 text-center text-sm text-[var(--ws-text-secondary)]">
            No live components matched your search.
          </div>
        ) : (
          <div className="space-y-12">
            {groupedAvailable.map(([catName, items]) => (
              <section key={catName} className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-[15px] font-medium text-[var(--ws-text-primary)]">
                    {catName}
                  </h2>
                  <span className="text-xs font-mono text-[var(--ws-text-muted)]">
                    {items.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {items.map((item) => {
                    const largeStage = LARGE_STAGE_SLUGS.has(item.slug);
                    return (
                      <div
                        key={item.slug}
                        className="group flex flex-col rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-2 transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--ws-border-strong)] hover:shadow-[var(--ws-shadow-floating)]"
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center overflow-hidden rounded-[14px] border border-[var(--ws-border-subtle)] bg-[var(--ws-preview-bg)] p-5",
                            largeStage ? "min-h-[245px]" : "min-h-[205px]"
                          )}
                        >
                          <ComponentLivePreview slug={item.slug} />
                        </div>

                        <Link
                          href={`/components/${item.slug}`}
                          className="flex items-center justify-between gap-2 px-2.5 pt-3 pb-1.5 text-[14px] font-medium text-[var(--ws-text-primary)]"
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <span className="truncate">{item.name}</span>
                            {item.tier === "pro" && (
                              <Lock
                                className="h-3 w-3 shrink-0 text-[var(--ws-text-muted)]"
                                aria-label="Pro"
                              />
                            )}
                          </span>
                          <ArrowUpRight
                            className="h-4 w-4 shrink-0 text-[var(--ws-text-secondary)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--ws-text-primary)]"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[var(--ws-text-secondary)]">
            <span>
              Showing <strong className="text-[var(--ws-text-primary)]">{roadmapItems.length}</strong>{" "}
              components across the complete 200+ roadmap.
            </span>
            <span className="inline-flex items-center gap-1 text-[var(--ws-text-muted)]">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Includes planned roadmap items
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {roadmapItems.map((item) => {
              const isLive = item.status === "available";
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex flex-col justify-between rounded-[20px] border p-4 transition-colors",
                    isLive
                      ? "border-[var(--ws-border)] bg-[var(--ws-floating)] hover:border-[var(--ws-border-strong)]"
                      : "border-[var(--ws-border-subtle)] bg-[var(--ws-surface)]/75"
                  )}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-wider">
                      <span className="text-[var(--ws-text-muted)]">{item.category}</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5",
                          isLive
                            ? "bg-[var(--ws-accent)] text-[var(--ws-accent-fg)]"
                            : "bg-[var(--ws-surface-active)] text-[var(--ws-text-secondary)]"
                        )}
                      >
                        {isLive ? "Live" : item.tier}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-[var(--ws-text-primary)]">
                      {item.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-[var(--ws-text-secondary)]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--ws-border-subtle)] flex items-center justify-between">
                    {isLive && item.slug ? (
                      <Link
                        href={`/components/${item.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[var(--ws-text-primary)] hover:underline"
                      >
                        Open preview <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    ) : (
                      <span className="text-[11px] font-mono text-[var(--ws-text-muted)]">
                        Planned
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

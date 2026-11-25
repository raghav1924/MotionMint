"use client";

import React, { useMemo, useState } from "react";
import { Search, Plus, GripVertical } from "lucide-react";
import { FLOW_NODE_DEFINITIONS } from "@/lib/flow/presets";
import type { FlowNodeCategory, FlowNodeDefinition, PocNodeType } from "@/lib/flow/types";
import { cn } from "@/lib/utils";

const CATEGORIES: ("All" | FlowNodeCategory)[] = [
  "All",
  "General",
  "LLMs",
  "Triggers",
  "Data",
  "Logic",
];

interface NodePaletteProps {
  onAddNode: (type: PocNodeType) => void;
  isLocked?: boolean;
}

export function NodePalette({ onAddNode, isLocked = false }: NodePaletteProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | FlowNodeCategory>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FLOW_NODE_DEFINITIONS.filter((def) => {
      if (category !== "All" && def.category !== category) return false;
      if (!q) return true;
      return (
        def.label.toLowerCase().includes(q) ||
        def.description.toLowerCase().includes(q) ||
        def.category.toLowerCase().includes(q) ||
        def.tags.some((t) => t.includes(q))
      );
    });
  }, [query, category]);

  const handleDragStart = (event: React.DragEvent, def: FlowNodeDefinition) => {
    if (isLocked) return;
    event.dataTransfer.setData("application/reactflow", def.type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      aria-label="Node palette"
      className="flex h-full flex-col border-r border-[var(--ws-border)] bg-[var(--ws-surface)]"
    >
      <div className="border-b border-[var(--ws-border-subtle)] p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--ws-text-secondary)]">
            Nodes Library
          </h2>
          <span className="font-mono text-[10px] text-[var(--ws-text-muted)]">
            {filtered.length} / {FLOW_NODE_DEFINITIONS.length}
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
            placeholder="Search nodes..."
            aria-label="Search pipeline nodes"
            className="h-8 w-full rounded-lg border border-[var(--ws-border)] bg-[var(--ws-floating)] pl-8 pr-2.5 text-xs text-[var(--ws-text-primary)] placeholder:text-[var(--ws-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--ws-text-primary)]/20"
          />
        </div>

        <div className="flex flex-wrap gap-1" role="tablist" aria-label="Node categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={category === cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-md px-2 py-1 text-[11px] font-medium transition-colors cursor-pointer",
                category === cat
                  ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                  : "text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
        {filtered.map((def) => (
          <div
            key={def.type}
            draggable={!isLocked}
            onDragStart={(e) => handleDragStart(e, def)}
            className={cn(
              "group flex items-start justify-between gap-2 rounded-xl border border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] p-2.5 transition-colors",
              isLocked
                ? "opacity-50 cursor-not-allowed"
                : "cursor-grab hover:border-[var(--ws-border-strong)] active:cursor-grabbing"
            )}
          >
            <div className="flex min-w-0 items-start gap-2">
              <GripVertical
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ws-text-muted)]"
                aria-hidden="true"
              />
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: def.accent }}
                    aria-hidden="true"
                  />
                  <span className="truncate text-xs font-medium text-[var(--ws-text-primary)]">
                    {def.label}
                  </span>
                </div>
                <p className="text-[11px] leading-snug text-[var(--ws-text-secondary)]">
                  {def.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={isLocked}
              onClick={() => onAddNode(def.type)}
              aria-label={`Add ${def.label} node`}
              title={`Click to add ${def.label}`}
              className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[var(--ws-border)] bg-[var(--ws-surface)] text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)] cursor-pointer disabled:cursor-not-allowed"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="py-6 text-center text-xs text-[var(--ws-text-muted)]">
            No nodes match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </aside>
  );
}

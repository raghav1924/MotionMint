"use client";

import React, { useState, useMemo } from "react";
import { Search, Command, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpotlightCommandItem {
  id: string;
  label: string;
  group?: string;
  shortcut?: string;
}

const DEFAULT_COMMANDS: SpotlightCommandItem[] = [
  { id: "new-scene", label: "Create Spatial Scene", group: "Actions", shortcut: "⌘N" },
  { id: "toggle-theme", label: "Switch Studio Theme", group: "Appearance", shortcut: "⌘T" },
  { id: "copy-cli", label: "Copy Registry CLI Command", group: "Developer", shortcut: "⌘C" },
  { id: "open-docs", label: "Open Component Docs", group: "Navigation", shortcut: "⌘D" },
];

export function SpotlightCommandPalette({
  commands = DEFAULT_COMMANDS,
  className,
}: {
  commands?: SpotlightCommandItem[];
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [lastSelected, setLastSelected] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          (c.group ?? "").toLowerCase().includes(query.toLowerCase())
      ),
    [commands, query]
  );

  return (
    <div
      className={cn(
        "w-full max-w-md overflow-hidden rounded-2xl border border-[var(--mm-border,rgba(255,255,255,0.14))] bg-[var(--mm-surface,#121216)]/95 backdrop-blur-2xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-[var(--mm-border,rgba(255,255,255,0.1))] px-4 py-3">
        <Search className="h-4 w-4 text-[var(--mm-fg-muted,#a1a1aa)]" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIdx(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIdx((i) => (filtered.length ? (i + 1) % filtered.length : 0));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIdx((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
            } else if (e.key === "Enter" && filtered[activeIdx]) {
              setLastSelected(filtered[activeIdx].label);
            }
          }}
          placeholder="Type a command or search..."
          aria-label="Search commands"
          className="flex-1 bg-transparent text-sm text-[var(--mm-fg,#fafafa)] placeholder:text-[var(--mm-fg-muted,#71717a)] outline-none"
        />
        <kbd className="inline-flex items-center gap-0.5 rounded border border-[var(--mm-border,rgba(255,255,255,0.14))] px-1.5 py-0.5 font-mono text-[10px] text-[var(--mm-fg-muted,#a1a1aa)]">
          <Command className="h-2.5 w-2.5" aria-hidden="true" />K
        </kbd>
      </div>

      <ul role="listbox" aria-label="Command suggestions" className="max-h-56 overflow-y-auto p-2 space-y-0.5">
        {filtered.length === 0 ? (
          <li className="px-3 py-6 text-center text-xs text-[var(--mm-fg-muted,#a1a1aa)]">
            No matching commands.
          </li>
        ) : (
          filtered.map((cmd, idx) => {
            const active = idx === activeIdx;
            return (
              <li key={cmd.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setLastSelected(cmd.label)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors cursor-pointer",
                    active
                      ? "bg-[var(--mm-accent-soft,rgba(255,255,255,0.1))] text-[var(--mm-fg,#fafafa)]"
                      : "text-[var(--mm-fg-muted,#a1a1aa)]"
                  )}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <ArrowRight className={cn("h-3 w-3 transition-opacity", active ? "opacity-100" : "opacity-0")} aria-hidden="true" />
                    {cmd.label}
                  </span>
                  {cmd.shortcut && (
                    <span className="font-mono text-[10px] opacity-65">{cmd.shortcut}</span>
                  )}
                </button>
              </li>
            );
          })
        )}
      </ul>

      {lastSelected && (
        <div className="border-t border-[var(--mm-border,rgba(255,255,255,0.08))] px-4 py-2 text-[11px] text-[var(--mm-fg-muted,#a1a1aa)]">
          Executed: <span className="font-medium text-[var(--mm-fg,#fafafa)]">{lastSelected}</span>
        </div>
      )}
    </div>
  );
}

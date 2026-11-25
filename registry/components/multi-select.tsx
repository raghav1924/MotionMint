"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, X, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface MultiSelectOption {
  value: string;
  label: string;
  group?: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (values: string[]) => void;
  maxSelected?: number;
  placeholder?: string;
  disabled?: boolean;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  defaultValue = [],
  onValueChange,
  maxSelected,
  placeholder = "Select items...",
  disabled = false,
  sound,
  haptic,
  className,
}: MultiSelectProps) {
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  const commit = (next: string[]) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const toggleItem = (opt: MultiSelectOption) => {
    if (opt.disabled) return;
    if (selected.includes(opt.value)) {
      triggerInteractionFeedback("click", { sound, haptic });
      commit(selected.filter((v) => v !== opt.value));
    } else {
      if (maxSelected !== undefined && selected.length >= maxSelected) return;
      triggerInteractionFeedback("select", { sound, haptic });
      commit([...selected, opt.value]);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const selectAll = () => {
    const enabled = options.filter((o) => !o.disabled).map((o) => o.value);
    commit(maxSelected !== undefined ? enabled.slice(0, maxSelected) : enabled);
  };

  const clearAll = () => commit([]);

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-sm", className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={open}
        aria-label="Multi-select trigger"
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center justify-between gap-2 rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.18))] bg-[var(--mm-surface,#111114)] px-3 py-1.5 text-sm text-[var(--mm-fg,#fafafa)] cursor-pointer",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 flex-1">
          {selected.length === 0 ? (
            <span className="text-xs text-[var(--mm-fg-subtle,#71717a)]">{placeholder}</span>
          ) : (
            selected.map((val) => {
              const label = options.find((o) => o.value === val)?.label ?? val;
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--mm-accent-soft,rgba(16,185,129,0.14))] px-2 py-0.5 text-xs font-medium text-[var(--mm-accent,#10b981)]"
                >
                  <span>{label}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${label}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      commit(selected.filter((v) => v !== val));
                    }}
                    className="hover:opacity-75 cursor-pointer"
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                  </button>
                </span>
              );
            })
          )}
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 text-[var(--mm-fg-muted)]" aria-hidden="true" />
      </div>

      {open && (
        <div className="absolute left-0 top-full mt-2 z-40 w-full overflow-hidden rounded-[var(--mm-radius,14px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.18))] bg-[var(--mm-surface-elevated,#18181c)] text-[var(--mm-fg,#fafafa)] shadow-xl">
          <div className="flex items-center gap-2 border-b border-[var(--mm-border)] px-3 py-2">
            <Search className="h-3.5 w-3.5 text-[var(--mm-fg-subtle)]" aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search multi-select options"
              className="w-full bg-transparent text-xs outline-none placeholder:text-[var(--mm-fg-subtle)]"
            />
          </div>

          <div className="flex items-center justify-between border-b border-[var(--mm-border)] px-3 py-1.5 text-[11px]">
            <button type="button" onClick={selectAll} className="text-[var(--mm-accent)] hover:underline cursor-pointer">
              Select all
            </button>
            <button type="button" onClick={clearAll} className="text-[var(--mm-fg-muted)] hover:underline cursor-pointer">
              Clear all
            </button>
          </div>

          <ul role="listbox" aria-multiselectable="true" className="max-h-52 overflow-y-auto p-1.5 space-y-0.5">
            {filtered.length === 0 ? (
              <li className="py-4 text-center text-xs text-[var(--mm-fg-muted)]">No matches</li>
            ) : (
              filtered.map((opt) => {
                const isSelected = selected.includes(opt.value);
                const limitReached =
                  !isSelected && maxSelected !== undefined && selected.length >= maxSelected;
                return (
                  <li key={opt.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      disabled={opt.disabled || limitReached}
                      onClick={() => toggleItem(opt)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-[var(--mm-radius-sm,8px)] px-2.5 py-2 text-left text-xs cursor-pointer",
                        "disabled:opacity-40 disabled:pointer-events-none",
                        isSelected
                          ? "bg-[var(--mm-accent-soft)] font-semibold text-[var(--mm-accent)]"
                          : "hover:bg-[var(--mm-surface-subtle)]"
                      )}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

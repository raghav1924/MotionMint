"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
  disabled?: boolean;
}

export interface AnimatedSelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function AnimatedSelect({
  options,
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Select an option...",
  searchable = true,
  isLoading = false,
  disabled = false,
  sound,
  haptic,
  className,
}: AnimatedSelectProps) {
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIdx, setHighlightIdx] = useState(0);
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internal;
  const selectedOption = options.find((o) => o.value === activeValue);

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

  const choose = (opt: SelectOption) => {
    if (opt.disabled) return;
    if (!isControlled) setInternal(opt.value);
    triggerInteractionFeedback("select", { sound, haptic });
    onValueChange?.(opt.value);
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[highlightIdx]) {
      e.preventDefault();
      choose(filtered[highlightIdx]);
    }
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={cn("relative w-full max-w-xs", className)}
    >
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.18))] bg-[var(--mm-surface,#111114)] px-3.5 text-sm text-[var(--mm-fg,#fafafa)] cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] disabled:opacity-50"
        )}
      >
        <span className={!selectedOption ? "text-[var(--mm-fg-subtle,#71717a)]" : undefined}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 text-[var(--mm-fg-muted)] transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className="absolute left-0 top-12 z-40 w-full overflow-hidden rounded-[var(--mm-radius,14px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.18))] bg-[var(--mm-surface-elevated,#18181c)] text-[var(--mm-fg,#fafafa)] shadow-xl"
          >
            {searchable && (
              <div className="flex items-center gap-2 border-b border-[var(--mm-border,rgba(255,255,255,0.08))] px-3 py-2">
                <Search className="h-3.5 w-3.5 text-[var(--mm-fg-subtle)]" aria-hidden="true" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setHighlightIdx(0);
                  }}
                  placeholder="Search options..."
                  aria-label="Filter options"
                  className="w-full bg-transparent text-xs outline-none placeholder:text-[var(--mm-fg-subtle)]"
                />
              </div>
            )}

            <ul role="listbox" className="max-h-56 overflow-y-auto p-1.5 space-y-0.5">
              {isLoading ? (
                <li className="px-3 py-4 text-center text-xs text-[var(--mm-fg-muted)]">
                  Loading options...
                </li>
              ) : filtered.length === 0 ? (
                <li className="px-3 py-4 text-center text-xs text-[var(--mm-fg-muted)]">
                  No matching options
                </li>
              ) : (
                filtered.map((opt, idx) => {
                  const selected = opt.value === activeValue;
                  const highlighted = idx === highlightIdx;
                  return (
                    <li key={opt.value} role="option" aria-selected={selected}>
                      <button
                        type="button"
                        disabled={opt.disabled}
                        onClick={() => choose(opt)}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-[var(--mm-radius-sm,8px)] px-2.5 py-2 text-left text-xs cursor-pointer",
                          "disabled:opacity-40 disabled:pointer-events-none",
                          highlighted && "bg-[var(--mm-accent-soft,rgba(16,185,129,0.14))]",
                          selected && "font-semibold text-[var(--mm-accent,#10b981)]"
                        )}
                      >
                        <span className="truncate">
                          {opt.label}
                          {opt.group && (
                            <span className="ml-2 text-[10px] text-[var(--mm-fg-subtle)]">
                              ({opt.group})
                            </span>
                          )}
                        </span>
                        {selected && <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

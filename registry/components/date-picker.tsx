"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  locale?: string;
  placeholder?: string;
  disabled?: boolean;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function DatePicker({
  value,
  defaultValue = null,
  onValueChange,
  minDate,
  maxDate,
  isDateDisabled,
  locale = "en-US",
  placeholder = "Select date",
  disabled = false,
  sound,
  haptic,
  className,
}: DatePickerProps) {
  const [internal, setInternal] = useState<Date | null>(defaultValue);
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  const [open, setOpen] = useState(false);
  const initialMonth = selected ?? new Date();
  const [viewYear, setViewYear] = useState(initialMonth.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialMonth.getMonth());
  const containerRef = useRef<HTMLDivElement>(null);

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

  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  const displayFormatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isDayDisabled = (d: Date): boolean => {
    const target = startOfDay(d).getTime();
    if (minDate && target < startOfDay(minDate).getTime()) return true;
    if (maxDate && target > startOfDay(maxDate).getTime()) return true;
    if (isDateDisabled?.(d)) return true;
    return false;
  };

  const selectDay = (day: number) => {
    const next = new Date(viewYear, viewMonth, day);
    if (isDayDisabled(next)) return;
    if (!isControlled) setInternal(next);
    triggerInteractionFeedback("select", { sound, haptic });
    onValueChange?.(next);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block w-full max-w-xs", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.18))] bg-[var(--mm-surface,#111114)] px-3.5 text-sm text-[var(--mm-fg,#fafafa)] cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] disabled:opacity-50"
        )}
      >
        <span className={!selected ? "text-[var(--mm-fg-subtle,#71717a)]" : undefined}>
          {selected ? displayFormatter.format(selected) : placeholder}
        </span>
        <CalendarIcon className="h-4 w-4 text-[var(--mm-fg-muted,#a1a1aa)]" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Calendar"
          className="absolute left-0 top-12 z-40 w-72 rounded-[var(--mm-radius,14px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.18))] bg-[var(--mm-surface-elevated,#18181c)] p-3 shadow-xl text-[var(--mm-fg,#fafafa)]"
        >
          <div className="flex items-center justify-between pb-2.5">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--mm-radius-sm,8px)] hover:bg-[var(--mm-surface-subtle)] cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="text-xs font-semibold">
              {monthFormatter.format(new Date(viewYear, viewMonth, 1))}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--mm-radius-sm,8px)] hover:bg-[var(--mm-surface-subtle)] cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-[var(--mm-fg-subtle,#71717a)] pb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <span key={`empty-${idx}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const dateObj = new Date(viewYear, viewMonth, day);
              const dayDisabled = isDayDisabled(dateObj);
              const isSelected = selected ? isSameDay(selected, dateObj) : false;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={dayDisabled}
                  onClick={() => selectDay(day)}
                  aria-label={displayFormatter.format(dateObj)}
                  aria-pressed={isSelected}
                  className={cn(
                    "h-8 w-8 rounded-[var(--mm-radius-sm,8px)] text-xs font-medium cursor-pointer transition-colors",
                    "disabled:opacity-30 disabled:pointer-events-none",
                    isSelected
                      ? "bg-[var(--mm-accent,#10b981)] text-[var(--mm-accent-fg,#03150e)] font-bold"
                      : "hover:bg-[var(--mm-accent-soft,rgba(16,185,129,0.14))]"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

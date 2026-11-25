"use client";

import React, { useState, useEffect } from "react";
import { Cookie, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentProps {
  onSavePreferences?: (prefs: CookiePreferences) => void;
  storageKey?: string;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function CookieConsent({
  onSavePreferences,
  storageKey,
  sound,
  haptic,
  className,
}: CookieConsentProps) {
  const [customising, setCustomising] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [savedPrefs, setSavedPrefs] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as CookiePreferences;
        setAnalytics(Boolean(parsed.analytics));
        setMarketing(Boolean(parsed.marketing));
        setSavedPrefs({ necessary: true, analytics: Boolean(parsed.analytics), marketing: Boolean(parsed.marketing) });
      }
    } catch {
      // Ignore storage errors
    }
  }, [storageKey]);

  const commit = (prefs: CookiePreferences) => {
    setAnalytics(prefs.analytics);
    setMarketing(prefs.marketing);
    setSavedPrefs(prefs);
    setCustomising(false);
    if (storageKey && typeof window !== "undefined") {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(prefs));
      } catch {
        // Ignore storage errors
      }
    }
    triggerInteractionFeedback("success", { sound, haptic });
    onSavePreferences?.(prefs);
  };

  return (
    <section
      aria-label="Cookie preferences"
      className={cn(
        "w-full max-w-lg rounded-[var(--mm-radius,14px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.18))] bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)] p-5 shadow-[var(--mm-shadow)] space-y-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-[var(--mm-accent,#10b981)]" aria-hidden="true" />
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">Privacy &amp; Cookie Preferences</h3>
          <p className="text-xs leading-relaxed text-[var(--mm-fg-muted,#a1a1aa)]">
            Manage consent categories below. Your application must wire{" "}
            <code className="font-mono">onSavePreferences</code> before loading any
            optional scripts.
          </p>
        </div>
      </div>

      {customising && (
        <div className="space-y-2.5 rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border)] bg-[var(--mm-surface-subtle,#141418)] p-3.5 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Necessary</p>
              <p className="text-[11px] text-[var(--mm-fg-subtle)]">Required for core site security.</p>
            </div>
            <span className="font-mono text-[10px] uppercase text-[var(--mm-accent)]">Always On</span>
          </div>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-semibold">Analytics</p>
              <p className="text-[11px] text-[var(--mm-fg-subtle)]">Aggregate product telemetry.</p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              aria-label="Analytics cookies"
              className="h-4 w-4 accent-[var(--mm-accent,#10b981)]"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-semibold">Marketing</p>
              <p className="text-[11px] text-[var(--mm-fg-subtle)]">Campaign attribution cookies.</p>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              aria-label="Marketing cookies"
              className="h-4 w-4 accent-[var(--mm-accent,#10b981)]"
            />
          </label>
        </div>
      )}

      {savedPrefs && !customising && (
        <p role="status" className="font-mono text-[11px] text-[var(--mm-accent,#10b981)]">
          Saved: Necessary=true, Analytics={String(savedPrefs.analytics)}, Marketing={String(savedPrefs.marketing)}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setCustomising((c) => !c)}
          className="inline-flex items-center gap-1.5 rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border)] px-3 py-1.5 text-xs font-medium text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)] cursor-pointer"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          {customising ? "Hide Options" : "Customise"}
        </button>

        <button
          type="button"
          onClick={() => commit({ necessary: true, analytics: false, marketing: false })}
          className="rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border-strong)] px-3 py-1.5 text-xs font-medium text-[var(--mm-fg)] cursor-pointer"
        >
          Reject Optional
        </button>

        {customising ? (
          <button
            type="button"
            onClick={() => commit({ necessary: true, analytics, marketing })}
            className="rounded-[var(--mm-radius-sm,8px)] bg-[var(--mm-accent,#10b981)] px-3.5 py-1.5 text-xs font-semibold text-[var(--mm-accent-fg,#03150e)] cursor-pointer"
          >
            Save Preferences
          </button>
        ) : (
          <button
            type="button"
            onClick={() => commit({ necessary: true, analytics: true, marketing: true })}
            className="rounded-[var(--mm-radius-sm,8px)] bg-[var(--mm-accent,#10b981)] px-3.5 py-1.5 text-xs font-semibold text-[var(--mm-accent-fg,#03150e)] cursor-pointer"
          >
            Accept All
          </button>
        )}
      </div>
    </section>
  );
}

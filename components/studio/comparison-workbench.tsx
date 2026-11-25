"use client";

import React, { useState } from "react";
import { RotateCcw, Sun, Moon, Plus, X } from "lucide-react";
import { ALL_THEMES, getThemeById } from "@/lib/themes/registry";
import type { ComponentThemeMode, ThemeId } from "@/lib/themes/types";
import { MotionMintTheme } from "@/components/theme/theme-scope";
import { cn } from "@/lib/utils";

export interface ComparisonSpecimen {
  id: string;
  themeId: ThemeId;
  mode: ComponentThemeMode;
}

const DEFAULT_SPECIMENS: ComparisonSpecimen[] = [
  { id: "spec-1", themeId: "minimalism", mode: "light" },
  { id: "spec-2", themeId: "neo-brutalism", mode: "light" },
  { id: "spec-3", themeId: "cyberpunk", mode: "dark" },
  { id: "spec-4", themeId: "victorian", mode: "dark" },
];

export function ComparisonWorkbench({
  title = "Side-by-Side Comparison Workbench",
  subtitle = "Compare identical component props across isolated <MotionMintTheme> scopes without affecting the website chrome.",
  initialSpecimens = DEFAULT_SPECIMENS,
  renderSpecimen,
}: {
  title?: string;
  subtitle?: string;
  initialSpecimens?: ComparisonSpecimen[];
  renderSpecimen: (specimen: ComparisonSpecimen) => React.ReactNode;
}) {
  const [specimens, setSpecimens] = useState<ComparisonSpecimen[]>(initialSpecimens);
  const [resetEpoch, setResetEpoch] = useState(0);

  const updateSpecimen = (
    id: string,
    patch: Partial<Pick<ComparisonSpecimen, "themeId" | "mode">>
  ) => {
    setSpecimens((prev) =>
      prev.map((spec) => (spec.id === id ? { ...spec, ...patch } : spec))
    );
  };

  const addSpecimen = () => {
    if (specimens.length >= 6) return;
    const nextIdx = specimens.length % ALL_THEMES.length;
    setSpecimens((prev) => [
      ...prev,
      {
        id: `spec-${Date.now()}`,
        themeId: ALL_THEMES[nextIdx].id,
        mode: prev.length % 2 === 0 ? "light" : "dark",
      },
    ]);
  };

  const removeSpecimen = (id: string) => {
    if (specimens.length <= 2) return;
    setSpecimens((prev) => prev.filter((spec) => spec.id !== id));
  };

  const handleResetAll = () => {
    setResetEpoch((e) => e + 1);
  };

  return (
    <div
      aria-label={title}
      className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-surface)] p-5 sm:p-6 space-y-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ws-border)] pb-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-[var(--ws-text-primary)]">
            {title}
          </h2>
          <p className="text-xs text-[var(--ws-text-secondary)]">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {specimens.length < 6 && (
            <button
              type="button"
              onClick={addSpecimen}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[var(--ws-border)] bg-[var(--ws-bg)] px-3 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Add Specimen</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleResetAll}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[var(--ws-border)] bg-[var(--ws-bg)] px-3 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset All Specimens</span>
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {specimens.map((spec) => {
          const def = getThemeById(spec.themeId);
          return (
            <div
              key={`${spec.id}-${resetEpoch}`}
              className="flex flex-col rounded-xl border border-[var(--ws-border)] bg-[var(--ws-bg)] p-3 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <select
                    aria-label={`Select theme for specimen ${def.name}`}
                    value={spec.themeId}
                    onChange={(e) =>
                      updateSpecimen(spec.id, { themeId: e.target.value as ThemeId })
                    }
                    className="h-7 rounded-lg border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2 text-xs font-medium text-[var(--ws-text-primary)] cursor-pointer"
                  >
                    {ALL_THEMES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>

                  <div
                    role="group"
                    aria-label={`Mode for ${def.name}`}
                    className="inline-flex rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] p-0.5 text-[11px]"
                  >
                    {(["light", "dark"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => updateSpecimen(spec.id, { mode: m })}
                        aria-pressed={spec.mode === m}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 capitalize cursor-pointer transition-colors",
                          spec.mode === m
                            ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                            : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                        )}
                      >
                        {m === "light" ? (
                          <Sun className="h-2.5 w-2.5" aria-hidden="true" />
                        ) : (
                          <Moon className="h-2.5 w-2.5" aria-hidden="true" />
                        )}
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {specimens.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeSpecimen(spec.id)}
                    aria-label={`Remove ${def.name} specimen`}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[var(--ws-text-muted)] hover:bg-[var(--ws-surface)] hover:text-[var(--ws-text-primary)] cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>

              <MotionMintTheme
                theme={spec.themeId}
                mode={spec.mode}
                className="flex min-h-[190px] w-full items-center justify-center overflow-hidden rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] p-5"
              >
                {renderSpecimen(spec)}
              </MotionMintTheme>
            </div>
          );
        })}
      </div>
    </div>
  );
}

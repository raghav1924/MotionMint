"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Copy,
  Download,
  Grid,
  Maximize2,
  Minus,
  Moon,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sun,
  Trash2,
  X,
} from "lucide-react";
import { CATALOG_ITEMS, getCatalogItem } from "@/lib/catalog";
import { ALL_THEMES } from "@/lib/themes/registry";
import type { ThemeId } from "@/lib/themes/types";

type ThemeMode = "light" | "dark";
import { RenderJoyTheme } from "@/components/theme/theme-scope";
import { ComponentLivePreview } from "@/components/shared/component-preview-card";
import { cn } from "@/lib/utils";

export interface BenchSpecimen {
  id: string;
  slug: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  theme: ThemeId;
  themeMode: ThemeMode;
  replayNonce: number;
}

const STORAGE_KEY = "renderjoy-bench-board-v1";
const GRID_STEP = 20;

export const DEFAULT_BENCH_SPECIMENS: BenchSpecimen[] = [
  {
    id: "spec-ripple-light",
    slug: "ripple-button",
    title: "Ripple Button · Minimalism Light",
    x: 80,
    y: 90,
    width: 320,
    height: 240,
    theme: "minimalism",
    themeMode: "light",
    replayNonce: 0,
  },
  {
    id: "spec-ripple-dark",
    slug: "ripple-button",
    title: "Ripple Button · Cyberpunk Dark",
    x: 440,
    y: 90,
    width: 320,
    height: 240,
    theme: "cyberpunk",
    themeMode: "dark",
    replayNonce: 0,
  },
  {
    id: "spec-thinking",
    slug: "thinking-loader",
    title: "Thinking Loader · Glassmorphism",
    x: 80,
    y: 370,
    width: 320,
    height: 240,
    theme: "glassmorphism",
    themeMode: "dark",
    replayNonce: 0,
  },
  {
    id: "spec-flare",
    slug: "logo-flare",
    title: "Logo Flare · WebGL",
    x: 440,
    y: 370,
    width: 360,
    height: 260,
    theme: "minimalism",
    themeMode: "dark",
    replayNonce: 0,
  },
];

function snapValue(val: number, snap: boolean): number {
  return snap ? Math.round(val / GRID_STEP) * GRID_STEP : Math.round(val);
}

export function BenchWorkspace() {
  const [specimens, setSpecimens] = useState<BenchSpecimen[]>(DEFAULT_BENCH_SPECIMENS);
  const [hydrated, setHydrated] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(DEFAULT_BENCH_SPECIMENS[0].id);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerQuery, setPickerQuery] = useState("");
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const dragRef = useRef<{
    type: "pan" | "move" | "resize";
    id?: string;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const implementedCatalog = useMemo(
    () => CATALOG_ITEMS.filter((item) => item.status === "implemented" && item.slug !== "shader-background"),
    []
  );

  const filteredCatalog = useMemo(() => {
    const q = pickerQuery.trim().toLowerCase();
    if (!q) return implementedCatalog;
    return implementedCatalog.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q)
    );
  }, [implementedCatalog, pickerQuery]);

  // Restore persisted board from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as BenchSpecimen[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSpecimens(parsed);
          setSelectedId(parsed[0].id);
        }
      }
    } catch {
      // Ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Save board locally on change
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(specimens));
    } catch {
      // Ignore storage quota errors
    }
  }, [hydrated, specimens]);

  const selectedSpecimen = useMemo(
    () => specimens.find((s) => s.id === selectedId) ?? null,
    [specimens, selectedId]
  );

  const updateSpecimen = useCallback((id: string, patch: Partial<BenchSpecimen>) => {
    setSpecimens((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }, []);

  const addSpecimen = useCallback(
    (slug: string) => {
      const meta = getCatalogItem(slug);
      if (!meta) return;
      const idx = specimens.length;
      const next: BenchSpecimen = {
        id: `spec-${slug}-${Date.now()}`,
        slug,
        title: meta.name,
        x: snapValue(120 + (idx % 3) * 60, snapToGrid),
        y: snapValue(120 + (idx % 4) * 50, snapToGrid),
        width: meta.category === "Backgrounds" ? 360 : 320,
        height: meta.category === "Backgrounds" ? 260 : 240,
        theme: "minimalism",
        themeMode: "light",
        replayNonce: 0,
      };
      setSpecimens((prev) => [...prev, next]);
      setSelectedId(next.id);
      setPickerOpen(false);
    },
    [snapToGrid, specimens.length]
  );

  const duplicateSpecimen = useCallback(
    (id: string) => {
      const src = specimens.find((s) => s.id === id);
      if (!src) return;
      const copy: BenchSpecimen = {
        ...src,
        id: `spec-${src.slug}-${Date.now()}`,
        title: `${src.title} Copy`,
        x: snapValue(src.x + 40, snapToGrid),
        y: snapValue(src.y + 40, snapToGrid),
      };
      setSpecimens((prev) => [...prev, copy]);
      setSelectedId(copy.id);
    },
    [snapToGrid, specimens]
  );

  const removeSpecimen = useCallback(
    (id: string) => {
      setSpecimens((prev) => prev.filter((s) => s.id !== id));
      if (selectedId === id) {
        setSelectedId(null);
      }
    },
    [selectedId]
  );

  const fitView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const resetBoard = useCallback(() => {
    setSpecimens(DEFAULT_BENCH_SPECIMENS);
    setSelectedId(DEFAULT_BENCH_SPECIMENS[0].id);
    fitView();
  }, [fitView]);

  const replayAll = useCallback(() => {
    setSpecimens((prev) => prev.map((s) => ({ ...s, replayNonce: s.replayNonce + 1 })));
  }, []);

  const exportBoardJson = useCallback(async () => {
    const payload = JSON.stringify({ version: 1, specimens }, null, 2);
    try {
      await navigator.clipboard?.writeText(payload);
      setExportStatus("Copied JSON");
    } catch {
      setExportStatus("Exported");
    }
    window.setTimeout(() => setExportStatus(null), 1800);
  }, [specimens]);

  // Keyboard shortcuts (+/-/0, arrow nudge, delete)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "=" || e.key === "+") {
        e.preventDefault();
        setZoom((z) => Math.min(2, Number((z + 0.1).toFixed(2))));
      } else if (e.key === "-") {
        e.preventDefault();
        setZoom((z) => Math.max(0.4, Number((z - 0.1).toFixed(2))));
      } else if (e.key === "0") {
        e.preventDefault();
        fitView();
      } else if (selectedId && (e.key === "Delete" || e.key === "Backspace")) {
        e.preventDefault();
        removeSpecimen(selectedId);
      } else if (selectedId && selectedSpecimen) {
        const step = snapToGrid ? GRID_STEP : 10;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          updateSpecimen(selectedId, { x: selectedSpecimen.x - step });
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          updateSpecimen(selectedId, { x: selectedSpecimen.x + step });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          updateSpecimen(selectedId, { y: selectedSpecimen.y - step });
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          updateSpecimen(selectedId, { y: selectedSpecimen.y + step });
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fitView, removeSpecimen, selectedId, selectedSpecimen, snapToGrid, updateSpecimen]);

  // Pointer drag/pan/resize handlers
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      if (d.type === "pan") {
        setPan({ x: d.originX + dx, y: d.originY + dy });
      } else if (d.type === "move" && d.id) {
        updateSpecimen(d.id, {
          x: snapValue(d.originX + dx / zoom, snapToGrid),
          y: snapValue(d.originY + dy / zoom, snapToGrid),
        });
      } else if (d.type === "resize" && d.id) {
        updateSpecimen(d.id, {
          width: Math.max(220, snapValue(d.originX + dx / zoom, snapToGrid)),
          height: Math.max(180, snapValue(d.originY + dy / zoom, snapToGrid)),
        });
      }
    };
    const onPointerUp = () => {
      dragRef.current = null;
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [snapToGrid, updateSpecimen, zoom]);

  return (
    <section
      aria-label="RenderJoy Bench workspace"
      className="relative min-h-[calc(100vh-24px)] w-full overflow-hidden bg-[var(--ws-preview-bg)]"
    >
      {/* Desktop / Tablet Interactive Dot-Grid Canvas */}
      <div
        data-bench-canvas="true"
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
            setSelectedId(null);
            dragRef.current = {
              type: "pan",
              startX: e.clientX,
              startY: e.clientY,
              originX: pan.x,
              originY: pan.y,
            };
          }
        }}
        className="hidden md:block relative h-screen w-full cursor-grab active:cursor-grabbing bg-[radial-gradient(var(--ws-dot-grid)_1.25px,transparent_1.25px)] [background-size:20px_20px]"
      >
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          }}
        >
          {specimens.map((spec) => {
            const selected = spec.id === selectedId;
            return (
              <div
                key={spec.id}
                data-bench-specimen={spec.slug}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setSelectedId(spec.id);
                }}
                style={{
                  left: spec.x,
                  top: spec.y,
                  width: spec.width,
                  height: spec.height,
                }}
                className={cn(
                  "absolute flex flex-col overflow-hidden rounded-[20px] border bg-[var(--ws-surface)] shadow-[var(--ws-shadow-floating)] transition-shadow",
                  selected
                    ? "border-[var(--ws-text-primary)] ring-2 ring-[var(--ws-ring)]"
                    : "border-[var(--ws-border)]"
                )}
              >
                {/* Drag Handle Header */}
                <div
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setSelectedId(spec.id);
                    dragRef.current = {
                      type: "move",
                      id: spec.id,
                      startX: e.clientX,
                      startY: e.clientY,
                      originX: spec.x,
                      originY: spec.y,
                    };
                  }}
                  className="flex h-8 shrink-0 cursor-move items-center justify-between gap-2 border-b border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] px-3 text-[11px]"
                >
                  <span className="truncate font-medium text-[var(--ws-text-primary)]">
                    {spec.title}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[9px] text-[var(--ws-text-muted)]">
                    <span>{spec.theme}</span>
                    <span>·</span>
                    <span>{spec.themeMode}</span>
                  </div>
                </div>

                {/* Scoped Live Specimen */}
                <div
                  key={spec.replayNonce}
                  className="relative flex flex-1 items-center justify-center overflow-hidden p-3"
                >
                  <RenderJoyTheme
                    theme={spec.theme}
                    mode={spec.themeMode}
                    className="flex h-full w-full items-center justify-center rounded-[12px] p-2"
                  >
                    <ComponentLivePreview slug={spec.slug} />
                  </RenderJoyTheme>
                </div>

                {/* Resize Handle */}
                <button
                  type="button"
                  aria-label={`Resize ${spec.title}`}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setSelectedId(spec.id);
                    dragRef.current = {
                      type: "resize",
                      id: spec.id,
                      startX: e.clientX,
                      startY: e.clientY,
                      originX: spec.width,
                      originY: spec.height,
                    };
                  }}
                  className="absolute right-1 bottom-1 h-3.5 w-3.5 cursor-nwse-resize rounded-sm border-r-2 border-b-2 border-[var(--ws-text-muted)]/60"
                />
              </div>
            );
          })}
        </div>

        {/* Minimap Overview */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-20 left-5 z-20 hidden h-28 w-44 overflow-hidden rounded-xl border border-[var(--ws-border)] bg-[var(--ws-floating)]/90 p-2 backdrop-blur-md lg:block"
        >
          <p className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--ws-text-muted)]">
            Bench Overview ({specimens.length})
          </p>
          <div className="relative h-20 w-full">
            {specimens.map((spec) => (
              <div
                key={spec.id}
                style={{
                  left: Math.max(0, Math.min(140, spec.x * 0.1)),
                  top: Math.max(0, Math.min(60, spec.y * 0.1)),
                  width: Math.max(10, spec.width * 0.1),
                  height: Math.max(8, spec.height * 0.1),
                }}
                className={cn(
                  "absolute rounded-[2px] border",
                  spec.id === selectedId
                    ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)]/30"
                    : "border-[var(--ws-border-strong)] bg-[var(--ws-text-muted)]/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Graceful List View (<768px) */}
      <div className="md:hidden px-4 pt-20 pb-28 space-y-4">
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--ws-text-muted)]">
            RENDERJOY BENCH
          </p>
          <h1 className="text-xl font-semibold text-[var(--ws-text-primary)]">
            Side-by-Side Specimen Board
          </h1>
        </div>
        {specimens.map((spec) => (
          <div
            key={spec.id}
            className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-surface)] p-3 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-xs font-semibold text-[var(--ws-text-primary)]">
                {spec.title}
              </span>
              <button
                type="button"
                onClick={() => removeSpecimen(spec.id)}
                aria-label={`Remove ${spec.title}`}
                className="text-[var(--ws-text-muted)] hover:text-[var(--ws-text-primary)]"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
            <RenderJoyTheme
              theme={spec.theme}
              mode={spec.themeMode}
              className="flex min-h-[160px] items-center justify-center rounded-xl p-3"
            >
              <ComponentLivePreview slug={spec.slug} />
            </RenderJoyTheme>
          </div>
        ))}
      </div>

      {/* Compact Floating Specimen Inspector */}
      {inspectorOpen && selectedSpecimen && (
        <aside
          aria-label="Specimen inspector"
          className="fixed top-24 right-5 z-30 hidden w-[264px] rounded-[18px] border border-[var(--ws-border)] bg-[var(--ws-floating)]/95 p-3.5 shadow-[var(--ws-shadow-menu)] backdrop-blur-xl md:block space-y-3 text-xs"
        >
          <div className="flex items-center justify-between border-b border-[var(--ws-border-subtle)] pb-2">
            <span className="font-semibold text-[var(--ws-text-primary)]">Inspector</span>
            <button
              type="button"
              onClick={() => setInspectorOpen(false)}
              aria-label="Close inspector"
              className="rounded p-1 text-[var(--ws-text-muted)] hover:text-[var(--ws-text-primary)] cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <label className="block space-y-1">
            <span className="text-[11px] text-[var(--ws-text-secondary)]">Label</span>
            <input
              type="text"
              value={selectedSpecimen.title}
              onChange={(e) => updateSpecimen(selectedSpecimen.id, { title: e.target.value })}
              className="h-7 w-full rounded-lg border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2 text-xs text-[var(--ws-text-primary)]"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-[11px] text-[var(--ws-text-secondary)]">Component Theme</span>
            <select
              aria-label="Specimen theme"
              value={selectedSpecimen.theme}
              onChange={(e) =>
                updateSpecimen(selectedSpecimen.id, { theme: e.target.value as ThemeId })
              }
              className="h-7 w-full rounded-lg border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2 text-xs text-[var(--ws-text-primary)]"
            >
              {ALL_THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[var(--ws-text-secondary)]">Component Mode</span>
            <div className="flex rounded-full border border-[var(--ws-border)] p-0.5">
              <button
                type="button"
                onClick={() => updateSpecimen(selectedSpecimen.id, { themeMode: "light" })}
                aria-label="Specimen light mode"
                className={cn(
                  "rounded-full p-1 cursor-pointer",
                  selectedSpecimen.themeMode === "light"
                    ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                    : "text-[var(--ws-text-secondary)]"
                )}
              >
                <Sun className="h-3 w-3" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => updateSpecimen(selectedSpecimen.id, { themeMode: "dark" })}
                aria-label="Specimen dark mode"
                className={cn(
                  "rounded-full p-1 cursor-pointer",
                  selectedSpecimen.themeMode === "dark"
                    ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                    : "text-[var(--ws-text-secondary)]"
                )}
              >
                <Moon className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label className="block space-y-1">
              <span className="text-[11px] text-[var(--ws-text-secondary)]">Width</span>
              <input
                type="number"
                min={220}
                max={900}
                value={selectedSpecimen.width}
                onChange={(e) =>
                  updateSpecimen(selectedSpecimen.id, { width: Math.max(220, Number(e.target.value)) })
                }
                className="h-7 w-full rounded-lg border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2 text-xs text-[var(--ws-text-primary)]"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-[11px] text-[var(--ws-text-secondary)]">Height</span>
              <input
                type="number"
                min={180}
                max={700}
                value={selectedSpecimen.height}
                onChange={(e) =>
                  updateSpecimen(selectedSpecimen.id, { height: Math.max(180, Number(e.target.value)) })
                }
                className="h-7 w-full rounded-lg border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2 text-xs text-[var(--ws-text-primary)]"
              />
            </label>
          </div>

          <div className="flex items-center gap-1.5 border-t border-[var(--ws-border-subtle)] pt-2">
            <button
              type="button"
              onClick={() => duplicateSpecimen(selectedSpecimen.id)}
              className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[var(--ws-border)] py-1.5 text-[11px] text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
            >
              <Copy className="h-3 w-3" aria-hidden="true" />
              Duplicate
            </button>
            <button
              type="button"
              onClick={() => removeSpecimen(selectedSpecimen.id)}
              className="flex items-center justify-center gap-1 rounded-lg border border-[var(--ws-border)] px-2.5 py-1.5 text-[11px] text-rose-500 hover:bg-rose-500/10 cursor-pointer"
            >
              <Trash2 className="h-3 w-3" aria-hidden="true" />
              Remove
            </button>
          </div>
        </aside>
      )}

      {/* Add Specimen Modal Picker */}
      {pickerOpen && (
        <div
          role="dialog"
          aria-label="Add specimen to Bench"
          className="fixed bottom-16 left-1/2 z-40 w-[340px] max-w-[92vw] -translate-x-1/2 rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)] p-3 shadow-[var(--ws-shadow-menu)] backdrop-blur-xl space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--ws-text-primary)]">
              Add Specimen ({implementedCatalog.length})
            </span>
            <button
              type="button"
              onClick={() => setPickerOpen(false)}
              aria-label="Close specimen picker"
              className="rounded p-1 text-[var(--ws-text-muted)] hover:text-[var(--ws-text-primary)] cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[var(--ws-text-muted)]" aria-hidden="true" />
            <input
              type="search"
              aria-label="Search specimens"
              value={pickerQuery}
              onChange={(e) => setPickerQuery(e.target.value)}
              placeholder="Search components…"
              className="h-8 w-full rounded-lg border border-[var(--ws-border)] bg-[var(--ws-surface)] pl-8 pr-2 text-xs text-[var(--ws-text-primary)]"
            />
          </div>
          <div className="max-h-56 overflow-y-auto space-y-1">
            {filteredCatalog.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => addSpecimen(item.slug)}
                className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs hover:bg-[var(--ws-surface-hover)] cursor-pointer"
              >
                <span className="truncate font-medium text-[var(--ws-text-primary)]">{item.name}</span>
                <span className="font-mono text-[10px] text-[var(--ws-text-muted)]">{item.category}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bench Bottom Floating Toolbar */}
      <div
        role="toolbar"
        aria-label="Bench controls"
        className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)]/90 px-2 py-1 shadow-[var(--ws-shadow-menu)] backdrop-blur-xl text-xs"
      >
        <button
          type="button"
          onClick={() => setPickerOpen((o) => !o)}
          className="inline-flex h-7 items-center gap-1 rounded-full bg-[var(--ws-text-primary)] px-3 text-[11px] font-medium text-[var(--ws-bg)] cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add
        </button>

        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(0.4, Number((z - 0.1).toFixed(2))))}
          aria-label="Zoom out"
          title="Zoom out (-)"
          className="hidden sm:inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
        >
          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <span className="hidden sm:inline-block w-10 text-center font-mono text-[10px] text-[var(--ws-text-secondary)]">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(2, Number((z + 0.1).toFixed(2))))}
          aria-label="Zoom in"
          title="Zoom in (+)"
          className="hidden sm:inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={fitView}
          aria-label="Fit view"
          title="Fit view (0)"
          className="hidden sm:inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
        >
          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => setSnapToGrid((s) => !s)}
          aria-pressed={snapToGrid}
          aria-label="Toggle grid snap"
          title="Snap to grid"
          className={cn(
            "hidden md:inline-flex h-7 w-7 items-center justify-center rounded-full cursor-pointer",
            snapToGrid
              ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
              : "text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)]"
          )}
        >
          <Grid className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => setInspectorOpen((o) => !o)}
          aria-pressed={inspectorOpen}
          aria-label="Toggle inspector"
          title="Inspect"
          className={cn(
            "hidden md:inline-flex h-7 w-7 items-center justify-center rounded-full cursor-pointer",
            inspectorOpen
              ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
              : "text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)]"
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={replayAll}
          aria-label="Replay all specimens"
          title="Replay all"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={exportBoardJson}
          aria-label="Export board JSON"
          title="Export JSON"
          className="inline-flex h-7 items-center gap-1 rounded-full px-2 text-[11px] text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          {exportStatus && <span className="font-mono text-[10px]">{exportStatus}</span>}
        </button>

        <button
          type="button"
          onClick={resetBoard}
          className="inline-flex h-7 items-center rounded-full px-2.5 text-[11px] text-[var(--ws-text-muted)] hover:text-[var(--ws-text-primary)] cursor-pointer"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

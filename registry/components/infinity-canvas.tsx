"use client";

import React, { useState, useRef } from "react";
import { ZoomIn, ZoomOut, Maximize, RotateCcw, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CanvasObject {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface InfinityCanvasProps {
  items?: CanvasObject[];
  onItemsChange?: (items: CanvasObject[]) => void;
  className?: string;
}

const DEFAULT_ITEMS: CanvasObject[] = [
  { id: "n1", label: "Trigger Node", x: 40, y: 40 },
  { id: "n2", label: "Transform", x: 200, y: 110 },
];

export function InfinityCanvas({
  items: controlledItems,
  onItemsChange,
  className,
}: InfinityCanvasProps) {
  const [internalItems, setInternalItems] = useState<CanvasObject[]>(DEFAULT_ITEMS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const panningRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(
    null
  );

  const items = controlledItems ?? internalItems;
  const updateItems = (next: CanvasObject[]) => {
    if (!controlledItems) setInternalItems(next);
    onItemsChange?.(next);
  };

  const clampZoom = (z: number) => Math.min(Math.max(Number(z.toFixed(2)), 0.5), 2);

  const resetViewport = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const addObject = () => {
    const idx = items.length + 1;
    updateItems([
      ...items,
      { id: `n-${Date.now()}`, label: `Node ${idx}`, x: 50 + idx * 24, y: 40 + idx * 20 },
    ]);
  };

  return (
    <div
      tabIndex={0}
      aria-label="Infinity canvas workspace"
      onKeyDown={(e) => {
        if (e.key === "=" || e.key === "+") setZoom((z) => clampZoom(z + 0.15));
        else if (e.key === "-") setZoom((z) => clampZoom(z - 0.15));
        else if (e.key === "0") resetViewport();
      }}
      className={cn(
        "relative h-72 w-full overflow-hidden rounded-[var(--mm-radius,14px)] border border-[var(--mm-border-strong)] bg-[var(--mm-surface-subtle,#141418)] text-[var(--mm-fg,#fafafa)] select-none outline-none",
        className
      )}
      style={{
        backgroundImage: "radial-gradient(var(--mm-border-strong, rgba(255,255,255,0.16)) 1px, transparent 1px)",
        backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
        backgroundPosition: `${pan.x}px ${pan.y}px`,
      }}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedId(null);
          panningRef.current = { startX: e.clientX, startY: e.clientY, ox: pan.x, oy: pan.y };
        }
      }}
      onPointerMove={(e) => {
        if (!panningRef.current) return;
        setPan({
          x: panningRef.current.ox + (e.clientX - panningRef.current.startX),
          y: panningRef.current.oy + (e.clientY - panningRef.current.startY),
        });
      }}
      onPointerUp={() => {
        panningRef.current = null;
      }}
    >
      {/* Transformed Layer */}
      <div
        className="absolute inset-0 origin-top-left"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
      >
        {items.map((item) => {
          const selected = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(item.id);
              }}
              style={{ left: item.x, top: item.y }}
              className={cn(
                "absolute rounded-[var(--mm-radius-sm,8px)] border px-3 py-2 text-xs font-medium shadow-md cursor-pointer",
                selected
                  ? "border-[var(--mm-accent,#10b981)] bg-[var(--mm-accent-soft)] text-[var(--mm-fg)] ring-2 ring-[var(--mm-ring,#10b981)]"
                  : "border-[var(--mm-border-strong)] bg-[var(--mm-surface-elevated,#18181c)] text-[var(--mm-fg)]"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Contextual Viewport Controls */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border-strong)] bg-[var(--mm-surface,#111114)]/90 p-1 text-xs backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setZoom((z) => clampZoom(z - 0.15))}
          aria-label="Zoom out"
          className="p-1.5 rounded hover:bg-[var(--mm-surface-elevated)] cursor-pointer"
        >
          <ZoomOut className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <span className="px-1.5 font-mono text-[11px] tabular-nums">{Math.round(zoom * 100)}%</span>
        <button
          type="button"
          onClick={() => setZoom((z) => clampZoom(z + 0.15))}
          aria-label="Zoom in"
          className="p-1.5 rounded hover:bg-[var(--mm-surface-elevated)] cursor-pointer"
        >
          <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={resetViewport}
          aria-label="Fit and reset viewport"
          className="p-1.5 rounded hover:bg-[var(--mm-surface-elevated)] cursor-pointer"
        >
          <Maximize className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={addObject}
          aria-label="Add canvas object"
          className="inline-flex items-center gap-1 rounded bg-[var(--mm-accent,#10b981)] px-2 py-1 text-[11px] font-semibold text-[var(--mm-accent-fg,#03150e)] cursor-pointer"
        >
          <Plus className="h-3 w-3" aria-hidden="true" />
          Add
        </button>
      </div>

      <button
        type="button"
        onClick={resetViewport}
        aria-label="Reset canvas"
        className="absolute top-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--mm-border)] bg-[var(--mm-surface)]/85 text-[var(--mm-fg-muted)] cursor-pointer"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

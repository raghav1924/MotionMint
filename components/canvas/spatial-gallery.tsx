"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus, RotateCcw } from "lucide-react";
import { ComponentLivePreview } from "@/components/shared/component-preview-card";
import { cn } from "@/lib/utils";

interface SpatialNode {
  id: string;
  slug: string;
  title: string;
  x: number;
  y: number;
  w: number;
}

const INITIAL_NODES: SpatialNode[] = [
  { id: "n1", slug: "card-stack", title: "Card Stack", x: 60, y: 60, w: 320 },
  { id: "n2", slug: "physical-knob", title: "Physical Knob", x: 430, y: 40, w: 260 },
  { id: "n3", slug: "notch", title: "Notch", x: 740, y: 90, w: 340 },
  { id: "n4", slug: "receipt-printer", title: "Receipt Printer", x: 120, y: 380, w: 300 },
  { id: "n5", slug: "reaction-arc", title: "Reaction Arc", x: 470, y: 330, w: 280 },
  { id: "n6", slug: "date-picker", title: "Date Picker", x: 800, y: 360, w: 310 },
  { id: "n7", slug: "scratch-card", title: "Scratch Card", x: 1150, y: 120, w: 300 },
  { id: "n8", slug: "ai-prompt-composer", title: "AI Prompt Composer", x: 1120, y: 430, w: 340 },
];

export function SpatialGallery() {
  const [nodes, setNodes] = useState<SpatialNode[]>(INITIAL_NODES);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const panRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const dragNodeRef = useRef<{ id: string; sx: number; sy: number; ox: number; oy: number } | null>(null);

  const clampZoom = (z: number) => Math.min(1.6, Math.max(0.55, Number(z.toFixed(2))));

  return (
    <div className="relative h-[calc(100vh-140px)] min-h-[620px] w-full overflow-hidden bg-[var(--ws-bg)] select-none">
      {/* Subtle open canvas */}
      <div
        role="region"
        aria-label="Infinity Canvas spatial component gallery"
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
            panRef.current = { sx: e.clientX, sy: e.clientY, ox: pan.x, oy: pan.y };
          }
        }}
        onPointerMove={(e) => {
          if (dragNodeRef.current) {
            const d = dragNodeRef.current;
            const dx = (e.clientX - d.sx) / zoom;
            const dy = (e.clientY - d.sy) / zoom;
            setNodes((prev) =>
              prev.map((n) => (n.id === d.id ? { ...n, x: d.ox + dx, y: d.oy + dy } : n))
            );
            return;
          }
          if (panRef.current) {
            setPan({
              x: panRef.current.ox + (e.clientX - panRef.current.sx),
              y: panRef.current.oy + (e.clientY - panRef.current.sy),
            });
          }
        }}
        onPointerUp={() => {
          panRef.current = null;
          dragNodeRef.current = null;
        }}
        onWheel={(e) => {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setZoom((z) => clampZoom(z - e.deltaY * 0.002));
          }
        }}
        className="relative h-full w-full cursor-grab active:cursor-grabbing"
      >
        <div
          className="absolute inset-0 origin-top-left"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
        >
          {nodes.map((node) => (
            <div
              key={node.id}
              style={{ left: node.x, top: node.y, width: node.w }}
              className="absolute rounded-[22px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-2 shadow-[var(--ws-shadow-floating)]"
            >
              {/* Drag handle header */}
              <div
                onPointerDown={(e) => {
                  e.stopPropagation();
                  dragNodeRef.current = {
                    id: node.id,
                    sx: e.clientX,
                    sy: e.clientY,
                    ox: node.x,
                    oy: node.y,
                  };
                }}
                className="flex items-center justify-between px-2.5 py-1.5 text-xs font-medium text-[var(--ws-text-primary)] cursor-move"
              >
                <span>{node.title}</span>
                <Link
                  href={`/components/${node.slug}`}
                  className="inline-flex items-center gap-0.5 text-[11px] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                >
                  Open <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
              {/* Nested white preview */}
              <div className="flex min-h-[170px] items-center justify-center overflow-hidden rounded-[16px] border border-[var(--ws-border-subtle)] bg-[var(--ws-preview-bg)] p-4">
                <ComponentLivePreview slug={node.slug} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top-center Canvas HUD */}
      <div className="pointer-events-auto absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)]/95 px-3 py-1.5 text-xs shadow-[var(--ws-shadow-floating)] backdrop-blur-md">
        <span className="pr-2 font-medium text-[var(--ws-text-primary)]">Infinity Canvas</span>
        <button
          type="button"
          onClick={() => setZoom((z) => clampZoom(z - 0.15))}
          aria-label="Zoom out"
          className={cn(
            "inline-flex h-6 w-6 items-center justify-center rounded-full text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
          )}
        >
          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <span className="w-11 text-center font-mono text-[11px] text-[var(--ws-text-secondary)]">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={() => setZoom((z) => clampZoom(z + 0.15))}
          aria-label="Zoom in"
          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            setPan({ x: 0, y: 0 });
            setZoom(1);
            setNodes(INITIAL_NODES);
          }}
          aria-label="Reset canvas"
          className="ml-1 inline-flex h-6 items-center gap-1 rounded-full border border-[var(--ws-border-subtle)] px-2 text-[11px] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Reset
        </button>
      </div>
    </div>
  );
}

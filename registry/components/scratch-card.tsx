"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { RotateCcw, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface ScratchCardProps {
  children: React.ReactNode;
  threshold?: number;
  width?: number;
  height?: number;
  onReveal?: () => void;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function ScratchCard({
  children,
  threshold = 0.45,
  width = 280,
  height = 140,
  onReveal,
  sound,
  haptic,
  className,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const scratchedPixelsRef = useRef(0);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#27272a";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#a1a1aa";
    ctx.font = "600 12px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch to reveal", width / 2, height / 2);
    scratchedPixelsRef.current = 0;
  }, [height, width]);

  useEffect(() => {
    paintCover();
  }, [paintCover]);

  const scratchAt = (clientX: number, clientY: number) => {
    if (revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    scratchedPixelsRef.current += Math.PI * 18 * 18 * 0.4;
    const estCoverage = scratchedPixelsRef.current / (width * height);
    if (estCoverage >= threshold) {
      setRevealed(true);
      triggerInteractionFeedback("success", { sound, haptic });
      onReveal?.();
    }
  };

  const revealAll = () => {
    setRevealed(true);
    triggerInteractionFeedback("success", { sound, haptic });
    onReveal?.();
  };

  const reset = () => {
    setRevealed(false);
    paintCover();
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-2.5", className)}>
      <div
        className="relative overflow-hidden rounded-[var(--mm-radius,14px)] border border-[var(--mm-border-strong)] bg-[var(--mm-surface,#111114)]"
        style={{ width, height }}
      >
        <div className="flex h-full w-full items-center justify-center p-4 text-center">
          {children}
        </div>

        {!revealed && (
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onPointerDown={(e) => {
              setDrawing(true);
              scratchAt(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => {
              if (drawing) scratchAt(e.clientX, e.clientY);
            }}
            onPointerUp={() => setDrawing(false)}
            onPointerLeave={() => setDrawing(false)}
            className="absolute inset-0 cursor-crosshair touch-none"
          />
        )}
      </div>

      <div className="flex items-center gap-2 text-xs">
        {!revealed && (
          <button
            type="button"
            onClick={revealAll}
            className="inline-flex items-center gap-1 rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border-strong)] px-2.5 py-1 text-[var(--mm-fg)] cursor-pointer"
          >
            <Eye className="h-3 w-3" aria-hidden="true" />
            Reveal
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          aria-label="Reset scratch card"
          className="inline-flex items-center gap-1 rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border)] px-2.5 py-1 text-[var(--mm-fg-muted)] cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Reset
        </button>
      </div>
    </div>
  );
}

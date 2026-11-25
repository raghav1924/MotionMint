"use client";

import React from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { X, Loader2, CheckCircle2, AlertCircle, PauseCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type FlowHandleSpec = {
  id?: string;
  type: "target" | "source";
  position?: Position;
  title?: string;
  style?: React.CSSProperties;
  className?: string;
};

export type FlowNodeStatus = "idle" | "running" | "success" | "error" | "paused";

export interface BaseNodeProps {
  id: string;
  title: string;
  subtitle?: string;
  accent?: string;
  icon?: React.ReactNode;
  handles?: FlowHandleSpec[];
  selected?: boolean;
  status?: FlowNodeStatus;
  isLocked?: boolean;
  onDelete?: (id: string) => void;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function resolveHandlePosition(handle: FlowHandleSpec): Position {
  if (handle.position) return handle.position;
  return handle.type === "target" ? Position.Left : Position.Right;
}

/**
 * Reusable Flow BaseNode abstraction ported from the VectorShift POC (`baseNode.js`).
 * Automatically distributes multiple handles along Left/Right/Top/Bottom edges
 * and supports execution status badges, lock mode, and accessible deletion.
 */
export function BaseNode({
  id,
  title,
  subtitle,
  accent = "var(--mm-accent, #6366f1)",
  icon,
  handles = [],
  selected = false,
  status = "idle",
  isLocked = false,
  onDelete,
  headerActions,
  footer,
  className,
  style,
  children,
}: BaseNodeProps) {
  const { deleteElements } = useReactFlow();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) return;
    if (onDelete) {
      onDelete(id);
    } else {
      void deleteElements({ nodes: [{ id }] });
    }
  };

  const handlesByPosition: Record<Position, { handle: FlowHandleSpec; idx: number }[]> = {
    [Position.Left]: [],
    [Position.Right]: [],
    [Position.Top]: [],
    [Position.Bottom]: [],
  };

  handles.forEach((handle, idx) => {
    const pos = resolveHandlePosition(handle);
    handlesByPosition[pos].push({ handle, idx });
  });

  const computedHandles: Array<
    FlowHandleSpec & {
      resolvedId: string;
      resolvedPosition: Position;
      computedStyle: React.CSSProperties;
    }
  > = [];

  (Object.entries(handlesByPosition) as [Position, { handle: FlowHandleSpec; idx: number }[]][]).forEach(
    ([pos, group]) => {
      const count = group.length;
      group.forEach(({ handle, idx }, groupIdx) => {
        const isVertical = pos === Position.Left || pos === Position.Right;
        const offsetProp = isVertical ? "top" : "left";
        const defaultOffset: React.CSSProperties = {};

        if (!handle.style || handle.style[offsetProp] === undefined) {
          if (count > 1) {
            defaultOffset[offsetProp] = `${((groupIdx + 1) * 100) / (count + 1)}%`;
          }
        }

        const resolvedId = handle.id
          ? handle.id.startsWith(`${id}-`)
            ? handle.id
            : `${id}-${handle.id}`
          : `${id}-${handle.type}-${idx}`;

        computedHandles.push({
          ...handle,
          resolvedId,
          resolvedPosition: pos,
          computedStyle: {
            ...defaultOffset,
            ...handle.style,
          },
        });
      });
    }
  );

  return (
    <div
      data-flow-node-id={id}
      data-flow-status={status}
      style={style}
      className={cn(
        "group relative min-w-[230px] rounded-[14px] border bg-[var(--mm-surface,#ffffff)] text-[var(--mm-fg,#111827)] shadow-sm transition-all",
        selected
          ? "border-[var(--mm-accent,#6366f1)] ring-2 ring-[var(--mm-accent,#6366f1)]/25 shadow-md"
          : "border-[var(--mm-border-strong,#d4d4d8)] hover:border-[var(--mm-fg-muted,#71717a)]",
        status === "running" && "ring-2 ring-amber-400/60 border-amber-400",
        status === "success" && "border-emerald-500/80",
        status === "error" && "ring-2 ring-rose-500/50 border-rose-500",
        className
      )}
    >
      {computedHandles.map((handle) => (
        <Handle
          key={handle.resolvedId}
          type={handle.type}
          position={handle.resolvedPosition}
          id={handle.resolvedId}
          title={handle.title ?? handle.resolvedId}
          style={{
            width: 10,
            height: 10,
            borderRadius: "9999px",
            border: "2px solid var(--mm-surface, #ffffff)",
            background: accent,
            ...handle.computedStyle,
          }}
          className={cn("transition-transform hover:scale-125", handle.className)}
        />
      ))}

      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-[var(--mm-border,#e4e4e7)] px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
          {icon && <span className="shrink-0 text-[var(--mm-fg-muted,#71717a)]">{icon}</span>}
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold leading-tight">{title}</div>
            {subtitle && (
              <div className="truncate text-[10px] text-[var(--mm-fg-muted,#71717a)]">
                {subtitle}
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {status === "running" && (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-500" aria-label="Running" />
          )}
          {status === "success" && (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-label="Completed" />
          )}
          {status === "error" && (
            <AlertCircle className="h-3.5 w-3.5 text-rose-500" aria-label="Error" />
          )}
          {status === "paused" && (
            <PauseCircle className="h-3.5 w-3.5 text-sky-500" aria-label="Paused" />
          )}
          {headerActions}
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLocked}
            aria-label={`Delete ${title} node`}
            title={isLocked ? "Canvas locked" : "Delete node"}
            className={cn(
              "inline-flex h-5 w-5 items-center justify-center rounded-md text-[var(--mm-fg-muted,#71717a)] opacity-70 transition-opacity hover:bg-black/5 hover:opacity-100 hover:text-rose-500 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-accent,#6366f1)]",
              isLocked && "cursor-not-allowed opacity-30"
            )}
          >
            <X className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-2 p-3 text-xs">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="border-t border-[var(--mm-border,#e4e4e7)] px-3 py-1.5 text-[10px] text-[var(--mm-fg-muted,#71717a)]">
          {footer}
        </div>
      )}
    </div>
  );
}

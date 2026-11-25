"use client";

import React from "react";
import {
  ReactFlow,
  Background,
  MiniMap,
  Panel,
  useReactFlow,
  useViewport,
  BackgroundVariant,
  MarkerType,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type NodeTypes,
} from "@xyflow/react";
import { Plus, Minus, Maximize2, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import "@xyflow/react/dist/style.css";

export interface FlowCanvasProps<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge,
> {
  nodes: NodeType[];
  edges: EdgeType[];
  nodeTypes: NodeTypes;
  onNodesChange: OnNodesChange<NodeType>;
  onEdgesChange: OnEdgesChange<EdgeType>;
  onConnect: OnConnect;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onNodeClick?: (event: React.MouseEvent, node: NodeType) => void;
  onPaneClick?: () => void;
  isLocked?: boolean;
  onToggleLock?: () => void;
  emptyState?: React.ReactNode;
  className?: string;
}

function FlowCanvasControls({
  isLocked,
  onToggleLock,
}: {
  isLocked: boolean;
  onToggleLock?: () => void;
}) {
  const { zoomIn, zoomOut, fitView, zoomTo } = useReactFlow();
  const { zoom } = useViewport();
  const zoomPercent = Math.round((zoom || 1) * 100);

  const btnClass =
    "inline-flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-xs text-[var(--mm-fg-muted,#52525b)] transition-colors hover:bg-[var(--mm-bg,#f4f4f5)] hover:text-[var(--mm-fg,#111827)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-accent,#6366f1)]";

  return (
    <Panel
      position="bottom-left"
      className="flex items-center gap-0.5 rounded-xl border border-[var(--mm-border-strong,#d4d4d8)] bg-[var(--mm-surface,#ffffff)]/95 p-1 shadow-sm backdrop-blur-md"
    >
      <button
        type="button"
        onClick={() => zoomIn({ duration: 180 })}
        aria-label="Zoom In"
        title="Zoom In"
        className={btnClass}
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => zoomTo(1, { duration: 180 })}
        aria-label="Reset zoom to 100%"
        title="Reset Zoom (100%)"
        className={cn(btnClass, "font-mono text-[11px]")}
      >
        {zoomPercent}%
      </button>
      <button
        type="button"
        onClick={() => zoomOut({ duration: 180 })}
        aria-label="Zoom Out"
        title="Zoom Out"
        className={btnClass}
      >
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => fitView({ padding: 0.2, duration: 220 })}
        aria-label="Fit View"
        title="Fit View"
        className={btnClass}
      >
        <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      {onToggleLock && (
        <button
          type="button"
          onClick={onToggleLock}
          aria-label={isLocked ? "Unlock canvas" : "Lock canvas"}
          aria-pressed={isLocked}
          title={isLocked ? "Unlock Canvas" : "Lock Canvas"}
          className={cn(btnClass, isLocked && "bg-amber-500/15 text-amber-600")}
        >
          {isLocked ? (
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Unlock className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      )}
    </Panel>
  );
}

/**
 * Reusable FlowCanvas component built on `@xyflow/react` (MIT),
 * incorporating the POC's dot grid, smoothstep arrows, minimap, and custom controls.
 */
export function FlowCanvas<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge,
>({
  nodes,
  edges,
  nodeTypes,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onDrop,
  onDragOver,
  onNodeClick,
  onPaneClick,
  isLocked = false,
  onToggleLock,
  emptyState,
  className,
}: FlowCanvasProps<NodeType, EdgeType>) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[var(--mm-bg,#fafafa)]",
        className
      )}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodesDraggable={!isLocked}
        nodesConnectable={!isLocked}
        elementsSelectable={!isLocked}
        fitView
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          type: "smoothstep",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 14,
            height: 14,
          },
          style: { strokeWidth: 1.75 },
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1.2} />
        <MiniMap
          pannable
          zoomable
          className="!rounded-xl !border !border-[var(--mm-border-strong,#d4d4d8)] !bg-[var(--mm-surface,#ffffff)]/90"
        />
        <FlowCanvasControls isLocked={isLocked} onToggleLock={onToggleLock} />
      </ReactFlow>

      {nodes.length === 0 && emptyState && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
          <div className="pointer-events-auto">{emptyState}</div>
        </div>
      )}
    </div>
  );
}

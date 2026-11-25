"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Connection,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";
import {
  Play,
  Square,
  ShieldCheck,
  Undo2,
  Redo2,
  Download,
  Plus,
  Check,
  Workflow,
} from "lucide-react";
import { validateWorkflowDAG } from "@/lib/flow/dag";
import { WORKFLOW_PRESETS, getFlowNodeDefinition } from "@/lib/flow/presets";
import { createLogEntry, getSimulatedNodeResult } from "@/lib/flow/simulator";
import type {
  ExecutionLogEntry,
  FlowEdge,
  FlowNode,
  NodeExecutionStatus,
  PocNodeType,
} from "@/lib/flow/types";
import { FlowCanvas } from "@/registry/flow/flow-canvas";
import { FLOW_NODE_TYPES } from "@/registry/flow/pipeline-nodes";
import { NodePalette } from "@/components/flow/node-palette";
import { NodeInspector } from "@/components/flow/node-inspector";
import { ExecutionConsole } from "@/components/flow/execution-console";
import { cn } from "@/lib/utils";

interface HistorySnapshot {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

type MobileTab = "canvas" | "palette" | "inspector";

function OrchestratorWorkspaceInner() {
  const { screenToFlowPosition, fitView } = useReactFlow();
  const initialPreset = WORKFLOW_PRESETS[0];

  const [presetId, setPresetId] = useState(initialPreset.id);
  const [workflowName, setWorkflowName] = useState(initialPreset.name);
  const [nodes, setNodes, rawOnNodesChange] = useNodesState<FlowNode>(initialPreset.nodes);
  const [edges, setEdges, rawOnEdgesChange] = useEdgesState<FlowEdge>(initialPreset.edges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    initialPreset.nodes[0]?.id ?? null
  );
  const [isLocked, setIsLocked] = useState(false);

  // Undo / Redo history
  const [past, setPast] = useState<HistorySnapshot[]>([]);
  const [future, setFuture] = useState<HistorySnapshot[]>([]);

  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [consoleExpanded, setConsoleExpanded] = useState(true);
  const [logs, setLogs] = useState<ExecutionLogEntry[]>([]);
  const [exported, setExported] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("canvas");

  const runCancelledRef = useRef(false);
  const nodeCounterRef = useRef(10);

  const validation = useMemo(() => validateWorkflowDAG(nodes, edges), [nodes, edges]);

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId]
  );

  const pushHistory = useCallback((snapshotNodes: FlowNode[], snapshotEdges: FlowEdge[]) => {
    setPast((prev) => [...prev.slice(-19), { nodes: snapshotNodes, edges: snapshotEdges }]);
    setFuture([]);
  }, []);

  const handleUndo = () => {
    if (past.length === 0 || isRunning) return;
    const previous = past[past.length - 1];
    setPast((prev) => prev.slice(0, -1));
    setFuture((prev) => [{ nodes, edges }, ...prev]);
    setNodes(previous.nodes);
    setEdges(previous.edges);
  };

  const handleRedo = () => {
    if (future.length === 0 || isRunning) return;
    const next = future[0];
    setFuture((prev) => prev.slice(1));
    setPast((prev) => [...prev, { nodes, edges }]);
    setNodes(next.nodes);
    setEdges(next.edges);
  };

  const handleSelectPreset = (nextPresetId: string) => {
    const preset = WORKFLOW_PRESETS.find((p) => p.id === nextPresetId);
    if (!preset) return;
    runCancelledRef.current = true;
    setIsRunning(false);
    pushHistory(nodes, edges);
    setPresetId(preset.id);
    setWorkflowName(preset.name);
    setNodes(preset.nodes);
    setEdges(preset.edges);
    setSelectedNodeId(preset.nodes[0]?.id ?? null);
    setLogs([
      createLogEntry({
        nodeId: "system",
        nodeLabel: "Orchestrator",
        status: "idle",
        message: `Loaded preset "${preset.name}".`,
      }),
    ]);
    setTimeout(() => fitView({ padding: 0.2, duration: 200 }), 50);
  };

  const onNodesChange = useCallback<OnNodesChange<FlowNode>>(
    (changes) => {
      if (isLocked) return;
      rawOnNodesChange(changes);
    },
    [isLocked, rawOnNodesChange]
  );

  const onEdgesChange = useCallback<OnEdgesChange<FlowEdge>>(
    (changes) => {
      if (isLocked) return;
      rawOnEdgesChange(changes);
    },
    [isLocked, rawOnEdgesChange]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (isLocked) return;
      pushHistory(nodes, edges);
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "smoothstep",
          },
          eds
        )
      );
    },
    [isLocked, nodes, edges, pushHistory]
  );

  const addNodeAt = useCallback(
    (type: PocNodeType, position?: { x: number; y: number }) => {
      if (isLocked) return;
      pushHistory(nodes, edges);
      nodeCounterRef.current += 1;
      const id = `${type}-${nodeCounterRef.current}`;
      const def = getFlowNodeDefinition(type);
      const pos = position ?? {
        x: 180 + (nodes.length % 4) * 70,
        y: 110 + (nodes.length % 3) * 65,
      };
      const newNode: FlowNode = {
        id,
        type,
        position: pos,
        data: {
          label: def.label,
          ...def.defaultData,
        },
      };
      setNodes((nds) => [...nds, newNode]);
      setSelectedNodeId(id);
      setMobileTab("canvas");
    },
    [isLocked, nodes, edges, pushHistory]
  );

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow") as PocNodeType;
      if (!type) return;
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      addNodeAt(type, position);
    },
    [screenToFlowPosition, addNodeAt]
  );

  const handleUpdateField = useCallback((nodeId: string, field: string, value: unknown) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              data: {
                ...n.data,
                [field]: value,
              },
            }
          : n
      )
    );
  }, []);

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      if (isLocked) return;
      pushHistory(nodes, edges);
      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
      if (selectedNodeId === nodeId) {
        setSelectedNodeId(null);
      }
    },
    [isLocked, nodes, edges, selectedNodeId, pushHistory]
  );

  const setNodeStatus = (nodeId: string, status: NodeExecutionStatus) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, status } } : n))
    );
  };

  const resetAllStatuses = () => {
    setNodes((nds) =>
      nds.map((n) => ({ ...n, data: { ...n.data, status: "idle" as NodeExecutionStatus } }))
    );
  };

  const handleValidate = () => {
    setConsoleExpanded(true);
    const entry = createLogEntry({
      nodeId: "dag-validator",
      nodeLabel: "Kahn DAG Validator",
      status: validation.isDag ? "success" : "error",
      message: validation.isDag
        ? `Valid acyclic pipeline (${validation.numNodes} nodes, ${validation.numEdges} edges). Order: ${validation.topologicalOrder.join(" → ")}`
        : `Cycle detected! Nodes in cycle: ${validation.cycleNodeIds.join(", ")}`,
    });
    setLogs((prev) => [entry, ...prev]);
  };

  const handleRunSimulated = async () => {
    if (isRunning) return;
    setConsoleExpanded(true);
    resetAllStatuses();

    if (!validation.isDag) {
      setLogs((prev) => [
        createLogEntry({
          nodeId: "dag-validator",
          nodeLabel: "Kahn DAG Validator",
          status: "error",
          message: `Cannot run: circular cycle detected (${validation.cycleNodeIds.join(", ")}).`,
        }),
        ...prev,
      ]);
      return;
    }

    if (nodes.length === 0) {
      setLogs((prev) => [
        createLogEntry({
          nodeId: "system",
          nodeLabel: "Orchestrator",
          status: "error",
          message: "Cannot run an empty pipeline. Add nodes first.",
        }),
        ...prev,
      ]);
      return;
    }

    runCancelledRef.current = false;
    setIsRunning(true);

    for (const nodeId of validation.topologicalOrder) {
      if (runCancelledRef.current) break;
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) continue;

      setNodeStatus(nodeId, "running");
      const result = getSimulatedNodeResult(node);

      await new Promise((resolve) => setTimeout(resolve, Math.min(result.durationMs, 260)));
      if (runCancelledRef.current) {
        setNodeStatus(nodeId, "paused");
        break;
      }

      setNodeStatus(nodeId, "success");
      setLogs((prev) => [
        createLogEntry({
          nodeId,
          nodeLabel: String(node.data.label ?? node.id),
          status: "success",
          message: result.message,
          durationMs: result.durationMs,
          outputPreview: result.outputPreview,
        }),
        ...prev,
      ]);
    }

    setIsRunning(false);
  };

  const handleStop = () => {
    runCancelledRef.current = true;
    setIsRunning(false);
    setLogs((prev) => [
      createLogEntry({
        nodeId: "system",
        nodeLabel: "Orchestrator",
        status: "paused",
        message: "Simulated execution stopped by user.",
      }),
      ...prev,
    ]);
  };

  const handleExport = async () => {
    const payload = JSON.stringify(
      {
        name: workflowName,
        presetId,
        validation,
        nodes,
        edges,
      },
      null,
      2
    );
    try {
      await navigator.clipboard?.writeText(payload);
    } catch {
      // Ignore clipboard failures in restricted environments
    }
    setExported(true);
    setTimeout(() => setExported(false), 1600);
  };

  return (
    <div className="flex h-[calc(100vh-110px)] min-h-[620px] flex-col overflow-hidden rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-bg)]">
      {/* Top Orchestrator Toolbar (Dedicated — separate from Component Studio FloatingToolbar) */}
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ws-border)] bg-[var(--ws-surface)] px-3 py-2.5 sm:px-4">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ws-text-primary)]">
            <Workflow className="h-4 w-4 text-[var(--ws-text-secondary)]" aria-hidden="true" />
            <span className="hidden sm:inline">Flow Orchestrator</span>
          </div>

          <input
            type="text"
            aria-label="Workflow name"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="h-8 w-44 sm:w-56 rounded-lg border border-[var(--ws-border)] bg-[var(--ws-floating)] px-2.5 text-xs font-medium text-[var(--ws-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ws-text-primary)]/20"
          />

          <select
            aria-label="Load workflow preset"
            value={presetId}
            onChange={(e) => handleSelectPreset(e.target.value)}
            className="h-8 rounded-lg border border-[var(--ws-border)] bg-[var(--ws-floating)] px-2.5 text-xs text-[var(--ws-text-primary)] cursor-pointer"
          >
            {WORKFLOW_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={handleUndo}
            disabled={past.length === 0 || isRunning}
            aria-label="Undo"
            title="Undo"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--ws-border)] bg-[var(--ws-floating)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] disabled:opacity-40 cursor-pointer"
          >
            <Undo2 className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={future.length === 0 || isRunning}
            aria-label="Redo"
            title="Redo"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--ws-border)] bg-[var(--ws-floating)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] disabled:opacity-40 cursor-pointer"
          >
            <Redo2 className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => addNodeAt("text")}
            disabled={isLocked}
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-[var(--ws-border)] bg-[var(--ws-floating)] px-2.5 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] disabled:opacity-40 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden md:inline">Add Node</span>
          </button>
          <button
            type="button"
            onClick={handleValidate}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[var(--ws-border)] bg-[var(--ws-floating)] px-2.5 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
            <span>Validate DAG</span>
          </button>
          {isRunning ? (
            <button
              type="button"
              onClick={handleStop}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-rose-600 px-3 text-xs font-medium text-white hover:bg-rose-700 cursor-pointer"
            >
              <Square className="h-3 w-3" aria-hidden="true" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void handleRunSimulated()}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[var(--ws-text-primary)] px-3 text-xs font-medium text-[var(--ws-bg)] hover:opacity-90 cursor-pointer"
            >
              <Play className="h-3 w-3" aria-hidden="true" />
              <span>Run (Simulated)</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => void handleExport()}
            aria-label="Export workflow JSON"
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-[var(--ws-border)] bg-[var(--ws-floating)] px-2.5 text-xs font-medium text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] cursor-pointer"
          >
            {exported ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
            ) : (
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{exported ? "Copied JSON" : "Export"}</span>
          </button>
        </div>
      </header>

      {/* Mobile / Tablet Panel Switcher */}
      <div className="flex border-b border-[var(--ws-border)] bg-[var(--ws-surface)] lg:hidden">
        {(
          [
            { id: "canvas", label: "Canvas" },
            { id: "palette", label: "Nodes Palette" },
            { id: "inspector", label: "Inspector" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMobileTab(tab.id)}
            className={cn(
              "flex-1 py-2 text-xs font-medium transition-colors cursor-pointer",
              mobileTab === tab.id
                ? "border-b-2 border-[var(--ws-text-primary)] text-[var(--ws-text-primary)]"
                : "text-[var(--ws-text-secondary)]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main 3-Column Body */}
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[260px_1fr_290px]">
        <div className={cn("min-h-0", mobileTab !== "palette" && "hidden lg:block")}>
          <NodePalette onAddNode={(t) => addNodeAt(t)} isLocked={isLocked} />
        </div>

        <div className={cn("min-h-[340px] min-w-0", mobileTab !== "canvas" && "hidden lg:block")}>
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            nodeTypes={FLOW_NODE_TYPES}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onNodeClick={(_e, node) => setSelectedNodeId(node.id)}
            onPaneClick={() => setSelectedNodeId(null)}
            isLocked={isLocked}
            onToggleLock={() => setIsLocked((v) => !v)}
            emptyState={
              <div className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)] p-5 text-center shadow-sm max-w-xs">
                <p className="text-xs font-semibold text-[var(--ws-text-primary)]">
                  Empty Pipeline Canvas
                </p>
                <p className="mt-1 text-[11px] text-[var(--ws-text-secondary)]">
                  Drag nodes from the left library or click + to start building your workflow.
                </p>
              </div>
            }
          />
        </div>

        <div className={cn("min-h-0", mobileTab !== "inspector" && "hidden lg:block")}>
          <NodeInspector
            selectedNode={selectedNode}
            validation={validation}
            onUpdateField={handleUpdateField}
            onDeleteNode={handleDeleteNode}
            isLocked={isLocked}
          />
        </div>
      </div>

      {/* Bottom Execution Console */}
      <ExecutionConsole
        expanded={consoleExpanded}
        onToggleExpand={() => setConsoleExpanded((v) => !v)}
        isRunning={isRunning}
        validation={validation}
        logs={logs}
        onClearLogs={() => setLogs([])}
      />
    </div>
  );
}

export function PipelineOrchestrator() {
  return (
    <ReactFlowProvider>
      <OrchestratorWorkspaceInner />
    </ReactFlowProvider>
  );
}

"use client";

import React from "react";
import { Trash2, SlidersHorizontal, AlertTriangle } from "lucide-react";
import { getFlowNodeDefinition } from "@/lib/flow/presets";
import type { DAGValidationResult, FlowNode, PocNodeType } from "@/lib/flow/types";
import { extractTemplateVariables } from "@/registry/flow/pipeline-nodes";

interface NodeInspectorProps {
  selectedNode: FlowNode | null;
  validation: DAGValidationResult;
  onUpdateField: (nodeId: string, field: string, value: unknown) => void;
  onDeleteNode: (nodeId: string) => void;
  isLocked?: boolean;
}

const labelClass = "block space-y-1 text-[11px] font-medium text-[var(--ws-text-secondary)]";
const fieldClass =
  "w-full rounded-lg border border-[var(--ws-border)] bg-[var(--ws-floating)] px-2.5 py-1.5 text-xs text-[var(--ws-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ws-text-primary)]/20";

export function NodeInspector({
  selectedNode,
  validation,
  onUpdateField,
  onDeleteNode,
  isLocked = false,
}: NodeInspectorProps) {
  if (!selectedNode) {
    return (
      <aside
        aria-label="Node inspector"
        className="flex h-full flex-col justify-center border-l border-[var(--ws-border)] bg-[var(--ws-surface)] p-5 text-center"
      >
        <SlidersHorizontal
          className="mx-auto mb-2.5 h-5 w-5 text-[var(--ws-text-muted)]"
          aria-hidden="true"
        />
        <p className="text-xs font-medium text-[var(--ws-text-primary)]">No node selected</p>
        <p className="mt-1 text-[11px] text-[var(--ws-text-secondary)]">
          Click any node on the canvas to configure its parameters, ports, and validation rules.
        </p>
      </aside>
    );
  }

  const def = getFlowNodeDefinition(selectedNode.type as PocNodeType);
  const isInCycle = validation.cycleNodeIds.includes(selectedNode.id);
  const isDisconnected = validation.disconnectedNodeIds.includes(selectedNode.id);
  const textVars =
    selectedNode.type === "text"
      ? extractTemplateVariables(String(selectedNode.data.text ?? ""))
      : [];

  return (
    <aside
      aria-label="Node inspector"
      className="flex h-full flex-col border-l border-[var(--ws-border)] bg-[var(--ws-surface)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--ws-border-subtle)] px-4 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: def.accent }}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <h2 className="truncate text-xs font-semibold text-[var(--ws-text-primary)]">
              {String(selectedNode.data.label ?? def.label)}
            </h2>
            <p className="font-mono text-[10px] text-[var(--ws-text-muted)]">
              {selectedNode.id} · {def.category}
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={isLocked}
          onClick={() => onDeleteNode(selectedNode.id)}
          aria-label="Delete selected node"
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--ws-border)] text-[var(--ws-text-secondary)] hover:bg-rose-500/10 hover:text-rose-500 cursor-pointer disabled:opacity-40"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {(isInCycle || isDisconnected) && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-2.5 text-[11px] text-amber-700 dark:text-amber-300 flex items-start gap-2">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              {isInCycle
                ? "This node is part of a circular cycle. Remove a back-edge to form a valid DAG."
                : "This node is currently disconnected from the pipeline."}
            </span>
          </div>
        )}

        <label className={labelClass}>
          Display Label
          <input
            type="text"
            disabled={isLocked}
            value={String(selectedNode.data.label ?? def.label)}
            onChange={(e) => onUpdateField(selectedNode.id, "label", e.target.value)}
            className={fieldClass}
          />
        </label>

        {/* POC Node-Specific Parameters */}
        {selectedNode.type === "customInput" && (
          <>
            <label className={labelClass}>
              Input Name
              <input
                type="text"
                disabled={isLocked}
                value={String(selectedNode.data.inputName ?? "")}
                onChange={(e) => onUpdateField(selectedNode.id, "inputName", e.target.value)}
                className={fieldClass}
              />
            </label>
            <label className={labelClass}>
              Input Type
              <select
                disabled={isLocked}
                value={String(selectedNode.data.inputType ?? "Text")}
                onChange={(e) => onUpdateField(selectedNode.id, "inputType", e.target.value)}
                className={fieldClass}
              >
                <option value="Text">Text</option>
                <option value="File">File</option>
              </select>
            </label>
          </>
        )}

        {selectedNode.type === "customOutput" && (
          <>
            <label className={labelClass}>
              Output Name
              <input
                type="text"
                disabled={isLocked}
                value={String(selectedNode.data.outputName ?? "")}
                onChange={(e) => onUpdateField(selectedNode.id, "outputName", e.target.value)}
                className={fieldClass}
              />
            </label>
            <label className={labelClass}>
              Output Format
              <select
                disabled={isLocked}
                value={String(selectedNode.data.outputType ?? "JSON")}
                onChange={(e) => onUpdateField(selectedNode.id, "outputType", e.target.value)}
                className={fieldClass}
              >
                <option value="Text">Text</option>
                <option value="Image">Image</option>
                <option value="JSON">JSON</option>
              </select>
            </label>
          </>
        )}

        {selectedNode.type === "text" && (
          <div className="space-y-2">
            <label className={labelClass}>
              Template Text
              <textarea
                rows={4}
                disabled={isLocked}
                value={String(selectedNode.data.text ?? "")}
                onChange={(e) => onUpdateField(selectedNode.id, "text", e.target.value)}
                className={`${fieldClass} font-mono`}
              />
            </label>
            <p className="text-[10px] text-[var(--ws-text-muted)]">
              Detected dynamic input handles:{" "}
              {textVars.length > 0 ? textVars.map((v) => `{{${v}}}`).join(", ") : "None"}
            </p>
          </div>
        )}

        {selectedNode.type === "llm" && (
          <label className={labelClass}>
            Foundation Model
            <select
              disabled={isLocked}
              value={String(selectedNode.data.model ?? "gemini-2.5-pro")}
              onChange={(e) => onUpdateField(selectedNode.id, "model", e.target.value)}
              className={fieldClass}
            >
              <option value="gemini-2.5-pro">gemini-2.5-pro</option>
              <option value="gemini-2.5-flash">gemini-2.5-flash</option>
              <option value="claude-sonnet-4">claude-sonnet-4</option>
              <option value="gpt-4o">gpt-4o</option>
            </select>
          </label>
        )}

        {selectedNode.type === "webhook" && (
          <>
            <label className={labelClass}>
              HTTP Method
              <select
                disabled={isLocked}
                value={String(selectedNode.data.method ?? "POST")}
                onChange={(e) => onUpdateField(selectedNode.id, "method", e.target.value)}
                className={fieldClass}
              >
                <option value="POST">POST</option>
                <option value="GET">GET</option>
                <option value="PUT">PUT</option>
              </select>
            </label>
            <label className={labelClass}>
              Path
              <input
                type="text"
                disabled={isLocked}
                value={String(selectedNode.data.path ?? "/webhook/ingest")}
                onChange={(e) => onUpdateField(selectedNode.id, "path", e.target.value)}
                className={fieldClass}
              />
            </label>
          </>
        )}

        {selectedNode.type === "httpRequest" && (
          <>
            <label className={labelClass}>
              HTTP Method
              <select
                disabled={isLocked}
                value={String(selectedNode.data.method ?? "GET")}
                onChange={(e) => onUpdateField(selectedNode.id, "method", e.target.value)}
                className={fieldClass}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </label>
            <label className={labelClass}>
              Endpoint URL
              <input
                type="text"
                disabled={isLocked}
                value={String(selectedNode.data.url ?? "")}
                onChange={(e) => onUpdateField(selectedNode.id, "url", e.target.value)}
                className={fieldClass}
              />
            </label>
          </>
        )}

        {selectedNode.type === "jsonTransform" && (
          <>
            <label className={labelClass}>
              Operation
              <select
                disabled={isLocked}
                value={String(selectedNode.data.operation ?? "Map")}
                onChange={(e) => onUpdateField(selectedNode.id, "operation", e.target.value)}
                className={fieldClass}
              >
                <option value="Map">Map</option>
                <option value="Filter">Filter</option>
                <option value="Extract Field">Extract Field</option>
                <option value="Flatten">Flatten</option>
                <option value="JSON Stringify">JSON Stringify</option>
              </select>
            </label>
            <label className={labelClass}>
              Target Field Path
              <input
                type="text"
                disabled={isLocked}
                value={String(selectedNode.data.field ?? "")}
                onChange={(e) => onUpdateField(selectedNode.id, "field", e.target.value)}
                className={fieldClass}
              />
            </label>
          </>
        )}

        {selectedNode.type === "ifCondition" && (
          <>
            <label className={labelClass}>
              Condition
              <select
                disabled={isLocked}
                value={String(selectedNode.data.condition ?? "Greater Than")}
                onChange={(e) => onUpdateField(selectedNode.id, "condition", e.target.value)}
                className={fieldClass}
              >
                <option value="Greater Than">Greater Than</option>
                <option value="Equals">Equals</option>
                <option value="Contains">Contains</option>
                <option value="Is Empty">Is Empty</option>
              </select>
            </label>
            <label className={labelClass}>
              Compare Value
              <input
                type="text"
                disabled={isLocked}
                value={String(selectedNode.data.value ?? "")}
                onChange={(e) => onUpdateField(selectedNode.id, "value", e.target.value)}
                className={fieldClass}
              />
            </label>
          </>
        )}

        {selectedNode.type === "merge" && (
          <label className={labelClass}>
            Merge Mode
            <select
              disabled={isLocked}
              value={String(selectedNode.data.mode ?? "Combine")}
              onChange={(e) => onUpdateField(selectedNode.id, "mode", e.target.value)}
              className={fieldClass}
            >
              <option value="Combine">Combine</option>
              <option value="Intersection">Intersection</option>
              <option value="Append">Append</option>
            </select>
          </label>
        )}

        {/* Port & Docs summary */}
        <div className="border-t border-[var(--ws-border-subtle)] pt-3 space-y-2">
          <div className="text-[11px] font-semibold text-[var(--ws-text-primary)]">
            Ports &amp; Documentation
          </div>
          <p className="text-[11px] text-[var(--ws-text-secondary)]">{def.description}</p>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="rounded-lg border border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] p-2">
              <div className="font-semibold text-[var(--ws-text-secondary)] mb-1">Inputs</div>
              {def.inputs.length === 0 ? (
                <span className="text-[var(--ws-text-muted)]">Trigger / Source</span>
              ) : (
                def.inputs.map((p) => (
                  <div key={p.id} className="truncate font-mono text-[var(--ws-text-primary)]">
                    • {p.label}
                  </div>
                ))
              )}
            </div>
            <div className="rounded-lg border border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] p-2">
              <div className="font-semibold text-[var(--ws-text-secondary)] mb-1">Outputs</div>
              {def.outputs.length === 0 ? (
                <span className="text-[var(--ws-text-muted)]">Terminal Sink</span>
              ) : (
                def.outputs.map((p) => (
                  <div key={p.id} className="truncate font-mono text-[var(--ws-text-primary)]">
                    • {p.label}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

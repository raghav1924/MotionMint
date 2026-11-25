"use client";

import React, { useMemo } from "react";
import { Position, useReactFlow, type NodeProps } from "@xyflow/react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  FileText,
  Sparkles,
  Webhook,
  Globe,
  Braces,
  GitBranch,
  GitMerge,
} from "lucide-react";
import { BaseNode, type FlowNodeStatus } from "./base-node";

const JS_IDENTIFIER_REGEX = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

/**
 * Extracts unique valid JS identifier variables from `{{ variableName }}` patterns.
 * Ported directly from the POC `textNode.js`.
 */
export function extractTemplateVariables(text: string): string[] {
  if (!text) return [];
  const regex = /\{\{\s*([a-zA-Z0-9_$]+)\s*\}\}/g;
  const matches = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const varName = match[1];
    if (JS_IDENTIFIER_REGEX.test(varName)) {
      matches.add(varName);
    }
  }
  return Array.from(matches);
}

function useNodeFieldUpdater(id: string) {
  const { updateNodeData } = useReactFlow();
  return (field: string, value: unknown) => {
    updateNodeData(id, { [field]: value });
  };
}

const fieldLabelClass = "block space-y-1 text-[10px] font-medium uppercase tracking-wider text-[var(--mm-fg-muted,#71717a)]";
const inputClass =
  "nodrag nopan w-full rounded-lg border border-[var(--mm-border,#e4e4e7)] bg-[var(--mm-bg,#fafafa)] px-2 py-1 text-xs font-normal normal-case tracking-normal text-[var(--mm-fg,#111827)] focus:outline-none focus:ring-1 focus:ring-[var(--mm-accent,#6366f1)]";

export function InputNode({ id, data, selected }: NodeProps) {
  const updateField = useNodeFieldUpdater(id);
  const status = (data?.status as FlowNodeStatus | undefined) ?? "idle";
  const label = String(data?.label ?? "Input");
  const inputName = String(data?.inputName ?? id.replace("customInput-", "input_"));
  const inputType = String(data?.inputType ?? "Text");

  return (
    <BaseNode
      id={id}
      title={label}
      subtitle="General · Input"
      accent="#7C83FD"
      icon={<ArrowDownToLine className="h-3.5 w-3.5" aria-hidden="true" />}
      selected={selected}
      status={status}
      handles={[
        { type: "source", position: Position.Right, id: `${id}-value`, title: "Input Value" },
      ]}
    >
      <label className={fieldLabelClass}>
        Name
        <input
          type="text"
          value={inputName}
          onChange={(e) => updateField("inputName", e.target.value)}
          className={inputClass}
        />
      </label>
      <label className={fieldLabelClass}>
        Type
        <select
          value={inputType}
          onChange={(e) => updateField("inputType", e.target.value)}
          className={inputClass}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}

export function OutputNode({ id, data, selected }: NodeProps) {
  const updateField = useNodeFieldUpdater(id);
  const status = (data?.status as FlowNodeStatus | undefined) ?? "idle";
  const label = String(data?.label ?? "Output");
  const outputName = String(data?.outputName ?? id.replace("customOutput-", "output_"));
  const outputType = String(data?.outputType ?? "JSON");

  return (
    <BaseNode
      id={id}
      title={label}
      subtitle="General · Sink"
      accent="#34D399"
      icon={<ArrowUpFromLine className="h-3.5 w-3.5" aria-hidden="true" />}
      selected={selected}
      status={status}
      handles={[
        { type: "target", position: Position.Left, id: `${id}-value`, title: "Output Target" },
      ]}
    >
      <label className={fieldLabelClass}>
        Name
        <input
          type="text"
          value={outputName}
          onChange={(e) => updateField("outputName", e.target.value)}
          className={inputClass}
        />
      </label>
      <label className={fieldLabelClass}>
        Type
        <select
          value={outputType}
          onChange={(e) => updateField("outputType", e.target.value)}
          className={inputClass}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
          <option value="JSON">JSON</option>
        </select>
      </label>
    </BaseNode>
  );
}

export function TextNode({ id, data, selected }: NodeProps) {
  const updateField = useNodeFieldUpdater(id);
  const status = (data?.status as FlowNodeStatus | undefined) ?? "idle";
  const label = String(data?.label ?? "Text");
  const currText = String(data?.text ?? "{{input}}");

  const variables = useMemo(() => extractTemplateVariables(currText), [currText]);

  const dimensions = useMemo(() => {
    const lines = currText.split("\n");
    const maxLineLength = Math.max(...lines.map((l) => l.length), 14);
    const width = Math.min(Math.max(maxLineLength * 7.5 + 40, 235), 400);
    return { width };
  }, [currText]);

  const handles = [
    ...variables.map((varName) => ({
      type: "target" as const,
      position: Position.Left,
      id: `${id}-${varName}`,
      title: `Variable: {{ ${varName} }}`,
    })),
    {
      type: "source" as const,
      position: Position.Right,
      id: `${id}-output`,
      title: "Text Output",
    },
  ];

  return (
    <BaseNode
      id={id}
      title={label}
      subtitle="Template · Auto-Resize"
      accent="#C084FC"
      icon={<FileText className="h-3.5 w-3.5" aria-hidden="true" />}
      selected={selected}
      status={status}
      handles={handles}
      style={{ width: dimensions.width }}
    >
      <label className={fieldLabelClass}>
        Text Content
        <textarea
          value={currText}
          onChange={(e) => updateField("text", e.target.value)}
          rows={Math.min(Math.max(currText.split("\n").length, 2), 6)}
          placeholder="Enter text or {{ variable }}..."
          className={cnInput(inputClass)}
        />
      </label>
      {variables.length > 0 && (
        <div className="flex flex-wrap gap-1 border-t border-[var(--mm-border,#e4e4e7)] pt-1.5">
          {variables.map((v) => (
            <span
              key={v}
              className="rounded bg-[var(--mm-bg,#f4f4f5)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--mm-fg-muted,#52525b)]"
            >
              {`{{ ${v} }}`}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
}

function cnInput(base: string) {
  return `${base} resize-none leading-relaxed font-mono text-[11px]`;
}

export function LLMNode({ id, data, selected }: NodeProps) {
  const updateField = useNodeFieldUpdater(id);
  const status = (data?.status as FlowNodeStatus | undefined) ?? "idle";
  const label = String(data?.label ?? "LLM");
  const model = String(data?.model ?? "gemini-2.5-pro");

  return (
    <BaseNode
      id={id}
      title={label}
      subtitle="LLMs · Inference"
      accent="#A78BFA"
      icon={<Sparkles className="h-3.5 w-3.5" aria-hidden="true" />}
      selected={selected}
      status={status}
      handles={[
        { type: "target", position: Position.Left, id: `${id}-system`, title: "System Prompt" },
        { type: "target", position: Position.Left, id: `${id}-prompt`, title: "User Prompt" },
        { type: "source", position: Position.Right, id: `${id}-response`, title: "LLM Response" },
      ]}
    >
      <label className={fieldLabelClass}>
        Model
        <select
          value={model}
          onChange={(e) => updateField("model", e.target.value)}
          className={inputClass}
        >
          <option value="gemini-2.5-pro">gemini-2.5-pro</option>
          <option value="gemini-2.5-flash">gemini-2.5-flash</option>
          <option value="claude-sonnet-4">claude-sonnet-4</option>
          <option value="gpt-4o">gpt-4o</option>
        </select>
      </label>
      <div className="flex justify-between text-[10px] text-[var(--mm-fg-muted,#71717a)]">
        <span>In: system, prompt</span>
        <span>Out: response</span>
      </div>
    </BaseNode>
  );
}

export function WebhookNode({ id, data, selected }: NodeProps) {
  const updateField = useNodeFieldUpdater(id);
  const status = (data?.status as FlowNodeStatus | undefined) ?? "idle";
  const label = String(data?.label ?? "Webhook");
  const method = String(data?.method ?? "POST");
  const path = String(data?.path ?? "/webhook/test");

  return (
    <BaseNode
      id={id}
      title={label}
      subtitle="Triggers · HTTP Listener"
      accent="#84CC16"
      icon={<Webhook className="h-3.5 w-3.5" aria-hidden="true" />}
      selected={selected}
      status={status}
      handles={[
        { type: "source", position: Position.Right, id: `${id}-output`, title: "Webhook Output" },
      ]}
    >
      <label className={fieldLabelClass}>
        HTTP Method
        <select
          value={method}
          onChange={(e) => updateField("method", e.target.value)}
          className={inputClass}
        >
          <option value="POST">POST</option>
          <option value="GET">GET</option>
          <option value="PUT">PUT</option>
        </select>
      </label>
      <label className={fieldLabelClass}>
        Path
        <input
          type="text"
          value={path}
          onChange={(e) => updateField("path", e.target.value)}
          className={inputClass}
        />
      </label>
    </BaseNode>
  );
}

export function HTTPRequestNode({ id, data, selected }: NodeProps) {
  const updateField = useNodeFieldUpdater(id);
  const status = (data?.status as FlowNodeStatus | undefined) ?? "idle";
  const label = String(data?.label ?? "HTTP Request");
  const method = String(data?.method ?? "GET");
  const url = String(data?.url ?? "https://api.example.com");

  return (
    <BaseNode
      id={id}
      title={label}
      subtitle="Data · REST Call"
      accent="#38BDF8"
      icon={<Globe className="h-3.5 w-3.5" aria-hidden="true" />}
      selected={selected}
      status={status}
      handles={[
        { type: "target", position: Position.Left, id: `${id}-trigger`, title: "Trigger" },
        { type: "source", position: Position.Right, id: `${id}-response`, title: "Response" },
      ]}
    >
      <label className={fieldLabelClass}>
        Method
        <select
          value={method}
          onChange={(e) => updateField("method", e.target.value)}
          className={inputClass}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </label>
      <label className={fieldLabelClass}>
        URL
        <input
          type="text"
          value={url}
          onChange={(e) => updateField("url", e.target.value)}
          className={inputClass}
        />
      </label>
    </BaseNode>
  );
}

export function JSONTransformNode({ id, data, selected }: NodeProps) {
  const updateField = useNodeFieldUpdater(id);
  const status = (data?.status as FlowNodeStatus | undefined) ?? "idle";
  const label = String(data?.label ?? "JSON Transform");
  const operation = String(data?.operation ?? "Map");
  const field = String(data?.field ?? "data.items");

  return (
    <BaseNode
      id={id}
      title={label}
      subtitle="Data · Schema"
      accent="#14B8A6"
      icon={<Braces className="h-3.5 w-3.5" aria-hidden="true" />}
      selected={selected}
      status={status}
      handles={[
        { type: "target", position: Position.Left, id: `${id}-input`, title: "Input JSON" },
        { type: "source", position: Position.Right, id: `${id}-output`, title: "Transformed Output" },
      ]}
    >
      <label className={fieldLabelClass}>
        Operation
        <select
          value={operation}
          onChange={(e) => updateField("operation", e.target.value)}
          className={inputClass}
        >
          <option value="Map">Map</option>
          <option value="Filter">Filter</option>
          <option value="Extract Field">Extract Field</option>
          <option value="Flatten">Flatten</option>
          <option value="JSON Stringify">JSON Stringify</option>
        </select>
      </label>
      <label className={fieldLabelClass}>
        Field
        <input
          type="text"
          value={field}
          onChange={(e) => updateField("field", e.target.value)}
          className={inputClass}
        />
      </label>
    </BaseNode>
  );
}

export function ConditionNode({ id, data, selected }: NodeProps) {
  const updateField = useNodeFieldUpdater(id);
  const status = (data?.status as FlowNodeStatus | undefined) ?? "idle";
  const label = String(data?.label ?? "Condition");
  const condition = String(data?.condition ?? "Greater Than");
  const value = String(data?.value ?? "0");

  return (
    <BaseNode
      id={id}
      title={label}
      subtitle="Logic · Branch"
      accent="#F59E0B"
      icon={<GitBranch className="h-3.5 w-3.5" aria-hidden="true" />}
      selected={selected}
      status={status}
      handles={[
        { type: "target", position: Position.Left, id: `${id}-input`, title: "Input" },
        { type: "source", position: Position.Right, id: `${id}-true`, title: "True" },
        { type: "source", position: Position.Right, id: `${id}-false`, title: "False" },
      ]}
    >
      <label className={fieldLabelClass}>
        Condition
        <select
          value={condition}
          onChange={(e) => updateField("condition", e.target.value)}
          className={inputClass}
        >
          <option value="Greater Than">Greater Than</option>
          <option value="Equals">Equals</option>
          <option value="Contains">Contains</option>
          <option value="Is Empty">Is Empty</option>
        </select>
      </label>
      <label className={fieldLabelClass}>
        Threshold / Value
        <input
          type="text"
          value={value}
          onChange={(e) => updateField("value", e.target.value)}
          className={inputClass}
        />
      </label>
      <div className="flex justify-end gap-3 text-[10px] text-[var(--mm-fg-muted,#71717a)]">
        <span className="text-emerald-600">True ●</span>
        <span className="text-rose-500">False ●</span>
      </div>
    </BaseNode>
  );
}

export function MergeNode({ id, data, selected }: NodeProps) {
  const updateField = useNodeFieldUpdater(id);
  const status = (data?.status as FlowNodeStatus | undefined) ?? "idle";
  const label = String(data?.label ?? "Merge");
  const mode = String(data?.mode ?? "Combine");

  return (
    <BaseNode
      id={id}
      title={label}
      subtitle="Logic · Join"
      accent="#EC4899"
      icon={<GitMerge className="h-3.5 w-3.5" aria-hidden="true" />}
      selected={selected}
      status={status}
      handles={[
        { type: "target", position: Position.Left, id: `${id}-inputA`, title: "Input A" },
        { type: "target", position: Position.Left, id: `${id}-inputB`, title: "Input B" },
        { type: "source", position: Position.Right, id: `${id}-output`, title: "Merged Output" },
      ]}
    >
      <label className={fieldLabelClass}>
        Merge Mode
        <select
          value={mode}
          onChange={(e) => updateField("mode", e.target.value)}
          className={inputClass}
        >
          <option value="Combine">Combine</option>
          <option value="Intersection">Intersection</option>
          <option value="Append">Append</option>
        </select>
      </label>
      <div className="flex justify-between text-[10px] text-[var(--mm-fg-muted,#71717a)]">
        <span>In: A + B</span>
        <span>Out: Merged</span>
      </div>
    </BaseNode>
  );
}

export const FLOW_NODE_TYPES = {
  customInput: InputNode,
  customOutput: OutputNode,
  text: TextNode,
  llm: LLMNode,
  webhook: WebhookNode,
  httpRequest: HTTPRequestNode,
  jsonTransform: JSONTransformNode,
  ifCondition: ConditionNode,
  merge: MergeNode,
};

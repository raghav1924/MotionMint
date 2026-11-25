import type { Node, Edge } from "@xyflow/react";

export type FlowNodeCategory = "General" | "LLMs" | "Triggers" | "Data" | "Logic";

export type PocNodeType =
  | "customInput"
  | "customOutput"
  | "text"
  | "llm"
  | "webhook"
  | "httpRequest"
  | "jsonTransform"
  | "ifCondition"
  | "merge";

export type NodeExecutionStatus = "idle" | "running" | "success" | "error" | "paused";

export interface FlowPortSpec {
  id: string;
  label: string;
  type: "target" | "source";
}

export interface FlowNodeDefinition {
  type: PocNodeType;
  label: string;
  category: FlowNodeCategory;
  accent: string;
  description: string;
  tags: string[];
  inputs: FlowPortSpec[];
  outputs: FlowPortSpec[];
  defaultData: Record<string, unknown>;
}

export interface FlowNodeData extends Record<string, unknown> {
  label?: string;
  status?: NodeExecutionStatus;
  // customInput
  inputName?: string;
  inputType?: "Text" | "File";
  // customOutput
  outputName?: string;
  outputType?: "Text" | "Image" | "JSON";
  // text
  text?: string;
  // llm
  model?: string;
  // webhook
  method?: string;
  path?: string;
  // httpRequest
  url?: string;
  // jsonTransform
  operation?: string;
  field?: string;
  // ifCondition
  condition?: string;
  value?: string;
  // merge
  mode?: string;
}

export type FlowNode = Node<FlowNodeData, PocNodeType>;
export type FlowEdge = Edge;

export interface DAGValidationResult {
  numNodes: number;
  numEdges: number;
  isDag: boolean;
  topologicalOrder: string[];
  cycleNodeIds: string[];
  disconnectedNodeIds: string[];
  warnings: string[];
}

export interface ExecutionLogEntry {
  id: string;
  timestamp: string;
  nodeId: string;
  nodeLabel: string;
  status: NodeExecutionStatus;
  message: string;
  durationMs?: number;
  outputPreview?: string;
}

export interface WorkflowPreset {
  id: string;
  name: string;
  description: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

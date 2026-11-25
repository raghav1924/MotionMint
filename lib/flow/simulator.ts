import type { ExecutionLogEntry, FlowNode, PocNodeType } from "./types";

/**
 * Deterministic simulated output per POC node type.
 * Clearly labelled as a simulated adapter since the POC backend only
 * validates DAG topology (`POST /pipelines/parse`) and has no runtime runner.
 */
export function getSimulatedNodeResult(node: FlowNode): {
  durationMs: number;
  message: string;
  outputPreview: string;
} {
  const type = node.type as PocNodeType;
  switch (type) {
    case "customInput":
      return {
        durationMs: 120,
        message: `Loaded ${node.data.inputType ?? "Text"} input "${node.data.inputName ?? node.id}"`,
        outputPreview: JSON.stringify({
          source: node.data.inputName ?? "document",
          type: node.data.inputType ?? "File",
          bytes: 42810,
        }),
      };
    case "text":
      return {
        durationMs: 90,
        message: "Interpolated template variables",
        outputPreview: String(node.data.text ?? "").slice(0, 120),
      };
    case "llm":
      return {
        durationMs: 420,
        message: `Simulated inference (${node.data.model ?? "gemini-2.5-pro"})`,
        outputPreview: JSON.stringify({
          vendor: "Acme Cloud Ltd",
          total: 1490.0,
          discrepancies: 0,
        }),
      };
    case "webhook":
      return {
        durationMs: 80,
        message: `Simulated ${node.data.method ?? "POST"} ${node.data.path ?? "/webhook"}`,
        outputPreview: JSON.stringify({ event: "payload.received", ok: true }),
      };
    case "httpRequest":
      return {
        durationMs: 260,
        message: `Simulated ${node.data.method ?? "GET"} ${node.data.url ?? "endpoint"}`,
        outputPreview: JSON.stringify({ status: 200, queued: true }),
      };
    case "jsonTransform":
      return {
        durationMs: 110,
        message: `Applied ${node.data.operation ?? "Map"} on "${node.data.field ?? "data"}"`,
        outputPreview: JSON.stringify({ valid: true, discrepancyCount: 0 }),
      };
    case "ifCondition":
      return {
        durationMs: 95,
        message: `Evaluated "${node.data.condition ?? "Condition"} ${node.data.value ?? ""}" → false branch`,
        outputPreview: JSON.stringify({ branch: "false", passed: true }),
      };
    case "merge":
      return {
        durationMs: 100,
        message: `Merged upstream branches (${node.data.mode ?? "Combine"})`,
        outputPreview: JSON.stringify({ mergedKeys: 2 }),
      };
    case "customOutput":
      return {
        durationMs: 110,
        message: `Emitted ${node.data.outputType ?? "JSON"} output "${node.data.outputName ?? node.id}"`,
        outputPreview: JSON.stringify({
          outputName: node.data.outputName ?? "result",
          status: "completed_simulated",
        }),
      };
    default:
      return {
        durationMs: 100,
        message: "Processed node (simulated)",
        outputPreview: "{}",
      };
  }
}

export function formatLogTimestamp(date = new Date()): string {
  return date.toTimeString().slice(0, 8);
}

export function createLogEntry(
  partial: Omit<ExecutionLogEntry, "id" | "timestamp">
): ExecutionLogEntry {
  return {
    id: `${partial.nodeId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: formatLogTimestamp(),
    ...partial,
  };
}

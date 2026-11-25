export interface AIMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  status?: "streaming" | "complete" | "error";
  timestamp?: string;
}

export interface AIToolCall {
  id: string;
  name: string;
  status: "pending" | "running" | "success" | "error";
  durationMs?: number;
  input?: unknown;
  output?: unknown;
}

export interface AgentPlanStep {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed" | "failed" | "skipped";
  detail?: string;
}

import type { DAGValidationResult, FlowEdge, FlowNode } from "./types";

/**
 * Validates whether a workflow graph is a Directed Acyclic Graph (DAG)
 * using Kahn's topological sort algorithm — ported directly from the POC
 * FastAPI backend (`backend/main.py` -> `check_is_dag`).
 */
export function validateWorkflowDAG(
  nodes: Pick<FlowNode, "id">[],
  edges: Pick<FlowEdge, "source" | "target">[]
): DAGValidationResult {
  const nodeIds = new Set<string>();

  for (const node of nodes) {
    if (node.id) nodeIds.add(node.id);
  }
  for (const edge of edges) {
    if (edge.source) nodeIds.add(edge.source);
    if (edge.target) nodeIds.add(edge.target);
  }

  if (nodeIds.size === 0) {
    return {
      numNodes: 0,
      numEdges: 0,
      isDag: true,
      topologicalOrder: [],
      cycleNodeIds: [],
      disconnectedNodeIds: [],
      warnings: ["Canvas is empty. Add nodes to build a pipeline."],
    };
  }

  const adj = new Map<string, string[]>();
  const inDegree = new Map<string, number>();
  const connected = new Set<string>();

  for (const id of nodeIds) {
    adj.set(id, []);
    inDegree.set(id, 0);
  }

  for (const edge of edges) {
    if (edge.source && edge.target && adj.has(edge.source) && inDegree.has(edge.target)) {
      adj.get(edge.source)!.push(edge.target);
      inDegree.set(edge.target, (inDegree.get(edge.target) ?? 0) + 1);
      connected.add(edge.source);
      connected.add(edge.target);
    }
  }

  const queue: string[] = [];
  for (const [id, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(id);
  }

  const topologicalOrder: string[] = [];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    topologicalOrder.push(curr);

    for (const neighbor of adj.get(curr) ?? []) {
      const nextDeg = (inDegree.get(neighbor) ?? 0) - 1;
      inDegree.set(neighbor, nextDeg);
      if (nextDeg === 0) {
        queue.push(neighbor);
      }
    }
  }

  const visitedSet = new Set(topologicalOrder);
  const cycleNodeIds = Array.from(nodeIds).filter((id) => !visitedSet.has(id));
  const isDag = cycleNodeIds.length === 0;
  const disconnectedNodeIds =
    nodeIds.size > 1 ? Array.from(nodeIds).filter((id) => !connected.has(id)) : [];

  const warnings: string[] = [];
  if (!isDag) {
    warnings.push(
      `Cycle detected involving ${cycleNodeIds.length} node(s): ${cycleNodeIds.join(", ")}.`
    );
  }
  if (disconnectedNodeIds.length > 0) {
    warnings.push(
      `${disconnectedNodeIds.length} disconnected node(s): ${disconnectedNodeIds.join(", ")}.`
    );
  }

  return {
    numNodes: nodeIds.size,
    numEdges: edges.length,
    isDag,
    topologicalOrder,
    cycleNodeIds,
    disconnectedNodeIds,
    warnings,
  };
}

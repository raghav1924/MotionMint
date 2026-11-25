import React from "react";
import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { validateWorkflowDAG } from "@/lib/flow/dag";
import { WORKFLOW_PRESETS } from "@/lib/flow/presets";
import { extractTemplateVariables } from "@/registry/flow/pipeline-nodes";
import { PipelineOrchestrator } from "@/components/flow/pipeline-orchestrator";

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === "undefined") {
    globalThis.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  if (typeof globalThis.DOMMatrixReadOnly === "undefined") {
    // @ts-expect-error minimal jsdom polyfill for @xyflow/react
    globalThis.DOMMatrixReadOnly = class DOMMatrixReadOnly {
      m22 = 1;
    };
  }
});

describe("Flow UI Kit & Node Pipeline Orchestrator (POC Integration)", () => {
  it("validateWorkflowDAG computes Kahn topological order and detects cycles", () => {
    const docPreset = WORKFLOW_PRESETS.find((p) => p.id === "document-pipeline")!;
    const validResult = validateWorkflowDAG(docPreset.nodes, docPreset.edges);
    expect(validResult.isDag).toBe(true);
    expect(validResult.numNodes).toBe(7);
    expect(validResult.numEdges).toBe(6);
    expect(validResult.cycleNodeIds).toHaveLength(0);
    expect(validResult.topologicalOrder[0]).toBe("customInput-1");

    const cyclePreset = WORKFLOW_PRESETS.find((p) => p.id === "cycle-detection-demo")!;
    const cycleResult = validateWorkflowDAG(cyclePreset.nodes, cyclePreset.edges);
    expect(cycleResult.isDag).toBe(false);
    expect(cycleResult.cycleNodeIds).toHaveLength(3);
  });

  it("extractTemplateVariables extracts valid JS identifiers from {{ var }} syntax", () => {
    expect(extractTemplateVariables("Hello {{ firstName }}, order {{ order_id }}")).toEqual([
      "firstName",
      "order_id",
    ]);
    expect(extractTemplateVariables("Invalid {{ 123bad }} and {{ $valid }}")).toEqual([
      "$valid",
    ]);
  });

  it("PipelineOrchestrator renders POC palette, inspector, console, preset switching, and simulated run", async () => {
    render(<PipelineOrchestrator />);

    // Top toolbar & preset loaded
    expect(screen.getByLabelText("Workflow name")).toHaveValue("Document Verification Pipeline");
    expect(screen.getByText(/Simulated Execution Adapter/i)).toBeInTheDocument();
    expect(screen.getByText(/Valid DAG \(7 nodes · 6 edges\)/i)).toBeInTheDocument();

    // Palette click-to-add adds a Webhook node
    fireEvent.click(screen.getByRole("button", { name: "Add Webhook node" }));
    expect(screen.getByText(/Valid DAG \(8 nodes · 6 edges\)/i)).toBeInTheDocument();

    // Validate DAG logs topological result
    fireEvent.click(screen.getByRole("button", { name: "Validate DAG" }));
    expect(screen.getByText(/Kahn DAG Validator/i)).toBeInTheDocument();

    // Switch to Cycle Detection preset
    fireEvent.change(screen.getByLabelText("Load workflow preset"), {
      target: { value: "cycle-detection-demo" },
    });
    expect(screen.getByText(/Cycle Detected \(Invalid DAG\)/i)).toBeInTheDocument();

    // Switch back to Document Pipeline and run simulation
    fireEvent.change(screen.getByLabelText("Load workflow preset"), {
      target: { value: "document-pipeline" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Run \(Simulated\)/i }));

    await waitFor(
      () => {
        expect(screen.getAllByText(/Simulated inference/i).length).toBeGreaterThan(0);
      },
      { timeout: 4000 }
    );
  }, 15000);
});

import React from "react";
import { WorkspacePage, WorkspaceHeader } from "@/components/workspace/workspace-page";
import { PipelineOrchestrator } from "@/components/flow/pipeline-orchestrator";

export default function FlowPage() {
  return (
    <WorkspacePage className="max-w-[1440px] pb-6 space-y-6">
      <WorkspaceHeader
        eyebrow="WORKFLOWS"
        title="Node Pipeline Orchestrator"
        description="Built with the portable MotionMint Flow UI Kit (@xyflow/react) and ported from our VectorShift POC: 9 typed nodes, Kahn's DAG validation, and a clearly labelled simulated execution adapter."
      />
      <PipelineOrchestrator />
    </WorkspacePage>
  );
}

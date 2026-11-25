import React from "react";
import { PipelineOrchestrator } from "@/components/flow/pipeline-orchestrator";

export default function FlowPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-3 py-4 sm:px-6 space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[var(--ws-text-primary)]">
            Node Pipeline Orchestrator
          </h1>
          <p className="text-xs text-[var(--ws-text-secondary)]">
            Built with MotionMint Flow UI Kit &amp; ported from the VectorShift POC (9 node types,
            Kahn&apos;s DAG validation, and a clearly labelled simulated execution adapter).
          </p>
        </div>
      </div>

      <PipelineOrchestrator />
    </div>
  );
}

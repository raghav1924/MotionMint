import React from "react";
import Link from "next/link";
import { Workflow } from "lucide-react";

export default function FlowPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface)] px-3 py-1 text-xs text-[var(--mm-accent)]">
          <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Phase 6 Milestone</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--mm-fg)]">
          MotionMint Flow &amp; Node Pipeline Orchestrator
        </h1>
        <p className="text-sm text-[var(--mm-fg-muted)] max-w-2xl">
          Planned reusable node-workflow UI kit built on <code className="font-mono text-xs">@xyflow/react</code>{" "}
          (MIT), cleanly separated from the Node Pipeline Orchestrator reference demo.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="mm-card p-6 space-y-3">
          <h2 className="text-base font-semibold text-[var(--mm-fg)]">
            Layer 1: Flow UI Kit (Reusable)
          </h2>
          <p className="text-xs text-[var(--mm-fg-muted)] leading-relaxed">
            Canvas wrapper, typed node shells (Input, Processing, Conditional, Output),
            animated edges, minimap, node palette, inspector, and execution console.
          </p>
        </div>

        <div className="mm-card p-6 space-y-3">
          <h2 className="text-base font-semibold text-[var(--mm-fg)]">
            Layer 2: Node Pipeline Orchestrator (Reference App)
          </h2>
          <p className="text-xs text-[var(--mm-fg-muted)] leading-relaxed">
            Flagship demo pipeline: Document Upload → Extraction → Validation → Discrepancy
            Detection → Human Review → Structured Output, backed by a clearly labelled
            simulated execution adapter.
          </p>
        </div>
      </div>

      <div className="mm-card p-5 space-y-2">
        <h3 className="text-sm font-semibold text-[var(--mm-fg)]">
          Prototype Audit Status: Unable to verify yet
        </h3>
        <p className="text-xs text-[var(--mm-fg-muted)]">
          The Google Drive prototype link is not directly accessible from the sandboxed
          environment. Provide the local source folder or archive when ready to begin
          Phase 6.
        </p>
        <Link
          href="/docs"
          className="inline-block pt-1 text-xs font-medium text-[var(--mm-accent)] hover:underline"
        >
          Read Architecture &amp; Roadmap →
        </Link>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";

export interface TerminalLoginProps {
  promptLabel?: string;
  className?: string;
}

/**
 * Command-line inspired authentication prompt with validation and session output.
 */
export function TerminalLogin({
  promptLabel = "renderjoy-auth --session",
  className = "",
}: TerminalLoginProps) {
  const [handle, setHandle] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) {
      setStatus("error: handle required");
      return;
    }
    setStatus(`authenticated: ${handle.trim()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 font-mono text-xs ${className}`.trim()}
    >
      <div className="mb-3 flex items-center gap-1.5 border-b border-[var(--mm-border)] pb-2 text-[10px] text-[var(--mm-fg-muted)]">
        <span className="h-2 w-2 rounded-full bg-rose-500/80" />
        <span className="h-2 w-2 rounded-full bg-amber-500/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
        <span className="ml-2">{promptLabel}</span>
      </div>

      <label className="block space-y-1.5 text-left">
        <span className="text-[11px] text-[var(--mm-accent)]">$ login --handle</span>
        <div className="flex gap-2">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="dev@studio.io"
            aria-label="Developer handle"
            className="w-full rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1.5 text-xs text-[var(--mm-fg)] placeholder:text-[var(--mm-fg-muted)]"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-[var(--mm-accent)] px-3 py-1.5 text-[11px] font-semibold text-[var(--mm-accent-fg)] cursor-pointer"
          >
            Run
          </button>
        </div>
      </label>

      {status && (
        <p role="status" className="mt-2.5 text-left text-[11px] text-[var(--mm-fg-muted)]">
          {status}
        </p>
      )}
    </form>
  );
}

"use client";

import React, { useState } from "react";

export interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  connected: boolean;
}

const DEFAULT_INTEGRATIONS: IntegrationItem[] = [
  { id: "github", name: "GitHub", category: "Source", connected: true },
  { id: "vercel", name: "Vercel", category: "Hosting", connected: true },
  { id: "stripe", name: "Stripe", category: "Billing", connected: false },
  { id: "linear", name: "Linear", category: "Issues", connected: false },
];

export interface IntegrationWallProps {
  items?: IntegrationItem[];
  className?: string;
}

/**
 * Interactive ecosystem integration grid with per-connector activation state.
 */
export function IntegrationWall({
  items = DEFAULT_INTEGRATIONS,
  className = "",
}: IntegrationWallProps) {
  const [connectors, setConnectors] = useState<IntegrationItem[]>(items);

  const toggleConnector = (id: string) => {
    setConnectors((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
  };

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 ${className}`.trim()}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mm-fg-muted)]">
          Ecosystem Connectors
        </span>
        <span className="font-mono text-[11px] text-[var(--mm-accent)]">
          {connectors.filter((c) => c.connected).length}/{connectors.length} Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {connectors.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => toggleConnector(item.id)}
            aria-pressed={item.connected}
            className={`flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-colors cursor-pointer ${
              item.connected
                ? "border-[var(--mm-accent)] bg-[var(--mm-bg)]"
                : "border-[var(--mm-border)] bg-[var(--mm-bg)]/60 opacity-80 hover:opacity-100"
            }`}
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-xs font-semibold text-[var(--mm-fg)]">{item.name}</span>
              <span
                className={`h-2 w-2 rounded-full ${
                  item.connected ? "bg-[var(--mm-accent)]" : "bg-[var(--mm-border)]"
                }`}
              />
            </div>
            <span className="font-mono text-[10px] text-[var(--mm-fg-muted)]">
              {item.category} · {item.connected ? "Connected" : "Connect"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

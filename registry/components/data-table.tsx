"use client";

import React, { useMemo, useState } from "react";

export interface TableRow {
  id: string;
  service: string;
  region: string;
  latencyMs: number;
  status: "Healthy" | "Degraded";
}

const DEFAULT_ROWS: TableRow[] = [
  { id: "r1", service: "Registry Edge", region: "us-east", latencyMs: 14, status: "Healthy" },
  { id: "r2", service: "Auth Gate", region: "eu-west", latencyMs: 28, status: "Healthy" },
  { id: "r3", service: "Asset Worker", region: "ap-south", latencyMs: 62, status: "Degraded" },
];

export interface DataTableProps {
  rows?: TableRow[];
  className?: string;
}

/**
 * Searchable, sortable operational data table with accessible column sort state.
 */
export function DataTable({
  rows = DEFAULT_ROWS,
  className = "",
}: DataTableProps) {
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows
      .filter(
        (r) =>
          !q ||
          r.service.toLowerCase().includes(q) ||
          r.region.toLowerCase().includes(q)
      )
      .sort((a, b) => (sortAsc ? a.latencyMs - b.latencyMs : b.latencyMs - a.latencyMs));
  }, [rows, query, sortAsc]);

  return (
    <div
      className={`w-full max-w-lg rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter service or region..."
          aria-label="Filter table rows"
          className="w-full rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1.5 text-xs text-[var(--mm-fg)] placeholder:text-[var(--mm-fg-muted)]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[var(--mm-border)] font-mono text-[10px] uppercase tracking-wider text-[var(--mm-fg-muted)]">
              <th className="py-2 pr-3">Service</th>
              <th className="py-2 pr-3">Region</th>
              <th className="py-2 pr-3" aria-sort={sortAsc ? "ascending" : "descending"}>
                <button
                  type="button"
                  onClick={() => setSortAsc((s) => !s)}
                  className="inline-flex items-center gap-1 hover:text-[var(--mm-fg)] cursor-pointer"
                >
                  Latency {sortAsc ? "↑" : "↓"}
                </button>
              </th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-[var(--mm-fg-muted)]">
                  No matching services
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="border-b border-[var(--mm-border)] last:border-none">
                  <td className="py-2 pr-3 font-medium text-[var(--mm-fg)]">{row.service}</td>
                  <td className="py-2 pr-3 font-mono text-[var(--mm-fg-muted)]">{row.region}</td>
                  <td className="py-2 pr-3 font-mono tabular-nums text-[var(--mm-fg)]">
                    {row.latencyMs}ms
                  </td>
                  <td className="py-2">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 font-mono text-[10px] ${
                        row.status === "Healthy"
                          ? "bg-emerald-500/15 text-emerald-500"
                          : "bg-amber-500/15 text-amber-500"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

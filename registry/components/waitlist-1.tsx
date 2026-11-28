"use client";

import React, { useState } from "react";

export interface WaitlistSpotlightProps {
  initialCount?: number;
  className?: string;
}

/**
 * Early-access waitlist card with queue counter and email validation.
 */
export function WaitlistSpotlight({
  initialCount = 1428,
  className = "",
}: WaitlistSpotlightProps) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [count, setCount] = useState(initialCount);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    if (!joined) {
      setJoined(true);
      setCount((c) => c + 1);
    }
  };

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 text-left space-y-3 ${className}`.trim()}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mm-accent)]">
          Early Access
        </span>
        <span className="font-mono text-[11px] tabular-nums text-[var(--mm-fg-muted)]">
          #{count} in queue
        </span>
      </div>

      <h3 className="text-base font-bold tracking-tight text-[var(--mm-fg)]">
        Reserve your studio invite
      </h3>

      {joined ? (
        <p role="status" className="rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-2 font-mono text-xs text-[var(--mm-accent)]">
          Spot #{count} reserved for {email}
        </p>
      ) : (
        <form onSubmit={handleJoin} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@studio.dev"
            aria-label="Waitlist email"
            className="w-full rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1.5 text-xs text-[var(--mm-fg)] placeholder:text-[var(--mm-fg-muted)]"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-[var(--mm-accent)] px-3.5 py-1.5 font-mono text-xs font-semibold text-[var(--mm-accent-fg)] cursor-pointer"
          >
            Join Waitlist
          </button>
        </form>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";

export interface HorizonFooterProps {
  brand?: string;
  className?: string;
}

/**
 * Editorial horizon footer with accent horizon divider and release-notes opt-in.
 */
export function HorizonFooter({
  brand = "RenderJoy",
  className = "",
}: HorizonFooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <footer
      className={`w-full max-w-lg rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 text-left ${className}`.trim()}
    >
      <div
        aria-hidden="true"
        className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-[var(--mm-accent)] to-transparent"
      />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold tracking-tight text-[var(--mm-fg)]">{brand}</p>
          <p className="font-mono text-[10px] text-[var(--mm-fg-muted)]">
            MIT · 118+ Registry Components
          </p>
        </div>

        {subscribed ? (
          <p role="status" className="font-mono text-[11px] text-[var(--mm-accent)]">
            Subscribed to release notes
          </p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex gap-1.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Release notes email"
              aria-label="Release notes email"
              className="rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] px-2.5 py-1 text-xs text-[var(--mm-fg)] placeholder:text-[var(--mm-fg-muted)]"
            />
            <button
              type="submit"
              className="rounded-lg bg-[var(--mm-accent)] px-3 py-1 font-mono text-[11px] font-semibold text-[var(--mm-accent-fg)] cursor-pointer"
            >
              Join
            </button>
          </form>
        )}
      </div>
    </footer>
  );
}

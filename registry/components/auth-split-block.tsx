"use client";

import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";

export interface AuthSplitBlockProps {
  heading?: string;
  className?: string;
}

/**
 * Two-column editorial authentication block with magic-link toggle and accessible validation.
 */
export function AuthSplitBlock({
  heading = "Sign in to RenderJoy",
  className = "",
}: AuthSplitBlockProps) {
  const [magicLink, setMagicLink] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("Enter a valid email address.");
      return;
    }
    setStatus(magicLink ? `Magic link sent to ${email}.` : `Signed in as ${email}.`);
  };

  return (
    <div
      className={`grid w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] text-[var(--mm-fg)] shadow-sm sm:grid-cols-5 ${className}`.trim()}
    >
      <div className="flex flex-col justify-between border-b border-[var(--mm-border)] bg-[var(--mm-bg)] p-4 sm:col-span-2 sm:border-r sm:border-b-0">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--mm-fg-muted)]">
          Workspace
        </span>
        <p className="text-xs leading-relaxed text-[var(--mm-fg-muted)]">
          Scoped 58-variant themes, zero-lock-in React primitives.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-3 sm:col-span-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">{heading}</h3>
          <button
            type="button"
            onClick={() => setMagicLink((m) => !m)}
            aria-pressed={magicLink}
            className="text-[11px] font-mono text-[var(--mm-accent)] hover:underline cursor-pointer"
          >
            {magicLink ? "Use Password" : "Magic Link"}
          </button>
        </div>

        <label className="block space-y-1 text-xs">
          <span className="text-[var(--mm-fg-muted)]">Email</span>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[var(--mm-fg-muted)]" aria-hidden="true" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.dev"
              className="h-8 w-full rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] pl-8 pr-2 text-xs"
            />
          </div>
        </label>

        {!magicLink && (
          <label className="block space-y-1 text-xs">
            <span className="text-[var(--mm-fg-muted)]">Password</span>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[var(--mm-fg-muted)]" aria-hidden="true" />
              <input
                type="password"
                placeholder="••••••••"
                className="h-8 w-full rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] pl-8 pr-2 text-xs"
              />
            </div>
          </label>
        )}

        <button
          type="submit"
          className="h-8 w-full rounded-lg bg-[var(--mm-accent)] text-xs font-medium text-[var(--mm-accent-fg)] hover:opacity-90 cursor-pointer"
        >
          {magicLink ? "Send Magic Link" : "Continue"}
        </button>

        {status && (
          <p role="status" className="text-[11px] text-[var(--mm-fg-muted)]">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

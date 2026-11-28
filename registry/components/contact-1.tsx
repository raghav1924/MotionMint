"use client";

import React, { useState } from "react";

const TOPICS = ["Sales", "Support", "Enterprise"] as const;

export interface ContactCardProps {
  className?: string;
}

/**
 * Clean studio contact card with topic selector and instant confirmation.
 */
export function ContactCard({ className = "" }: ContactCardProps) {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("Sales");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
  };

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 text-left ${className}`.trim()}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--mm-fg)]">Contact Studio</span>
        <div role="group" aria-label="Contact topic" className="flex gap-1">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={`rounded-full px-2 py-0.5 font-mono text-[10px] cursor-pointer ${
                topic === t
                  ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                  : "border border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {sent ? (
        <p role="status" className="rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-2 font-mono text-xs text-[var(--mm-accent)]">
          Inquiry sent to {topic} team
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Tell ${topic} about your team...`}
            aria-label="Contact message"
            className="w-full rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-2 text-xs text-[var(--mm-fg)] placeholder:text-[var(--mm-fg-muted)]"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-[var(--mm-accent)] py-1.5 font-mono text-xs font-semibold text-[var(--mm-accent-fg)] cursor-pointer"
          >
            Send to {topic}
          </button>
        </form>
      )}
    </div>
  );
}

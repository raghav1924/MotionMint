"use client";

import React, { useState } from "react";
import { Check, KeyRound, ShieldCheck, AlertCircle } from "lucide-react";
import { CopyButton } from "@/registry/components/copy-button";

const TOKEN_FORMAT = /^rj_pro_[a-zA-Z0-9]{16,64}$/;

export function ProLicenseManager() {
  const [tokenInput, setTokenInput] = useState("");
  const trimmed = tokenInput.trim();
  const isValidFormat = TOKEN_FORMAT.test(trimmed);

  const componentsJsonSnippet = JSON.stringify(
    {
      registries: {
        "@renderjoy": "https://renderjoy.dev/r/{name}.json",
        "@renderjoy-pro": {
          url: "https://renderjoy.dev/api/pro/registry/{name}",
          headers: {
            Authorization: "Bearer ${RENDERJOY_PRO_TOKEN}",
          },
        },
      },
    },
    null,
    2
  );

  return (
    <section
      aria-label="Pro licence and registry configuration"
      className="rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-6 sm:p-8 space-y-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-[var(--ws-text-muted)]">
            <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Authenticated Pro Registry</span>
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--ws-text-primary)]">
            Licence Token & CLI Setup
          </h2>
          <p className="max-w-xl text-sm text-[var(--ws-text-secondary)]">
            Pro components resolve through <code className="font-mono text-xs">/api/pro/registry/[slug]</code> using SHA-256 hashed Bearer tokens.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] p-4">
          <label className="block space-y-1.5 text-xs">
            <span className="font-medium text-[var(--ws-text-primary)]">
              Validate Token Format (`rj_pro_...`)
            </span>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="rj_pro_example1234567890"
              aria-label="Pro licence token"
              className="h-9 w-full rounded-xl border border-[var(--ws-border)] bg-[var(--ws-bg)] px-3 font-mono text-xs text-[var(--ws-text-primary)]"
            />
          </label>

          {trimmed.length > 0 && (
            <p
              className={`flex items-center gap-1.5 text-xs ${
                isValidFormat ? "text-emerald-500" : "text-amber-500"
              }`}
            >
              {isValidFormat ? (
                <>
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Valid token format. Ready for `RENDERJOY_PRO_TOKEN` env var.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Expected `rj_pro_` followed by 16–64 alphanumeric characters.</span>
                </>
              )}
            </p>
          )}

          <ul className="space-y-1.5 pt-2 text-xs text-[var(--ws-text-secondary)]">
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              <span>SHA-256 + `crypto.timingSafeEqual` verification</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              <span>India MoR payout & GST compliance documented in `docs/PRO_INFRASTRUCTURE_AND_MOR.md`</span>
            </li>
          </ul>
        </div>

        <div className="space-y-2 rounded-2xl border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-medium text-[var(--ws-text-primary)]">
              components.json
            </span>
            <CopyButton value={componentsJsonSnippet} />
          </div>
          <pre className="overflow-x-auto rounded-xl border border-[var(--ws-border-subtle)] bg-[var(--ws-bg)] p-3 font-mono text-[11px] text-[var(--ws-text-primary)]">
            <code>{componentsJsonSnippet}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

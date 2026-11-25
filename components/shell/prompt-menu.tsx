"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy, Terminal, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface PromptMenuProps {
  open: boolean;
  onClose: () => void;
  slug: string | null;
}

export function PromptMenu({ open, onClose, slug }: PromptMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const packageName = slug ? `${BRAND.registryNamespace}/${slug}` : `${BRAND.registryNamespace}/ui`;
  const installCmd = `npx shadcn@latest add ${packageName}`;
  const aiPrompt = `Install and integrate ${packageName} from ${BRAND.name} (${installCmd}). Respect --mm-* tokens, sound off by default, and WCAG 2.2 AA accessibility.`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard?.writeText(text);
    } catch {
      // Ignore clipboard errors in restricted environments
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const externalProviders = [
    {
      id: "chatgpt",
      label: "Open in ChatGPT",
      href: `https://chatgpt.com/?q=${encodeURIComponent(aiPrompt)}`,
    },
    {
      id: "claude",
      label: "Open in Claude",
      href: `https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`,
    },
    {
      id: "cursor",
      label: "Open in Cursor",
      href: `cursor://anysphere.cursor-deeplink/prompt?text=${encodeURIComponent(aiPrompt)}`,
    },
    {
      id: "copilot",
      label: "Open in Copilot",
      href: `https://github.com/copilot?prompt=${encodeURIComponent(aiPrompt)}`,
    },
  ];

  const terminalActions = [
    {
      id: "claude-code",
      label: "Copy for Claude Code",
      text: `claude "${aiPrompt}"`,
    },
    {
      id: "codex",
      label: "Copy for Codex",
      text: `codex "${aiPrompt}"`,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          role="menu"
          aria-label="Prompt and AI actions"
          initial={prefersReduced ? false : { opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "absolute bottom-14 left-1/2 -translate-x-1/2 w-[270px] rounded-[22px] border border-[var(--ws-border)]",
            "bg-[var(--ws-floating)] p-2 text-[var(--ws-text-primary)] shadow-[var(--ws-shadow-menu)] z-50"
          )}
        >
          <div className="space-y-0.5">
            {externalProviders.map((provider) => (
              <a
                key={provider.id}
                href={provider.href}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={() => {
                  void handleCopy(provider.id, aiPrompt);
                  onClose();
                }}
                className="flex items-center justify-between rounded-[14px] px-3 py-2 text-[13px] font-medium hover:bg-[var(--ws-surface-hover)] transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--ws-text-secondary)]" aria-hidden="true" />
                  <span>{provider.label}</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--ws-text-secondary)]" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="my-2 h-px bg-[var(--ws-border-subtle)]" />

          <div className="px-3 py-1 text-[11px] font-medium text-[var(--ws-text-secondary)]">
            In your terminal
          </div>
          <div className="space-y-0.5">
            {terminalActions.map((act) => {
              const isCopied = copiedId === act.id;
              return (
                <button
                  key={act.id}
                  type="button"
                  role="menuitem"
                  onClick={() => handleCopy(act.id, act.text)}
                  className="flex w-full items-center justify-between rounded-[14px] px-3 py-2 text-[13px] font-medium hover:bg-[var(--ws-surface-hover)] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Terminal className="h-3.5 w-3.5 text-[var(--ws-text-secondary)]" aria-hidden="true" />
                    <span>{act.label}</span>
                  </span>
                  {isCopied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-[var(--ws-text-secondary)]" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModalDialog({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "w-full max-w-lg rounded-xl border border-[var(--ws-border)] bg-[var(--ws-surface)] text-[var(--ws-text-primary)] shadow-2xl outline-none",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function Drawer({
  open,
  onClose,
  title,
  side = "left",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: "left" | "right" | "bottom";
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          "fixed bg-[var(--ws-surface)] text-[var(--ws-text-primary)] border-[var(--ws-border)] shadow-2xl overflow-y-auto",
          side === "left" && "inset-y-0 left-0 w-72 border-r",
          side === "right" && "inset-y-0 right-0 w-80 border-l",
          side === "bottom" && "inset-x-0 bottom-0 max-h-[80vh] rounded-t-2xl border-t"
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--ws-border)] px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ws-text-secondary)]">
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export interface ContextMenuItem {
  id: string;
  label: string;
  shortcut?: string;
  disabled?: boolean;
  onSelect: () => void;
}

export function ContextMenu({
  items,
  children,
  className,
}: {
  items: ContextMenuItem[];
  children: React.ReactNode;
  className?: string;
}) {
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pos) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPos(null);
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setPos(null);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [pos]);

  return (
    <div
      className={className}
      onContextMenu={(e) => {
        e.preventDefault();
        setPos({ x: e.clientX, y: e.clientY });
      }}
    >
      {children}
      {pos && (
        <div
          ref={menuRef}
          role="menu"
          style={{ left: pos.x, top: pos.y }}
          className="fixed z-50 min-w-[190px] rounded-lg border border-[var(--ws-border-strong)] bg-[var(--ws-surface-elevated)] p-1 text-[var(--ws-text-primary)] shadow-xl"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;
                item.onSelect();
                setPos(null);
              }}
              className="flex w-full items-center justify-between gap-4 rounded-md px-2.5 py-1.5 text-left text-xs hover:bg-[var(--ws-surface-hover)] disabled:opacity-40 cursor-pointer"
            >
              <span>{item.label}</span>
              {item.shortcut && (
                <kbd className="font-mono text-[10px] text-[var(--ws-text-muted)]">
                  {item.shortcut}
                </kbd>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

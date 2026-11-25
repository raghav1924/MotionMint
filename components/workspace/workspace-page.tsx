import React from "react";
import { cn } from "@/lib/utils";

export function WorkspacePage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[1360px] px-4 pt-14 pb-8 sm:px-8 space-y-10",
        className
      )}
    >
      {children}
    </div>
  );
}

export function WorkspaceHeader({
  eyebrow,
  title,
  description,
  actions,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4",
        centered
          ? "mx-auto max-w-2xl items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between"
      )}
    >
      <div className={cn("space-y-2", !centered && "max-w-2xl")}>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ws-text-muted)]">
          {eyebrow}
        </p>
        <h1 className="text-[30px] sm:text-[36px] font-semibold tracking-tight leading-tight text-[var(--ws-text-primary)]">
          {title}
        </h1>
        <p className="text-sm leading-relaxed text-[var(--ws-text-secondary)]">
          {description}
        </p>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
    </header>
  );
}

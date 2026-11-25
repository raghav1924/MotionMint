"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  Sun,
  Moon,
  Monitor,
  Volume2,
  VolumeX,
  Palette,
  Play,
  Workflow,
  BookOpen,
  Layers,
  ChevronRight,
  Zap,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { useMotionMint, type AppearanceMode } from "@/components/site/providers";
import { Drawer } from "@/components/ui/overlay";
import { cn } from "@/lib/utils";

const WORKSPACE_NAV = [
  { href: "/components", label: "Components", icon: Play },
  { href: "/motion", label: "Motion Lab", icon: Zap },
  { href: "/sounds", label: "Sound Lab", icon: Volume2 },
  { href: "/themes", label: "29 Themes", icon: Palette },
  { href: "/flow", label: "Flow Orchestrator", icon: Workflow },
  { href: "/docs/installation", label: "Install Docs", icon: BookOpen },
];

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    appearance,
    setAppearance,
    soundEnabled,
    toggleSound,
    setCommandOpen,
  } = useMotionMint();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const implemented = CATALOG_ITEMS.filter((c) => c.status === "implemented");
  const categories = Array.from(new Set(implemented.map((c) => c.category)));

  const currentComp = implemented.find((c) => pathname === `/components/${c.slug}`);
  const sectionLabel = currentComp
    ? currentComp.name
    : pathname.startsWith("/themes")
      ? "29-Theme Studio"
      : pathname.startsWith("/sounds")
        ? "Sound & Haptics Lab"
        : pathname.startsWith("/flow")
          ? "Node Pipeline Orchestrator"
          : "Workspace";

  const sidebarContent = (isCollapsed: boolean, onNavigate?: () => void) => (
    <div className="flex h-full flex-col justify-between gap-6 py-4">
      <div className="space-y-6">
        {/* Workspace Sections */}
        <div className="px-2.5 space-y-1">
          {!isCollapsed && (
            <p className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ws-text-muted)]">
              Workspace
            </p>
          )}
          {WORKSPACE_NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                title={isCollapsed ? label : undefined}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors",
                  isCollapsed && "justify-center px-0",
                  active
                    ? "bg-[var(--ws-accent-soft)] text-[var(--ws-accent)]"
                    : "text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)]"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {!isCollapsed && <span className="truncate">{label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Component Categories */}
        <div className="px-2.5 space-y-3">
          {!isCollapsed && (
            <div className="flex items-center justify-between px-2">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--ws-text-muted)]">
                Components ({implemented.length})
              </p>
              <Link
                href="/components"
                onClick={onNavigate}
                className="text-[10px] text-[var(--ws-accent)] hover:underline"
              >
                All
              </Link>
            </div>
          )}

          {isCollapsed ? (
            <Link
              href="/components"
              title="All Components"
              onClick={onNavigate}
              className="flex items-center justify-center rounded-lg py-2 text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)]"
            >
              <Layers className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            categories.map((cat) => {
              const items = implemented.filter((c) => c.category === cat);
              return (
                <div key={cat} className="space-y-0.5">
                  <p className="px-2 pt-1 text-[10px] font-medium text-[var(--ws-text-muted)]">
                    {cat}
                  </p>
                  {items.map((c) => {
                    const active = pathname === `/components/${c.slug}`;
                    return (
                      <Link
                        key={c.slug}
                        href={`/components/${c.slug}`}
                        onClick={onNavigate}
                        className={cn(
                          "flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors",
                          active
                            ? "bg-[var(--ws-accent-soft)] font-semibold text-[var(--ws-accent)]"
                            : "text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)]"
                        )}
                      >
                        <span className="truncate">{c.name}</span>
                      </Link>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--ws-bg)] text-[var(--ws-text-primary)]">
      {/* Compact 56px Workspace Header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-3 border-b border-[var(--ws-border)] bg-[var(--ws-surface)]/95 px-3 sm:px-4 backdrop-blur-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open workspace sidebar"
            className="inline-flex md:hidden h-8 w-8 items-center justify-center rounded-md border border-[var(--ws-border)] text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-sm text-[var(--ws-text-primary)] shrink-0"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--ws-accent)] text-[var(--ws-accent-fg)]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="hidden sm:inline">{BRAND.name}</span>
          </Link>

          <ChevronRight className="h-3.5 w-3.5 text-[var(--ws-text-muted)] shrink-0" aria-hidden="true" />
          <span className="truncate text-xs font-medium text-[var(--ws-text-secondary)]">
            {sectionLabel}
          </span>
        </div>

        {/* Center Command Palette Trigger */}
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          aria-label="Open command palette"
          className="hidden sm:flex h-8 w-64 items-center justify-between rounded-md border border-[var(--ws-border)] bg-[var(--ws-bg)] px-2.5 text-xs text-[var(--ws-text-muted)] hover:border-[var(--ws-border-strong)] cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Search or jump...</span>
          </span>
          <kbd className="rounded border border-[var(--ws-border)] px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </button>

        {/* Right Controls: Appearance (Dark/Light/System) + Sound */}
        <div className="flex items-center gap-1.5">
          <div
            role="group"
            aria-label="Application appearance"
            className="flex items-center rounded-md border border-[var(--ws-border)] bg-[var(--ws-bg)] p-0.5"
          >
            {(
              [
                { id: "dark", icon: Moon, label: "Dark appearance" },
                { id: "light", icon: Sun, label: "Light appearance" },
                { id: "system", icon: Monitor, label: "System appearance" },
              ] as { id: AppearanceMode; icon: typeof Moon; label: string }[]
            ).map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setAppearance(id)}
                aria-pressed={appearance === id}
                aria-label={label}
                title={label}
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center rounded cursor-pointer transition-colors",
                  appearance === id
                    ? "bg-[var(--ws-surface-elevated)] text-[var(--ws-accent)]"
                    : "text-[var(--ws-text-muted)] hover:text-[var(--ws-text-primary)]"
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? "Mute UI sounds" : "Enable UI sounds"}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium cursor-pointer",
              soundEnabled
                ? "border-[var(--ws-accent)] bg-[var(--ws-accent-soft)] text-[var(--ws-accent)]"
                : "border-[var(--ws-border)] bg-[var(--ws-bg)] text-[var(--ws-text-secondary)]"
            )}
          >
            {soundEnabled ? (
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Desktop Collapsible Sidebar */}
        <aside
          aria-label="Workspace sidebar"
          className={cn(
            "hidden md:flex flex-col shrink-0 border-r border-[var(--ws-border)] bg-[var(--ws-surface)] transition-[width] duration-200",
            collapsed ? "w-[68px]" : "w-[248px]"
          )}
        >
          <div className="flex items-center justify-end border-b border-[var(--ws-border)] px-2.5 py-2">
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[var(--ws-text-muted)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)] cursor-pointer"
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
              ) : (
                <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">{sidebarContent(collapsed)}</div>
        </aside>

        {/* Workspace Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        title="Workspace Navigation"
        side="left"
      >
        {sidebarContent(false, () => setMobileDrawerOpen(false))}
      </Drawer>
    </div>
  );
}

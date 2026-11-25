"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PanelLeftClose } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { useMotionMint } from "@/components/site/providers";
import { ComponentLivePreview } from "@/components/shared/component-preview-card";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  slug?: string;
  badge?: string;
}

interface NavSection {
  heading: string;
  href: string;
  items: NavItem[];
}

const SECTIONS: NavSection[] = [
  {
    heading: "Getting started",
    href: "/components",
    items: [
      { label: "Home", href: "/" },
      { label: "Components", href: "/components" },
      { label: "Themes (29)", href: "/themes" },
      { label: "Motion Lab", href: "/motion" },
      { label: "Sound Lab", href: "/sounds" },
      { label: "Flow Orchestrator", href: "/flow" },
      { label: "Installation", href: "/docs/installation" },
    ],
  },
  {
    heading: "AI",
    href: "/components?category=AI",
    items: CATALOG_ITEMS.filter((c) => c.status === "implemented" && c.category === "AI").map(
      (c) => ({
        label: c.name,
        href: `/components/${c.slug}`,
        slug: c.slug,
        badge: c.tier === "pro" ? "Pro" : undefined,
      })
    ),
  },
  {
    heading: "Controls",
    href: "/components?category=Controls",
    items: CATALOG_ITEMS.filter(
      (c) => c.status === "implemented" && c.category === "Controls"
    ).map((c) => ({
      label: c.name,
      href: `/components/${c.slug}`,
      slug: c.slug,
      badge: c.tier === "pro" ? "Pro" : undefined,
    })),
  },
  {
    heading: "Essentials",
    href: "/components",
    items: CATALOG_ITEMS.filter(
      (c) =>
        c.status === "implemented" &&
        c.category !== "Controls" &&
        c.category !== "AI"
    ).map((c) => ({
      label: c.name,
      href: `/components/${c.slug}`,
      slug: c.slug,
      badge: c.tier === "pro" ? "Pro" : undefined,
    })),
  },
];

const EASE_OUT_EXPO = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export function EditorialSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, resolvedAppearance } = useMotionMint();
  const prefersReduced = useReducedMotion();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const isDark = resolvedAppearance === "dark";

  useEffect(() => {
    if (!sidebarOpen) {
      setHoveredSlug(null);
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <div className="fixed inset-0 z-[60] flex p-2.5 sm:p-3">
          {/* Translucent backdrop */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-[3px]"
            aria-hidden="true"
          />

          {/* Floating Editorial Sidebar Card */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Editorial Navigation"
            initial={prefersReduced ? false : { x: "-104%", opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReduced ? undefined : { x: "-104%", opacity: 0.6 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative z-10 flex h-full w-[280px] sm:w-[296px] flex-col overflow-hidden rounded-[24px]",
              "border border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] text-[var(--ws-text-primary)]",
              "shadow-[0_2px_24px_-12px_rgba(0,0,0,0.25)]"
            )}
          >
            {/* Compact header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 text-[13px] font-semibold tracking-tight text-[var(--ws-text-primary)]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-[#111111] text-[var(--ws-accent,#dfff00)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
                  </svg>
                </span>
                <span>{BRAND.name}</span>
              </Link>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close navigation overlay"
                className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)] cursor-pointer transition-colors"
              >
                <PanelLeftClose className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable ruler-indexed navigation */}
            <div className="relative flex min-h-0 flex-1 flex-col">
              <div className="relative min-h-0 flex-1">
                <nav
                  aria-label="Editorial Sections"
                  className="h-full overflow-y-auto custom-scrollbar pb-24"
                  style={{
                    maskImage:
                      "linear-gradient(transparent, black 28px, black calc(100% - 72px), transparent)",
                    WebkitMaskImage:
                      "linear-gradient(transparent, black 28px, black calc(100% - 72px), transparent)",
                  }}
                >
                  <div className="h-6" aria-hidden="true" />
                  <div className="bg-[repeating-linear-gradient(to_bottom,var(--ws-border)_0_1px,transparent_1px_10px)] bg-[length:24px_30px] bg-[position:12px_15px] bg-repeat-y bg-local">
                    {SECTIONS.map((section, sectionIdx) => (
                      <React.Fragment key={section.heading}>
                        {sectionIdx > 0 && <div className="h-[30px]" aria-hidden="true" />}

                        {/* Category / Section header row */}
                        <Link
                          href={section.href}
                          onClick={() => setSidebarOpen(false)}
                          className="group relative flex items-center gap-2 pr-4 text-[13px] transition-colors h-[30px] text-[var(--ws-text-primary)] font-medium"
                        >
                          <span
                            aria-hidden="true"
                            className="relative ml-3 h-full w-8 shrink-0"
                          >
                            <span
                              className={cn(
                                "absolute left-0 top-[15px] h-px transition-[width,background-color] duration-300 w-6 bg-[var(--ws-text-primary)]",
                                EASE_OUT_EXPO
                              )}
                            />
                          </span>
                          <span
                            className={cn(
                              "flex min-w-0 items-center gap-1.5 transition-transform duration-300",
                              EASE_OUT_EXPO
                            )}
                          >
                            <span className="truncate">{section.heading}</span>
                          </span>
                        </Link>

                        {/* Section items */}
                        {section.items.map((item) => {
                          const active = pathname === item.href;
                          return (
                            <Link
                              key={`${section.heading}-${item.href}`}
                              href={item.href}
                              aria-current={active ? "page" : undefined}
                              onClick={() => setSidebarOpen(false)}
                              onMouseEnter={() => setHoveredSlug(item.slug ?? null)}
                              onFocus={() => setHoveredSlug(item.slug ?? null)}
                              className={cn(
                                "group relative flex items-center gap-2 pr-4 text-[13px] transition-colors h-[30px]",
                                active
                                  ? isDark
                                    ? "text-indigo-400"
                                    : "text-indigo-600"
                                  : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className="relative ml-3 h-full w-8 shrink-0"
                              >
                                <span
                                  className={cn(
                                    "absolute left-0 top-[15px] h-px transition-[width,background-color] duration-300",
                                    EASE_OUT_EXPO,
                                    active
                                      ? isDark
                                        ? "w-10 bg-indigo-400"
                                        : "w-10 bg-indigo-600"
                                      : "w-0 bg-transparent group-hover:w-8 group-hover:bg-[var(--ws-text-primary)]/50"
                                  )}
                                />
                              </span>
                              <span
                                className={cn(
                                  "flex min-w-0 items-center gap-1.5 transition-transform duration-300",
                                  EASE_OUT_EXPO,
                                  active && "translate-x-3"
                                )}
                              >
                                <span className="truncate">{item.label}</span>
                                {item.badge && (
                                  <span className="shrink-0 text-[9px] leading-none text-[var(--ws-text-muted)]">
                                    {item.badge}
                                  </span>
                                )}
                              </span>
                            </Link>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </motion.aside>

          {/* Floating miniature live preview card beside hovered component link (desktop) */}
          <AnimatePresence>
            {hoveredSlug && (
              <motion.div
                key={hoveredSlug}
                initial={prefersReduced ? false : { opacity: 0, x: -8, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={prefersReduced ? undefined : { opacity: 0, x: -6, scale: 0.97 }}
                transition={{ duration: 0.16 }}
                className="pointer-events-none hidden lg:flex items-center pl-4 z-10"
              >
                <div className="w-[340px] rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-4 shadow-[var(--ws-shadow-menu)]">
                  <div className="mb-2.5 flex items-center justify-between text-[11px] font-mono text-[var(--ws-text-secondary)]">
                    <span>
                      {BRAND.registryNamespace}/{hoveredSlug}
                    </span>
                    <span>Live Preview</span>
                  </div>
                  <div className="flex min-h-[200px] items-center justify-center overflow-hidden rounded-[16px] border border-[var(--ws-border-subtle)] bg-[var(--ws-preview-bg)] p-4">
                    <ComponentLivePreview slug={hoveredSlug} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}

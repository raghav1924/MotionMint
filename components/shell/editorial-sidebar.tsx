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

interface NavSection {
  heading: string;
  items: { label: string; href: string; slug?: string }[];
}

const SECTIONS: NavSection[] = [
  {
    heading: "EXPLORE",
    items: [
      { label: "Home", href: "/" },
      { label: "Components", href: "/components" },
      { label: "Infinity Canvas", href: "/canvas" },
      { label: "Playground", href: "/playground" },
      { label: "Themes (29)", href: "/themes" },
      { label: "Motion Lab", href: "/motion" },
      { label: "Sound Lab", href: "/sounds" },
      { label: "Flow Kit", href: "/flow" },
      { label: "Installation", href: "/docs/installation" },
    ],
  },
  {
    heading: "CONTROLS",
    items: CATALOG_ITEMS.filter((c) => c.status === "implemented" && c.category === "Controls")
      .slice(0, 12)
      .map((c) => ({
        label: c.name,
        href: `/components/${c.slug}`,
        slug: c.slug,
      })),
  },
  {
    heading: "AI SYSTEM",
    items: CATALOG_ITEMS.filter((c) => c.status === "implemented" && c.category === "AI")
      .slice(0, 10)
      .map((c) => ({
        label: c.name,
        href: `/components/${c.slug}`,
        slug: c.slug,
      })),
  },
  {
    heading: "ESSENTIALS",
    items: CATALOG_ITEMS.filter(
      (c) =>
        c.status === "implemented" &&
        c.category !== "Controls" &&
        c.category !== "AI"
    ).map((c) => ({
      label: c.name,
      href: `/components/${c.slug}`,
      slug: c.slug,
    })),
  },
];

export function EditorialSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useMotionMint();
  const prefersReduced = useReducedMotion();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

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
        <div className="fixed inset-0 z-[60] flex">
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

          {/* Large Editorial Overlay Panel */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Editorial Navigation"
            initial={prefersReduced ? false : { x: "-100%", opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReduced ? undefined : { x: "-100%", opacity: 0.6 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative z-10 flex h-full w-[88vw] sm:w-[62vw] lg:w-[38vw] max-w-[520px] flex-col",
              "rounded-r-[34px] border-r border-[var(--ws-border)] bg-[var(--ws-bg)] text-[var(--ws-text-primary)]",
              "shadow-[var(--ws-shadow-menu)] overflow-hidden"
            )}
          >
            {/* Top compact header */}
            <div className="flex items-center justify-between px-7 pt-6 pb-4">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-[var(--ws-text-primary)]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#111111] text-[var(--ws-accent,#dfff00)]">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
                  </svg>
                </span>
                <span>{BRAND.name}</span>
              </Link>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close navigation overlay"
                className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)] cursor-pointer"
              >
                <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable hierarchy with horizontal-line index */}
            <nav aria-label="Editorial Sections" className="flex-1 overflow-y-auto px-7 pb-24 pt-2 space-y-8">
              {SECTIONS.map((section) => (
                <div key={section.heading} className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="h-[1px] w-4 bg-[var(--ws-border-strong)]" aria-hidden="true" />
                    <h2 className="text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--ws-text-secondary)]">
                      {section.heading}
                    </h2>
                  </div>

                  <ul className="space-y-1.5">
                    {section.items.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            onMouseEnter={() => setHoveredSlug(item.slug ?? null)}
                            onFocus={() => setHoveredSlug(item.slug ?? null)}
                            className={cn(
                              "group flex items-center gap-4 py-1 transition-colors duration-150",
                              active
                                ? "text-[var(--ws-text-primary)] font-medium"
                                : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                            )}
                          >
                            {/* Horizontal line indicator */}
                            <span
                              aria-hidden="true"
                              className={cn(
                                "block h-[1.5px] shrink-0 rounded-full transition-all duration-150",
                                active
                                  ? "w-7 bg-[var(--ws-text-primary)]"
                                  : "w-3 bg-[var(--ws-border-strong)] group-hover:w-5 group-hover:bg-[var(--ws-text-secondary)]"
                              )}
                            />
                            <span className="text-[22px] sm:text-[25px] leading-tight tracking-tight truncate">
                              {item.label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
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
                className="pointer-events-none hidden lg:flex items-center pl-6 z-10"
              >
                <div className="w-[340px] rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-4 shadow-[var(--ws-shadow-menu)]">
                  <div className="mb-2.5 flex items-center justify-between text-[11px] font-mono text-[var(--ws-text-secondary)]">
                    <span>@motionmint/{hoveredSlug}</span>
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

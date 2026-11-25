"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sun, Moon, Monitor, Menu, X, ArrowUpRight } from "lucide-react";
import { MotionMintLogo } from "@/components/brand/motionmint-logo";
import { BRAND } from "@/lib/brand";
import { useMotionMint } from "./providers";
import { cn } from "@/lib/utils";

type AppearanceOption = "light" | "dark" | "system";

const NAV_LINKS = [
  { href: "/components", label: "Components" },
  { href: "/themes", label: "Themes" },
  { href: "/flow", label: "Flow" },
  { href: "/docs/installation", label: "Docs" },
];

const APPEARANCE_OPTIONS: {
  id: AppearanceOption;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

export function Navbar() {
  const pathname = usePathname();
  const { appearance, setAppearance } = useMotionMint();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const triggerCommandPalette = () => {
    const evt = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(evt);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-200",
        scrolled
          ? "border-[var(--ws-border)] bg-[var(--ws-bg)]/90 backdrop-blur-md"
          : "border-[var(--ws-border-subtle)] bg-[var(--ws-bg)]/75 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-8">
        {/* Left: Kinetic M Lockup */}
        <Link
          href="/"
          aria-label={`${BRAND.name} home`}
          className="flex shrink-0 items-center text-[var(--ws-text-primary)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-ring)] rounded-md"
        >
          <MotionMintLogo markSize={22} />
        </Link>

        {/* Center-Right: Editorial Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_LINKS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative py-1 text-[13px] tracking-[-0.01em] transition-colors",
                  active
                    ? "font-medium text-[var(--ws-text-primary)]"
                    : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                )}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px bg-[var(--ws-text-primary)] transition-transform duration-200 origin-left",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Far Right: Search + Appearance Switcher + Action */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={triggerCommandPalette}
            aria-label="Search components (Command K)"
            className="hidden sm:inline-flex h-8 items-center gap-2 rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] px-3 text-[12px] text-[var(--ws-text-secondary)] transition-colors hover:border-[var(--ws-border-strong)] hover:text-[var(--ws-text-primary)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-ring)]"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Search</span>
            <kbd className="rounded border border-[var(--ws-border)] px-1 py-0.5 font-mono text-[10px] leading-none text-[var(--ws-text-muted)]">
              ⌘K
            </kbd>
          </button>

          {/* Minimal Light / Dark / System Switcher */}
          <div
            role="group"
            aria-label="Website appearance"
            className="inline-flex items-center rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] p-0.5"
          >
            {APPEARANCE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const selected = appearance === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAppearance(opt.id)}
                  aria-label={`${opt.label} appearance`}
                  aria-pressed={selected}
                  title={opt.label}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-ring)]",
                    selected
                      ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                      : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <Link
            href="/components"
            className="hidden lg:inline-flex h-8 items-center gap-1 rounded-full bg-[var(--ws-text-primary)] px-3.5 text-[12px] font-medium text-[var(--ws-bg)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-ring)]"
          >
            <span>Explore</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            className="inline-flex md:hidden h-8 w-8 items-center justify-center rounded-full border border-[var(--ws-border)] text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface)] cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Editorial Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--ws-border)] bg-[var(--ws-bg)] px-4 py-4 space-y-1">
          {NAV_LINKS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-[var(--ws-surface)] font-medium text-[var(--ws-text-primary)]"
                    : "text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface)] hover:text-[var(--ws-text-primary)]"
                )}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              triggerCommandPalette();
            }}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface)] hover:text-[var(--ws-text-primary)] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" aria-hidden="true" />
              Search library
            </span>
            <span className="font-mono text-[11px] text-[var(--ws-text-muted)]">⌘K</span>
          </button>
        </div>
      )}
    </header>
  );
}

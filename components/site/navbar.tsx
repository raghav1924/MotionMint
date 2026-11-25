"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX, Sparkles, Menu, X, Search, Sun, Moon, Monitor } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { ALL_THEMES } from "@/lib/themes/registry";
import { useMotionMint, type AppearanceMode } from "@/components/site/providers";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/components", label: "Components" },
  { href: "/playground", label: "Playground" },
  { href: "/themes", label: "Themes" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/docs/installation", label: "Install" },
];

export function Navbar() {
  const pathname = usePathname();
  const {
    appearance,
    setAppearance,
    skin,
    setTheme,
    soundEnabled,
    toggleSound,
    setCommandOpen,
  } = useMotionMint();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-3 z-40 mx-auto max-w-6xl px-3 sm:px-6">
      <div className="flex h-13 items-center justify-between gap-3 rounded-full border border-[var(--mm-border-strong)] bg-[var(--mm-surface)]/85 px-4 shadow-[var(--mm-shadow)] backdrop-blur-md">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 font-semibold tracking-tight text-[var(--mm-fg)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--mm-accent)] text-[var(--mm-accent-fg)]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="text-sm">{BRAND.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active =
                !link.href.startsWith("/#") &&
                (pathname === link.href || pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-2.5 py-1 text-xs rounded-full transition-colors",
                    active
                      ? "bg-[var(--mm-accent-soft)] text-[var(--mm-accent)] font-medium"
                      : "text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            aria-label="Open command search"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[var(--ws-border)] bg-[var(--ws-bg)] px-2.5 text-xs text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] cursor-pointer"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline font-mono text-[10px] text-[var(--ws-text-muted)]">
              ⌘K
            </kbd>
          </button>

          <div
            role="group"
            aria-label="Appearance"
            className="hidden sm:flex items-center rounded-full border border-[var(--ws-border)] bg-[var(--ws-bg)] p-0.5"
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
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center rounded-full cursor-pointer transition-colors",
                  appearance === id
                    ? "bg-[var(--ws-surface-elevated)] text-[var(--ws-accent)]"
                    : "text-[var(--ws-text-muted)] hover:text-[var(--ws-text-primary)]"
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ))}
          </div>

          <select
            aria-label="Select theme"
            value={skin}
            onChange={(e) => setTheme(e.target.value)}
            className="hidden sm:block h-8 max-w-[140px] rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] px-2.5 text-xs font-medium text-[var(--mm-fg)] cursor-pointer"
          >
            {ALL_THEMES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? "Mute UI sounds" : "Enable UI sounds"}
            title={soundEnabled ? "Sound: ON" : "Sound: OFF (click to enable)"}
            className={cn(
              "inline-flex items-center gap-1.5 h-8 px-2.5 text-xs font-medium cursor-pointer rounded-full border transition-colors",
              soundEnabled
                ? "border-[var(--mm-accent)] bg-[var(--mm-accent-soft)] text-[var(--mm-accent)]"
                : "border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)]"
            )}
          >
            {soundEnabled ? (
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span className="hidden xl:inline">{soundEnabled ? "Sound On" : "Sound Off"}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex lg:hidden h-8 w-8 items-center justify-center rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] text-[var(--mm-fg)] cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden mt-2 rounded-[var(--mm-radius)] border border-[var(--mm-border-strong)] bg-[var(--mm-surface)] p-4 shadow-[var(--mm-shadow-hover)] space-y-4"
        >
          <nav aria-label="Mobile" className="grid grid-cols-2 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-xs font-medium rounded-[var(--mm-radius-sm)] text-[var(--mm-fg-muted)] hover:bg-[var(--mm-surface-subtle)] hover:text-[var(--mm-fg)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-1.5 border-t border-[var(--mm-border)] pt-3">
            <label htmlFor="mobile-theme-select" className="block text-[11px] font-medium text-[var(--mm-fg-muted)]">
              Theme (29 available)
            </label>
            <select
              id="mobile-theme-select"
              value={skin}
              onChange={(e) => setTheme(e.target.value)}
              className="h-9 w-full rounded-[var(--mm-radius-sm)] border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] px-2.5 text-xs text-[var(--mm-fg)]"
            >
              {ALL_THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
}

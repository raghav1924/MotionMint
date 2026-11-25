"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX, Sparkles, Menu, X, Search, Sun, Moon, Monitor } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useMotionMint, type AppearanceMode } from "@/components/site/providers";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/components", label: "Components" },
  { href: "/themes", label: "Themes" },
  { href: "/flow", label: "Flow" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/docs/installation", label: "Docs" },
];

export function Navbar() {
  const pathname = usePathname();
  const {
    appearance,
    setAppearance,
    soundEnabled,
    toggleSound,
    setCommandOpen,
  } = useMotionMint();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-3 z-40 mx-auto max-w-6xl px-3 sm:px-6">
      <div className="flex h-13 items-center justify-between gap-3 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)]/90 px-4 shadow-[var(--ws-shadow-floating)] backdrop-blur-md">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 font-semibold tracking-tight text-[var(--ws-text-primary)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--ws-text-primary)] text-[var(--ws-bg)]">
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
                      ? "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)] font-medium"
                      : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
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

          {/* Light / Dark / System Application Appearance only */}
          <div
            role="group"
            aria-label="Appearance"
            className="hidden sm:flex items-center rounded-full border border-[var(--ws-border)] bg-[var(--ws-bg)] p-0.5"
          >
            {(
              [
                { id: "light", icon: Sun, label: "Light appearance" },
                { id: "dark", icon: Moon, label: "Dark appearance" },
                { id: "system", icon: Monitor, label: "System appearance" },
              ] as { id: AppearanceMode; icon: typeof Sun; label: string }[]
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
                    ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
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
            title={soundEnabled ? "Sound: ON" : "Sound: OFF"}
            className={cn(
              "inline-flex items-center gap-1.5 h-8 px-2.5 text-xs font-medium cursor-pointer rounded-full border transition-colors",
              soundEnabled
                ? "border-[var(--ws-text-primary)] bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
                : "border-[var(--ws-border)] bg-[var(--ws-bg)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
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
            className="inline-flex lg:hidden h-8 w-8 items-center justify-center rounded-full border border-[var(--ws-border)] bg-[var(--ws-bg)] text-[var(--ws-text-primary)] cursor-pointer"
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
          className="lg:hidden mt-2 rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)] p-4 shadow-[var(--ws-shadow-menu)] space-y-4"
        >
          <nav aria-label="Mobile" className="grid grid-cols-2 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-xs font-medium rounded-xl text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-between border-t border-[var(--ws-border-subtle)] pt-3">
            <span className="text-xs text-[var(--ws-text-secondary)]">Appearance</span>
            <div className="flex items-center gap-1 rounded-full border border-[var(--ws-border)] bg-[var(--ws-bg)] p-0.5">
              {(["light", "dark", "system"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setAppearance(m)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] capitalize cursor-pointer",
                    appearance === m
                      ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)] font-medium"
                      : "text-[var(--ws-text-secondary)]"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

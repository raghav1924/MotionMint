import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { RenderJoyWordmark } from "@/components/brand/renderjoy-logo";
import { KineticBrandMark } from "@/components/brand/kinetic-brand-mark";

const FOOTER_GROUPS: Array<{
  heading: string;
  links: Array<{ href: string; label: string; external?: boolean }>;
}> = [
  {
    heading: "Explore",
    links: [
      { href: "/components", label: "Components" },
      { href: "/themes", label: "Themes" },
      { href: "/flow", label: "Flow Orchestrator" },
      { href: "/pricing", label: "Pricing & Pro" },
    ],
  },
  {
    heading: "Labs",
    links: [
      { href: "/bench", label: "Bench" },
      { href: "/motion", label: "Motion Lab" },
      { href: "/sounds", label: "Sound Lab" },
      { href: "/docs/installation", label: "Documentation" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { href: BRAND.githubUrl, label: "GitHub", external: true },
      { href: `${BRAND.githubUrl}/releases`, label: "Changelog", external: true },
      { href: `mailto:hello@renderjoy.dev`, label: "hello@renderjoy.dev", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--ws-border)] bg-[var(--ws-surface)] text-[var(--ws-text-primary)]">
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pt-16 pb-14 sm:px-8 sm:pt-24">
        {/* Top Row: Left Identity + Right Grouped Navigation Columns */}
        <div className="grid gap-12 border-b border-[var(--ws-border)] pb-14 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 text-[var(--ws-text-primary)]">
              <KineticBrandMark size={22} />
              <RenderJoyWordmark className="text-base" />
            </div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ws-text-primary)] sm:text-3xl">
              Make something memorable.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--ws-text-secondary)]">
              {BRAND.description}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ws-text-muted)]">
              {BRAND.name} · {BRAND.tagline}
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:justify-items-end"
          >
            {FOOTER_GROUPS.map((group) => (
              <div key={group.heading} className="space-y-3 min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ws-text-muted)]">
                  {group.heading}
                </p>
                <ul className="space-y-2 text-sm text-[var(--ws-text-secondary)]">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                          className="inline-flex items-center gap-1 rounded-sm transition-colors hover:text-[var(--ws-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-ring)]"
                        >
                          <span className="truncate">{link.label}</span>
                          {link.href.startsWith("http") && (
                            <ArrowUpRight className="h-3 w-3 shrink-0 opacity-70" aria-hidden="true" />
                          )}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="inline-block rounded-sm transition-colors hover:text-[var(--ws-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-ring)]"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Oversized RenderJoy Signature */}
        <div className="flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-end sm:py-16">
          <div className="flex items-center gap-4 sm:gap-8 text-[var(--ws-text-primary)]">
            <KineticBrandMark
              size={84}
              className="h-14 w-14 shrink-0 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
            />
            <span className="select-none text-5xl font-semibold leading-[0.88] tracking-[-0.045em] sm:text-7xl lg:text-[116px]">
              R<span className="font-normal opacity-65">ender</span>J
              <span className="font-normal opacity-65">oy</span>
            </span>
          </div>
        </div>

        {/* Fine Bottom Hairline */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--ws-border-subtle)] pt-6 text-xs text-[var(--ws-text-muted)]">
          <span>
            © 2026 {BRAND.name} — {BRAND.tagline}.
          </span>
          <span className="font-mono">
            v{BRAND.version} · {BRAND.registryNamespace}
          </span>
        </div>
      </div>

      {/* Broad Halftone Dot-Field Artwork Along Lower Edge */}
      <div
        aria-hidden="true"
        data-footer-halftone="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(var(--ws-text-primary)_1px,transparent_1px)] [background-size:10px_10px] opacity-[0.14] [mask-image:linear-gradient(to_top,black_18%,transparent_100%)]"
      />
    </footer>
  );
}

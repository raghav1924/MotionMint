import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { MotionMintMark } from "@/components/brand/motionmint-logo";

const FOOTER_LINKS = [
  { href: "/components", label: "Components" },
  { href: "/themes", label: "Themes" },
  { href: "/flow", label: "Flow" },
  { href: "/motion", label: "Motion" },
  { href: "/sounds", label: "Sounds" },
  { href: "/docs/installation", label: "Documentation" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--ws-border)] bg-[var(--ws-bg)]">
      <div className="mx-auto max-w-[1400px] px-4 pt-16 pb-10 sm:px-8 sm:pt-24">
        {/* Closing Editorial Statement + Link Row */}
        <div className="flex flex-col justify-between gap-8 border-b border-[var(--ws-border)] pb-12 lg:flex-row lg:items-end">
          <div className="max-w-md space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ws-text-muted)]">
              {BRAND.name} · {BRAND.tagline}
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--ws-text-primary)] sm:text-4xl">
              Make something memorable.
            </h2>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-[var(--ws-text-secondary)]"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[var(--ws-text-primary)]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`${BRAND.githubUrl}/releases`}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[var(--ws-text-primary)]"
            >
              Changelog
            </a>
            <a
              href={BRAND.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-[var(--ws-text-primary)]"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </nav>
        </div>

        {/* Oversized Kinetic M + Brand Signature */}
        <div className="flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-end sm:py-16">
          <div className="flex items-center gap-5 sm:gap-8 text-[var(--ws-text-primary)]">
            <MotionMintMark
              size={84}
              className="h-14 w-14 shrink-0 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
            />
            <span className="select-none text-5xl font-semibold leading-[0.88] tracking-[-0.045em] sm:text-7xl lg:text-[116px]">
              Motion<span className="font-normal opacity-65">Mint</span>
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
    </footer>
  );
}

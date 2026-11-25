"use client";

import React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function AnnouncementBar() {
  return (
    <div className="relative z-40 w-full select-none">
      <Link
        href="/components"
        className="group flex h-[30px] w-full items-center justify-center gap-2 bg-[var(--ws-ribbon-bg,#111111)] px-4 text-[11px] font-medium tracking-tight text-white transition-colors hover:bg-[#19191c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-accent)]"
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ws-accent,#dfff00)]"
          aria-hidden="true"
        />
        <span className="truncate">
          {BRAND.name} · 44 components · 58 theme variants · Flow Orchestrator live
        </span>
        <span
          className="inline-block transition-transform duration-150 group-hover:translate-x-0.5 text-white/75"
          aria-hidden="true"
        >
          →
        </span>
      </Link>
      {/* Irregular scalloped / wavy lower edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 10"
        preserveAspectRatio="none"
        className="pointer-events-none block h-[7px] w-full text-[var(--ws-ribbon-bg,#111111)]"
      >
        <path
          fill="currentColor"
          d="M0,0 L1200,0 L1200,3 C1165,9 1135,1 1100,4 C1065,8 1035,2 1000,5 C960,9 925,1 885,4 C850,7 815,2 780,5 C740,9 705,1 665,4 C630,8 595,2 560,5 C520,9 485,1 445,4 C410,7 375,2 340,5 C300,9 265,1 225,4 C190,8 155,2 120,5 C80,9 40,2 0,4 Z"
        />
      </svg>
    </div>
  );
}

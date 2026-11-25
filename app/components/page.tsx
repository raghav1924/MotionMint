import React from "react";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { FULL_INVENTORY } from "@/lib/inventory";
import { CatalogueBrowser } from "@/components/site/catalogue-browser";

export default function ComponentsPage() {
  const implementedCount = CATALOG_ITEMS.filter(
    (item) => item.status === "implemented"
  ).length;

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-14 sm:px-8 space-y-10">
      <header className="mx-auto max-w-2xl text-center space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ws-text-muted)]">
          {implementedCount} live components · {FULL_INVENTORY.length} catalogued
        </p>
        <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.03em] text-[var(--ws-text-primary)]">
          Explore interactions.
        </h1>
        <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--ws-text-secondary)]">
          Every component is live. Try it, tune it and take it into your project.
        </p>
      </header>
      <CatalogueBrowser />
    </div>
  );
}

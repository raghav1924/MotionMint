import React from "react";
import { FULL_INVENTORY } from "@/lib/inventory";
import { CatalogueBrowser } from "@/components/site/catalogue-browser";

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-[1360px] px-4 py-14 sm:px-8 space-y-10">
      <header className="mx-auto max-w-xl text-center space-y-2.5">
        <h1 className="text-[30px] sm:text-[34px] font-semibold tracking-tight text-[var(--ws-text-primary)]">
          Components
        </h1>
        <p className="text-[14px] sm:text-[15px] text-[var(--ws-text-secondary)]">
          {FULL_INVENTORY.length} animated React components, one command away.
        </p>
      </header>
      <CatalogueBrowser />
    </div>
  );
}

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CommandPalette } from "@/components/ui/command-palette";
import { AnnouncementBar } from "@/components/shell/announcement-bar";
import { NavigationToggle } from "@/components/shell/navigation-toggle";
import { BrandFloatingButton } from "@/components/shell/brand-floating-button";
import { EditorialSidebar } from "@/components/shell/editorial-sidebar";
import { FloatingToolbar } from "@/components/shell/floating-toolbar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isFlow = pathname.startsWith("/flow");

  return (
    <>
      {isHome && <AnnouncementBar />}
      <div className="min-h-screen flex flex-col bg-[var(--ws-bg)] text-[var(--ws-text-primary)]">
        {!isHome && <NavigationToggle />}
        {!isHome && <BrandFloatingButton />}
        {isHome && <Navbar />}
        <main className={cn("flex-1", isFlow || isHome ? "pb-6" : "pb-24")}>{children}</main>
        {!isFlow && <Footer />}
        {!isHome && !isFlow && <FloatingToolbar />}
      </div>
      <EditorialSidebar />
      <CommandPalette />
    </>
  );
}

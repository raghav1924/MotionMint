"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { CommandPalette } from "@/components/ui/command-palette";
import { AnnouncementBar } from "@/components/shell/announcement-bar";
import { NavigationToggle } from "@/components/shell/navigation-toggle";
import { BrandFloatingButton } from "@/components/shell/brand-floating-button";
import { EditorialSidebar } from "@/components/shell/editorial-sidebar";
import { FloatingToolbar } from "@/components/shell/floating-toolbar";

function isWorkspaceRoute(pathname: string): boolean {
  if (
    pathname.startsWith("/motion") ||
    pathname.startsWith("/sounds") ||
    pathname.startsWith("/flow")
  ) {
    return true;
  }
  return false;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const workspace = isWorkspaceRoute(pathname);
  const isHome = pathname === "/";

  return (
    <>
      <AnnouncementBar />
      {workspace ? (
        <WorkspaceShell>{children}</WorkspaceShell>
      ) : (
        <div className="min-h-screen flex flex-col bg-[var(--ws-bg)] text-[var(--ws-text-primary)]">
          <NavigationToggle />
          <BrandFloatingButton />
          {isHome && <Navbar />}
          <main className="flex-1 pb-24">{children}</main>
          <Footer />
          <FloatingToolbar />
        </div>
      )}
      <EditorialSidebar />
      <CommandPalette />
    </>
  );
}

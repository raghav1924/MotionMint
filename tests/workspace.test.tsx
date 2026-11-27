import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RenderJoyProvider } from "@/components/site/providers";
import { AppShell } from "@/components/site/app-shell";
import { CommandPalette } from "@/components/ui/command-palette";

let mockPathname = "/motion";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ push: vi.fn() }),
}));

beforeAll(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

describe("Phase 2.11 — Unified Application Shell & Appearance Isolation", () => {
  it("keeps application appearance independent from the 29 component themes", () => {
    render(
      <RenderJoyProvider>
        <AppShell>
          <div>Lab Content</div>
        </AppShell>
      </RenderJoyProvider>
    );

    expect(document.documentElement.getAttribute("data-appearance")).toBe("light");
    expect(document.documentElement.style.getPropertyValue("--mm-bg")).toBe("");
  });

  it("uses the unified EditorialSidebar and contextual FloatingToolbar on Motion & Sound Labs", () => {
    mockPathname = "/sounds";
    render(
      <RenderJoyProvider>
        <AppShell>
          <div>Sound Studio Content</div>
        </AppShell>
      </RenderJoyProvider>
    );

    // Sound Lab contextual FloatingToolbar shows Sound ON/OFF & Stop All (no device frame buttons)
    expect(screen.getByRole("button", { name: /Sound: OFF/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Stop All/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Desktop preview" })).not.toBeInTheDocument();

    // Shared EditorialSidebar opens via NavigationToggle
    fireEvent.click(screen.getByRole("button", { name: "Open navigation overlay" }));
    expect(screen.getByRole("dialog", { name: "Editorial Navigation" })).toBeInTheDocument();
  });

  it("omits component FloatingToolbar on /flow so the workflow canvas stays unobstructed", () => {
    mockPathname = "/flow";
    render(
      <RenderJoyProvider>
        <AppShell>
          <div>Flow Canvas Content</div>
        </AppShell>
      </RenderJoyProvider>
    );

    expect(screen.getByRole("button", { name: "Open navigation overlay" })).toBeInTheDocument();
    expect(screen.queryByRole("toolbar", { name: "Floating workspace controls" })).not.toBeInTheDocument();
  });

  it("opens CommandPalette with Cmd+K and filters entries", () => {
    mockPathname = "/motion";
    render(
      <RenderJoyProvider>
        <CommandPalette />
      </RenderJoyProvider>
    );

    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByRole("dialog", { name: /command palette/i })).toBeInTheDocument();

    const searchInput = screen.getByLabelText("Command search");
    fireEvent.change(searchInput, { target: { value: "Sound" } });
    expect(screen.getByText("Sound Lab")).toBeInTheDocument();
  });
});

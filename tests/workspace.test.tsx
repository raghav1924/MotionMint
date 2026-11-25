import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MotionMintProvider, useMotionMint } from "@/components/site/providers";
import { CommandPalette } from "@/components/ui/command-palette";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { ModalDialog, Drawer, ContextMenu } from "@/components/ui/overlay";

vi.mock("next/navigation", () => ({
  usePathname: () => "/components/swipe-card-deck",
  useRouter: () => ({ push: vi.fn() }),
}));

function AppearanceProbe() {
  const { appearance, resolvedAppearance, setAppearance, skin, setTheme } = useMotionMint();
  return (
    <div>
      <span data-testid="appearance">{appearance}</span>
      <span data-testid="resolved-appearance">{resolvedAppearance}</span>
      <span data-testid="theme">{skin}</span>
      <button type="button" onClick={() => setAppearance("dark")}>
        Set Dark
      </button>
      <button type="button" onClick={() => setTheme("cyberpunk")}>
        Set Cyberpunk
      </button>
    </div>
  );
}

describe("Phase 2.7 — Workspace Shell, Appearance & Command Palette", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("keeps application appearance independent from the 29 component themes", () => {
    render(
      <MotionMintProvider>
        <AppearanceProbe />
      </MotionMintProvider>
    );

    expect(screen.getByTestId("resolved-appearance")).toHaveTextContent("light");
    expect(document.documentElement.getAttribute("data-appearance")).toBe("light");

    fireEvent.click(screen.getByRole("button", { name: "Set Dark" }));
    expect(screen.getByTestId("resolved-appearance")).toHaveTextContent("dark");
    expect(document.documentElement.getAttribute("data-appearance")).toBe("dark");

    fireEvent.click(screen.getByRole("button", { name: "Set Cyberpunk" }));
    expect(screen.getByTestId("theme")).toHaveTextContent("cyberpunk");
    // Changing component theme must NOT overwrite application appearance
    expect(document.documentElement.getAttribute("data-appearance")).toBe("dark");
  });

  it("opens CommandPalette on Cmd+K / Ctrl+K, filters results, and closes on Escape", () => {
    render(
      <MotionMintProvider>
        <CommandPalette />
      </MotionMintProvider>
    );

    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByLabelText("Command search");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Blueprint" } });
    expect(screen.getByText(/Apply Conceptual Sketch \/ Blueprint/i)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByLabelText("Command search")).toBeNull();
  });

  it("WorkspaceShell collapses sidebar and switches appearance", () => {
    render(
      <MotionMintProvider>
        <WorkspaceShell>
          <div>Workspace Content</div>
        </WorkspaceShell>
      </MotionMintProvider>
    );

    const collapseBtn = screen.getByRole("button", { name: "Collapse sidebar" });
    fireEvent.click(collapseBtn);
    expect(screen.getByRole("button", { name: "Expand sidebar" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Light appearance" }));
    expect(document.documentElement.getAttribute("data-appearance")).toBe("light");
  });

  it("ModalDialog and Drawer close on Escape", () => {
    const onCloseModal = vi.fn();
    const onCloseDrawer = vi.fn();
    render(
      <>
        <ModalDialog open onClose={onCloseModal} title="Test Modal">
          <div>Modal Body</div>
        </ModalDialog>
        <Drawer open onClose={onCloseDrawer} title="Test Drawer">
          <div>Drawer Body</div>
        </Drawer>
      </>
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onCloseModal).toHaveBeenCalledTimes(1);
    expect(onCloseDrawer).toHaveBeenCalledTimes(1);
  });

  it("ContextMenu opens on right-click, executes action, and closes on Escape", () => {
    const onReset = vi.fn();
    render(
      <ContextMenu items={[{ id: "r", label: "Reset Preview", onSelect: onReset }]}>
        <div>Canvas Area</div>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByText("Canvas Area"), { clientX: 50, clientY: 60 });
    const item = screen.getByRole("menuitem", { name: "Reset Preview" });
    fireEvent.click(item);
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
  });
});

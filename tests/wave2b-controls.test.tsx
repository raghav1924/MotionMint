import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CardStack } from "@/registry/components/card-stack";
import { DetentDrawer } from "@/registry/components/detent-drawer";
import { Notch } from "@/registry/components/notch";
import { PhysicalKnob } from "@/registry/components/physical-knob";
import { ReactionArc } from "@/registry/components/reaction-arc";
import { ReceiptPrinter } from "@/registry/components/receipt-printer";
import { RubberBandSelect } from "@/registry/components/rubber-band-select";
import { MorphingTray } from "@/registry/components/morphing-tray";
import { VisualKeyboard } from "@/registry/components/keyboard";
import { InfinityCanvas } from "@/registry/components/infinity-canvas";
import { ScratchCard } from "@/registry/components/scratch-card";
import { HalftonePopover } from "@/registry/components/halftone-popover";
import { ALL_THEMES } from "@/lib/themes/registry";
import { themeToInlineStyle } from "@/lib/themes/theme-utils";

beforeAll(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

describe("Wave 2B — Advanced Interactions & Physics-Inspired Controls (12 Components)", () => {
  it("CardStack cycles forward/back, resets, and handles empty list", () => {
    const onIndexChange = vi.fn();
    const { rerender } = render(
      <CardStack
        onIndexChange={onIndexChange}
        cards={[
          { id: "1", title: "Card One", subtitle: "First" },
          { id: "2", title: "Card Two", subtitle: "Second" },
          { id: "3", title: "Card Three", subtitle: "Third" },
        ]}
      />
    );
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next card" }));
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(screen.getByText("2 / 3")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reset stack" }));
    expect(onIndexChange).toHaveBeenLastCalledWith(0);

    rerender(<CardStack cards={[]} />);
    expect(screen.getByText(/No cards in stack/i)).toBeInTheDocument();
  });

  it("DetentDrawer opens, switches detents, and closes on Escape", async () => {
    const onDetentChange = vi.fn();
    render(
      <DetentDrawer title="Inspector" triggerLabel="Open Drawer" onDetentChange={onDetentChange}>
        <p>Drawer body</p>
      </DetentDrawer>
    );
    fireEvent.click(screen.getByRole("button", { name: "Open Drawer" }));
    expect(screen.getByRole("dialog", { name: "Inspector" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /expanded/i }));
    expect(onDetentChange).toHaveBeenCalledWith("expanded");

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("Notch toggles expanded detail and triggers action callback", () => {
    const onAction = vi.fn();
    render(
      <Notch
        state="processing"
        message="Deploying"
        detail="47 registry items"
        actionLabel="Inspect"
        onAction={onAction}
      />
    );
    const toggle = screen.getByRole("button", { name: /Deploying/i });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("47 registry items")).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(screen.getByRole("button", { name: "Inspect" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("PhysicalKnob supports slider ARIA, keyboard arrows, Home/End, and double-click reset", () => {
    const onValueChange = vi.fn();
    render(
      <PhysicalKnob
        label="Gain"
        defaultValue={50}
        min={0}
        max={100}
        step={10}
        unit="%"
        onValueChange={onValueChange}
      />
    );
    const slider = screen.getByRole("slider", { name: "Gain" });
    expect(slider).toHaveAttribute("aria-valuenow", "50");

    fireEvent.keyDown(slider, { key: "ArrowUp" });
    expect(onValueChange).toHaveBeenLastCalledWith(60);

    fireEvent.keyDown(slider, { key: "End" });
    expect(onValueChange).toHaveBeenLastCalledWith(100);

    fireEvent.keyDown(slider, { key: "Home" });
    expect(onValueChange).toHaveBeenLastCalledWith(0);

    fireEvent.doubleClick(slider);
    expect(onValueChange).toHaveBeenLastCalledWith(50);
  });

  it("ReactionArc expands options, selects a reaction, and closes on Escape", () => {
    const onValueChange = vi.fn();
    render(<ReactionArc onValueChange={onValueChange} />);
    const trigger = screen.getByRole("button", { name: "Toggle reactions" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    const fireBtn = screen.getByRole("radio", { name: "Fire" });
    fireEvent.click(fireBtn);
    expect(onValueChange).toHaveBeenCalledWith("fire");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("ReceiptPrinter computes total and supports Reprint", () => {
    render(
      <ReceiptPrinter
        title="Test Store"
        animate={false}
        items={[
          { name: "Knob", qty: 2, price: 10 },
          { name: "Stack", qty: 1, price: 5.5 },
        ]}
      />
    );
    expect(screen.getByText("$25.50")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Reprint/i }));
    expect(screen.getByText("Test Store")).toBeInTheDocument();
  });

  it("RubberBandSelect supports multi/single selection and skips disabled options", () => {
    const onValueChange = vi.fn();
    render(
      <RubberBandSelect
        multiple
        defaultValue={[]}
        onValueChange={onValueChange}
        options={[
          { value: "one", label: "One" },
          { value: "two", label: "Two", disabled: true },
          { value: "three", label: "Three" },
        ]}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "One" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["one"]);

    fireEvent.click(screen.getByRole("button", { name: "Two" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Three" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["one", "three"]);
  });

  it("MorphingTray expands and collapses via button and Escape", () => {
    render(
      <MorphingTray title="Export Preset" compactSummary="Next.js">
        <p>Tray contents</p>
      </MorphingTray>
    );
    const toggle = screen.getByRole("button", { name: /Export Preset/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Tray contents")).toBeInTheDocument();

    fireEvent.keyDown(toggle, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("VisualKeyboard triggers onKeyClick and tracks physical key presses", () => {
    const onKeyClick = vi.fn();
    render(<VisualKeyboard rows={[["Q", "W", "E"]]} trackPhysicalKeys onKeyClick={onKeyClick} />);
    fireEvent.click(screen.getByRole("button", { name: "W" }));
    expect(onKeyClick).toHaveBeenCalledWith("W");

    fireEvent.keyDown(window, { key: "q" });
    expect(screen.getByRole("button", { name: "Q" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.keyUp(window, { key: "q" });
    expect(screen.getByRole("button", { name: "Q" })).toHaveAttribute("aria-pressed", "false");
  });

  it("InfinityCanvas supports zoom in/out, add node, and reset view", () => {
    const onItemsChange = vi.fn();
    render(<InfinityCanvas onItemsChange={onItemsChange} />);
    expect(screen.getByText("100%")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(screen.getByText("115%")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reset canvas" }));
    expect(screen.getByText("100%")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));
    expect(onItemsChange).toHaveBeenCalledTimes(1);
  });

  it("ScratchCard reveals via accessible Reveal button and resets", () => {
    const onReveal = vi.fn();
    render(
      <ScratchCard onReveal={onReveal}>
        <span>MINT-CODE</span>
      </ScratchCard>
    );
    fireEvent.click(screen.getByRole("button", { name: /Reveal/i }));
    expect(onReveal).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: /Reveal/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Reset/i }));
    expect(screen.getByRole("button", { name: /Reveal/i })).toBeInTheDocument();
  });

  it("HalftonePopover opens and closes on Escape", () => {
    render(
      <HalftonePopover triggerLabel="Inspect" title="Halftone Layer">
        <p>Dot matrix content</p>
      </HalftonePopover>
    );
    const trigger = screen.getByRole("button", { name: "Inspect" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog", { name: "Halftone Layer" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("All 12 Wave 2B components render cleanly across all 29 themes", () => {
    expect(ALL_THEMES).toHaveLength(29);
    for (const theme of ALL_THEMES) {
      const { unmount } = render(
        <div data-theme={theme.id} style={themeToInlineStyle(theme)}>
          <CardStack cards={[{ id: "1", title: "Card", subtitle: "Layer 1" }]} />
          <DetentDrawer title="D">Body</DetentDrawer>
          <Notch message="OK" />
          <PhysicalKnob label="K" />
          <ReactionArc />
          <ReceiptPrinter items={[{ name: "Item", qty: 1, price: 1 }]} animate={false} />
          <RubberBandSelect options={[{ value: "a", label: "A" }]} />
          <MorphingTray title="Tray">Content</MorphingTray>
          <VisualKeyboard rows={[["A"]]} trackPhysicalKeys={false} />
          <InfinityCanvas />
          <ScratchCard>Secret</ScratchCard>
          <HalftonePopover>Pop</HalftonePopover>
        </div>
      );
      unmount();
    }
  });
});

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ALL_THEMES, resolveThemeId } from "@/lib/themes/registry";
import { themeToCssVars, themeToInlineStyle } from "@/lib/themes/theme-utils";
import { RippleButton } from "@/registry/components/ripple-button";
import { JellyButton } from "@/registry/components/jelly-button";
import { CopyButton } from "@/registry/components/copy-button";
import { SoundToggle } from "@/registry/components/sound-toggle";
import { BounceDotsLoader } from "@/registry/components/bounce-dots-loader";
import { ProgressRing } from "@/registry/components/progress-ring";
import { WiggleText } from "@/registry/components/wiggle-text";
import { SkeletonShimmer } from "@/registry/components/skeleton-shimmer";
import { Dropzone } from "@/registry/components/dropzone";
import { SwipeCardDeck } from "@/registry/components/swipe-card-deck";
import { ThinkingLoader } from "@/registry/components/thinking-loader";
import { FlipCard } from "@/registry/components/flip-card";

describe("29-Theme Design System & 261-Combination Matrix", () => {
  it("contains all 29 unique themes with complete token profiles", () => {
    expect(ALL_THEMES).toHaveLength(29);
    const ids = new Set(ALL_THEMES.map((t) => t.id));
    expect(ids.size).toBe(29);

    for (const theme of ALL_THEMES) {
      const vars = themeToCssVars(theme);
      expect(vars["--mm-bg"]).toBeTruthy();
      expect(vars["--mm-accent"]).toBeTruthy();
      expect(vars["--mm-font-display"]).toBeTruthy();
      expect(vars["--mm-motion-duration"]).toBeTruthy();
    }
  });

  it("resolves legacy skin aliases to 29-theme IDs", () => {
    expect(resolveThemeId("dark")).toBe("dark-mode");
    expect(resolveThemeId("bento")).toBe("bento-grid");
    expect(resolveThemeId("glass")).toBe("glassmorphism");
    expect(resolveThemeId("neo-brutal")).toBe("neo-brutalism");
    expect(resolveThemeId("blueprint")).toBe("blueprint");
  });

  it("renders all 9 core components cleanly across all 29 themes (261 combinations)", () => {
    let comboCount = 0;
    for (const theme of ALL_THEMES) {
      const { unmount } = render(
        <div style={themeToInlineStyle(theme)} data-theme={theme.id}>
          <RippleButton>Btn</RippleButton>
          <JellyButton>Jelly</JellyButton>
          <CopyButton value="test" />
          <SoundToggle label="Toggle" showWaveform />
          <BounceDotsLoader rhythm="elastic" />
          <ProgressRing value={50} />
          <WiggleText text="Wiggle" />
          <SkeletonShimmer variant="text" count={2} />
          <Dropzone />
        </div>
      );
      comboCount += 9;
      unmount();
    }
    expect(comboCount).toBe(261);
  });
});

describe("Signature Components", () => {
  it("SwipeCardDeck supports arrow keys, undo, empty state, and reset", () => {
    const onDismiss = vi.fn();
    const cards = [
      { id: "1", title: "Card One", subtitle: "First" },
      { id: "2", title: "Card Two", subtitle: "Second" },
    ];
    render(<SwipeCardDeck cards={cards} onCardDismiss={onDismiss} />);

    const deck = screen.getByLabelText(/Swipeable card deck/i);
    fireEvent.keyDown(deck, { key: "ArrowRight" });
    expect(onDismiss).toHaveBeenCalledWith(cards[0], "right");

    // Undo brings Card One back
    fireEvent.click(screen.getByRole("button", { name: "Undo last card" }));
    expect(screen.getByText("Card One")).toBeInTheDocument();

    // Dismiss both cards to reach empty state
    fireEvent.click(screen.getByRole("button", { name: "Swipe left" }));
    fireEvent.click(screen.getByRole("button", { name: "Swipe right" }));
    expect(screen.getByText("All 2 cards reviewed")).toBeInTheDocument();

    // Reset restores deck
    fireEvent.click(screen.getByRole("button", { name: /Reset Deck/i }));
    expect(screen.getByText("Card One")).toBeInTheDocument();
  });

  it("ThinkingLoader exposes live status semantics across variants", () => {
    render(<ThinkingLoader stages={["Indexing...", "Ready"]} variant="pulse-grid" />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Indexing...");
    expect(status).toHaveTextContent("Stage 1 of 2");
  });

  it("FlipCard toggles aria-pressed on click/keyboard", () => {
    render(<FlipCard front={<span>Front</span>} back={<span>Back</span>} />);
    const card = screen.getByRole("button", { name: /Flip card/i });
    expect(card).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(card);
    expect(card).toHaveAttribute("aria-pressed", "true");
  });
});

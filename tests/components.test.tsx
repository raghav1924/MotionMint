import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MotionMintProvider, useMotionMint } from "@/components/site/providers";
import { RippleButton } from "@/registry/components/ripple-button";
import { JellyButton } from "@/registry/components/jelly-button";
import { CopyButton } from "@/registry/components/copy-button";
import { SoundToggle } from "@/registry/components/sound-toggle";
import { BounceDotsLoader } from "@/registry/components/bounce-dots-loader";
import { ProgressRing, ProgressBar } from "@/registry/components/progress-ring";
import { WiggleText } from "@/registry/components/wiggle-text";
import { SkeletonShimmer } from "@/registry/components/skeleton-shimmer";
import { Dropzone, formatBytes } from "@/registry/components/dropzone";
import { ComponentDetailWorkbench } from "@/components/shared/component-detail-workbench";
import { LAUNCH_SKINS } from "@/lib/themes/skins";
import { getGlobalFeedbackConfig } from "@/lib/audio/feedback-store";

function SoundStateProbe() {
  const { soundEnabled, skin } = useMotionMint();
  return (
    <div>
      <span data-testid="sound-state">{String(soundEnabled)}</span>
      <span data-testid="skin-state">{skin}</span>
    </div>
  );
}

describe("MotionMint Phase 2 — 9 Free Components", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("defaults global sound to OFF and skin to dark", () => {
    render(
      <MotionMintProvider>
        <SoundStateProbe />
      </MotionMintProvider>
    );
    expect(screen.getByTestId("sound-state")).toHaveTextContent("false");
    expect(screen.getByTestId("skin-state")).toHaveTextContent("minimalism");
    expect(getGlobalFeedbackConfig().soundEnabled).toBe(false);
  });

  it("renders across all four launch skins via data-skin", () => {
    for (const skin of LAUNCH_SKINS) {
      document.documentElement.setAttribute("data-skin", skin.id);
      const { unmount } = render(<RippleButton>Skin Test</RippleButton>);
      expect(document.documentElement.getAttribute("data-skin")).toBe(skin.id);
      expect(screen.getByRole("button", { name: "Skin Test" })).toBeInTheDocument();
      unmount();
    }
  });

  it("RippleButton renders, triggers onClick, and respects disabled state", () => {
    const onClick = vi.fn();
    const { rerender } = render(<RippleButton onClick={onClick}>Click Me</RippleButton>);
    const btn = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(
      <RippleButton onClick={onClick} disabled>
        Click Me
      </RippleButton>
    );
    fireEvent.click(screen.getByRole("button", { name: "Click Me" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("RippleButton skips ripple elements when prefers-reduced-motion is active", () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(<RippleButton>Reduced</RippleButton>);
    fireEvent.click(screen.getByRole("button", { name: "Reduced" }));
    expect(container.querySelector(".animate-ping")).toBeNull();
  });

  it("JellyButton renders and triggers onClick", () => {
    const onClick = vi.fn();
    render(<JellyButton onClick={onClick}>Magnetic</JellyButton>);
    fireEvent.click(screen.getByRole("button", { name: "Magnetic" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("CopyButton handles success, empty value, and clipboard rejection", async () => {
    const { rerender } = render(<CopyButton value="npx shadcn add @rjstudio/ripple-button" />);
    fireEvent.click(screen.getByRole("button"));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "npx shadcn add @rjstudio/ripple-button"
    );
    expect(await screen.findByText("Copied")).toBeInTheDocument();

    // Empty value -> visual Failed state without calling clipboard
    rerender(<CopyButton value="" />);
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByText("Failed")).toBeInTheDocument();

    // Clipboard failure -> visual Failed state
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error("Denied")),
      },
    });
    rerender(<CopyButton value="some text" />);
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByText("Failed")).toBeInTheDocument();
  });

  it("SoundToggle exposes switch semantics and toggles state", () => {
    const onChange = vi.fn();
    render(<SoundToggle defaultChecked={false} onCheckedChange={onChange} label="Test switch" />);
    const sw = screen.getByRole("switch", { name: "Test switch" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    fireEvent.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("BounceDotsLoader exposes accessible status role", () => {
    render(<BounceDotsLoader label="Fetching data" />);
    expect(screen.getByRole("status", { name: "Fetching data" })).toBeInTheDocument();
  });

  it("ProgressRing and ProgressBar clamp values and expose progressbar ARIA attributes", () => {
    render(
      <>
        <ProgressRing value={120} max={100} label="Upload Ring" />
        <ProgressBar value={-10} max={100} label="Upload Bar" showValue />
      </>
    );
    const ring = screen.getByRole("progressbar", { name: "Upload Ring" });
    expect(ring).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByText("100%")).toBeInTheDocument();

    const bar = screen.getByRole("progressbar", { name: "Upload Bar" });
    expect(bar).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("WiggleText renders semantic markup with accessible label and split modes", () => {
    render(<WiggleText text="Hello World" as="h2" splitBy="word" intensity="playful" />);
    const heading = screen.getByRole("heading", { level: 2, name: "Hello World" });
    expect(heading).toBeInTheDocument();
  });

  it("SkeletonShimmer renders variants, custom counts, and static mode", () => {
    const { rerender } = render(<SkeletonShimmer variant="text" count={3} label="Loading lines" />);
    expect(screen.getByRole("status", { name: "Loading lines" })).toBeInTheDocument();

    rerender(<SkeletonShimmer variant="card" count={2} animate={false} label="Loading cards" />);
    expect(screen.getByRole("status", { name: "Loading cards" })).toBeInTheDocument();

    rerender(<SkeletonShimmer variant="avatar" count={2} label="Loading avatars" />);
    expect(screen.getByRole("status", { name: "Loading avatars" })).toBeInTheDocument();
  });

  it("Dropzone validates file types, max size, multiple selection, and file removal", () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <Dropzone
        accept=".png,.pdf"
        maxSize={1024}
        multiple
        onFilesChange={onFilesChange}
      />
    );

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeTruthy();

    // Invalid file type
    const badType = new File(["abc"], "notes.txt", { type: "text/plain" });
    fireEvent.change(input, { target: { files: [badType] } });
    expect(screen.getByRole("alert")).toHaveTextContent("not an accepted file type");
    expect(onFilesChange).not.toHaveBeenCalled();

    // Oversized file
    const bigFile = new File([new Uint8Array(2048)], "large.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [bigFile] } });
    expect(screen.getByRole("alert")).toHaveTextContent("exceeds the 1 KB limit");

    // Multiple valid files
    const valid1 = new File(["ok"], "avatar.png", { type: "image/png" });
    const valid2 = new File(["pdf"], "invoice.pdf", { type: "application/pdf" });
    fireEvent.change(input, { target: { files: [valid1, valid2] } });
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByText("avatar.png")).toBeInTheDocument();
    expect(screen.getByText("invoice.pdf")).toBeInTheDocument();
    expect(onFilesChange).toHaveBeenLastCalledWith([valid1, valid2]);

    // Remove first file
    fireEvent.click(screen.getByRole("button", { name: "Remove avatar.png" }));
    expect(screen.queryByText("avatar.png")).toBeNull();
    expect(screen.getByText("invoice.pdf")).toBeInTheDocument();
    expect(onFilesChange).toHaveBeenLastCalledWith([valid2]);
  });

  it("Dropzone supports keyboard Enter/Space activation", () => {
    const { container } = render(<Dropzone label="Upload Zone" />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, "click");

    const zone = screen.getByRole("button", { name: "Upload Zone" });
    fireEvent.keyDown(zone, { key: "Enter" });
    fireEvent.keyDown(zone, { key: " " });
    expect(clickSpy).toHaveBeenCalledTimes(2);
  });

  it("formatBytes formats bytes cleanly", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1536)).toBe("1.5 KB");
  });

  it("ComponentDetailWorkbench switches package managers and skins", () => {
    render(
      <MotionMintProvider>
        <ComponentDetailWorkbench
          slug="ripple-button"
          installCommand="npx shadcn add @rjstudio/ripple-button"
        />
      </MotionMintProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "pnpm" }));
    expect(
      screen.getByText("pnpm dlx shadcn add @rjstudio/ripple-button")
    ).toBeInTheDocument();
    const neoBtn = screen.getByRole("button", { name: "Neo-Brutal" });
    fireEvent.click(neoBtn);
    expect(neoBtn).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.style.getPropertyValue("--mm-bg")).toBe("");
  });
});

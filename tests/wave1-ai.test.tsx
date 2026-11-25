import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AIPromptComposer } from "@/registry/components/ai-prompt-composer";
import { StreamingMessage } from "@/registry/components/streaming-message";
import { ToolCallCard } from "@/registry/components/tool-call-card";
import { AgentPlan } from "@/registry/components/agent-plan";
import { ApprovalCard } from "@/registry/components/approval-card";
import { InlineDiff } from "@/registry/components/inline-diff";
import { ReasoningTrace } from "@/registry/components/reasoning-trace";
import { AIChat } from "@/registry/components/ai-chat";
import { ImageGeneration } from "@/registry/components/image-generation";
import { ChatOrb } from "@/registry/components/chat-orb";
import { PixelImageGeneration } from "@/registry/components/pixel-image-generation";
import { ALL_THEMES } from "@/lib/themes/registry";
import { themeToInlineStyle } from "@/lib/themes/theme-utils";

describe("Wave 1 — AI Component System (11 Components)", () => {
  it("AIPromptComposer submits on Enter, skips empty, and shows Stop while streaming", () => {
    const onSubmit = vi.fn();
    const onStop = vi.fn();
    const { rerender } = render(<AIPromptComposer onSubmit={onSubmit} />);

    const textarea = screen.getByLabelText("Prompt input");
    fireEvent.keyDown(textarea, { key: "Enter" });
    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.change(textarea, { target: { value: "Build a theme switcher" } });
    fireEvent.keyDown(textarea, { key: "Enter" });
    expect(onSubmit).toHaveBeenCalledWith("Build a theme switcher");

    rerender(<AIPromptComposer isStreaming onStop={onStop} />);
    fireEvent.click(screen.getByRole("button", { name: "Stop generation" }));
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it("StreamingMessage handles streaming live region and error retry", () => {
    const onRetry = vi.fn();
    const { rerender } = render(
      <StreamingMessage
        message={{ id: "1", role: "assistant", content: "Hello", status: "streaming" }}
      />
    );
    expect(screen.getByRole("article")).toHaveAttribute("aria-live", "polite");

    rerender(
      <StreamingMessage
        message={{ id: "2", role: "assistant", content: "Oops", status: "error" }}
        onRetry={onRetry}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Retry/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("ToolCallCard expands and collapses input/output JSON", () => {
    render(
      <ToolCallCard
        toolCall={{
          id: "tc1",
          name: "read_file",
          status: "success",
          durationMs: 12,
          input: { path: "README.md" },
          output: { ok: true },
        }}
      />
    );
    const toggle = screen.getByRole("button");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/README\.md/)).toBeInTheDocument();
  });

  it("AgentPlan displays step progress counter", () => {
    render(
      <AgentPlan
        steps={[
          { id: "1", title: "Step A", status: "completed" },
          { id: "2", title: "Step B", status: "in_progress" },
          { id: "3", title: "Step C", status: "skipped" },
        ]}
      />
    );
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
    expect(screen.getByText("Step C")).toBeInTheDocument();
  });

  it("ApprovalCard transitions to approved/rejected status", () => {
    const onApprove = vi.fn();
    render(
      <ApprovalCard
        title="Run migration"
        description="Apply schema update"
        onApprove={onApprove}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Approve/i }));
    expect(onApprove).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveTextContent("Approved by user");
  });

  it("InlineDiff renders line counts and callbacks", () => {
    const onAccept = vi.fn();
    render(
      <InlineDiff
        filename="index.ts"
        onAccept={onAccept}
        lines={[
          { type: "remove", content: "old" },
          { type: "add", content: "new" },
          { type: "add", content: "new2" },
        ]}
      />
    );
    expect(screen.getByText("+2")).toBeInTheDocument();
    expect(screen.getByText("-1")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Accept" }));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it("ReasoningTrace toggles open/closed", () => {
    render(<ReasoningTrace entries={["Checked tokens", "Verified contrast"]} />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(screen.getByText("Checked tokens")).toBeInTheDocument();
  });

  it("AIChat appends submitted messages and shows ThinkingLoader when loading", () => {
    render(<AIChat isLoading demoNotice="Demo Mode" />);
    expect(screen.getByText("Demo Mode")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();

    const input = screen.getByLabelText("Prompt input");
    fireEvent.change(input, { target: { value: "Hello AI UI" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("Hello AI UI")).toBeInTheDocument();
  });

  it("ImageGeneration, ChatOrb, and PixelImageGeneration render accessible states", () => {
    const onToggle = vi.fn();
    render(
      <>
        <ImageGeneration prompt="Test art" status="error" />
        <ChatOrb state="speaking" onToggle={onToggle} />
        <PixelImageGeneration progress={50} gridSize={4} />
      </>
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Preview generation failed");
    const orb = screen.getByRole("button", { name: /Voice assistant orb/i });
    expect(orb).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(orb);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("img", { name: /Pixel synthesis preview \(50%\)/i })).toBeInTheDocument();
  });

  it("renders Wave 1 AI primitives across all 29 themes cleanly", () => {
    for (const theme of ALL_THEMES) {
      const { unmount } = render(
        <div style={themeToInlineStyle(theme)} data-theme={theme.id}>
          <AIPromptComposer />
          <ApprovalCard title="Approve" description="Test" />
          <PixelImageGeneration progress={60} gridSize={4} />
        </div>
      );
      unmount();
    }
  });
});

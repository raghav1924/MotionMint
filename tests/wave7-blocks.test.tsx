import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthSplitBlock } from "@/registry/components/auth-split-block";
import { ChangelogTimeline } from "@/registry/components/changelog-timeline";
import { FeatureTabsBlock } from "@/registry/components/feature-tabs-block";
import { FaqAccordionBlock } from "@/registry/components/faq-accordion-block";
import DocsPage from "@/app/docs/page";

describe("Wave 7 Blocks & Wave 8 Developer Resources", () => {
  it("AuthSplitBlock toggles magic link mode and validates email", () => {
    render(<AuthSplitBlock />);
    fireEvent.click(screen.getByRole("button", { name: "Magic Link" }));
    expect(screen.getByRole("button", { name: "Send Magic Link" })).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("you@studio.dev"), {
      target: { value: "dev@renderjoy.dev" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Magic Link" }));
    expect(screen.getByText(/Magic link sent to dev@renderjoy.dev/i)).toBeInTheDocument();
  });

  it("ChangelogTimeline filters release entries", () => {
    render(<ChangelogTimeline />);
    fireEvent.click(screen.getByRole("button", { name: "Fixed" }));
    expect(screen.getByText("v1.3.1")).toBeInTheDocument();
    expect(screen.queryByText("v1.4.0")).not.toBeInTheDocument();
  });

  it("FeatureTabsBlock switches between product feature tabs", () => {
    render(<FeatureTabsBlock />);
    fireEvent.click(screen.getByRole("tab", { name: "CLI Registry" }));
    expect(screen.getByText("Own every line of source")).toBeInTheDocument();
  });

  it("FaqAccordionBlock expands and collapses FAQ answers", () => {
    render(<FaqAccordionBlock />);
    const secondBtn = screen.getByRole("button", {
      name: /How does sound feedback behave by default/i,
    });
    expect(secondBtn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(secondBtn);
    expect(secondBtn).toHaveAttribute("aria-expanded", "true");
  });

  it("DocsPage documents AI Agent & MCP Discovery", () => {
    render(<DocsPage />);
    expect(screen.getByText(/4\. AI Agent & MCP Discovery/i)).toBeInTheDocument();
    expect(screen.getByText("/llms.txt")).toBeInTheDocument();
  });
});

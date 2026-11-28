import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AdvancedUploadFlow } from "@/registry/components/advanced-upload-flow";
import { PaymentSuccessFlow } from "@/registry/components/payment-success-flow";
import { AnimatedCharts } from "@/registry/components/animated-charts";
import { BentoDashboardBlock } from "@/registry/components/bento-dashboard-block";

describe("Phase 5 — Premium Pro Components", () => {
  it("AdvancedUploadFlow adds, retries, uploads, and removes files with live-region updates", () => {
    render(<AdvancedUploadFlow />);
    expect(screen.getByText("Upload Queue (3)")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "+ File" }));
    expect(screen.getByText("Upload Queue (4)")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Retry motion-specs.pdf" }));
    fireEvent.click(screen.getByRole("button", { name: "Upload All" }));
    fireEvent.click(screen.getByRole("button", { name: "Remove motion-specs.pdf" }));
    expect(screen.getByText("Upload Queue (3)")).toBeInTheDocument();
  });

  it("PaymentSuccessFlow displays amount, invoice ID, and handles copy", () => {
    render(<PaymentSuccessFlow amount="$199.00" invoiceId="INV-999" />);
    expect(screen.getByText("$199.00")).toBeInTheDocument();
    expect(screen.getByText("INV-999")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /INV-999/i }));
    fireEvent.click(screen.getByRole("button", { name: "Replay receipt animation" }));
  });

  it("AnimatedCharts switches between Bar, Donut, Gauge, and accessible Table views", () => {
    render(<AnimatedCharts />);
    fireEvent.click(screen.getByRole("button", { name: "donut" }));
    expect(screen.getByText("Average Utilization")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "gauge" }));
    expect(screen.getByText(/Target/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Table" }));
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("BentoDashboardBlock switches 7D, 30D, and 90D metrics", () => {
    render(<BentoDashboardBlock />);
    expect(screen.getByText("$74.2k")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "7D" }));
    expect(screen.getByText("$18.4k")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "90D" }));
    expect(screen.getByText("$214k")).toBeInTheDocument();
  });
});

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SegmentedControl } from "@/registry/components/segmented-control";
import { NumberStepper } from "@/registry/components/number-stepper";
import { GlowInput } from "@/registry/components/glow-input";
import { EmailCapture } from "@/registry/components/email-capture";
import { DatePicker } from "@/registry/components/date-picker";
import { AnimatedSelect } from "@/registry/components/animated-select";
import { OTPInput } from "@/registry/components/otp-input";
import { MultiSelect } from "@/registry/components/multi-select";
import { CookieConsent } from "@/registry/components/cookie-consent";
import { ALL_THEMES } from "@/lib/themes/registry";
import { themeToInlineStyle } from "@/lib/themes/theme-utils";

describe("Wave 2 — Batch 2A Essential Controls (9 Components)", () => {
  it("SegmentedControl supports keyboard navigation and skips disabled options", () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        onValueChange={onChange}
        options={[
          { value: "a", label: "Alpha" },
          { value: "b", label: "Beta", disabled: true },
          { value: "c", label: "Gamma" },
        ]}
      />
    );
    const group = screen.getByRole("radiogroup");
    fireEvent.keyDown(group, { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith("c");
  });

  it("NumberStepper clamps min/max, supports step, ArrowUp/Down, and readOnly", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <NumberStepper defaultValue={4} min={2} max={6} step={2} onValueChange={onChange} />
    );
    const input = screen.getByLabelText("Quantity");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith(6);

    // Clamped at max=6
    fireEvent.click(screen.getByRole("button", { name: "Increase Quantity" }));
    expect(onChange).toHaveBeenCalledTimes(1);

    // readOnly blocks changes
    rerender(<NumberStepper value={4} min={0} max={10} readOnly onValueChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Decrease Quantity" }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("GlowInput associates label, error alert, and prefix/suffix", () => {
    render(
      <GlowInput
        label="Domain"
        prefix="https://"
        suffix=".dev"
        error="Invalid domain"
      />
    );
    const input = screen.getByLabelText("Domain");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid domain");
    expect(screen.getByText("https://")).toBeInTheDocument();
  });

  it("EmailCapture rejects empty/invalid emails and calls onSubmit for valid email", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<EmailCapture onSubmit={onSubmit} />);

    const input = screen.getByLabelText("Email address");
    const submit = screen.getByRole("button", { name: /Subscribe/i });

    fireEvent.click(submit);
    expect(screen.getByRole("alert")).toHaveTextContent("enter an email");
    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "bad-email" } });
    fireEvent.click(submit);
    expect(screen.getByRole("alert")).toHaveTextContent("valid email");

    fireEvent.change(input, { target: { value: "dev@renderjoy.dev" } });
    fireEvent.click(submit);
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith("dev@renderjoy.dev"));
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("DatePicker enforces min/max bounds and selects dates", () => {
    const onChange = vi.fn();
    const minDate = new Date(2026, 10, 10);
    const maxDate = new Date(2026, 10, 20);
    render(
      <DatePicker
        defaultValue={new Date(2026, 10, 15)}
        minDate={minDate}
        maxDate={maxDate}
        onValueChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    const outOfRange = screen.getByRole("button", { name: /Nov 5, 2026/i });
    expect(outOfRange).toBeDisabled();

    const inRange = screen.getByRole("button", { name: /Nov 18, 2026/i });
    fireEvent.click(inRange);
    expect(onChange).toHaveBeenCalled();
  });

  it("AnimatedSelect supports search, keyboard selection, and disabled options", () => {
    const onChange = vi.fn();
    render(
      <AnimatedSelect
        onValueChange={onChange}
        options={[
          { value: "one", label: "Option One" },
          { value: "two", label: "Option Two", disabled: true },
          { value: "three", label: "Option Three" },
        ]}
      />
    );
    const combo = screen.getByRole("combobox");
    fireEvent.click(combo);
    fireEvent.change(screen.getByLabelText("Filter options"), { target: { value: "Three" } });
    fireEvent.click(screen.getByText("Option Three"));
    expect(onChange).toHaveBeenCalledWith("three");
  });

  it("OTPInput handles paste, backspace navigation, and onComplete", () => {
    const onComplete = vi.fn();
    render(<OTPInput length={4} onComplete={onComplete} />);

    const cell1 = screen.getByLabelText("One-time verification code digit 1");
    fireEvent.paste(cell1, {
      clipboardData: { getData: () => "4829" },
    });
    expect(onComplete).toHaveBeenCalledWith("4829");

    const cell4 = screen.getByLabelText("One-time verification code digit 4");
    expect(cell4).toHaveValue("9");
    fireEvent.keyDown(cell4, { key: "Backspace" });
    expect(cell4).toHaveValue("");
  });

  it("MultiSelect enforces maxSelected and supports chip removal", () => {
    const onChange = vi.fn();
    render(
      <MultiSelect
        maxSelected={2}
        defaultValue={["a"]}
        onValueChange={onChange}
        options={[
          { value: "a", label: "Alpha" },
          { value: "b", label: "Beta" },
          { value: "c", label: "Gamma" },
        ]}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Multi-select trigger" }));
    fireEvent.click(screen.getByText("Beta"));
    expect(onChange).toHaveBeenLastCalledWith(["a", "b"]);

    // Third option disabled when maxSelected=2
    const gammaBtn = screen.getByText("Gamma").closest("button");
    expect(gammaBtn).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Remove Alpha" }));
    expect(onChange).toHaveBeenLastCalledWith(["b"]);
  });

  it("CookieConsent fires explicit preference callbacks for Accept, Reject, and Customise", () => {
    const onSave = vi.fn();
    render(<CookieConsent onSavePreferences={onSave} />);

    fireEvent.click(screen.getByRole("button", { name: "Reject Optional" }));
    expect(onSave).toHaveBeenLastCalledWith({
      necessary: true,
      analytics: false,
      marketing: false,
    });

    fireEvent.click(screen.getByRole("button", { name: "Customise" }));
    fireEvent.click(screen.getByLabelText("Analytics cookies"));
    fireEvent.click(screen.getByRole("button", { name: "Save Preferences" }));
    expect(onSave).toHaveBeenLastCalledWith({
      necessary: true,
      analytics: true,
      marketing: false,
    });
  });

  it("renders Batch 2A controls across all 29 themes cleanly", () => {
    for (const theme of ALL_THEMES) {
      const { unmount } = render(
        <div style={themeToInlineStyle(theme)} data-theme={theme.id}>
          <SegmentedControl options={[{ value: "a", label: "A" }, { value: "b", label: "B" }]} />
          <NumberStepper defaultValue={1} />
          <GlowInput label="Test" />
          <OTPInput length={4} />
        </div>
      );
      unmount();
    }
  });
});

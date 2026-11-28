import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RenderJoyProvider } from "@/components/site/providers";
import { AnnouncementBar } from "@/components/shell/announcement-bar";
import { NavigationToggle } from "@/components/shell/navigation-toggle";
import { EditorialSidebar } from "@/components/shell/editorial-sidebar";
import { BrandFloatingButton } from "@/components/shell/brand-floating-button";
import { FloatingToolbar } from "@/components/shell/floating-toolbar";
import { DesktopBrowserFrame, TabletPreviewFrame, MobileDeviceFrame } from "@/components/preview/device-frames";
import { ComponentDocs } from "@/components/documentation/component-docs";
import { CatalogueBrowser } from "@/components/site/catalogue-browser";
import { Footer } from "@/components/site/footer";
import { KineticBrandMark } from "@/components/brand/kinetic-brand-mark";
import * as soundEngine from "@/lib/audio/sound-engine";
import { CATALOG_ITEMS } from "@/lib/catalog";

vi.mock("next/navigation", () => ({
  usePathname: () => "/components/card-stack",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("Planes UI Design & Interaction Specification", () => {
  it("AnnouncementBar renders promotional ribbon with wavy SVG edge", () => {
    const { container } = render(<AnnouncementBar />);
    expect(screen.getByText(/94\s+components/i)).toBeInTheDocument();
    expect(container.querySelector("svg path")).not.toBeNull();
  });

  it("NavigationToggle opens EditorialSidebar and closes on Escape", async () => {
    render(
      <RenderJoyProvider>
        <NavigationToggle />
        <EditorialSidebar />
      </RenderJoyProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open navigation overlay" }));
    expect(screen.getByRole("dialog", { name: "Editorial Navigation" })).toBeInTheDocument();
    expect(screen.getByText("Getting started")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Card Stack" })).toHaveAttribute("aria-current", "page");

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Editorial Navigation" })).not.toBeInTheDocument();
    });
  });

  it("BrandFloatingButton opens utility menu and toggles appearance", () => {
    render(
      <RenderJoyProvider>
        <BrandFloatingButton />
      </RenderJoyProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /quick utilities/i }));
    expect(screen.getByRole("menu", { name: "Quick utilities" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("menuitem", { name: /Dark Mode/i }));
    expect(document.documentElement.getAttribute("data-appearance")).toBe("dark");
  });

  it("FloatingToolbar displays package id, opens PromptMenu, and switches viewports", () => {
    render(
      <RenderJoyProvider>
        <FloatingToolbar />
      </RenderJoyProvider>
    );

    expect(screen.getByText("@renderjoy/card-stack")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Copy prompt options" }));
    expect(screen.getByRole("menuitem", { name: /Open in ChatGPT/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Copy for Claude Code/i })).toBeInTheDocument();

    const mobileBtn = screen.getByRole("button", { name: "Mobile preview" });
    fireEvent.click(mobileBtn);
    expect(mobileBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("DesktopBrowserFrame, TabletPreviewFrame, and MobileDeviceFrame render realistic device chrome", () => {
    render(
      <>
        <DesktopBrowserFrame slug="card-stack">
          <div>Desktop Body</div>
        </DesktopBrowserFrame>
        <TabletPreviewFrame slug="card-stack">
          <div>Tablet Body</div>
        </TabletPreviewFrame>
        <MobileDeviceFrame slug="card-stack">
          <div>Mobile Body</div>
        </MobileDeviceFrame>
      </>
    );

    expect(screen.getByTestId("desktop-browser-frame")).toBeInTheDocument();
    expect(screen.getByTestId("tablet-preview-frame")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-device-frame")).toBeInTheDocument();
    expect(screen.getByText("768px")).toBeInTheDocument();
    expect(screen.getByText("9:41")).toBeInTheDocument();
  });

  it("CatalogueBrowser switches between Grid view and Category folder view", () => {
    render(<CatalogueBrowser />);
    const catBtn = screen.getByRole("button", { name: "Category folder view" });
    fireEvent.click(catBtn);
    expect(catBtn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: /Controls/i })).toBeInTheDocument();
  });

  it("ComponentDocs switches package managers, Usage/Props tabs, and omits Pro notice for free items", () => {
    const item = CATALOG_ITEMS.find((c) => c.slug === "card-stack")!;
    render(<ComponentDocs item={item} sourceCode={null} />);

    expect(screen.queryByText(/Pro Component/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: "npm" }));
    expect(screen.getByText("npx shadcn@latest add @renderjoy/card-stack")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "props" }));
    expect(screen.getByText("maxVisibleDepth")).toBeInTheDocument();
  });

  it("KineticBrandMark emits click impact wave and only plays sound when globally enabled", () => {
    const playSpy = vi.spyOn(soundEngine, "playSoundEffect").mockImplementation(() => {});
    const { container } = render(
      <RenderJoyProvider>
        <KineticBrandMark size={24} />
      </RenderJoyProvider>
    );

    const mark = container.querySelector("span")!;
    fireEvent.click(mark);
    expect(container.querySelector('[data-brand-impact-wave="true"]')).toBeInTheDocument();
    expect(playSpy).not.toHaveBeenCalled();

    playSpy.mockRestore();
  });

  it("Footer renders grouped navigation columns, contact link, and halftone dot-field", () => {
    const { container } = render(
      <RenderJoyProvider>
        <Footer />
      </RenderJoyProvider>
    );

    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByText("Labs")).toBeInTheDocument();
    expect(screen.getByText("Connect")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "hello@renderjoy.dev" })).toHaveAttribute(
      "href",
      "mailto:hello@renderjoy.dev"
    );
    expect(container.querySelector('[data-footer-halftone="true"]')).toBeInTheDocument();
  });
});

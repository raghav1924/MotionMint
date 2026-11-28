import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthSplitBlock } from "@/registry/components/auth-split-block";
import { ChangelogTimeline } from "@/registry/components/changelog-timeline";
import { FeatureTabsBlock } from "@/registry/components/feature-tabs-block";
import { FaqAccordionBlock } from "@/registry/components/faq-accordion-block";
import { RadarSweep } from "@/registry/components/radar-sweep";
import { ActivityFeed } from "@/registry/components/activity-feed";
import { DataTable } from "@/registry/components/data-table";
import { IntegrationWall } from "@/registry/components/integration-wall";
import { DitherDonut } from "@/registry/components/dither-donut";
import { DitherGauge } from "@/registry/components/dither-gauge";
import { DitherLineChart } from "@/registry/components/dither-line-chart";
import { DitherBarList } from "@/registry/components/dither-bar-list";
import { OrbitHero } from "@/registry/components/orbit-hero";
import { CurtainNav } from "@/registry/components/curtain-nav";
import { TerminalLogin } from "@/registry/components/terminal-login";
import { HorizonFooter } from "@/registry/components/horizon-footer";
import { PricingTierCard } from "@/registry/components/pricing-1";
import { WaitlistSpotlight } from "@/registry/components/waitlist-1";
import { CtaBanner } from "@/registry/components/cta-1";
import { ContactCard } from "@/registry/components/contact-1";
import { BentoHighlightGrid } from "@/registry/components/bento-1";
import { TestimonialDeck } from "@/registry/components/testimonial-1";
import { FeatureSpotlight } from "@/registry/components/feature-1";
import { FaqQuickList } from "@/registry/components/faq-1";
import { LogoCloud } from "@/registry/components/logo-cloud";
import { AnnouncementBarBlock } from "@/registry/components/announcement-bar";
import { MegaMenu } from "@/registry/components/mega-menu";
import { HoverTabs } from "@/registry/components/hover-tabs";
import { RadialHubDiagram } from "@/registry/components/radial-hub-diagram";
import { IntegrationBeams } from "@/registry/components/integration-beams";
import { TeamSection } from "@/registry/components/team-section";
import { BlogSection } from "@/registry/components/blog-section";
import { WordmarkFooter } from "@/registry/components/wordmark-footer";
import { GradientFooter } from "@/registry/components/gradient-footer";
import { EditorialHero } from "@/registry/components/editorial-hero";
import { ScenicHero } from "@/registry/components/scenic-hero";
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

  it("RadarSweep selects telemetry blips and toggles scan state", () => {
    render(<RadarSweep />);
    fireEvent.click(screen.getByRole("button", { name: "Inspect EU-Central" }));
    expect(screen.getByText("EU-Central")).toBeInTheDocument();
    const scanBtn = screen.getByRole("button", { name: "Pause Scan" });
    fireEvent.click(scanBtn);
    expect(screen.getByRole("button", { name: "Resume Scan" })).toBeInTheDocument();
  });

  it("ActivityFeed filters events and marks all read", () => {
    render(<ActivityFeed />);
    fireEvent.click(screen.getByRole("button", { name: "Security" }));
    expect(screen.getByText("GuardBot")).toBeInTheDocument();
    expect(screen.queryByText("Maya Lin")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Mark all read/i }));
    expect(screen.getByRole("button", { name: /Mark all read \(0\)/i })).toBeInTheDocument();
  });

  it("DataTable filters rows and toggles latency sort", () => {
    render(<DataTable />);
    const latencyBtn = screen.getByRole("button", { name: /Latency/i });
    fireEvent.click(latencyBtn);
    fireEvent.change(screen.getByRole("searchbox", { name: "Filter table rows" }), {
      target: { value: "ap-south" },
    });
    expect(screen.getByText("Asset Worker")).toBeInTheDocument();
    expect(screen.queryByText("Registry Edge")).not.toBeInTheDocument();
  });

  it("IntegrationWall toggles connector activation state", () => {
    render(<IntegrationWall />);
    const stripeBtn = screen.getByRole("button", { name: /Stripe/i });
    expect(stripeBtn).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(stripeBtn);
    expect(stripeBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("DitherDonut updates active slice share on legend click", () => {
    render(<DitherDonut />);
    fireEvent.click(screen.getByRole("button", { name: /Motion/i }));
    expect(screen.getAllByText("32%").length).toBeGreaterThan(0);
  });

  it("DitherGauge updates meter value when preset is clicked", () => {
    render(<DitherGauge />);
    const meter = screen.getByRole("meter", { name: "GPU Budget" });
    expect(meter).toHaveAttribute("aria-valuenow", "76");
    fireEvent.click(screen.getByRole("button", { name: "94%" }));
    expect(meter).toHaveAttribute("aria-valuenow", "94");
  });

  it("DitherLineChart switches trend time window", () => {
    render(<DitherLineChart />);
    fireEvent.click(screen.getByRole("button", { name: "90D" }));
    expect(screen.getByText("Peak 92k")).toBeInTheDocument();
  });

  it("DitherBarList toggles sort direction", () => {
    render(<DitherBarList />);
    const sortBtn = screen.getByRole("button", { name: "Sort: Highest" });
    fireEvent.click(sortBtn);
    expect(screen.getByRole("button", { name: "Sort: Lowest" })).toBeInTheDocument();
  });

  it("OrbitHero switches active orbital highlight", () => {
    render(<OrbitHero />);
    fireEvent.click(screen.getByRole("button", { name: "56 Cues" }));
    expect(screen.getByText("Opt-in Web Audio synthesis")).toBeInTheDocument();
  });

  it("CurtainNav opens menu and closes on route selection", () => {
    render(<CurtainNav />);
    const menuBtn = screen.getByRole("button", { name: "Open Menu" });
    expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(menuBtn);
    expect(screen.getByRole("navigation", { name: "Curtain navigation" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Motion Lab/i }));
    expect(screen.queryByRole("navigation", { name: "Curtain navigation" })).not.toBeInTheDocument();
  });

  it("TerminalLogin validates empty input and authenticates valid handle", () => {
    render(<TerminalLogin />);
    fireEvent.click(screen.getByRole("button", { name: "Run" }));
    expect(screen.getByText("error: handle required")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox", { name: "Developer handle" }), {
      target: { value: "jatin@renderjoy.dev" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Run" }));
    expect(screen.getByText("authenticated: jatin@renderjoy.dev")).toBeInTheDocument();
  });

  it("HorizonFooter subscribes valid email to release notes", () => {
    render(<HorizonFooter />);
    fireEvent.change(screen.getByRole("textbox", { name: "Release notes email" }), {
      target: { value: "team@renderjoy.dev" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Join" }));
    expect(screen.getByText("Subscribed to release notes")).toBeInTheDocument();
  });

  it("PricingTierCard switches billing cycle and selects tier", () => {
    render(<PricingTierCard />);
    expect(screen.getByText("$79")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Monthly" }));
    expect(screen.getByText("$12")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Choose Solo" }));
    expect(screen.getByRole("button", { name: "Selected Solo" })).toBeInTheDocument();
  });

  it("WaitlistSpotlight increments queue spot on join", () => {
    render(<WaitlistSpotlight initialCount={100} />);
    fireEvent.change(screen.getByRole("textbox", { name: "Waitlist email" }), {
      target: { value: "alex@studio.dev" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Join Waitlist" }));
    expect(screen.getByText(/Spot #101 reserved for alex@studio.dev/i)).toBeInTheDocument();
  });

  it("CtaBanner copies CLI command and updates label", () => {
    render(<CtaBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Copy Install CLI" }));
    expect(screen.getByRole("button", { name: "CLI Copied" })).toBeInTheDocument();
  });

  it("ContactCard switches topic and submits inquiry", () => {
    render(<ContactCard />);
    fireEvent.click(screen.getByRole("button", { name: "Enterprise" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Contact message" }), {
      target: { value: "Need 20 seats" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send to Enterprise" }));
    expect(screen.getByText("Inquiry sent to Enterprise team")).toBeInTheDocument();
  });

  it("BentoHighlightGrid selects tile and updates detail", () => {
    render(<BentoHighlightGrid />);
    fireEvent.click(screen.getByRole("button", { name: /Sound Engine/i }));
    expect(screen.getByText(/Sound Engine: Zero-dependency Web Audio/i)).toBeInTheDocument();
  });

  it("TestimonialDeck cycles to next quote", () => {
    render(<TestimonialDeck />);
    fireEvent.click(screen.getByRole("button", { name: "Next Quote" }));
    expect(screen.getByText("Alex Rivera")).toBeInTheDocument();
  });

  it("FeatureSpotlight switches capability chip snippet", () => {
    render(<FeatureSpotlight />);
    fireEvent.click(screen.getByRole("button", { name: "56 Audio Cues" }));
    expect(screen.getByText(/useSound\("click-soft"\)/i)).toBeInTheDocument();
  });

  it("FaqQuickList toggles disclosure item", () => {
    render(<FaqQuickList />);
    const secondBtn = screen.getByRole("button", { name: /Is audio enabled automatically/i });
    expect(secondBtn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(secondBtn);
    expect(secondBtn).toHaveAttribute("aria-expanded", "true");
  });

  it("LogoCloud filters logos by category", () => {
    render(<LogoCloud />);
    fireEvent.click(screen.getByRole("button", { name: "AI" }));
    expect(screen.getByText("Acme AI")).toBeInTheDocument();
    expect(screen.queryByText("OrbitCloud")).not.toBeInTheDocument();
  });

  it("AnnouncementBarBlock dismisses and restores banner", () => {
    render(<AnnouncementBarBlock />);
    fireEvent.click(screen.getByRole("button", { name: "Dismiss announcement" }));
    expect(screen.getByRole("button", { name: "Restore Announcement" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Restore Announcement" }));
    expect(screen.getByRole("region", { name: "Release announcement" })).toBeInTheDocument();
  });

  it("MegaMenu switches dropdown panels", () => {
    render(<MegaMenu />);
    fireEvent.click(screen.getByRole("button", { name: "Resources" }));
    expect(screen.getByText("Sound Library")).toBeInTheDocument();
  });

  it("HoverTabs switches tabpanel content on hover or click", () => {
    render(<HoverTabs />);
    fireEvent.mouseEnter(screen.getByRole("tab", { name: "Audio" }));
    expect(screen.getByText(/56 procedural Web Audio UI cues/i)).toBeInTheDocument();
  });

  it("RadialHubDiagram updates active spoke details", () => {
    render(<RadialHubDiagram />);
    fireEvent.click(screen.getByRole("button", { name: "Studio" }));
    expect(screen.getByText("58 isolated theme variants")).toBeInTheDocument();
  });

  it("IntegrationBeams toggles beam pulse state", () => {
    render(<IntegrationBeams />);
    const btn = screen.getByRole("button", { name: "Pause Beams" });
    fireEvent.click(btn);
    expect(screen.getByRole("button", { name: "Resume Beams" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("TeamSection filters members by department", () => {
    render(<TeamSection />);
    fireEvent.click(screen.getByRole("button", { name: "Design" }));
    expect(screen.getByText("Maya Lin")).toBeInTheDocument();
    expect(screen.queryByText("Alex Rivera")).not.toBeInTheDocument();
  });

  it("BlogSection filters posts by category tag", () => {
    render(<BlogSection />);
    fireEvent.click(screen.getByRole("button", { name: "Systems" }));
    expect(screen.getByText(/Isolating 58 Theme Tokens/i)).toBeInTheDocument();
    expect(screen.queryByText(/Spring Curves/i)).not.toBeInTheDocument();
  });

  it("WordmarkFooter highlights selected link pill", () => {
    render(<WordmarkFooter wordmark="STUDIO" />);
    expect(screen.getByText("STUDIO")).toBeInTheDocument();
    const docsBtn = screen.getByRole("button", { name: "Docs" });
    fireEvent.click(docsBtn);
    expect(docsBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("GradientFooter toggles operational status details", () => {
    render(<GradientFooter />);
    fireEvent.click(screen.getByRole("button", { name: "All Systems Operational" }));
    expect(screen.getByText(/Registry CDN: 14ms/i)).toBeInTheDocument();
  });

  it("EditorialHero switches monograph issues", () => {
    render(<EditorialHero />);
    fireEvent.click(screen.getByRole("button", { name: "#02" }));
    expect(screen.getByText(/Issue 02 · Tactile Audio/i)).toBeInTheDocument();
  });

  it("ScenicHero switches atmospheric mood", () => {
    render(<ScenicHero />);
    fireEvent.click(screen.getByRole("button", { name: "Midnight" }));
    expect(screen.getByText("Quiet Orbit")).toBeInTheDocument();
  });
});

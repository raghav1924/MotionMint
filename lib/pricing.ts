export interface PricingTierConfig {
  id: "free" | "pro-preview";
  name: string;
  badge: string;
  priceLabel: string;
  billingNote: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  features: { label: string; status: "available" | "planned" }[];
}

export const PRICING_TIERS: PricingTierConfig[] = [
  {
    id: "free",
    name: "Open Core",
    badge: "Available Now",
    priceLabel: "Free",
    billingNote: "Open source core components & registry",
    description:
      "All 44 implemented interactive components, 58-variant theme engine, Motion & Sound Labs, and Flow UI Kit.",
    ctaLabel: "Explore Components",
    ctaHref: "/components",
    features: [
      { label: "44 implemented Free & Signature components", status: "available" },
      { label: "29-theme × Light/Dark (58 variants) scoped engine", status: "available" },
      { label: "50-item shadcn-compatible public registry", status: "available" },
      { label: "Flow UI Kit & Node Pipeline Orchestrator demo", status: "available" },
    ],
  },
  {
    id: "pro-preview",
    name: "Pro Ecosystem",
    badge: "Pricing TBD (Phase 5–7)",
    priceLabel: "Waitlist / Preview",
    billingNote: "Final pricing & merchant-of-record pending validation",
    description:
      "Upcoming full-page templates, animated data visualisations, curated studio sound packs, and authenticated Pro delivery.",
    ctaLabel: "Inspect Planned Roadmap",
    ctaHref: "/docs",
    features: [
      { label: "Advanced Upload & Payment-Success Flows", status: "planned" },
      { label: "Animated Charts & Bento Dashboard Blocks", status: "planned" },
      { label: "Curated Studio Sound Packs & Pro Workflows", status: "planned" },
      { label: "Authenticated Pro Registry Delivery", status: "planned" },
    ],
  },
];

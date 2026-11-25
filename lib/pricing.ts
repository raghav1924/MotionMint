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
    billingNote: "MIT-licensed core components",
    description:
      "Core interactive primitives, signature starter experiences, 29-theme token system, and Web Audio synth.",
    ctaLabel: "Explore Free Components",
    ctaHref: "/components",
    features: [
      { label: "12 implemented Free & Signature components", status: "available" },
      { label: "29-theme design system & live studio", status: "available" },
      { label: "Web Audio + haptic feedback abstraction", status: "available" },
      { label: "Public shadcn-compatible registry (Phase 3)", status: "planned" },
    ],
  },
  {
    id: "pro-preview",
    name: "Pro Ecosystem",
    badge: "Pricing TBD (Phase 5–7)",
    priceLabel: "Launch Preview",
    billingNote: "Final pricing & Merchant-of-Record pending validation",
    description:
      "Complete application flows, animated data visualisations, curated sound packs, and advanced Flow templates.",
    ctaLabel: "Inspect Planned Roadmap",
    ctaHref: "/docs",
    features: [
      { label: "Advanced Upload & Payment-Success Flows", status: "planned" },
      { label: "Animated Charts (Gauge, Donut, Bars) & Bento Blocks", status: "planned" },
      { label: "Curated Studio Sound Packs & Advanced Flow Kit", status: "planned" },
      { label: "Authenticated Pro Registry Delivery", status: "planned" },
    ],
  },
];

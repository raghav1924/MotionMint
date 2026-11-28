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
      "All 77 Free & Signature components, 58-variant theme engine, 56-cue Sound Lab, Motion Lab, Bench, and Flow UI Kit.",
    ctaLabel: "Explore Components",
    ctaHref: "/components",
    features: [
      { label: "77 implemented Free & Signature components", status: "available" },
      { label: "29-theme × Light/Dark (58 variants) scoped engine", status: "available" },
      { label: "89-item shadcn-compatible registry", status: "available" },
      { label: "Flow UI Kit, Bench & 56-cue Sound Lab", status: "available" },
    ],
  },
  {
    id: "pro-preview",
    name: "Pro Ecosystem",
    badge: "Pro Registry Ready",
    priceLabel: "$149 / once",
    billingNote: "India MoR ready (Dodo Payments / Paddle) · Lifetime updates",
    description:
      "Full-page flows, animated data visualisations, Cover-Flow carousel, Bento dashboard blocks, and authenticated @renderjoy-pro delivery.",
    ctaLabel: "Configure Pro Token",
    ctaHref: "/pricing",
    features: [
      { label: "Advanced Upload & Payment-Success Flows", status: "available" },
      { label: "Animated Charts, Cover-Flow & Bento Dashboard", status: "available" },
      { label: "SHA-256 Authenticated @renderjoy-pro Registry", status: "available" },
      { label: "Commercial team licence & priority updates", status: "available" },
    ],
  },
];

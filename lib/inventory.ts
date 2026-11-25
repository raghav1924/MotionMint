import { CATALOG_ITEMS } from "@/lib/catalog";

export type InventoryStatus = "available" | "experimental" | "planned" | "deprecated";

export type InventoryCategory =
  | "Getting Started"
  | "AI"
  | "WebGL and Visual Effects"
  | "Media"
  | "Carousels"
  | "Controls"
  | "Physics"
  | "Text"
  | "Sections"
  | "Features"
  | "Bento"
  | "Testimonials"
  | "Pricing"
  | "FAQs"
  | "Contact"
  | "CTA"
  | "Waitlist"
  | "Charts"
  | "Heroes"
  | "Navbars"
  | "Logins"
  | "Footers";

export interface InventoryItem {
  id: string;
  slug: string;
  name: string;
  category: InventoryCategory;
  subcategory: string;
  description: string;
  tier: "free" | "pro";
  status: InventoryStatus;
  featured: boolean;
  tags: string[];
  themeCompatibility: "all-29" | "planned";
  dependencies: string[];
  sourcePath?: string;
  previewType: "live" | "roadmap";
  accessibilityStatus: "verified" | "planned";
  documentationStatus: "complete" | "planned";
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const IMPLEMENTED_SLUGS = new Set(
  CATALOG_ITEMS.filter((c) => c.status === "implemented").map((c) => c.slug)
);

const IMPLEMENTED_MAP = new Map<string, InventoryCategory>([
  ["thinking-loader", "AI"],
  ["ai-prompt-composer", "AI"],
  ["streaming-message", "AI"],
  ["tool-call-card", "AI"],
  ["agent-plan", "AI"],
  ["approval-card", "AI"],
  ["inline-diff", "AI"],
  ["reasoning-trace", "AI"],
  ["ai-chat", "AI"],
  ["image-generation", "AI"],
  ["chat-orb", "AI"],
  ["pixel-image-generation", "AI"],
  ["segmented-control", "Controls"],
  ["number-stepper", "Controls"],
  ["glow-input", "Controls"],
  ["email-capture", "Controls"],
  ["date-picker", "Controls"],
  ["animated-select", "Controls"],
  ["otp-input", "Controls"],
  ["multi-select", "Controls"],
  ["cookie-consent", "Controls"],
  ["card-stack", "Controls"],
  ["detent-drawer", "Controls"],
  ["notch", "Controls"],
  ["physical-knob", "Controls"],
  ["reaction-arc", "Controls"],
  ["receipt-printer", "Controls"],
  ["rubber-band-select", "Controls"],
  ["morphing-tray", "Controls"],
  ["keyboard", "Controls"],
  ["infinity-canvas", "Controls"],
  ["scratch-card", "Controls"],
  ["halftone-popover", "Controls"],
  ["swipe-card-deck", "Media"],
  ["flip-card", "Media"],
  ["copy-button", "Controls"],
  ["sound-toggle", "Controls"],
  ["dropzone", "Controls"],
  ["ripple-button", "Controls"],
  ["jelly-button", "Controls"],
  ["wiggle-text", "Text"],
  ["bounce-dots-loader", "AI"],
  ["skeleton-shimmer", "Sections"],
  ["progress-ring", "Charts"],
]);

const PLANNED_GROUPS: { category: InventoryCategory; tier: "free" | "pro"; items: string[] }[] = [
  { category: "Getting Started", tier: "free", items: ["Introduction", "Installation", "MCP", "AI"] },
  {
    category: "AI",
    tier: "pro",
    items: [
      "Thinking Loader", "AI Prompt Composer", "Streaming Message", "Reasoning Trace",
      "Image Generation", "Tool Call Card", "Agent Plan", "AI Chat", "Inline Diff",
      "Approval Card", "Chat Orb", "Pixel Image Generation",
    ],
  },
  {
    category: "WebGL and Visual Effects",
    tier: "pro",
    items: [
      "Logo Flare", "Prism", "Wind Tunnel", "Cloud Sea", "Ink", "Slipstream", "Embers",
      "Beams", "ASCII WebGL", "Dither Field", "Ferrofluid", "Fluid Field", "Cymatics",
      "Pixel Grid", "Caustics", "Thin Film", "Topography", "Jali", "Galaxy", "Eclipse",
      "Streaks", "Magma", "Warp", "Liquid Gradient", "Code Rain", "Voxel", "Voxel Park",
      "Voxel Shrine", "Voxel Onsen", "Voxel Pond", "Voxel Skill",
    ],
  },
  {
    category: "Media",
    tier: "pro",
    items: [
      "Link Preview", "Radial Pop-out", "Direction-Aware Flip Card", "Hover Reveal",
      "Photo Stack", "Hero Card Stack", "Swipe Card Deck", "Photo Shuffle",
      "Retro Music Player", "Album Cover", "Apple Music Card", "Watch Face",
      "Digital Watch Face", "Avatar Cluster", "Photo Lightbox", "Scroll Zoom Reveal",
      "GitHub Chart", "Dither Renderer", "Progressive Blur", "Hero Media Scroll-Out",
      "Shutter Gallery", "Photo Planes", "Polaroid Flip Card", "Blur Collage",
      "Text Cylinder", "Expanding Card", "Curved Video Player", "Scroll Settle Gallery",
      "Peel Stack",
    ],
  },
  {
    category: "Carousels",
    tier: "pro",
    items: [
      "Logo Wall", "Marquee", "Image Wheel", "Image Flow Carousel", "Arc Marquee",
      "Parallax Carousel", "Bend Carousel", "Elastic Carousel", "Focus Scale Carousel",
      "Fan Carousel", "Cover Flow", "Lens Carousel", "Ring Gallery", "Helix Gallery",
    ],
  },
  {
    category: "Controls",
    tier: "free",
    items: [
      "Copy Button", "Segmented Control", "Number Stepper", "Glow Input", "Email Capture",
      "Card Stack", "Date Picker", "Animated Select", "Command Palette", "OTP Input",
      "Detent Drawer", "Notch", "Physical Knob", "Reaction Arc", "Receipt Printer",
      "Rubber Band Select", "Morphing Tray", "Keyboard", "Infinity Canvas", "Scratch Card",
      "Multi Select", "File Dropzone", "Halftone Popover", "Cookie Consent",
    ],
  },
  {
    category: "Physics",
    tier: "pro",
    items: [
      "Ripple Grid", "Particle Reveal", "Pendulum Wave", "Rubik's Cube",
      "Dotted Sphere", "Dot Monogram",
    ],
  },
  {
    category: "Text",
    tier: "free",
    items: [
      "Smooth Stagger Text", "Cinematic Text", "Split-Flap Board", "Liquid Headline",
      "Signature Reveal", "Rainbow Text", "Neon Sign", "Glitch Reveal",
      "Odometer", "Photo Headline",
    ],
  },
  {
    category: "Sections",
    tier: "pro",
    items: [
      "Shader Strip", "Shader Rows", "Shader Index", "Shader Flood", "Hover Tabs",
      "Silk Card", "Mega Menu", "Integration Beams", "Radial Hub Diagram", "Shader Tabs",
      "World Map", "Dotted Globe", "Activity Feed", "Scroll Stage", "Radar Sweep",
      "Data Table", "Integration Grid", "Changelog Timeline", "Announcement Bar",
      "Logo Cloud", "Team Section", "Blog Section", "Integration Wall", "Showcase Wall",
    ],
  },
  { category: "Features", tier: "pro", items: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"] },
  { category: "Bento", tier: "pro", items: ["Bento 1", "Bento 2", "Bento 3", "Bento 4", "Bento 5", "Bento 6", "Bento 7", "Bento 8"] },
  { category: "Testimonials", tier: "pro", items: Array.from({ length: 10 }, (_, i) => `Testimonial ${i + 1}`) },
  { category: "Pricing", tier: "pro", items: Array.from({ length: 7 }, (_, i) => `Pricing ${i + 1}`) },
  { category: "FAQs", tier: "free", items: Array.from({ length: 8 }, (_, i) => `FAQ ${i + 1}`) },
  { category: "Contact", tier: "free", items: Array.from({ length: 7 }, (_, i) => `Contact ${i + 1}`) },
  { category: "CTA", tier: "free", items: Array.from({ length: 6 }, (_, i) => `CTA ${i + 1}`) },
  { category: "Waitlist", tier: "free", items: Array.from({ length: 4 }, (_, i) => `Waitlist ${i + 1}`) },
  {
    category: "Charts",
    tier: "pro",
    items: [
      "Shader Area", "Shader Bars", "Shader Stream", "Dither Donut", "Dither Heatmap",
      "Shader Stat Tiles", "Dither Bar List", "Dither Gauge", "Dither Line Chart", "Dither Pie",
    ],
  },
  {
    category: "Heroes",
    tier: "pro",
    items: [
      "Silk Strand Hero", "Floating Cards Hero", "Orbit Hero", "Gallery Wall Hero",
      "SDK Hero", "Trail Hero", "Type Hero", "Desk Hero", "Orbit Prompt Hero",
      "Scenic Hero", "Editorial Hero", "Landing Hero",
    ],
  },
  { category: "Navbars", tier: "free", items: ["Shader Nav", "Navbar", "Curtain Nav"] },
  { category: "Logins", tier: "free", items: ["Portal Login", "Terminal Login", "Auth Form"] },
  { category: "Footers", tier: "free", items: ["Wordmark Footer", "Halftone Footer", "Gradient Footer", "Horizon Footer"] },
];

const ALIAS_TO_IMPLEMENTED: Record<string, string> = {
  "thinking-loader": "thinking-loader",
  "direction-aware-flip-card": "flip-card",
  "swipe-card-deck": "swipe-card-deck",
  "copy-button": "copy-button",
  "file-dropzone": "dropzone",
};

function buildFullInventory(): InventoryItem[] {
  const list: InventoryItem[] = [];
  const seenSlugs = new Set<string>();

  // 1. Add all 12 genuinely implemented components first
  for (const item of CATALOG_ITEMS) {
    if (item.status !== "implemented") continue;
    seenSlugs.add(item.slug);
    list.push({
      id: `mm-${item.slug}`,
      slug: item.slug,
      name: item.name,
      category: IMPLEMENTED_MAP.get(item.slug) ?? "Controls",
      subcategory: item.category,
      description: item.description,
      tier: item.tier,
      status: "available",
      featured: item.category === "Signature",
      tags: [item.category.toLowerCase(), item.tier, ...(item.supportsSound ? ["sound"] : [])],
      themeCompatibility: "all-29",
      dependencies: item.dependencies,
      sourcePath: item.sourcePath,
      previewType: "live",
      accessibilityStatus: "verified",
      documentationStatus: "complete",
    });
  }

  // 2. Add full planned inventory without duplicating implemented items
  for (const group of PLANNED_GROUPS) {
    for (const name of group.items) {
      const rawSlug = toSlug(name);
      const mapped = ALIAS_TO_IMPLEMENTED[rawSlug] ?? rawSlug;
      if (IMPLEMENTED_SLUGS.has(mapped) || seenSlugs.has(rawSlug)) {
        continue;
      }
      seenSlugs.add(rawSlug);
      list.push({
        id: `mm-${rawSlug}`,
        slug: rawSlug,
        name,
        category: group.category,
        subcategory: group.category,
        description: `Planned MotionMint ${group.category.toLowerCase()} experience (${name}).`,
        tier: group.tier,
        status: "planned",
        featured: false,
        tags: [
          group.category.toLowerCase(),
          group.tier,
          "roadmap",
          ...(name === "Voxel Shrine" || name === "Voxel Onsen" ? ["new"] : []),
        ],
        themeCompatibility: "planned",
        dependencies: [],
        previewType: "roadmap",
        accessibilityStatus: "planned",
        documentationStatus: "planned",
      });
    }
  }

  return list;
}

export const FULL_INVENTORY: InventoryItem[] = buildFullInventory();

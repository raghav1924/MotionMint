import React from "react";
import Link from "next/link";
import { CinematicHero } from "@/components/home/cinematic-hero";
import { CapabilityStrip } from "@/components/home/capability-strip";
import { ExhibitionGallery } from "@/components/site/exhibition-gallery";
import { ThemeDifferentiator } from "@/components/home/theme-differentiator";
import { MotionSoundShowcase } from "@/components/home/motion-sound-showcase";
import { FlowShowcase } from "@/components/home/flow-showcase";
import { DeveloperExperienceShowcase } from "@/components/home/developer-dx";
import { PricingSection } from "@/components/home/pricing-section";
import { FaqAccordion } from "@/components/site/faq-accordion";

const HOMEPAGE_FAQS = [
  {
    question: "What is MotionMint?",
    answer:
      "MotionMint is a developer-focused React component library and design system featuring 44 implemented interactive components, 29 design themes (58 Light/Dark variants), Motion & Sound Labs, and the MotionMint Flow Node Pipeline Orchestrator.",
  },
  {
    question: "How do I install components?",
    answer:
      "Use the shadcn-compatible CLI (`pnpm dlx shadcn@latest add @motionmint/<slug>`) or copy the TypeScript source directly from any component's Component Studio page.",
  },
  {
    question: "Can I edit the source code?",
    answer:
      "Yes. Components install as self-contained TypeScript/React files inside your repository rather than an opaque node_modules package, so you own and customize every line.",
  },
  {
    question: "How do the 29 themes and 58 variants work?",
    answer:
      "Wrap any component in <MotionMintTheme theme=\"...\" mode=\"light|dark\">. Scoped CSS variables (--mm-*) and recipe attributes transform the component without altering your website's global appearance.",
  },
  {
    question: "Does MotionMint support light and dark component variants?",
    answer:
      "Yes. Every one of the 29 design themes has distinct, art-directed Light and Dark token palettes (58 visual variants per component), independent from the site's Light/Dark/System appearance.",
  },
  {
    question: "Is sound required?",
    answer:
      "No. Sound is off by default globally, never auto-plays, and all state transitions provide visual and keyboard fallbacks.",
  },
  {
    question: "What is MotionMint Flow?",
    answer:
      "MotionMint Flow (/flow) provides a portable @xyflow/react Flow UI Kit (BaseNode, 9 pipeline node types, FlowCanvas) alongside the Node Pipeline Orchestrator demo with Kahn's DAG validation and a clearly labelled simulated execution adapter.",
  },
  {
    question: "What dependencies do components require?",
    answer:
      "Core components use React 19, Tailwind CSS v4, clsx, tailwind-merge, lucide-react, and Motion for React. Flow UI Kit items additionally declare @xyflow/react.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-24 pb-16 overflow-x-clip">
      {/* Section 2: Cinematic Hero */}
      <CinematicHero />

      {/* Section 3: Verified Capability Strip */}
      <CapabilityStrip />

      {/* Section 4: Asymmetric Product Exhibition */}
      <section id="exhibition" className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--ws-text-muted)]">
              Product Exhibition
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--ws-text-primary)] sm:text-4xl">
              Not just components. Complete experiences.
            </h2>
            <p className="text-sm text-[var(--ws-text-secondary)]">
              Every preview below is a live, interactive component from the implemented
              catalogue. Open any piece in Component Studio to inspect props, 58 theme
              variants, device frames, and source code.
            </p>
          </div>
          <Link
            href="/components"
            className="text-sm font-medium text-[var(--ws-text-primary)] hover:underline"
          >
            Browse all 44 components →
          </Link>
        </div>

        <ExhibitionGallery />
      </section>

      {/* Section 5: 58-Variant Theme Differentiator */}
      <div id="features">
        <ThemeDifferentiator />
      </div>

      {/* Section 6: Motion & Sound Showcase */}
      <MotionSoundShowcase />

      {/* Section 7: MotionMint Flow Showcase */}
      <FlowShowcase />

      {/* Section 8: Developer Experience */}
      <DeveloperExperienceShowcase />

      {/* Section 9: Value & Pricing Preview */}
      <PricingSection />

      {/* Section 10: FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
        <div className="mx-auto max-w-2xl text-center space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--ws-text-muted)]">
            FAQ
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--ws-text-primary)] sm:text-4xl">
            Common questions
          </h2>
        </div>

        <FaqAccordion items={HOMEPAGE_FAQS} />
      </section>
    </div>
  );
}

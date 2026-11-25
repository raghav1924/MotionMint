# TREND_RADAR.md — Technology & Market Research

*Last reviewed: 2026-11-25*

## 1. Technology Radar

| Technology | Version / Status | Source & Date | Classification | Decision & Rationale |
|---|---|---|---|---|
| **Next.js App Router** | `v16.4.x` (Nov 2026 LTS patches) | Official Next.js docs / GitHub releases (Nov 2026) | **Adopt now** | Stable RSC + Turbopack + security patches. Ideal for modular monolith site + registry endpoints. |
| **Tailwind CSS v4** | `v4.x` (`@tailwindcss/postcss`) | Tailwind CSS v4 docs (2026) | **Adopt now** | CSS-first `@theme` eliminates `tailwind.config.js` boilerplate and pairs cleanly with CSS-variable skins. |
| **Motion (`motion/react`)** | Latest (`motion` pkg) | `motion.dev` / npm (2026) | **Adopt now** | Official successor to `framer-motion`; full React 19 support. Use only for physics/springs/layout, not static UI. |
| **shadcn Namespaced Registry** | `registry.json` & `registry-item.json` | `ui.shadcn.com` schema docs (2026) | **Adopt now** | Industry-standard CLI distribution (`npx shadcn add @namespace/item`) with private header support for future Pro tier. |
| **`@xyflow/react`** | `v12/v13` (MIT core) | `xyflow.com` / GitHub LICENSE (2026) | **Adopt in Phase 6** | Mature MIT-licensed node canvas; avoids rebuilding pan/zoom/edge math from scratch. |
| **Custom MCP Server** | Ecosystem trend | 21st.dev, Planes (2026) | **Monitor** | Build `llms.txt` + structured JSON metadata first; only add an MCP server once catalogue size justifies maintenance. |

## 2. Competitor & Reference Snapshot (2026-11-25)

| Product | Positioning | Strengths | Gaps / MotionMint Opportunity |
|---|---|---|---|
| **shadcn/ui** | Foundational accessible primitives & registry standard | Ecosystem standard, clean CLI & registry schema | Neutral/static by default; minimal motion/sound/flow |
| **Magic UI** | Marketing & SaaS landing components | Strong bento grids, beams, marquees | Focused on marketing sections rather than full app flows + sound/haptics |
| **Motion Primitives** | Composable micro-interaction primitives | Clean ergonomics, accessible motion | No skin system, no sound/haptics, no workflow builder |
| **React Bits** | Large visual effects & background catalog | Huge variety of text/shader effects | Inconsistent motion curves; heavy effect focus over product flows |
| **Planes (`useplanes.com`)** | Premium interaction layer + AI MCP + lifetime pricing | High polish, `llms.txt` + MCP, lifetime model | Commercial closed library; opportunity for MotionMint's open core + Sound Lab + Flow UI Kit |
| **21st.dev** | Community registry hub + AI agent MCP | Strong AI-agent discovery | Aggregator quality varies; lacks unified design-skin & audio-haptic system |

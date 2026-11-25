# DECISIONS.md — Architecture Decision Records

## ADR-001: Modular Monolithic Next.js App Over Monorepo
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Starting a new UI ecosystem with a website, docs, component previews, and a shadcn-compatible registry.
- **Decision:** Use a single Next.js 16 App Router application with a clean `registry/` folder rather than Turborepo/pnpm workspaces.
- **Consequences:** Faster iteration, zero workspace tooling overhead, single deployment target. Can split into packages later if npm distribution is justified.

## ADR-002: CSS-Variable Token System for Multi-Skin Support
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Product requires 4 launch skins (Dark Mode, Bento, Glassmorphism, Neo-Brutalism) and a roadmap of 29 styles without duplicating component implementations.
- **Decision:** Define a semantic `--mm-*` token contract in CSS scoped to `[data-skin="..."]` and consume tokens via Tailwind v4 utility mappings.
- **Consequences:** Every component automatically adapts to any skin; adding new skins requires zero component rewrites.

## ADR-003: Web Audio API Synthesis for Core Sound Engine
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Sound feedback must be optional, off by default, fast, and free of proprietary audio assets or network latency.
- **Decision:** Build a lightweight Web Audio API synthesizer (`lib/audio/sound-engine.ts`) for core UI sounds (`click`, `toggleOn`, `toggleOff`, `success`, `error`, `drop`) paired with `navigator.vibrate` haptics.
- **Consequences:** Zero audio asset bundle overhead, instant response on user gesture, clean abstraction for future Pro sound packs.

## ADR-004: Defer Node Pipeline Orchestrator Audit Until Source Archive Provided
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** The referenced Google Drive link (`1-dJI0N4fstplb7EQs0018INJUWmXopIA`) is not directly downloadable from the sandboxed environment.
- **Decision:** Record the prototype as `Unable to verify` in `ARCHITECTURE.md` and `ROADMAP.md`, proceed with Phases 1–3, and audit the prototype as soon as the user provides the local folder/archive for Phase 6.
- **Consequences:** Does not block the launch of the core website, design system, and free component library.

## ADR-005: Typed 29-Theme Token Registry with Dynamic CSS Variable Injection
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Scaling from 4 skins to 29 distinct visual themes (colour, typography, geometry, surface depth, motion personality, and decorative textures) without writing 29×9 duplicated component variants or bloating `globals.css`.
- **Decision:** Define all 29 themes as typed `ThemeDefinition` objects in `lib/themes/definitions/`, serialize them to `--mm-*` CSS variables via `themeToCssVars()`, and apply them either globally on `document.documentElement` or scoped inline per preview card.
- **Consequences:** Zero CSS duplication, instant live theme switching, URL `?theme=` shareability, and side-by-side comparison in `/themes`.

## ADR-006: Two-Layer Catalogue Metadata (`CATALOG_ITEMS` vs `FULL_INVENTORY`)
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** MotionMint has 12 implemented components today and a 200+ item target inventory across 22 categories.
- **Decision:** Keep `CATALOG_ITEMS` (`lib/catalog.ts`) for implemented/detailed studio items and `FULL_INVENTORY` (`lib/inventory.ts`) for the complete typed roadmap, defaulting `/components` to `Available Now (12)` and exposing planned items in a dedicated `Full Inventory` tab.
- **Consequences:** Zero broken detail pages for unbuilt items, honest status labelling, and clean search/category/tier filtering across the entire ecosystem.

## ADR-007: Authoritative `registry.json` + `@motionmint/sound-engine` Shared Lib Item
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Seven of the twelve free components share `lib/audio/sound-engine.ts` and `lib/audio/feedback-store.ts`, and four rely on custom `@keyframes` (`mm-bounce-dot`, `mm-wiggle`, `mm-shimmer`).
- **Decision:** Publish `sound-engine` as a `registry:lib` item in `registry.json`, declare `@motionmint/sound-engine` in `registryDependencies` for sound-enabled components, and declare `@keyframes` under the official `css` key so `shadcn@4.23.0` merges them idempotently into consumer `globals.css`.
- **Consequences:** Zero duplicated audio files across component installs, automatic dependency resolution via `npx shadcn@latest add @motionmint/<slug>`, and zero website-specific imports.

## ADR-008: Separation of Application Appearance (`--ws-*`) from 29 Component Themes (`--mm-*`)
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Switching a component preview to Cyberpunk, Wabi Sabi, or Blueprint should not unexpectedly invert or re-texture the entire developer workspace chrome.
- **Decision:** Introduce `--ws-*` semantic tokens on `[data-appearance="dark" | "light"]` for the site & workspace shell (`WorkspaceShell`, `Navbar`, `CommandPalette`, `Drawer`), and scope `--mm-*` theme tokens to component preview canvases.
- **Consequences:** Dark/Light/System appearance works consistently across all workspace chrome while preserving 100% of the 29-theme component preview engine.

## ADR-009: Unified Planes-Inspired Shell, Floating Toolbar & Device Preview Architecture (Phase 2.8)
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Component Studio and Playground had diverged in chrome, device preview framing, and bottom toolbar controls.
- **Decision:** Route both `/components/[slug]` and `/playground` through the shared `FloatingToolbar`, `EditorialSidebar`, `DesktopBrowserFrame`, `TabletPreviewFrame`, `MobileDeviceFrame`, and `ComponentDocs` primitives, defaulting application appearance to Light (`#FFFFFF`) with inverted Dark (`#050506`).
- **Consequences:** Consistent viewport switching, prompt generation, and device preview behaviour across both surfaces with zero duplicated toolbar code.
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Seven of the twelve free components share `lib/audio/sound-engine.ts` and `lib/audio/feedback-store.ts`, and four rely on custom `@keyframes` (`mm-bounce-dot`, `mm-wiggle`, `mm-shimmer`).
- **Decision:** Publish `sound-engine` as a `registry:lib` item in `registry.json`, declare `@motionmint/sound-engine` in `registryDependencies` for sound-enabled components, and declare `@keyframes` under the official `css` key so `shadcn@4.23.0` merges them idempotently into consumer `globals.css`.
- **Consequences:** Zero duplicated audio files across component installs, automatic dependency resolution via `npx shadcn@latest add @motionmint/<slug>`, and zero website-specific imports.
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** The referenced Google Drive link (`1-dJI0N4fstplb7EQs0018INJUWmXopIA`) is not directly downloadable from the sandboxed environment.
- **Decision:** Record the prototype as `Unable to verify` in `ARCHITECTURE.md` and `ROADMAP.md`, proceed with Phases 1–3, and audit the prototype as soon as the user provides the local folder/archive for Phase 6.
- **Consequences:** Does not block the launch of the core website, design system, and free component library.

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
- **Context:** RenderJoy has 12 implemented components today and a 200+ item target inventory across 22 categories.
- **Decision:** Keep `CATALOG_ITEMS` (`lib/catalog.ts`) for implemented/detailed studio items and `FULL_INVENTORY` (`lib/inventory.ts`) for the complete typed roadmap, defaulting `/components` to `Available Now (12)` and exposing planned items in a dedicated `Full Inventory` tab.
- **Consequences:** Zero broken detail pages for unbuilt items, honest status labelling, and clean search/category/tier filtering across the entire ecosystem.

## ADR-007: Authoritative `registry.json` + `@renderjoy/sound-engine` Shared Lib Item
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Seven of the twelve free components share `lib/audio/sound-engine.ts` and `lib/audio/feedback-store.ts`, and four rely on custom `@keyframes` (`mm-bounce-dot`, `mm-wiggle`, `mm-shimmer`).
- **Decision:** Publish `sound-engine` as a `registry:lib` item in `registry.json`, declare `@renderjoy/sound-engine` in `registryDependencies` for sound-enabled components, and declare `@keyframes` under the official `css` key so `shadcn@4.23.0` merges them idempotently into consumer `globals.css`.
- **Consequences:** Zero duplicated audio files across component installs, automatic dependency resolution via `npx shadcn@latest add @renderjoy/<slug>`, and zero website-specific imports.

## ADR-008: Separation of Application Appearance (`--ws-*`) from 29 Component Themes (`--mm-*`)
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Switching a component preview to Cyberpunk, Wabi Sabi, or Blueprint should not unexpectedly invert or re-texture the entire developer workspace chrome.
- **Decision:** Introduce `--ws-*` semantic tokens on `[data-appearance="dark" | "light"]` for the site & workspace shell (`WorkspaceShell`, `Navbar`, `CommandPalette`, `Drawer`), and scope `--mm-*` theme tokens to component preview canvases.
- **Consequences:** Dark/Light/System appearance works consistently across all workspace chrome while preserving 100% of the 29-theme component preview engine.

## ADR-013: Eliminate Legacy WorkspaceShell & Unify All Five Experiences Under AppShell (Phase 2.11)
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Motion Lab (`/motion`), Sound Lab (`/sounds`), and Flow (`/flow`) previously routed through `WorkspaceShell`, creating a disjointed permanent left icon rail and 56px dashboard header that differed from Component Studio and Theme Studio.
- **Decision:** Remove `WorkspaceShell` and `isWorkspaceRoute()`, route all five experiences through the unified `AppShell` (`AnnouncementBar`, `NavigationToggle`, `BrandFloatingButton`, `EditorialSidebar`, `CommandPalette`), introduce `WorkspacePage`/`WorkspaceHeader`, and add contextual modes to `FloatingToolbar` (while omitting `FloatingToolbar` on `/flow` so the node editor toolbar & graph remain unobstructed).
- **Consequences:** All five RenderJoy workspaces share identical outer chrome, Light/Dark/System appearance, and navigation while preserving domain-specific inner canvases.

## ADR-012: Consolidate Preview on Component Studio & Integrate POC Node Pipeline Orchestrator (Integration Sprint)
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Standalone `/playground` duplicated `ComponentStudio` (`/components/[slug]`), and standalone `/canvas` created confusion between the reusable `InfinityCanvas` UI component and the Node Pipeline Orchestrator. Meanwhile, the user supplied their VectorShift POC (`https://github.com/raghav1924/frontend_technical_assessment`) for Phase 6.
- **Decision:**
  1. Remove `/playground` and `/canvas` routes; consolidate component previewing into `ComponentStudio` + `ThemeStudio` using shared `FloatingToolbar`, `PromptMenu`, and `DeviceFrames`. Keep `InfinityCanvas` exclusively as an installable component at `/components/infinity-canvas`.
  2. Audit the user-owned POC and port its 9 node abstractions, auto-resizing `TextNode` (`{{ var }}` handle extraction), `BaseNode` multi-handle spacing, and Kahn's DAG validation into RenderJoy's 3-layer Flow architecture: portable `registry/flow/` UI Kit (`@xyflow/react`), `lib/flow/` workflow model/DAG/simulator, and `/flow` Orchestrator workspace with its own dedicated toolbar, palette, inspector, and clearly labelled **Simulated Execution Adapter**.
- **Consequences:** Clear product boundaries, zero duplicate preview shells, 50 validated registry items, and honest labelling of simulated pipeline execution (since the POC backend only validates DAG topology without a runtime runner).

## ADR-010: Component Theme Isolation via RenderJoyTheme Scope Wrapper (Phase 2.9)
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** The existing `applyThemeToDocument()` function injected `--mm-*` CSS vars onto `document.documentElement`, causing component theme switches to unintentionally re-texture the entire workspace chrome (navbar, sidebar, toolbar). The 29 RenderJoy themes are designed for components only — the main site uses `--ws-*` tokens and a separate appearance system.
- **Decision:** Stub `applyThemeToDocument()` to a no-op. Introduce `<RenderJoyTheme theme mode>` scope wrapper (`components/theme/theme-scope.tsx`) that applies `--mm-*` vars exclusively via inline `style` attribute on a wrapping `<div>`. All component preview stages (ComponentStudio, ThemeStudio, PlaygroundShell) wrap their previews in this scope. The `themeId` in providers is now only the "currently selected theme for preview" state.
- **Consequences:** Global workspace chrome (navbar, sidebar, toolbar, backgrounds) is 100% isolated from component theme switches. 29 themes + 2 modes = 58 variants are exclusively component-scoped. Future `RenderJoyTheme` nesting is supported — inner scopes override outer scope `--mm-*` vars via CSS cascade.

## ADR-011: Future Theme Demo Websites (Planned, Not Implemented in Phase 2.9)
- **Date:** 2026-11-25
- **Status:** Accepted (pending implementation — Wave 3+ prerequisite)
- **Context:** Each of the 29 component themes (Scrapbook, Cyberpunk, Blueprint, etc.) is visually distinctive enough to warrant a full website demo showing what a product built entirely with that theme would look like. This would be a powerful marketing and showcase feature.
- **Decision:** Defer full theme demo websites to a future phase. The routes (`/themes/scrapbook/demo`, etc.) will be implemented using Next.js dynamic segments (`/themes/[themeId]/demo`) when Wave 3+ component collections are complete enough to populate a full demo page. ROADMAP.md documents the planned architecture; no route files or demo pages are created in Phase 2.9.
- **Consequences:** No scope creep in Phase 2.9. When ready, a single dynamic route handler with `generateStaticParams` can build all 29 demo pages at once. The `RenderJoyTheme` scope wrapper already provides the necessary primitive.

## ADR-011: Embedded Comparison Workbench & Typed Interaction Taxonomy (Phase 2.13)
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Incorporating interactive component discovery and side-by-side experimentation patterns inspired by `bencho.dev` without introducing standalone `/bench`, `/playground`, or `/canvas` routes.
- **Decision:** Extend `CatalogItem` via `lib/catalog-interactions.ts` with typed `InteractionType[]` and capability flags, gate offscreen card previews with `VisibilityPreview` (`IntersectionObserver`), and embed `ComparisonWorkbench` directly inside Component Studio (`/components/[slug]`) and Theme Studio (`/themes`) using isolated `<RenderJoyTheme>` scopes.
- **Consequences:** Developers can filter by interaction gesture, tune real props live, inspect code, and compare scoped theme expressions in one unified studio without route sprawl.

## ADR-010: Bespoke Kinetic M Brand Identity & 6-Beat Editorial Homepage (Phase 2.12)
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Feedback on Phase 2.10/2.11 noted that the homepage read like a multi-section SaaS feature tour, the starburst icon felt generic, and the floating pill navbar / 4-column footer lacked editorial character.
- **Decision:** Introduce the bespoke **Kinetic M** mark (`components/brand/renderjoy-logo.tsx`, `app/icon.svg`), replace the floating pill header with a full-width editorial hairline bar, trim `app/page.tsx` to 6 beats (Hero, CapabilityStrip, 5-piece ExhibitionGallery, split Themes+Flow, Developer CTA, oversized Editorial Footer), and keep deep feature tours on their dedicated routes (`/motion`, `/sounds`, `/docs/installation`, `/themes`, `/flow`).
- **Consequences:** Stronger brand distinction, balanced first-viewport framing, and clearer separation between editorial homepage storytelling and deep workspace tools.

## ADR-009: Unified Planes-Inspired Shell, Floating Toolbar & Device Preview Architecture (Phase 2.8)
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Component Studio and Playground had diverged in chrome, device preview framing, and bottom toolbar controls.
- **Decision:** Route both `/components/[slug]` and `/playground` through the shared `FloatingToolbar`, `EditorialSidebar`, `DesktopBrowserFrame`, `TabletPreviewFrame`, `MobileDeviceFrame`, and `ComponentDocs` primitives, defaulting application appearance to Light (`#FFFFFF`) with inverted Dark (`#050506`).
- **Consequences:** Consistent viewport switching, prompt generation, and device preview behaviour across both surfaces with zero duplicated toolbar code.
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** Seven of the twelve free components share `lib/audio/sound-engine.ts` and `lib/audio/feedback-store.ts`, and four rely on custom `@keyframes` (`mm-bounce-dot`, `mm-wiggle`, `mm-shimmer`).
- **Decision:** Publish `sound-engine` as a `registry:lib` item in `registry.json`, declare `@renderjoy/sound-engine` in `registryDependencies` for sound-enabled components, and declare `@keyframes` under the official `css` key so `shadcn@4.23.0` merges them idempotently into consumer `globals.css`.
- **Consequences:** Zero duplicated audio files across component installs, automatic dependency resolution via `npx shadcn@latest add @renderjoy/<slug>`, and zero website-specific imports.
- **Date:** 2026-11-25
- **Status:** Accepted
- **Context:** The referenced Google Drive link (`1-dJI0N4fstplb7EQs0018INJUWmXopIA`) is not directly downloadable from the sandboxed environment.
- **Decision:** Record the prototype as `Unable to verify` in `ARCHITECTURE.md` and `ROADMAP.md`, proceed with Phases 1–3, and audit the prototype as soon as the user provides the local folder/archive for Phase 6.
- **Consequences:** Does not block the launch of the core website, design system, and free component library.

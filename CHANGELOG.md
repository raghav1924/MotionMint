# CHANGELOG.md — RenderJoy

## [0.31.0] — 2026-11-28 (Priority 4 — Wave 5 Physics & Text Batch 1)
### Added
- `registry/components/ripple-grid.tsx`: Interactive tactile grid propagating radial spring waves from any clicked cell.
- `registry/components/pendulum-wave.tsx`: Harmonic multi-bob pendulum wave with play/pause, reset, and reduced-motion equilibrium.
- `registry/components/scramble-text.tsx`: Kinetic cipher text decoding into target copy on hover, focus, or click.
- `registry/components/split-text-reveal.tsx`: Word-by-word staggered spring text reveal with replay control.
- `registry.json` & `public/r/*.json`: Added manifests for all 4 Wave 5 Physics & Text components (`101` validated registry items total).
- `tests/wave5-physics.test.tsx`: Added unit tests for all 4 Wave 5 Physics & Text components.

### Changed
- `lib/catalog.ts`, `lib/catalog-interactions.ts`, `components/shared/component-preview-card.tsx`, `components/studio/component-studio.tsx`, `components/site/catalogue-browser.tsx`: Added `"Physics"` category and all 4 Wave 5 components (`94` implemented components total) and wired live previews.
- `tests/homepage.test.tsx`, `tests/inventory.test.tsx`, `tests/phase213-bencho.test.tsx`, `tests/phase29-themes.test.tsx`, `tests/planes-shell.test.tsx`: Updated implemented component count assertions (`90` -> `94`, `5,452` theme/mode combinations).

## [0.30.0] — 2026-11-28 (Priority 4 — Wave 4 Carousels Batch 1)
### Added
- `registry/components/focus-scale-carousel.tsx`: Center-focused carousel scaling the active slide with arrow-key navigation.
- `registry/components/fan-carousel.tsx`: Radial-fanning card carousel rotating around a bottom pivot.
- `registry/components/ring-gallery.tsx`: Orbital circular gallery rotating selected nodes to the focal slot.
- `registry/components/parallax-carousel.tsx`: Multi-layer carousel offsetting foreground and backdrop layers per slide.
- `registry.json` & `public/r/*.json`: Added manifests for all 4 Wave 4 Carousels (`97` validated registry items total).
- `tests/wave4-carousels.test.tsx`: Added unit tests for all 4 Wave 4 Carousels.

### Changed
- `lib/catalog.ts`, `lib/catalog-interactions.ts`, `components/shared/component-preview-card.tsx`, `components/studio/component-studio.tsx`, `components/site/catalogue-browser.tsx`: Added `"Carousels"` category and all 4 Carousel components (`90` implemented components total) and wired live previews.
- `tests/homepage.test.tsx`, `tests/inventory.test.tsx`, `tests/phase213-bencho.test.tsx`, `tests/phase29-themes.test.tsx`, `tests/planes-shell.test.tsx`: Updated implemented component count assertions (`86` -> `90`, `5,220` theme/mode combinations).

## [0.29.0] — 2026-11-28 (Priority 4 — Wave 3 Media Batch 1)
### Added
- `registry/components/retro-music-player.tsx`: Tactile cassette-inspired player with track switching, spinning disc state, and visual level meters.
- `registry/components/album-cover.tsx`: Interactive vinyl sleeve with hover/focus/click disc slide-out.
- `registry/components/photo-stack.tsx`: Stacked photo deck with spring depth and click/arrow-key cycling.
- `registry/components/hover-reveal.tsx`: Editorial showcase list revealing contextual preview summaries on hover/focus.
- `registry.json` & `public/r/*.json`: Added manifests for all 4 Wave 3 Media components (`93` validated registry items total).
- `tests/wave3-media.test.tsx`: Added unit tests for all 4 Wave 3 Media components.

### Changed
- `lib/catalog.ts`, `lib/catalog-interactions.ts`, `components/shared/component-preview-card.tsx`, `components/studio/component-studio.tsx`, `components/site/catalogue-browser.tsx`: Added all 4 Media components (`86` implemented components total) and wired live previews.
- `tests/homepage.test.tsx`, `tests/inventory.test.tsx`, `tests/phase213-bencho.test.tsx`, `tests/phase29-themes.test.tsx`, `tests/planes-shell.test.tsx`: Updated implemented component count assertions (`82` -> `86`, `4,988` theme/mode combinations).

## [0.28.0] — 2026-11-28 (Priority 3 — 29 Theme Demo Websites at /themes/[themeId]/demo)
### Added
- `components/theme/theme-demo-website.tsx` & `app/themes/[themeId]/demo/page.tsx`: Created statically generated full-page theme demo websites for all 29 themes (`generateStaticParams` -> `29` routes), each wrapped in `<RenderJoyTheme>` with Light/Dark mode switching and live interactive specimens.

### Changed
- `components/theme/theme-studio.tsx`: Added `Open <Theme> Demo →` links on every theme card.

## [0.27.0] — 2026-11-28 (Priority 3 — Phase 7 Pro Infrastructure & Launch)
### Added
- `lib/pro/license.ts`: SHA-256 licence token hashing (`hashLicenseToken`), format validation (`rj_pro_<16-64>`), and `crypto.timingSafeEqual` verification (`verifyLicenseToken`) for `PRO_REGISTRY_SLUGS`.
- `app/api/pro/registry/[slug]/route.ts`: Authenticated `GET` route handler serving `@renderjoy-pro` manifests only with a valid Bearer token matching `RENDERJOY_PRO_TOKEN_HASHES`.
- `app/pricing/page.tsx` & `components/pro/license-manager.tsx`: Created `/pricing` page with Open Core / Pro Ecosystem tiers and interactive Pro licence token & `components.json` configurator.
- `docs/PRO_INFRASTRUCTURE_AND_MOR.md`: Documented India Merchant-of-Record onboarding & payouts (Paddle, Lemon Squeezy, Dodo Payments) and webhook provisioning architecture.
- `tests/phase7-pro.test.tsx`: Added tests for SHA-256 licence verification, `/api/pro/registry/[slug]` auth responses (`401`, `404`, `200`), and `PricingPage`.

### Changed
- `lib/pricing.ts`, `components/site/footer.tsx`, `components/ui/command-palette.tsx`: Updated tier counts/status (`89` registry items, `$149 / once` Pro Ecosystem) and linked `/pricing`.

## [0.26.0] — 2026-11-28 (Priority 3 — Phase 5 Remaining Pro Components Complete)
### Added
- `registry/components/advanced-upload-flow.tsx`: Multi-file upload queue with per-file SVG progress rings, retry recovery, and live-region status announcements.
- `registry/components/payment-success-flow.tsx`: Animated payment receipt reveal with replay control and copyable invoice ID.
- `registry/components/animated-charts.tsx`: Animated Bar, Donut, and Gauge SVG charts with accessible tabular view toggle.
- `registry/components/bento-dashboard-block.tsx`: Responsive SaaS telemetry bento block with 7D/30D/90D timeframe switching.
- `registry.json` & `public/r/*.json`: Added manifests for all 4 Phase 5 Pro components (`89` validated registry items total).
- `tests/phase5.test.tsx`: Added component tests for all 4 Phase 5 Pro components.

### Changed
- `lib/catalog.ts`, `lib/catalog-interactions.ts`, `components/shared/component-preview-card.tsx`, `components/studio/component-studio.tsx`, `components/site/catalogue-browser.tsx`: Marked all 4 Phase 5 items as `implemented` (`82` implemented components total) and wired live previews.
- `tests/homepage.test.tsx`, `tests/inventory.test.tsx`, `tests/phase213-bencho.test.tsx`, `tests/phase29-themes.test.tsx`, `tests/planes-shell.test.tsx`: Updated implemented component count assertions (`78` -> `82`, `4,756` theme/mode combinations).

## [0.25.0] — 2026-11-28 (Priority 2 — B5 Homepage & Progressive Brand Entrance)
### Changed
- `components/home/cinematic-hero.tsx`: Added non-blocking progressive staggered entrance (`0s`–`0.2s`, disabled under `prefers-reduced-motion`), wired `KineticBrandMark` into the hero centerpiece (`B5.4`, `B5.5`), and replaced the stale `45 Components` hero eyebrow count with derived `CATALOG_ITEMS` count (`78 Components`).
- `tests/homepage.test.tsx`: Added assertion verifying the derived `78 Components · 58 Theme Variants · Flow` hero eyebrow.

## [0.24.0] — 2026-11-28 (Priority 2 — B4 RenderJoy Flow UI Optimisation)
### Changed
- `components/flow/pipeline-orchestrator.tsx`: Added collapsible `NodePalette` (`PanelLeft`) and `NodeInspector` (`PanelRight`) toggles (`B4.5`), `Cmd/Ctrl+Z` & `Cmd/Ctrl+Shift+Z` / `Ctrl+Y` undo/redo shortcuts, reversible `Clear canvas` action, and quick-start `Load Document Pipeline` CTA in the empty canvas state while preserving `Simulated Execution Adapter` labelling (`B4.8`, `B4.9`).
- `tests/flow-orchestrator.test.tsx`: Added test verifying collapsible panel toggles, clear-canvas empty state, and undo restoration.

## [0.23.0] — 2026-11-28 (Priority 2 — B3 Motion Lab Physics Tuner & Recipe Export)
### Changed
- `app/motion/page.tsx`: Upgraded `/motion` with a real **Spring & Stagger Tuner** (`stiffness`, `damping`, `mass`, `staggerMs`, plus `snappy`/`smooth`/`elastic`/`gentle` presets from `MOTION_SPRINGS`) that drives the live `Transitions` stagger specimen, paired with a dynamic **Live Motion Recipe Export** (`motion/react` + `CopyButton`) and `Reduced Motion` fallback (`B3.1`–`B3.5`).
- `tests/phase4.test.tsx`: Added test verifying spring preset switching, live `stiffness` tuning, and dynamic recipe code export updates.

## [0.22.0] — 2026-11-28 (Priority 2 — B2 Bench Full-Canvas Experimentation Workspace)
### Added
- `components/bench/bench-workspace.tsx` & `app/bench/page.tsx`: Created the full-viewport **Bench** (`/bench`) experimentation workspace (distinct from `InfinityCanvas`) with dot-grid pan/zoom/fit/reset, keyboard shortcuts (`+`/`-`/`0`/arrows/`Delete`), grid snap, minimap overview, live specimen drag/resize, searchable 78-component Add Specimen picker, per-specimen `<RenderJoyTheme>` Light/Dark + 29-theme Inspector, `Duplicate`/`Remove`/`Replay All`/`Export JSON`, `localStorage` persistence (`renderjoy-bench-board-v1`), and a clean mobile stack fallback.
- `tests/bench.test.tsx`: Added tests for Bench specimen rendering, zoom/fit, add/duplicate/remove, per-specimen theme/mode scoping, and `localStorage` persistence.

### Changed
- `components/site/app-shell.tsx`: Treated `/bench` as a full-canvas workspace omitting `Footer` and `FloatingToolbar` (while preserving `NavigationToggle`, `BrandFloatingButton`, `EditorialSidebar`, and `CommandPalette`).
- `components/shell/editorial-sidebar.tsx`, `components/ui/command-palette.tsx`, `components/site/footer.tsx`: Added `/bench` navigation entries.

## [0.21.0] — 2026-11-28 (Priority 2 — B1 Sound Library Expansion: 56 Original UI Sounds)
### Added
- `lib/audio/sound-library.ts`: Created original 56-cue procedural Web Audio synthesis library across 8 categories (`Actions`, `Feedback`, `Navigation`, `Notifications`, `Selection`, `Movement`, `Progress`, `System`) with multi-step acoustic recipes, `playLibrarySound()`, and `getLibrarySnippet()`.
- `tests/phase4.test.tsx`: Added tests verifying all 56 library sounds across 8 categories synthesize and stop cleanly, category/search filtering works, and no autoplay occurs on mount.

### Changed
- `lib/audio/sound-engine.ts`: Exported `getSharedAudioContext()` and `registerActiveOscillator()` so `playLibrarySound()` shares the global `AudioContext` and `stopAllSounds()` lifecycle.
- `app/sounds/page.tsx`: Added the `56 Original UI Sounds` library section with category pills, search input, pitch multiplier slider (`0.75×`–`1.35×`), audition buttons, and `CopyButton` API snippets.

## [0.20.0] — 2026-11-28 (Priority 1 — Kinetic Brand Mark & Halftone Editorial Footer A4.1–A4.6, A5.1–A5.4)
### Added
- `components/brand/kinetic-brand-mark.tsx`: Added `KineticBrandMark` wrapping the single-source `RenderJoyMark` SVG with bounded cursor-responsive parallax, click pulse + lightweight radial impact wave, `prefers-reduced-motion` gating, and opt-in Web Audio feedback via `playSoundEffect` (`A4.3`–`A4.6`).
- `tests/planes-shell.test.tsx`: Added unit tests for `KineticBrandMark` click impact wave / sound gating and `Footer` grouped columns, contact link, and halftone dot-field artwork.

### Changed
- `components/shell/editorial-sidebar.tsx`: Removed the remaining black icon container around `RenderJoyMark` and wired `KineticBrandMark` directly (`A4.1`, `A4.2`).
- `components/shell/brand-floating-button.tsx`, `components/shell/floating-toolbar.tsx`, `components/site/navbar.tsx`: Wired `KineticBrandMark` across all interactive navigation and floating brand controls (`A4.3`–`A4.6`).
- `components/site/footer.tsx`: Refined editorial footer with left-aligned RenderJoy identity, grouped 3-column navigation (`Explore`, `Labs`, `Connect`), `hello@renderjoy.dev` contact link, Light/Dark `--ws-*` adaptation, focus-visible rings, and a lower-edge halftone dot-field artwork (`A5.1`–`A5.4`).

## [0.19.0] — 2026-11-28 (Priority 1 — Separate Discoverable WebGL Background Components A3.1–A3.4)
### Added
- `registry/components/backgrounds/*.tsx`: Added 18 standalone WebGL background components (`logo-flare`, `silk`, `liquid-gold`, `contour`, `mercury`, `pastel`, `aurora`, `flow`, `noise`, `liquid-drops`, `ripple`, `energy`, `fluted-glass`, `topography`, `prism`, `kinetic-torus`, `particle-helix`, `bio-terrain`) powered by the shared `@/lib/shaders` engine (`A3.2`, `A3.3`).
- `registry.json` & `public/r/*.json`: Added individual installation manifests for all 18 WebGL background components (`85` validated registry items total).
- `lib/catalog.ts` & `lib/catalog-interactions.ts`: Registered all 18 WebGL backgrounds as separate discoverable `Backgrounds` items with dedicated `/components/<slug>` routes, `useCases`, interaction tags, and effect-specific props (`78` implemented components total).
- `tests/shader-background.test.tsx`: Added tests verifying all 18 standalone WebGL catalog entries, standalone component rendering, and `ComponentStudio` rendering without the generic 18-preset selector.

### Changed
- `components/site/catalogue-browser.tsx`: Removed the `shader-background` preset-expansion loop so each WebGL effect renders as its own first-class catalog card linking to `/components/<slug>`.
- `components/studio/component-studio.tsx`: Wired all 18 standalone WebGL slugs to full-bleed `PreviewStage`, `showPreviewText` toggle (`A3.1`), and effect-specific inspector controls without the generic 18-preset dropdown (`A3.4`).
- `components/shell/floating-toolbar.tsx` & `components/shared/component-preview-card.tsx`: Enabled Hide/Show Text (`A3.1`) and live preview rendering across all 18 standalone WebGL background slugs.
- `tests/homepage.test.tsx`, `tests/inventory.test.tsx`, `tests/phase213-bencho.test.tsx`, `tests/phase29-themes.test.tsx`, `tests/planes-shell.test.tsx`: Updated implemented component count assertions from `60` to `78` (`4,524` theme/mode combinations).

## [0.18.2] — 2026-11-28 (Priority 1 — Shared PreviewStage, FloatingToolbar & Floating Inspector)
### Added
- `components/preview/preview-stage.tsx`: Shared `PreviewStage` contract (`A1.2`) unifying dot-grid canvas, `MobileDeviceFrame`, `TabletPreviewFrame`, `<RenderJoyTheme>` scoping, and glossy bottom canvas fade across `ComponentStudio` and `ThemeStudio`.
- `components/site/providers.tsx`: Added `inspectorOpen`, `replayKey`/`triggerReplay`, `resetKey`/`triggerReset`, and `showPreviewText` state.

### Changed
- `components/shell/floating-toolbar.tsx`: Compact (~30% reduced) frosted-glass toolbar with Home logomark button (`RenderJoyMark` only), tooltips on all actions, Inspect toggle, distinct Replay vs Reset controls, Hide/Show Text toggle for background previews, and independent Global Website Appearance vs Component Preview Mode/Theme controls (`A2.1`–`A2.11`).
- `components/studio/component-studio.tsx`: Switched stage to `PreviewStage`, moved Inspector to a compact floating right-side panel (`xl:fixed xl:top-24 xl:right-5`) so controls stay visible alongside the preview (`A2.5`, `A2.16`), moved `item.description` from the preview header down to `ComponentDocs` (`A2.12`), and wired `showPreviewText` (`A2.11`).
- `components/theme/theme-studio.tsx`: Migrated Theme Studio preview stage to shared `PreviewStage` (`A1.2`).
- `components/documentation/component-docs.tsx`: Added `item.description` at top of docs (`A2.12`).

## [0.18.1] — 2026-11-28 (Mandatory Changelog Rule)
### Added
- `AGENTS.md`: Added mandatory rule requiring `CHANGELOG.md` to be updated on every change (Added, Changed, Refactored, Fixed, or Removed).

## [0.18.0] — 2026-11-28 (Roadmap Reconciliation & Phase A0/A1 Foundation)
### Added
- `ROADMAP_RECONCILIATION.md`: Full reconciliation between root `ROADMAP.md`, `RENDERJOY_AGENT_ROADMAP.md`, and `RENDERJOY_REFERENCE_RESEARCH.md` with Priority 1–4 execution hierarchy (`ADR-014`).
- `PHASE_A_UI_AUDIT.md`: Complete `A0.1`–`A0.4` route, shell, preview, performance, and inventory audit (`60` implemented components, `67` registry items, `75` static routes).

### Changed
- Reconciled `ROADMAP.md` as the single source of truth and synchronized `RENDERJOY_AGENT_ROADMAP.md` as the implementation playbook.
- Fixed stale hardcoded `44` counts in `components/shell/announcement-bar.tsx` and `app/page.tsx` to derive from `CATALOG_ITEMS`.
- Updated `VisibilityPreview`, `CatalogueBrowser`, `BrandFloatingButton`, `ComponentDocs`, and `ComponentStudio` (`A1.1`, `A1.3`–`A1.5`, `A2.14`–`A2.15`).

## [0.17.0] — 2026-11-26 (Shader Background — Raw WebGL Flagship Component)
### Added
- `registry/components/shader-background.tsx`: Raw WebGL generative canvas component (`ShaderBackground`, `SHADER_PRESETS`) with 6 presets (`silk`, `aurora`, `mercury`, `flow`, `noise`, `energy`), pointer/scroll uniforms, DPR capping (`quality` + `maxDpr`), `IntersectionObserver` offscreen pause, `visibilitychange` hidden-tab pause, `prefers-reduced-motion` static frame mode, WebGL resource cleanup, and CSS radial-gradient fallback.
- Added `"Backgrounds"` category and `shader-background` entry to `lib/catalog.ts`, `lib/catalog-interactions.ts`, `registry.json`, and `public/r/shader-background.json` (`51` validated registry items; `45` implemented components).
- Integrated live preview (`components/shared/component-preview-card.tsx`) and full contextual studio controls (`components/studio/component-studio.tsx`: preset selector, 3-color palette pickers, speed, intensity, distortion, opacity, pointer toggle & strength, scroll toggle, quality DPR cap, background color).
- Added `tests/shader-background.test.tsx`.

## [0.16.0] — 2026-11-25 (Phase 2.13 — Bencho-Inspired Interactive Component Experience)
### Added
- `docs/research/BENCHO_UI_RESEARCH.md` recording live audit findings from `bencho.dev` and RenderJoy adaptation decisions.
- `lib/catalog-interactions.ts` defining `InteractionType`, `ComponentCapabilities`, and verified capability metadata for all 44 implemented components.
- `components/shared/visibility-preview.tsx` (`IntersectionObserver` lazy preview mounting for catalogue & exhibition cards).
- `components/studio/comparison-workbench.tsx` shared side-by-side `<RenderJoyTheme>` comparison workbench embedded in Component Studio and Theme Studio.
- `tests/phase213-bencho.test.tsx` testing interaction taxonomy, live inspector tuning, Code/Compare tabs, and ThemeStudio comparison isolation.

### Changed
- **Component Catalogue** (`/components`, `components/site/catalogue-browser.tsx`): Added `"Explore interactions."` discovery header, `New` filter, 12-gesture taxonomy filter bar, `VisibilityPreview` cards, and verified interaction badges.
- **Component Studio** (`/components/[slug]`, `components/studio/component-studio.tsx`): Added `Preview | Code | Compare` stage switcher, contextual right-side inspector controls (including `RippleButton` label/disabled, `PhysicalKnob` min/max/step/value, `SwipeCardDeck` count, `ThinkingLoader` interval), `Replay` / `Reset` / `Reduced Motion` simulation, and embedded `ComparisonWorkbench`.
- **Motion Lab & Theme Studio** (`app/motion/page.tsx`, `components/theme/theme-studio.tsx`, `components/site/exhibition-gallery.tsx`): Reorganized Motion Lab by interaction (`Hover`, `Drag`, `Press`, `Swipe`, `Scroll`, `Loading`, `Text`, `Transitions`), upgraded Theme Studio compare mode to `ComparisonWorkbench`, and added verified interaction tags to Homepage Exhibition.

## [0.15.0] — 2026-11-25 (Phase 2.12 — Editorial Brand Identity & Homepage Redesign)
### Added
- `BRAND_DIRECTION.md` documenting creative direction (Metalab × Marked.dev × Wix Studio × Original RenderJoy Identity) and 3 logomark concepts.
- `components/brand/renderjoy-logo.tsx` (`RenderJoyMark`, `RenderJoyWordmark`, `RenderJoyLogo`) featuring the bespoke **Kinetic M** two-ribbon SVG mark.
- `app/icon.svg` providing a matching `Kinetic M` SVG favicon.
- `components/home/themes-flow-split.tsx` combining the 29-theme / 58-expression live `RippleButton` demo and the simulated RenderJoy Flow DAG excerpt into a single split editorial section.

### Changed
- **Editorial Header** (`components/site/navbar.tsx`): Replaced floating pill navigation and starburst icon with a full-width editorial hairline bar (`RenderJoyLogo`, `Components`, `Themes`, `Flow`, `Docs`, `⌘K` Search, `Light`/`Dark`/`System` switcher, `Explore`), removing sound and component-theme controls from the homepage header.
- **Brand Mark Adoption** (`components/shell/editorial-sidebar.tsx`, `components/shell/brand-floating-button.tsx`): Replaced generic starburst SVG icons with `RenderJoyMark`.
- **Streamlined Homepage** (`app/page.tsx`, `components/home/cinematic-hero.tsx`, `components/site/exhibition-gallery.tsx`): Trimmed homepage to 6 editorial beats, tightened `CinematicHero` viewport alignment (`calc(100svh - 64px)`), and curated `ExhibitionGallery` to 5 varied interactive specimens.
- **Oversized Editorial Footer** (`components/site/footer.tsx`): Replaced 4-column SaaS link grid and dot-matrix `ParticleWordmark` with `"Make something memorable."`, oversized `Kinetic M` + `RenderJoy` typographic signature, restrained link row, and fine hairline dividers.
- Updated `tests/homepage.test.tsx`, `ROADMAP.md`, `DESIGN_SYSTEM.md`, and `DECISIONS.md`.

## [0.14.0] — 2026-11-25 (Phase 2.11 — Unified Application Shell & Workspace Redesign)
### Added
- `WorkspacePage` and `WorkspaceHeader` (`components/workspace/workspace-page.tsx`) unifying page headings, eyebrow labels, max-width, and spacing across `/motion`, `/sounds`, and `/flow`.
- Contextual modes in `FloatingToolbar` (`components/shell/floating-toolbar.tsx`): Sound Lab mode (`Sound: ON/OFF`, `Stop All`, Appearance) and Motion Lab mode (`@renderjoy/motion-reveal`, PromptMenu, DeviceFrames, Replay, Appearance).

### Changed
- **Unified `AppShell`** (`components/site/app-shell.tsx`): Removed `isWorkspaceRoute()` branching so `/components`, `/themes`, `/motion`, `/sounds`, and `/flow` share `AnnouncementBar`, `NavigationToggle`, `BrandFloatingButton`, `EditorialSidebar`, and `CommandPalette`. `/flow` keeps its dedicated editor toolbar without `FloatingToolbar` overlap.
- **Redesigned Motion Lab** (`app/motion/page.tsx`): Replaced legacy dashboard layout with `WorkspaceHeader`, category pills, prominent `DeviceFrames` + `<RenderJoyTheme>` central stage, `Replay`, `Reduced Motion` toggle, and spring presets.
- **Redesigned Sound Lab** (`app/sounds/page.tsx`): Replaced legacy dashboard cards with a dominant **Audition Studio** stage, animated waveform visualizer, 6 synthesis presets, volume slider, all 17 sound cues, progressive haptics, and `useSound()` snippet.
- **Updated `EditorialSidebar`** (`components/shell/editorial-sidebar.tsx`) and `tests/workspace.test.tsx`.

### Removed
- Removed legacy `components/workspace/workspace-shell.tsx` (permanent left icon rail and separate 56px workspace header).

## [0.13.0] — 2026-11-25 (Phase 2.10 — Cinematic Homepage & Brand Experience)
### Added
- **Cinematic Hero** (`components/home/cinematic-hero.tsx`, `components/home/sculptural-silk.tsx`): Hybrid Sculptural Silk + Living UI Components with 4-stage scroll progression (`useScroll`/`useTransform`), nested non-conflicting pointer parallax (`useMotionValue`/`useSpring`), `IntersectionObserver` + `document.hidden` canvas pause, static SVG fallback, mobile specimen strip, and `prefers-reduced-motion` support.
- **Homepage Storytelling Sections:** `CapabilityStrip` (`components/home/capability-strip.tsx`), `ThemeDifferentiator` (`components/home/theme-differentiator.tsx`), `MotionSoundShowcase` (`components/home/motion-sound-showcase.tsx`), `FlowShowcase` (`components/home/flow-showcase.tsx`), `DeveloperExperienceShowcase` (`components/home/developer-dx.tsx`), and `PricingSection` (`components/home/pricing-section.tsx` with user-configurable effort estimator).
- **Homepage test suite** (`tests/homepage.test.tsx`) and **`VISUAL_HOMEPAGE_QA.md`**.

### Changed
- Updated `ExhibitionGallery` (`components/site/exhibition-gallery.tsx`) to showcase 10 live implemented Signature, AI, and Controls components using `--ws-*` minimalist framing and `<RenderJoyTheme>`.
- Updated `Navbar` (`components/site/navbar.tsx`), `AnnouncementBar` (`components/shell/announcement-bar.tsx`), `FaqAccordion` (`components/site/faq-accordion.tsx`), `Footer` (`components/site/footer.tsx`), and `lib/pricing.ts` with accurate counts (`44` components, `50` registry items, `58` theme variants) and `--ws-*` tokens.

## [0.12.0] — 2026-11-25 (Focused Product Integration Sprint — Flow Orchestrator & Studio Consolidation)
### Added
- **Portable Flow UI Kit** (`registry/flow/`): `BaseNode` (`flow-base-node`), 9 POC-derived typed nodes (`flow-pipeline-nodes`: `InputNode`, `OutputNode`, `TextNode` with `{{ var }}` dynamic handles, `LLMNode`, `WebhookNode`, `HTTPRequestNode`, `JSONTransformNode`, `ConditionNode`, `MergeNode`), and `FlowCanvas` (`flow-canvas`) built on `@xyflow/react`. Registry expanded to **50** validated items.
- **Node Pipeline Orchestrator** (`/flow`, `components/flow/`): Dedicated top toolbar (presets, Undo/Redo, Validate DAG, Run/Stop, Export JSON), searchable left `NodePalette` (drag-and-drop + click-to-add), `@xyflow/react` canvas, right `NodeInspector`, and collapsible `ExecutionConsole` with a clearly labelled **Simulated Execution Adapter** + real **Kahn's DAG validator** (`lib/flow/dag.ts`, ported from POC `backend/main.py`).
- **Ruler-indexed `EditorialSidebar`**: Floating card with `30px` tick-mark track, top/bottom scroll fade mask, and active `aria-current="page"` indicator.
- **`ThemeStudio` DeviceFrames integration**: `/themes` active stage now uses shared `DesktopBrowserFrame`, `TabletPreviewFrame`, `MobileDeviceFrame`, and `FloatingToolbar` context.
- **Flow Orchestrator tests** (`tests/flow-orchestrator.test.tsx`): Covers Kahn's DAG validation, cycle detection, `{{ var }}` extraction, preset switching, node insertion, and simulated execution.

### Removed
- Removed standalone `/playground` route (`app/playground`, `components/playground`) and consolidated all previewing into `ComponentStudio` (`/components/[slug]`).
- Removed standalone `/canvas` product route (`app/canvas`, `components/canvas`); `InfinityCanvas` remains installable and documented at `/components/infinity-canvas`.

## [0.11.0] — 2026-11-25 (Phase 2.9 — Component-Level Design System Rebuild)
### Added
- **Dual-mode theme palettes** (`lib/themes/definitions/mode-palettes.ts`): all 29 themes now have art-directed `light` and `dark` `ThemeModeTokens` with distinct colors, shadows, and gradients — dark mode is deliberate, not mechanically inverted.
- **Component theme recipes** (`lib/themes/recipes.ts`): `ComponentThemeRecipes` maps all 29 themes to `buttonStyle`, `cardStyle`, `inputStyle`, `controlStyle`, `aiStyle`, and `mediaStyle` recipe tokens.
- **`<RenderJoyTheme>` scope wrapper** (`components/theme/theme-scope.tsx`): applies `--mm-*` vars as inline `style` attribute, sets `data-mm-scope`, `data-mm-theme`, `data-mm-mode`, `data-mm-button-style`, `data-mm-card-style`. Never touches `document.documentElement`. Supports nested scopes.
- **Rebuilt Theme Studio** (`components/theme/theme-studio.tsx`): 29 theme cards each with live Light and Dark specimens, compare mode (active theme light/dark + 6 contrasting families), search, 5-category filter, component selector dropdown.
- **Rebuilt Playground shell** (`components/playground/playground-shell.tsx`): three-region layout — collapsible left category nav (240px), central `ComponentStudio`, mobile `Drawer` for nav.
- **`themeMode` / `setThemeMode`** exposed from `useRenderJoy()` context (`components/site/providers.tsx`).
- **29 visual theme research docs** (`docs/theme-research/01-minimalism.md` → `29-wabi-sabi.md`) + `docs/THEME_DESIGN_RESEARCH.md` 29-row summary table.
- **Component-specific use cases**: `useCases?: UseCase[]` field added to `CatalogItem` interface; all 44 implemented components now have 2 curated use case entries; `ComponentDocs` renders them under a "Use cases" heading (matches Planes component detail layout).
- **Phase 2.9 test suite** (`tests/phase29-themes.test.tsx`): 5 tests covering 2,552-combination smoke render, nested scope isolation, ThemeStudio search/filter/compare, PlaygroundShell navigation — all pass in 4.3s.

### Changed
- `applyThemeToDocument()` (`lib/themes/theme-utils.ts`) stubbed to no-op — component themes are exclusively scoped via `<RenderJoyTheme>` and never injected into the document root.
- `lib/themes/types.ts` extended with `ComponentThemeMode`, `ThemeColorTokens`, `ThemeModeTokens`, `ComponentThemeRecipes`; `ThemeDefinition` gains `modes` and `recipes`; `BaseThemeDefinition` added for backward compat.
- `lib/themes/registry.ts` `enrichTheme()` function merges `BaseThemeDefinition` + modes + recipes; `QUICK_THEMES` updated to `[minimalism, neo-brutalism, scrapbook, blueprint, cyberpunk, victorian]`.
- `ComponentStudio` preview stage wrapped in `<RenderJoyTheme theme mode padded>` for all 3 device frames; Light/Dark toggle buttons added next to theme selector.
- `app/globals.css` Phase 2.9 recipe CSS block added (`.mm-theme-scope`, `[data-mm-button-style]`, `[data-mm-card-style]`).
- `/themes` route now uses main application chrome (not `WorkspaceShell`).
- `tests/components.test.tsx` `ComponentDetailWorkbench` test updated: checks `aria-pressed` on theme button instead of `data-theme` on `documentElement`.

### Fixed
- Scope isolation: `--mm-bg` confirmed empty on `documentElement` after all 2,552 theme/mode combinations.
- `core-themes.ts` and `expressive-themes.ts` array types changed to `BaseThemeDefinition[]` to match enrichment pattern.

## [0.10.0] — 2026-11-25 (Phase 2.8 — Planes-Inspired Final UI Alignment)
### Changed
- Set Light mode (`#FFFFFF`) as the primary default appearance with full Dark mode (`#050506`) inversion and `#DFFF00` brand accent, while preserving crisp `--ws-preview-bg` contrast for component previews.
- Added shared Planes-inspired shell (`AnnouncementBar`, `NavigationToggle`, `BrandFloatingButton`, `EditorialSidebar` with horizontal-line markers and hover preview cards, `FloatingToolbar`, `PromptMenu`, `CommandPalette`).
- Unified `/components/[slug]` and `/playground` onto the shared `ComponentStudio`, `FloatingToolbar`, `DesktopBrowserFrame`, `TabletPreviewFrame`, `MobileDeviceFrame`, and `ComponentDocs` architecture.
- Added Category Folder overview mode in `CatalogueBrowser` and spatial `/canvas` Infinity Canvas gallery.
- Verified in headless Google Chrome via `playwright-core` across `1440×900`, `1280×800`, `768×1024`, and `390×844` (`77/77` Vitest tests, `tsc --noEmit`, `registry:validate`, `next build` passing).

## [0.9.0] — 2026-11-25 (Wave 2B — Advanced Interactions & Physics-Inspired Controls)
### Added
- Implemented all 12 Wave 2B Advanced Interactions (`card-stack`, `detent-drawer`, `notch`, `physical-knob`, `reaction-arc`, `receipt-printer`, `rubber-band-select`, `morphing-tray`, `keyboard`, `infinity-canvas`, `scratch-card`, `halftone-popover`).
- Built and validated **47 registry items** in `public/r/` (`44` available components + `sound-engine`, `ai-types`, `motion-reveal`) and verified consumer installation (`tsc --noEmit` + `next build`) in `/tmp/renderjoy-consumer-test`.
- Added `tests/wave2b-controls.test.tsx` (13 tests covering interactions, keyboard shortcuts, Escape handling, and 29-theme compatibility; 69/69 total tests passing across 8 test files).

## [0.8.0] — 2026-11-25 (Wave 2A — Essential Controls)
### Added
- Implemented all 9 Batch 2A Essential Controls (`segmented-control`, `number-stepper`, `glow-input`, `email-capture`, `date-picker`, `animated-select`, `otp-input`, `multi-select`, `cookie-consent`).
- Built and validated **35 registry items** in `public/r/` and verified installation in `/tmp/renderjoy-consumer-test`.
- Added `tests/wave2a-controls.test.tsx` (10 tests covering keyboard, validation, boundaries, paste, and 29-theme compatibility; 55/55 total tests passing).

## [0.7.0] — 2026-11-25 (Wave 1 — AI Component System)
### Added
- Created `COMPONENT_BUILD_PLAN.md` mapping the full 200+ item catalogue across Waves 1–8.
- Implemented all 11 Wave 1 AI UI primitives (`ai-prompt-composer`, `streaming-message`, `tool-call-card`, `agent-plan`, `approval-card`, `inline-diff`, `reasoning-trace`, `ai-chat`, `image-generation`, `chat-orb`, `pixel-image-generation`) plus shared `@renderjoy/ai-types` (`lib/ai/types.ts`), reusing `ThinkingLoader`.
- Built and validated 26 registry items in `public/r/` and added `tests/wave1-ai.test.tsx` (10 tests, including 29-theme matrix).

## [0.6.0] — 2026-11-25 (Phase 4 — Motion Lab, Sound Lab & Interaction Engine)
### Added
- Built interactive **Motion Lab** (`/motion`), shared `MOTION_SPRINGS` / `createStaggerContainer` presets (`lib/motion/presets.ts`), and `MotionReveal` registry component (`registry/components/motion-reveal.tsx`).
- Upgraded **Sound Lab** (`/sounds`) with 17 Web Audio cues across UI Feedback, Status Feedback, and Transitions, 6 developer presets (`minimal`, `soft`, `playful`, `futuristic`, `mechanical`, `digital`), volume control, `stopAllSounds()`, and portable `useSound()` hook (`lib/audio/use-sound.ts`).
- Added progressive haptic presets (`triggerHapticPreset`) and browser capability diagnostics (`getAudioCapabilities`).
- Published `motion-reveal` and `use-sound` into `registry.json` (`14` registry items).

## [0.5.0] — 2026-11-25 (Phase 2.7 — Premium Website UI/UX Redesign)
### Added
- Separated Application Appearance (`dark` / `light` / `system` via `--ws-*` tokens) from the 29 Component Design Themes (`--mm-*`).
- Built `WorkspaceShell` (`components/workspace/workspace-shell.tsx`) with 56px header, breadcrumbs, collapsible left sidebar (`248px` / `68px`), and mobile drawer for `/components/[slug]`, `/playground`, `/themes`, `/sounds`, and `/flow`.
- Added global `CommandPalette` (`Cmd+K` / `Ctrl+K`) and accessible `ModalDialog` / `Drawer` primitives (`components/ui/overlay.tsx`).
- Upgraded `ComponentStudio` with dot-grid canvas, scoped 29-theme preview isolation, and responsive mobile inspector bottom sheet.

## [0.4.0] — 2026-11-25 (Phase 3 — Registry, Installation Engine & Developer Experience)
### Added
- Created authoritative `registry.json` and built 13 shadcn-compatible manifests in `public/r/` (`sound-engine` + 12 implemented free components) via `npx shadcn@latest build` (`v4.23.0`).
- Added `scripts/validate-registry.mjs` (`npm run registry:validate`) and `lib/registry-config.ts`.
- Verified end-to-end installation (`list`, `view`, `add`, idempotency, `tsc --noEmit`, `next build`) in a fresh external Next.js 16 + Tailwind v4 consumer app (`/tmp/renderjoy-consumer-test`).
- Added `/docs/installation`, `/playground`, `public/llms.txt`, `public/llms-full.txt`, and npm/pnpm/yarn/bun tabs in `ComponentStudio`.

## [0.3.0] — 2026-11-25 (Phase 2.6 — Immersive Homepage & Complete Catalogue Inventory)
### Added
- Built full-screen Silk Hero (`SilkBackdrop`), floating pill `Navbar`, and Canvas `ParticleWordmark` (pointer scatter + click shockwave + IntersectionObserver pause + reduced-motion fallback).
- Built asymmetric `ExhibitionGallery` showcasing all 12 implemented components, editorial storytelling sections, configurable `Pricing` preview (`lib/pricing.ts`), `FaqAccordion`, and signature `Footer`.
- Created extensible type-safe `FULL_INVENTORY` (`lib/inventory.ts`) covering 200+ roadmap items across 22 categories, with `Available Now (12)` and `Full Inventory` views in `CatalogueBrowser`.

## [0.2.0] — 2026-11-25 (Phase 2.5 — Visual Reinvention, 29 Themes & Signature Components)
### Added
- Implemented the **29-Theme Design System** (`lib/themes/registry.ts`, `lib/themes/theme-utils.ts`) with full colour, typography, geometry, surface depth, motion personality, and decorative texture tokens, plus a live 29-theme comparison gallery at `/themes` with `?theme=` URL sharing.
- Redesigned `/components/[slug]` into the **RenderJoy Component Studio** (`components/studio/component-studio.tsx`) with a floating left category rail, spacious central viewport canvas, collapsible live inspector, and floating bottom control dock.
- Upgraded `/components` into a curated Bento-proportioned gallery.
- Added 3 Signature Components: `swipe-card-deck`, `thinking-loader`, and `flip-card`.
- Upgraded `BounceDotsLoader` (rhythm presets) and `SoundToggle` (animated waveform indicator).
- Added 261-combination (9 × 29) automated theme matrix tests (`tests/theme-matrix.test.tsx`).

## [0.1.0] — 2026-11-25 (Foundation & First Vertical Slice)
### Added
- Completed Phase 2 Free Component Collection (9/9): implemented `wiggle-text`, `skeleton-shimmer`, and `dropzone`, and added `ProgressBar` to `progress-ring`.
- Decoupled registry components from `components/site/providers` via `lib/audio/feedback-store.ts`.
- Added visual clipboard error fallback and timer cleanup in `copy-button` and `ripple-button`.
- Expanded Vitest suite to 15 tests covering keyboard interactions, file validation, empty/error states, reduced motion, and all 4 skins.
- Initialized persistent project documentation (`AGENTS.md`, `PRODUCT.md`, `ROADMAP.md`, `ARCHITECTURE.md`, `COMPONENT_CATALOG.md`, `DESIGN_SYSTEM.md`, `TREND_RADAR.md`, `DECISIONS.md`).
- Conducted workspace audit and 2026 stack/competitor research.
- Scaffolded Next.js 16 App Router + TypeScript + Tailwind CSS v4 + Motion + Vitest.
- Implemented 4-skin semantic token system (`dark`, `bento`, `glass`, `neo-brutal`) and Web Audio + Haptics engine (off by default).
- Implemented 6 initial Free components (`ripple-button`, `jelly-button`, `copy-button`, `sound-toggle`, `bounce-dots-loader`, `progress-ring`).
- Built Homepage, searchable Component Catalogue, Component Detail pages with source view, Themes explorer, Sound Lab, Flow preview, and Docs.

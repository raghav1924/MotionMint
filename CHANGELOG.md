# CHANGELOG.md — MotionMint

## [0.16.0] — 2026-11-25 (Phase 2.13 — Bencho-Inspired Interactive Component Experience)
### Added
- `docs/research/BENCHO_UI_RESEARCH.md` recording live audit findings from `bencho.dev` and MotionMint adaptation decisions.
- `lib/catalog-interactions.ts` defining `InteractionType`, `ComponentCapabilities`, and verified capability metadata for all 44 implemented components.
- `components/shared/visibility-preview.tsx` (`IntersectionObserver` lazy preview mounting for catalogue & exhibition cards).
- `components/studio/comparison-workbench.tsx` shared side-by-side `<MotionMintTheme>` comparison workbench embedded in Component Studio and Theme Studio.
- `tests/phase213-bencho.test.tsx` testing interaction taxonomy, live inspector tuning, Code/Compare tabs, and ThemeStudio comparison isolation.

### Changed
- **Component Catalogue** (`/components`, `components/site/catalogue-browser.tsx`): Added `"Explore interactions."` discovery header, `New` filter, 12-gesture taxonomy filter bar, `VisibilityPreview` cards, and verified interaction badges.
- **Component Studio** (`/components/[slug]`, `components/studio/component-studio.tsx`): Added `Preview | Code | Compare` stage switcher, contextual right-side inspector controls (including `RippleButton` label/disabled, `PhysicalKnob` min/max/step/value, `SwipeCardDeck` count, `ThinkingLoader` interval), `Replay` / `Reset` / `Reduced Motion` simulation, and embedded `ComparisonWorkbench`.
- **Motion Lab & Theme Studio** (`app/motion/page.tsx`, `components/theme/theme-studio.tsx`, `components/site/exhibition-gallery.tsx`): Reorganized Motion Lab by interaction (`Hover`, `Drag`, `Press`, `Swipe`, `Scroll`, `Loading`, `Text`, `Transitions`), upgraded Theme Studio compare mode to `ComparisonWorkbench`, and added verified interaction tags to Homepage Exhibition.

## [0.15.0] — 2026-11-25 (Phase 2.12 — Editorial Brand Identity & Homepage Redesign)
### Added
- `BRAND_DIRECTION.md` documenting creative direction (Metalab × Marked.dev × Wix Studio × Original MotionMint Identity) and 3 logomark concepts.
- `components/brand/motionmint-logo.tsx` (`MotionMintMark`, `MotionMintWordmark`, `MotionMintLogo`) featuring the bespoke **Kinetic M** two-ribbon SVG mark.
- `app/icon.svg` providing a matching `Kinetic M` SVG favicon.
- `components/home/themes-flow-split.tsx` combining the 29-theme / 58-expression live `RippleButton` demo and the simulated MotionMint Flow DAG excerpt into a single split editorial section.

### Changed
- **Editorial Header** (`components/site/navbar.tsx`): Replaced floating pill navigation and starburst icon with a full-width editorial hairline bar (`MotionMintLogo`, `Components`, `Themes`, `Flow`, `Docs`, `⌘K` Search, `Light`/`Dark`/`System` switcher, `Explore`), removing sound and component-theme controls from the homepage header.
- **Brand Mark Adoption** (`components/shell/editorial-sidebar.tsx`, `components/shell/brand-floating-button.tsx`): Replaced generic starburst SVG icons with `MotionMintMark`.
- **Streamlined Homepage** (`app/page.tsx`, `components/home/cinematic-hero.tsx`, `components/site/exhibition-gallery.tsx`): Trimmed homepage to 6 editorial beats, tightened `CinematicHero` viewport alignment (`calc(100svh - 64px)`), and curated `ExhibitionGallery` to 5 varied interactive specimens.
- **Oversized Editorial Footer** (`components/site/footer.tsx`): Replaced 4-column SaaS link grid and dot-matrix `ParticleWordmark` with `"Make something memorable."`, oversized `Kinetic M` + `MotionMint` typographic signature, restrained link row, and fine hairline dividers.
- Updated `tests/homepage.test.tsx`, `ROADMAP.md`, `DESIGN_SYSTEM.md`, and `DECISIONS.md`.

## [0.14.0] — 2026-11-25 (Phase 2.11 — Unified Application Shell & Workspace Redesign)
### Added
- `WorkspacePage` and `WorkspaceHeader` (`components/workspace/workspace-page.tsx`) unifying page headings, eyebrow labels, max-width, and spacing across `/motion`, `/sounds`, and `/flow`.
- Contextual modes in `FloatingToolbar` (`components/shell/floating-toolbar.tsx`): Sound Lab mode (`Sound: ON/OFF`, `Stop All`, Appearance) and Motion Lab mode (`@motionmint/motion-reveal`, PromptMenu, DeviceFrames, Replay, Appearance).

### Changed
- **Unified `AppShell`** (`components/site/app-shell.tsx`): Removed `isWorkspaceRoute()` branching so `/components`, `/themes`, `/motion`, `/sounds`, and `/flow` share `AnnouncementBar`, `NavigationToggle`, `BrandFloatingButton`, `EditorialSidebar`, and `CommandPalette`. `/flow` keeps its dedicated editor toolbar without `FloatingToolbar` overlap.
- **Redesigned Motion Lab** (`app/motion/page.tsx`): Replaced legacy dashboard layout with `WorkspaceHeader`, category pills, prominent `DeviceFrames` + `<MotionMintTheme>` central stage, `Replay`, `Reduced Motion` toggle, and spring presets.
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
- Updated `ExhibitionGallery` (`components/site/exhibition-gallery.tsx`) to showcase 10 live implemented Signature, AI, and Controls components using `--ws-*` minimalist framing and `<MotionMintTheme>`.
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
- **`<MotionMintTheme>` scope wrapper** (`components/theme/theme-scope.tsx`): applies `--mm-*` vars as inline `style` attribute, sets `data-mm-scope`, `data-mm-theme`, `data-mm-mode`, `data-mm-button-style`, `data-mm-card-style`. Never touches `document.documentElement`. Supports nested scopes.
- **Rebuilt Theme Studio** (`components/theme/theme-studio.tsx`): 29 theme cards each with live Light and Dark specimens, compare mode (active theme light/dark + 6 contrasting families), search, 5-category filter, component selector dropdown.
- **Rebuilt Playground shell** (`components/playground/playground-shell.tsx`): three-region layout — collapsible left category nav (240px), central `ComponentStudio`, mobile `Drawer` for nav.
- **`themeMode` / `setThemeMode`** exposed from `useMotionMint()` context (`components/site/providers.tsx`).
- **29 visual theme research docs** (`docs/theme-research/01-minimalism.md` → `29-wabi-sabi.md`) + `docs/THEME_DESIGN_RESEARCH.md` 29-row summary table.
- **Component-specific use cases**: `useCases?: UseCase[]` field added to `CatalogItem` interface; all 44 implemented components now have 2 curated use case entries; `ComponentDocs` renders them under a "Use cases" heading (matches Planes component detail layout).
- **Phase 2.9 test suite** (`tests/phase29-themes.test.tsx`): 5 tests covering 2,552-combination smoke render, nested scope isolation, ThemeStudio search/filter/compare, PlaygroundShell navigation — all pass in 4.3s.

### Changed
- `applyThemeToDocument()` (`lib/themes/theme-utils.ts`) stubbed to no-op — component themes are exclusively scoped via `<MotionMintTheme>` and never injected into the document root.
- `lib/themes/types.ts` extended with `ComponentThemeMode`, `ThemeColorTokens`, `ThemeModeTokens`, `ComponentThemeRecipes`; `ThemeDefinition` gains `modes` and `recipes`; `BaseThemeDefinition` added for backward compat.
- `lib/themes/registry.ts` `enrichTheme()` function merges `BaseThemeDefinition` + modes + recipes; `QUICK_THEMES` updated to `[minimalism, neo-brutalism, scrapbook, blueprint, cyberpunk, victorian]`.
- `ComponentStudio` preview stage wrapped in `<MotionMintTheme theme mode padded>` for all 3 device frames; Light/Dark toggle buttons added next to theme selector.
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
- Built and validated **47 registry items** in `public/r/` (`44` available components + `sound-engine`, `ai-types`, `motion-reveal`) and verified consumer installation (`tsc --noEmit` + `next build`) in `/tmp/motionmint-consumer-test`.
- Added `tests/wave2b-controls.test.tsx` (13 tests covering interactions, keyboard shortcuts, Escape handling, and 29-theme compatibility; 69/69 total tests passing across 8 test files).

## [0.8.0] — 2026-11-25 (Wave 2A — Essential Controls)
### Added
- Implemented all 9 Batch 2A Essential Controls (`segmented-control`, `number-stepper`, `glow-input`, `email-capture`, `date-picker`, `animated-select`, `otp-input`, `multi-select`, `cookie-consent`).
- Built and validated **35 registry items** in `public/r/` and verified installation in `/tmp/motionmint-consumer-test`.
- Added `tests/wave2a-controls.test.tsx` (10 tests covering keyboard, validation, boundaries, paste, and 29-theme compatibility; 55/55 total tests passing).

## [0.7.0] — 2026-11-25 (Wave 1 — AI Component System)
### Added
- Created `COMPONENT_BUILD_PLAN.md` mapping the full 200+ item catalogue across Waves 1–8.
- Implemented all 11 Wave 1 AI UI primitives (`ai-prompt-composer`, `streaming-message`, `tool-call-card`, `agent-plan`, `approval-card`, `inline-diff`, `reasoning-trace`, `ai-chat`, `image-generation`, `chat-orb`, `pixel-image-generation`) plus shared `@motionmint/ai-types` (`lib/ai/types.ts`), reusing `ThinkingLoader`.
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
- Verified end-to-end installation (`list`, `view`, `add`, idempotency, `tsc --noEmit`, `next build`) in a fresh external Next.js 16 + Tailwind v4 consumer app (`/tmp/motionmint-consumer-test`).
- Added `/docs/installation`, `/playground`, `public/llms.txt`, `public/llms-full.txt`, and npm/pnpm/yarn/bun tabs in `ComponentStudio`.

## [0.3.0] — 2026-11-25 (Phase 2.6 — Immersive Homepage & Complete Catalogue Inventory)
### Added
- Built full-screen Silk Hero (`SilkBackdrop`), floating pill `Navbar`, and Canvas `ParticleWordmark` (pointer scatter + click shockwave + IntersectionObserver pause + reduced-motion fallback).
- Built asymmetric `ExhibitionGallery` showcasing all 12 implemented components, editorial storytelling sections, configurable `Pricing` preview (`lib/pricing.ts`), `FaqAccordion`, and signature `Footer`.
- Created extensible type-safe `FULL_INVENTORY` (`lib/inventory.ts`) covering 200+ roadmap items across 22 categories, with `Available Now (12)` and `Full Inventory` views in `CatalogueBrowser`.

## [0.2.0] — 2026-11-25 (Phase 2.5 — Visual Reinvention, 29 Themes & Signature Components)
### Added
- Implemented the **29-Theme Design System** (`lib/themes/registry.ts`, `lib/themes/theme-utils.ts`) with full colour, typography, geometry, surface depth, motion personality, and decorative texture tokens, plus a live 29-theme comparison gallery at `/themes` with `?theme=` URL sharing.
- Redesigned `/components/[slug]` into the **MotionMint Component Studio** (`components/studio/component-studio.tsx`) with a floating left category rail, spacious central viewport canvas, collapsible live inspector, and floating bottom control dock.
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

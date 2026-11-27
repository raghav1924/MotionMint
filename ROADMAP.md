# ROADMAP.md — RenderJoy

*Last updated: 2026-11-25*

## Phase 0 — Audit & Foundation `[IN PROGRESS]`
- [x] Workspace audit (confirmed clean greenfield directory)
- [~] Node Pipeline Orchestrator prototype audit *(Google Drive link inaccessible from sandbox; awaiting local archive/folder from user for Phase 6)*
- [x] Current stack & competitor research (`TREND_RADAR.md`)
- [x] Core project documentation (`AGENTS.md`, `PRODUCT.md`, `ROADMAP.md`, `ARCHITECTURE.md`, `COMPONENT_CATALOG.md`, `DESIGN_SYSTEM.md`, `TREND_RADAR.md`, `DECISIONS.md`, `CHANGELOG.md`)

## Phase 1 — Website & Design Foundation `[COMPLETE]`
- [x] Scaffold Next.js 16 App Router + TypeScript + Tailwind CSS v4 + `motion`
- [x] Centralised branding (`lib/brand.ts`) & token-driven 4-skin system (`dark`, `bento`, `glass`, `neo-brutal`)
- [x] Shared sound & haptic abstraction (`lib/audio/`) — off by default, Web Audio synth + haptic fallback
- [x] Responsive site shell (navbar with mobile drawer, global skin switcher + global sound toggle, footer)
- [x] Interaction-first Homepage (hero, live component demo, skin switcher, bento showcase, catalogue preview, install demo, Free/Pro overview)
- [x] Component Catalogue (`/components`) with search, category, tier, and skin filters
- [x] Component Detail Page (`/components/[slug]`) with live preview, skin switcher, prop controls, props/API table, package-manager install tabs, and source view

## Phase 2 — First Free Component Collection (9 Components) `[COMPLETE — 9/9]`
- [x] `bounce-dots-loader` (Free)
- [x] `wiggle-text` (Free)
- [x] `jelly-button` (Free)
- [x] `ripple-button` (Free)
- [x] `copy-button` (Free)
- [x] `sound-toggle` (Free)
- [x] `progress-ring` & bar (Free)
- [x] `skeleton-shimmer` (Free)
- [x] `dropzone` (Free)
- *Every component has a live preview, source view, docs, accessibility notes, and passing unit/component tests.*

## Phase 2.5 — Visual Reinvention & Signature Component System `[COMPLETE]`
- [x] Visual & architecture audit of Phase 2 baseline
- [x] **RenderJoy Component Studio** (`/components/[slug]`): floating left category rail, spacious central viewport canvas, collapsible live inspector, floating bottom dock (CLI, Prompt, Code, Viewport, Reset, Fullscreen, 29-Theme selector, Sound)
- [x] **Curated Visual Gallery** (`/components`): Bento-proportioned gallery grid highlighting Signature experiences
- [x] **29-Theme Design System** (`lib/themes/`): all 29 named themes with colour, typography, geometry, surface depth, motion personality, and decorative textures + `/themes` live comparison gallery with shareable `?theme=` URLs
- [x] Upgraded existing 9 components (`BounceDotsLoader` rhythm presets, `SoundToggle` waveform indicator, full 29-theme token consumption)
- [x] First 3 Signature Components: `swipe-card-deck`, `thinking-loader`, `flip-card`
- [x] Automated 261-combination (9 × 29) theme matrix tests passing

## Phase 2.6 — Immersive Homepage & Complete Catalogue Architecture `[COMPLETE]`
- [x] Full-screen Silk Hero (`SilkBackdrop`), floating pill navigation (`Navbar`), and interactive `ParticleWordmark`
- [x] Asymmetric Component Exhibition (`ExhibitionGallery`) with scroll-driven reveals
- [x] Editorial storytelling, configurable Pricing Preview (`lib/pricing.ts`), FAQ accordion, and Signature Footer
- [x] Complete type-safe catalogue inventory (`lib/inventory.ts`, 200+ items across 22 categories) with `Available Now` vs `Full Inventory` views

## Phase 2.7 — Premium Website UI/UX Redesign `[COMPLETE]`
- [x] Separated Application Appearance (`dark` / `light` / `system` via `--ws-*` tokens) from the 29 Component Themes (`--mm-*`)
- [x] Developer Workspace Shell (`WorkspaceShell`): 56px header, breadcrumbs, collapsible sidebar (`248px` / `68px`), mobile drawer
- [x] Reusable `CommandPalette` (`Cmd+K` / `Ctrl+K`) and `ModalDialog` / `Drawer` overlay primitives
- [x] Upgraded `ComponentStudio` with dot-grid canvas, scoped 29-theme preview, and mobile inspector bottom sheet

## Phase 3 — Registry & Developer Experience `[COMPLETE]`
- [x] shadcn-compatible `registry.json` & `/public/r/*.json` build pipeline (`npm run registry:build` + `npm run registry:validate`)
- [x] Fresh-app `npx shadcn@latest add` installation test in `/tmp/renderjoy-consumer-test` (all 12 components + `@renderjoy/sound-engine` + CSS keyframes + idempotency + `tsc` + `next build`)
- [x] `public/llms.txt` & `public/llms-full.txt` agent-readable metadata + `/docs/installation`
- [x] Interactive Playground (`/playground`)

## Phase 4 — Motion & Sound Lab `[COMPLETE]`
- [x] `/motion` primitives showcase (6 interactive categories, 29-theme preview, reduced-motion simulator) & `lib/motion/presets.ts` + `MotionReveal`
- [x] `/sounds` interactive Sound Lab (17 synthesized cues across 3 groups, 6 developer presets, volume slider, Stop All, capability diagnostics) & portable `useSound()` hook
- [x] Haptic feature detection (`triggerHapticPreset`, iOS Safari fallback) & accessibility/reduced-motion audit
- [x] `motion-reveal` & `use-sound` added to `registry.json` and validated

## Full Catalogue Expansion — Wave 1: AI Component System `[COMPLETE — 12/12]`
- [x] `COMPONENT_BUILD_PLAN.md` created for Waves 1–8 (`200+` items)
- [x] Shared AI types (`lib/ai/types.ts` / `@renderjoy/ai-types`) + `ThinkingLoader` reused
- [x] Implemented, tested, and registry-published all 11 new AI components (`ai-prompt-composer`, `streaming-message`, `tool-call-card`, `agent-plan`, `approval-card`, `inline-diff`, `reasoning-trace`, `ai-chat`, `image-generation`, `chat-orb`, `pixel-image-generation`)

## Full Catalogue Expansion — Wave 2A: Essential Controls `[COMPLETE — 9/9]`
- [x] Implemented, tested, and registry-published all 9 Essential Controls (`segmented-control`, `number-stepper`, `glow-input`, `email-capture`, `date-picker`, `animated-select`, `otp-input`, `multi-select`, `cookie-consent`)

## Full Catalogue Expansion — Wave 2B: Advanced Interactions `[COMPLETE — 12/12]`
- [x] Implemented, tested, and registry-published all 12 Advanced Interactions & Physics-Inspired Controls (`card-stack`, `detent-drawer`, `notch`, `physical-knob`, `reaction-arc`, `receipt-printer`, `rubber-band-select`, `morphing-tray`, `keyboard`, `infinity-canvas`, `scratch-card`, `halftone-popover`)

## Phase 2.8 — Final UI Alignment (Planes-Inspired Visual & Device System) `[COMPLETE]`
- [x] Light-first (`#FFFFFF`) & inverted Dark (`#050506`) `--ws-*` appearance tokens independent from the 29 `--mm-*` component themes (`--ws-preview-bg` preserved crisp for legibility)
- [x] Persistent `AnnouncementBar` (wavy SVG lower edge), `NavigationToggle`, `BrandFloatingButton`, `EditorialSidebar` (horizontal-line markers + hover preview), `FloatingToolbar`, `PromptMenu`, and `CommandPalette`
- [x] Shared `DesktopBrowserFrame`, `TabletPreviewFrame`, `MobileDeviceFrame`, and `ComponentDocs` across both `/components/[slug]` and `/playground`
- [x] `/canvas` Infinity Canvas spatial gallery & Category Folder view in `/components`
- [x] Verified in headless Google Chrome via `playwright-core` at `1440×900`, `1280×800`, `768×1024`, and `390×844` (Wave 3+ remains paused per Phase 2.8)
- [ ] Wave 3 (Media), Wave 4 (Carousels), Wave 5 (Physics & Text), Wave 6 (WebGL & Voxel), Wave 7 (Sections & Blocks), Wave 8 (Docs)

## Phase 2.9 — Component-Level Design System Rebuild `[COMPLETE]`
- [x] **Architectural isolation:** `applyThemeToDocument()` stubbed to no-op — component themes NEVER touch `document.documentElement`
- [x] **Dual-mode palettes:** `lib/themes/definitions/mode-palettes.ts` — all 29 themes with art-directed `light` & `dark` `ThemeModeTokens` (distinct colors, shadows, gradients per mode)
- [x] **Recipe system:** `lib/themes/recipes.ts` — `ComponentThemeRecipes` (buttonStyle, cardStyle, inputStyle, controlStyle, aiStyle, mediaStyle) for all 29 themes
- [x] **Scope isolation:** `components/theme/theme-scope.tsx` — `<RenderJoyTheme theme mode>` wrapper applies `--mm-*` vars as inline `style`, never to `documentElement`
- [x] **Rebuilt Theme Studio** (`/themes`): 29 theme cards each with live Light & Dark specimens, compare mode, search, 5-category filter
- [x] **Rebuilt Playground** (`/playground`): collapsible left category nav, central `ComponentStudio`, mobile drawer
- [x] **Provider update:** `themeMode` / `setThemeMode` exposed from `useRenderJoy()`; `setTheme` alias preserved
- [x] **Component-specific use cases:** `useCases` field added to `CatalogItem` interface; all 44 implemented components have 2 use cases each; `ComponentDocs` renders them with section heading
- [x] **29 visual research docs** (`docs/theme-research/01-minimalism.md` → `29-wabi-sabi.md`) + `docs/THEME_DESIGN_RESEARCH.md` summary table
- [x] **Automated smoke test:** 44 components × 29 themes × 2 modes = 2,552 combinations verified in `tests/phase29-themes.test.tsx`
- [x] **Scope isolation test:** Verifies `--mm-bg` stays empty on `documentElement` after theme switches
- [x] All 82 tests pass; `npm run typecheck` exit 0; `npm run registry:validate` ✅ 47 items; `npm run build` exit 0

## Phase 2.10 — Cinematic Homepage & Premium Brand Experience `[COMPLETE]`
- [x] **Cinematic Hero** (`components/home/cinematic-hero.tsx`): Architectural dot-matrix stage, sculptural central RenderJoy mark, pointer parallax, and spatial orbiting live specimens (`ThinkingLoader`, `PhysicalKnob`, `Flow` mini-pipeline, `ProgressRing` + `RippleButton`), with mobile & `prefers-reduced-motion` fallbacks
- [x] **Verified Capability Strip** (`components/home/capability-strip.tsx`): React 19, TypeScript, Tailwind CSS v4, Motion, 50-item shadcn-compatible registry, `llms.txt` discovery, Web Audio API
- [x] **Asymmetric Product Exhibition** (`components/site/exhibition-gallery.tsx`): 10 live implemented components across Signature, AI, and Controls collections
- [x] **58-Variant Theme Differentiator** (`components/home/theme-differentiator.tsx`): Live `RippleButton` inside `<RenderJoyTheme>` across 7 signature patterns × Light/Dark without touching global chrome
- [x] **Motion & Sound Showcase** (`components/home/motion-sound-showcase.tsx`): Spring preset switcher + opt-in `SoundToggle` & Web Audio / haptic audition (off by default)
- [x] **RenderJoy Flow Showcase** (`components/home/flow-showcase.tsx`): Live excerpt of `Document Verification Pipeline` with Kahn's DAG badge & clearly labelled simulated execution
- [x] **Developer DX, Pricing Preview & 2-Column FAQ** (`components/home/developer-dx.tsx`, `components/home/pricing-section.tsx`, `components/site/faq-accordion.tsx`, `components/site/footer.tsx`)
- [x] Wave 3+ component waves remain paused per Phase 2.10

## Phase 2.11 — Unified Application Shell & Workspace Redesign `[COMPLETE]`
- [x] **Removed Legacy `WorkspaceShell`:** Eliminated `isWorkspaceRoute()` branching and `components/workspace/workspace-shell.tsx`; all 5 experiences (`/components/[slug]`, `/themes`, `/motion`, `/sounds`, `/flow`) share one `AppShell` (`AnnouncementBar`, `NavigationToggle`, `BrandFloatingButton`, `EditorialSidebar`, `CommandPalette`).
- [x] **Shared Workspace Primitives:** Created `WorkspacePage` & `WorkspaceHeader` (`components/workspace/workspace-page.tsx`) for consistent typography, spacing, and headers across `/motion`, `/sounds`, and `/flow`.
- [x] **Contextual `FloatingToolbar` Modes:** Added route-aware modes (`component`, `themes`, `motion`, `sounds`, `default`) — Sound Lab displays `Sound: ON/OFF` & `Stop All`; `/flow` omits `FloatingToolbar` so its own node-editor toolbar & canvas remain unobstructed.
- [x] **Redesigned Motion Lab & Sound Lab:** Replaced dashboard cards on `/motion` and `/sounds` with prominent central stages, waveform visualizer, `<RenderJoyTheme>` scoped previews, and `DeviceFrames` viewport switching.
- [x] Wave 3+ component development remains paused.

## Backgrounds Category — Flagship Component `[COMPLETE]`
- [x] `shader-background` (`registry/components/shader-background.tsx`): Raw WebGL GPU-powered generative canvas with 6 presets (`silk`, `aurora`, `mercury`, `flow`, `noise`, `energy`), pointer/scroll reactivity, DPR capping, visibility pause, reduced-motion static frame, CSS gradient fallback, and full Component Studio integration (`51` registry items).

## Phase 2.13 — Bencho-Inspired Interactive Component Experience `[COMPLETE]`
- [x] Audited `bencho.dev` and documented findings in `docs/research/BENCHO_UI_RESEARCH.md`
- [x] Extended `CatalogItem` (`lib/catalog.ts`, `lib/catalog-interactions.ts`) with typed `InteractionType[]`, `interactionHint`, `livePreview`, `adjustable`, `comparisonSupported`, `soundSupported`, `motionSupported`, and `isNew`
- [x] Upgraded `/components` discovery lab with `"Explore interactions."`, `All / New / Free / Pro` filters, interaction taxonomy pills, and `VisibilityPreview` (`IntersectionObserver`) lazy mounting
- [x] Upgraded Component Studio (`/components/[slug]`) with `Preview | Code | Compare` stage tabs, contextual live property inspector, `Replay` / `Reset` / `Reduced Motion` / `Sound` controls, and embedded `ComparisonWorkbench`
- [x] Upgraded Motion Lab (`/motion`) to interaction-first categories, Theme Studio (`/themes`) to shared `ComparisonWorkbench`, and Homepage Exhibition (`ExhibitionGallery`) with verified interaction tags

## Phase 2.12 — Editorial Brand Identity & Homepage Redesign `[COMPLETE]`
- [x] Created `BRAND_DIRECTION.md`, bespoke `Kinetic M` SVG logomark & tracked wordmark (`components/brand/renderjoy-logo.tsx`), and SVG favicon (`app/icon.svg`)
- [x] Replaced generic starburst glyph across `Navbar`, `Footer`, `EditorialSidebar`, and `BrandFloatingButton`
- [x] Redesigned `Navbar` into a full-width editorial hairline header (`Components`, `Themes`, `Flow`, `Docs`, `⌘K` search, `Light`/`Dark`/`System` switcher, `Explore`)
- [x] Streamlined `app/page.tsx` to 6 editorial beats (`CinematicHero`, `CapabilityStrip`, 5-item `ExhibitionGallery`, split `ThemesFlowSplit`, compact Developer CTA, and oversized editorial `Footer`)

## Phase 5 — Premium Experiences (Pro Validation)
- [ ] Advanced upload flow (previews, progress, retry)
- [ ] Payment-success flow
- [ ] Cover-flow carousel
- [ ] Animated charts (gauge, donut, bars)
- [ ] Bento dashboard block

## Phase 6 — RenderJoy Flow & Node Pipeline Orchestrator `[COMPLETE — DEMO / SIMULATED ADAPTER]`
- [x] Inspected user-owned POC (`https://github.com/raghav1924/frontend_technical_assessment` — React Flow 11 + Zustand + 9 nodes + FastAPI Kahn's DAG `POST /pipelines/parse`)
- [x] Evaluated & integrated `@xyflow/react` (MIT, React 19 compatible)
- [x] Built portable Flow UI Kit (`registry/flow/`: `BaseNode`, 9 POC-derived `pipeline-nodes`, `FlowCanvas`) & registered `flow-base-node`, `flow-pipeline-nodes`, `flow-canvas` (`50` total registry items)
- [x] Built Node Pipeline Orchestrator at `/flow` with Top Toolbar (presets, Undo/Redo, Validate DAG, Run/Stop, Export JSON), Left Node Palette (drag-and-drop + click-to-add), Center `@xyflow/react` Canvas, Right Node Inspector, and Bottom Execution Console (clearly labelled **Simulated Execution Adapter**; real client-side Kahn's DAG validation)
- [x] Removed standalone `/playground` and `/canvas` product routes; retained `InfinityCanvas` as an installable component at `/components/infinity-canvas`

## Phase 7 — Pro Infrastructure & Launch
- [ ] Merchant-of-record research (verifying India onboarding & payouts)
- [ ] Authenticated Pro registry & hashed licence token verification
- [ ] Pricing, account/licence management, launch QA

## Phase 8 — Continuous Growth
- [ ] Additional skins from the 29-style catalogue (Blueprint, Cybercore, Neumorphism, etc.)
- [ ] Additional blocks, templates, and AI-agent tooling

## Future Phase — Full Theme Demo Websites *(Planned, Not Implemented)*
- [ ] Dynamic route architecture (`/themes/[themeId]/demo` with `generateStaticParams` for all 29 themes)
- [ ] Initial flagship demos (Scrapbook, Cyberpunk, Blueprint) wrapped in `<RenderJoyTheme>`
- [ ] Remaining 26 theme demo websites once Wave 3+ component collections are available
- [ ] Shareable `?mode=light|dark` demo URLs and back-to-Theme-Studio navigation

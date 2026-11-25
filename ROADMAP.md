# ROADMAP.md — MotionMint

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
- [x] **MotionMint Component Studio** (`/components/[slug]`): floating left category rail, spacious central viewport canvas, collapsible live inspector, floating bottom dock (CLI, Prompt, Code, Viewport, Reset, Fullscreen, 29-Theme selector, Sound)
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
- [x] Fresh-app `npx shadcn@latest add` installation test in `/tmp/motionmint-consumer-test` (all 12 components + `@motionmint/sound-engine` + CSS keyframes + idempotency + `tsc` + `next build`)
- [x] `public/llms.txt` & `public/llms-full.txt` agent-readable metadata + `/docs/installation`
- [x] Interactive Playground (`/playground`)

## Phase 4 — Motion & Sound Lab `[COMPLETE]`
- [x] `/motion` primitives showcase (6 interactive categories, 29-theme preview, reduced-motion simulator) & `lib/motion/presets.ts` + `MotionReveal`
- [x] `/sounds` interactive Sound Lab (17 synthesized cues across 3 groups, 6 developer presets, volume slider, Stop All, capability diagnostics) & portable `useSound()` hook
- [x] Haptic feature detection (`triggerHapticPreset`, iOS Safari fallback) & accessibility/reduced-motion audit
- [x] `motion-reveal` & `use-sound` added to `registry.json` and validated

## Full Catalogue Expansion — Wave 1: AI Component System `[COMPLETE — 12/12]`
- [x] `COMPONENT_BUILD_PLAN.md` created for Waves 1–8 (`200+` items)
- [x] Shared AI types (`lib/ai/types.ts` / `@motionmint/ai-types`) + `ThinkingLoader` reused
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

## Phase 5 — Premium Experiences (Pro Validation)
- [ ] Advanced upload flow (previews, progress, retry)
- [ ] Payment-success flow
- [ ] Cover-flow carousel
- [ ] Animated charts (gauge, donut, bars)
- [ ] Bento dashboard block

## Phase 6 — MotionMint Flow & Node Pipeline Orchestrator
- [ ] Inspect user-provided Node Pipeline Orchestrator source archive
- [ ] Evaluate & integrate `@xyflow/react`
- [ ] Build reusable Flow UI Kit (`registry/flow/`)
- [ ] Build Node Pipeline Orchestrator demo (`Document Upload → Extraction → Validation → Discrepancy Detection → Human Review → Structured Output`) with simulated execution adapter

## Phase 7 — Pro Infrastructure & Launch
- [ ] Merchant-of-record research (verifying India onboarding & payouts)
- [ ] Authenticated Pro registry & hashed licence token verification
- [ ] Pricing, account/licence management, launch QA

## Phase 8 — Continuous Growth
- [ ] Additional skins from the 29-style catalogue (Blueprint, Cybercore, Neumorphism, etc.)
- [ ] Additional blocks, templates, and AI-agent tooling

# VISUAL_HOMEPAGE_QA.md — MotionMint Phase 2.10

*Last updated: 2026-11-25*

## 1. Architecture & Responsive Verification Scope

The redesigned MotionMint homepage (`app/page.tsx` + `components/home/*` + `components/site/*`) was verified across:
- **Section 0 & 1:** `AnnouncementBar` (`30px` wavy ribbon) & minimalist `Navbar` (`--ws-*` tokens, Search `⌘K`, Light/Dark/System appearance, mobile drawer).
- **Section 2:** `CinematicHero` — calibrated dot-matrix stage, sculptural central SVG emblem, pointer-parallax orbiting live specimens on `lg+` (`ThinkingLoader`, `PhysicalKnob`, `Flow` mini-pipeline, `ProgressRing` + `RippleButton`), compact 2-card mobile specimen strip on `< lg`, and `prefers-reduced-motion` fallback.
- **Section 3:** `CapabilityStrip` — verified ecosystem labels (`React 19`, `TypeScript`, `Tailwind CSS v4`, `Motion for React`, `shadcn-compatible registry (50 items)`, `AI-agent llms.txt discovery`, `Web Audio API`).
- **Section 4:** `ExhibitionGallery` — 10 live implemented components (`swipe-card-deck`, `thinking-loader`, `ai-prompt-composer`, `physical-knob`, `reaction-arc`, `date-picker`, `receipt-printer`, `scratch-card`, `image-generation`, `infinity-canvas`) in asymmetric proportions.
- **Section 5:** `ThemeDifferentiator` — identical `RippleButton` inside `<MotionMintTheme>` across 7 signature patterns × Light/Dark without modifying `document.documentElement`.
- **Section 6:** `MotionSoundShowcase` — spring preset switcher (`Snappy`, `Bouncy`, `Gentle`) + opt-in `SoundToggle` & Web Audio / haptic audition (off by default).
- **Section 7:** `FlowShowcase` — live excerpt of `Document Verification Pipeline` with Kahn's DAG badge & clearly labelled simulated execution.
- **Section 8–11:** `DeveloperExperienceShowcase`, `PricingSection` (with user-configurable effort estimator), 2-column `FaqAccordion`, and `Footer` with `ParticleWordmark`.

## 2. Automated & Production Verification

- `npm test`: **12 test files, 85 tests** (including `tests/homepage.test.tsx`).
- `npm run typecheck`: `tsc --noEmit` (exit `0`).
- `npm run registry:validate`: `50` registry items validated.
- `npx next build --webpack`: `59/59` static pages compiled and prerendered cleanly.

## 3. Browser Screenshot & Viewport Status

- **Headless Browser Screenshots (`1440×900`, `1280×800`, `768×1024`, `390×844`):** **Not captured in this environment** — the browser subagent returned `RESOURCE_EXHAUSTED` (quota limit) and `playwright-core` is not installed in workspace `node_modules`.
- **Remaining Visual QA Step:** Run Playwright screenshot capture against `npm run start` at `1440×900`, `1280×800`, `768×1024`, and `390×844` in Light and Dark appearances once browser quota or local Playwright is available.

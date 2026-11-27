# PHASE_2_12_BRAND_QA.md — RenderJoy Brand Identity & Editorial Homepage QA

*Verified: 2026-11-25 against production build (`npx next build --webpack` + `npx next start -p 3005`) in headless Google Chrome.*

## 1. Automated Verification Results
- **Vitest (`npx vitest run --testTimeout=20000`):** 12/12 test files passed, 84/84 tests passed.
- **TypeScript (`npm run typecheck`):** Passed with 0 errors.
- **Registry (`npm run registry:validate`):** Passed (`50 items, all portable and built in public/r/.`).
- **Production Build (`npx next build --webpack`):** Passed (`60/60` static pages generated, including `/icon.svg`).

## 2. Live Browser QA (Headless Chrome)
- **Console Errors:** `0`
- **Page Errors:** `0`
- **Failed Network Requests (4xx/5xx):** `0`
- **Desktop (`1440×900`):** `scrollWidth = 1440` (`0` horizontal overflow), `scrollHeight = 4467px`, hero `<h1>` top at `336.34px` (`calc(100svh - 64px)` vertical centering), Kinetic M mark rendered.
- **Desktop (`1280×800`):** `scrollWidth = 1280` (`0` horizontal overflow).
- **Tablet (`768×1024`):** `scrollWidth = 768` (`0` horizontal overflow).
- **Mobile (`390×844`):** `scrollWidth = 390` (`0` horizontal overflow).

## 3. Visual Inspection Checklist
- **Editorial Header (`Navbar`):** Full-width hairline bar (`h-16`) with `Kinetic M` + `RenderJoy` lockup, centered editorial links (`Components`, `Themes`, `Flow`, `Docs`), `Search ⌘K`, `Light`/`Dark`/`System` switcher, and `Explore` CTA. No sound toggle or 29-theme dropdown in homepage chrome.
- **Hybrid Sculptural Silk Hero (`CinematicHero`):** Balanced first-viewport composition in both Light and Dark appearances with 4 orbiting specimens (`Thinking Loader`, `Physical Knob`, `Flow · DAG`, `58 Theme Variants`).
- **Curated Selected Work (`ExhibitionGallery`):** 5 interactive specimens (`Swipe Card Deck`, `Thinking Loader`, `Physical Knob`, `Reaction Arc`, `AI Prompt Composer`) with varied grid spans inside scoped `<RenderJoyTheme>` cards.
- **Split Themes + Flow (`ThemesFlowSplit`):** Live 29-theme / 58-expression `RippleButton` switcher (`Cyberpunk` tested live) paired with the simulated `Document Verification Pipeline` DAG card (`DAG Valid (7 nodes)`, `Simulated Demo`).
- **Editorial Footer (`Footer`):** `"Make something memorable."`, restrained link row, oversized `Kinetic M` + `RenderJoy` signature, and fine bottom hairline.

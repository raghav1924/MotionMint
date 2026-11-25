# AGENTS.md — MotionMint Engineering & Session Rules

> Persistent instructions for Antigravity and coding agents working in this repository.

## 1. Identity & Branding
- **Working Name:** MotionMint ("UI with Feel")
- **Centralised Branding:** Never hard-code "MotionMint" or URLs/scopes across components. Import from `lib/brand.ts` so the product can be renamed in one place.

## 2. Architecture Rules
- **Modular Monolith First:** Single Next.js App Router application. Do not introduce Turborepo, microservices, or databases unless a concrete milestone requires them.
- **Server vs. Client Components:** Keep pages and layouts as Server Components by default. Push `"use client"` down to interactive leaves (previews, skin switchers, sound triggers, controls).
- **Registry-First Components:** Every publishable component lives under `registry/` as self-contained TypeScript/React code with zero site-specific imports, paired with metadata for the shadcn-compatible registry (`public/r/*.json`).
- **Centralised Design Tokens & Skins:** Components must consume semantic CSS variables (`--mm-*`) defined in `app/globals.css` / `lib/themes/`, never hard-coded hex values. Launch skins: `dark` (default), `bento`, `glass`, `neo-brutal`.
- **Sound & Haptics Discipline:**
  - Sound is **off by default** globally.
  - Never auto-play audio on page load or casual hover.
  - Always gate playback behind user gesture + global/component sound state + `prefers-reduced-motion` awareness where appropriate.
  - Use the shared Web Audio / sound abstraction in `lib/audio/` so components never depend on raw audio file paths.
- **Flow Separation:** Keep reusable Flow UI Kit components separate from the Node Pipeline Orchestrator demo application.

## 3. Working Standards
- **Inspect Before Editing:** Read `ROADMAP.md`, `ARCHITECTURE.md`, and `COMPONENT_CATALOG.md` before starting major work.
- **TypeScript Strictness:** Strict TypeScript; no `any` escapes without justification.
- **Accessibility (WCAG 2.2 AA):** Keyboard navigation, visible focus rings, ARIA labels, `prefers-reduced-motion` support, and non-colour/non-audio fallbacks for all state changes.
- **Honest Verification:** Never mark a component or milestone complete until its unit/component tests pass (`npm test`), TypeScript/build succeeds, and UI changes are visually verified.
- **Documentation Sync:** Update `ROADMAP.md`, `COMPONENT_CATALOG.md`, `DECISIONS.md`, and `CHANGELOG.md` whenever architecture, scope, or implementation status changes.

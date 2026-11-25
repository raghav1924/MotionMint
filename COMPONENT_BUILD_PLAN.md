# COMPONENT_BUILD_PLAN.md — MotionMint Full Catalogue Roadmap

*Last updated: 2026-11-25 (Phase 2.8 UI Alignment complete; Wave 3+ paused)*

## Dependency Graph & Shared Foundations
- **Theme Foundation:** `lib/themes/` (29 `--mm-*` token profiles, standalone fallbacks)
- **Audio & Haptics:** `lib/audio/` (`@motionmint/sound-engine`, `useSound()`, `triggerHapticPreset`)
- **Motion Foundation:** `lib/motion/presets.ts` (`MOTION_SPRINGS`, `MotionReveal`)
- **AI Foundation:** `lib/ai/types.ts` (`AIMessage`, `AIToolCall`, `AgentPlanStep`) + `ThinkingLoader`
- **Carousel & Gesture Foundation *(Wave 4)*:** Shared horizontal/radial gesture & keyboard hook
- **WebGL / Canvas Foundation *(Wave 6)*:** Dynamic-imported canvas/shader wrapper with `IntersectionObserver` pause & static fallback
- **Block & Chart Foundation *(Wave 7)*:** Shared SVG chart primitives & responsive section layout shells

## Wave Schedule & Status

| Wave | Category / Scope | Item Count | Status | Complexity | Acceptance Gate |
|---|---|---|---|---|---|
| **Baseline** | Core (9) + Signature (3) + `motion-reveal` | 13 | `available` (verified) | Low–Med | Unit tests + 29-theme matrix + fresh consumer install |
| **Wave 1** | **AI Component System** (11 new + `ThinkingLoader`) | 12 | `available` (verified) | Medium | Controlled props, streaming/error/approval states, a11y, registry install |
| **Wave 2A** | **Essential Controls** (9 new + `CopyButton` + `Dropzone`) | 11 | `available` (verified) | Medium | Keyboard nav, focus management, validation, error states, registry install |
| **Wave 2B** | **Advanced Interactions** (12 remaining Controls) | 12 | `available` (verified) | High | Gestures, rotary/canvas/drawer interactions, reduced-motion |
| **Wave 3** | **Media Experiences** (27 remaining items) | 29 | `planned` | Med–High | Touch/keyboard fallbacks, licensed/empty-state audio |
| **Wave 4** | **Carousels & Galleries** (14 items) | 14 | `planned` | High | Shared carousel engine, touch/drag, reduced-motion |
| **Wave 5** | **Physics & Text** (16 items) | 16 | `planned` | Med–High | Performant CSS/SVG/Canvas, reduced-motion fallback |
| **Wave 6** | **WebGL & Visual Effects** (31 items, incl. `New` Voxel Shrine/Onsen) | 31 | `planned` | High | Dynamic import, context-loss handling, offscreen pause |
| **Wave 7** | **Sections, Blocks, Charts, Heroes, Navbars, Logins, Footers** | 109 | `planned` | Med–High | Distinct layouts per numbered variant, accessible charts |
| **Wave 8** | **Getting Started & Developer Resources** (Intro, Install, MCP, AI) | 4 | `planned` | Low | Verified CLI/MCP docs (Installation already live) |

## Wave 1 — AI Component System Breakdown

| Name | Slug | Type | Family | Status |
|---|---|---|---|---|
| Thinking Loader | `thinking-loader` | Component | `ai` | `available` (reused) |
| AI Prompt Composer | `ai-prompt-composer` | Component | `ai` | `available` |
| Streaming Message | `streaming-message` | Component | `ai` | `available` |
| Tool Call Card | `tool-call-card` | Component | `ai` | `available` |
| Agent Plan | `agent-plan` | Component | `ai` | `available` |
| Approval Card | `approval-card` | Component | `ai` | `available` |
| Inline Diff | `inline-diff` | Component | `ai` | `available` |
| Reasoning Trace | `reasoning-trace` | Component | `ai` | `available` |
| AI Chat | `ai-chat` | Component | `ai` | `available` |
| Image Generation | `image-generation` | Component | `ai` | `available` |
| Chat Orb | `chat-orb` | Component | `ai` | `available` |
| Pixel Image Generation | `pixel-image-generation` | Component | `ai` | `available` |

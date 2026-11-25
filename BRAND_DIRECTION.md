# BRAND_DIRECTION.md — MotionMint Phase 2.12

*Last updated: 2026-11-25*

## 1. Live & Web Reference Research

| Reference | URL | Observed Strengths & Characteristics | MotionMint Application |
|---|---|---|---|
| **Metalab** | https://www.metalab.com/ | *"Metalab \| We make interfaces"* — Ultra-restrained header (single primary action), dramatic editorial typography, product-first minimalism, generous whitespace, curated work over feature lists. | Remove bloated SaaS sections; let selected live work and oversized typography carry the brand. |
| **Marked.dev** | https://marked.dev/ | *"Give your coding agent your design taste"* — Crisp 3-link nav (`Explore`, `Collections`, `MCP`), direct developer positioning, calm editorial footer with closing statement. | Keep navigation focused (`Components`, `Themes`, `Flow`, `Docs`), emphasize source ownership & agent-ready discovery (`llms.txt` / CLI). |
| **Wix Studio Inspiration** | https://www.wix.com/studio/inspiration | Multi-layered parallax, scroll-pinned transformations, kinetic typographic contrast, and sculptural motion depth. | Retain Hybrid Sculptural Silk + Living Components with smooth scroll & pointer depth. |
| **Dribbble / Awwwards** | https://dribbble.com/ / https://www.awwwards.com/ | Monochrome creative studios use fine 1px hairline rules, asymmetric grids, custom geometric logomarks, and oversized footer signatures instead of 4-column SaaS link blocks. | Replace floating pill navbar and 4-column dot-matrix footer with hairline editorial navigation and an oversized Kinetic M footer signature. |

---

## 2. Logomark Exploration & Selection

1. **Concept A — Kinetic M *(Selected)*:**
   - Two continuous folded ribbon paths forming an unmistakable geometric **M** with a precision diagonal cut.
   - Communicates movement, folded surfaces, and interactive transitions even without text beside it.
   - Scales cleanly from `16px` (`app/icon.svg`) to `24px–32px` (navbar/sidebar) up to `120px+` (editorial footer).
2. **Concept B — Motion Fold:**
   - Two overlapping parallelogram surfaces — strong at large sizes, slightly abstract at `16px`.
3. **Concept C — Modular Motion:**
   - Three connected geometric blocks — leans too heavily toward workflow diagrams rather than the broader UI brand.

---

## 3. Typography & Visual System

- **Brand Wordmark:** Contemporary grotesk (`font-semibold` for `Motion` + `font-normal opacity-75` for `Mint`, `tracking-[-0.035em]`) paired with `Kinetic M` mark.
- **Editorial Restraint:** Monochrome `--ws-*` Light (`#ffffff` / `#0a0a0c`) and Dark (`#050506` / `#fafafa`) application chrome, fine 1px hairline borders, and zero global component-theme leakage.
- **Homepage Content Reduction:** Condensed from 10+ sections down to 6 focused editorial beats: Editorial Header → Hybrid Sculptural Hero → Compact Capability Line → Selected Work (*"Made to move."*, 5 pieces) → Combined Themes & Flow Split → Developer CTA & Oversized Brand Footer.

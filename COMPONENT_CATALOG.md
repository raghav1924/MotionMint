# COMPONENT_CATALOG.md — RenderJoy

*Last updated: 2026-11-25*

## Status Legend
- `planned`: Scoped in roadmap, not yet implemented
- `in-progress`: Currently being built
- `implemented`: Built with live preview, docs, and passing tests
- `verified`: Implemented + registry install verified in fresh app

## Launch Catalogue (Initial 15 Items)

| Slug | Name | Category | Tier | Status | Dependencies |
|---|---|---|---|---|---|
| `bounce-dots-loader` | Bounce Dots Loader | Loaders | Free | `verified` | React, CSS / Tailwind |
| `wiggle-text` | Wiggle Text | Typography & Motion | Free | `verified` | React, CSS |
| `jelly-button` | Jelly / Magnetic Button | Buttons | Free | `verified` | `motion/react`, `lib/audio` |
| `ripple-button` | Ripple Button | Buttons | Free | `verified` | React, `lib/audio` (optional) |
| `copy-button` | Animated Copy Button | Actions | Free | `verified` | `lucide-react`, `lib/audio` (optional) |
| `sound-toggle` | Sound & Haptic Toggle | Controls | Free | `verified` | `motion/react`, `lib/audio` |
| `progress-ring` | Progress Ring & Bar | Feedback | Free | `verified` | React, SVG |
| `skeleton-shimmer` | Skeleton Shimmer | Loaders | Free | `verified` | React, CSS / Tailwind |
| `dropzone` | Basic Dropzone | Inputs | Free | `verified` | `lucide-react`, `lib/audio` (optional) |
| `swipe-card-deck` | Swipe Card Deck | Signature | Free | `verified` | `motion/react`, `lucide-react`, `lib/audio` |
| `thinking-loader` | Thinking Loader | Signature | Free | `verified` | React, CSS / Tailwind |
| `flip-card` | Direction-Aware Flip Card | Signature | Free | `verified` | `motion/react`, `lib/audio` |
| `advanced-upload-flow` | Advanced Upload Flow | Flows | Pro | `planned` | `motion/react`, `lucide-react` |
| `payment-success-flow` | Payment Success Flow | Flows | Pro | `planned` | `motion/react`, `lib/audio` |
| `cover-flow-carousel` | Cover-Flow Carousel | Navigation & Media | Pro | `planned` | `motion/react` |
| `animated-charts` | Animated Charts (Gauge, Donut, Bars) | Data Viz | Pro | `planned` | React, SVG, `motion/react` |
| `bento-dashboard-block` | Bento Dashboard Block | Blocks | Pro | `planned` | Tailwind, `motion/react` |
| `sound-packs` | Advanced Sound Packs | Sound | Pro | `planned` | Web Audio API |

## Quality Gate per Component
Every component moved to `implemented` must have:
1. Live interactive preview (with deliberate interaction & `prefers-reduced-motion` support)
2. Full source code view
3. Installation command & dependency list
4. Props / API documentation
5. Responsive & accessibility notes
6. Skin compatibility across all 4 launch skins (`dark`, `bento`, `glass`, `neo-brutal`)
7. Automated Vitest + React Testing Library tests passing

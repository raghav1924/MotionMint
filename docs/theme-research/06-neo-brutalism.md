# Neo-Brutalism — Design Research

- **Researched:** 2026-11-25
- **References:** https://dribbble.com/search/neo-brutalism, https://www.figma.com/resource-library/web-design-trends/

## Observed Design Principles
Thick 3px black outlines, zero-blur hard offset shadows (`4px 4px 0px`), flat saturated fills, and tactile press translation.

## Light Variant Specification
Warm yellow `#FFF8DC` / `#FFEB3B` accent surfaces, `#FFFFFF` cards, `#000000` 3px borders & `5px 5px 0 #000` shadows, pink `#FF4D8D` secondary.

## Dark Variant Specification
Deep charcoal `#141418` canvas, `#1E1E24` cards, `#FACC15` yellow & `#FF5C93` high-contrast accents, `#F4F4F5` / `#FACC15` crisp outlines and `5px 5px 0 #FACC15` offset depth.

## Typography
Chunky geometric sans (`Space Grotesk` / `Inter`), 800 weight, tight tracking.

## Colour
Flat high-saturation primaries with zero gradients.

## Geometry
4px–8px crisp corners, 2.5px–3px solid borders.

## Surface & Texture
Hard offset 0-blur shadows that compress on `:active`.

## Motion & Interaction
110ms snappy translation (`translate(2px, 2px)`) on press.

## Translation to React Components
Buttons and cards shift into their hard offset shadow on press; inputs have thick solid borders and offset focus.

## What to Avoid
Gaussian blur shadows, translucency, or thin 1px muted borders.

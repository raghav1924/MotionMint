# Neumorphism — Design Research

- **Researched:** 2026-11-25
- **References:** https://dribbble.com/search/neumorphism, https://www.behance.net/

## Observed Design Principles
Soft UI extrusion: monochromatic surface matching the canvas with dual opposing light/dark directional shadows.

## Light Variant Specification
Cool clay-gray `#E6E9EF` canvas & surface, `#2D3748` ink, `#3B82F6` accent, dual shadows `6px 6px 14px #c5cbd6, -6px -6px 14px #ffffff`.

## Dark Variant Specification
Soft slate `#1E2028` canvas & surface, `#E2E8F0` ink, `#60A5FA` accent, dual shadows `6px 6px 14px #14151b, -6px -6px 14px #282b35`.

## Typography
Rounded clean sans-serif, medium 500–600 weight.

## Colour
Low-contrast monochromatic surface paired with crisp readable ink and a clear focus accent.

## Geometry
16px–20px soft rounded corners, subtle 1px border fallback for WCAG contrast.

## Surface & Texture
Extruded dual-directional outer shadows; inset shadows on pressed/active controls.

## Motion & Interaction
180ms smooth elevation-to-inset transition.

## Translation to React Components
Buttons transition from extruded to inset pressed depth; inputs use recessed inset shadows.

## What to Avoid
Missing accessible contrast on text or borders.

# Glassmorphism — Design Research

- **Researched:** 2026-11-25
- **References:** https://dribbble.com/search/glassmorphism, https://www.figma.com/resource-library/web-design-trends/

## Observed Design Principles
Frosted translucent layers (`backdrop-filter: blur`), luminous 1px specular top/left edge highlights, and layered depth.

## Light Variant Specification
Frosted sky `#EEF2FF` canvas, `rgba(255,255,255,0.72)` glass surface, `#0F172A` ink, `#2563EB` accent, `rgba(255,255,255,0.85)` specular border.

## Dark Variant Specification
Deep obsidian-navy `#090D16` canvas, `rgba(24,30,44,0.72)` dark glass, `#F8FAFC` ink, `#38BDF8` accent, `rgba(255,255,255,0.16)` edge highlight.

## Typography
Clean geometric sans-serif (Inter / SF Pro).

## Colour
Translucent neutrals over subtle atmospheric gradients with crisp foreground text.

## Geometry
18px–24px smooth corners, 1px luminous edge border.

## Surface & Texture
Backdrop blur (`16px`) + soft ambient elevation shadow.

## Motion & Interaction
200ms fluid refraction-like opacity and elevation shift.

## Translation to React Components
Cards and popovers use translucent surfaces with crisp specular borders.

## What to Avoid
Unreadable low-opacity text without sufficient backdrop contrast.

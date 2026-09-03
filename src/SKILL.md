---
name: investcount-src-guidelines
description: Core frontend design and architectural standards for InvestCount source code.
---

# InvestCount Source Code Standards

## 1. Design Tokens & Colors
- **Single Source of Truth**: All design tokens are defined in `src/theme.ts` and mapped in `tailwind.config.js`.
- **Allowed Palette**:
  - Primary Brand Green: `brand-50` through `brand-900` (Main: `brand-600` / `#059669`).
  - Slate Neutrals: `slate-50` through `slate-900` (Main text: `slate-900`, body: `slate-600`).
  - Never introduce random ad-hoc hex colors or raw pastel gradients without updating tokens.

## 2. Typography
- Headings: Use font class `font-display` (`Plus Jakarta Sans`) with tight tracking.
- Body: Use `font-sans` (`Inter`).
- Formulas / Data: Use `font-mono` (`JetBrains Mono`).

## 3. Icons vs Emoji
- **Strict Rule**: Do NOT use raw emoji (e.g. 🏦, 🔒, 🚫) as UI icons.
- Always use the `<Icon name="..." />` component located in `src/components/Icon/Icon.tsx`.

## 4. Animations
- Import motion variants from `src/constants/animations.ts` (`containerVariants`, `childVariants`, `badgeVariants`).
- Avoid creating duplicate inline Framer Motion variants in individual components.

## 5. Copy & Text Density
- Keep copy concise, human, and direct. Avoid repeating the same explanation across multiple sections.
- Prioritize high breathing room, clean padding, and responsive touch targets.

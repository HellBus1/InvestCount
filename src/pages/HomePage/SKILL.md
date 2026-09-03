---
name: investcount-homepage-guidelines
description: Homepage layout, section conventions, and design patterns for InvestCount.
---

# Homepage Design Guidelines

## 1. Section Structure & Alternating Backgrounds
- Sections alternate subtly between `bg-slate-50`, `bg-white`, and `bg-slate-100/60` with clean borders (`border-slate-200/80`).
- Vertical padding standard: `py-16 md:py-24`.
- All section content is wrapped in `.layout` (`max-width: 72rem`).

## 2. Calculator & Signature Element
- **DepositTypeSelector**: Segmented tab control with `Non-ARO`, `ARO`, and `ARO+` options.
- **DepositRateResult**: Signature card with gradient accent border (`from-brand-500 to-brand-400`), large rupiah text, and clean breakdown.

## 3. Trust Badges & LPS Section
- Use SVG icons (`src/components/Icon/Icon.tsx`) instead of emojis.
- Cards must use `rounded-2xl`, `border border-slate-200`, and subtle `shadow-card`.

## 4. Rate Comparison Section
- Uses `recharts` responsive bar chart styled with `BRAND_COLOR` (`#059669`).
- Filters default to sorting by highest interest rate (`rate`) for optimal user utility.

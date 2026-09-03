---
name: investcount-components-guidelines
description: Architecture and styling guidelines for shared components in InvestCount.
---

# Shared Components Guidelines

## 1. Icon Component (`src/components/Icon/Icon.tsx`)
- All vector icons must be added to this component as clean SVGs.
- Props: `name`, `className`, `size`.
- Style defaults to strokeWidth=2 with rounded linecaps and linejoins.

## 2. Footer (`src/components/Footer/Footer.tsx`)
- Uses dark slate container (`bg-slate-900`) with high-contrast text (`text-slate-300`, `text-white`).
- Links must use subtle hover transitions (`hover:text-brand-400`).

## 3. QuickNav (`src/components/QuickNav/QuickNav.tsx`)
- Uses fixed positioning (`bottom-6 right-6 z-50`).
- Floating Action Button uses `bg-brand-600 hover:bg-brand-700 text-white`.
- Menu items use clean rounded pill badges with SVG icons.

## 4. InputField (`src/pages/HomePage/components/DepositSection/DepositCalculation/InputField.tsx`)
- Standardized currency / number / text input.
- Supports `prefix` (e.g. "Rp") and `suffix` (e.g. "%", "Bulan").
- Error messages render below input with clean red text.

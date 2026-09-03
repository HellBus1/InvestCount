---
name: investcount-constants-guidelines
description: Standards for global routes, animation configurations, and constants in InvestCount.
---

# Constants & Configurations Guidelines

## 1. Route Definitions (`RouteName.ts`)
- All app routes are defined as constant keys in `RouteName.ts`. Never hardcode raw route strings across components.

## 2. Animation System (`animations.ts`)
- Centralized motion configurations:
  - `containerVariants`: Staggered section entrance.
  - `childVariants`: Staggered items.
  - `imageVariants`: Smooth image scale-in.
  - `badgeVariants`: Micro-badge popping effect.
- Keep animation durations between `0.25s` and `0.4s` for snappy, high-performance interactions.

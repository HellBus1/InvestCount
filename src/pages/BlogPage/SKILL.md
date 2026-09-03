---
name: investcount-blog-guidelines
description: Standards for Blog listing and MDX post readers in InvestCount.
---

# Blog & Content Guidelines

## 1. Blog Listing (`BlogPage.tsx`)
- Articles render in a responsive 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- Cards feature an aspect-ratio thumbnail (`aspect-video`), category pill, publication date, and read time.
- Hover state: subtle card elevation (`hover:shadow-hover`) with animated arrow link.

## 2. Blog Post View (`BlogPost.tsx`)
- Includes breadcrumbs (`Beranda / Blog / Category`).
- Styled using `@tailwindcss/typography` with `prose prose-slate max-w-none`.
- Bottom includes an embedded calculator CTA card with dark slate background.

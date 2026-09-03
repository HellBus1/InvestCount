# SEO & Pre-rendering Architecture Documentation

## 1. Overview & Problem Statement

Prior to v1.6.0, InvestCount was built as a traditional Single Page Application (SPA) using React, Vite, and React Router. When search engine crawlers (Googlebot, Bingbot) or social media scrapers requested a page, the server returned an empty `<div id="root"></div>` and relied 100% on client-side JavaScript execution.

### Consequences:
1. **Googlebot Indexing Latency & Incomplete Rendering**: While Googlebot can execute JavaScript, it queues rendering. Complex client-side state and async MDX loading meant search engines indexed minimal content, causing impressions to stay high (due to meta tags in `index.html`) but rankings to sit low (positions 50–90+).
2. **Social Sharing Failure**: Platforms like WhatsApp, Twitter/X, and LinkedIn do not execute JavaScript when generating link previews, meaning articles shared had generic fallback cards without titles or thumbnails.
3. **Keyword Splitting**: Routes like `/about` vs `/tentang` and `/transparency` vs `/sumber-data` were both indexed, diluting domain authority and crawl budget.

---

## 2. The Solution: SSG Pre-rendering Engine

Instead of migrating to a heavy server framework (like Next.js) which would break Cloudflare Pages static hosting, InvestCount utilizes a **custom, zero-dependency Static Site Generation (SSG) pipeline** powered by Vite's native SSR mode.

### Architecture Flow

```
1. Client Build
   vite build ───► Bundles client assets, CSS, and JS chunks into dist/

2. SSR Server Build
   vite build --ssr src/entry-server.tsx --outDir dist-ssr
   ───► Compiles React Router, MDX modules, and pages into dist-ssr/entry-server.js

3. Pre-rendering Script (scripts/prerender.js)
   Node.js ───► Imports dist-ssr/entry-server.js
           ───► Iterates over all 15 routes:
                - /
                - /kalkulator-deposito
                - /tentang
                - /sumber-data
                - /blog
                - /blog/:slug (10 articles)
           ───► Renders full static HTML with ReactDOMServer.renderToString()
           ───► Injects route-specific <title>, <meta description>, canonicals, OG tags, and JSON-LD schemas
           ───► Writes static index.html in each route directory inside dist/
           ───► Auto-generates public/sitemap.xml and dist/sitemap.xml
           ───► Cleans up temporary dist-ssr/
```

---

## 3. Key Technical Components

### 3.1 `src/entry-server.tsx`
Provides the server-side entry point for rendering routes using `createMemoryRouter` from `react-router-dom`:
```tsx
export function render(url: string) {
  const router = createMemoryRouter(routes, { initialEntries: [url] })
  const html = ReactDOMServer.renderToString(<RouterProvider router={router} />)
  return { html }
}
```

### 3.2 Progressive Client Hydration (`src/main.tsx`)
When a visitor opens a page, the browser already has the full HTML visible. React detects the pre-rendered markup and performs progressive hydration instead of destroying and recreating the DOM:
```tsx
const rootElement = document.getElementById('root')!

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, <React.StrictMode><App /></React.StrictMode>)
} else {
  ReactDOM.createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>)
}
```

### 3.3 Dynamic SEO Hook (`src/hooks/useSEO.ts`)
Manages `<title>`, `<meta>`, canonical URLs, Open Graph, Twitter Cards, and dynamic JSON-LD schemas at both runtime and build-time.

---

## 4. Content Cluster & Blog Post Registry

### 4.1 Centralized Metadata Registry (`src/data/blogPosts.ts`)
All blog post metadata is managed in a single TypeScript file:
- Titles, descriptions, reading times, publication dates, categories
- Keyword targets for search intent
- Helper methods: `getBlogPost(slug)` and `getAllBlogPosts()`

### 4.2 Synchronous MDX Module Loading (`src/pages/BlogPage/BlogPost.tsx`)
Articles are imported eagerly via Vite's `import.meta.glob`:
```tsx
const blogModules = import.meta.glob<{ default: ComponentType; meta: BlogPostMeta }>(
  '/src/content/blog/*.mdx',
  { eager: true }
)
```
This ensures the full article body (2,000+ words, tables, formulas) is synchronously available during `renderToString()` without any asynchronous loading delays or blank state flickers.

---

## 5. How to Add a New Route or Blog Post

### Adding a New Blog Post:
1. Create a new `.mdx` file in `src/content/blog/<slug>.mdx`.
2. Add the post metadata to `blogPosts` in [`src/data/blogPosts.ts`](file:///Users/syubbanfakhriya/Desktop/Repository/side-project/InvestCount/src/data/blogPosts.ts).
3. Run `npm run build`.
   - The article will automatically be listed on `/blog`.
   - A dedicated static folder `dist/blog/<slug>/index.html` will be generated with pre-rendered content and `BlogPosting` schema.
   - `sitemap.xml` will automatically include the new URL.

### Adding a New Page Route:
1. Add the component to [`src/routes.tsx`](file:///Users/syubbanfakhriya/Desktop/Repository/side-project/InvestCount/src/routes.tsx).
2. Add the route entry with `<title>` and `<description>` to `routes` array in [`scripts/prerender.js`](file:///Users/syubbanfakhriya/Desktop/Repository/side-project/InvestCount/scripts/prerender.js).
3. Run `npm run build`.

---

## 6. Cloudflare Pages Deployment

InvestCount is configured for **Git Auto-Deploy** on Cloudflare Pages:
- **Build Command**: `npm run build`
  *(Chains `build:client` $\to$ `build:ssr` $\to$ `build:prerender`)*
- **Build Output Directory**: `dist`
- **Redirects**: Managed by `public/_redirects` (auto-copied to `dist/_redirects` by Vite).

# InvestCount – Indonesia's Independent Deposit Calculator

<div align="center">

![InvestCount Banner](https://github.com/user-attachments/assets/1e5077fb-da81-4e49-84cc-e8bc40a5639d)

**Hitung bunga deposito bersih dalam 5 detik. Gratis & tanpa iklan.**

[![Version](https://img.shields.io/badge/version-1.6.0-emerald.svg)](https://github.com/HellBus1/InvestCount)
[![License](https://img.shields.io/badge/license-Apache%202.0-green.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live-success.svg)](https://investtcount.mattrmost.com/)

</div>

---

## 📖 About

**InvestCount** is Indonesia's most transparent and independent deposit calculator platform. We help Indonesians—from young savers to retirees—understand how their money works through deposits with honesty and simplicity.

- 🔍 **Transparent** – No hidden agendas or bank affiliations
- 📚 **Educational** – Learn while you calculate
- 🆓 **Free Forever** – No subscriptions or paywalls
- 🚫 **Ad-Free** – Clean, distraction-free experience
- 🔒 **Privacy-First** – No login required, no data collection

> **Mission**: *"Membantu setiap orang Indonesia memahami bagaimana uang mereka bekerja melalui deposito, dengan jujur dan sederhana."*

---

## 🎨 Design System & Theming Guidelines (v1.6.0 Overhaul)

InvestCount uses a centralized, token-based design system that replaces generic template defaults with an intentional Indonesian fintech visual identity.

### 1. Central Design Tokens (`src/theme.ts`)
All colors, font families, shadows, and radii are managed in [`src/theme.ts`](file:///Users/syubbanfakhriya/Desktop/Repository/side-project/InvestCount/src/theme.ts) as a typed TypeScript contract and exposed via Tailwind CSS variables:

- **Primary Brand Green**: `brand-50` through `brand-900` (Main: `brand-600` / `#059669`)
- **Slate Neutrals**: `slate-50` through `slate-900` (Main text: `slate-900` / `#0F172A`, body: `slate-600`)
- **State Colors**: `amber-*` (cautions/disclaimers) and `danger-*` (validation errors)

### 2. Typography Hierarchy
- **Display / Headings**: `Plus Jakarta Sans` (geometric, warm Indonesian-crafted display font)
- **Interface Body**: `Inter` (high-readability sans-serif)
- **Math & Data**: `JetBrains Mono` (used in formula blocks on the Transparency page)

### 3. Vector Icon System (`src/components/Icon/Icon.tsx`)
- All UI icons use crisp inline vector SVGs instead of raw emojis (e.g. `shield-check`, `gift`, `lock`, `handshake`, `bank`, `coins`, `calculator`).

### 4. Shared Animation Constants (`src/constants/animations.ts`)
- Replaces repetitive per-component Framer Motion variants with centralized `containerVariants`, `childVariants`, `imageVariants`, and `badgeVariants`.

---

## 🛡️ AI Agent Quality Guardrails (`SKILL.md`)

To ensure that future AI coding sessions (using Google Antigravity, Cursor, Copilot, or Claude Code) maintain design consistency and avoid "AI slop", InvestCount employs directory-level `SKILL.md` guardrail files:

| Guardrail File | Scope & Purpose |
|---|---|
| [`src/SKILL.md`](src/SKILL.md) | Global token usage, typography rules, SVG icon rules, and copy density standards |
| [`src/components/SKILL.md`](src/components/SKILL.md) | Component architecture for Navbar, Footer, QuickNav, and InputField |
| [`src/pages/HomePage/SKILL.md`](src/pages/HomePage/SKILL.md) | Alternating section backgrounds, calculator rules, and rate comparison charts |
| [`src/pages/AboutPage/SKILL.md`](src/pages/AboutPage/SKILL.md) | Header eyebrow pattern, 2x2 values grid, and creator profile |
| [`src/pages/BlogPage/SKILL.md`](src/pages/BlogPage/SKILL.md) | Article 3-column grid, thumbnail aspect ratios, and reader typography |
| [`src/pages/TransparencyPage/SKILL.md`](src/pages/TransparencyPage/SKILL.md) | Monospace calculation formulas and regulatory data source citations |
| [`src/constants/SKILL.md`](src/constants/SKILL.md) | Centralized routes (`RouteName.ts`) and animation standards |

---

## 🆕 What's New in v1.6.0 (SEO & Pre-rendering Engine Overhaul)

- ⚡ **SSG Pre-rendering Engine**: Solved the client-side SPA crawlability bottleneck by implementing an automated static site generator (`scripts/prerender.js`). Generates 15 fully rendered static HTML pages at build time with progressive client hydration (`ReactDOM.hydrateRoot`).
- 🎯 **Targeted On-Page SEO**: Upgraded the homepage with an exact-match `<h1>` (*"Kalkulator Deposito: Hitung Bunga Bersih & Bandingkan Semua Bank"*), a 3-pillar comparison guide, and an interactive FAQ accordion powered by `FAQPage` schema markup.
- 📚 **Expanded Content Cluster (3 → 10 Articles)**: Scaled the educational blog to 10 comprehensive, 2,000+ word guides targeting high-impression queries from Google Search Console.
- 🤖 **AI SEO Readiness (`public/llms.txt`)**: Implemented `llms.txt` adhering to Generative Engine Optimization (GEO/AEO) standards for citations in ChatGPT, Perplexity, and Claude.
- 🗺️ **Automated Sitemap & 301 Redirects**: Automated XML sitemap generation on build with canonical URLs and Cloudflare Pages `_redirects` (`/about` → `/tentang`, `/transparency` → `/sumber-data`).
- 🖼️ **Social Sharing Banner (Open Graph)**: Added a custom 1200x630 branded OG preview image (`public/og/og-image.jpg`) for rich previews on WhatsApp, Twitter, and LinkedIn.
- 🧭 **Sticky Glassmorphic Navbar**: Added [`Navbar.tsx`](src/components/Navbar/Navbar.tsx) with a one-tap mobile "Kalkulator" button and direct home navigation.
- 📱 **Mobile-Optimized Footer**: Enhanced footer grid with popular guide deep-links and dedicated padding to avoid QuickNav overlap.

---

## ✨ Features

### 🧮 Core Calculator
- **Real-time Deposit Calculation** – Calculate interest, tax deductions (20%), and net returns instantly
- **ARO Support** – Simulate Automatic Roll Over (ARO) and ARO+ with compounding effects
- **Multiple Deposit Types** – Support for Non-ARO, ARO, and ARO+ calculations
- **Tax Calculation** – Automatic 20% tax deduction as per Indonesian regulations (PP No. 131/2000)
- **Flexible Tenors** – Calculate for 1, 3, 6, or 12-month periods

### 📊 Bank Comparison
- **Comprehensive Rate Comparison** – Compare deposit rates from major Indonesian banks
- **Digital & Traditional Banks** – Coverage of both conventional and digital banks
- **Visual Charts** – Interactive charts powered by Recharts for easy comparison
- **Up-to-date Information** – Regular updates with last-updated timestamps

### 💰 Budget Planner
- **Financial Planning Tool** – Plan your deposit strategy with our budget planner
- **Goal Setting** – Set financial goals and track progress
- **Smart Recommendations** – Get personalized deposit recommendations

### 🛡️ LPS Information
- **Deposit Insurance** – Learn about LPS (Lembaga Penjamin Simpanan) coverage
- **Safety Guidelines** – Understand deposit safety limits (up to Rp 2 billion per bank)
- **Educational Content** – Clear explanations of deposit protection

### 📝 Financial Education Blog (10 Complete Guides)
- **Expert Articles** – In-depth guides without financial jargon
- **SEO & Search-Intent Optimized** – Pre-rendered HTML with rich schema markup
- **Current Topics**:
  1. Cara Menghitung Bunga Deposito Bank (Rumus & Pajak 20%)
  2. Simulasi Deposito Bank 2026 (Saldo 10 Juta, 50 Juta, 100 Juta)
  3. Daftar Suku Bunga Deposito Bank Tertinggi 2026
  4. Panduan Menggunakan Kalkulator Deposito Online
  5. Mengenal Deposito ARO, Non-ARO, dan ARO+ (Compounding)
  6. Pajak Bunga Deposito 20% (Aturan PPh Final Pasal 4 Ayat 2)
  7. Deposito vs Tabungan Reguler
  8. Pengaruh Inflasi terhadap Nilai Riil Bunga Deposito
  9. Deposito BPR vs Bank Umum (Bunga & Jaminan LPS)
  10. Strategi Tangga Deposito (Deposit Laddering)

### 🎨 User Experience
- **Responsive Design** – Seamless experience on mobile, tablet, and desktop
- **Modern UI/UX** – Clean, intuitive interface with smooth animations
- **Accessibility** – WCAG 2.1 AA compliant
- **Dark Mode Ready** – Comfortable viewing in any lighting condition
- **Quick Navigation** – Floating action button for easy site navigation

---

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** – Modern React with hooks and concurrent features
- **TypeScript 5.2.2** – Type-safe development
- **Vite 6.2.2** – Lightning-fast build tool and dev server

### Styling & UI
- **Tailwind CSS 3.4.7** – Utility-first CSS framework
- **DaisyUI 5.5.5** – Beautiful component library
- **Motion 12.6.2** – Smooth animations and transitions

### Content & Documentation
- **MDX 3.1.1** – Write JSX in Markdown for rich blog content
- **Remark GFM 4.0.1** – GitHub Flavored Markdown support
- **Rehype Plugins** – Auto-linking headings and slug generation
- **Gray Matter 4.0.3** – Front matter parsing for blog posts
- **Reading Time 1.5.0** – Estimated reading time for articles

### Data Visualization
- **Recharts 2.15.1** – Composable charting library for React

### Routing
- **React Router DOM 6.26.2** – Declarative routing for React

### Development Tools
- **ESLint** – Code linting and quality checks
- **Prettier 3.3.3** – Code formatting
- **Husky 8.0.0** – Git hooks for pre-commit checks
- **Lint-Staged 15.2.9** – Run linters on staged files
- **Jest 29.7.0** – Testing framework

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn installed
- Git for version control

### Installation

1. **Clone the repository**
```bash
git clone git@github.com:HellBus1/InvestCount.git
cd InvestCount
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

4. **Build for production (Full SSG & Prerendering)**
```bash
npm run build
```
*Executes client bundle, SSR compilation, and pre-renders static HTML for all 15 routes into `dist/`.*

5. **Preview production build**
```bash
npm run preview
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start local Vite development server |
| `npm run build` | Full production build: client + SSR + SSG pre-rendering |
| `npm run build:client` | Type-check (`tsc -b`) and bundle client assets to `dist/` |
| `npm run build:ssr` | Bundle SSR server entry point (`src/entry-server.tsx`) |
| `npm run build:prerender` | Generate static HTML for all routes & create fresh `sitemap.xml` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across codebase |
| `npm run lint:fix` | Automatically fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm test` | Run Jest unit tests for deposit calculation formulas |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code:
- Follows the existing code style
- Passes all linting checks (`npm run lint`)
- Is properly formatted (`npm run format`)
- Includes appropriate tests

---

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Syubban Fakhriya**

- GitHub: [@HellBus1](https://github.com/HellBus1)
- LinkedIn: [syubban-fakhriya](https://www.linkedin.com/in/syubban-fakhriya/)

---

## 💖 Support

If you find InvestCount helpful, consider supporting the project:

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/syubban)

Your support helps keep InvestCount free, ad-free, and continuously improving!

---

## 🙏 Acknowledgments

- **React JS Template**: [ts-react-tailwind-starter](https://github.com/HellBus1/ts-react-tailwind-starter)
- **AI Tools**: ChatGPT and other generative AI tools for development assistance
- **Data Sources**: Bank Indonesia, OJK (Otoritas Jasa Keuangan), LPS (Lembaga Penjamin Simpanan)
- **Community**: All contributors and users who provide feedback

---

<div align="center">

**Made with ❤️ for Indonesia's financial literacy**

[Live Demo](https://investtcount.mattrmost.com/) • [Report Bug](https://github.com/HellBus1/InvestCount/issues) • [Request Feature](https://github.com/HellBus1/InvestCount/issues)

</div>

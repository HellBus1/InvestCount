import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const BASE_URL = 'https://investtcount.mattrmost.com'
const TODAY = new Date().toISOString().split('T')[0]

async function prerender() {
  console.log('🚀 Starting InvestCount SSG Prerender...')

  const distPath = path.resolve(rootDir, 'dist')
  const ssrBundlePath = path.resolve(rootDir, 'dist-ssr/entry-server.js')
  const templatePath = path.resolve(distPath, 'index.html')

  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html template not found. Run client build first.')
  }

  if (!fs.existsSync(ssrBundlePath)) {
    throw new Error('dist-ssr/entry-server.js not found. Run SSR build first.')
  }

  const template = fs.readFileSync(templatePath, 'utf-8')
  const { render, blogPosts, homeFAQs } = await import(ssrBundlePath)

  // Define routes and their metadata
  const routes = [
    {
      url: '/',
      path: '/',
      title: 'Kalkulator Deposito Indonesia - Hitung Bunga Bersih & Bandingkan Semua Bank | InvestCount',
      description:
        'Kalkulator deposito gratis untuk menghitung bunga bersih setelah pajak 20%. Bandingkan suku bunga deposito BCA, Mandiri, BRI, BNI, bank digital (Seabank, Krom, Jago) dan BPR. Simulasi ARO & Non-ARO akurat.',
      keywords:
        'kalkulator deposito, hitung bunga deposito, simulasi deposito, deposito bank, bunga deposito, pajak deposito 20%, deposito indonesia, kalkulator bunga deposito, deposito online, ARO deposito',
      ogType: 'website',
      ogImage: '/og/og-image.jpg',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'InvestCount',
          url: `${BASE_URL}/`,
          inLanguage: 'id-ID',
          description: 'Kalkulator deposito gratis dan pembanding suku bunga bank Indonesia.'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Kalkulator Deposito InvestCount',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web',
          url: `${BASE_URL}/`,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'IDR'
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: homeFAQs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        }
      ]
    },
    {
      url: '/kalkulator-deposito',
      path: '/kalkulator-deposito',
      title: 'Kalkulator Deposito Online Indonesia - Simulasi Bunga Bersih Bank | InvestCount',
      description:
        'Alat kalkulator bunga deposito online akurat. Bandingkan suku bunga bank umum dan bank digital Indonesia setelah pajak PPh 20%.',
      keywords:
        'kalkulator deposito, kalkulator bunga deposito, hitung deposito online, simulasi deposito',
      ogType: 'website',
      ogImage: '/og/og-image.jpg'
    },
    {
      url: '/tentang',
      path: '/tentang',
      title: 'Tentang InvestCount - Misi Literasi Deposito Jujur & Transparan | InvestCount',
      description:
        'Pelajari visi, prinsip independensi, dan profil pembuat InvestCount. Platform gratis tanpa iklan untuk menghitung bunga deposito bersih setelah pajak di Indonesia.',
      keywords: 'tentang investcount, kalkulator deposito indonesia, syubban fakhriya, literasi keuangan',
      ogType: 'website',
      ogImage: '/og/og-image.jpg'
    },
    {
      url: '/sumber-data',
      path: '/sumber-data',
      title: 'Sumber Data & Metodologi Perhitungan Bunga Deposito | InvestCount',
      description:
        'Transparansi formula perhitungan bunga deposito, rujukan suku bunga resmi perbankan, regulasi PPh 20%, dan batas penjaminan simpanan LPS (Lembaga Penjamin Simpanan).',
      keywords: 'sumber data deposito, metodologi investcount, regulasi lps, pajak deposito ojk',
      ogType: 'website',
      ogImage: '/og/og-image.jpg'
    },
    {
      url: '/blog',
      path: '/blog',
      title: 'Blog & Panduan Finansial Deposito Indonesia | InvestCount',
      description:
        'Kumpulan artikel edukatif, panduan praktis menghitung bunga deposito bank, perbandingan suku bunga, regulasi pajak PPh 20%, dan tips investasi cerdas.',
      keywords: 'blog deposito, panduan deposito, edukasi perbankan, simulasi deposito, bunga deposito 2026',
      ogType: 'website',
      ogImage: '/og/og-image.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Blog Edukasi & Panduan Deposito InvestCount',
        url: `${BASE_URL}/blog`,
        description: 'Kumpulan artikel edukatif seputar deposito dan keuangan perbankan di Indonesia.'
      }
    },
    ...blogPosts.map((post) => ({
      url: `/blog/${post.slug}`,
      path: `/blog/${post.slug}`,
      title: `${post.title} | InvestCount`,
      description: post.description,
      keywords: (post.keywords || []).join(', '),
      ogType: 'article',
      ogImage: post.image || '/assets/web_icon.svg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: post.image ? `${BASE_URL}${post.image}` : undefined,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Person',
          name: 'Syubban Fakhriya',
          url: 'https://www.linkedin.com/in/syubban-fakhriya/'
        },
        publisher: {
          '@type': 'Organization',
          name: 'InvestCount',
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/assets/web_icon.svg`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/blog/${post.slug}`
        }
      }
    }))
  ]

  for (const route of routes) {
    console.log(`  → Pre-rendering: ${route.url}`)
    const { html } = render(route.url)
    const fullCanonical = `${BASE_URL}${route.url === '/' ? '/' : route.url}`
    const fullOgImage = route.ogImage.startsWith('http') ? route.ogImage : `${BASE_URL}${route.ogImage}`

    let pageHtml = template
      // Inject rendered app HTML
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      // Replace Title
      .replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`)
      // Replace Meta Description
      .replace(
        /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta name="description" content="${route.description}" />`
      )
      // Replace Keywords
      .replace(
        /<meta\s+name=["']keywords["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta name="keywords" content="${route.keywords || ''}" />`
      )
      // Replace Canonical
      .replace(
        /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
        `<link rel="canonical" href="${fullCanonical}" />`
      )
      // Replace OG Title & Twitter Title
      .replace(
        /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:title" content="${route.title}" />`
      )
      .replace(
        /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta name="twitter:title" content="${route.title}" />`
      )
      // Replace OG Description & Twitter Description
      .replace(
        /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:description" content="${route.description}" />`
      )
      .replace(
        /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta name="twitter:description" content="${route.description}" />`
      )
      // Replace OG URL
      .replace(
        /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:url" content="${fullCanonical}" />`
      )
      // Replace OG Image & Twitter Image
      .replace(
        /<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:image" content="${fullOgImage}" />`
      )
      .replace(
        /<meta\s+name=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta name="twitter:image" content="${fullOgImage}" />`
      )
      // Replace OG Type
      .replace(
        /<meta\s+property=["']og:type["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:type" content="${route.ogType || 'website'}" />`
      )

    // Inject route specific schema if present
    if (route.schema) {
      const schemaScript = `\n  <script type="application/ld+json">\n${JSON.stringify(route.schema, null, 2)}\n  </script>`
      pageHtml = pageHtml.replace('</head>', `${schemaScript}\n</head>`)
    }

    // Determine target output directory
    if (route.url === '/') {
      fs.writeFileSync(path.resolve(distPath, 'index.html'), pageHtml, 'utf-8')
    } else {
      const targetDir = path.resolve(distPath, route.url.replace(/^\//, ''))
      fs.mkdirSync(targetDir, { recursive: true })
      fs.writeFileSync(path.resolve(targetDir, 'index.html'), pageHtml, 'utf-8')
    }
  }

  // Generate Sitemap XML
  console.log('📄 Generating sitemap.xml...')
  const sitemapUrls = [
    { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${BASE_URL}/kalkulator-deposito`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${BASE_URL}/blog`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${BASE_URL}/tentang`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${BASE_URL}/sumber-data`, priority: '0.7', changefreq: 'monthly' },
    ...blogPosts.map((post) => ({
      loc: `${BASE_URL}/blog/${post.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: post.date || TODAY
    }))
  ]

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${sitemapUrls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod || TODAY}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

  fs.writeFileSync(path.resolve(distPath, 'sitemap.xml'), sitemapXml, 'utf-8')
  fs.writeFileSync(path.resolve(rootDir, 'public/sitemap.xml'), sitemapXml, 'utf-8')

  // Clean up dist-ssr
  console.log('🧹 Cleaning up temporary SSR bundle...')
  fs.rmSync(path.resolve(rootDir, 'dist-ssr'), { recursive: true, force: true })

  console.log(`✅ Prerender complete! ${routes.length} pages generated into dist/ with full static HTML.`)
}

prerender().catch((err) => {
  console.error('❌ Prerender failed:', err)
  process.exit(1)
})

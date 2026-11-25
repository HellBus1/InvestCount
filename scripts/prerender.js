import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const BASE_URL = 'https://investtcount.mattrmost.com'
const TODAY = new Date().toISOString().split('T')[0]

const escapeHtmlAttr = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')

const toCanonicalUrl = (routePath) => {
  if (routePath === '/') return `${BASE_URL}/`
  const trimmed = routePath.replace(/^\/+|\/+$/g, '')
  return `${BASE_URL}/${trimmed}/`
}

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
  const { render, blogPosts, homeFAQs, BANK_CALCULATOR_PAGES } = await import(ssrBundlePath)

  const homeGraph = [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      name: 'InvestCount',
      url: `${BASE_URL}/`,
      inLanguage: 'id-ID',
      description:
        'Kalkulator deposito independen untuk menghitung bunga bersih setelah pajak 20% dan membandingkan 35 produk bank serta BPR di Indonesia.'
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'InvestCount',
      url: `${BASE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/assets/web_icon.svg`
      },
      founder: {
        '@type': 'Person',
        name: 'Syubban Fakhriya',
        url: 'https://www.linkedin.com/in/syubban-fakhriya/'
      },
      sameAs: [
        'https://github.com/HellBus1',
        'https://www.linkedin.com/in/syubban-fakhriya/'
      ]
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Kalkulator Deposito InvestCount',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      inLanguage: 'id-ID',
      url: `${BASE_URL}/`,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'IDR'
      },
      featureList: [
        'Hitung bunga deposito bersih setelah PPh Final 20%',
        'Perbandingan suku bunga 35 produk bank digital, konvensional, dan BPR',
        'Indikator otomatis Tingkat Bunga Penjaminan (TBP) LPS 2026',
        'Simulasi deposito Non-ARO, ARO, dan ARO+ (compounding)',
        'Perencana anggaran bulanan berbasis bunga deposito'
      ]
    },
    {
      '@type': 'HowTo',
      name: 'Cara Menghitung Bunga Deposito Setelah Pajak 20%',
      description:
        'Langkah praktis menghitung bunga bersih deposito berjangka di Indonesia menggunakan kalkulator deposito InvestCount.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Pilih tipe perpanjangan deposito',
          text: 'Pilih Non-ARO (cair langsung), ARO (perpanjang pokok), atau ARO+ (bunga berbunga majemuk).'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Masukkan nominal pokok, suku bunga, dan tenor',
          text: 'Isi jumlah simpanan (minimal Rp1 juta), suku bunga tahunan (% p.a.), dan tenor bulan (1, 3, 6, atau 12 bulan).'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Lihat hasil bunga bersih setelah pajak & cek status LPS',
          text: 'Sistem otomatis menghitung potongan PPh Final 20% untuk saldo di atas Rp7,5 juta (0% untuk saldo s.d. Rp7,5 juta) dan membandingkannya dengan batas TBP LPS.'
        }
      ]
    },
    {
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

  const routes = [
    {
      url: '/',
      title: 'Kalkulator Deposito 2026: Hitung Bunga Bersih & 35 Bank',
      description:
        'Hitung bunga deposito bersih setelah PPh 20% dan cek status LPS dari 35 bank & BPR (BCA, Mandiri, SeaBank, Krom). Gratis tanpa iklan — coba sekarang.',
      keywords:
        'kalkulator deposito, simulasi deposito, hitung bunga deposito, kalkulator bunga deposito, bunga deposito 2026, pajak deposito 20%, kalkulator deposito bpr, deposito bank digital, ARO deposito',
      ogType: 'website',
      ogImage: '/og/og-image.jpg',
      priority: '1.0',
      changefreq: 'weekly',
      lastmod: '2026-11-25',
      schemaGraph: homeGraph
    },
    {
      url: '/tentang',
      title: 'Tentang InvestCount – Kalkulator Deposito Independen Indonesia',
      description:
        'Mengenal prinsip dan pembuat InvestCount. Alat gratis tanpa iklan untuk menghitung bunga deposito bersih setelah pajak 20% dan membandingkan rate bank serta BPR.',
      keywords: 'tentang investcount, kalkulator deposito indonesia, syubban fakhriya, literasi keuangan',
      ogType: 'website',
      ogImage: '/og/og-image.jpg',
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: '2026-11-23',
      schemaGraph: [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Tentang Kami', item: `${BASE_URL}/tentang/` }
          ]
        },
        {
          '@type': 'AboutPage',
          name: 'Tentang InvestCount',
          url: `${BASE_URL}/tentang/`,
          inLanguage: 'id-ID'
        }
      ]
    },
    {
      url: '/sumber-data',
      title: 'Sumber Data & Formula Perhitungan Bunga Deposito | InvestCount',
      description:
        'Penjelasan formula perhitungan bunga deposito 30/365, rujukan RIPLAY resmi 35 bank & BPR, aturan PPh Final 20%, dan batas TBP LPS terbaru.',
      keywords: 'sumber data deposito, metodologi investcount, regulasi lps, pajak deposito ojk',
      ogType: 'website',
      ogImage: '/og/og-image.jpg',
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: '2026-11-23',
      schemaGraph: [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Sumber Data', item: `${BASE_URL}/sumber-data/` }
          ]
        },
        {
          '@type': 'WebPage',
          name: 'Sumber Data & Metodologi Perhitungan Bunga Deposito',
          url: `${BASE_URL}/sumber-data/`,
          inLanguage: 'id-ID'
        }
      ]
    },
    {
      url: '/blog',
      title: 'Blog & Panduan Deposito Bank Indonesia 2026 | InvestCount',
      description:
        'Kumpulan panduan praktis menghitung bunga deposito bank, perbandingan suku bunga 2026, regulasi pajak PPh 20%, ARO vs Non-ARO, dan batas penjaminan LPS.',
      keywords: 'blog deposito, panduan deposito, edukasi perbankan, simulasi deposito, bunga deposito 2026',
      ogType: 'website',
      ogImage: '/og/og-image.jpg',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: '2026-11-25',
      schemaGraph: [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog & Panduan', item: `${BASE_URL}/blog/` }
          ]
        },
        {
          '@type': 'CollectionPage',
          name: 'Blog Edukasi & Panduan Deposito InvestCount',
          url: `${BASE_URL}/blog/`,
          inLanguage: 'id-ID',
          description: 'Kumpulan artikel edukatif seputar deposito dan keuangan perbankan di Indonesia.'
        }
      ]
    },
    ...BANK_CALCULATOR_PAGES.map((bankPage) => {
      const canonical = toCanonicalUrl(`/kalkulator-deposito/${bankPage.slug}`)
      return {
        url: `/kalkulator-deposito/${bankPage.slug}`,
        title: bankPage.title,
        description: bankPage.metaDescription,
        keywords: bankPage.keywords.join(', '),
        ogType: 'website',
        ogImage: '/og/og-image.jpg',
        priority: '0.85',
        changefreq: 'weekly',
        lastmod: '2026-11-25',
        schemaGraph: [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Kalkulator Deposito',
                item: `${BASE_URL}/`
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: `Kalkulator Deposito ${bankPage.shortName}`,
                item: canonical
              }
            ]
          },
          {
            '@type': 'SoftwareApplication',
            name: bankPage.title,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            inLanguage: 'id-ID',
            url: canonical,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'IDR'
            }
          },
          {
            '@type': 'FAQPage',
            mainEntity: bankPage.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          }
        ]
      }
    }),
    ...blogPosts.map((post) => {
      const canonical = toCanonicalUrl(`/blog/${post.slug}`)
      return {
        url: `/blog/${post.slug}`,
        title: post.title.length > 48 ? post.title : `${post.title} | InvestCount`,
        description: post.description,
        keywords: (post.keywords || []).join(', '),
        ogType: 'article',
        ogImage: post.image || '/og/og-image.jpg',
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: post.date || TODAY,
        schemaGraph: [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${BASE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog/` },
              { '@type': 'ListItem', position: 3, name: post.title, item: canonical }
            ]
          },
          {
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: post.image ? `${BASE_URL}${post.image}` : undefined,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: 'id-ID',
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
              '@id': canonical
            }
          }
        ]
      }
    })
  ]

  for (const route of routes) {
    const normalizedRoutePath =
      route.url === '/' ? '/' : `/${route.url.replace(/^\/+|\/+$/g, '')}/`
    console.log(`  → Pre-rendering: ${normalizedRoutePath}`)
    const { html } = render(normalizedRoutePath)
    const fullCanonical = toCanonicalUrl(route.url)
    const fullOgImage = route.ogImage.startsWith('http')
      ? route.ogImage
      : `${BASE_URL}${route.ogImage}`

    const safeTitle = escapeHtmlAttr(route.title)
    const safeDesc = escapeHtmlAttr(route.description)
    const safeKeywords = escapeHtmlAttr(route.keywords || '')

    let pageHtml = template
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
      .replace(
        /<meta\s+name=["']description["'][\s\S]*?\/>/i,
        `<meta name="description" content="${safeDesc}" />`
      )
      .replace(
        /<meta\s+name=["']keywords["'][\s\S]*?\/>/i,
        `<meta name="keywords" content="${safeKeywords}" />`
      )
      .replace(
        /<link\s+rel=["']canonical["'][\s\S]*?\/>/i,
        `<link rel="canonical" href="${fullCanonical}" />`
      )
      .replace(
        /<link\s+rel=["']alternate["']\s+hreflang=["']id-ID["'][\s\S]*?\/>/i,
        `<link rel="alternate" hreflang="id-ID" href="${fullCanonical}" />`
      )
      .replace(
        /<link\s+rel=["']alternate["']\s+hreflang=["']x-default["'][\s\S]*?\/>/i,
        `<link rel="alternate" hreflang="x-default" href="${fullCanonical}" />`
      )
      .replace(
        /<meta\s+property=["']og:title["'][\s\S]*?\/>/i,
        `<meta property="og:title" content="${safeTitle}" />`
      )
      .replace(
        /<meta\s+name=["']twitter:title["'][\s\S]*?\/>/i,
        `<meta name="twitter:title" content="${safeTitle}" />`
      )
      .replace(
        /<meta\s+property=["']og:description["'][\s\S]*?\/>/i,
        `<meta property="og:description" content="${safeDesc}" />`
      )
      .replace(
        /<meta\s+name=["']twitter:description["'][\s\S]*?\/>/i,
        `<meta name="twitter:description" content="${safeDesc}" />`
      )
      .replace(
        /<meta\s+property=["']og:url["'][\s\S]*?\/>/i,
        `<meta property="og:url" content="${fullCanonical}" />`
      )
      .replace(
        /<meta\s+property=["']og:image["'][\s\S]*?\/>/i,
        `<meta property="og:image" content="${fullOgImage}" />`
      )
      .replace(
        /<meta\s+name=["']twitter:image["'][\s\S]*?\/>/i,
        `<meta name="twitter:image" content="${fullOgImage}" />`
      )
      .replace(
        /<meta\s+property=["']og:type["'][\s\S]*?\/>/i,
        `<meta property="og:type" content="${route.ogType || 'website'}" />`
      )

    if (route.schemaGraph) {
      const schemaPayload = {
        '@context': 'https://schema.org',
        '@graph': route.schemaGraph
      }
      const schemaScript = `\n  <script id="dynamic-seo-schema" type="application/ld+json">\n${JSON.stringify(schemaPayload, null, 2)}\n  </script>`
      pageHtml = pageHtml.replace('</head>', `${schemaScript}\n</head>`)
    }

    if (route.url === '/') {
      fs.writeFileSync(path.resolve(distPath, 'index.html'), pageHtml, 'utf-8')
    } else {
      const targetDir = path.resolve(distPath, route.url.replace(/^\/+|\/+$/g, ''))
      fs.mkdirSync(targetDir, { recursive: true })
      fs.writeFileSync(path.resolve(targetDir, 'index.html'), pageHtml, 'utf-8')
    }
  }

  console.log('📄 Generating sitemap.xml...')
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (item) => `  <url>
    <loc>${toCanonicalUrl(item.url)}</loc>
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

  console.log('🧹 Cleaning up temporary SSR bundle...')
  fs.rmSync(path.resolve(rootDir, 'dist-ssr'), { recursive: true, force: true })

  console.log(
    `✅ Prerender complete! ${routes.length} pages generated into dist/ with full static HTML.`
  )
}

prerender().catch((err) => {
  console.error('❌ Prerender failed:', err)
  process.exit(1)
})

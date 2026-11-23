export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  image?: string
  keywords?: string[]
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'cara-menghitung-bunga-deposito',
    title: 'Cara Menghitung Bunga Deposito Bank (Rumus, Pajak 20% & Contoh Kasus)',
    description:
      'Panduan praktis menghitung bunga deposito bank di Indonesia setelah potongan PPh Final 20%, lengkap dengan rumus bulanan, harian, dan simulasi nominal.',
    date: '2026-11-23',
    readTime: '6 menit',
    category: 'Dasar Deposito',
    image: '/assets/blog/cara-menghitung-bunga-deposito.webp',
    keywords: [
      'cara menghitung bunga deposito',
      'hitung bunga deposito',
      'rumus bunga deposito',
      'perhitungan bunga deposito',
      'pajak deposito 20%'
    ]
  },
  {
    slug: 'bunga-deposito-bank-indonesia-2026',
    title: 'Daftar Suku Bunga Deposito Bank Tertinggi 2026: Bank Umum vs Bank Digital',
    description:
      'Perbandingan suku bunga deposito bank konvensional, bank digital, dan BPR terbaru 2026 beserta batas Tingkat Bunga Penjaminan (TBP) LPS.',
    date: '2026-11-23',
    readTime: '7 menit',
    category: 'Perbandingan Bank',
    image: '/assets/blog/bunga-deposito-bank-indonesia-2026.webp',
    keywords: [
      'bunga deposito',
      'suku bunga deposito',
      'bunga deposito tertinggi',
      'bunga deposito bank',
      'deposito online'
    ]
  },
  {
    slug: 'deposito-bpr-vs-bank-umum',
    title: 'Deposito BPR vs Bank Umum: Bunga Lebih Tinggi, Apakah Tetap Aman?',
    description:
      'Perbandingan bunga deposito BPR (dijamin LPS hingga 6,25% p.a.) vs bank umum (3,75% p.a.), lengkap dengan pengawasan OJK dan syarat 3T LPS.',
    date: '2026-11-23',
    readTime: '6 menit',
    category: 'Perbandingan Bank',
    image: '/assets/blog/deposito-bpr-vs-bank-umum.webp',
    keywords: [
      'kalkulator deposito bpr',
      'deposito bpr',
      'bunga deposito bpr',
      'bpr vs bank umum',
      'jaminan lps bpr'
    ]
  },
  {
    slug: 'deposito-aro-vs-non-aro',
    title: 'Mengenal Deposito ARO, Non-ARO, dan ARO+: Mana yang Paling Menguntungkan?',
    description:
      'Penjelasan sistem perpanjangan otomatis Automatic Roll Over (ARO) pada deposito, perbedaannya dengan ARO+ dan Non-ARO, serta efek bunga berbunga.',
    date: '2026-11-23',
    readTime: '5 menit',
    category: 'Dasar Deposito',
    image: '/assets/blog/deposito-aro-vs-non-aro.webp',
    keywords: [
      'ARO deposito',
      'perpanjangan otomatis deposito',
      'deposito ARO non ARO',
      'compounding deposito'
    ]
  },
  {
    slug: 'pajak-deposito-20-persen',
    title: 'Pajak Bunga Deposito 20%: Aturan PPh Final, Pengecualian & Cara Hitungnya',
    description:
      'Aturan pajak bunga deposito berdasarkan PPh Pasal 4 ayat 2, batas simpanan bebas pajak Rp7,5 juta, contoh potongan, dan cara lapor di SPT.',
    date: '2026-11-23',
    readTime: '5 menit',
    category: 'Regulasi & Pajak',
    image: '/assets/blog/pajak-deposito-20-persen.webp',
    keywords: [
      'pajak deposito',
      'pajak bunga deposito',
      'PPh final deposito',
      'pajak deposito 20 persen'
    ]
  },
  {
    slug: 'inflasi-dan-deposito',
    title: 'Pengaruh Inflasi terhadap Bunga Deposito: Cara Hitung Return Riil',
    description:
      'Cara menghitung return riil deposito setelah pajak 20% dan inflasi tahunan, plus strategi menjaga daya beli dana simpanan Anda.',
    date: '2026-11-23',
    readTime: '6 menit',
    category: 'Strategi Investasi',
    image: '/assets/blog/inflasi-dan-deposito.webp',
    keywords: [
      'inflasi dan deposito',
      'return riil deposito',
      'daya beli uang',
      'investasi lawan inflasi'
    ]
  }
]

export const getBlogPost = (slug: string): BlogPostMeta | undefined => {
  return blogPosts.find((p) => p.slug === slug)
}

export const getAllBlogPosts = (): BlogPostMeta[] => {
  return blogPosts
}

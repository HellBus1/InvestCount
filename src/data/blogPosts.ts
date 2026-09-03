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
      'Panduan lengkap dan praktis cara menghitung bunga deposito bank di Indonesia setelah dipotong pajak 20%. Disertai formula, tabel simulasi, dan contoh perhitungan riil.',
    date: '2026-09-04',
    readTime: '8 menit',
    category: 'Dasar Deposito',
    image: '/assets/blog/cara-hitung-deposito.jpg',
    keywords: [
      'cara menghitung bunga deposito',
      'hitung bunga deposito',
      'rumus bunga deposito',
      'perhitungan bunga deposito',
      'pajak deposito 20%'
    ]
  },
  {
    slug: 'simulasi-deposito-lengkap',
    title: 'Simulasi Deposito Bank 2026: Contoh Bunga 10 Juta, 50 Juta, dan 100 Juta',
    description:
      'Simulasi perhitungan bunga deposito berbagai nominal (10 juta, 50 juta, 100 juta) pada tenor 1, 3, 6, dan 12 bulan setelah dipotong pajak PPh 20%.',
    date: '2026-09-04',
    readTime: '9 menit',
    category: 'Simulasi & Kalkulator',
    image: '/assets/blog/cara-hitung-deposito.jpg',
    keywords: [
      'simulasi deposito',
      'deposito 10 juta dapat bunga berapa',
      'simulasi bunga deposito',
      'hitungan deposito',
      'contoh perhitungan deposito'
    ]
  },
  {
    slug: 'bunga-deposito-bank-indonesia-2026',
    title: 'Daftar Suku Bunga Deposito Bank Tertinggi 2026: Bank Umum vs Bank Digital',
    description:
      'Perbandingan suku bunga deposito bank umum (BCA, Mandiri, BRI, BNI) vs bank digital (Seabank, Krom, Jago) terupdate 2026 beserta batas penjaminan LPS.',
    date: '2026-09-04',
    readTime: '10 menit',
    category: 'Perbandingan Bank',
    image: '/assets/blog/deposito-vs-tabungan.jpg',
    keywords: [
      'bunga deposito',
      'suku bunga deposito',
      'bunga deposito tertinggi',
      'bunga deposito bank',
      'deposito online'
    ]
  },
  {
    slug: 'kalkulator-deposito-panduan',
    title: 'Panduan Menggunakan Kalkulator Deposito: Hitung Bunga Bersih Akurat',
    description:
      'Cara efektif memanfaatkan kalkulator deposito online untuk membandingkan return antar bank di Indonesia, menghitung bunga bersih, dan simulasi roll-over.',
    date: '2026-09-04',
    readTime: '7 menit',
    category: 'Simulasi & Kalkulator',
    image: '/assets/blog/cara-hitung-deposito.jpg',
    keywords: [
      'kalkulator deposito',
      'kalkulator bunga deposito',
      'hitung deposito online',
      'calculator deposito'
    ]
  },
  {
    slug: 'deposito-aro-vs-non-aro',
    title: 'Mengenal Deposito ARO, Non-ARO, dan ARO+: Mana yang Paling Menguntungkan?',
    description:
      'Penjelasan lengkap sistem perpanjangan otomatis Automatic Roll Over (ARO) pada deposito, perbedaannya dengan ARO bunga dan Non-ARO serta efek compounding.',
    date: '2026-09-04',
    readTime: '7 menit',
    category: 'Dasar Deposito',
    image: '/assets/blog/deposito-vs-tabungan.jpg',
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
      'Semua hal tentang pajak bunga deposito di Indonesia berdasarkan PPh Pasal 4 ayat 2. Ketahui batas nominal bebas pajak dan contoh potongannya.',
    date: '2026-09-04',
    readTime: '6 menit',
    category: 'Regulasi & Pajak',
    image: '/assets/blog/cara-hitung-deposito.jpg',
    keywords: [
      'pajak deposito',
      'pajak bunga deposito',
      'PPh final deposito',
      'pajak deposito 20 persen'
    ]
  },
  {
    slug: 'deposito-vs-tabungan',
    title: 'Deposito vs Tabungan: Perbedaan, Keuntungan & Mana yang Lebih Cocok?',
    description:
      'Analisis mendalam perbandingan deposito berjangka dan tabungan bank reguler. Ketahui perbedaan suku bunga, likuiditas, biaya admin, dan tips alokasi dana.',
    date: '2026-09-04',
    readTime: '8 menit',
    category: 'Dasar Deposito',
    image: '/assets/blog/deposito-vs-tabungan.jpg',
    keywords: [
      'deposito vs tabungan',
      'perbedaan deposito dan tabungan',
      'tabungan vs deposito',
      'keuntungan deposito'
    ]
  },
  {
    slug: 'inflasi-dan-deposito',
    title: 'Pengaruh Inflasi terhadap Bunga Deposito: Cara Hitung Return Riil',
    description:
      'Pelajari bagaimana inflasi menggerus nilai riil bunga deposito Anda dan strategi cerdas mengamankan daya beli uang dengan compounding ARO dan bank digital.',
    date: '2026-09-04',
    readTime: '8 menit',
    category: 'Strategi Investasi',
    image: '/assets/blog/inflasi-deposito.jpg',
    keywords: [
      'inflasi dan deposito',
      'return riil deposito',
      'daya beli uang',
      'investasi lawan inflasi'
    ]
  },
  {
    slug: 'deposito-bpr-vs-bank-umum',
    title: 'Deposito BPR vs Bank Umum: Bunga Lebih Tinggi, Apakah Tetap Aman?',
    description:
      'Perbandingan bunga deposito BPR (hingga 6.75%+) vs bank umum. Pahami risiko, regulasi OJK, dan ketentuan penjaminan LPS agar simpanan tetap aman.',
    date: '2026-09-04',
    readTime: '8 menit',
    category: 'Perbandingan Bank',
    image: '/assets/blog/deposito-vs-tabungan.jpg',
    keywords: [
      'kalkulator deposito bpr',
      'deposito bpr',
      'bunga deposito bpr',
      'bpr vs bank umum',
      'jaminan lps bpr'
    ]
  },
  {
    slug: 'strategi-tangga-deposito',
    title: 'Strategi Tangga Deposito (Deposit Laddering): Maksimalkan Bunga & Likuiditas',
    description:
      'Panduan menerapkan metode tangga deposito (laddering) untuk mendapatkan bunga maksimal tanpa mengorbankan fleksibilitas pencairan dana darurat.',
    date: '2026-09-04',
    readTime: '7 menit',
    category: 'Strategi Investasi',
    image: '/assets/blog/inflasi-deposito.jpg',
    keywords: [
      'strategi tangga deposito',
      'deposit laddering',
      'strategi deposito',
      'likuiditas deposito'
    ]
  }
]

export const getBlogPost = (slug: string): BlogPostMeta | undefined => {
  return blogPosts.find((p) => p.slug === slug)
}

export const getAllBlogPosts = (): BlogPostMeta[] => {
  return blogPosts
}

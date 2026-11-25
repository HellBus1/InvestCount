import bankDepositoDatas from './bankDepositos.json'
import { BankCategory, LPS_RATES, evaluateLpsStatus, formatPercentId } from '@/constants/lpsRates'

export interface BankDepositTier {
  bankName: string
  category: BankCategory
  logoUrl: string
  website: string
  minBalance: number
  rates: Record<'1' | '3' | '6' | '12', number>
}

export interface BankPageFAQ {
  question: string
  answer: string
}

export interface BankCalculatorPageConfig {
  slug: string
  shortName: string
  badgeLabel: string
  title: string
  metaDescription: string
  h1: string
  directAnswer: string
  matchBankNames: string[]
  defaultBankName: string
  defaultPrincipal: string
  defaultTenor: '1' | '3' | '6' | '12'
  highlights: string[]
  relatedSlugs: string[]
  relatedBlogSlugs: { slug: string; label: string }[]
  keywords: string[]
  faqs: BankPageFAQ[]
}

const typedData = bankDepositoDatas as BankDepositTier[]

export const getTiersForBankPage = (config: BankCalculatorPageConfig): BankDepositTier[] => {
  return typedData.filter((entry) => config.matchBankNames.includes(entry.bankName))
}

export const BANK_CALCULATOR_PAGES: BankCalculatorPageConfig[] = [
  {
    slug: 'bca',
    shortName: 'BCA',
    badgeLabel: 'Bank Konvensional & Digital (Grup BCA)',
    title: 'Kalkulator Deposito BCA 2026: Bunga Bersih & Pajak 20%',
    metaDescription:
      'Hitung bunga deposito BCA & blu by BCA Digital setelah pajak 20% (tenor 1–12 bulan). Cek tabel bunga terbaru 2026 & status penjaminan LPS gratis.',
    h1: 'Kalkulator Deposito BCA: Hitung Bunga Bersih & Suku Bunga 2026',
    directAnswer:
      'Suku bunga Deposito Berjangka BCA tahun 2026 berkisar 2,50%–3,10% p.a. (minimal Rp8 juta), seluruhnya dijamin penuh oleh LPS (≤ 3,75% p.a. hingga Rp2 Miliar). Untuk imbal hasil lebih tinggi di ekosistem BCA, bluDeposit menawarkan 3,50%–4,75% p.a. mulai Rp1 juta.',
    matchBankNames: ['Deposito Berjangka by BCA', 'blu by BCA Digital'],
    defaultBankName: 'Deposito Berjangka by BCA',
    defaultPrincipal: '50,000,000',
    defaultTenor: '6',
    highlights: [
      'Seluruh tier Deposito Berjangka BCA (2,50%–3,10% p.a.) berada di bawah batas TBP LPS Bank Umum 3,75% p.a., sehingga pokok dan bunga dijamin LPS hingga Rp2 Miliar.',
      'Di aplikasi blu by BCA Digital, tier Rp1 juta–Rp99 juta (3,50%–3,75% p.a.) masih dijamin LPS, sedangkan tier ≥ Rp100 juta (4,00%–4,75% p.a.) melampaui batas TBP LPS.',
      'Simpanan di atas Rp7,5 juta otomatis dipotong PPh Final 20% saat bunga cair ke rekening tahapan.'
    ],
    relatedSlugs: ['mandiri', 'ocbc', 'bpr'],
    relatedBlogSlugs: [
      {
        slug: 'cara-menghitung-bunga-deposito',
        label: 'Rumus Hitung Bunga Deposito Setelah Pajak'
      },
      {
        slug: 'bunga-deposito-bank-indonesia-2026',
        label: 'Daftar Bunga Deposito Bank Tertinggi 2026'
      }
    ],
    keywords: [
      'kalkulator deposito bca',
      'simulasi deposito bca',
      'bunga deposito bca 2026',
      'deposito bca 100 juta dapat berapa',
      'bludeposit bca digital'
    ],
    faqs: [
      {
        question: 'Deposito BCA Rp100 juta 1 bulan dapat bunga bersih berapa?',
        answer:
          'Pada bunga Deposito BCA 2,75% p.a. (tenor 1 bulan), bunga kotor sekitar Rp226.027 (basis 30/365 hari). Setelah dipotong PPh Final 20%, bunga bersih yang diterima sekitar Rp180.822 per bulan.'
      },
      {
        question: 'Berapa minimal penempatan deposito BCA dan blu by BCA Digital?',
        answer:
          'Minimal penempatan Deposito Berjangka BCA adalah Rp8.000.000 melalui myBCA atau kantor cabang, sedangkan bluDeposit di aplikasi blu by BCA Digital bisa dimulai dari Rp1.000.000.'
      },
      {
        question: 'Apakah deposito BCA dan blu dijamin LPS?',
        answer:
          'Deposito Berjangka BCA dijamin penuh oleh LPS hingga Rp2 Miliar karena seluruh suku bunganya ≤ 3,75% p.a. Untuk bluDeposit, tier awal ≤ 3,75% p.a. tetap dijamin LPS, sementara tier ≥ Rp100 juta (4,00%–4,75% p.a.) berada di atas TBP LPS.'
      }
    ]
  },
  {
    slug: 'mandiri',
    shortName: 'Bank Mandiri',
    badgeLabel: 'Bank BUMN & Livin’ by Mandiri',
    title: 'Kalkulator Deposito Mandiri 2026: Bunga Bersih & Livin',
    metaDescription:
      'Simulasi bunga deposito Bank Mandiri & aplikasi Livin setelah PPh 20% (tenor 1, 3, 6, 12 bulan). Lihat tabel suku bunga resmi 2026 & jaminan LPS.',
    h1: 'Kalkulator Deposito Bank Mandiri: Simulasi Bunga Bersih & Livin’ 2026',
    directAnswer:
      'Suku bunga Deposito Rupiah Bank Mandiri dan Livin’ by Mandiri tahun 2026 berada di kisaran 2,25%–2,50% p.a. (mulai Rp1 juta via aplikasi Livin’ atau Rp10 juta di cabang). Karena tidak melebihi TBP LPS 3,75% p.a., simpanan hingga Rp2 Miliar dijamin penuh oleh LPS.',
    matchBankNames: ['Deposito Rupiah by Bank Mandiri', 'Livin by Bank Mandiri'],
    defaultBankName: 'Livin by Bank Mandiri',
    defaultPrincipal: '50,000,000',
    defaultTenor: '6',
    highlights: [
      'Pembukaan via aplikasi Livin’ by Mandiri dapat dimulai dari Rp1.000.000, jauh lebih terjangkau dibanding minimal Rp10.000.000 di kantor cabang.',
      'Tenor 6 dan 12 bulan memberikan suku bunga tertinggi di Mandiri (2,50% p.a. bruto atau 2,00% p.a. bersih setelah PPh 20%).',
      'Seluruh produk deposito rupiah reguler Mandiri memenuhi batas TBP LPS Bank Umum 3,75% p.a.'
    ],
    relatedSlugs: ['bri', 'bni', 'bca'],
    relatedBlogSlugs: [
      { slug: 'deposito-aro-vs-non-aro', label: 'Perbedaan Deposito ARO, Non-ARO, dan ARO+' },
      { slug: 'pajak-deposito-20-persen', label: 'Aturan Pajak Bunga Deposito 20% & Bebas Pajak' }
    ],
    keywords: [
      'kalkulator deposito mandiri',
      'simulasi deposito mandiri',
      'bunga deposito livin mandiri',
      'bunga deposito bank mandiri 2026'
    ],
    faqs: [
      {
        question: 'Berapa bunga deposito Livin’ by Mandiri untuk saldo Rp10 juta?',
        answer:
          'Dengan bunga 2,50% p.a. (tenor 6 atau 12 bulan) dan potongan PPh Final 20%, saldo Rp10 juta menghasilkan bunga bersih sekitar Rp16.438 per bulan (basis 30/365 hari) atau sekitar Rp200.000 per tahun.'
      },
      {
        question: 'Apakah deposito Rp5 juta di Livin’ Mandiri dipotong pajak?',
        answer:
          'Tidak, selama total gabungan saldo deposito dan tabungan Anda di Bank Mandiri tidak melebihi Rp7.500.000 (bebas PPh 0% sesuai PP No. 131 Tahun 2000).'
      },
      {
        question: 'Apakah deposito Bank Mandiri mendukung ARO?',
        answer:
          'Ya, Livin’ by Mandiri menyediakan pilihan Non-ARO, ARO (perpanjang pokok), maupun ARO+ (pokok ditambah bunga bersih digulung otomatis).'
      }
    ]
  },
  {
    slug: 'bri',
    shortName: 'BRI',
    badgeLabel: 'Bank BUMN & BRImo',
    title: 'Kalkulator Deposito BRI 2026: Bunga Bersih & BRImo',
    metaDescription:
      'Hitung estimasi bunga bersih Deposito BRI & aplikasi BRImo setelah pajak 20%. Cek tabel suku bunga tenor 1–12 bulan terbaru 2026 & status LPS.',
    h1: 'Kalkulator Deposito BRI: Simulasi Bunga Bersih & BRImo 2026',
    directAnswer:
      'Deposito Rupiah BRI dan Deposito Digital BRImo menawarkan suku bunga 2,50%–3,00% p.a. (mulai Rp5 juta di BRImo atau Rp10 juta di cabang). Seluruh tenor berada di bawah batas TBP LPS 3,75% p.a., sehingga dijamin penuh oleh LPS hingga plafon Rp2 Miliar per nasabah.',
    matchBankNames: ['Deposito Rupiah by Bank BRI', 'BRImo by BRI'],
    defaultBankName: 'BRImo by BRI',
    defaultPrincipal: '50,000,000',
    defaultTenor: '3',
    highlights: [
      'Tenor 1, 3, dan 6 bulan di BRI memberikan bunga lebih tinggi (3,00% p.a.) dibanding tenor 12 bulan (2,50% p.a.).',
      'Pembukaan lewat aplikasi BRImo cukup dengan minimal saldo Rp5.000.000 tanpa perlu datang ke unit kerja.',
      'Untuk anak usaha digital grup BRI dengan bunga lebih tinggi (4,00%–5,00% p.a., Non-LPS), tersedia Bank Raya.'
    ],
    relatedSlugs: ['mandiri', 'bni', 'bca'],
    relatedBlogSlugs: [
      { slug: 'cara-menghitung-bunga-deposito', label: 'Cara Menghitung Bunga Deposito Bank' },
      { slug: 'deposito-aro-vs-non-aro', label: 'Panduan Lengkap ARO vs Non-ARO' }
    ],
    keywords: [
      'kalkulator deposito bri',
      'simulasi deposito bri',
      'bunga deposito brimo',
      'bunga deposito bri 2026'
    ],
    faqs: [
      {
        question: 'Berapa bunga bersih deposito BRI Rp100 juta per bulan?',
        answer:
          'Pada tenor 1–6 bulan dengan bunga 3,00% p.a., bunga kotor sekitar Rp246.575 per 30 hari. Setelah dipotong PPh Final 20%, hasil bersihnya sekitar Rp197.260 per bulan.'
      },
      {
        question: 'Mengapa bunga tenor 1–6 bulan BRI lebih tinggi dari 12 bulan?',
        answer:
          'Berdasarkan RIPLAY BRI terbaru, tenor 1, 3, dan 6 bulan dipatok 3,00% p.a. sedangkan 12 bulan 2,50% p.a. Menempatkan di tenor 3 atau 6 bulan dengan skema ARO memberi hasil bersih lebih optimal.'
      },
      {
        question: 'Apakah deposito BRImo aman dan dijamin LPS?',
        answer:
          'Ya. Suku bunga 2,50%–3,00% p.a. berada di bawah batas penjaminan LPS 3,75% p.a., sehingga dijamin penuh hingga Rp2 Miliar per nasabah.'
      }
    ]
  },
  {
    slug: 'bni',
    shortName: 'BNI',
    badgeLabel: 'Bank BUMN, Wondr & Hibank',
    title: 'Kalkulator Deposito BNI 2026: Bunga Bersih & Wondr',
    metaDescription:
      'Hitung bunga bersih Deposito BNI, Wondr by BNI, dan Hibank setelah pajak 20%. Bandingkan tenor 1–12 bulan beserta status penjaminan LPS 2026.',
    h1: 'Kalkulator Deposito BNI: Simulasi Bunga Bersih, Wondr & Hibank 2026',
    directAnswer:
      'Deposito Rupiah BNI dan Wondr by BNI menawarkan suku bunga 2,25%–2,75% p.a. yang 100% dijamin LPS (≤ 3,75% p.a.). Dalam grup BNI terdapat pula bank digital Hibank dengan bunga 5,75%–6,00% p.a. mulai Rp1 juta, namun bunganya tidak dijamin LPS karena melebihi batas TBP.',
    matchBankNames: ['Deposito Rupiah by Bank BNI', 'Wondr by BNI', 'Hibank by BNI'],
    defaultBankName: 'Wondr by BNI',
    defaultPrincipal: '50,000,000',
    defaultTenor: '6',
    highlights: [
      'Tenor 6 bulan di BNI dan Wondr menawarkan rate tertinggi untuk kategori dijamin LPS di BNI (2,75% p.a. bruto / 2,20% p.a. bersih).',
      'Wondr by BNI melayani penempatan mulai Rp5.000.000, sementara pembukaan reguler cabang mulai Rp10.000.000.',
      'Hibank (anak usaha digital BNI) menawarkan 5,75%–6,00% p.a., tetapi statusnya Non-LPS karena berada di atas batas 3,75% p.a.'
    ],
    relatedSlugs: ['mandiri', 'bri', 'bca'],
    relatedBlogSlugs: [
      {
        slug: 'bunga-deposito-bank-indonesia-2026',
        label: 'Perbandingan Bunga Bank Umum vs Digital'
      },
      { slug: 'pajak-deposito-20-persen', label: 'Aturan PPh Final 20% Bunga Deposito' }
    ],
    keywords: [
      'kalkulator deposito bni',
      'bni deposito simulation',
      'simulasi deposito bni',
      'bunga deposito wondr bni'
    ],
    faqs: [
      {
        question: 'Tenor berapa yang paling menguntungkan di Deposito BNI?',
        answer:
          'Tenor 6 bulan memberikan suku bunga tertinggi di BNI & Wondr yaitu 2,75% p.a. (dibanding 2,25% di 1 bulan dan 2,50% di 3 serta 12 bulan), dan tetap dijamin penuh oleh LPS.'
      },
      {
        question: 'Apa beda Deposito Wondr BNI dan Hibank?',
        answer:
          'Wondr adalah aplikasi utama PT Bank Negara Indonesia (Persero) Tbk dengan bunga deposito ≤ 2,75% p.a. (Dijamin LPS). Hibank adalah anak usaha bank digital grup BNI dengan bunga 5,75%–6,00% p.a. (Tidak Dijamin LPS karena > 3,75%).'
      },
      {
        question: 'Berapa pajak deposito BNI?',
        answer:
          'Sesuai PP No. 131 Tahun 2000, simpanan di atas Rp7,5 juta dikenakan PPh Final 20% dari bunga kotor, sedangkan simpanan ≤ Rp7,5 juta bebas pajak (0%).'
      }
    ]
  },
  {
    slug: 'seabank',
    shortName: 'SeaBank',
    badgeLabel: 'Bank Digital Populer',
    title: 'Kalkulator Deposito SeaBank 2026: Bunga 6% & Cek LPS',
    metaDescription:
      'Hitung bunga bersih deposito SeaBank (4,75%–6,00% p.a.) setelah pajak 20% mulai Rp1 juta. Cek simulasi bulanan dan status penjaminan LPS terbaru.',
    h1: 'Kalkulator Deposito SeaBank: Hitung Bunga Bersih 4,75%–6% & Status LPS',
    directAnswer:
      'Deposito SeaBank menawarkan suku bunga 4,75% p.a. (1 bulan) hingga 6,00% p.a. (12 bulan) dengan minimal penempatan Rp1.000.000. Setelah dipotong PPh Final 20%, imbal hasil bersihnya setara 3,80%–4,80% p.a. Karena melampaui TBP LPS Bank Umum (3,75% p.a.), deposito SeaBank tidak dijamin LPS.',
    matchBankNames: ['SeaBank by SeaBank Indonesia'],
    defaultBankName: 'SeaBank by SeaBank Indonesia',
    defaultPrincipal: '25,000,000',
    defaultTenor: '6',
    highlights: [
      'Kenaikan bunga bertahap per tenor: 4,75% (1 bln), 5,25% (3 bln), 5,75% (6 bln), dan 6,00% p.a. (12 bln) mulai Rp1 juta.',
      'Seluruh tenor berada di atas TBP LPS Bank Umum 3,75% p.a. sehingga berstatus Tidak Dijamin LPS.',
      'Jika Anda menginginkan bunga 5,50%–6,25% p.a. yang tetap dijamin penuh oleh LPS, pertimbangkan deposito BPR berizin OJK.'
    ],
    relatedSlugs: ['krom-bank', 'bank-jago', 'bpr'],
    relatedBlogSlugs: [
      { slug: 'deposito-bpr-vs-bank-umum', label: 'Alternatif BPR 6,25% yang Dijamin LPS' },
      {
        slug: 'bunga-deposito-bank-indonesia-2026',
        label: 'Daftar Bunga Bank Digital Tertinggi 2026'
      }
    ],
    keywords: [
      'kalkulator deposito seabank',
      'simulasi deposito seabank',
      'bunga deposito seabank 2026',
      'apakah deposito seabank dijamin lps'
    ],
    faqs: [
      {
        question: 'Deposito SeaBank Rp10 juta 1 bulan dapat bunga bersih berapa?',
        answer:
          'Dengan bunga 4,75% p.a. (tenor 1 bulan) dan potongan PPh Final 20%, saldo Rp10 juta menghasilkan bunga bersih sekitar Rp31.233 per 30 hari.'
      },
      {
        question: 'Apakah deposito SeaBank dijamin LPS?',
        answer:
          'SeaBank adalah bank peserta LPS berizin OJK, namun produk depositonya menawarkan bunga 4,75%–6,00% p.a. yang melebihi batas TBP LPS Bank Umum (3,75% p.a.). Sesuai aturan syarat 3T, simpanan dengan bunga di atas TBP tidak dijamin LPS.'
      },
      {
        question: 'Apakah deposito Rp1 juta sampai Rp7,5 juta di SeaBank kena pajak?',
        answer:
          'Selama total saldo tabungan dan deposito Anda di SeaBank tidak melebihi Rp7.500.000, bunganya bebas PPh Final (0%). Jika total saldo di SeaBank melewati Rp7,5 juta, berlaku potongan PPh Final 20%.'
      }
    ]
  },
  {
    slug: 'krom-bank',
    shortName: 'Krom Bank',
    badgeLabel: 'Bank Digital Bunga Tinggi',
    title: 'Kalkulator Deposito Krom Bank 2026: Bunga 7,5% & LPS',
    metaDescription:
      'Simulasi bunga bersih deposito Krom Bank (6,75%–7,50% p.a.) setelah PPh 20% mulai Rp100 ribu. Cek hitungan bulanan & analisis risiko Non-LPS.',
    h1: 'Kalkulator Deposito Krom Bank: Simulasi Bunga 6,75%–7,50% & Cek LPS',
    directAnswer:
      'Krom Bank (PT Krom Bank Indonesia Tbk, bagian grup Kredivo/FinAccel) menawarkan bunga deposito berjangka 6,75% p.a. (1 bulan) hingga 7,50% p.a. (12 bulan) mulai Rp100.000 — setara 5,40%–6,00% bersih setelah PPh 20%. Karena jauh di atas TBP LPS 3,75%, produk ini tidak dijamin LPS.',
    matchBankNames: ['Krom by Krom Bank'],
    defaultBankName: 'Krom by Krom Bank',
    defaultPrincipal: '25,000,000',
    defaultTenor: '12',
    highlights: [
      'Salah satu minimal penempatan terendah di Indonesia (mulai Rp100.000) dengan rate 6,75%–7,50% p.a.',
      'Pada saldo Rp100 juta tenor 12 bulan (7,50% p.a.), bunga bersih mencapai sekitar Rp6.000.000 per tahun setelah pajak 20%.',
      'Statusnya Tidak Dijamin LPS karena melebihi batas TBP Bank Umum 3,75% p.a.; pastikan porsi dana sesuai profil risiko Anda.'
    ],
    relatedSlugs: ['superbank', 'seabank', 'bpr'],
    relatedBlogSlugs: [
      {
        slug: 'bunga-deposito-bank-indonesia-2026',
        label: 'Perbandingan Rate Krom, SuperBank & BPR'
      },
      { slug: 'deposito-bpr-vs-bank-umum', label: 'Bandingkan dengan BPR Dijamin LPS 6,25%' }
    ],
    keywords: [
      'kalkulator deposito krom bank',
      'simulasi deposito krom bank',
      'bunga deposito krom bank',
      'deposito krom 7.5 persen'
    ],
    faqs: [
      {
        question: 'Deposito Rp50 juta di Krom Bank dapat berapa per bulan?',
        answer:
          'Pada tenor 1 bulan (6,75% p.a.), setelah dipotong PPh Final 20%, saldo Rp50 juta menghasilkan bunga bersih sekitar Rp221.918 per 30 hari. Pada rate 7,50% p.a. (tenor 12 bulan), rata-rata bersihnya sekitar Rp246.575 per 30 hari.'
      },
      {
        question: 'Apakah deposito Krom Bank dijamin LPS?',
        answer:
          'Tidak. Meskipun Krom Bank berizin dan diawasi OJK serta peserta LPS, suku bunga depositonya (6,75%–7,50% p.a.) melampaui batas TBP LPS Bank Umum 3,75% p.a.'
      },
      {
        question: 'Berapa minimal deposito di Krom Bank?',
        answer: 'Minimal penempatan deposito di aplikasi Krom dimulai dari Rp100.000.'
      }
    ]
  },
  {
    slug: 'superbank',
    shortName: 'SuperBank',
    badgeLabel: 'Bank Digital Bunga Tertinggi',
    title: 'Kalkulator Deposito SuperBank 2026: Bunga 7,5% & LPS',
    metaDescription:
      'Hitung bunga bersih deposito SuperBank (hingga 7,50% p.a.) setelah PPh 20% mulai Rp500 ribu. Cek simulasi tenor 1–12 bulan & status LPS 2026.',
    h1: 'Kalkulator Deposito SuperBank: Simulasi Bunga 7,50% p.a. & Status LPS',
    directAnswer:
      'SuperBank menawarkan bunga deposito rata 7,50% p.a. di seluruh tenor 1–12 bulan untuk penempatan Rp500.000 hingga Rp1 Miliar (dan 6,50% p.a. di atas Rp1 Miliar), setara 6,00% p.a. bersih setelah pajak 20%. Suku bunga ini melebihi TBP LPS 3,75% p.a. sehingga tidak dijamin LPS.',
    matchBankNames: ['SuperBank by Bank Superbank'],
    defaultBankName: 'SuperBank by Bank Superbank',
    defaultPrincipal: '25,000,000',
    defaultTenor: '1',
    highlights: [
      'Suku bunga tertinggi di tenor pendek 1 bulan (7,50% p.a. bruto / 6,00% p.a. bersih) tanpa harus mengunci dana 12 bulan.',
      'Untuk penempatan di atas Rp1 Miliar, suku bunga turun ke tier 6,50% p.a. sesuai RIPLAY SuperBank.',
      'Tidak dijamin LPS karena melampaui batas TBP Bank Umum 3,75% p.a.'
    ],
    relatedSlugs: ['krom-bank', 'seabank', 'bpr'],
    relatedBlogSlugs: [
      {
        slug: 'bunga-deposito-bank-indonesia-2026',
        label: 'Daftar Suku Bunga Deposito Tertinggi 2026'
      },
      { slug: 'deposito-aro-vs-non-aro', label: 'Strategi Roll-Over ARO+ Bulanan' }
    ],
    keywords: [
      'kalkulator deposito superbank',
      'simulasi deposito superbank',
      'bunga deposito superbank 7.5',
      'deposito superbank apakah aman'
    ],
    faqs: [
      {
        question: 'Deposito Rp100 juta di SuperBank 1 bulan dapat bersih berapa?',
        answer:
          'Dengan suku bunga 7,50% p.a. dan potongan PPh Final 20%, penempatan Rp100 juta selama 1 bulan (30 hari) menghasilkan bunga bersih sekitar Rp493.151.'
      },
      {
        question: 'Mengapa bunga deposito SuperBank di atas Rp1 Miliar berbeda?',
        answer:
          'Sesuai struktur tier resmi SuperBank, penempatan Rp500 ribu hingga Rp1 Miliar memperoleh 7,50% p.a., sedangkan nominal di atas Rp1 Miliar memperoleh 6,50% p.a.'
      },
      {
        question: 'Apakah deposito SuperBank dijamin LPS?',
        answer:
          'Tidak dijamin LPS, sebab bunga 6,50%–7,50% p.a. berada di atas Tingkat Bunga Penjaminan LPS Bank Umum (3,75% p.a.).'
      }
    ]
  },
  {
    slug: 'bank-jago',
    shortName: 'Bank Jago',
    badgeLabel: 'Kantong Deposito Bank Jago',
    title: 'Kalkulator Deposito Bank Jago 2026: Bunga Bersih & LPS',
    metaDescription:
      'Simulasi Kantong Deposito Bank Jago (5,00%–6,25% p.a.) sesuai tier saldo Rp1 juta hingga Rp1 Miliar setelah pajak 20%. Cek tabel & status LPS.',
    h1: 'Kalkulator Deposito Bank Jago: Simulasi Tier Bunga 5%–6,25% & Status LPS',
    directAnswer:
      'Kantong Deposito Bank Jago menerapkan sistem berjenjang (tiered) dari 5,00% p.a. (mulai Rp1 juta) hingga 6,25% p.a. (mulai Rp1 Miliar) untuk tenor 1–12 bulan. Setelah pajak 20%, hasil bersihnya 4,00%–5,00% p.a. Karena seluruh tier di atas 3,75% p.a., deposito Jago berstatus Non-LPS.',
    matchBankNames: ['Jago by Bank Jago'],
    defaultBankName: 'Jago by Bank Jago',
    defaultPrincipal: '100,000,000',
    defaultTenor: '3',
    highlights: [
      '4 jenjang nominal: Rp1 jt+ (5,00%–5,50%), Rp100 jt+ (5,50%–5,75%), Rp500 jt+ (5,75%–6,00%), dan ≥ Rp1 Miliar (rata 6,25% p.a.).',
      'Mendukung pembuatan banyak Kantong Deposito terpisah untuk pos tujuan finansial berbeda.',
      'Seluruh tier berada di atas batas TBP LPS Bank Umum 3,75% p.a. sehingga tidak masuk penjaminan LPS.'
    ],
    relatedSlugs: ['seabank', 'bca', 'bpr'],
    relatedBlogSlugs: [
      { slug: 'deposito-aro-vs-non-aro', label: 'Cara Kerja Perpanjangan Otomatis ARO & ARO+' },
      { slug: 'cara-menghitung-bunga-deposito', label: 'Rumus Bunga Deposito & Pajak 20%' }
    ],
    keywords: [
      'kalkulator deposito bank jago',
      'simulasi deposito jago',
      'bunga kantong deposito jago',
      'deposito bank jago 2026'
    ],
    faqs: [
      {
        question: 'Berapa bunga bersih deposito Bank Jago Rp100 juta?',
        answer:
          'Saldo Rp100 juta masuk ke tier kedua Bank Jago (5,50% p.a. untuk 1 bulan, atau 5,75% p.a. untuk 3–12 bulan). Pada tenor 3 bulan (5,75% p.a.), bunga bersih setelah pajak 20% adalah sekitar Rp1.134.247 untuk 90 hari (sekitar Rp378.082/bulan).'
      },
      {
        question: 'Berapa minimal buat Kantong Deposito di Bank Jago?',
        answer: 'Anda bisa membuka Kantong Deposito di aplikasi Jago mulai dari Rp1.000.000.'
      },
      {
        question: 'Apakah Kantong Deposito Jago dijamin LPS?',
        answer:
          'Karena suku bunga Kantong Deposito Jago dimulai dari 5,00% p.a. (di atas TBP LPS Bank Umum 3,75% p.a.), produk deposito ini tidak dijamin LPS.'
      }
    ]
  },
  {
    slug: 'cimb-niaga',
    shortName: 'CIMB Niaga',
    badgeLabel: 'OCTO Mobile & CIMB Niaga',
    title: 'Kalkulator Deposito CIMB Niaga 2026: Octo & Bunga Bersih',
    metaDescription:
      'Hitung bunga bersih deposito CIMB Niaga (OCTO) 3,00%–5,00% p.a. setelah pajak 20%. Lihat batas tier yang masih dijamin LPS 3,75% terbaru 2026.',
    h1: 'Kalkulator Deposito CIMB Niaga (OCTO): Simulasi Bunga Bersih & Tier LPS',
    directAnswer:
      'Deposito Berjangka CIMB Niaga via OCTO memiliki dua karakter menarik: tier Rp8 juta–Rp99 juta menawarkan 3,00%–3,75% p.a. (100% dijamin LPS karena tepat ≤ 3,75%), sedangkan tier ≥ Rp100 juta naik ke 4,50%–5,00% p.a. (tidak dijamin LPS karena melewati ambang TBP).',
    matchBankNames: ['Octo by CIMB Niaga'],
    defaultBankName: 'Octo by CIMB Niaga',
    defaultPrincipal: '50,000,000',
    defaultTenor: '12',
    highlights: [
      'Tier Rp8 juta s.d. < Rp100 juta tenor 12 bulan memberi tepat 3,75% p.a. — titik maksimum bunga Bank Umum yang masih dijamin penuh oleh LPS.',
      'Begitu nominal mencapai Rp100 juta ke atas, rate melonjak ke 4,50%–5,00% p.a., namun otomatis keluar dari cakupan penjaminan LPS.',
      'Cocok bagi nasabah yang ingin mengoptimalkan batas atas TBP LPS Bank Umum.'
    ],
    relatedSlugs: ['ocbc', 'danamon', 'bca'],
    relatedBlogSlugs: [
      {
        slug: 'bunga-deposito-bank-indonesia-2026',
        label: 'Perbandingan Bank Konvensional & Digital'
      },
      { slug: 'pajak-deposito-20-persen', label: 'Panduan Pajak Deposito PPh 20%' }
    ],
    keywords: [
      'kalkulator deposito cimb niaga',
      'kalkulator deposito cimb niaga online',
      'bunga deposito octo mobile',
      'simulasi deposito cimb niaga'
    ],
    faqs: [
      {
        question: 'Tier mana di deposito CIMB Niaga yang masih dijamin LPS?',
        answer:
          'Tier penempatan mulai Rp8 juta hingga di bawah Rp100 juta memiliki bunga 3,00%–3,75% p.a., sehingga seluruhnya memenuhi batas TBP LPS Bank Umum (≤ 3,75% p.a.) dan dijamin penuh hingga Rp2 Miliar.'
      },
      {
        question: 'Mengapa penempatan Rp100 juta di OCTO menjadi Non-LPS?',
        answer:
          'Pada tier ≥ Rp100 juta, suku bunga naik ke 4,50%–5,00% p.a. Karena angka tersebut melampaui batas TBP LPS 3,75% p.a., simpanan pada tier tersebut tidak dijamin LPS.'
      },
      {
        question: 'Berapa minimal pembukaan deposito online di OCTO CIMB Niaga?',
        answer:
          'Minimal penempatan awal Deposito Berjangka melalui aplikasi OCTO adalah Rp8.000.000.'
      }
    ]
  },
  {
    slug: 'danamon',
    shortName: 'Danamon',
    badgeLabel: 'D-Bank PRO by Danamon',
    title: 'Kalkulator Deposito Danamon 2026: D-Bank Pro & LPS',
    metaDescription:
      'Simulasi bunga bersih deposito Bank Danamon (D-Bank PRO) 3,50%–4,25% p.a. setelah pajak 20%. Cek tenor yang masih dijamin LPS 3,75% terbaru.',
    h1: 'Kalkulator Deposito Danamon (D-Bank PRO): Bunga Bersih & Cek Status LPS',
    directAnswer:
      'Deposito online D-Bank PRO by Danamon menawarkan suku bunga 3,50%–4,25% p.a. mulai Rp10 juta. Perhatikan batas penjaminan LPS: tenor 1–3 bulan pada tier Rp10 juta (3,50%–3,75% p.a.) masih dijamin LPS, sedangkan tenor 6–12 bulan (4,00%–4,25% p.a.) melewati batas TBP 3,75%.',
    matchBankNames: ['D-Bank Pro by Danamon'],
    defaultBankName: 'D-Bank Pro by Danamon',
    defaultPrincipal: '50,000,000',
    defaultTenor: '3',
    highlights: [
      'Tenor 3 bulan (tier Rp10 jt) dan tenor 1 bulan (tier Rp100 jt) memberikan tepat 3,75% p.a. yang masih dijamin LPS.',
      'Tenor 6 dan 12 bulan menawarkan rate 4,00%–4,25% p.a., sedikit di atas batas TBP LPS Bank Umum.',
      'Minimal penempatan deposito online D-Bank PRO dimulai dari Rp10.000.000.'
    ],
    relatedSlugs: ['cimb-niaga', 'ocbc', 'bca'],
    relatedBlogSlugs: [
      { slug: 'cara-menghitung-bunga-deposito', label: 'Cara Menghitung Bunga Deposito Bersih' },
      { slug: 'deposito-aro-vs-non-aro', label: 'Memilih Tenor Pendek ARO vs Tenor Panjang' }
    ],
    keywords: [
      'kalkulator deposito danamon',
      'simulasi deposito danamon',
      'bunga deposito d-bank pro',
      'bunga deposito bank danamon 2026'
    ],
    faqs: [
      {
        question: 'Tenor berapa di D-Bank PRO Danamon yang masih dijamin LPS?',
        answer:
          'Untuk saldo Rp10 juta–Rp99 juta, tenor 1 bulan (3,50%) dan 3 bulan (3,75%) masih dijamin LPS. Untuk saldo ≥ Rp100 juta, hanya tenor 1 bulan (3,75%) yang berada tepat di batas TBP LPS.'
      },
      {
        question: 'Berapa bunga bersih deposito Danamon Rp100 juta tenor 1 bulan?',
        answer:
          'Pada saldo Rp100 juta tenor 1 bulan (3,75% p.a.), bunga bersih setelah PPh 20% adalah sekitar Rp246.575 per 30 hari dan tetap dijamin LPS.'
      },
      {
        question: 'Berapa minimal deposito online di Danamon?',
        answer:
          'Minimal penempatan deposito online melalui aplikasi D-Bank PRO adalah Rp10.000.000.'
      }
    ]
  },
  {
    slug: 'ocbc',
    shortName: 'OCBC',
    badgeLabel: 'OCBC Mobile & Konvensional',
    title: 'Kalkulator Deposito OCBC 2026: Bunga Bersih & Cek LPS',
    metaDescription:
      'Hitung bunga bersih Deposito Berjangka OCBC (3,25%–3,75% p.a.) setelah PPh 20% mulai Rp8 juta. Seluruh tenor dijamin penuh oleh LPS hingga Rp2 M.',
    h1: 'Kalkulator Deposito OCBC: Simulasi Bunga Bersih 3,25%–3,75% (Dijamin LPS)',
    directAnswer:
      'Deposito Berjangka OCBC memberikan salah satu suku bunga tertinggi di kategori bank konvensional yang tetap 100% dijamin LPS: mulai 3,25% p.a. (1 bulan), 3,50% p.a. (3 bulan), hingga 3,75% p.a. (6 & 12 bulan) dengan minimal penempatan Rp8.000.000.',
    matchBankNames: ['Deposito Berjangka by OCBC'],
    defaultBankName: 'Deposito Berjangka by OCBC',
    defaultPrincipal: '100,000,000',
    defaultTenor: '6',
    highlights: [
      'Tenor 6 dan 12 bulan menyentuh tepat 3,75% p.a. (3,00% bersih setelah pajak) — batas tertinggi yang dijamin LPS untuk Bank Umum.',
      'Seluruh tenor (1, 3, 6, 12 bulan) aman di dalam koridor penjaminan LPS hingga Rp2 Miliar per nasabah.',
      'Minimal penempatan kompetitif mulai Rp8.000.000.'
    ],
    relatedSlugs: ['cimb-niaga', 'bca', 'bpr'],
    relatedBlogSlugs: [
      {
        slug: 'bunga-deposito-bank-indonesia-2026',
        label: 'Perbandingan Bunga Bank Konvensional 2026'
      },
      { slug: 'inflasi-dan-deposito', label: 'Apakah Bunga 3,75% Cukup Melawan Inflasi?' }
    ],
    keywords: [
      'kalkulator deposito ocbc',
      'simulasi deposito ocbc',
      'bunga deposito ocbc nisp 2026',
      'deposito ocbc mobile'
    ],
    faqs: [
      {
        question: 'Berapa bunga bersih deposito OCBC Rp100 juta tenor 6 bulan?',
        answer:
          'Dengan bunga 3,75% p.a. pada tenor 6 bulan (180 hari), bunga kotor sekitar Rp1.849.315 dan bunga bersih setelah PPh Final 20% adalah sekitar Rp1.479.452 (setara Rp246.575 per bulan).'
      },
      {
        question: 'Apakah seluruh tenor deposito OCBC dijamin LPS?',
        answer:
          'Ya. Suku bunga tertinggi deposito rupiah reguler OCBC adalah 3,75% p.a., tepat sesuai batas maksimum TBP LPS Bank Umum periode berjalan.'
      },
      {
        question: 'Berapa minimal buka deposito di OCBC?',
        answer: 'Minimal penempatan Deposito Berjangka OCBC adalah Rp8.000.000.'
      }
    ]
  },
  {
    slug: 'bpr',
    shortName: 'BPR (Dijamin LPS)',
    badgeLabel: '7 Produk BPR Berizin OJK • Dijamin LPS s.d. 6,25%',
    title: 'Kalkulator Deposito BPR 2026: Bunga 6,25% Dijamin LPS',
    metaDescription:
      'Hitung bunga bersih deposito BPR hingga 6,25% p.a. setelah pajak 20% yang tetap 100% dijamin LPS (Rp2 Miliar). Bandingkan 7 BPR resmi berizin OJK.',
    h1: 'Kalkulator Deposito BPR: Simulasi Bunga Tinggi 6,25% yang Tetap Dijamin LPS',
    directAnswer:
      'Berbeda dengan Bank Umum yang dibatasi TBP LPS 3,75% p.a., Bank Perekonomian Rakyat (BPR) memiliki batas penjaminan LPS hingga 6,25% p.a. (plafon Rp2 Miliar per nasabah per BPR). Artinya, Anda bisa meraih bunga bersih hingga 5,00% p.a. setelah pajak 20% dengan jaminan penuh negara.',
    matchBankNames: [
      'Deposito Supra by BPR Supra',
      'Deposito Universal by Universal BPR',
      'Deposito Reguler by BPR KS',
      'Deposito Berjangka by BPR Kredit Mandiri',
      'Deposito Si Deka by BPR Hasamitra',
      'DepositoGo by BPR Lestari',
      'Deposito Berjangka by Bank Eka (BPR)'
    ],
    defaultBankName: 'Deposito Supra by BPR Supra',
    defaultPrincipal: '100,000,000',
    defaultTenor: '12',
    highlights: [
      `Seluruh 7 BPR dalam daftar audit InvestCount menawarkan bunga ≤ ${formatPercentId(LPS_RATES.bprIdr)}% p.a., sehingga 100% masuk cakupan penjaminan LPS hingga Rp2 Miliar.`,
      'Pada bunga maksimum TBP BPR 6,25% p.a., imbal hasil bersih setelah PPh Final 20% mencapai 5,00% p.a. — dua kali lipat bunga bersih bank BUMN/BCA.',
      'Minimal penempatan mulai dari Rp1.000.000 (BPR Supra, BPR KS, BPR Hasamitra, Bank Eka) hingga Rp8.000.000 (BPR Lestari).'
    ],
    relatedSlugs: ['seabank', 'krom-bank', 'ocbc'],
    relatedBlogSlugs: [
      {
        slug: 'deposito-bpr-vs-bank-umum',
        label: 'Panduan Lengkap Keamanan Deposito BPR vs Bank Umum'
      },
      { slug: 'pajak-deposito-20-persen', label: 'Aturan Pajak PPh Final 20% pada Deposito BPR' }
    ],
    keywords: [
      'kalkulator deposito bpr',
      'simulasi deposito bpr',
      'bunga deposito bpr 2026',
      'bunga deposito bpr lestari 2026',
      'deposito bpr dijamin lps'
    ],
    faqs: [
      {
        question: 'Deposito BPR Rp100 juta bunga 6,25% dapat bersih berapa per bulan?',
        answer:
          'Pada bunga 6,25% p.a., bunga kotor per 30 hari sekitar Rp513.699. Setelah dipotong PPh Final 20%, bunga bersih yang masuk ke rekening Anda sekitar Rp410.959 per bulan (atau sekitar Rp5.000.000 per tahun).'
      },
      {
        question: 'Apakah menaruh uang di BPR benar-benar aman dan dijamin LPS?',
        answer:
          'Ya, selama BPR tersebut berizin OJK, tercatat sebagai peserta LPS, dan memenuhi syarat 3T: tercatat di pembukuan bank, tingkat bunga tidak melebihi TBP LPS BPR (6,25% p.a.), dan tidak melakukan tindakan yang merugikan bank. Plafon jaminannya sama persis dengan bank umum yakni Rp2 Miliar per nasabah per BPR.'
      },
      {
        question: 'Apa BPR dengan bunga tertinggi yang masih dijamin LPS di 2026?',
        answer:
          'Beberapa BPR besar seperti BPR Supra, Universal BPR, BPR KS, BPR Kredit Mandiri, dan BPR Hasamitra menawarkan bunga puncak tepat di batas TBP LPS 6,25% p.a. pada tenor 6 atau 12 bulan.'
      }
    ]
  }
]

export const getBankCalculatorPage = (slug: string): BankCalculatorPageConfig | undefined => {
  return BANK_CALCULATOR_PAGES.find((page) => page.slug === slug)
}

export const computeNetReturnPreview = (
  principal: number,
  annualRatePercent: number,
  months: number
) => {
  const taxRate = principal > 7_500_000 ? 0.2 : 0
  const gross = principal * (annualRatePercent / 100) * ((months * 30) / 365)
  const net = gross * (1 - taxRate)
  return {
    gross,
    tax: gross - net,
    net,
    monthlyNet: net / months,
    taxRatePercent: taxRate * 100
  }
}

export const evaluateTierLps = (rate: number, category: BankCategory, principal: number) => {
  return evaluateLpsStatus(rate, category, principal)
}

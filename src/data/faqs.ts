export interface FAQItem {
  question: string
  answer: string
  link?: {
    url: string
    text: string
  }
}

export const homeFAQs: FAQItem[] = [
  {
    question: 'Bagaimana cara menghitung bunga deposito setelah dipotong pajak 20%?',
    answer:
      'Rumus dasarnya: (Pokok Simpanan × Suku Bunga p.a. × Jumlah Bulan) / 12, atau menggunakan hari aktual (30/365 hari). Untuk saldo di atas Rp7.500.000, bunga kotor dipotong PPh Final sebesar 20% sehingga hasil bersih yang Anda terima adalah 80% dari bunga kotor.',
    link: {
      url: '/blog/cara-menghitung-bunga-deposito',
      text: 'Baca panduan rumus bunga deposito'
    }
  },
  {
    question: 'Berapa bunga deposito per bulan untuk saldo Rp10 juta dan Rp100 juta?',
    answer:
      'Dengan asumsi bunga 5,0% p.a. dan potongan PPh Final 20%: saldo Rp10 juta menghasilkan sekitar Rp33.334 per bulan, sedangkan Rp100 juta menghasilkan sekitar Rp333.333 per bulan. Pada bunga 6,0% p.a., hasilnya naik menjadi sekitar Rp40.000 dan Rp400.000 per bulan.',
    link: {
      url: '/blog/simulasi-deposito-lengkap',
      text: 'Lihat simulasi 10 jt, 50 jt, dan 100 jt'
    }
  },
  {
    question: 'Berapa batas simpanan yang bebas pajak bunga deposito?',
    answer:
      'Mengacu pada PP No. 131 Tahun 2000, simpanan deposito hingga Rp7.500.000 bebas pajak (0%). Simpanan di atas Rp7.500.000 dikenakan PPh Final 20% yang langsung dipotong oleh bank saat pencairan bunga.',
    link: {
      url: '/blog/pajak-deposito-20-persen',
      text: 'Pelajari aturan pajak deposito 20%'
    }
  },
  {
    question: 'Apakah deposito di bank digital dan BPR dijamin LPS?',
    answer:
      'Ya, selama bank atau BPR tersebut berizin resmi OJK dan memenuhi syarat 3T LPS. Plafon penjaminannya maksimal Rp2 Miliar per nasabah per bank, dengan batas Tingkat Bunga Penjaminan (TBP) periode 1 Oktober 2026 – 31 Januari 2027 sebesar 3,75% p.a. untuk bank umum/digital dan 6,25% p.a. untuk BPR. Bunga di atas batas tersebut tidak dijamin LPS.',
    link: {
      url: '/blog/deposito-bpr-vs-bank-umum',
      text: 'Bandingkan deposito BPR vs Bank Umum'
    }
  },
  {
    question: 'Apa perbedaan deposito Non-ARO, ARO, dan ARO+?',
    answer:
      'Non-ARO otomatis cair ke rekening saat jatuh tempo. ARO memperpanjang pokoknya saja sementara bunganya ditransfer ke rekening. ARO+ menggabungkan pokok dan bunga bersih untuk diperpanjang bersama sehingga menghasilkan efek bunga berbunga (compounding).',
    link: {
      url: '/blog/deposito-aro-vs-non-aro',
      text: 'Pahami perbedaan ARO, Non-ARO, dan ARO+'
    }
  },
  {
    question: 'Apakah bunga deposito cukup untuk mengalahkan inflasi?',
    answer:
      'Jika inflasi tahunan berada di kisaran 2,5%–3,0%, Anda memerlukan bunga deposito bruto minimal sekitar 3,75% p.a. agar bunga bersih setelah PPh 20% (3,0% netto) tetap menjaga daya beli uang Anda.',
    link: {
      url: '/blog/inflasi-dan-deposito',
      text: 'Hitung return riil deposito terhadap inflasi'
    }
  }
]

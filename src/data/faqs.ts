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
      'Rumus bunga kotor bulanan: (Pokok Simpanan × Suku Bunga p.a. × Jumlah Bulan) / 12, atau basis hari aktual: Pokok × Suku Bunga p.a. × (Jumlah Hari / 365). Untuk simpanan di atas Rp7.500.000, bunga kotor dipotong PPh Final 20% sehingga bunga bersih yang diterima adalah 80% dari bunga kotor.',
    link: {
      url: '/blog/cara-menghitung-bunga-deposito/',
      text: 'Baca panduan rumus hitung bunga deposito'
    }
  },
  {
    question: 'Deposito Rp1 juta dan Rp5 juta dapat bunga berapa per bulan?',
    answer:
      'Karena total simpanan tidak melebihi Rp7.500.000, deposito Rp1 juta dan Rp5 juta bebas PPh Final (0% sesuai PP No. 131 Tahun 2000). Pada bunga 5,50% p.a., saldo Rp1 juta menghasilkan sekitar Rp4.521/bulan dan Rp5 juta menghasilkan sekitar Rp22.603/bulan tanpa potongan pajak.',
    link: {
      url: '/blog/pajak-deposito-20-persen/',
      text: 'Cek syarat simpanan bebas pajak ≤ Rp7,5 juta'
    }
  },
  {
    question: 'Deposito Rp100 juta 1 bulan dapat bunga bersih berapa?',
    answer:
      'Setelah dipotong PPh Final 20% (basis 30/365 hari): pada bank umum dengan bunga LPS 3,75% p.a. Anda menerima sekitar Rp246.575/bulan; pada bunga 5,50% p.a. sekitar Rp361.644/bulan; dan pada BPR dengan batas LPS 6,25% p.a. sekitar Rp410.959/bulan.',
    link: {
      url: '/kalkulator-deposito/bpr/',
      text: 'Simulasikan di Kalkulator Deposito BPR (6,25%)'
    }
  },
  {
    question: 'Deposito Rp2 miliar dan Rp3 miliar per bulan dapat berapa & apakah dijamin LPS?',
    answer:
      'Pada bunga 3,75% p.a. (batas TBP Bank Umum), Rp2 miliar menghasilkan sekitar Rp4.931.507 bersih/bulan dan masih dijamin LPS. Namun untuk Rp3 miliar (sekitar Rp7.397.260 bersih/bulan pada 3,75%), saldo melewati plafon maksimum LPS Rp2 miliar per nasabah per bank sehingga sebaiknya dipecah ke minimal 2 bank berbeda.',
    link: {
      url: '/blog/bunga-deposito-bank-indonesia-2026/',
      text: 'Lihat daftar bunga deposito & aturan plafon LPS'
    }
  },
  {
    question: 'Apakah deposito di bank digital dan BPR dijamin LPS?',
    answer:
      'Dijamin LPS hingga Rp2 miliar per nasabah per bank selama bank/BPR berizin OJK dan bunganya tidak melewati Tingkat Bunga Penjaminan (TBP) periode 1 Oktober 2026 – 31 Januari 2027: maksimal 3,75% p.a. untuk bank umum/digital dan 6,25% p.a. untuk BPR. Deposito bank digital berbunga 5%–7,5% tidak dijamin LPS.',
    link: {
      url: '/blog/deposito-bpr-vs-bank-umum/',
      text: 'Bandingkan keamanan deposito BPR vs Bank Umum'
    }
  },
  {
    question: 'Apa perbedaan deposito Non-ARO, ARO, dan ARO+?',
    answer:
      'Non-ARO otomatis mencairkan pokok dan bunga ke rekening saat jatuh tempo. ARO memperpanjang pokoknya saja sementara bunga bersih ditransfer tiap periode. ARO+ menggulung pokok ditambah bunga bersih ke tenor berikutnya untuk efek bunga berbunga (compounding).',
    link: {
      url: '/blog/deposito-aro-vs-non-aro/',
      text: 'Lihat tabel simulasi 3 tahun Non-ARO vs ARO+'
    }
  },
  {
    question: 'Apakah bunga deposito cukup untuk mengalahkan inflasi?',
    answer:
      'Dengan asumsi inflasi tahunan Indonesia di kisaran 2,5%–3,0%, Anda membutuhkan suku bunga deposito bruto minimal sekitar 3,75% p.a. agar imbal hasil bersih setelah PPh 20% (3,00% netto) tetap menjaga daya beli riil uang Anda.',
    link: {
      url: '/blog/inflasi-dan-deposito/',
      text: 'Pelajari cara hitung return riil deposito'
    }
  }
]

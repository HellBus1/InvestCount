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
      'Rumus perhitungan bunga deposito bulanan adalah: (Pokok Simpanan × Suku Bunga p.a. × Jumlah Bulan) / 12. Jika saldo deposito di atas Rp7.500.000, bunga kotor akan dipotong Pajak Penghasilan (PPh) Final sebesar 20%. Hasil bersih adalah Bunga Kotor dikurangi Pajak 20%.',
    link: {
      url: '/blog/cara-menghitung-bunga-deposito',
      text: 'Baca panduan cara menghitung bunga deposito'
    }
  },
  {
    question: 'Berapa bunga deposito per bulan untuk saldo 10 juta dan 100 juta?',
    answer:
      'Dengan asumsi suku bunga rata-rata 5,0% p.a.: Saldo Rp10 juta menghasilkan bunga bersih sekitar Rp33.334 per bulan. Saldo Rp100 juta menghasilkan bunga bersih sekitar Rp333.333 per bulan (setelah dipotong pajak 20%). Pada bank digital dengan bunga 6,0% p.a., hasilnya masing-masing menjadi Rp40.000 dan Rp400.000 per bulan.',
    link: {
      url: '/blog/simulasi-deposito-lengkap',
      text: 'Lihat simulasi lengkap 10 jt, 50 jt, dan 100 jt'
    }
  },
  {
    question: 'Berapa batas pajak bunga deposito di Indonesia?',
    answer:
      'Berdasarkan PP No. 131 Tahun 2000, deposito dengan jumlah simpanan sampai dengan Rp7.500.000 bebas pajak (0%). Sementara simpanan di atas Rp7.500.000 dikenakan PPh Final sebesar 20% yang otomatis dipotong oleh sistem bank saat pencairan bunga.',
    link: {
      url: '/blog/pajak-deposito-20-persen',
      text: 'Pelajari aturan pajak deposito 20%'
    }
  },
  {
    question: 'Apakah simpanan deposito di bank digital dan BPR aman dan dijamin LPS?',
    answer:
      'Ya, seluruh bank umum, bank digital, dan BPR yang berizin resmi di Indonesia merupakan peserta penjaminan Lembaga Penjamin Simpanan (LPS). Maksimum saldo yang dijamin adalah Rp2 Miliar per nasabah per bank, dengan syarat suku bunga tidak melebihi Tingkat Bunga Penjaminan (TBP) LPS (4,25% untuk bank umum dan 6,75% untuk BPR).',
    link: {
      url: '/blog/deposito-bpr-vs-bank-umum',
      text: 'Bandingkan keamanan BPR vs Bank Umum'
    }
  },
  {
    question: 'Apa perbedaan antara deposito ARO, Non-ARO, dan ARO+?',
    answer:
      'Non-ARO berarti deposito otomatis ditutup saat jatuh tempo dan dana masuk ke tabungan. ARO Pokok memperpanjang modal pokok saja secara otomatis, sementara bunganya ditransfer ke tabungan. ARO+ (ARO Bunga) menggabungkan modal pokok dan bunga bersih untuk diperpanjang bersama, menghasilkan efek bunga bergulung (compounding interest) tertinggi.',
    link: {
      url: '/blog/deposito-aro-vs-non-aro',
      text: 'Pahami perbedaan ARO, Non-ARO, dan ARO+'
    }
  },
  {
    question: 'Apakah bunga deposito bisa mengalahkan inflasi?',
    answer:
      'Tergantung suku bunga bank yang Anda pilih. Jika inflasi tahunan berada di kisaran 2,5% - 3,0%, Anda membutuhkan suku bunga deposito kotor minimal 3,75% p.a. agar imbal hasil bersih setelah pajak 20% tetap menghasilkan return riil positif di atas inflasi.',
    link: {
      url: '/blog/inflasi-dan-deposito',
      text: 'Hitung return riil deposito lawan inflasi'
    }
  }
]

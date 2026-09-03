import { motion } from 'framer-motion'
import Footer from '@/components/Footer/Footer'
import { containerVariants, childVariants } from '@/constants/animations'
import Icon from '@/components/Icon/Icon'

const TransparencyPage = () => {
  const lastUpdated = '27 November 2025'

  const sources = [
    {
      title: '1. Website Resmi Bank',
      desc: 'Data suku bunga deposito diambil langsung dari laman resmi dan publikasi transparansi masing-masing bank secara reguler.',
      badge: 'Update Mingguan'
    },
    {
      title: '2. Otoritas Jasa Keuangan (OJK)',
      desc: 'Standar regulasi perbankan Indonesia serta validasi perizinan institusi perbankan.',
      link: 'https://www.ojk.go.id',
      linkText: 'Kunjungi OJK'
    },
    {
      title: '3. Lembaga Penjamin Simpanan (LPS)',
      desc: 'Tingkat Bunga Penjaminan (TBP) dan batas maksimum jaminan simpanan Rp2 Miliar per nasabah.',
      link: 'https://www.lps.go.id',
      linkText: 'Kunjungi LPS'
    },
    {
      title: '4. Bank Indonesia (BI)',
      desc: 'Referensi BI-Rate suku bunga acuan dan data inflasi tahunan.',
      link: 'https://www.bi.go.id',
      linkText: 'Kunjungi BI'
    }
  ]

  return (
    <div className='w-full min-h-screen flex flex-col bg-slate-50'>
      {/* Hero */}
      <motion.section
        className='w-full pt-20 pb-14 bg-gradient-to-b from-white via-brand-50/20 to-slate-50 border-b border-slate-200/80'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        <div className='layout'>
          <div className='max-w-3xl'>
            <motion.div
              className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-4'
              variants={childVariants}
            >
              <Icon name='chart-bar' className='w-3.5 h-3.5' />
              <span>Transparansi & Metodologi</span>
            </motion.div>

            <motion.h1
              className='text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight mb-4'
              variants={childVariants}
            >
              Sumber Data & <span className='text-brand-600'>Formula Perhitungan</span>
            </motion.h1>

            <motion.p
              className='text-base sm:text-lg text-slate-600 leading-relaxed mb-6'
              variants={childVariants}
            >
              Penjelasan terbuka bagaimana InvestCount menghitung bunga bersih deposito dan dari
              mana kami mengumpulkan rate resmi perbankan.
            </motion.p>

            <motion.div
              className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-700'
              variants={childVariants}
            >
              <Icon name='calendar' className='w-4 h-4 text-brand-600' />
              <span>
                Terakhir diperbarui: <strong className='text-slate-900'>{lastUpdated}</strong>
              </span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.section
        className='py-16 layout'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {/* Formula Section */}
        <div className='mb-16'>
          <motion.h2
            className='text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-6'
            variants={childVariants}
          >
            Formula Perhitungan Bunga Deposito
          </motion.h2>

          <motion.div
            className='p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-card space-y-6'
            variants={childVariants}
          >
            <div className='p-5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm space-y-2'>
              <div className='text-brand-400'>// 1. Rumus Bunga Kotor Tahunan:</div>
              <div>Bunga_Kotor = (Pokok_Deposito × Suku_Bunga × Tenor_Bulan) / 12</div>
              <div className='text-brand-400 pt-2'>
                // 2. Pajak Bunga Deposito PPh Pasal 4 ayat (2):
              </div>
              <div>Pajak = Bunga_Kotor × 20%</div>
              <div className='text-brand-400 pt-2'>// 3. Hasil Bunga Bersih:</div>
              <div className='font-bold text-white'>Bunga_Bersih = Bunga_Kotor - Pajak</div>
            </div>

            <div className='p-4 rounded-xl bg-brand-50/70 border border-brand-200/80 text-xs sm:text-sm text-slate-700 space-y-1'>
              <p className='font-semibold text-brand-900'>Contoh Perhitungan Riil:</p>
              <p>Simpanan Rp10.000.000 dengan bunga 6% per tahun selama 12 bulan:</p>
              <p className='text-slate-600'>
                • Bunga Kotor = (Rp10.000.000 × 6% × 12) / 12 = Rp600.000
              </p>
              <p className='text-slate-600'>• Potongan Pajak 20% = Rp120.000</p>
              <p className='font-bold text-brand-700'>• Total Diterima Bersih = Rp480.000</p>
            </div>
          </motion.div>
        </div>

        {/* Data Sources Grid */}
        <div className='mb-16'>
          <motion.h2
            className='text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-6'
            variants={childVariants}
          >
            Sumber Data
          </motion.h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {sources.map((s, i) => (
              <motion.div
                key={i}
                className='p-6 rounded-2xl bg-white border border-slate-200 shadow-card hover:shadow-hover hover:border-brand-300 transition-all flex flex-col justify-between'
                variants={childVariants}
              >
                <div>
                  <h3 className='text-base font-bold text-slate-900 mb-2'>{s.title}</h3>
                  <p className='text-sm text-slate-600 leading-relaxed mb-4'>{s.desc}</p>
                </div>
                <div>
                  {s.badge && (
                    <span className='inline-block px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold'>
                      {s.badge}
                    </span>
                  )}
                  {s.link && (
                    <a
                      href={s.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors'
                    >
                      <span>{s.linkText}</span>
                      <Icon name='external-link' className='w-3 h-3' />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer Card */}
        <motion.div
          className='p-6 rounded-2xl bg-amber-50/80 border border-amber-200/90 shadow-sm text-slate-700 text-xs sm:text-sm space-y-2'
          variants={childVariants}
        >
          <div className='flex items-center gap-2 font-bold text-amber-900'>
            <Icon name='info' className='w-4 h-4 text-amber-600' />
            <span>Disclaimer & Catatan Penting</span>
          </div>
          <p className='leading-relaxed text-slate-600'>
            InvestCount adalah aplikasi edukasi independen. Suku bunga perbankan dapat berubah
            sewaktu-waktu sesuai kebijakan internal masing-masing bank dan suku bunga acuan. Selalu
            konfirmasi syarat & ketentuan terkini ke pihak bank terkait sebelum membuka rekening
            deposito.
          </p>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default TransparencyPage

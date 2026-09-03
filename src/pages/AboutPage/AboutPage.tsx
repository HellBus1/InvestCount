import { motion } from 'framer-motion'
import Footer from '@/components/Footer/Footer'
import { containerVariants, childVariants } from '@/constants/animations'
import Icon, { IconName } from '@/components/Icon/Icon'

interface ValueItem {
  icon: IconName
  title: string
  desc: string
}

const AboutPage = () => {
  const values: ValueItem[] = [
    {
      icon: 'shield-check',
      title: 'Transparansi',
      desc: 'Perhitungan terbuka, jelas sumber datanya, dan memperhitungkan potongan pajak 20% tanpa clickbait.'
    },
    {
      icon: 'gift',
      title: 'Gratis & Tanpa Iklan',
      desc: 'Dapat diakses siapapun tanpa biaya, paywall, atau banner iklan yang mengganggu kenyamanan.'
    },
    {
      icon: 'lock',
      title: 'Privasi Terjaga',
      desc: 'Semua simulasi berjalan di browser Anda. Kami tidak menyimpan atau menjual nominal keuangan Anda.'
    },
    {
      icon: 'handshake',
      title: 'Independen & Netral',
      desc: 'Tidak berafiliasi dengan bank manapun. Rekomendasi berdasarkan suku bunga dan perbandingan objektif.'
    }
  ]

  return (
    <div className='w-full min-h-screen flex flex-col bg-slate-50'>
      {/* Hero Section */}
      <motion.section
        className='w-full pt-20 pb-16 bg-gradient-to-b from-white via-brand-50/20 to-slate-50 border-b border-slate-200/80'
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
              <Icon name='info' className='w-3.5 h-3.5' />
              <span>Tentang InvestCount</span>
            </motion.div>

            <motion.h1
              className='text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight mb-4'
              variants={childVariants}
            >
              Misi Sederhana: <span className='text-brand-600'>Literasi Deposito yang Jujur</span>
            </motion.h1>

            <motion.p
              className='text-base sm:text-lg text-slate-600 leading-relaxed'
              variants={childVariants}
            >
              InvestCount dibuat untuk memudahkan masyarakat Indonesia menghitung return simpanan
              deposito secara nyata — bersih setelah dipotong pajak 20% dan disimulasikan secara
              transparan.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Story & Values */}
      <motion.section
        className='py-16 layout'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {/* Core Values Grid */}
        <div className='mb-16'>
          <motion.h2
            className='text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-8'
            variants={childVariants}
          >
            Prinsip Utama Kami
          </motion.h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {values.map((v, i) => (
              <motion.div
                key={i}
                className='p-6 rounded-2xl bg-white border border-slate-200 shadow-card hover:shadow-hover hover:border-brand-300 transition-all flex items-start gap-4'
                variants={childVariants}
              >
                <div className='w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 border border-brand-100'>
                  <Icon name={v.icon} className='w-5 h-5' />
                </div>
                <div>
                  <h3 className='text-base font-bold text-slate-900 mb-1.5'>{v.title}</h3>
                  <p className='text-sm text-slate-600 leading-relaxed'>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Creator Card */}
        <motion.div
          className='p-8 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-3xl'
          variants={childVariants}
        >
          <img
            alt='Syubban Fakhriya'
            src='/avatar.jpg'
            className='w-24 h-24 rounded-2xl object-cover border-2 border-brand-500 shadow-md flex-shrink-0'
          />
          <div className='text-center sm:text-left'>
            <h3 className='text-xl font-bold text-slate-900'>Syubban Fakhriya</h3>
            <p className='text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2'>
              Creator & Software Engineer
            </p>
            <p className='text-sm text-slate-600 leading-relaxed mb-4'>
              Software engineer yang berdedikasi membangun alat bantu finansial yang bermanfaat,
              cepat, dan mudah diakses oleh siapa saja.
            </p>
            <div className='flex items-center justify-center sm:justify-start gap-3'>
              <a
                href='https://www.linkedin.com/in/syubban-fakhriya/'
                target='_blank'
                rel='noopener noreferrer'
                className='px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5'
              >
                <span>LinkedIn</span>
                <Icon name='external-link' className='w-3 h-3 text-slate-400' />
              </a>
              <a
                href='https://github.com/HellBus1'
                target='_blank'
                rel='noopener noreferrer'
                className='px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5'
              >
                <span>GitHub</span>
                <Icon name='external-link' className='w-3 h-3 text-slate-500' />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default AboutPage

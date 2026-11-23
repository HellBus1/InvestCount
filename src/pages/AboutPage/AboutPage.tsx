import { motion } from 'framer-motion'
import Footer from '@/components/Footer/Footer'
import { containerVariants, childVariants } from '@/constants/animations'
import Icon, { IconName } from '@/components/Icon/Icon'
import { useSEO } from '@/hooks/useSEO'

interface ValueItem {
  icon: IconName
  title: string
  desc: string
}

const AboutPage = () => {
  useSEO({
    title: 'Tentang InvestCount - Kalkulator Deposito Independen Indonesia',
    description:
      'Mengenal prinsip dan pembuat InvestCount. Alat gratis tanpa iklan untuk menghitung bunga deposito bersih setelah pajak 20% dan membandingkan rate bank serta BPR.',
    canonicalUrl: '/tentang',
    keywords: [
      'tentang investcount',
      'kalkulator deposito indonesia',
      'syubban fakhriya',
      'literasi keuangan'
    ]
  })

  const values: ValueItem[] = [
    {
      icon: 'shield-check',
      title: 'Angka Terbuka',
      desc: 'Rumus perhitungan, potongan PPh Final 20%, status penjaminan LPS, dan sumber data ditampilkan apa adanya.'
    },
    {
      icon: 'gift',
      title: 'Gratis & Tanpa Iklan',
      desc: 'Seluruh fitur dapat dipakai tanpa registrasi, paywall, ataupun banner iklan.'
    },
    {
      icon: 'lock',
      title: 'Diproses di Browser',
      desc: 'Angka yang Anda masukkan dihitung langsung di perangkat Anda dan tidak disimpan di server mana pun.'
    },
    {
      icon: 'handshake',
      title: 'Independen',
      desc: 'Tidak berafiliasi dengan bank atau BPR mana pun. Perbandingan disusun murni dari publikasi resmi tiap institusi.'
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
              InvestCount dibangun agar siapa pun di Indonesia bisa menghitung hasil bersih deposito
              setelah pajak 20%, membandingkan rate bank dan BPR, serta mengecek status penjaminan
              LPS tanpa perlu membuka puluhan tab berbeda.
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
            Prinsip Dasar
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
            width={96}
            height={96}
            className='w-24 h-24 rounded-2xl object-cover border-2 border-brand-500 shadow-md flex-shrink-0'
          />
          <div className='text-center sm:text-left'>
            <h3 className='text-xl font-bold text-slate-900'>Syubban Fakhriya</h3>
            <p className='text-xs font-semibold text-brand-600 mb-2'>
              Creator &amp; Software Engineer
            </p>
            <p className='text-sm text-slate-600 leading-relaxed mb-4'>
              Membangun InvestCount sebagai proyek independen karena butuh satu tempat yang cepat
              dan transparan untuk membandingkan bunga deposito bersih lintas bank dan BPR.
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

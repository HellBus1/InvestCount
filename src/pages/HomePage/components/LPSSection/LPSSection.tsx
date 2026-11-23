import { motion } from 'framer-motion'
import { containerVariants, childVariants } from '@/constants/animations'
import Icon, { IconName } from '@/components/Icon/Icon'
import { LPS_RATES, formatPercentId } from '@/constants/lpsRates'

interface LPSRate {
  rate: string
  label: string
  icon: IconName
  description: string
}

const LPSSection = () => {
  const rates: LPSRate[] = [
    {
      rate: `${formatPercentId(LPS_RATES.bankUmumIdr)}%`,
      label: 'Bank Umum & Digital (Rupiah)',
      icon: 'bank',
      description: 'Batas maksimal bunga simpanan rupiah di bank umum konvensional maupun digital'
    },
    {
      rate: `${formatPercentId(LPS_RATES.bprIdr)}%`,
      label: 'BPR (Rupiah)',
      icon: 'scale',
      description: 'Batas maksimal bunga simpanan di Bank Perekonomian Rakyat'
    },
    {
      rate: `${formatPercentId(LPS_RATES.bankUmumValas)}%`,
      label: 'Bank Umum (Valas)',
      icon: 'coins',
      description: 'Batas maksimal bunga untuk simpanan valuta asing'
    }
  ]

  return (
    <motion.section
      className='py-16 md:py-24 w-full bg-slate-100/60 border-t border-slate-200/80'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className='layout'>
        {/* Header */}
        <motion.div className='text-center max-w-2xl mx-auto mb-12' variants={childVariants}>
          <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-3'>
            <Icon name='shield-check' className='w-3.5 h-3.5' />
            <span>Tingkat Bunga Penjaminan LPS</span>
          </div>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3'>
            Batas Penjaminan LPS Terbaru
          </h2>
          <p className='text-slate-600 text-sm md:text-base leading-relaxed'>
            Simpanan Anda dijamin Lembaga Penjamin Simpanan (LPS) hingga{' '}
            <strong className='text-slate-900'>Rp2 Miliar per nasabah per bank</strong> selama suku
            bunga tidak melampaui batas berikut:
          </p>
        </motion.div>

        {/* Rate Cards */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'
          variants={containerVariants}
        >
          {rates.map((item, index) => (
            <motion.div
              key={index}
              className='bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-card hover:shadow-hover hover:border-brand-300 transition-all text-center flex flex-col items-center'
              variants={childVariants}
            >
              <div className='w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 border border-brand-100'>
                <Icon name={item.icon} className='w-6 h-6' />
              </div>

              <div className='text-3xl sm:text-4xl font-extrabold font-display text-brand-600 tabular-nums mb-1'>
                {item.rate}
              </div>

              <div className='text-sm sm:text-base font-bold text-slate-800 mb-2'>{item.label}</div>

              <p className='text-xs text-slate-500 leading-relaxed'>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Notice Footnote */}
        <motion.p className='mt-8 text-center text-xs text-slate-500' variants={childVariants}>
          Berlaku untuk periode <strong>{LPS_RATES.effectivePeriod}</strong> sesuai pengumuman resmi{' '}
          <a
            href={LPS_RATES.sourceUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-brand-700 font-semibold hover:underline'
          >
            LPS (lps.go.id)
          </a>
          . Bunga di atas batas ini tidak dijamin oleh LPS.
        </motion.p>
      </div>
    </motion.section>
  )
}

export default LPSSection

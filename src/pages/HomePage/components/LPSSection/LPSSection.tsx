import { motion } from 'framer-motion'
import { containerVariants, childVariants } from '@/constants/animations'
import Icon, { IconName } from '@/components/Icon/Icon'

interface LPSRate {
  rate: string
  label: string
  icon: IconName
  description: string
}

const LPSSection = () => {
  const rates: LPSRate[] = [
    {
      rate: '4.25%',
      label: 'Bank Umum (Rupiah)',
      icon: 'bank',
      description: 'Maksimal suku bunga simpanan rupiah di bank umum'
    },
    {
      rate: '6.75%',
      label: 'BPR (Rupiah)',
      icon: 'scale',
      description: 'Maksimal suku bunga di Bank Perekonomian Rakyat'
    },
    {
      rate: '2.25%',
      label: 'Bank Umum (Valas)',
      icon: 'coins',
      description: 'Maksimal suku bunga untuk simpanan valuta asing'
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
            <span>Jaminan Keamanan Simpanan</span>
          </div>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3'>
            Batas Penjaminan LPS
          </h2>
          <p className='text-slate-600 text-sm md:text-base leading-relaxed'>
            Simpanan Anda dijamin Lembaga Penjamin Simpanan (LPS) hingga{' '}
            <strong className='text-slate-900'>Rp2 Miliar per nasabah per bank</strong>, selama suku
            bunga tidak melebihi batas tingkat bunga penjaminan berikut:
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

              <div className='text-3xl sm:text-4xl font-extrabold font-display text-brand-600 mb-1'>
                {item.rate}
              </div>

              <div className='text-sm sm:text-base font-bold text-slate-800 mb-2'>{item.label}</div>

              <p className='text-xs text-slate-500 leading-relaxed'>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Notice Footnote */}
        <motion.p
          className='mt-8 text-center text-xs text-slate-400 italic'
          variants={childVariants}
        >
          * Tingkat bunga penjaminan LPS diperbarui secara berkala sesuai kebijakan moneter resmi.
        </motion.p>
      </div>
    </motion.section>
  )
}

export default LPSSection

import { motion } from 'framer-motion'
import { containerVariants, badgeVariants } from '@/constants/animations'
import Icon, { IconName } from '@/components/Icon/Icon'

interface TrustBadge {
  icon: IconName
  text: string
  subtitle: string
}

const TrustBadgesSection = () => {
  const trustBadges: TrustBadge[] = [
    { icon: 'gift', text: 'Gratis Selamanya', subtitle: 'Tanpa biaya tersembunyi' },
    { icon: 'shield-check', text: 'Tanpa Iklan', subtitle: 'Fokus perhitungan bersih' },
    { icon: 'lock', text: 'Privasi Terjamin', subtitle: 'Tanpa simpan data pribadi' },
    { icon: 'handshake', text: 'Netral & Independen', subtitle: 'Bukan afiliasi bank' }
  ]

  return (
    <section className='w-full bg-slate-100/70 border-y border-slate-200/80 py-8 md:py-10'>
      <div className='layout'>
        <motion.div
          className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              className='flex items-center gap-3.5 p-4 rounded-xl bg-white border border-slate-200/90 shadow-card hover:shadow-hover hover:border-brand-300 transition-all'
              variants={badgeVariants}
            >
              <div className='w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0 text-brand-600 border border-brand-100'>
                <Icon name={badge.icon} className='w-5 h-5' />
              </div>
              <div className='min-w-0'>
                <div className='text-sm font-bold text-slate-800 truncate'>{badge.text}</div>
                <div className='text-xs text-slate-500 truncate'>{badge.subtitle}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustBadgesSection

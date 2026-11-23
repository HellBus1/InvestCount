import { motion } from 'framer-motion'
import HeroImage from './HeroImage'
import { containerVariants, childVariants, imageVariants } from '@/constants/animations'
import Icon from '@/components/Icon/Icon'

interface HeroProps {
  onScrollToDepositClick: () => void
}

const Hero = (props: HeroProps) => {
  const { onScrollToDepositClick } = props

  return (
    <motion.section
      className='relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-brand-50/20 to-slate-50 pt-16 pb-20 md:pt-24 md:pb-28'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      {/* Subtle Background Glow */}
      <div className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-200/20 rounded-full blur-3xl pointer-events-none' />

      <div className='layout relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
          {/* Left Content */}
          <motion.div
            className='lg:col-span-7 flex flex-col items-start gap-6'
            variants={containerVariants}
          >
            {/* Concrete Data Signal */}
            <motion.div
              className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs md:text-sm font-semibold'
              variants={childVariants}
            >
              <Icon name='shield-check' className='w-4 h-4 text-brand-600' />
              <span>35 Produk Bank &amp; BPR • Mengacu TBP LPS 2026</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 tracking-tight leading-[1.15]'
              variants={childVariants}
            >
              Kalkulator Deposito: Hitung <span className='text-brand-600'>Bunga Bersih</span> &amp;
              Bandingkan Semua Bank
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className='text-base md:text-lg text-slate-600 max-w-xl leading-relaxed'
              variants={childVariants}
            >
              Hitung imbal hasil deposito setelah PPh Final 20%, susun rencana anggaran bulanan dari
              bunganya, dan bandingkan suku bunga bank digital, konvensional, hingga BPR beserta
              status penjaminan LPS.
            </motion.p>

            {/* CTAs */}
            <motion.div className='flex flex-wrap items-center gap-4 pt-2' variants={childVariants}>
              <button
                type='button'
                className='btn btn-primary px-7 py-3.5 h-auto text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 border-0 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2'
                onClick={onScrollToDepositClick}
              >
                <span>Mulai Hitung</span>
                <Icon name='arrow-right' className='w-4 h-4' />
              </button>

              <a
                href='#perbandingan-deposito'
                className='px-5 py-3.5 rounded-xl border border-slate-200 bg-white hover:border-brand-300 hover:text-brand-700 text-slate-700 text-sm sm:text-base font-semibold transition-colors'
              >
                Bandingkan Rate Bank
              </a>
            </motion.div>
          </motion.div>

          {/* Right Visual Image */}
          <motion.div
            className='lg:col-span-5 flex justify-center items-center'
            variants={imageVariants}
          >
            <div className='w-full max-w-md p-4 sm:p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/80 shadow-elevated flex items-center justify-center overflow-hidden'>
              <HeroImage />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Hero

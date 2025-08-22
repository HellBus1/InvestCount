import { motion } from 'framer-motion' // Import Framer Motion
import HeroImage from './HeroImage'

interface HeroProps {
  onScrollToDepositClick: () => void
}

const Hero = (props: HeroProps) => {
  const { onScrollToDepositClick } = props

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.1 }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } }
  }

  return (
    <motion.div
      className='relative hero bg-base-200 min-h-screen px-10 py-10'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <div className='hero-content flex-col lg:flex-row-reverse items-center'>
        <motion.div
          className='hidden sm:block'
          variants={imageVariants} // Apply animation to the image
        >
          <HeroImage />
        </motion.div>
        <motion.div
          className='flex flex-col justify-start gap-4'
          variants={containerVariants} // Apply staggered animation to the text container
        >
          <motion.p
            className='py-2 text-xl md:text-2xl text-jess font-medium'
            variants={childVariants} // Animate each child
          >
            InvestCount
          </motion.p>
          <motion.h1
            className='leading-[48px] md:leading-[72px] py-2 text-4xl md:text-6xl font-semibold text-charter-blue-800'
            variants={childVariants} // Animate each child
          >
            Hitung <span className='text-jess'>Bunga Deposito Bank</span> di Indonesia dan
            Maksimalkan <span className='text-jess'>Tabungan Kamu</span>
          </motion.h1>
          <motion.p
            className='py-2 mb-2 text-base md:text-lg font-medium text-charter-blue'
            variants={childVariants} // Animate each child
          >
            Temukan bank dengan bunga terbaik dan rencanakan pertumbuhan finansial <br />
            Anda dengan mudah.
          </motion.p>
          <motion.button
            className='btn btn-primary max-w-[200px]'
            onClick={onScrollToDepositClick}
            variants={childVariants} // Animate the button
            whileHover={{ scale: 1.05 }} // Add hover effect
            whileTap={{ scale: 0.95 }} // Add tap effect
          >
            <p className='text-[#ffffff]'>Coba Sekarang Gratis</p>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Hero

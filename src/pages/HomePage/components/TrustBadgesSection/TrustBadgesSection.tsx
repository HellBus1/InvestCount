import { motion } from 'framer-motion'

const TrustBadgesSection = () => {
  const trustBadges = [
    { icon: '🆓', text: 'Gratis Selamanya' },
    { icon: '🚫', text: 'Tanpa Iklan' },
    { icon: '🔒', text: 'Tidak Menyimpan Data' },
    { icon: '🤝', text: 'Independen' }
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.1 }
    }
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } }
  }

  return (
    <motion.div
      className='w-full bg-base-300 py-12 md:py-16'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className='max-w-7xl mx-auto px-6 md:px-10'>
        <motion.div
          className='flex flex-wrap justify-center items-center gap-4 md:gap-6'
          variants={containerVariants}
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              className='flex items-center gap-3 px-6 py-3 rounded-lg bg-white border-2 border-charter-blue-200 shadow-md hover:shadow-lg hover:border-jess transition-all'
              variants={badgeVariants}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className='text-2xl'>{badge.icon}</span>
              <span className='text-charter-blue-700 font-bold text-sm md:text-base whitespace-nowrap'>
                {badge.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default TrustBadgesSection

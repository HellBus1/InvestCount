import { motion } from 'framer-motion' // Import Framer Motion

const LPSSection = () => {
  const rates = [
    {
      rate: '4.25%',
      label: 'Bank Umum (IDR)',
      icon: '🏦',
      description: 'Bunga maksimal untuk bank umum dalam Rupiah'
    },
    {
      rate: '6.75%',
      label: 'BPR',
      icon: '🏛️',
      description: 'Bunga maksimal untuk Bank Perkreditan Rakyat'
    },
    {
      rate: '2.25%',
      label: 'Bank Umum (Valas)',
      icon: '💵',
      description: 'Bunga maksimal untuk bank umum dalam mata uang asing'
    }
  ]

  // Animation variants
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

  return (
    <motion.div
      className='py-16 md:py-20 w-full bg-gradient-to-b from-base-100 to-base-200'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className='max-w-7xl mx-auto px-6 md:px-10'>
        {/* Main Content */}
        <motion.div className='text-center mb-12' variants={childVariants}>
          <motion.h2
            className='text-3xl md:text-4xl font-bold text-charter-blue-600 mb-4'
            variants={childVariants}
          >
            Perlindungan LPS
          </motion.h2>
          <motion.p
            className='text-charter-blue text-base md:text-lg max-w-3xl mx-auto leading-relaxed'
            variants={childVariants}
          >
            Dana deposito Anda dijamin oleh LPS hingga{' '}
            <span className='font-bold text-jess'>Rp2 miliar</span> per nasabah per bank. Selama
            bunga sesuai ketentuan LPS, simpanan Anda aman dan terlindungi.
          </motion.p>
        </motion.div>

        {/* Rate Cards */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 justify-items-center'
          variants={containerVariants}
        >
          {rates.map((item, index) => (
            <motion.div
              key={index}
              className='relative bg-white border-2 border-charter-blue-200 rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group w-full max-w-sm'
              variants={childVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background decoration */}
              <div className='absolute top-0 right-0 w-24 h-24 bg-jess-100 rounded-full -mr-12 -mt-12 opacity-50 group-hover:opacity-70 transition-opacity' />

              {/* Icon */}
              <div className='text-5xl mb-4 relative z-10'>{item.icon}</div>

              {/* Rate */}
              <div className='text-4xl md:text-5xl font-bold text-jess mb-2 relative z-10'>
                {item.rate}
              </div>

              {/* Label */}
              <div className='text-base md:text-lg font-semibold text-charter-blue mb-3 relative z-10'>
                {item.label}
              </div>

              {/* Description */}
              <div className='text-xs md:text-sm text-charter-blue-400 leading-relaxed relative z-10'>
                {item.description}
              </div>

              {/* Bottom accent */}
              <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-jess to-charter-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300' />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div className='mt-12 text-center max-w-2xl mx-auto' variants={childVariants}>
          <p className='text-xs md:text-sm text-charter-blue-400 italic'>
            * Suku bunga penjaminan LPS dapat berubah sewaktu-waktu sesuai kebijakan LPS
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LPSSection

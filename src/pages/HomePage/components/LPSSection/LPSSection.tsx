import { motion } from 'framer-motion' // Import Framer Motion

const LPSSection = () => {
  const rates = [
    {
      rate: '4.25%',
      label: 'Bank Umum (IDR)'
    },
    {
      rate: '6.75%',
      label: 'BPR'
    },
    {
      rate: '2.25%',
      label: 'Bank Umum (Valas)'
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
      className='pt-10 pb-20 w-full bg-base-200'
      initial='hidden'
      whileInView='visible' // Trigger animation when in view
      viewport={{ once: true, amount: 0.2 }} // Animate only once when 20% of the section is visible
      variants={containerVariants}
    >
      <motion.h2
        className='text-center text-2xl md:text-3xl font-bold text-charter-blue-600 mt-8 mb-4'
        variants={childVariants} // Animate the title
      >
        Perlindungan LPS (Lembaga Penjamin Simpanan)
      </motion.h2>
      <motion.p
        className='text-center text-charter-blue text-lg md:text-xl mx-4 md:mx-20 lg:mx-36 mb-16 mx-12'
        variants={childVariants} // Animate the description
      >
        Dana deposito Anda dijamin oleh LPS hingga Rp2 miliar per nasabah per bank. Selama bunga
        sesuai ketentuan LPS, simpanan Anda aman dan terlindungi.
      </motion.p>
      <motion.div
        className='flex flex-col md:flex-row justify-center items-center gap-6'
        variants={containerVariants} // Animate the container for rate cards
      >
        {rates.map((item, index) => (
          <motion.div
            key={index}
            className='border rounded-lg p-6 w-64 text-center shadow-md border-charter-blue bg-white'
            variants={childVariants} // Animate each rate card
            whileHover={{ scale: 1.05 }} // Add hover effect
            whileTap={{ scale: 0.95 }} // Add tap effect
          >
            <div className='text-3xl font-bold text-charter-blue'>{item.rate}</div>
            <div className='mt-2 text-sm text-charter-blue-400'>{item.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default LPSSection

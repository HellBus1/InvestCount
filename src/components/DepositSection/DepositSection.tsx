import { motion } from 'framer-motion' // Import Framer Motion
import DepositCalculation from './DepositCalculation/DepositCalculation'
import DepositTypeSelector from './DepositTypeSelector'
import { useState } from 'react'
import { DepositType } from '@/constants/DepositType'

interface DepositSectionProps {
  depositSectionRef: React.MutableRefObject<HTMLDivElement | null>
}

const DepositSection = (props: DepositSectionProps) => {
  const { depositSectionRef } = props
  const [selectedOption, setSelectedOption] = useState(DepositType.NONARO)

  // Animation variants for the section
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <motion.div
      className='w-full py-10'
      ref={depositSectionRef}
      initial='hidden'
      whileInView='visible' // Trigger animation when in view
      viewport={{ once: true, amount: 0.2 }} // Animate only once when 20% of the section is visible
      variants={containerVariants}
    >
      <motion.h1
        className='text-center text-2xl md:text-3xl font-bold text-charter-blue-600 mt-8 mb-4'
        variants={childVariants} // Animate the title
      >
        Calculate Your Deposit Growth
      </motion.h1>
      <motion.p
        className='text-center text-charter-blue text-lg md:text-xl mx-4 md:mx-10'
        variants={childVariants} // Animate the description
      >
        Choose the deposit option that suits you best and see how your savings can grow over time.
      </motion.p>
      <motion.div className='flex flex-col mb-16' variants={childVariants}>
        <motion.div className='mx-4 md:mx-20 lg:mx-36 mt-10' variants={childVariants}>
          <DepositTypeSelector
            selectedOption={selectedOption}
            setSelectedOption={(value) => setSelectedOption(value)}
          />
        </motion.div>
        <motion.div
          className='mx-4 md:mx-20 lg:mx-36 mt-8'
          variants={childVariants} // Animate the DepositCalculation
        >
          <DepositCalculation selectedOption={selectedOption} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default DepositSection

import { motion } from 'framer-motion'
import DepositCalculation from './DepositCalculation/DepositCalculation'
import DepositTypeSelector from './DepositTypeSelector'
import { useState } from 'react'
import { DepositType } from '@/constants/DepositType'
import { containerVariants, childVariants } from '@/constants/animations'

interface DepositSectionProps {
  depositSectionRef: React.MutableRefObject<HTMLDivElement | null>
}

const DepositSection = (props: DepositSectionProps) => {
  const { depositSectionRef } = props
  const [selectedOption, setSelectedOption] = useState(DepositType.NONARO)

  return (
    <motion.section
      className='w-full py-16 md:py-24 bg-slate-50'
      ref={depositSectionRef}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      <div className='layout'>
        {/* Section Header */}
        <motion.div className='text-center max-w-2xl mx-auto mb-10' variants={childVariants}>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3'>
            Kalkulator Simulasi Deposito
          </h2>
          <p className='text-slate-600 text-sm md:text-base leading-relaxed'>
            Pilih jenis perpanjangan dan hitung pertumbuhan saldo Anda secara instan dan akurat.
          </p>
        </motion.div>

        {/* Calculator Wrapper */}
        <div className='max-w-4xl mx-auto space-y-6'>
          <motion.div variants={childVariants}>
            <DepositTypeSelector
              selectedOption={selectedOption}
              setSelectedOption={(value) => setSelectedOption(value)}
            />
          </motion.div>

          <motion.div variants={childVariants}>
            <DepositCalculation selectedOption={selectedOption} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default DepositSection

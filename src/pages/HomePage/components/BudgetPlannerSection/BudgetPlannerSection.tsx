import { motion } from 'framer-motion'
import useBudgetPlannerSection from './hooks/useBudgetPlannerSecion'
import InputField from '../DepositSection/DepositCalculation/InputField'
import { formatNumberWithCommas, parseAmountInputFromCommas } from '@/services/inputServices'
import { useEffect, useState } from 'react'
import NeedsSection from './NeedsSection/NeedsSection'
import DepositDropdownSection from './DepositDropdownSection/DepositDropdownSection'
import RecommendationSection from './RecommendationSection/RecommendationSection'

const BudgetPlannerSection = () => {
  const {
    needInput,
    setNeedInput,
    priceInput,
    setPriceInput,
    handleAddNeed,
    needs,
    depositInput,
    setDepositInput,
    filteredBanks,
    handleBankSelection,
    handleRemoveNeed,
    recommendation
  } = useBudgetPlannerSection()
  const EMPTY_STRING = ''
  const [errors, setErrors] = useState({
    needInput: EMPTY_STRING,
    priceInput: EMPTY_STRING,
    depositInput: EMPTY_STRING
  })
  const [, setIsFormValid] = useState(false)

  const newErrors = {
    needInput: EMPTY_STRING,
    priceInput: EMPTY_STRING,
    depositInput: EMPTY_STRING
  }

  const isNumberAndDecimalRegex = /^\d+(\.\d+)?$/

  useEffect(() => {
    setIsFormValid(
      needInput !== EMPTY_STRING && priceInput !== EMPTY_STRING && depositInput !== EMPTY_STRING
    )
  }, [needInput, priceInput, depositInput])

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

  const validateDepositAmount = () => {
    if (!depositInput.trim()) {
      return 'Jumlah deposit tidak boleh kosong.'
    }
    if (isNaN(Number(depositInput.replace(/,/g, '')))) {
      return 'Jumlah deposit harus berupa angka yang valid.'
    }
    if (Number(depositInput.replace(/,/g, '')) < 10000000) {
      return 'Jumlah deposit minimal adalah 10.000.000 IDR.'
    }
    return null
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setField: (value: string) => void,
    fieldName: string
  ) => {
    const value = e.target.value
    if (fieldName === 'priceInput') {
      const formattedValue = formatNumberWithCommas(value)
      setField(formattedValue)
    } else if (fieldName == 'depositInput') {
      if (!depositInput) {
        newErrors.depositInput = 'Jumlah deposit tidak boleh kosong.'
      } else if (!isNumberAndDecimalRegex.test(parseAmountInputFromCommas(depositInput))) {
        newErrors.depositInput = 'Jumlah deposit harus berupa angka yang valid.'
      }
      const formattedValue = formatNumberWithCommas(value)
      setField(formattedValue)
    } else {
      setField(value)
    }

    setErrors((prev) => ({ ...prev, [fieldName]: EMPTY_STRING }))
  }

  const validateField = () => {
    let isValid = true

    if (!needInput) {
      newErrors.needInput = 'Kebutuhan tidak boleh kosong'
      isValid = false
    }

    if (!priceInput) {
      newErrors.priceInput = 'Biaya tidak boleh kosong'
      isValid = false
    } else if (!isNumberAndDecimalRegex.test(parseAmountInputFromCommas(priceInput))) {
      newErrors.priceInput = 'Biaya harus berupa angka yang valid'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleAddNeedWithValidation = () => {
    const isValid = validateField()
    if (isValid) {
      handleAddNeed(needInput, parseAmountInputFromCommas(priceInput))
    }
  }

  return (
    <motion.div
      className='pt-10 pb-20 w-full'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h1
        className='text-center text-2xl md:text-3xl font-bold text-charter-blue-600 mt-8 mb-4'
        variants={childVariants}
      >
        Rencanakan Anggaran Bulanan
      </motion.h1>

      <motion.p
        className='text-center text-charter-blue text-lg md:text-xl mx-4 md:mx-20 lg:mx-36 mb-16'
        variants={childVariants}
      >
        Rencanakan pengeluaran bulanan Anda dan lihat bagaimana hasil bunga deposito bisa membantu
        menutup kebutuhan tersebut.
      </motion.p>

      <motion.div
        className='card shadow-xl border-s-8 border-charter-blue mx-4 md:mx-20 lg:mx-36'
        variants={childVariants}
      >
        <div className='card-body'>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'
            variants={childVariants}
          >
            <InputField
              label='Kebutuhan'
              placeholder='Contoh: Sewa kos, Listrik, Netflix'
              type='text'
              value={needInput}
              onChange={(e) => handleInputChange(e, setNeedInput, 'needInput')}
              error={errors.needInput}
            />

            <InputField
              label='Biaya (Rp)'
              placeholder='Contoh: 1.200.000'
              type='text'
              value={priceInput}
              onChange={(e) => handleInputChange(e, setPriceInput, 'priceInput')}
              error={errors.priceInput}
            />

            <div className='col-span-1 md:col-span-2'>
              <button
                onClick={handleAddNeedWithValidation}
                className='btn btn-primary w-full text-[#ffffff]'
              >
                Tambahkan Kebutuhan
              </button>
            </div>
          </motion.div>

          {needs.length > 0 && <NeedsSection needs={needs} onRemoveNeed={handleRemoveNeed} />}

          {needs.length > 0 && (
            <div className='mt-8'>
              <h3 className='text-lg font-semibold text-charter-blue-600 mb-2'>
                Masukkan Jumlah Deposito
              </h3>
              <InputField
                label='Deposit Amount'
                placeholder='Minimal 10.000.000'
                type='text'
                value={depositInput}
                onChange={(e) => handleInputChange(e, setDepositInput, 'depositInput')}
                error={errors.depositInput}
              />
            </div>
          )}

          {depositInput.trim() && !validateDepositAmount() && (
            <DepositDropdownSection
              filteredBanks={filteredBanks}
              handleBankSelection={handleBankSelection}
            />
          )}

          {recommendation && <RecommendationSection recommendation={recommendation} />}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BudgetPlannerSection

import { motion } from 'framer-motion'
import useBudgetPlannerSection from './hooks/useBudgetPlannerSecion'
import InputField from '../DepositSection/DepositCalculation/InputField'
import { formatNumberWithCommas, parseAmountInputFromCommas } from '@/services/inputServices'
import { useState } from 'react'
import NeedsSection from './NeedsSection/NeedsSection'
import DepositDropdownSection from './DepositDropdownSection/DepositDropdownSection'
import RecommendationSection from './RecommendationSection/RecommendationSection'
import { containerVariants, childVariants } from '@/constants/animations'
import Icon from '@/components/Icon/Icon'

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

  const newErrors = {
    needInput: EMPTY_STRING,
    priceInput: EMPTY_STRING,
    depositInput: EMPTY_STRING
  }

  const isNumberAndDecimalRegex = /^\d+(\.\d+)?$/

  const validateDepositAmount = () => {
    if (!depositInput.trim()) return 'Jumlah deposit tidak boleh kosong.'
    if (isNaN(Number(depositInput.replace(/,/g, ''))))
      return 'Jumlah deposit harus berupa angka valid.'
    if (Number(depositInput.replace(/,/g, '')) < 10000000)
      return 'Jumlah deposit minimal Rp10.000.000'
    return null
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setField: (value: string) => void,
    fieldName: string
  ) => {
    const value = e.target.value
    if (fieldName === 'priceInput' || fieldName === 'depositInput') {
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
      newErrors.needInput = 'Nama pengeluaran wajib diisi'
      isValid = false
    }

    if (!priceInput) {
      newErrors.priceInput = 'Biaya wajib diisi'
      isValid = false
    } else if (!isNumberAndDecimalRegex.test(parseAmountInputFromCommas(priceInput))) {
      newErrors.priceInput = 'Biaya harus berupa angka'
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
    <motion.section
      className='py-16 md:py-24 w-full bg-slate-50'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      <div className='layout'>
        {/* Section Header */}
        <motion.div className='text-center max-w-2xl mx-auto mb-10' variants={childVariants}>
          <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-3'>
            <Icon name='calculator' className='w-3.5 h-3.5' />
            <span>Passive Income Planner</span>
          </div>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3'>
            Rencana Anggaran Bulanan
          </h2>
          <p className='text-slate-600 text-sm md:text-base leading-relaxed'>
            Hitung seberapa banyak biaya rutin bulanan yang bisa ditutup dari hasil bunga deposito
            Anda.
          </p>
        </motion.div>

        {/* Card Form */}
        <motion.div
          className='max-w-4xl mx-auto rounded-2xl bg-white border border-slate-200/90 shadow-card p-6 sm:p-8'
          variants={childVariants}
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <InputField
              label='Nama Pengeluaran'
              placeholder='Contoh: Sewa Wifi, Tagihan Listrik'
              type='text'
              value={needInput}
              onChange={(e) => handleInputChange(e, setNeedInput, 'needInput')}
              error={errors.needInput}
            />

            <InputField
              label='Biaya Bulanan'
              placeholder='1.500.000'
              type='text'
              prefix='Rp'
              value={priceInput}
              onChange={(e) => handleInputChange(e, setPriceInput, 'priceInput')}
              error={errors.priceInput}
            />
          </div>

          <div className='mt-4'>
            <button
              type='button'
              onClick={handleAddNeedWithValidation}
              className='btn w-full py-3 h-auto bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold text-sm border-0 shadow-sm transition-all flex items-center justify-center gap-2'
            >
              <span>Tambahkan ke Daftar Anggaran</span>
              <Icon name='arrow-right' className='w-4 h-4' />
            </button>
          </div>

          {needs.length > 0 && (
            <div className='mt-8 pt-6 border-t border-slate-200'>
              <NeedsSection needs={needs} onRemoveNeed={handleRemoveNeed} />
            </div>
          )}

          {needs.length > 0 && (
            <div className='mt-8 pt-6 border-t border-slate-200'>
              <h3 className='text-base font-bold text-slate-900 mb-3'>
                Masukkan Modal Deposito yang Direncanakan
              </h3>
              <InputField
                label='Jumlah Deposito Pokok'
                placeholder='100.000.000'
                type='text'
                prefix='Rp'
                value={depositInput}
                onChange={(e) => handleInputChange(e, setDepositInput, 'depositInput')}
                error={errors.depositInput}
              />
            </div>
          )}

          {depositInput.trim() && !validateDepositAmount() && (
            <div className='mt-6'>
              <DepositDropdownSection
                filteredBanks={filteredBanks}
                handleBankSelection={handleBankSelection}
              />
            </div>
          )}

          {recommendation && (
            <div className='mt-8 pt-6 border-t border-slate-200'>
              <RecommendationSection recommendation={recommendation} />
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default BudgetPlannerSection

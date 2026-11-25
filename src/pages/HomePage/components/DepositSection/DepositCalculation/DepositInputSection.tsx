import { useState, useEffect } from 'react'
import InputField from './InputField'
import { calculateInterest } from '@/services/depositServices'
import { motion } from 'framer-motion'
import { formatNumberWithCommas, parseAmountInputFromCommas } from '@/services/inputServices'
import { childVariants } from '@/constants/animations'

interface DepositInputSectionProps {
  setInterest: (interest: number) => void
  taxRate: string
  setTaxRate: (taxRate: string) => void
  holdingMonths: string
  setHoldingMonths: (holdingMonths: string) => void
  amount: string
  setAmount: (amount: string) => void
  interestRate: string
  setInterestRate: (interestRate: string) => void
}

const DepositInputSection = (props: DepositInputSectionProps) => {
  const EMPTY_STRING = ''
  const {
    setInterest,
    setTaxRate,
    holdingMonths,
    setHoldingMonths,
    amount,
    setAmount,
    interestRate,
    setInterestRate
  } = props

  const [errors, setErrors] = useState({
    amount: EMPTY_STRING,
    interestRate: EMPTY_STRING,
    taxRate: EMPTY_STRING,
    holdingMonths: EMPTY_STRING
  })

  // Automatic Indonesian PPh Final rule (PP No. 131/2000): 0% for <= Rp7.500.000, 20% above
  const parsedNumericAmount = parseFloat(parseAmountInputFromCommas(amount)) || 0
  const effectiveTaxRate = parsedNumericAmount > 0 && parsedNumericAmount <= 7_500_000 ? '0' : '20'

  useEffect(() => {
    setTaxRate(effectiveTaxRate)
  }, [effectiveTaxRate, setTaxRate])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setField: (value: string) => void,
    fieldName: string
  ) => {
    const value = e.target.value
    if (fieldName === 'amount') {
      const formattedValue = formatNumberWithCommas(value)
      setField(formattedValue)
    } else if (fieldName === 'interestRate') {
      setField(value.replace(',', '.'))
    } else {
      setField(value)
    }

    // Clear error
    setErrors((prev) => ({ ...prev, [fieldName]: EMPTY_STRING }))
  }

  const validateFields = () => {
    const newErrors = {
      amount: EMPTY_STRING,
      interestRate: EMPTY_STRING,
      taxRate: EMPTY_STRING,
      holdingMonths: EMPTY_STRING
    }
    let isValid = true
    const isNumberAndDecimalRegex = /^\d+(\.\d+)?$/

    if (!amount) {
      newErrors.amount = 'Nominal deposito wajib diisi'
      isValid = false
    } else if (!isNumberAndDecimalRegex.test(parseAmountInputFromCommas(amount))) {
      newErrors.amount = 'Format angka tidak valid'
      isValid = false
    } else if (parseFloat(parseAmountInputFromCommas(amount)) < 1000000) {
      newErrors.amount = 'Minimal penempatan Rp1.000.000'
      isValid = false
    }

    if (!interestRate) {
      newErrors.interestRate = 'Suku bunga wajib diisi'
      isValid = false
    } else if (!isNumberAndDecimalRegex.test(interestRate)) {
      newErrors.interestRate = 'Format suku bunga harus angka'
      isValid = false
    }

    if (!holdingMonths) {
      newErrors.holdingMonths = 'Tenor bulan wajib diisi'
      isValid = false
    } else if (parseFloat(holdingMonths) < 1) {
      newErrors.holdingMonths = 'Tenor minimal 1 bulan'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const doCalculateInterest = () => {
    if (validateFields()) {
      const stringAmount = amount.replace(/,/g, '')
      const normalizedRate = interestRate.replace(',', '.')
      const interest = calculateInterest(
        stringAmount,
        effectiveTaxRate,
        normalizedRate,
        holdingMonths
      )
      setInterest(parseFloat(interest))
    }
  }

  const isInterestRateEnabled = amount.length !== 0 && !errors.amount
  const isTaxRateEnabled = interestRate.length !== 0 && !errors.interestRate
  const isHoldingMonthsEnabled = holdingMonths.length !== 0 && !errors.holdingMonths

  useEffect(() => {
    if (isHoldingMonthsEnabled && (isInterestRateEnabled || isTaxRateEnabled)) {
      doCalculateInterest()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holdingMonths, interestRate, amount])

  const clearInput = () => {
    setAmount(EMPTY_STRING)
    setInterestRate(EMPTY_STRING)
    setTaxRate('20')
    setHoldingMonths(EMPTY_STRING)
    setInterest(0)
    setErrors({
      amount: EMPTY_STRING,
      interestRate: EMPTY_STRING,
      taxRate: EMPTY_STRING,
      holdingMonths: EMPTY_STRING
    })
  }

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <motion.div variants={childVariants}>
          <InputField
            label='Jumlah Deposito'
            value={amount}
            onChange={(e) => handleInputChange(e, setAmount, 'amount')}
            placeholder='10.000.000'
            error={errors.amount}
            type='text'
            prefix='Rp'
            required={true}
          />
        </motion.div>

        <motion.div variants={childVariants}>
          <InputField
            label='Suku Bunga / Tahun'
            value={interestRate}
            onChange={(e) => handleInputChange(e, setInterestRate, 'interestRate')}
            placeholder='Contoh: 5.5'
            error={errors.interestRate}
            type='text'
            suffix='%'
            required={true}
          />
        </motion.div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <motion.div variants={childVariants}>
          <InputField
            label='Lama Deposito (Tenor)'
            value={holdingMonths}
            onChange={(e) => handleInputChange(e, setHoldingMonths, 'holdingMonths')}
            placeholder='12'
            error={errors.holdingMonths}
            type='number'
            min={1}
            suffix='Bulan'
            required={true}
          />
        </motion.div>

        <motion.div variants={childVariants}>
          <InputField
            label='Pajak Bunga Deposito'
            value={effectiveTaxRate}
            onChange={(e) => handleInputChange(e, setTaxRate, 'taxRate')}
            placeholder='20%'
            error={errors.taxRate}
            helperText={
              effectiveTaxRate === '0'
                ? 'Bebas PPh Final (saldo ≤ Rp7,5 juta sesuai PP 131/2000)'
                : undefined
            }
            type='text'
            suffix='%'
            disabled={true}
            required={true}
          />
        </motion.div>
      </div>

      <div className='flex justify-end pt-1'>
        <button
          type='button'
          onClick={clearInput}
          className='text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline px-3 py-1.5 transition-colors'
        >
          Reset Perhitungan
        </button>
      </div>
    </div>
  )
}

export default DepositInputSection

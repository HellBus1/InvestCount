import { useState, useEffect } from 'react'
import InputField from './InputField'
import { calculateInterest } from '@/services/depositServices'
import { motion } from 'motion/react'
import { formatNumberWithCommas, parseAmountInputFromCommas } from '@/services/inputServices'

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
    taxRate,
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
  const [, setIsFormValid] = useState(false)

  // Set default tax rate to 20
  useEffect(() => {
    setTaxRate('20')
  }, [setTaxRate])

  useEffect(() => {
    setIsFormValid(
      amount !== EMPTY_STRING && interestRate !== EMPTY_STRING && holdingMonths !== EMPTY_STRING
    )
  }, [amount, interestRate, holdingMonths])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setField: (value: string) => void,
    fieldName: string
  ) => {
    const value = e.target.value
    if (fieldName === 'amount') {
      const formattedValue = formatNumberWithCommas(value)
      setField(formattedValue)
    } else {
      setField(value)
    }

    // Reset error on field change
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

    // Check if all fields are filled
    if (!amount) {
      newErrors.amount = 'Jumlah Deposito Wajib Diisi'
      isValid = false
    } else if (!isNumberAndDecimalRegex.test(parseAmountInputFromCommas(amount))) {
      newErrors.amount = 'Jumlah Deposito Harus Berupa Angka'
      isValid = false
    } else if (parseFloat(parseAmountInputFromCommas(amount)) < 1000000) {
      newErrors.amount = 'Jumlah Deposito Minimal Rp1.000.000'
      isValid = false
    }

    if (!interestRate) {
      newErrors.interestRate = 'Suku Bunga Wajib Diisi'
      isValid = false
    } else if (!isNumberAndDecimalRegex.test(interestRate)) {
      newErrors.interestRate = 'Suku Bunga Harus Berupa Angka'
      isValid = false
    }

    if (!holdingMonths) {
      newErrors.holdingMonths = 'Total Bulan Wajib Diisi'
      isValid = false
    } else if (parseFloat(holdingMonths) < 1) {
      newErrors.holdingMonths = 'Total Bulan Harus Lebih Dari 0'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const doCalculateInterest = () => {
    if (validateFields()) {
      const stringAmount = amount.replace(/,/g, '')
      const interest = calculateInterest(stringAmount, '20', interestRate, holdingMonths)
      setInterest(parseFloat(interest))
    }
  }

  const isInterestRateEnabled = amount.length !== 0 && !errors.amount
  const isTaxRateEnabled = interestRate.length !== 0 && !errors.interestRate
  isInterestRateEnabled && isTaxRateEnabled && taxRate.length !== 0 && !errors.taxRate
  const isHoldingMonthsEnabled = holdingMonths.length !== 0 && !errors.holdingMonths

  useEffect(() => {
    if (isHoldingMonthsEnabled) {
      if (isInterestRateEnabled || isTaxRateEnabled) {
        doCalculateInterest()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holdingMonths, interestRate, amount])

  const clearInput = () => {
    setAmount(EMPTY_STRING)
    setInterestRate(EMPTY_STRING)
    setTaxRate('20') // Reset tax rate to default
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
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <InputField
          label='Jumlah Deposito (Rp)'
          value={amount}
          onChange={(e) => handleInputChange(e, setAmount, 'amount')}
          placeholder='Minimal Rp1.000.000'
          error={errors.amount}
          type='text'
          required={true}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <InputField
          label='Suku Bunga (%)'
          value={interestRate}
          onChange={(e) => handleInputChange(e, setInterestRate, 'interestRate')}
          placeholder='Misal 5 atau 6.5'
          error={errors.interestRate}
          type='text'
          required={true}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <InputField
          label='Pajak Deposito (%)'
          value='20'
          onChange={(e) => handleInputChange(e, setTaxRate, 'taxRate')}
          placeholder='Pajak bunga deposito umumnya 20% sesuai aturan di Indonesia'
          error={errors.taxRate}
          type='text'
          disabled={true}
          required={true}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <InputField
          label='Lama Deposito (bulan)'
          value={holdingMonths}
          onChange={(e) => handleInputChange(e, setHoldingMonths, 'holdingMonths')}
          placeholder='Minimal 1 bulan'
          error={errors.holdingMonths}
          type='number'
          min={1}
          required={true}
        />
      </motion.div>
      <div className='card-actions justify-end'>
        <button onClick={clearInput} className='btn btn-primary text-[#ffffff]'>
          Atur Ulang
        </button>
      </div>
    </div>
  )
}

export default DepositInputSection

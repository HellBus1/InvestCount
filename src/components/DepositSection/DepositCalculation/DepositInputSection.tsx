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
}

const DepositInputSection = (props: DepositInputSectionProps) => {
  const EMPTY_STRING = ''
  const { setInterest, taxRate, setTaxRate, holdingMonths, setHoldingMonths } = props
  const [amount, setAmount] = useState(EMPTY_STRING)
  const [interestRate, setInterestRate] = useState(EMPTY_STRING)
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
      newErrors.amount = 'Deposit Amount is required'
      isValid = false
    } else if (!isNumberAndDecimalRegex.test(parseAmountInputFromCommas(amount))) {
      newErrors.amount = 'Deposit Amount should be a valid number'
      isValid = false
    } else if (parseFloat(parseAmountInputFromCommas(amount)) < 1000000) {
      newErrors.amount = 'Deposit Amount must be greater than 1,000,000'
      isValid = false
    }

    if (!interestRate) {
      newErrors.interestRate = 'Interest Rate is required'
      isValid = false
    } else if (!isNumberAndDecimalRegex.test(interestRate)) {
      newErrors.interestRate = 'Interest Rate should be a valid number'
      isValid = false
    }

    if (!holdingMonths) {
      newErrors.holdingMonths = 'Number of Months is required'
      isValid = false
    } else if (parseFloat(holdingMonths) < 1) {
      newErrors.holdingMonths = 'Number of Months must be greater than or equal to 1'
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
  const isNumberOfMonthsEnabled =
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
          label='Deposit Amount (IDR)'
          value={amount}
          onChange={(e) => handleInputChange(e, setAmount, 'amount')}
          placeholder='Minimum 1,000,000 IDR'
          error={errors.amount}
          type='text'
        />
      </motion.div>
      {isInterestRateEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <InputField
            label='Interest Rate (%)'
            value={interestRate}
            onChange={(e) => handleInputChange(e, setInterestRate, 'interestRate')}
            placeholder='Eg 10 or 8.5'
            error={errors.interestRate}
            type='text'
          />
        </motion.div>
      )}
      {isTaxRateEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <InputField
            label='Tax Rate (%)'
            value='20'
            onChange={(e) => handleInputChange(e, setTaxRate, 'taxRate')}
            placeholder='Eg 20'
            error={errors.taxRate}
            type='text'
            disabled={true}
          />
        </motion.div>
      )}
      {isNumberOfMonthsEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <InputField
            label='Number of Months'
            value={holdingMonths}
            onChange={(e) => handleInputChange(e, setHoldingMonths, 'holdingMonths')}
            placeholder='Minimum 1 month'
            error={errors.holdingMonths}
            type='number'
            min={1}
          />
        </motion.div>
      )}
      <div className='card-actions justify-end'>
        <button onClick={clearInput} className='btn btn-primary text-[#ffffff]'>
          Reset
        </button>
      </div>
    </div>
  )
}

export default DepositInputSection

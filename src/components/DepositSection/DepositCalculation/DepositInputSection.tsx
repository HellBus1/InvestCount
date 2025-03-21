import { useState, useEffect } from 'react'
import InputField from './InputField'
import { calculateInterest } from '@/services/depositServices'

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
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setIsFormValid(
      amount !== EMPTY_STRING &&
        interestRate !== EMPTY_STRING &&
        taxRate !== EMPTY_STRING &&
        holdingMonths !== EMPTY_STRING
    )
  }, [amount, interestRate, taxRate, holdingMonths])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setField: (value: string) => void,
    fieldName: string
  ) => {
    const value = e.target.value
    setField(value)

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
    } else if (parseFloat(amount) < 1000000) {
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

    if (!taxRate) {
      newErrors.taxRate = 'Tax Rate is required'
      isValid = false
    } else if (!isNumberAndDecimalRegex.test(taxRate)) {
      newErrors.taxRate = 'Tax Rate should be a valid number'
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
      const interest = calculateInterest(amount, taxRate, interestRate, holdingMonths)
      setInterest(parseFloat(interest))
    }
  }

  const clearInput = () => {
    setAmount(EMPTY_STRING)
    setInterestRate(EMPTY_STRING)
    setTaxRate(EMPTY_STRING)
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
      <InputField
        label='Deposit Amount (IDR)'
        value={amount}
        onChange={(e) => handleInputChange(e, setAmount, 'amount')}
        placeholder='Minimum 1,000,000 IDR'
        error={errors.amount}
        type='number'
        min={1000000}
      />
      <div className='flex flex-col md:flex-row md:space-x-10 space-y-4 md:space-y-0'>
        <div className='flex-1'>
          <InputField
            label='Interest Rate (%)'
            value={interestRate}
            onChange={(e) => handleInputChange(e, setInterestRate, 'interestRate')}
            placeholder='Eg 10 or 8.5'
            error={errors.interestRate}
            type='text'
          />
        </div>
        <div className='flex-1'>
          <InputField
            label='Tax Rate (%)'
            value={taxRate}
            onChange={(e) => handleInputChange(e, setTaxRate, 'taxRate')}
            placeholder='Eg 20 or 5.8'
            error={errors.taxRate}
            type='text'
          />
        </div>
      </div>
      <InputField
        label='Number of Months'
        value={holdingMonths}
        onChange={(e) => handleInputChange(e, setHoldingMonths, 'holdingMonths')}
        placeholder='Minimum 1 month'
        error={errors.holdingMonths}
        type='number'
        min={1}
      />
      <div className='card-actions justify-end'>
        <button
          onClick={doCalculateInterest}
          className={`btn btn-primary text-[#ffffff] ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isFormValid}
        >
          Calculate
        </button>
        <button onClick={clearInput} className='btn btn-secondary text-[#ffffff]'>
          Reset
        </button>
      </div>
    </div>
  )
}

export default DepositInputSection

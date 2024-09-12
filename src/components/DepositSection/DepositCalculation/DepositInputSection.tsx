import { useState } from 'react'
import InputField from './InputField'

interface DepositInputSectionProps {
  setInterest: (interest: number) => void
  taxRate: string
  setTaxRate: (taxRate: string) => void
  holdingMonths: string
  setHoldingMonths: (holdingMonths: string) => void
}

const DepositInputSection = (props: DepositInputSectionProps) => {
  const { setInterest, taxRate, setTaxRate, holdingMonths, setHoldingMonths } = props
  const [amount, setAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [errors, setErrors] = useState({
    amount: '',
    interestRate: '',
    taxRate: '',
    holdingMonths: ''
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setField: (value: string) => void,
    fieldName: string
  ) => {
    const value = e.target.value
    setField(value)

    // Reset error on field change
    setErrors((prev) => ({ ...prev, [fieldName]: '' }))
  }

  const validateFields = () => {
    const newErrors = {
      amount: '',
      interestRate: '',
      taxRate: '',
      holdingMonths: ''
    }
    let isValid = true
    const isNumberAndDecimalRegex = /^\d+(\.\d+)?$/

    // Check if all fields are filled
    if (!amount) {
      newErrors.amount = 'Deposit Amount is required'
      isValid = false
    } else if (parseFloat(amount) < 1000000) {
      newErrors.amount = 'Deposit Amount must be greater than 1000000'
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
    } else if (!isNumberAndDecimalRegex.test(interestRate)) {
      newErrors.interestRate = 'Tax Rate should be a valid number'
      isValid = false
    }

    if (!holdingMonths) {
      newErrors.holdingMonths = 'Number of Months is required'
      isValid = false
    } else if (parseFloat(holdingMonths) < 1) {
      newErrors.amount = 'Number of Months must be greater than equals 1'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const DAYS_IN_COMMON_YEAR = 365
  const DAYS_IN_LEAP_YEAR = 366
  const MONTHS_IN_YEAR = 12
  const CENTURY_YEAR_DIVISOR = 100
  const CENTURY_LEAP_YEAR_DIVISOR = 400
  const LEAP_YEAR_DIVISOR = 4
  const PERCENTAGE_DIVISOR = 100
  const REAL_MONTH_NUMBER_INDEX_INCREMENT = 1

  const getTotalHoldingDays = (currentYear: number, months: number) => {
    let totalDays = 0
    for (let monthIndex = 0; monthIndex < months; monthIndex++) {
      const yearOffset = Math.floor(monthIndex / MONTHS_IN_YEAR)
      const year = currentYear + yearOffset
      const monthOffset = monthIndex % MONTHS_IN_YEAR
      const month = monthOffset + REAL_MONTH_NUMBER_INDEX_INCREMENT
      const numberOfDaysInCurrentMonth = new Date(year, month, 0).getDate()
      totalDays += numberOfDaysInCurrentMonth
    }

    return totalDays
  }

  const isLeapYear = (year: number) => {
    return (
      (year % LEAP_YEAR_DIVISOR === 0 && year % CENTURY_YEAR_DIVISOR !== 0) ||
      year % CENTURY_LEAP_YEAR_DIVISOR === 0
    )
  }

  const calculateInterest = () => {
    if (validateFields()) {
      const taxRateInNumber = parseFloat(taxRate)
      const interestRateInNumber = parseFloat(interestRate)
      const year = new Date().getFullYear()
      const holdingDays = getTotalHoldingDays(year, parseInt(holdingMonths))
      const daysInYear = isLeapYear(year) ? DAYS_IN_LEAP_YEAR : DAYS_IN_COMMON_YEAR

      const interest =
        parseFloat(amount) *
        (interestRateInNumber / PERCENTAGE_DIVISOR) *
        (holdingDays / daysInYear) *
        (1 - taxRateInNumber / PERCENTAGE_DIVISOR)

      setInterest(interest)
    }
  }

  const clearInput = () => {
    setAmount('')
    setInterestRate('')
    setTaxRate('')
    setHoldingMonths('')
    setErrors({
      amount: '',
      interestRate: '',
      taxRate: '',
      holdingMonths: ''
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
      <div className='flex space-x-10'>
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
        <button onClick={calculateInterest} className='btn btn-primary text-[#ffffff]'>
          Calculate
        </button>
        <button onClick={clearInput} className='btn btn-primary text-[#ffffff]'>
          Reset
        </button>
      </div>
    </div>
  )
}

export default DepositInputSection

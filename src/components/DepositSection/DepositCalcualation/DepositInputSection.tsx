import { useState } from 'react'

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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(e.target.value)
  }

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaxRate(e.target.value)
  }

  const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoldingMonths(e.target.value)
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
    if (amount && interestRate && taxRate && holdingMonths) {
      const year = new Date().getFullYear()
      const holdingDays = getTotalHoldingDays(year, parseInt(holdingMonths))
      const daysInYear = isLeapYear(year) ? DAYS_IN_LEAP_YEAR : DAYS_IN_COMMON_YEAR

      const interest =
        parseFloat(amount) *
        (parseFloat(interestRate) / PERCENTAGE_DIVISOR) *
        (holdingDays / daysInYear) *
        (1 - parseFloat(taxRate) / PERCENTAGE_DIVISOR)

      setInterest(interest)
    }
  }

  return (
    <div>
      <div className='mb-4'>
        <label className='label'>
          <span className='label-text text-charter-blue-600 font-bold'>Deposit Amount (IDR)</span>
        </label>
        <input
          type='number'
          value={amount}
          onChange={handleAmountChange}
          className='input input-bordered w-full rounded'
          placeholder='Minimun 1,000,000 IDR'
        />
      </div>
      <div className='mb-4 flex flex-row space-x-10'>
        <div className='flex-1'>
          <label className='label'>
            <span className='label-text text-charter-blue-600 font-bold'>
              Annual Interest Rate (%)
            </span>
          </label>
          <input
            type='text'
            value={interestRate}
            onChange={handleInterestRateChange}
            className='input input-bordered w-full rounded'
            placeholder='Eg 10'
          />
        </div>
        <div className='flex-1'>
          <label className='label'>
            <span className='label-text text-charter-blue-600 font-bold'>Tax Rate (%)</span>
          </label>
          <input
            type='text'
            value={taxRate}
            onChange={handleTaxRateChange}
            className='input input-bordered w-full rounded'
            placeholder='Eg 20'
          />
        </div>
      </div>
      <div className='mb-6'>
        <label className='label'>
          <span className='label-text text-charter-blue-600 font-bold'>Number of Months</span>
        </label>
        <input
          type='number'
          value={holdingMonths}
          onChange={handleMonthsChange}
          className='input input-bordered w-full rounded'
          placeholder='Minimum 1 month'
        />
      </div>
      <div className='card-actions justify-end'>
        <button onClick={calculateInterest} className='btn btn-primary'>
          <p className='text-[#ffffff]'>Calculate</p>
        </button>
        <button onClick={calculateInterest} className='btn btn-primary'>
          <p className='text-[#ffffff]'>Reset</p>
        </button>
      </div>
    </div>
  )
}

export default DepositInputSection

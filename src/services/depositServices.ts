const getTotalHoldingDays = (months: number) => {
  const TOTAL_DAYS_IN_MONTH = 30
  const totalDays = TOTAL_DAYS_IN_MONTH * months
  return totalDays
}

const isLeapYear = (year: number) => {
  const CENTURY_YEAR_DIVISOR = 100
  const CENTURY_LEAP_YEAR_DIVISOR = 400
  const LEAP_YEAR_DIVISOR = 4

  return (
    (year % LEAP_YEAR_DIVISOR === 0 && year % CENTURY_YEAR_DIVISOR !== 0) ||
    year % CENTURY_LEAP_YEAR_DIVISOR === 0
  )
}

const calculateInterest = (
  amount: string,
  taxRate: string,
  interestRate: string,
  holdingMonths: string
) => {
  const DAYS_IN_COMMON_YEAR = 365
  const DAYS_IN_LEAP_YEAR = 366
  const PERCENTAGE_DIVISOR = 100

  const taxRateInNumber = parseFloat(taxRate)
  const interestRateInNumber = parseFloat(interestRate)
  const year = new Date().getFullYear()
  const holdingDays = getTotalHoldingDays(parseInt(holdingMonths))
  const daysInYear = isLeapYear(year) ? DAYS_IN_LEAP_YEAR : DAYS_IN_COMMON_YEAR

  const interest =
    parseFloat(amount) *
    (interestRateInNumber / PERCENTAGE_DIVISOR) *
    (holdingDays / daysInYear) *
    (1 - taxRateInNumber / PERCENTAGE_DIVISOR)

  return interest.toFixed(2)
}

export { calculateInterest }

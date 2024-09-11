import { useState } from 'react'
import DepositInputSection from './DepositInputSection'
import DepositRateResult from './DepositRateResult'

const DepositCalculation = () => {
  const [interest, setInterest] = useState(0)
  const [taxRate, setTaxRate] = useState('')
  const [holdingMonths, setHoldingMonths] = useState('')

  const getZeroFromEmptyNumberString = (numberString: string) => {
    const ZERO = 0
    return numberString.length <= ZERO ? ZERO : parseFloat(numberString)
  }

  return (
    <div className='card shadow-xl border-s-8 border-charter-blue'>
      <div className='card-body'>
        <div className='flex flex-col md:flex-row items-top md:space-x-8'>
          <div className='flex-[1.2]'>
            <DepositInputSection
              setInterest={setInterest}
              taxRate={taxRate}
              setTaxRate={setTaxRate}
              holdingMonths={holdingMonths}
              setHoldingMonths={setHoldingMonths}
            />
          </div>
          <div className='mx-4'></div>
          <div className='flex-[1]'>
            <DepositRateResult
              interest={interest}
              tax={getZeroFromEmptyNumberString(taxRate)}
              month={getZeroFromEmptyNumberString(holdingMonths)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepositCalculation

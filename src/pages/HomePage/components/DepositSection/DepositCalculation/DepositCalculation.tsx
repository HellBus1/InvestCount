import { useState } from 'react'
import DepositInputSection from './DepositInputSection'
import DepositRateResult from './DepositRateResult'
import { DepositType } from '@/constants/DepositType'
import NetWorthSimulationModal from '../NetWorthSimulationModal/NetWorthSimulationModal'

interface DepositCalculationProps {
  selectedOption: string
}

const DepositCalculation = (props: DepositCalculationProps) => {
  const EMPTY_STRING = ''
  const [interest, setInterest] = useState(0)
  const [interestRate, setInterestRate] = useState(EMPTY_STRING)
  const [taxRate, setTaxRate] = useState(EMPTY_STRING)
  const [holdingMonths, setHoldingMonths] = useState(EMPTY_STRING)
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState(EMPTY_STRING)
  const { selectedOption } = props

  // Helper to get number from string or 0
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
              amount={amount}
              setAmount={setAmount}
              interestRate={interestRate}
              setInterestRate={setInterestRate}
            />
          </div>
          <div className='mx-4'></div>

          <div className='flex-[1]'>
            <DepositRateResult
              interest={interest}
              month={getZeroFromEmptyNumberString(holdingMonths)}
            />

            <button
              className='btn btn-primary text-[#ffffff] mt-4 mb-2'
              onClick={() => setShowModal(true)}
              disabled={
                interest <= 0 ||
                amount.length === 0 ||
                interestRate.length === 0 ||
                taxRate.length === 0 ||
                holdingMonths.length === 0 ||
                selectedOption !== DepositType.AROPLUS
              }
            >
              Lihat Simulasi Kekayaan Bersih
            </button>

            <div className='text-charter-blue-600 font-semibold text-xs md:text-sm mb-4'>
              *(Pilih ARO+ untuk melihat simulasi)
            </div>

            {selectedOption === DepositType.AROPLUS && (
              <>
                {showModal && (
                  <NetWorthSimulationModal
                    amount={amount}
                    interestRate={interestRate}
                    taxRate={taxRate}
                    holdingMonths={holdingMonths}
                    setShowModal={setShowModal}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepositCalculation

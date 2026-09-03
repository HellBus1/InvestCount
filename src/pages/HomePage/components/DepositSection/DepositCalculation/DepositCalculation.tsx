import { useState } from 'react'
import DepositInputSection from './DepositInputSection'
import DepositRateResult from './DepositRateResult'
import { DepositType } from '@/constants/DepositType'
import NetWorthSimulationModal from '../NetWorthSimulationModal/NetWorthSimulationModal'
import Icon from '@/components/Icon/Icon'

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

  const getZeroFromEmptyNumberString = (numberString: string) => {
    const ZERO = 0
    return numberString.length <= ZERO ? ZERO : parseFloat(numberString)
  }

  const isAroPlusEligible =
    interest > 0 &&
    amount.length > 0 &&
    interestRate.length > 0 &&
    taxRate.length > 0 &&
    holdingMonths.length > 0 &&
    selectedOption === DepositType.AROPLUS

  return (
    <div className='w-full rounded-2xl bg-white border border-slate-200/90 shadow-card p-6 md:p-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        {/* Input Controls */}
        <div className='lg:col-span-7'>
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

        {/* Results & Action */}
        <div className='lg:col-span-5 flex flex-col gap-4'>
          <DepositRateResult
            interest={interest}
            month={getZeroFromEmptyNumberString(holdingMonths)}
          />

          <button
            type='button'
            className={`btn w-full py-3 h-auto rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
              isAroPlusEligible
                ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-card border-0'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
            onClick={() => setShowModal(true)}
            disabled={!isAroPlusEligible}
          >
            <Icon name='chart-bar' className='w-4 h-4' />
            <span>Simulasi Proyeksi Kekayaan</span>
          </button>

          <p className='text-xs text-center text-slate-500'>
            {selectedOption === DepositType.AROPLUS
              ? 'Klik tombol di atas untuk melihat tabel compounding tahunan.'
              : 'Pilih tipe ARO+ untuk mengaktifkan simulasi bunga majemuk.'}
          </p>

          {selectedOption === DepositType.AROPLUS && showModal && (
            <NetWorthSimulationModal
              amount={amount}
              interestRate={interestRate}
              taxRate={taxRate}
              holdingMonths={holdingMonths}
              setShowModal={setShowModal}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default DepositCalculation

import { calculateInterest } from '@/services/depositServices'
import { getRupiahFormat } from '@/services/inputServices'
import { useState } from 'react'

interface NetWorthSimulationModalProps {
  amount: string
  interestRate: string
  taxRate: string
  holdingMonths: string
  setShowModal: (show: boolean) => void
}

const NetWorthSimulationModal = (props: NetWorthSimulationModalProps) => {
  const { amount, interestRate, taxRate, holdingMonths, setShowModal } = props

  const [years, setYears] = useState(1)
  const initialMoney = parseFloat(amount.replace(/,/g, '')) || 0

  const simulateCompoundGrowth = (
    principal: number,
    taxRate: string,
    interestRate: string,
    holdingMonths: string,
    years: number
  ) => {
    const moneyList: number[] = [principal]
    let currentPrincipal = principal
    for (let i = 1; i <= years; i++) {
      const interest = parseFloat(
        calculateInterest(currentPrincipal.toString(), taxRate, interestRate, holdingMonths)
      )
      currentPrincipal += interest
      moneyList.push(currentPrincipal)
    }
    return moneyList
  }

  const moneyList = simulateCompoundGrowth(
    initialMoney,
    taxRate,
    interestRate,
    holdingMonths === '' ? '12' : holdingMonths, // default to 12 months if empty
    years
  )

  const totalInterest = moneyList[years] - initialMoney
  const growthPercent = ((moneyList[years] / initialMoney - 1) * 100).toFixed(2)

  return (
    <dialog className='modal modal-open'>
      <form method='dialog' className='modal-box bg-base-100 rounded-2xl shadow-2xl p-8 max-w-xl'>
        <h3 className='font-bold text-2xl text-charter-blue mb-4'>Growth Simulation</h3>
        <div className='divider my-2'></div>
        {/* Layer 1: Initial money and year selector */}
        <div className='flex flex-row items-center gap-8 mb-6'>
          <div className='flex-1'>
            <label className='block text-sm font-semibold text-charter-blue mb-1'>
              Initial Money
            </label>
            <p className='text-lg font-mono text-gray-700 bg-base-200 rounded px-3 py-2'>
              {getRupiahFormat(initialMoney)}
            </p>
          </div>
          <div className='flex-1'>
            <label className='block text-sm font-semibold text-charter-blue mb-1'>Years</label>
            <select
              className='select select-bordered w-full bg-base-200'
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='divider my-2'></div>
        {/* Layer 2: Growth summary */}
        <div className='mb-6 flex justify-between items-center bg-base-200 rounded-lg px-4 py-3 shadow'>
          <div>
            <span className='text-gray-500'>Growth</span>
            <div className='font-bold text-xl text-charter-blue'>{growthPercent}%</div>
          </div>
          <div>
            <span className='text-gray-500'>Interest Rate</span>
            <div className='font-bold text-xl text-charter-blue'>{interestRate}%</div>
          </div>
          <div>
            <span className='text-gray-500'>Total Interest</span>
            <div className='font-bold text-xl text-success'>
              {totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
        {/* Layer 3: Money growth list (scrollable) */}
        <div
          className='overflow-y-auto mb-4 rounded-lg border border-base-200'
          style={{ maxHeight: '260px' }}
        >
          <table className='table w-full'>
            <thead>
              <tr className='bg-base-200 text-base-content'>
                <th className='font-semibold'>Year</th>
                <th className='font-semibold'>Net Worth</th>
              </tr>
            </thead>
            <tbody>
              {moneyList.slice(1).map((value, idx) => (
                <tr key={idx} className='hover:bg-base-200 transition'>
                  <td className='font-semibold'>{idx + 1}</td>
                  <td className='font-mono'>{getRupiahFormat(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='modal-action mt-2 flex justify-end'>
          <button
            className='btn btn-primary text-[#ffffff] hover:bg-charter-blue/90 border-0 rounded-lg px-6 shadow'
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default NetWorthSimulationModal

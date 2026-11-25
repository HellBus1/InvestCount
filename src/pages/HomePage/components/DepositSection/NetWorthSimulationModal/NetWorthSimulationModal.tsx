import { useEffect, useId, useRef, useState } from 'react'
import { calculateInterest } from '@/services/depositServices'
import { getRupiahFormat } from '@/services/inputServices'
import { formatPercentId } from '@/constants/lpsRates'
import Icon from '@/components/Icon/Icon'

interface NetWorthSimulationModalProps {
  amount: string
  interestRate: string
  taxRate: string
  holdingMonths: string
  setShowModal: (show: boolean) => void
}

const NetWorthSimulationModal = (props: NetWorthSimulationModalProps) => {
  const { amount, interestRate, taxRate, holdingMonths, setShowModal } = props
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const yearsSelectId = useId()

  const [years, setYears] = useState(1)
  const initialMoney = parseFloat(amount.replace(/,/g, '')) || 0
  const parsedInterestRate = parseFloat(interestRate) || 0

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (!dialog.open) {
      dialog.showModal()
    }

    const handleClose = () => {
      dialog.returnValue = ''
      setShowModal(false)
    }

    dialog.addEventListener('close', handleClose)

    // Fallback for browsers without native <dialog closedby="any"> support (e.g. Safari)
    const supportsClosedBy =
      typeof HTMLDialogElement !== 'undefined' && 'closedBy' in HTMLDialogElement.prototype

    let pressedOutside = false
    const isOutsideDialog = (event: PointerEvent) => {
      const rect = dialog.getBoundingClientRect()
      return (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
    }

    const handlePointerDown = (event: PointerEvent) => {
      pressedOutside = isOutsideDialog(event)
    }

    const handlePointerUp = (event: PointerEvent) => {
      if (pressedOutside && isOutsideDialog(event)) {
        dialog.close()
      }
      pressedOutside = false
    }

    if (!supportsClosedBy) {
      dialog.addEventListener('pointerdown', handlePointerDown)
      dialog.addEventListener('pointerup', handlePointerUp)
    }

    return () => {
      dialog.removeEventListener('close', handleClose)
      if (!supportsClosedBy) {
        dialog.removeEventListener('pointerdown', handlePointerDown)
        dialog.removeEventListener('pointerup', handlePointerUp)
      }
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [setShowModal])

  const simulateCompoundGrowth = (
    principal: number,
    tax: string,
    rate: string,
    months: string,
    totalYears: number
  ) => {
    const moneyList: number[] = [principal]
    let currentPrincipal = principal
    for (let i = 1; i <= totalYears; i++) {
      const interest = parseFloat(calculateInterest(currentPrincipal.toString(), tax, rate, months))
      currentPrincipal += Number.isFinite(interest) ? interest : 0
      moneyList.push(currentPrincipal)
    }
    return moneyList
  }

  const effectiveMonths = holdingMonths === '' ? '12' : holdingMonths
  const moneyList = simulateCompoundGrowth(
    initialMoney,
    taxRate,
    interestRate,
    effectiveMonths,
    years
  )

  const totalInterest = moneyList[years] - initialMoney
  const growthPercent = initialMoney > 0 ? (moneyList[years] / initialMoney - 1) * 100 : 0

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      {...({ closedby: 'any' } as Record<string, string>)}
      className='w-[calc(100%-2rem)] max-w-xl max-h-[90dvh] m-auto p-0 rounded-2xl bg-white border border-slate-200 shadow-elevated text-slate-900 overflow-hidden'
    >
      <div className='flex flex-col max-h-[90dvh]'>
        {/* Modal Header */}
        <div className='flex items-start justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-200/80 bg-slate-50/70'>
          <div className='min-w-0'>
            <div className='inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-700 mb-1'>
              <Icon name='chart-bar' className='w-3.5 h-3.5' />
              <span>Simulasi ARO+ (Compounding)</span>
            </div>
            <h1
              id={titleId}
              className='text-lg sm:text-xl font-bold font-display text-slate-900 leading-snug'
            >
              Proyeksi Pertumbuhan Deposito
            </h1>
          </div>

          <form method='dialog' className='flex-shrink-0'>
            <button
              type='submit'
              aria-label='Tutup simulasi proyeksi deposito'
              className='p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
            >
              <Icon name='close' className='w-5 h-5' />
            </button>
          </form>
        </div>

        {/* Scrollable Content */}
        <div className='p-5 sm:p-6 space-y-5 overflow-y-auto'>
          {/* Layer 1: Initial Principal & Duration Selector */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5'>
            <div>
              <span className='block text-xs font-semibold text-slate-700 mb-1.5'>Modal Awal</span>
              <div className='w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm sm:text-base font-bold tabular-nums text-slate-900'>
                {getRupiahFormat(initialMoney)}
              </div>
            </div>

            <div>
              <label
                htmlFor={yearsSelectId}
                className='block text-xs font-semibold text-slate-700 mb-1.5'
              >
                Lama Waktu (Tahun)
              </label>
              <select
                id={yearsSelectId}
                autoFocus
                className='w-full py-2.5 px-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm sm:text-base font-semibold focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none'
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Tahun
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Layer 2: Growth Summary Stats */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-2.5'>
            <div className='p-3.5 rounded-xl bg-slate-50 border border-slate-200/80'>
              <span className='block text-[11px] font-medium text-slate-500'>Pertumbuhan</span>
              <div className='mt-0.5 font-mono text-base sm:text-lg font-extrabold tabular-nums text-slate-900'>
                +{formatPercentId(Number(growthPercent.toFixed(2)))}%
              </div>
            </div>

            <div className='p-3.5 rounded-xl bg-slate-50 border border-slate-200/80'>
              <span className='block text-[11px] font-medium text-slate-500'>Suku Bunga</span>
              <div className='mt-0.5 font-mono text-base sm:text-lg font-extrabold tabular-nums text-slate-900'>
                {formatPercentId(parsedInterestRate)}% p.a.
              </div>
            </div>

            <div className='p-3.5 rounded-xl bg-brand-50/70 border border-brand-200/80'>
              <span className='block text-[11px] font-medium text-brand-800'>
                Total Bunga Bersih
              </span>
              <div className='mt-0.5 font-mono text-base sm:text-lg font-extrabold tabular-nums text-brand-700 break-words'>
                {getRupiahFormat(totalInterest)}
              </div>
            </div>
          </div>

          {/* Layer 3: Year-by-Year Compounding Table */}
          <div className='rounded-xl border border-slate-200 overflow-hidden'>
            <div className='max-h-60 overflow-y-auto'>
              <table className='w-full text-left border-collapse'>
                <thead className='sticky top-0 bg-slate-100 text-slate-700 text-xs font-semibold border-b border-slate-200'>
                  <tr>
                    <th className='py-2.5 px-3.5'>Tahun</th>
                    <th className='py-2.5 px-3.5 text-right'>Saldo Akhir</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-100 text-xs sm:text-sm'>
                  {moneyList.slice(1).map((value, idx) => (
                    <tr key={idx} className='hover:bg-slate-50/90 transition-colors'>
                      <td className='py-2.5 px-3.5 font-semibold text-slate-700 whitespace-nowrap'>
                        Tahun ke-{idx + 1}
                      </td>
                      <td className='py-2.5 px-3.5 font-mono font-semibold tabular-nums text-slate-900 text-right whitespace-nowrap'>
                        {getRupiahFormat(value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <form
          method='dialog'
          className='px-5 py-3.5 sm:px-6 sm:py-4 border-t border-slate-200/80 bg-slate-50/70 flex justify-end'
        >
          <button
            type='submit'
            className='w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
          >
            Tutup
          </button>
        </form>
      </div>
    </dialog>
  )
}

export default NetWorthSimulationModal

import { useState, useMemo } from 'react'
import { getImagePath } from '@/services/inputServices'
import { EligibleBankOption } from '../hooks/useBudgetPlannerSecion'
import { BANK_CATEGORY_LABELS, BankCategoryFilter, formatPercentId } from '@/constants/lpsRates'
import Icon from '@/components/Icon/Icon'

interface DepositDropdownSectionProps {
  filteredBanks: EligibleBankOption[]
  selectedBankName: string | null
  handleBankSelection: (bankName: string) => void
}

const FILTER_OPTIONS: BankCategoryFilter[] = ['all', 'bpr', 'digital', 'konvensional']

const DepositDropdownSection = ({
  filteredBanks,
  selectedBankName,
  handleBankSelection
}: DepositDropdownSectionProps) => {
  const [categoryFilter, setCategoryFilter] = useState<BankCategoryFilter>('all')

  const visibleBanks = useMemo(() => {
    if (categoryFilter === 'all') return filteredBanks
    return filteredBanks.filter((bank) => bank.category === categoryFilter)
  }, [filteredBanks, categoryFilter])

  if (filteredBanks.length === 0) {
    return (
      <div className='p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600'>
        Masukkan nominal modal deposito minimal Rp100.000 (bank digital) atau Rp1.000.000 (BPR)
        untuk memilih bank.
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-wrap items-center justify-between gap-2 mb-3'>
        <h3 className='text-sm font-bold text-slate-900'>
          3. Pilih Bank / BPR (Rate Tenor 1 Bulan)
        </h3>
        <div className='flex flex-wrap gap-1' role='tablist' aria-label='Filter kategori bank'>
          {FILTER_OPTIONS.map((filter) => {
            const active = categoryFilter === filter
            return (
              <button
                key={filter}
                type='button'
                role='tab'
                aria-selected={active}
                onClick={() => setCategoryFilter(filter)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {BANK_CATEGORY_LABELS[filter]}
              </button>
            )
          })}
        </div>
      </div>

      <div
        role='listbox'
        aria-label='Pilihan bank untuk simulasi anggaran'
        className='grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1'
      >
        {visibleBanks.map((bank) => {
          const isSelected = bank.bankName === selectedBankName
          return (
            <button
              key={bank.bankName}
              type='button'
              role='option'
              aria-selected={isSelected}
              onClick={() => handleBankSelection(bank.bankName)}
              className={`flex items-center justify-between gap-2.5 p-2.5 rounded-xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                isSelected
                  ? 'bg-brand-50/70 border-brand-500 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className='flex items-center gap-2.5 min-w-0'>
                <img
                  src={getImagePath(bank.logoUrl)}
                  alt={`Logo ${bank.displayName}`}
                  width={26}
                  height={26}
                  className='w-6 h-6 object-contain flex-shrink-0'
                />
                <div className='min-w-0'>
                  <div className='text-xs font-bold text-slate-900 truncate'>
                    {bank.displayName}
                  </div>
                  <div className='flex items-center gap-1.5 mt-0.5'>
                    {bank.lps.isGuaranteed ? (
                      <span className='inline-flex items-center gap-0.5 text-[10px] font-semibold text-brand-700'>
                        <Icon name='shield-check' className='w-3 h-3' />
                        <span>Dijamin LPS</span>
                      </span>
                    ) : (
                      <span className='inline-flex items-center gap-0.5 text-[10px] font-semibold text-rose-600'>
                        <Icon name='alert-triangle' className='w-3 h-3 text-rose-500' />
                        <span>Non-LPS</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <span
                className={`font-mono text-xs font-bold tabular-nums flex-shrink-0 ${
                  bank.lps.isGuaranteed ? 'text-brand-700' : 'text-rose-600'
                }`}
              >
                {formatPercentId(bank.rate)}%
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DepositDropdownSection

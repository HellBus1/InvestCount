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
  const [searchQuery, setSearchQuery] = useState('')

  const visibleBanks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return filteredBanks.filter((bank) => {
      if (categoryFilter !== 'all' && bank.category !== categoryFilter) {
        return false
      }
      if (!query) return true
      return (
        bank.displayName.toLowerCase().includes(query) ||
        bank.bankName.toLowerCase().includes(query) ||
        BANK_CATEGORY_LABELS[bank.category].toLowerCase().includes(query)
      )
    })
  }, [filteredBanks, categoryFilter, searchQuery])

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

      {/* Search Bank / BPR */}
      <div className='relative mb-3'>
        <Icon
          name='search'
          className='w-4 h-4 text-slate-400 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2'
        />
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Cari nama bank atau BPR (misal: BCA, SeaBank, Supra)...'
          aria-label='Cari nama bank atau BPR'
          className='w-full py-2 pl-9 pr-9 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none transition-colors'
        />
        {searchQuery && (
          <button
            type='button'
            onClick={() => setSearchQuery('')}
            aria-label='Hapus pencarian bank'
            className='p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 absolute right-2 top-1/2 -translate-y-1/2 transition-colors'
          >
            <Icon name='close' className='w-3.5 h-3.5' />
          </button>
        )}
      </div>

      {visibleBanks.length === 0 ? (
        <div className='p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-2'>
          <p className='text-xs text-slate-600'>
            Tidak ada bank/BPR yang cocok dengan{' '}
            <strong className='text-slate-900'>&ldquo;{searchQuery.trim()}&rdquo;</strong>
            {categoryFilter !== 'all' ? ` di kategori ${BANK_CATEGORY_LABELS[categoryFilter]}` : ''}
            .
          </p>
          <button
            type='button'
            onClick={() => {
              setSearchQuery('')
              setCategoryFilter('all')
            }}
            className='text-xs font-semibold text-brand-700 hover:text-brand-800 hover:underline'
          >
            Reset pencarian
          </button>
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default DepositDropdownSection

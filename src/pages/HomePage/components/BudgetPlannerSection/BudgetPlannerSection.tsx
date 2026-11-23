import { useState } from 'react'
import { motion } from 'framer-motion'
import useBudgetPlannerSection, {
  BUDGET_PRESETS,
  QUICK_ADD_EXPENSES
} from './hooks/useBudgetPlannerSecion'
import InputField from '../DepositSection/DepositCalculation/InputField'
import { formatNumberWithCommas, parseAmountInputFromCommas } from '@/services/inputServices'
import NeedsSection from './NeedsSection/NeedsSection'
import DepositDropdownSection from './DepositDropdownSection/DepositDropdownSection'
import RecommendationSection from './RecommendationSection/RecommendationSection'
import { containerVariants, childVariants } from '@/constants/animations'
import Icon from '@/components/Icon/Icon'

const BudgetPlannerSection = () => {
  const {
    activePresetId,
    needs,
    totalNeeds,
    needInput,
    priceInput,
    depositInput,
    filteredBanks,
    activeBank,
    summary,
    setNeedInput,
    setPriceInput,
    setDepositInput,
    handleAddNeed,
    handleQuickAddNeed,
    handleRemoveNeed,
    handleApplyPreset,
    handleReset,
    handleBankSelection
  } = useBudgetPlannerSection()

  const [errors, setErrors] = useState({
    needInput: '',
    priceInput: ''
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setField: (value: string) => void,
    fieldName: 'needInput' | 'priceInput' | 'depositInput'
  ) => {
    const value = e.target.value
    if (fieldName === 'priceInput' || fieldName === 'depositInput') {
      setField(formatNumberWithCommas(value))
    } else {
      setField(value)
    }

    if (fieldName !== 'depositInput') {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }))
    }
  }

  const handleAddNeedWithValidation = (e?: React.FormEvent) => {
    e?.preventDefault()
    const nextErrors = { needInput: '', priceInput: '' }
    let isValid = true

    if (!needInput.trim()) {
      nextErrors.needInput = 'Nama pengeluaran wajib diisi'
      isValid = false
    }

    const rawPrice = parseAmountInputFromCommas(priceInput)
    if (!priceInput.trim()) {
      nextErrors.priceInput = 'Nominal bulanan wajib diisi'
      isValid = false
    } else if (!/^\d+(\.\d+)?$/.test(rawPrice) || Number(rawPrice) <= 0) {
      nextErrors.priceInput = 'Masukkan angka nominal yang valid'
      isValid = false
    }

    setErrors(nextErrors)
    if (isValid) {
      handleAddNeed(needInput, rawPrice)
    }
  }

  return (
    <motion.section
      id='rencana-anggaran'
      className='py-16 md:py-24 w-full bg-slate-50 border-t border-slate-200/80'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className='layout'>
        {/* Section Header */}
        <motion.div className='text-center max-w-2xl mx-auto mb-8' variants={childVariants}>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3'>
            Rencana Anggaran Bulanan
          </h2>
          <p className='text-slate-600 text-sm md:text-base leading-relaxed'>
            Hitung berapa persen tagihan rutin bulanan Anda yang bisa ditutup dari bunga bersih
            deposito. Pilih contoh skenario di bawah untuk langsung melihat cara pakainya.
          </p>
        </motion.div>

        {/* Fast Onboarding Bar: 3-Step Guide + 1-Click Scenario Presets */}
        <motion.div
          className='max-w-5xl mx-auto mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3'
          variants={childVariants}
        >
          <div className='flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 pb-3 border-b border-slate-200/70'>
            <span className='font-semibold text-slate-900'>Cara pakai singkat:</span>
            <span>1. Pilih contoh atau isi tagihan rutin</span>
            <span aria-hidden='true' className='text-slate-300'>
              •
            </span>
            <span>2. Masukkan modal deposito</span>
            <span aria-hidden='true' className='text-slate-300'>
              •
            </span>
            <span>3. Pilih bank/BPR dan lihat cakupan bunga bersih</span>
          </div>

          <div className='flex flex-col md:flex-row md:items-center justify-between gap-3'>
            <div className='flex items-center gap-2 text-xs font-semibold text-slate-700'>
              <Icon name='sparkles' className='w-4 h-4 text-brand-600 flex-shrink-0' />
              <span>Contoh skenario siap pakai:</span>
            </div>

            <div className='flex flex-wrap items-center gap-2'>
              {BUDGET_PRESETS.map((preset) => {
                const isActive = activePresetId === preset.id
                return (
                  <button
                    key={preset.id}
                    type='button'
                    onClick={() => handleApplyPreset(preset)}
                    title={preset.description}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      isActive
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-brand-300 hover:text-brand-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                )
              })}

              <button
                type='button'
                onClick={handleReset}
                className='px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors inline-flex items-center gap-1'
              >
                <Icon name='rotate-ccw' className='w-3.5 h-3.5' />
                <span>Mulai Kosong</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main 2-Column Planner Card */}
        <motion.div
          className='max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200/90 shadow-card p-5 sm:p-8'
          variants={childVariants}
        >
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
            {/* Left Column: Inputs & Controls */}
            <div className='lg:col-span-7 space-y-6'>
              {/* Step 1: Monthly Expenses */}
              <div>
                <h3 className='text-sm font-bold text-slate-900 mb-3'>
                  1. Pengeluaran Rutin Bulanan
                </h3>

                <form onSubmit={handleAddNeedWithValidation} className='space-y-3'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <InputField
                      label='Nama Pos Pengeluaran'
                      placeholder='Misal: Listrik, WiFi, Kos'
                      type='text'
                      value={needInput}
                      onChange={(e) => handleInputChange(e, setNeedInput, 'needInput')}
                      error={errors.needInput}
                    />

                    <InputField
                      label='Biaya per Bulan'
                      placeholder='500,000'
                      type='text'
                      prefix='Rp'
                      value={priceInput}
                      onChange={(e) => handleInputChange(e, setPriceInput, 'priceInput')}
                      error={errors.priceInput}
                    />
                  </div>

                  <button
                    type='submit'
                    className='w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold text-sm shadow-sm transition-colors inline-flex items-center justify-center gap-1.5'
                  >
                    <Icon name='plus' className='w-4 h-4' />
                    <span>Tambah Pengeluaran</span>
                  </button>
                </form>

                {/* Quick-add chips */}
                <div className='mt-3 flex flex-wrap items-center gap-1.5'>
                  <span className='text-[11px] font-medium text-slate-500 mr-1'>Tambah cepat:</span>
                  {QUICK_ADD_EXPENSES.map((item) => (
                    <button
                      key={item.need}
                      type='button'
                      onClick={() => handleQuickAddNeed(item)}
                      className='px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 border border-transparent hover:border-brand-200 text-[11px] font-medium text-slate-600 transition-colors'
                    >
                      + {item.need}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Expenses List */}
              {needs.length > 0 && (
                <div className='pt-5 border-t border-slate-200/80'>
                  <NeedsSection
                    needs={needs}
                    totalNeeds={totalNeeds}
                    onRemoveNeed={handleRemoveNeed}
                  />
                </div>
              )}

              {/* Step 2: Planned Deposit Principal */}
              <div className='pt-5 border-t border-slate-200/80'>
                <h3 className='text-sm font-bold text-slate-900 mb-3'>
                  2. Modal Deposito yang Direncanakan
                </h3>
                <InputField
                  label='Jumlah Pokok Deposito'
                  placeholder='150,000,000'
                  type='text'
                  prefix='Rp'
                  value={depositInput}
                  onChange={(e) => handleInputChange(e, setDepositInput, 'depositInput')}
                  helperText='Simpanan di atas Rp7,5 juta otomatis dikenakan PPh Final 20%.'
                />
              </div>

              {/* Step 3: Select Bank / BPR */}
              <div className='pt-5 border-t border-slate-200/80'>
                <DepositDropdownSection
                  filteredBanks={filteredBanks}
                  selectedBankName={activeBank?.bankName || null}
                  handleBankSelection={handleBankSelection}
                />
              </div>
            </div>

            {/* Right Column: Live Coverage Dashboard */}
            <div className='lg:col-span-5 lg:sticky lg:top-24'>
              <RecommendationSection summary={summary} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default BudgetPlannerSection

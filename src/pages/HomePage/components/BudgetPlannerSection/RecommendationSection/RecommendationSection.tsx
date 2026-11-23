import { useState } from 'react'
import { BudgetCalculationSummary } from '../hooks/useBudgetPlannerSecion'
import { getImagePath, getRupiahFormat } from '@/services/inputServices'
import { BANK_CATEGORY_LABELS, formatPercentId } from '@/constants/lpsRates'
import Icon from '@/components/Icon/Icon'

interface RecommendationSectionProps {
  summary: BudgetCalculationSummary | null
}

const RecommendationSection = ({ summary }: RecommendationSectionProps) => {
  const [copied, setCopied] = useState(false)

  if (!summary) {
    return (
      <div className='h-full rounded-2xl bg-slate-50 border border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center min-h-[300px]'>
        <div className='w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 mb-3'>
          <Icon name='calculator' className='w-6 h-6' />
        </div>
        <h3 className='text-sm font-bold text-slate-900 mb-1'>Hasil Simulasi Muncul di Sini</h3>
        <p className='text-xs text-slate-500 max-w-xs leading-relaxed'>
          Pilih salah satu contoh skenario di atas, atau tambahkan minimal satu pengeluaran rutin
          dan nominal modal deposito Anda.
        </p>
      </div>
    )
  }

  const {
    totalNeeds,
    selectedBank,
    taxRatePercent,
    monthlyNetInterest,
    coveragePercent,
    rawCoveragePercent,
    difference,
    requiredCapitalForFullCoverage,
    plainTextSummary
  } = summary

  const isCovered = difference >= 0

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plainTextSummary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleExportToTxt = () => {
    const element = document.createElement('a')
    const file = new Blob([plainTextSummary], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = 'rencana-anggaran-investcount.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className='rounded-2xl bg-slate-900 text-white p-6 shadow-elevated space-y-5'>
      {/* Selected Bank Header with Clickable RIPLAY Icon */}
      <div className='flex items-start justify-between gap-3 pb-4 border-b border-slate-800'>
        <div className='flex items-center gap-3 min-w-0'>
          <a
            href={selectedBank.website}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Buka RIPLAY dan produk deposito resmi ${selectedBank.displayName}`}
            title={`Klik untuk lihat RIPLAY / produk deposito ${selectedBank.displayName}`}
            className='w-11 h-11 rounded-xl bg-white p-1.5 flex items-center justify-center flex-shrink-0 hover:ring-2 hover:ring-brand-400 transition-all'
          >
            <img
              src={getImagePath(selectedBank.logoUrl)}
              alt={`Logo ${selectedBank.displayName}`}
              width={28}
              height={28}
              className='w-7 h-7 object-contain'
            />
          </a>
          <div className='min-w-0'>
            <a
              href={selectedBank.website}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm font-bold text-white hover:text-brand-300 transition-colors inline-flex items-center gap-1'
            >
              <span className='truncate'>{selectedBank.displayName}</span>
              <Icon name='external-link' className='w-3 h-3 text-slate-400 flex-shrink-0' />
            </a>
            <div className='text-xs text-slate-400'>
              {BANK_CATEGORY_LABELS[selectedBank.category]} •{' '}
              <span className='font-mono font-semibold text-slate-200'>
                {formatPercentId(selectedBank.rate)}% p.a.
              </span>{' '}
              (1 bln)
            </div>
          </div>
        </div>

        {selectedBank.lps.isGuaranteed ? (
          <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-500/20 border border-brand-400/40 text-brand-300 text-[11px] font-semibold flex-shrink-0'>
            <Icon name='shield-check' className='w-3 h-3' />
            <span>Dijamin LPS</span>
          </span>
        ) : (
          <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-200 text-[11px] font-semibold flex-shrink-0'>
            <Icon name='alert-triangle' className='w-3 h-3 text-rose-300' />
            <span>Non-LPS</span>
          </span>
        )}
      </div>

      {/* Coverage Progress Bar */}
      <div>
        <div className='flex items-baseline justify-between gap-2 mb-2'>
          <span className='text-xs font-medium text-slate-300'>Cakupan Pengeluaran Bulanan</span>
          <span
            className={`text-2xl font-extrabold font-display tabular-nums ${
              isCovered ? 'text-brand-400' : 'text-white'
            }`}
          >
            {Math.round(rawCoveragePercent)}%
          </span>
        </div>

        <div
          className='w-full h-3 rounded-full bg-slate-800 overflow-hidden'
          role='progressbar'
          aria-valuenow={coveragePercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label='Persentase pengeluaran bulanan yang tertutup bunga deposito'
        >
          <div
            className='h-full rounded-full transition-all duration-300 bg-brand-400'
            style={{ width: `${coveragePercent}%` }}
          />
        </div>
      </div>

      {/* Key Financial Breakdown */}
      <div className='space-y-2.5 text-xs sm:text-sm'>
        <div className='flex items-center justify-between gap-2'>
          <span className='text-slate-400'>Bunga bersih / bulan (PPh {taxRatePercent}%)</span>
          <span className='font-mono font-bold tabular-nums text-brand-300'>
            {getRupiahFormat(monthlyNetInterest)}
          </span>
        </div>

        <div className='flex items-center justify-between gap-2'>
          <span className='text-slate-400'>Total pengeluaran / bulan</span>
          <span className='font-mono font-semibold tabular-nums text-slate-200'>
            {getRupiahFormat(totalNeeds)}
          </span>
        </div>

        <div className='pt-2.5 border-t border-slate-800 flex items-center justify-between gap-2'>
          <span className='font-semibold text-slate-200'>
            {isCovered ? 'Surplus bulanan' : 'Sisa yang belum tertutup'}
          </span>
          <span
            className={`font-mono font-extrabold tabular-nums ${
              isCovered ? 'text-brand-400' : 'text-slate-100'
            }`}
          >
            {isCovered ? '+' : '-'}
            {getRupiahFormat(Math.abs(difference))}
          </span>
        </div>
      </div>

      {/* Ideal Capital Callout */}
      {!isCovered && requiredCapitalForFullCoverage > 0 && (
        <div className='p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-300 leading-relaxed'>
          Untuk menutup <strong className='text-white'>100% pengeluaran rutin</strong> di{' '}
          {selectedBank.displayName}, estimasi modal deposito yang dibutuhkan sekitar{' '}
          <strong className='text-brand-300 font-mono'>
            {getRupiahFormat(requiredCapitalForFullCoverage)}
          </strong>
          .
        </div>
      )}

      {/* Soft Rose LPS Alert if Unguaranteed */}
      {!selectedBank.lps.isGuaranteed && selectedBank.lps.reason && (
        <div
          role='alert'
          className='p-3.5 rounded-xl bg-rose-950/60 border border-rose-400/40 text-xs text-rose-100 flex items-start gap-2'
        >
          <Icon name='alert-triangle' className='w-4 h-4 text-rose-300 flex-shrink-0 mt-0.5' />
          <p className='leading-relaxed'>
            <strong>Tidak Dijamin LPS:</strong> {selectedBank.lps.reason}.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className='grid grid-cols-2 gap-2.5 pt-1'>
        <button
          type='button'
          onClick={handleCopy}
          className='py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5'
        >
          <Icon name={copied ? 'check' : 'copy'} className='w-3.5 h-3.5 text-brand-400' />
          <span>{copied ? 'Tersalin' : 'Salin Hasil'}</span>
        </button>

        <button
          type='button'
          onClick={handleExportToTxt}
          className='py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5'
        >
          <Icon name='download' className='w-3.5 h-3.5' />
          <span>Unduh (.txt)</span>
        </button>
      </div>
    </div>
  )
}

export default RecommendationSection

import { getRupiahFormat } from '@/services/inputServices'
import Icon from '@/components/Icon/Icon'

interface DepositRateResultProps {
  interest: number
  month: number
}

const DepositRateResult = (props: DepositRateResultProps) => {
  const { interest, month } = props
  const hasResult = interest > 0

  return (
    <div className='w-full p-6 rounded-2xl bg-gradient-to-br from-brand-50/90 via-white to-slate-50 border border-brand-200/80 shadow-card relative overflow-hidden'>
      {/* Signature Accent Line */}
      <div className='absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 to-brand-400' />

      <div className='flex items-center gap-2 mb-2'>
        <div className='w-7 h-7 rounded-lg bg-brand-100 flex items-center justify-center text-brand-700'>
          <Icon name='coins' className='w-4 h-4' />
        </div>
        <span className='text-xs font-bold uppercase tracking-wider text-brand-800'>
          Estimasi Bunga Bersih
        </span>
      </div>

      <div className='my-3'>
        <div className='text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight'>
          {hasResult ? getRupiahFormat(interest) : 'Rp 0'}
        </div>
        <p className='text-xs sm:text-sm font-medium text-slate-500 mt-1'>
          Untuk jangka waktu{' '}
          <span className='text-brand-700 font-semibold'>{month || 0} bulan</span> simpanan
        </p>
      </div>

      <div className='pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-slate-500'>
        <Icon name='shield-check' className='w-3.5 h-3.5 text-brand-600 flex-shrink-0' />
        <span>Sudah dipotong pajak bunga deposito 20% otomatis</span>
      </div>
    </div>
  )
}

export default DepositRateResult

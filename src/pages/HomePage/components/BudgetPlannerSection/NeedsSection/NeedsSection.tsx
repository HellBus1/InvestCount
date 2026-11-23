import Icon from '@/components/Icon/Icon'
import { Need } from '../hooks/useBudgetPlannerSecion'

interface NeedsSectionProps {
  needs: Need[]
  totalNeeds: number
  onRemoveNeed: (id: string) => void
}

const NeedsSection = ({ needs, totalNeeds, onRemoveNeed }: NeedsSectionProps) => {
  return (
    <div>
      <div className='flex items-center justify-between gap-2 mb-3'>
        <h3 className='text-sm font-bold text-slate-900'>
          Daftar Pengeluaran Rutin ({needs.length})
        </h3>
        <span className='text-xs sm:text-sm font-bold font-mono tabular-nums text-slate-900'>
          Total: Rp{totalNeeds.toLocaleString('id-ID')}/bln
        </span>
      </div>

      <ul className='space-y-2' aria-label='Daftar pengeluaran bulanan'>
        {needs.map((item) => (
          <li
            key={item.id}
            className='flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-sm'
          >
            <span className='font-medium text-slate-800 truncate'>{item.need}</span>
            <div className='flex items-center gap-3 flex-shrink-0'>
              <span className='font-mono font-semibold tabular-nums text-slate-900'>
                Rp{item.price.toLocaleString('id-ID')}
              </span>
              <button
                type='button'
                onClick={() => onRemoveNeed(item.id)}
                className='p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400'
                aria-label={`Hapus pengeluaran ${item.need}`}
              >
                <Icon name='close' className='w-4 h-4' />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NeedsSection

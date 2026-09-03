import { DepositType } from '@/constants/DepositType'
import Icon from '@/components/Icon/Icon'

interface DepositTypeSelectorProps {
  selectedOption: string
  setSelectedOption: (option: string) => void
}

const DepositTypeSelector = (props: DepositTypeSelectorProps) => {
  const { selectedOption, setSelectedOption } = props

  const options = [
    {
      id: DepositType.NONARO,
      label: 'Non-ARO',
      tagline: 'Bunga Langsung Cair',
      desc: 'Bunga dicairkan langsung ke rekening per akhir tenor tanpa perpanjangan otomatis.'
    },
    {
      id: DepositType.ARO,
      label: 'ARO',
      tagline: 'Pokok Diperpanjang',
      desc: 'Pokok deposito diperpanjang otomatis di periode berikutnya. Bunga masuk rekening.'
    },
    {
      id: DepositType.AROPLUS,
      label: 'ARO+',
      tagline: 'Bunga Berbunga (Compounding)',
      desc: 'Pokok + bunga otomatis diinvestasikan kembali (bunga berbunga) untuk akumulasi maksimal.'
    }
  ]

  const activeOption = options.find((o) => o.id === selectedOption) || options[0]

  return (
    <div className='w-full'>
      {/* Segmented Control Bar */}
      <div className='grid grid-cols-3 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200'>
        {options.map((option) => {
          const isActive = selectedOption === option.id
          return (
            <button
              key={option.id}
              type='button'
              role='tab'
              aria-selected={isActive}
              className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-0.5 ${
                isActive
                  ? 'bg-white text-brand-700 shadow-card border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <span>{option.label}</span>
              <span
                className={`text-[10px] sm:text-xs font-normal hidden sm:inline ${isActive ? 'text-brand-600' : 'text-slate-400'}`}
              >
                {option.tagline}
              </span>
            </button>
          )
        })}
      </div>

      {/* Dynamic Summary Note */}
      <div className='mt-4 px-4 py-3 rounded-xl bg-brand-50/70 border border-brand-100 flex items-start gap-3'>
        <Icon name='info' className='w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0' />
        <p className='text-xs sm:text-sm text-slate-700 leading-normal'>
          <strong className='text-brand-800 font-semibold'>{activeOption.label}:</strong>{' '}
          {activeOption.desc}
        </p>
      </div>
    </div>
  )
}

export default DepositTypeSelector

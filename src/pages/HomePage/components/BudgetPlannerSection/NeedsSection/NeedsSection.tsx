interface Need {
  need: string
  price: string
}

interface NeedsSectionProps {
  needs: Need[]
  onRemoveNeed: (index: number) => void // Callback to remove a need
}

const NeedsSection = (props: NeedsSectionProps) => {
  const { needs, onRemoveNeed } = props

  return (
    <div className='mt-8'>
      <h3 className='text-lg font-semibold text-charter-blue-600 mb-2'>Daftar Kebutuhan Anda</h3>
      <div className='flex flex-wrap gap-2'>
        {needs.map((item, index) => (
          <div
            key={index}
            className='badge badge-outline badge-lg flex items-center gap-2 px-4 py-2'
          >
            <span>{item.need}</span>
            <span className='text-charter-blue font-bold'>
              {Number(item.price).toLocaleString()} IDR
            </span>
            <button
              onClick={() => onRemoveNeed(index)}
              className='text-red-500 hover:text-red-700'
              aria-label='Remove need'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NeedsSection

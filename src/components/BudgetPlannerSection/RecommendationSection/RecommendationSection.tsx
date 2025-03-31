interface RecommendationSectionProps {
  recommendation: string
}

const RecommendationSection = (props: RecommendationSectionProps) => {
  const { recommendation } = props

  // Determine if the recommendation is positive or negative
  const isPositive = recommendation.toLowerCase().includes('have') // Example logic to check positivity

  return (
    <div className='mt-8'>
      <div
        className={`alert shadow-lg whitespace-pre-line p-6 rounded-lg ${
          isPositive
            ? 'bg-green-100 border-green-500 text-green-800'
            : 'bg-red-100 border-red-500 text-red-800'
        }`}
      >
        <div className='flex items-center gap-4'>
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isPositive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {isPositive ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            )}
          </div>
          <span className='text-lg text-left font-medium'>{recommendation}</span>
        </div>
      </div>
    </div>
  )
}

export default RecommendationSection

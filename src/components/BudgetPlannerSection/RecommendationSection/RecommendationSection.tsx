interface RecommendationSectionProps {
  recommendation: string
}

const RecommendationSection = (props: RecommendationSectionProps) => {
  const { recommendation } = props

  const isPositive = recommendation.toLowerCase().includes('have')

  const handleExportToTxt = () => {
    const element = document.createElement('a')
    const file = new Blob([recommendation], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'recommendation.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className='mt-8'>
      <div
        className={`flex flex flex-col sm:flex-row justify-between alert shadow-lg whitespace-pre-line p-6 rounded-lg ${
          isPositive
            ? 'bg-green-100 border-green-500 text-green-800'
            : 'bg-red-100 border-red-500 text-red-800'
        }`}
      >
        <span className='text-lg text-left font-medium'>{recommendation}</span>
        <button onClick={handleExportToTxt} className='mt-4 btn btn-primary text-sm text-[#ffffff]'>
          Download
        </button>
      </div>
    </div>
  )
}

export default RecommendationSection

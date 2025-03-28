import HeroImage from './HeroImage'

interface HeroProps {
  onScrollToDepositClick: () => void
}

const Hero = (props: HeroProps) => {
  const { onScrollToDepositClick } = props

  return (
    <div className='relative hero bg-base-200 min-h-screen px-10 py-10'>
      <div className='hero-content flex-col lg:flex-row-reverse items-center'>
        <div className='hidden sm:block'>
          <HeroImage />
        </div>
        <div className='flex flex-col justify-start gap-4'>
          <p className='py-2 text-xl md:text-2xl text-jess font-medium'>InvestCount</p>
          <h1 className='leading-[48px] md:leading-[72px] py-2 text-4xl md:text-6xl font-semibold text-charter-blue-800'>
            Get Accurate Insights to <span className='text-jess'>Maximize</span> Your Savings and{' '}
            <span className='text-jess'>Financial Growth</span>
          </h1>
          <p className='py-2 mb-2 text-base md:text-lg font-medium text-charter-blue'>
            Calculate deposits after tax deductions easily and grow your wealth.
          </p>
          <button className='btn btn-primary max-w-[200px]' onClick={onScrollToDepositClick}>
            <p className='text-[#ffffff]'>Get Started</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero

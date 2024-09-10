import HeroImage from './HeroImage'

const Hero = () => {
  return (
    <div className='hero bg-base-200 min-h-screen px-10'>
      <div className='hero-content flex-col lg:flex-row-reverse gap-4 items-center'>
        <HeroImage />
        <div className='flex flex-col justify-start gap-4'>
          <p className={`py-2 text-2xl text-jess font-medium`}>InvestCount</p>
          <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>
            Get Accurate Insights to <span className={`text-jess`}>Maximize</span> Your Savings and{' '}
            <span className={`text-jess`}>Financial Growth</span>
          </h1>
          <p className='py-2 text-lg text-gray-600'>
            Calculate deposits after tax deductions easily and grow your wealth.
          </p>
          <button className='btn btn-primary max-w-[200px]'>
            <p className='text-[#ffffff]'>Get Started</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero

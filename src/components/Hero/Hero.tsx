import GrowMoneyImage from '@/assets/images/grow_money.jpg'
import GrowMoneyImage2 from '@/assets/images/grow_money_back.jpg'

const Hero = () => {
  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row-reverse gap-4 items-center'>
        <div>
          <img src={GrowMoneyImage} className='max-w-sm rounded-lg w-74' alt='Grow Money' />
          <img
            src={GrowMoneyImage2}
            className='max-w-sm rounded-lg shadow-2xl w-74 absolute top-1/2 
            translate-y-[-130%] md:translate-y-[-50%] lg:translate-y-[-50%] 
            left-1/2 -translate-x-1/2 md:translate-x-[-50%] lg:translate-x-[60%]
            rotate-12 md:rotate-6 lg:rotate-12 z-[-99]'
            alt='Grow Money'
          />
        </div>
        <div className='flex flex-col justify-start gap-4'>
          <p className='py-2 text-2xl text-[#20B486] font-medium'>InvestCount</p>
          <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>
            Get Accurate Insights to <span className='text-[#20B486]'>Maximize</span> Your Savings
            and <span className='text-[#20B486]'>Financial Growth</span>
          </h1>
          <p className='py-2 text-lg text-gray-600'>
            Calculate deposits after tax deductions easily and grow your wealth.
          </p>
          <button className='btn btn-primary max-w-[200px]'>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Hero

import DepositCalculation from './DepositCalculation/DepositCalculation'
import DepositTypeSelector from './DepositTypeSelector'

interface DepositSectionProps {
  depositSectionRef: React.MutableRefObject<HTMLDivElement | null>
}

const DepositSection = (props: DepositSectionProps) => {
  const { depositSectionRef } = props

  return (
    <div className='w-full py-10' ref={depositSectionRef}>
      <h1 className='text-center text-2xl font-bold text-charter-blue mt-8'>
        Calculate Your Deposit Growth
      </h1>
      <p className='text-center text-charter-blue text-xl mx-10'>
        Choose the deposit option that suits you best and see how your savings can grow over time.
      </p>
      <div className='flex flex-col mb-16'>
        <div className='mx-10 md:mx-20 lg:mx-36 mt-10'>
          <DepositTypeSelector />
        </div>
        <div className='mx-10 md:mx-20 lg:mx-36 mt-8'>
          <DepositCalculation />
        </div>
      </div>
    </div>
  )
}

export default DepositSection

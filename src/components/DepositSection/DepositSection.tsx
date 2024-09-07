import DepositCalculation from './DepositCalcualation/DepositCalculation'
import DepositTypeSelector from './DepositTypeSelector'

const DepositSection = () => {
  return (
    <div className='w-full py-10'>
      <h1 className='text-center text-2xl font-bold text-charter-blue mt-8'>
        Calculate Your Deposit Growth
      </h1>
      <p className='text-center text-charter-blue text-xl'>
        Choose the deposit option that suits you best and see how your savings can grow over time.
      </p>
      <div className='flex flex-col mb-16'>
        <div className='mx-36 mt-10'>
          <DepositTypeSelector />
        </div>
        <div className='mx-36 mt-8'>
          <DepositCalculation />
        </div>
      </div>
    </div>
  )
}

export default DepositSection

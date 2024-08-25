import DepositInputSection from './DepositInputSection'
import DepositTypeSelector from './DepositTypeSelector'

const DepositSection = () => {
  return (
    <div className='w-full bg-white py-10'>
      <h1 className='text-center text-2xl font-bold text-[#536E96] mt-8'>
        Calculate Your Deposit Growth
      </h1>
      <p className='text-center text-[#536E96] text-xl'>
        Choose the deposit option that suits you best and see how your savings can grow over time.
      </p>
      <div className='flex flex-row items-top mx-20 space-x-32 my-10'>
        <div className='flex-1'>
          <DepositTypeSelector />
        </div>
        <div className='flex-1'>
          <DepositInputSection />
        </div>
      </div>
    </div>
  )
}

export default DepositSection

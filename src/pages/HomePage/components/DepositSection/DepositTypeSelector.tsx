import { DepositType } from '@/constants/DepositType'

interface DepositTypeSelectorProps {
  selectedOption: string
  setSelectedOption: (option: string) => void
}

const DepositTypeSelector = (props: DepositTypeSelectorProps) => {
  const { selectedOption, setSelectedOption } = props

  return (
    <div className='mt-8'>
      <div role='tablist' className='tabs tabs-lifted'>
        <button
          role='tab'
          className={`tab ${selectedOption === DepositType.NONARO ? 'tab-active' : ''} font-bold text-charter-blue`}
          onClick={() => setSelectedOption(DepositType.NONARO)}
        >
          {DepositType.NONARO}
        </button>
        <button
          role='tab'
          className={`tab ${selectedOption === DepositType.ARO ? 'tab-active' : ''} font-bold text-charter-blue`}
          onClick={() => setSelectedOption(DepositType.ARO)}
        >
          {DepositType.ARO}
        </button>
        <button
          role='tab'
          className={`tab ${selectedOption === DepositType.AROPLUS ? 'tab-active' : ''} font-bold text-charter-blue`}
          onClick={() => setSelectedOption(DepositType.AROPLUS)}
        >
          {DepositType.AROPLUS}
        </button>
      </div>

      <div className='p-4 md:p-10'>
        {selectedOption === DepositType.NONARO && (
          <p className='text-base md:text-lg text-charter-blue'>
            <strong>Simple Interest:</strong> Receive interest directly.
            <br />
            <br />a IDR 10,000,000 deposit at 5% annual interest earns IDR 500,000.
          </p>
        )}
        {selectedOption === DepositType.ARO && (
          <p className='text-base md:text-lg text-charter-blue'>
            <strong>Smart Saver:</strong> Interest is added to your savings and reinvested.
            <br />
            <br />a IDR 10,000,000 deposit at 5% annual interest adds IDR 500,000 to your savings.
          </p>
        )}
        {selectedOption === DepositType.AROPLUS && (
          <p className='text-base md:text-lg text-charter-blue'>
            <strong>Maximize Returns:</strong> Enjoy compounding interest.
            <br />
            <br />a IDR 10,000,000 deposit at 5% annual interest grows to IDR 10,500,000, which
            continues to earn.
          </p>
        )}
      </div>
    </div>
  )
}

export default DepositTypeSelector

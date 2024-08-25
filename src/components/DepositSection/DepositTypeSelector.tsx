import { useState } from 'react'

const DepositType = {
  ARO: 'ARO',
  NONARO: 'Non-Aro',
  AROPLUS: 'ARO+'
}

const DepositTypeSelector = () => {
  const [selectedOption, setSelectedOption] = useState(DepositType.NONARO)

  return (
    <div className='mt-8'>
      <div role='tablist' className='tabs tabs-lifted'>
        <button
          role='tab'
          className={`tab ${selectedOption === DepositType.NONARO ? 'tab-active' : ''}`}
          onClick={() => setSelectedOption(DepositType.NONARO)}
        >
          {DepositType.NONARO}
        </button>
        <button
          role='tab'
          className={`tab ${selectedOption === DepositType.ARO ? 'tab-active' : ''}`}
          onClick={() => setSelectedOption(DepositType.ARO)}
        >
          {DepositType.ARO}
        </button>
        <button
          role='tab'
          className={`tab ${selectedOption === DepositType.AROPLUS ? 'tab-active' : ''}`}
          onClick={() => setSelectedOption(DepositType.AROPLUS)}
        >
          {DepositType.AROPLUS}
        </button>
      </div>

      <div className='p-10'>
        {selectedOption === DepositType.NONARO && (
          <div>Your interest will be returned to you without reinvestment.</div>
        )}
        {selectedOption === DepositType.ARO && (
          <div>
            Automatic Roll-Over (ARO) allows your interest to be reinvested, maximizing growth.
          </div>
        )}
        {selectedOption === DepositType.AROPLUS && (
          <div>
            ARO with Compounding ensures faster growth through reinvestment and compounding
            interest.
          </div>
        )}
      </div>
    </div>
  )
}

export default DepositTypeSelector

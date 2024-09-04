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
          className={`tab ${selectedOption === DepositType.NONARO ? 'tab-active' : ''} font-bold`}
          onClick={() => setSelectedOption(DepositType.NONARO)}
        >
          {DepositType.NONARO}
        </button>
        <button
          role='tab'
          className={`tab ${selectedOption === DepositType.ARO ? 'tab-active' : ''} font-bold`}
          onClick={() => setSelectedOption(DepositType.ARO)}
        >
          {DepositType.ARO}
        </button>
        <button
          role='tab'
          className={`tab ${selectedOption === DepositType.AROPLUS ? 'tab-active' : ''} font-bold`}
          onClick={() => setSelectedOption(DepositType.AROPLUS)}
        >
          {DepositType.AROPLUS}
        </button>
      </div>

      <div className='p-10'>
        {selectedOption === DepositType.NONARO && (
          <p>
            <strong>Simple Interest:</strong> Get your interest paid out directly.
            <br />
            <br />
            For example, on a IDR 10,000,000 deposit with a 5% annual interest rate, you'll receive
            IDR 500,000 in interest.
          </p>
        )}
        {selectedOption === DepositType.ARO && (
          <p>
            <strong>Smart Saver:</strong> Watch your savings grow automatically as interest is added
            to your savings account and your deposit continues to be reinvested.
            <br />
            <br />
            For example, on a IDR 10,000,000 deposit with a 5% annual interest rate, IDR 500,000 in
            interest will be added to your savings account, and the IDR 10,000,000 deposit will
            continue to earn interest.
          </p>
        )}
        {selectedOption === DepositType.AROPLUS && (
          <p>
            <strong>Maximize Your Returns:</strong> Enjoy the power of compounding interest as your
            savings grow exponentially.
            <br />
            <br />
            For example, on a IDR 10,000,000 deposit with a 5% annual interest rate, IDR 500,000 in
            interest will be added to your savings account, and the new total (IDR 10,500,000) will
            continue to earn interest in the next period.
          </p>
        )}
      </div>
    </div>
  )
}

export default DepositTypeSelector

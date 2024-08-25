import { useState } from 'react'

const DepositInputSection = () => {
  const [amount, setAmount] = useState('')
  const [interest, setInterest] = useState('')
  const [years, setYears] = useState('')

  return (
    <div className='card shadow-xl mt-8'>
      <div className='card-body'>
        <div className='mb-4'>
          <div className='label'>
            <span className='label-text'>Deposit Amount</span>
          </div>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='input input-bordered w-full rounded'
            placeholder='Enter amount'
          />
        </div>
        <div className='mb-4 flex flex-row space-x-10'>
          <div className='flex-1'>
            <div className='label'>
              <span className='label-text'>Annual Interest Rate (%)</span>
            </div>
            <input
              type='number'
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className='input input-bordered w-full border rounded'
              placeholder='Enter interest rate'
            />
          </div>
          <div className='flex-1'>
            <div className='label'>
              <span className='label-text'>Tax Rate (%)</span>
            </div>
            <input
              type='number'
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className='input input-bordered w-full border rounded'
              placeholder='Enter interest rate'
            />
          </div>
        </div>
        <div className='mb-6'>
          <div className='label'>
            <span className='label-text'>Number of Month</span>
          </div>
          <input
            type='number'
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className='input input-bordered w-full border rounded'
            placeholder='Enter number of years'
          />
        </div>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Calculate</button>
        </div>
      </div>
    </div>
  )
}

export default DepositInputSection

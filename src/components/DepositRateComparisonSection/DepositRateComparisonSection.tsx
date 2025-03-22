import React, { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts'
import bankDepositoDatas from '../../data/bankDepositos.json'

interface Bank {
  bankName: string
  logoUrl: string
  website: string
  minBalance: number
  rates: { [key: string]: number }
}

const processData = (banks: Bank[], tenure: string, minBalance: number) => {
  const groupedBanks: { [key: string]: Bank[] } = {}

  banks.forEach((bank) => {
    if (!groupedBanks[bank.bankName]) {
      groupedBanks[bank.bankName] = []
    }
    groupedBanks[bank.bankName].push(bank)
  })

  const data = Object.keys(groupedBanks)
    .map((bankName) => {
      const bankGroup = groupedBanks[bankName].filter((bank) => bank.minBalance >= minBalance)
      if (bankGroup.length === 0) return null
      const minBalanceBank = bankGroup.reduce((prev, curr) =>
        prev.minBalance < curr.minBalance ? prev : curr
      )
      return {
        bank: minBalanceBank.bankName.substring(0, minBalanceBank.bankName.indexOf('by')),
        interest: minBalanceBank.rates[tenure]
      }
    })
    .filter((item) => item !== null)

  return data
}

const DepositRateComparisonSection = () => {
  const [tenure, setTenure] = useState('1')
  const [minBalance, setMinBalance] = useState(0)
  const [data, setData] = useState<{ bank: string; interest: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const EMPTY_STRING = ''

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      try {
        const processedData = processData(bankDepositoDatas, tenure, minBalance)
        setData(processedData)
        setLoading(false)
      } catch (err) {
        setError('Failed to load data')
        setLoading(false)
      }
    }, 1000)
  }, [tenure, minBalance])

  const handleTenureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTenure(event.target.value)
  }

  const handleMinBalanceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinBalance(parseInt(event.target.value, 10))
  }

  return (
    <div className='p-4 space-y-6'>
      <h1 className='text-2xl md:text-3xl font-bold text-charter-blue mb-4'>
        Deposit Rate Comparison
      </h1>
      <p className='text-base md:text-lg text-charter-blue mb-4'>
        Compare the deposit rates of different Indonesian banks based on the selected tenure and
        minimum balance. Select a tenure and minimum balance to see the corresponding rates.
      </p>
      <div className='mb-4 flex space-x-4'>
        <div>
          <label htmlFor='tenure' className='mr-2 text-charter-blue'>
            Select Tenure:
          </label>
          <select
            id='tenure'
            value={tenure}
            onChange={handleTenureChange}
            aria-label='Select Tenure'
            className='p-2 border border-charter-blue rounded'
          >
            <option value='1'>1 Month</option>
            <option value='3'>3 Months</option>
            <option value='6'>6 Months</option>
            <option value='12'>12 Months</option>
          </select>
        </div>
        <div>
          <label htmlFor='minBalance' className='mr-2 text-charter-blue'>
            Select Minimum Balance:
          </label>
          <select
            id='minBalance'
            value={minBalance}
            onChange={handleMinBalanceChange}
            aria-label='Select Minimum Balance'
            className='p-2 border border-charter-blue rounded'
          >
            <option value='0'>All</option>
            <option value='10000000'>10M</option>
            <option value='100000000'>100M</option>
            <option value='250000000'>250M</option>
            <option value='1000000000'>1B</option>
            <option value='1000000000000'>1T</option>
          </select>
        </div>
      </div>
      {loading ? (
        <p className='text-charter-blue'>Loading...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <ResponsiveContainer width='100%' height={600}>
          <BarChart
            data={data}
            layout='vertical'
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type='number' label={{ value: EMPTY_STRING }} />
            <YAxis type='category' dataKey='bank' width={200} />
            <Tooltip />
            <Legend />
            <Bar dataKey='interest' fill='#4A90E2'>
              <LabelList dataKey='interest' position='insideRight' />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default DepositRateComparisonSection

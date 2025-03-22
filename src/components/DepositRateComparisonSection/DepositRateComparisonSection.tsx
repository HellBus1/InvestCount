import React, { useState, useEffect, useCallback, useMemo } from 'react'
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
import { Bank, CustomYAxisProps, CustomTooltipProps } from './depositRateComparisonProps'

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
        bank: minBalanceBank.bankName.substring(0, minBalanceBank.bankName.indexOf('by')).trim(),
        interest: minBalanceBank.rates[tenure],
        logo: minBalanceBank.logoUrl,
        website: minBalanceBank.website
      }
    })
    .filter((item) => item !== null)

  return data
}

const DepositRateComparisonSection = () => {
  const [tenure, setTenure] = useState('1')
  const [minBalance, setMinBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const EMPTY_STRING = ''
  const CHARTER_BLUE = '#536E96'
  const JESS = '#20B486'

  const data = useMemo(
    () => processData(bankDepositoDatas, tenure, minBalance),
    [tenure, minBalance]
  )

  useEffect(() => {
    setLoading(false)
  }, [data])

  const handleTenureChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setTenure(event.target.value)
  }, [])

  const handleMinBalanceChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinBalance(parseInt(event.target.value, 10))
  }, [])

  const getImagePath = (basePath: string) => {
    return `${window.location.origin}${basePath}`
  }

  const renderCustomYAxisTick = useCallback(
    (props: CustomYAxisProps) => {
      const { payload, x, y } = props
      const bank = data.find((item) => item.bank === payload.value)

      if (!bank) {
        return <></>
      }

      return (
        <g transform={`translate(${x},${y})`}>
          <image href={getImagePath(bank.logo)} x={-35} y={-18} width={32} height={32} />
          <a
            href={bank.website}
            target='_blank'
            rel='noopener noreferrer'
            className='link link-primary link-hover'
          >
            <text
              x={-45}
              y={0}
              dy={4}
              textAnchor='end'
              fill={CHARTER_BLUE}
              className='text-xs md:text-sm lg:text-base font-bold'
            >
              {payload.value}
            </text>
          </a>
        </g>
      )
    },
    [data]
  )

  const renderCustomTooltip = useCallback((props: CustomTooltipProps) => {
    const { payload, active } = props

    if (!active || !payload || payload.length === 0) {
      return <></>
    }

    const bank = payload[0].payload

    return (
      <div className='card bg-base-100 shadow-lg'>
        <div className='card-body'>
          <p className='font-bold text-lg text-charter-blue'>{bank.bank}</p>
          <p className='text-sm text-charter-blue-400'>Interest Rate: {bank.interest}%</p>
        </div>
      </div>
    )
  }, [])

  return (
    <div className='py-10 bg-base-200 min-h-screen w-full'>
      <h1 className='text-center text-2xl md:text-3xl font-bold text-charter-blue mt-8 mb-4'>
        Deposit Rate Comparison
      </h1>
      <p className='text-center text-charter-blue text-lg md:text-xl mx-4 md:mx-20 lg:mx-36 mb-16'>
        Compare the deposit rates of different Indonesian banks based on the selected tenure and
        minimum balance. Select a tenure and minimum balance to see the corresponding rates.
      </p>
      <div className='mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center items-center'>
        <div>
          <label
            htmlFor='tenure'
            className='mr-2 text-charter-blue text-base md:text-lg font-medium'
          >
            Tenure:
          </label>
          <select
            id='tenure'
            value={tenure}
            onChange={handleTenureChange}
            aria-label='Tenure'
            className='select border border-charter-blue text-base md:text-lg'
          >
            <option value='1'>1 Month</option>
            <option value='3'>3 Months</option>
            <option value='6'>6 Months</option>
            <option value='12'>12 Months</option>
          </select>
        </div>
        <div>
          <label
            htmlFor='minBalance'
            className='mr-2 text-charter-blue text-base md:text-lg font-medium'
          >
            Minimum Balance:
          </label>
          <select
            id='minBalance'
            value={minBalance}
            onChange={handleMinBalanceChange}
            aria-label='Minimum Balance'
            className='select border border-charter-blue text-base md:text-lg'
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
      ) : (
        <div className='mx-4 md:mx-20 lg:mx-36 mb-16'>
          <ResponsiveContainer width='100%' height={600} className={''}>
            <BarChart
              data={data}
              layout='vertical'
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                type='number'
                label={{ value: EMPTY_STRING }}
                tick={{ fontSize: 14, fontWeight: 'bold', fill: CHARTER_BLUE, dy: 5 }}
              />
              <YAxis type='category' dataKey='bank' tick={renderCustomYAxisTick} width={120} />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Tooltip content={renderCustomTooltip} />
              <Legend />
              <Bar dataKey='interest' fill={JESS}>
                <LabelList
                  dataKey='interest'
                  position='right'
                  fontSize={14}
                  fontWeight={'medium'}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default DepositRateComparisonSection

import { motion } from 'framer-motion' // Import Framer Motion
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
import bankDepositoDatas from '../../../../data/bankDepositos.json'
import { Bank, CustomYAxisProps, CustomTooltipProps } from './depositRateComparisonProps'
import { getImagePath, getProductName } from '@/services/inputServices'

const processData = (banks: Bank[], tenure: string, minBalance: number, sortBy: string) => {
  const groupedBanks: { [key: string]: Bank[] } = {}

  banks.forEach((bank) => {
    if (!groupedBanks[bank.bankName]) {
      groupedBanks[bank.bankName] = []
    }
    groupedBanks[bank.bankName].push(bank)
  })

  let data = Object.keys(groupedBanks)
    .map((bankName) => {
      const bankGroup = groupedBanks[bankName].filter((bank) => bank.minBalance >= minBalance)
      if (bankGroup.length === 0) return null
      const minBalanceBank = bankGroup.reduce((prev, curr) =>
        prev.minBalance < curr.minBalance ? prev : curr
      )

      const { bank, productName } = getProductName(minBalanceBank.bankName)

      return {
        bank: bank,
        bankName: productName,
        interest: minBalanceBank.rates[tenure],
        logo: minBalanceBank.logoUrl,
        website: minBalanceBank.website
      }
    })
    .filter((item) => item !== null)

  // Sort data based on sortBy
  if (sortBy === 'name') {
    data = data.sort((a, b) => a.bank.localeCompare(b.bank))
  } else if (sortBy === 'rate') {
    data = data.sort((a, b) => b.interest - a.interest)
  }

  return data
}

const DepositRateComparisonSection = () => {
  const [tenure, setTenure] = useState('1')
  const [minBalance, setMinBalance] = useState(0)
  const [sortBy, setSortBy] = useState('name') // Default sort by name
  const [loading, setLoading] = useState(true)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const EMPTY_STRING = ''
  const CHARTER_BLUE = '#536E96'
  const JESS = '#20B486'

  const data = useMemo(
    () => processData(bankDepositoDatas, tenure, minBalance, sortBy),
    [tenure, minBalance, sortBy]
  )

  useEffect(() => {
    setLoading(false)
  }, [data])

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768) // Small screen if width is less than 768px
    }

    handleResize() // Check on initial render
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleTenureChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setTenure(event.target.value)
  }, [])

  const handleMinBalanceChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinBalance(parseInt(event.target.value, 10))
  }, [])

  const handleSortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
  }, [])

  const renderCustomYAxisTick = useCallback(
    (props: CustomYAxisProps) => {
      const { payload, x, y } = props
      const bank = data.find((item) => item.bank === payload.value)

      if (!bank) {
        return <></>
      }

      return (
        <g transform={`translate(${x},${y})`}>
          <image href={getImagePath(bank.logo)} x={-35} y={-18} width={30} height={32} />
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
              className='text-xs md:text-sm font-bold'
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
          <div className='flex flex-row items-center space-x-4 mb-2'>
            <img
              src={getImagePath(bank.logo)}
              alt={`${bank.bank} logo`}
              height={32}
              width={32}
              className='object-contain'
            />
            <p className='font-bold text-lg text-charter-blue'>{`${bank.bank} (${bank.bankName})`}</p>
          </div>
          <p className='text-sm text-charter-blue-400'>Interest Rate: {bank.interest}%</p>
        </div>
      </div>
    )
  }, [])

  const lastModified = '2025-07-19'

  return (
    <motion.div
      className='py-10 bg-base-200 min-h-screen w-full'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.1 } }
      }}
    >
      <motion.h1
        className='text-center text-2xl md:text-3xl font-bold text-charter-blue-600 mt-8 mb-4'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
        }}
      >
        Deposit Rate Comparison
      </motion.h1>
      <motion.p
        className='text-center text-charter-blue text-lg md:text-xl mx-4 md:mx-20 lg:mx-36 mb-16'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
        }}
      >
        Compare the deposit rates of different Indonesian banks based on the selected tenure and
        minimum balance. Select a tenure and minimum balance to see the corresponding rates.
      </motion.p>
      <motion.div
        className='mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center items-center'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
        }}
      >
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
            <option value='2000000000'>2B</option>
            <option value='5000000000'>5B</option>
          </select>
        </div>
        <div>
          <label
            htmlFor='sortBy'
            className='mr-2 text-charter-blue text-base md:text-lg font-medium'
          >
            Sort By:
          </label>
          <select
            id='sortBy'
            value={sortBy}
            onChange={handleSortChange}
            aria-label='Sort By'
            className='select border border-charter-blue text-base md:text-lg'
          >
            <option value='name'>Name</option>
            <option value='rate'>Rate</option>
          </select>
        </div>
      </motion.div>
      {loading ? (
        <motion.p
          className='text-charter-blue'
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.3 } }
          }}
        >
          Loading...
        </motion.p>
      ) : (
        <motion.div
          className='mx-4 md:mx-20 lg:mx-36 mb-10'
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
          }}
        >
          <ResponsiveContainer width='100%' height={600}>
            <BarChart
              data={data}
              layout='vertical'
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                type='number'
                label={{ value: EMPTY_STRING }}
                tick={{ fontSize: 14, fontWeight: 'bold', fill: CHARTER_BLUE, dy: 6 }}
              />
              <YAxis type='category' dataKey='bank' tick={renderCustomYAxisTick} width={125} />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              {!isSmallScreen && <Tooltip content={renderCustomTooltip} />}
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

          <div className='flex justify-center mt-10'>
            <span className='badge badge-outline badge-lg bg-base-100 text-charter-blue-600 font-semibold px-4 py-2 rounded-full shadow'>
              Last updated:{' '}
              {new Date(lastModified).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default DepositRateComparisonSection

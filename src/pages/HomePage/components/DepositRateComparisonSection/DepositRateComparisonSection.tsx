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
              className='text-sm font-bold'
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
          <p className='text-sm text-charter-blue-400'>Suku Bunga: {bank.interest}%</p>
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
        Perbandingan Suku Bunga Deposito Bank
      </motion.h1>
      <motion.p
        className='text-center text-charter-blue text-lg md:text-xl mx-4 md:mx-20 lg:mx-36 mb-16 mx-12'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
        }}
      >
        Bandingkan suku bunga deposito dari berbagai bank di Indonesia sesuai tenor dan saldo
        minimum pilihan Anda. Pilih jangka waktu dan nominal minimal untuk melihat bunga yang
        tersedia.
      </motion.p>
      <motion.div
        className='mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 justify-center items-center mx-12'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
        }}
      >
        <div className='flex flex-col space-y-2 mb-4 md:mb-0 w-full md:w-auto'>
          <label
            htmlFor='tenure'
            className='mr-2 text-charter-blue text-base md:text-lg font-medium'
          >
            Jangka Waktu Deposito
          </label>
          <select
            id='tenure'
            value={tenure}
            onChange={handleTenureChange}
            aria-label='Jangka Waktu Deposito'
            className='select border border-charter-blue text-base md:text-lg w-full md:w-auto'
          >
            <option value='1'>1 Bulan</option>
            <option value='3'>3 Bulan</option>
            <option value='6'>6 Bulan</option>
            <option value='12'>12 Bulan</option>
          </select>
        </div>
        <div className='flex flex-col space-y-2 mb-4 md:mb-0 w-full md:w-auto'>
          <label
            htmlFor='minBalance'
            className='mr-2 text-charter-blue text-base md:text-lg font-medium'
          >
            Saldo Minimum Deposito
          </label>
          <select
            id='minBalance'
            value={minBalance}
            onChange={handleMinBalanceChange}
            aria-label='Saldo Minimum Deposito'
            className='select border border-charter-blue text-base md:text-lg w-full md:w-auto'
          >
            <option value='0'>Semua</option>
            <option value='10000000'>10 Juta</option>
            <option value='100000000'>100 Juta</option>
            <option value='250000000'>250 Juta</option>
            <option value='1000000000'>1 Miliar</option>
            <option value='2000000000'>2 Miliar</option>
            <option value='5000000000'>5 Miliar</option>
          </select>
        </div>
        <div className='flex flex-col space-y-2 mb-4 md:mb-0 w-full md:w-auto'>
          <label
            htmlFor='sortBy'
            className='mr-2 text-charter-blue text-base md:text-lg font-medium'
          >
            Urutkan Berdasarkan Kategori
          </label>
          <select
            id='sortBy'
            value={sortBy}
            onChange={handleSortChange}
            aria-label='Urutkan'
            className='select border border-charter-blue text-base md:text-lg w-full md:w-auto'
          >
            <option value='name'>Nama Bank</option>
            <option value='rate'>Suku Bunga Tertinggi</option>
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
            <span className='badge badge-outline badge-lg bg-base-100 text-charter-blue-600 font-semibold px-4 py-2 rounded-full shadow text-center'>
              Data terakhir diperbarui:{' '}
              {new Date(lastModified).toLocaleDateString('id-ID', {
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

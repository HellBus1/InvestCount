import { motion } from 'framer-motion'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import bankDepositoDatas from '../../../../data/bankDepositos.json'
import { Bank, CustomYAxisProps, CustomTooltipProps } from './depositRateComparisonProps'
import { getImagePath, getProductName } from '@/services/inputServices'
import { containerVariants, childVariants } from '@/constants/animations'
import Icon from '@/components/Icon/Icon'

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
  const [sortBy, setSortBy] = useState('rate') // Default to highest rate first for better UX
  const [loading, setLoading] = useState(true)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const BRAND_COLOR = '#059669'
  const SLATE_DARK = '#1E293B'

  const data = useMemo(
    () => processData(bankDepositoDatas, tenure, minBalance, sortBy),
    [tenure, minBalance, sortBy]
  )

  useEffect(() => {
    setLoading(false)
  }, [data])

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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

      if (!bank) return <></>

      return (
        <g transform={`translate(${x},${y})`}>
          <image href={getImagePath(bank.logo)} x={-32} y={-16} width={26} height={26} />
          <a
            href={bank.website}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:underline'
          >
            <text
              x={-40}
              y={0}
              dy={4}
              textAnchor='end'
              fill={SLATE_DARK}
              className='text-xs font-semibold'
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

    if (!active || !payload || payload.length === 0) return <></>

    const bank = payload[0].payload

    return (
      <div className='bg-white p-3.5 rounded-xl shadow-elevated border border-slate-200 text-xs'>
        <div className='flex items-center gap-2 mb-1.5'>
          <img
            src={getImagePath(bank.logo)}
            alt={`${bank.bank} logo`}
            height={22}
            width={22}
            className='object-contain'
          />
          <span className='font-bold text-slate-900'>
            {bank.bank} ({bank.bankName})
          </span>
        </div>
        <div className='text-slate-600'>
          Suku Bunga: <strong className='text-brand-600 font-bold'>{bank.interest}%</strong>
        </div>
      </div>
    )
  }, [])

  const lastModified = '2025-07-19'

  return (
    <motion.section
      className='py-16 md:py-24 bg-white border-t border-slate-200/80 w-full'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      <div className='layout'>
        {/* Section Header */}
        <motion.div className='text-center max-w-2xl mx-auto mb-10' variants={childVariants}>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3'>
            Perbandingan Bunga Deposito Bank
          </h2>
          <p className='text-slate-600 text-sm md:text-base leading-relaxed'>
            Bandingkan rate bunga deposito dari bank digital dan konvensional sesuai tenor & saldo
            minimal.
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          className='max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-card mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4'
          variants={childVariants}
        >
          <div>
            <label
              htmlFor='tenure'
              className='block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5'
            >
              Tenor Simpanan
            </label>
            <select
              id='tenure'
              value={tenure}
              onChange={handleTenureChange}
              aria-label='Tenor Simpanan'
              className='w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none'
            >
              <option value='1'>1 Bulan</option>
              <option value='3'>3 Bulan</option>
              <option value='6'>6 Bulan</option>
              <option value='12'>12 Bulan</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='minBalance'
              className='block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5'
            >
              Saldo Minimum
            </label>
            <select
              id='minBalance'
              value={minBalance}
              onChange={handleMinBalanceChange}
              aria-label='Saldo Minimum'
              className='w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none'
            >
              <option value='0'>Semua Nominal</option>
              <option value='10000000'>Rp10 Juta</option>
              <option value='100000000'>Rp100 Juta</option>
              <option value='250000000'>Rp250 Juta</option>
              <option value='1000000000'>Rp1 Miliar</option>
              <option value='2000000000'>Rp2 Miliar</option>
              <option value='5000000000'>Rp5 Miliar</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='sortBy'
              className='block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5'
            >
              Urutkan
            </label>
            <select
              id='sortBy'
              value={sortBy}
              onChange={handleSortChange}
              aria-label='Urutkan'
              className='w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none'
            >
              <option value='rate'>Suku Bunga Tertinggi</option>
              <option value='name'>Nama Bank (A-Z)</option>
            </select>
          </div>
        </motion.div>

        {/* Chart View */}
        {loading ? (
          <div className='py-16 text-center text-slate-500 text-sm'>Memuat data bank...</div>
        ) : (
          <motion.div className='max-w-4xl mx-auto' variants={childVariants}>
            <div className='p-4 sm:p-6 rounded-2xl bg-slate-50/50 border border-slate-200/60 shadow-card'>
              <ResponsiveContainer width='100%' height={560}>
                <BarChart
                  data={data}
                  layout='vertical'
                  margin={{ top: 10, right: 35, left: 20, bottom: 5 }}
                >
                  <XAxis type='number' tick={{ fontSize: 12, fill: '#64748B' }} unit='%' />
                  <YAxis type='category' dataKey='bank' tick={renderCustomYAxisTick} width={130} />
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {!isSmallScreen && <Tooltip content={renderCustomTooltip} />}
                  <Bar dataKey='interest' fill={BRAND_COLOR} radius={[0, 6, 6, 0]}>
                    <LabelList
                      dataKey='interest'
                      position='right'
                      formatter={(val: number) => `${val}%`}
                      fontSize={12}
                      fontWeight='600'
                      fill='#0F172A'
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Timestamp Badge */}
            <div className='flex items-center justify-center gap-2 mt-6 text-xs text-slate-500 font-medium'>
              <Icon name='calendar' className='w-3.5 h-3.5 text-slate-400' />
              <span>
                Data rate terakhir disesuaikan:{' '}
                {new Date(lastModified).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

export default DepositRateComparisonSection

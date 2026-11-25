import { motion } from 'framer-motion'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts'
import bankDepositoDatas from '../../../../data/bankDepositos.json'
import {
  Bank,
  FilteredBank,
  CustomYAxisProps,
  CustomTooltipProps
} from './depositRateComparisonProps'
import { getImagePath, getProductName } from '@/services/inputServices'
import { containerVariants, childVariants } from '@/constants/animations'
import Icon from '@/components/Icon/Icon'
import {
  BANK_CATEGORY_LABELS,
  BankCategory,
  BankCategoryFilter,
  LPS_RATES,
  evaluateLpsStatus,
  formatPercentId
} from '@/constants/lpsRates'

const BRAND_COLOR = '#059669'
const SOFT_DANGER_BAR = '#E06B74'
const LPS_BANK_LINE = '#64748B'
const LPS_BPR_LINE = '#334155'
const SLATE_DARK = '#1E293B'

const CATEGORY_TABS: BankCategoryFilter[] = ['all', 'digital', 'konvensional', 'bpr']

const getDisplayLabel = (bankName: string, category: BankCategory): string => {
  const { bank, productName } = getProductName(bankName)
  if (category === 'bpr' || category === 'konvensional') {
    return productName
  }
  return bank
}

const formatMinBalance = (amount: number): string => {
  if (amount >= 1_000_000) {
    const jt = amount / 1_000_000
    return `Rp${jt.toLocaleString('id-ID', { maximumFractionDigits: 1 })} jt`
  }
  return `Rp${(amount / 1_000).toLocaleString('id-ID')} rb`
}

const renderLpsLineLabel = (
  text: string,
  fill: string,
  align: 'start' | 'middle' | 'end',
  fontSize: number
) => {
  return ({ viewBox }: { viewBox?: { x?: number; y?: number } }) => {
    if (viewBox?.x === undefined || viewBox?.y === undefined) return <g />
    const dx = align === 'end' ? -4 : align === 'start' ? 4 : 0
    return (
      <text
        x={viewBox.x + dx}
        y={viewBox.y - 8}
        textAnchor={align}
        fill={fill}
        fontSize={fontSize}
        fontWeight={600}
      >
        {text}
      </text>
    )
  }
}

const processData = (
  banks: Bank[],
  tenure: string,
  minBalance: number,
  sortBy: string,
  categoryFilter: BankCategoryFilter
): FilteredBank[] => {
  const groupedBanks: Record<string, Bank[]> = {}

  banks.forEach((bank) => {
    if (categoryFilter !== 'all' && bank.category !== categoryFilter) {
      return
    }
    if (!groupedBanks[bank.bankName]) {
      groupedBanks[bank.bankName] = []
    }
    groupedBanks[bank.bankName].push(bank)
  })

  const data: FilteredBank[] = Object.keys(groupedBanks)
    .map((bankName) => {
      const tiers = groupedBanks[bankName].sort((a, b) => a.minBalance - b.minBalance)
      if (tiers.length === 0) return null

      let selectedTier = tiers[0]
      if (minBalance > 0) {
        const eligibleTiers = tiers.filter((tier) => tier.minBalance <= minBalance)
        if (eligibleTiers.length === 0) return null
        selectedTier = eligibleTiers[eligibleTiers.length - 1]
      }

      const { bank, productName } = getProductName(selectedTier.bankName)
      const interest = selectedTier.rates[tenure]
      const displayName = getDisplayLabel(selectedTier.bankName, selectedTier.category)
      const effectiveBalance = minBalance > 0 ? minBalance : selectedTier.minBalance
      const lps = evaluateLpsStatus(interest, selectedTier.category, effectiveBalance)

      return {
        bank: displayName,
        bankName: productName,
        displayName: bank === productName ? bank : `${bank} (${productName})`,
        category: selectedTier.category,
        interest,
        logo: selectedTier.logoUrl,
        website: selectedTier.website,
        minBalance: selectedTier.minBalance,
        lps
      }
    })
    .filter((item): item is FilteredBank => item !== null)

  if (sortBy === 'name') {
    data.sort((a, b) => a.bank.localeCompare(b.bank))
  } else {
    data.sort((a, b) => b.interest - a.interest)
  }

  return data
}

const DepositRateComparisonSection = () => {
  const [categoryFilter, setCategoryFilter] = useState<BankCategoryFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [tenure, setTenure] = useState('1')
  const [minBalance, setMinBalance] = useState(0)
  const [sortBy, setSortBy] = useState('rate')
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const typedBankData = bankDepositoDatas as Bank[]

  const categoryCounts = useMemo(() => {
    const uniqueByCategory: Record<BankCategoryFilter, Set<string>> = {
      all: new Set(),
      digital: new Set(),
      konvensional: new Set(),
      bpr: new Set()
    }

    typedBankData.forEach((item) => {
      uniqueByCategory.all.add(item.bankName)
      uniqueByCategory[item.category].add(item.bankName)
    })

    return {
      all: uniqueByCategory.all.size,
      digital: uniqueByCategory.digital.size,
      konvensional: uniqueByCategory.konvensional.size,
      bpr: uniqueByCategory.bpr.size
    }
  }, [typedBankData])

  const unfilteredData = useMemo(
    () => processData(typedBankData, tenure, minBalance, sortBy, categoryFilter),
    [typedBankData, tenure, minBalance, sortBy, categoryFilter]
  )

  const data = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return unfilteredData
    return unfilteredData.filter(
      (item) =>
        item.bank.toLowerCase().includes(query) ||
        item.bankName.toLowerCase().includes(query) ||
        item.displayName.toLowerCase().includes(query) ||
        BANK_CATEGORY_LABELS[item.category].toLowerCase().includes(query)
    )
  }, [unfilteredData, searchQuery])

  const unguaranteedCount = useMemo(
    () => data.filter((item) => !item.lps.isGuaranteed).length,
    [data]
  )

  const rowHeight = isSmallScreen ? 44 : 54
  const chartHeight = Math.max(280, data.length * rowHeight + (isSmallScreen ? 48 : 52))
  const xDomainMax = useMemo(() => {
    const maxRate = data.reduce((max, item) => Math.max(max, item.interest), 7)
    return Math.ceil(maxRate + 1)
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

      const logoSize = isSmallScreen ? 22 : 30
      const logoX = isSmallScreen ? -26 : -36
      const textX = isSmallScreen ? -32 : -44
      const tickLabel =
        isSmallScreen && payload.value.length > 13
          ? `${payload.value.slice(0, 12)}…`
          : payload.value

      return (
        <g transform={`translate(${x},${y})`}>
          <a
            href={bank.website}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Buka RIPLAY dan halaman produk deposito resmi ${bank.displayName}`}
            className='cursor-pointer'
          >
            <title>{`Klik untuk buka RIPLAY / produk deposito resmi ${bank.displayName}`}</title>
            <image
              href={getImagePath(bank.logo)}
              x={logoX}
              y={-(logoSize / 2)}
              width={logoSize}
              height={logoSize}
              preserveAspectRatio='xMidYMid meet'
            />
            <text
              x={textX}
              y={0}
              dy={4}
              textAnchor='end'
              fill={SLATE_DARK}
              fontSize={isSmallScreen ? 11.5 : 14}
              fontWeight={600}
              className='hover:underline'
            >
              {tickLabel}
            </text>
          </a>
        </g>
      )
    },
    [data, isSmallScreen]
  )

  const renderCustomTooltip = useCallback((props: CustomTooltipProps) => {
    const { payload, active } = props

    if (!active || !payload || payload.length === 0) return <></>

    const bank = payload[0].payload

    return (
      <div className='bg-white p-3.5 rounded-xl shadow-elevated border border-slate-200 text-xs max-w-[260px]'>
        <div className='flex items-center gap-2.5 mb-2'>
          <img
            src={getImagePath(bank.logo)}
            alt={`Logo ${bank.bank}`}
            height={26}
            width={26}
            className='object-contain rounded'
          />
          <div className='min-w-0'>
            <div className='font-bold text-slate-900 truncate'>{bank.displayName}</div>
            <div className='text-[11px] text-slate-500'>{BANK_CATEGORY_LABELS[bank.category]}</div>
          </div>
        </div>
        <div className='flex items-center justify-between gap-4 py-1.5 border-y border-slate-100'>
          <span className='text-slate-600'>Suku Bunga</span>
          <strong
            className={`font-mono font-bold ${
              bank.lps.isGuaranteed ? 'text-brand-600' : 'text-rose-600'
            }`}
          >
            {formatPercentId(bank.interest)}% p.a.
          </strong>
        </div>
        <div className='mt-2'>
          {bank.lps.isGuaranteed ? (
            <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 font-semibold text-[11px]'>
              <Icon name='shield-check' className='w-3 h-3' />
              <span>Dijamin LPS (≤ {formatPercentId(bank.lps.threshold)}%)</span>
            </span>
          ) : (
            <div className='space-y-1'>
              <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-semibold text-[11px]'>
                <Icon name='alert-triangle' className='w-3 h-3 text-rose-500' />
                <span>Tidak Dijamin LPS</span>
              </span>
              {bank.lps.reason && (
                <p className='text-[11px] text-rose-600 leading-snug'>{bank.lps.reason}</p>
              )}
            </div>
          )}
        </div>
        <p className='mt-2 text-[10px] text-slate-400'>
          Klik ikon atau nama bank untuk melihat RIPLAY resmi.
        </p>
      </div>
    )
  }, [])

  const activeThresholdLabel =
    categoryFilter === 'bpr'
      ? `Batas TBP LPS BPR: ${formatPercentId(LPS_RATES.bprIdr)}% p.a.`
      : categoryFilter === 'all'
        ? `Batas TBP LPS: Bank Umum ${formatPercentId(LPS_RATES.bankUmumIdr)}% • BPR ${formatPercentId(LPS_RATES.bprIdr)}%`
        : `Batas TBP LPS Bank Umum: ${formatPercentId(LPS_RATES.bankUmumIdr)}% p.a.`

  const exceedsBalanceCap = minBalance > LPS_RATES.maxGuaranteedBalance

  return (
    <motion.section
      id='perbandingan-deposito'
      className='py-16 md:py-24 bg-white border-t border-slate-200/80 w-full'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className='layout'>
        {/* Section Header */}
        <motion.div className='text-center max-w-2xl mx-auto mb-8' variants={childVariants}>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3'>
            Perbandingan Bunga Deposito Bank
          </h2>
          <p className='text-slate-600 text-sm md:text-base leading-relaxed'>
            Bandingkan suku bunga deposito bank digital, bank konvensional, dan BPR lengkap dengan
            status penjaminan LPS. Klik ikon bank untuk membuka RIPLAY resmi.
          </p>
        </motion.div>

        {/* Category Switcher Tabs */}
        <motion.div className='max-w-4xl mx-auto mb-5 flex justify-center' variants={childVariants}>
          <div
            role='tablist'
            aria-label='Kategori Bank Deposito'
            className='grid grid-cols-2 sm:inline-flex sm:flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-card w-full sm:w-auto'
          >
            {CATEGORY_TABS.map((tab) => {
              const isSelected = categoryFilter === tab
              return (
                <button
                  key={tab}
                  type='button'
                  role='tab'
                  aria-selected={isSelected}
                  onClick={() => setCategoryFilter(tab)}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{BANK_CATEGORY_LABELS[tab]}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[11px] font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {categoryCounts[tab]}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          className='max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-card mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4'
          variants={childVariants}
        >
          <div className='sm:col-span-3'>
            <label
              htmlFor='bankSearch'
              className='block text-xs font-semibold text-slate-700 mb-1.5'
            >
              Cari Bank / BPR
            </label>
            <div className='relative'>
              <Icon
                name='search'
                className='w-4 h-4 text-slate-400 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2'
              />
              <input
                id='bankSearch'
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Cari nama bank atau BPR (misal: SuperBank, BCA, BPR Supra)...'
                aria-label='Cari Bank atau BPR'
                className='w-full py-2.5 pl-9 pr-9 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none transition-colors'
              />
              {searchQuery && (
                <button
                  type='button'
                  onClick={() => setSearchQuery('')}
                  aria-label='Hapus pencarian bank'
                  className='p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors'
                >
                  <Icon name='close' className='w-4 h-4' />
                </button>
              )}
            </div>
          </div>

          <div>
            <label htmlFor='tenure' className='block text-xs font-semibold text-slate-700 mb-1.5'>
              Tenor Simpanan
            </label>
            <select
              id='tenure'
              value={tenure}
              onChange={handleTenureChange}
              aria-label='Tenor Simpanan'
              className='w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none'
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
              className='block text-xs font-semibold text-slate-700 mb-1.5'
            >
              Simulasi Nominal Saldo
            </label>
            <select
              id='minBalance'
              value={minBalance}
              onChange={handleMinBalanceChange}
              aria-label='Simulasi Nominal Saldo'
              className='w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none'
            >
              <option value='0'>Semua Nominal (Mulai Terendah)</option>
              <option value='10000000'>Rp10 Juta</option>
              <option value='100000000'>Rp100 Juta</option>
              <option value='250000000'>Rp250 Juta</option>
              <option value='500000000'>Rp500 Juta</option>
              <option value='1000000000'>Rp1 Miliar</option>
              <option value='2000000000'>Rp2 Miliar</option>
              <option value='5000000000'>Rp5 Miliar (Di atas plafon LPS)</option>
            </select>
          </div>

          <div>
            <label htmlFor='sortBy' className='block text-xs font-semibold text-slate-700 mb-1.5'>
              Urutkan
            </label>
            <select
              id='sortBy'
              value={sortBy}
              onChange={handleSortChange}
              aria-label='Urutkan'
              className='w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none'
            >
              <option value='rate'>Suku Bunga Tertinggi</option>
              <option value='name'>Nama Bank (A–Z)</option>
            </select>
          </div>
        </motion.div>

        {/* LPS Legend & Alert Bar */}
        <motion.div className='max-w-4xl mx-auto mb-6 space-y-3' variants={childVariants}>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 px-4 py-3 rounded-xl bg-white border border-slate-200/90 text-xs'>
            <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
              <span className='inline-flex items-center gap-1.5 font-semibold text-slate-700 whitespace-nowrap'>
                <span className='w-2.5 h-2.5 rounded-full bg-brand-600' aria-hidden='true' />
                <span>Dijamin LPS</span>
              </span>
              <span className='inline-flex items-center gap-1.5 font-semibold text-slate-700 whitespace-nowrap'>
                <span
                  className='w-2.5 h-2.5 rounded-full'
                  style={{ backgroundColor: SOFT_DANGER_BAR }}
                  aria-hidden='true'
                />
                <span>Tidak Dijamin LPS ({unguaranteedCount} bank)</span>
              </span>
              {categoryFilter !== 'bpr' && (
                <span className='inline-flex items-center gap-1.5 font-medium text-slate-600 whitespace-nowrap'>
                  <span
                    className='w-4 h-0 border-t-2 border-dashed'
                    style={{ borderColor: LPS_BANK_LINE }}
                    aria-hidden='true'
                  />
                  <span>LPS Bank {formatPercentId(LPS_RATES.bankUmumIdr)}%</span>
                </span>
              )}
              {(categoryFilter === 'bpr' || categoryFilter === 'all') && (
                <span className='inline-flex items-center gap-1.5 font-medium text-slate-700 whitespace-nowrap'>
                  <span
                    className='w-4 h-0 border-t-2 border-dotted'
                    style={{ borderColor: LPS_BPR_LINE }}
                    aria-hidden='true'
                  />
                  <span>LPS BPR {formatPercentId(LPS_RATES.bprIdr)}%</span>
                </span>
              )}
            </div>
            <div className='hidden sm:block text-slate-500 font-medium whitespace-nowrap'>
              {activeThresholdLabel}
            </div>
          </div>

          {exceedsBalanceCap && (
            <div
              role='alert'
              className='flex items-start gap-2.5 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm'
            >
              <Icon name='alert-triangle' className='w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5' />
              <p>
                <strong>Perhatian Plafon LPS:</strong> Nominal Rp5 Miliar melebihi batas penjaminan
                maksimal Rp2 Miliar per nasabah per bank. Pertimbangkan membagi dana ke beberapa
                bank.
              </p>
            </div>
          )}
        </motion.div>

        {/* Chart View */}
        <motion.div className='max-w-4xl mx-auto space-y-5' variants={childVariants}>
          <div className='p-3 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-card'>
            {data.length === 0 ? (
              <div className='py-12 px-4 text-center space-y-3'>
                <div className='w-11 h-11 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center'>
                  <Icon name='search' className='w-5 h-5' />
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-bold text-slate-900'>Bank atau BPR tidak ditemukan</p>
                  <p className='text-xs text-slate-500 max-w-sm mx-auto'>
                    Tidak ada produk yang cocok dengan{' '}
                    {searchQuery.trim() ? (
                      <>
                        pencarian{' '}
                        <strong className='text-slate-700'>
                          &ldquo;{searchQuery.trim()}&rdquo;
                        </strong>
                      </>
                    ) : (
                      'kombinasi filter saat ini'
                    )}
                    .
                  </p>
                </div>
                <button
                  type='button'
                  onClick={() => {
                    setSearchQuery('')
                    setCategoryFilter('all')
                    setMinBalance(0)
                  }}
                  className='px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors'
                >
                  Reset Pencarian &amp; Filter
                </button>
              </div>
            ) : (
              <ResponsiveContainer width='100%' height={chartHeight}>
                <BarChart
                  data={data}
                  layout='vertical'
                  margin={{
                    top: 26,
                    right: isSmallScreen ? 44 : 52,
                    left: isSmallScreen ? 0 : 20,
                    bottom: 8
                  }}
                >
                  <XAxis
                    type='number'
                    domain={[0, xDomainMax]}
                    tick={{ fontSize: isSmallScreen ? 11 : 13, fill: '#64748B' }}
                    unit='%'
                  />
                  <YAxis
                    type='category'
                    dataKey='bank'
                    tick={renderCustomYAxisTick}
                    width={isSmallScreen ? 118 : 216}
                  />
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {!isSmallScreen && <Tooltip content={renderCustomTooltip} />}

                  <Bar
                    dataKey='interest'
                    radius={[0, 6, 6, 0]}
                    maxBarSize={isSmallScreen ? 24 : 30}
                  >
                    {data.map((entry) => (
                      <Cell
                        key={entry.displayName}
                        fill={entry.lps.isGuaranteed ? BRAND_COLOR : SOFT_DANGER_BAR}
                      />
                    ))}
                    <LabelList
                      dataKey='interest'
                      position='right'
                      formatter={(val: number) => `${formatPercentId(val)}%`}
                      fontSize={isSmallScreen ? 11.5 : 13}
                      fontWeight='700'
                      fill='#0F172A'
                    />
                  </Bar>

                  {categoryFilter !== 'bpr' && (
                    <ReferenceLine
                      x={LPS_RATES.bankUmumIdr}
                      stroke={LPS_BANK_LINE}
                      strokeDasharray='4 4'
                      strokeWidth={isSmallScreen ? 1.75 : 1.5}
                      ifOverflow='extendDomain'
                      label={renderLpsLineLabel(
                        isSmallScreen
                          ? `Bank ${formatPercentId(LPS_RATES.bankUmumIdr)}%`
                          : `LPS Bank ${formatPercentId(LPS_RATES.bankUmumIdr)}%`,
                        LPS_BANK_LINE,
                        isSmallScreen && categoryFilter === 'all' ? 'end' : 'middle',
                        isSmallScreen ? 10.5 : 12
                      )}
                    />
                  )}

                  {(categoryFilter === 'bpr' || categoryFilter === 'all') && (
                    <ReferenceLine
                      x={LPS_RATES.bprIdr}
                      stroke={LPS_BPR_LINE}
                      strokeDasharray='2 3'
                      strokeWidth={isSmallScreen ? 1.75 : 1.5}
                      ifOverflow='extendDomain'
                      label={renderLpsLineLabel(
                        isSmallScreen
                          ? `BPR ${formatPercentId(LPS_RATES.bprIdr)}%`
                          : `LPS BPR ${formatPercentId(LPS_RATES.bprIdr)}%`,
                        LPS_BPR_LINE,
                        isSmallScreen && categoryFilter === 'all' ? 'start' : 'middle',
                        isSmallScreen ? 10.5 : 12
                      )}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Collapsible Interactive Rate List with Clickable RIPLAY Icons */}
          <div className='rounded-2xl bg-white border border-slate-200/80 shadow-card overflow-hidden'>
            <button
              type='button'
              onClick={() => setIsDetailOpen((prev) => !prev)}
              aria-expanded={isDetailOpen}
              aria-controls='rate-details-list'
              className='w-full px-4 sm:px-6 py-4 bg-slate-50 hover:bg-slate-100/80 transition-colors flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500'
            >
              <div className='min-w-0'>
                <h3 className='text-sm font-bold text-slate-900'>
                  Rincian Rate &amp; Status LPS ({data.length} Produk)
                </h3>
                <p className='text-xs text-slate-500 mt-0.5'>
                  {isDetailOpen
                    ? 'Klik ikon bank/BPR untuk membuka RIPLAY atau halaman produk resmi'
                    : 'Buka untuk melihat rincian minimal penempatan, status LPS, dan tautan RIPLAY resmi'}
                </p>
              </div>
              <span className='self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 flex-shrink-0 whitespace-nowrap'>
                <span>{isDetailOpen ? 'Sembunyikan' : 'Lihat Rincian'}</span>
                <Icon
                  name='chevron-down'
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    isDetailOpen ? 'rotate-180' : ''
                  }`}
                />
              </span>
            </button>

            {isDetailOpen && (
              <div
                id='rate-details-list'
                className='divide-y divide-slate-100 border-t border-slate-200/80'
              >
                {data.length === 0 ? (
                  <div className='px-4 sm:px-6 py-6 text-center text-xs text-slate-500'>
                    Tidak ada produk yang cocok dengan pencarian atau filter saat ini.
                  </div>
                ) : (
                  data.map((item) => (
                    <div
                      key={item.displayName}
                      className='px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors'
                    >
                      <div className='flex items-center gap-3 sm:gap-3.5 min-w-0'>
                        <a
                          href={item.website}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={`Buka RIPLAY dan halaman produk deposito ${item.displayName}`}
                          title={`Buka RIPLAY / produk deposito resmi ${item.displayName}`}
                          className='w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-400 hover:bg-brand-50/40 flex items-center justify-center flex-shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
                        >
                          <img
                            src={getImagePath(item.logo)}
                            alt={`Logo ${item.bank}`}
                            width={28}
                            height={28}
                            loading='lazy'
                            className='w-6 h-6 sm:w-7 sm:h-7 object-contain'
                          />
                        </a>
                        <div className='min-w-0 flex-1'>
                          <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                            <a
                              href={item.website}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-sm font-bold text-slate-900 hover:text-brand-600 transition-colors inline-flex items-center gap-1 max-w-full'
                            >
                              <span className='truncate'>{item.displayName}</span>
                              <Icon
                                name='external-link'
                                className='w-3 h-3 text-slate-400 flex-shrink-0'
                              />
                            </a>
                            <span className='px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium whitespace-nowrap'>
                              {BANK_CATEGORY_LABELS[item.category]}
                            </span>
                          </div>
                          <p className='text-xs text-slate-500 mt-0.5'>
                            Minimal penempatan mulai {formatMinBalance(item.minBalance)}
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0'>
                        {item.lps.isGuaranteed ? (
                          <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold whitespace-nowrap'>
                            <Icon name='shield-check' className='w-3.5 h-3.5 flex-shrink-0' />
                            <span>Dijamin LPS</span>
                          </span>
                        ) : (
                          <span
                            title={item.lps.reason || 'Tidak dijamin LPS'}
                            className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold whitespace-nowrap'
                          >
                            <Icon
                              name='alert-triangle'
                              className='w-3.5 h-3.5 text-rose-500 flex-shrink-0'
                            />
                            <span>Tidak Dijamin LPS</span>
                            {item.lps.shortReason && (
                              <span className='hidden md:inline text-rose-600 font-normal'>
                                ({item.lps.shortReason})
                              </span>
                            )}
                          </span>
                        )}

                        <div
                          className={`font-mono text-sm sm:text-base font-bold tabular-nums min-w-[64px] text-right whitespace-nowrap ${
                            item.lps.isGuaranteed ? 'text-brand-700' : 'text-rose-600'
                          }`}
                        >
                          {formatPercentId(item.interest)}%
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Audit Verification & Timestamp Strip */}
          <div className='px-4 py-3 rounded-xl bg-white border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600'>
            <div className='flex items-center gap-2 text-center sm:text-left'>
              <Icon name='shield-check' className='w-4 h-4 text-brand-600 flex-shrink-0' />
              <span>
                Seluruh suku bunga ditarik langsung dari situs resmi &amp; RIPLAY tiap bank/BPR
                serta telah diaudit kesesuaiannya.
              </span>
            </div>
            <div className='flex items-center gap-2 text-slate-500 font-medium whitespace-nowrap'>
              <Icon name='calendar' className='w-3.5 h-3.5 text-slate-400' />
              <span>Audit: {LPS_RATES.dataUpdatedLabel}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default DepositRateComparisonSection

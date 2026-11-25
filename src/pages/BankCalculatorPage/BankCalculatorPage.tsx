import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '@/components/Footer/Footer'
import Icon from '@/components/Icon/Icon'
import {
  BANK_CALCULATOR_PAGES,
  computeNetReturnPreview,
  getBankCalculatorPage,
  getTiersForBankPage
} from '@/data/bankCalculatorPages'
import {
  BANK_CATEGORY_LABELS,
  LPS_RATES,
  evaluateLpsStatus,
  formatPercentId
} from '@/constants/lpsRates'
import {
  formatNumberWithCommas,
  getImagePath,
  getProductName,
  getRupiahFormat,
  parseAmountInputFromCommas
} from '@/services/inputServices'
import { useSEO } from '@/hooks/useSEO'

const TENOR_OPTIONS: Array<'1' | '3' | '6' | '12'> = ['1', '3', '6', '12']
const QUICK_AMOUNTS = [
  { label: 'Rp5 jt', value: '5,000,000' },
  { label: 'Rp10 jt', value: '10,000,000' },
  { label: 'Rp50 jt', value: '50,000,000' },
  { label: 'Rp100 jt', value: '100,000,000' },
  { label: 'Rp500 jt', value: '500,000,000' },
  { label: 'Rp1 M', value: '1,000,000,000' }
]
const NOMINAL_MATRIX_ROWS = [
  5_000_000, 10_000_000, 50_000_000, 100_000_000, 500_000_000, 1_000_000_000, 2_000_000_000
]

const formatMinPlacement = (amount: number): string => {
  if (amount >= 1_000_000_000) {
    const m = amount / 1_000_000_000
    return `Rp${m.toLocaleString('id-ID', { maximumFractionDigits: 1 })} M`
  }
  if (amount >= 1_000_000) {
    const jt = amount / 1_000_000
    return `Rp${jt.toLocaleString('id-ID', { maximumFractionDigits: 1 })} jt`
  }
  return `Rp${(amount / 1_000).toLocaleString('id-ID')} rb`
}

const BankCalculatorPage = () => {
  const { bankSlug } = useParams<{ bankSlug: string }>()
  const pageConfig = bankSlug ? getBankCalculatorPage(bankSlug) : undefined

  const tiers = useMemo(() => (pageConfig ? getTiersForBankPage(pageConfig) : []), [pageConfig])

  const uniqueProductNames = useMemo(
    () => Array.from(new Set(tiers.map((t) => t.bankName))),
    [tiers]
  )

  const [selectedProduct, setSelectedProduct] = useState<string>(
    pageConfig?.defaultBankName || uniqueProductNames[0] || ''
  )
  const [principalInput, setPrincipalInput] = useState<string>(
    pageConfig?.defaultPrincipal || '50,000,000'
  )
  const [selectedTenor, setSelectedTenor] = useState<'1' | '3' | '6' | '12'>(
    pageConfig?.defaultTenor || '6'
  )

  // Keep selectedProduct synced when navigating across bank spoke routes
  const effectiveProduct = uniqueProductNames.includes(selectedProduct)
    ? selectedProduct
    : pageConfig?.defaultBankName || uniqueProductNames[0] || ''

  const numericPrincipal = parseFloat(parseAmountInputFromCommas(principalInput)) || 0

  const activeTier = useMemo(() => {
    const productTiers = tiers
      .filter((t) => t.bankName === effectiveProduct)
      .sort((a, b) => a.minBalance - b.minBalance)
    if (productTiers.length === 0) return tiers[0]
    const eligible = productTiers.filter((t) => t.minBalance <= numericPrincipal)
    return eligible.length > 0 ? eligible[eligible.length - 1] : productTiers[0]
  }, [tiers, effectiveProduct, numericPrincipal])

  const activeRate = activeTier ? activeTier.rates[selectedTenor] : 0
  const calculation = computeNetReturnPreview(
    numericPrincipal,
    activeRate,
    parseInt(selectedTenor, 10)
  )
  const lpsStatus = activeTier
    ? evaluateLpsStatus(activeRate, activeTier.category, numericPrincipal)
    : null

  const canonicalPath = pageConfig
    ? `/kalkulator-deposito/${pageConfig.slug}/`
    : '/kalkulator-deposito/'

  useSEO({
    title: pageConfig?.title || 'Kalkulator Deposito Bank Indonesia | InvestCount',
    description:
      pageConfig?.metaDescription ||
      'Simulasi bunga deposito bersih setelah pajak 20% dan cek status penjaminan LPS terbaru.',
    canonicalUrl: canonicalPath,
    exactTitle: true,
    keywords: pageConfig?.keywords || ['kalkulator deposito'],
    schema: pageConfig
      ? [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Kalkulator Deposito',
                item: 'https://investtcount.mattrmost.com/'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: `Kalkulator Deposito ${pageConfig.shortName}`,
                item: `https://investtcount.mattrmost.com/kalkulator-deposito/${pageConfig.slug}/`
              }
            ]
          },
          {
            '@type': 'SoftwareApplication',
            name: pageConfig.title,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            url: `https://investtcount.mattrmost.com/kalkulator-deposito/${pageConfig.slug}/`,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'IDR'
            }
          },
          {
            '@type': 'FAQPage',
            mainEntity: pageConfig.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          }
        ]
      : undefined
  })

  if (!pageConfig || !activeTier) {
    return (
      <div className='w-full min-h-screen flex flex-col bg-slate-50'>
        <div className='flex-grow flex items-center justify-center p-6'>
          <div className='text-center max-w-md bg-white p-8 rounded-2xl shadow-card border border-slate-200'>
            <h1 className='text-2xl font-bold text-slate-900 mb-2'>Halaman Bank Tidak Ditemukan</h1>
            <p className='text-slate-600 text-sm mb-6'>
              Silakan gunakan kalkulator deposito utama untuk membandingkan seluruh 35 produk bank
              dan BPR.
            </p>
            <Link
              to='/'
              className='btn bg-brand-600 hover:bg-brand-700 text-white border-0 rounded-xl px-6'
            >
              Ke Kalkulator Deposito Utama
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const relatedPages = pageConfig.relatedSlugs
    .map((slug) => BANK_CALCULATOR_PAGES.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <div className='w-full min-h-screen flex flex-col bg-slate-50'>
      {/* Hero & Direct Answer Block */}
      <section className='w-full pt-12 pb-12 md:pt-16 md:pb-16 bg-gradient-to-b from-white via-brand-50/20 to-slate-50 border-b border-slate-200/80'>
        <div className='layout'>
          <nav
            aria-label='Breadcrumb'
            className='flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-5'
          >
            <Link to='/' className='hover:text-brand-600 font-medium transition-colors'>
              Kalkulator Deposito
            </Link>
            <span>/</span>
            <span className='text-slate-900 font-semibold'>{pageConfig.shortName}</span>
          </nav>

          <div className='max-w-3xl space-y-4'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold'>
              <Icon name='shield-check' className='w-3.5 h-3.5 text-brand-600' />
              <span>{pageConfig.badgeLabel}</span>
            </div>

            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-tight'>
              {pageConfig.h1}
            </h1>

            {/* 45–55 Word Direct Snippet / AI Overview Answer */}
            <p className='text-sm sm:text-base text-slate-700 leading-relaxed bg-white/90 p-4 rounded-xl border border-slate-200/90 shadow-sm'>
              {pageConfig.directAnswer}
            </p>

            <div className='flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500'>
              <span className='inline-flex items-center gap-1.5'>
                <Icon name='calendar' className='w-3.5 h-3.5 text-brand-600' />
                <span>
                  Audit RIPLAY resmi:{' '}
                  <strong className='text-slate-800'>{LPS_RATES.dataUpdatedLabel}</strong>
                </span>
              </span>
              <span>•</span>
              <Link to='/sumber-data/' className='text-brand-700 font-semibold hover:underline'>
                Metodologi &amp; Rumus 30/365
              </Link>
              <span>•</span>
              <Link to='/tentang/' className='text-slate-600 hover:text-brand-700 hover:underline'>
                Disusun oleh Syubban Fakhriya
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Bank Calculator Section */}
      <section className='py-12 md:py-16 layout space-y-12'>
        <div className='rounded-2xl bg-white border border-slate-200 shadow-card p-5 sm:p-8'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
            {/* Left Controls */}
            <div className='lg:col-span-7 space-y-5'>
              <h2 className='text-lg sm:text-xl font-bold font-display text-slate-900'>
                Simulasi Bunga Bersih Deposito {pageConfig.shortName}
              </h2>

              {uniqueProductNames.length > 1 && (
                <div>
                  <label
                    htmlFor='bankProductSelect'
                    className='block text-xs font-semibold text-slate-700 mb-1.5'
                  >
                    Pilih Produk / Kanal Penempatan
                  </label>
                  <select
                    id='bankProductSelect'
                    value={effectiveProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className='w-full py-2.5 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none'
                  >
                    {uniqueProductNames.map((prodName) => {
                      const { bank, productName } = getProductName(prodName)
                      const label = bank === productName ? bank : `${bank} (${productName})`
                      return (
                        <option key={prodName} value={prodName}>
                          {label}
                        </option>
                      )
                    })}
                  </select>
                </div>
              )}

              <div>
                <label
                  htmlFor='bankPrincipalInput'
                  className='block text-xs font-semibold text-slate-700 mb-1.5'
                >
                  Nominal Simpanan Deposito
                </label>
                <div className='relative flex items-center'>
                  <span className='absolute left-3.5 text-sm font-semibold text-slate-400 pointer-events-none'>
                    Rp
                  </span>
                  <input
                    id='bankPrincipalInput'
                    type='text'
                    inputMode='numeric'
                    value={principalInput}
                    onChange={(e) => setPrincipalInput(formatNumberWithCommas(e.target.value))}
                    className='w-full py-3 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-slate-900 font-mono text-sm sm:text-base font-bold focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none'
                  />
                </div>
                <div className='mt-2.5 flex flex-wrap gap-1.5'>
                  {QUICK_AMOUNTS.map((chip) => (
                    <button
                      key={chip.label}
                      type='button'
                      onClick={() => setPrincipalInput(chip.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                        principalInput === chip.value
                          ? 'bg-brand-600 text-white border-brand-600'
                          : 'bg-slate-100 text-slate-700 border-transparent hover:border-brand-300 hover:bg-brand-50'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
                {numericPrincipal > 0 && numericPrincipal < activeTier.minBalance && (
                  <p className='mt-2 text-xs text-amber-700 font-medium'>
                    Catatan: Minimal penempatan resmi produk ini mulai{' '}
                    <strong>{formatMinPlacement(activeTier.minBalance)}</strong>.
                  </p>
                )}
              </div>

              <div>
                <span className='block text-xs font-semibold text-slate-700 mb-1.5'>
                  Pilih Tenor &amp; Suku Bunga Resmi
                </span>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-2.5'>
                  {TENOR_OPTIONS.map((t) => {
                    const isSelected = selectedTenor === t
                    const rate = activeTier.rates[t]
                    return (
                      <button
                        key={t}
                        type='button'
                        onClick={() => setSelectedTenor(t)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-brand-50 border-brand-500 shadow-sm'
                            : 'bg-slate-50 border-slate-200 hover:bg-white'
                        }`}
                      >
                        <div className='text-xs font-semibold text-slate-600'>{t} Bulan</div>
                        <div className='font-mono text-sm sm:text-base font-extrabold text-slate-900 mt-0.5'>
                          {formatPercentId(rate)}%
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Live Breakdown Card */}
            <div className='lg:col-span-5 rounded-2xl bg-slate-900 text-white p-5 sm:p-6 space-y-4'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3.5 border-b border-slate-800'>
                <div className='flex items-center gap-3 min-w-0'>
                  <div className='w-10 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center flex-shrink-0'>
                    <img
                      src={getImagePath(activeTier.logoUrl)}
                      alt={`Logo ${pageConfig.shortName}`}
                      width={26}
                      height={26}
                      className='w-6 h-6 object-contain'
                    />
                  </div>
                  <div className='min-w-0'>
                    <div className='text-sm font-bold text-white truncate'>
                      {getProductName(activeTier.bankName).bank}
                    </div>
                    <div className='text-xs text-slate-400'>
                      {BANK_CATEGORY_LABELS[activeTier.category]} •{' '}
                      <span className='font-mono text-slate-200 font-semibold'>
                        {formatPercentId(activeRate)}% p.a.
                      </span>
                    </div>
                  </div>
                </div>

                {lpsStatus && (
                  <span
                    className={`self-start sm:self-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${
                      lpsStatus.isGuaranteed
                        ? 'bg-brand-500/20 border border-brand-400/40 text-brand-300'
                        : 'bg-rose-500/20 border border-rose-400/40 text-rose-200'
                    }`}
                  >
                    <Icon
                      name={lpsStatus.isGuaranteed ? 'shield-check' : 'alert-triangle'}
                      className='w-3 h-3'
                    />
                    <span>{lpsStatus.isGuaranteed ? 'Dijamin LPS' : 'Tidak Dijamin LPS'}</span>
                  </span>
                )}
              </div>

              <div>
                <div className='text-xs text-slate-400'>
                  Total Bunga Bersih ({selectedTenor} Bulan)
                </div>
                <div className='text-2xl sm:text-3xl font-extrabold font-display tabular-nums text-brand-400 mt-0.5'>
                  {getRupiahFormat(calculation.net)}
                </div>
                <div className='text-xs text-slate-300 mt-1'>
                  Setara sekitar{' '}
                  <strong className='font-mono text-white'>
                    {getRupiahFormat(calculation.monthlyNet)}
                  </strong>{' '}
                  / bulan
                </div>
              </div>

              <div className='space-y-2 pt-3 border-t border-slate-800 text-xs'>
                <div className='flex justify-between gap-2'>
                  <span className='text-slate-400'>Bunga kotor ({selectedTenor} bln)</span>
                  <span className='font-mono tabular-nums text-slate-200 whitespace-nowrap'>
                    {getRupiahFormat(calculation.gross)}
                  </span>
                </div>
                <div className='flex justify-between gap-2'>
                  <span className='text-slate-400'>
                    Potongan PPh Final ({calculation.taxRatePercent}%)
                  </span>
                  <span className='font-mono tabular-nums text-rose-300 whitespace-nowrap'>
                    -{getRupiahFormat(calculation.tax)}
                  </span>
                </div>
                <div className='flex justify-between gap-2 pt-2 border-t border-slate-800 font-semibold'>
                  <span className='text-slate-200'>Estimasi total akhir cair</span>
                  <span className='font-mono tabular-nums text-white whitespace-nowrap'>
                    {getRupiahFormat(numericPrincipal + calculation.net)}
                  </span>
                </div>
              </div>

              {lpsStatus && !lpsStatus.isGuaranteed && lpsStatus.reason && (
                <div className='p-3 rounded-xl bg-rose-500/15 border border-rose-400/30 text-[11px] text-rose-100 leading-relaxed'>
                  <strong className='text-rose-200'>Perhatian LPS:</strong> {lpsStatus.reason}.
                </div>
              )}

              <a
                href={activeTier.website}
                target='_blank'
                rel='noopener noreferrer'
                className='w-full py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5'
              >
                <span>Buka Halaman Produk / RIPLAY Resmi</span>
                <Icon name='external-link' className='w-3.5 h-3.5 text-slate-400' />
              </a>
            </div>
          </div>
        </div>

        {/* Official Rate & Tier Table */}
        <div className='space-y-4'>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold font-display text-slate-900'>
              Tabel Suku Bunga Deposito {pageConfig.shortName} Terbaru 2026
            </h2>
            <p className='text-xs sm:text-sm text-slate-600 mt-1'>
              Rincian suku bunga bruto per tahun, minimal penempatan, dan status penjaminan TBP LPS
              periode {LPS_RATES.effectivePeriod}.
            </p>
          </div>

          <div className='rounded-2xl bg-white border border-slate-200 shadow-card overflow-x-auto'>
            <table className='w-full text-left border-collapse text-xs sm:text-sm'>
              <thead className='bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold'>
                <tr>
                  <th className='py-3.5 px-4'>Produk &amp; Tier Saldo</th>
                  <th className='py-3.5 px-3 text-right'>1 Bln</th>
                  <th className='py-3.5 px-3 text-right'>3 Bln</th>
                  <th className='py-3.5 px-3 text-right'>6 Bln</th>
                  <th className='py-3.5 px-3 text-right'>12 Bln</th>
                  <th className='py-3.5 px-4 text-right'>Status LPS</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {tiers.map((tier, idx) => {
                  const { bank, productName } = getProductName(tier.bankName)
                  const maxRateInTier = Math.max(
                    tier.rates['1'],
                    tier.rates['3'],
                    tier.rates['6'],
                    tier.rates['12']
                  )
                  const minRateInTier = Math.min(
                    tier.rates['1'],
                    tier.rates['3'],
                    tier.rates['6'],
                    tier.rates['12']
                  )
                  const maxEval = evaluateLpsStatus(maxRateInTier, tier.category, tier.minBalance)
                  const minEval = evaluateLpsStatus(minRateInTier, tier.category, tier.minBalance)

                  return (
                    <tr key={`${tier.bankName}-${idx}`} className='hover:bg-slate-50/80'>
                      <td className='py-3.5 px-4'>
                        <div className='font-bold text-slate-900'>
                          {bank === productName ? bank : `${bank} (${productName})`}
                        </div>
                        <div className='text-xs text-slate-500'>
                          Min. penempatan {formatMinPlacement(tier.minBalance)}
                        </div>
                      </td>
                      <td className='py-3.5 px-3 font-mono font-semibold text-right whitespace-nowrap'>
                        {formatPercentId(tier.rates['1'])}%
                      </td>
                      <td className='py-3.5 px-3 font-mono font-semibold text-right whitespace-nowrap'>
                        {formatPercentId(tier.rates['3'])}%
                      </td>
                      <td className='py-3.5 px-3 font-mono font-semibold text-right whitespace-nowrap'>
                        {formatPercentId(tier.rates['6'])}%
                      </td>
                      <td className='py-3.5 px-3 font-mono font-semibold text-right whitespace-nowrap'>
                        {formatPercentId(tier.rates['12'])}%
                      </td>
                      <td className='py-3.5 px-4 text-right whitespace-nowrap'>
                        {maxEval.isGuaranteed ? (
                          <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold'>
                            Dijamin LPS
                          </span>
                        ) : minEval.isGuaranteed ? (
                          <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold'>
                            Sebagian Tenor LPS
                          </span>
                        ) : (
                          <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold'>
                            Non-LPS
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Nominal Simulation Matrix */}
        <div className='space-y-4'>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold font-display text-slate-900'>
              Tabel Estimasi Bunga Bersih {pageConfig.shortName} (Rp5 Juta – Rp2 Miliar)
            </h2>
            <p className='text-xs sm:text-sm text-slate-600 mt-1'>
              Simulasi pada produk <strong>{getProductName(activeTier.bankName).bank}</strong> untuk
              tenor 1 bulan dan 12 bulan (otomatis 0% PPh untuk saldo ≤ Rp7,5 juta dan 20% PPh di
              atasnya).
            </p>
          </div>

          <div className='rounded-2xl bg-white border border-slate-200 shadow-card overflow-x-auto'>
            <table className='w-full text-left border-collapse text-xs sm:text-sm'>
              <thead className='bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold'>
                <tr>
                  <th className='py-3.5 px-4'>Nominal Deposito</th>
                  <th className='py-3.5 px-4 text-right'>
                    Bunga Bersih 1 Bulan ({formatPercentId(activeTier.rates['1'])}%)
                  </th>
                  <th className='py-3.5 px-4 text-right'>
                    Bunga Bersih 12 Bulan ({formatPercentId(activeTier.rates['12'])}%)
                  </th>
                  <th className='py-3.5 px-4 text-right'>Pajak PPh</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {NOMINAL_MATRIX_ROWS.map((nom) => {
                  const res1m = computeNetReturnPreview(nom, activeTier.rates['1'], 1)
                  const res12m = computeNetReturnPreview(nom, activeTier.rates['12'], 12)
                  return (
                    <tr key={nom} className='hover:bg-slate-50/80'>
                      <td className='py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap'>
                        {getRupiahFormat(nom)}
                      </td>
                      <td className='py-3 px-4 font-mono font-semibold text-brand-700 text-right whitespace-nowrap'>
                        {getRupiahFormat(res1m.net)}
                      </td>
                      <td className='py-3 px-4 font-mono font-semibold text-slate-900 text-right whitespace-nowrap'>
                        {getRupiahFormat(res12m.net)}
                      </td>
                      <td className='py-3 px-4 text-right text-slate-600 whitespace-nowrap'>
                        {res1m.taxRatePercent === 0 ? '0% (Bebas PPh)' : '20% Final'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Analytical Insights */}
        <div className='p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4'>
          <h2 className='text-lg sm:text-xl font-bold font-display text-slate-900'>
            Catatan Penting Sebelum Membuka Deposito {pageConfig.shortName}
          </h2>
          <ul className='space-y-2.5 text-xs sm:text-sm text-slate-700'>
            {pageConfig.highlights.map((note, idx) => (
              <li key={idx} className='flex items-start gap-2.5'>
                <Icon name='check' className='w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5' />
                <span className='leading-relaxed'>{note}</span>
              </li>
            ))}
          </ul>

          <div className='pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs font-semibold'>
            <span className='text-slate-500'>Panduan terkait:</span>
            {pageConfig.relatedBlogSlugs.map((guide) => (
              <Link
                key={guide.slug}
                to={`/blog/${guide.slug}/`}
                className='text-brand-700 hover:text-brand-800 hover:underline inline-flex items-center gap-1'
              >
                <span>{guide.label}</span>
                <Icon name='arrow-right' className='w-3 h-3' />
              </Link>
            ))}
          </div>
        </div>

        {/* Bank-Specific FAQs */}
        <div className='space-y-4'>
          <h2 className='text-xl sm:text-2xl font-bold font-display text-slate-900'>
            Pertanyaan Seputar Deposito {pageConfig.shortName}
          </h2>
          <div className='grid grid-cols-1 gap-3'>
            {pageConfig.faqs.map((faq, i) => (
              <div
                key={i}
                className='p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1.5'
              >
                <h3 className='text-sm sm:text-base font-bold text-slate-900'>{faq.question}</h3>
                <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hub & Spoke Internal Links: Related Bank Calculators + Pillar CTA */}
        <div className='space-y-5'>
          <h2 className='text-lg sm:text-xl font-bold font-display text-slate-900'>
            Bandingkan dengan Kalkulator Bank Lainnya
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {relatedPages.map((rel) => (
              <Link
                key={rel.slug}
                to={`/kalkulator-deposito/${rel.slug}/`}
                className='p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-card hover:border-brand-300 transition-all flex flex-col justify-between group'
              >
                <div>
                  <span className='text-[11px] font-semibold text-brand-700'>{rel.badgeLabel}</span>
                  <h3 className='text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors mt-1'>
                    Kalkulator Deposito {rel.shortName}
                  </h3>
                </div>
                <span className='mt-3 pt-2 border-t border-slate-100 inline-flex items-center gap-1 text-xs font-semibold text-brand-600'>
                  <span>Buka simulasi</span>
                  <Icon name='arrow-right' className='w-3 h-3' />
                </span>
              </Link>
            ))}
          </div>

          <div className='rounded-2xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <div className='space-y-1 max-w-xl'>
              <h2 className='text-lg sm:text-xl font-bold font-display text-white'>
                Ingin membandingkan {pageConfig.shortName} dengan 35 bank &amp; BPR sekaligus?
              </h2>
              <p className='text-xs sm:text-sm text-slate-300'>
                Gunakan kalkulator deposito utama untuk simulasi ARO+ majemuk, grafik perbandingan
                semua bank, dan rencana anggaran bulanan.
              </p>
            </div>
            <Link
              to='/'
              className='px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold whitespace-nowrap inline-flex items-center gap-1.5 transition-colors'
            >
              <span>Ke Kalkulator Deposito Utama</span>
              <Icon name='arrow-right' className='w-4 h-4' />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BankCalculatorPage

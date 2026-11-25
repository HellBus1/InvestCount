import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@/components/Icon/Icon'
import { homeFAQs } from '@/data/faqs'
import { BANK_CALCULATOR_PAGES, computeNetReturnPreview } from '@/data/bankCalculatorPages'
import { LPS_RATES, formatPercentId } from '@/constants/lpsRates'
import { getRupiahFormat } from '@/services/inputServices'

const PAA_NOMINALS = [
  { amount: 1_000_000, label: 'Rp1.000.000', note: 'Bebas PPh 0%' },
  { amount: 5_000_000, label: 'Rp5.000.000', note: 'Bebas PPh 0%' },
  { amount: 10_000_000, label: 'Rp10.000.000', note: 'PPh 20%' },
  { amount: 50_000_000, label: 'Rp50.000.000', note: 'PPh 20%' },
  { amount: 100_000_000, label: 'Rp100.000.000', note: 'PPh 20%' },
  { amount: 1_000_000_000, label: 'Rp1.000.000.000', note: 'PPh 20% • Aman LPS' },
  { amount: 2_000_000_000, label: 'Rp2.000.000.000', note: 'Batas Maks. LPS' },
  { amount: 3_000_000_000, label: 'Rp3.000.000.000', note: '> Plafon 1 Bank' }
]

const SEOContentSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className='below-fold-section py-16 md:py-24 bg-white border-t border-slate-200/80'>
      <div className='layout space-y-20'>
        {/* 1. PAA Nominal Simulation Table (Rp1 Juta – Rp3 Miliar) */}
        <div className='max-w-5xl mx-auto space-y-6'>
          <div className='max-w-3xl'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight'>
              Simulasi Cepat Bunga Deposito per Bulan (Rp1 Juta – Rp3 Miliar)
            </h2>
            <p className='mt-3 text-slate-600 text-sm sm:text-base leading-relaxed'>
              Berdasarkan <strong>PP No. 131 Tahun 2000</strong>, simpanan deposito hingga{' '}
              <strong>Rp7,5 juta bebas pajak (0%)</strong>, sedangkan saldo di atas Rp7,5 juta
              dipotong <strong>PPh Final 20%</strong>. Tabel di bawah merangkum estimasi bunga
              bersih 1 bulan (30/365 hari) pada batas LPS Bank Umum (3,75%), rata-rata bank
              digital/BPR (5,50%), dan batas LPS BPR (6,25%).
            </p>
          </div>

          <div className='rounded-2xl bg-white border border-slate-200 shadow-card overflow-x-auto'>
            <table className='w-full text-left border-collapse text-xs sm:text-sm'>
              <thead className='bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold'>
                <tr>
                  <th className='py-3.5 px-4'>Nominal Simpanan</th>
                  <th className='py-3.5 px-4 text-right'>
                    Bank Umum 3,75%
                    <span className='block text-[10px] font-normal text-brand-700'>
                      Batas TBP LPS
                    </span>
                  </th>
                  <th className='py-3.5 px-4 text-right'>
                    Digital / BPR 5,50%
                    <span className='block text-[10px] font-normal text-slate-500'>
                      Rate Menengah
                    </span>
                  </th>
                  <th className='py-3.5 px-4 text-right'>
                    BPR 6,25%
                    <span className='block text-[10px] font-normal text-brand-700'>
                      Batas TBP BPR
                    </span>
                  </th>
                  <th className='py-3.5 px-4 text-right'>Ketentuan Pajak &amp; LPS</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {PAA_NOMINALS.map((row) => {
                  const r375 = computeNetReturnPreview(row.amount, 3.75, 1)
                  const r550 = computeNetReturnPreview(row.amount, 5.5, 1)
                  const r625 = computeNetReturnPreview(row.amount, 6.25, 1)
                  const overLpsCap = row.amount > LPS_RATES.maxGuaranteedBalance

                  return (
                    <tr key={row.amount} className='hover:bg-slate-50/80'>
                      <td className='py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap'>
                        {row.label}
                      </td>
                      <td className='py-3 px-4 font-mono font-semibold text-slate-800 text-right whitespace-nowrap'>
                        {getRupiahFormat(r375.net)}
                      </td>
                      <td className='py-3 px-4 font-mono font-semibold text-slate-800 text-right whitespace-nowrap'>
                        {getRupiahFormat(r550.net)}
                      </td>
                      <td className='py-3 px-4 font-mono font-bold text-brand-700 text-right whitespace-nowrap'>
                        {getRupiahFormat(r625.net)}
                      </td>
                      <td className='py-3 px-4 text-right whitespace-nowrap'>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            overLpsCap
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : row.amount <= 7_500_000
                                ? 'bg-brand-50 text-brand-700 border border-brand-200'
                                : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {row.note}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Hub Grid: Dedicated Bank & BPR Calculators */}
        <div className='max-w-5xl mx-auto space-y-5'>
          <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-3'>
            <div>
              <h2 className='text-xl sm:text-2xl md:text-3xl font-bold font-display text-slate-900'>
                Kalkulator Deposito Spesifik per Bank &amp; BPR
              </h2>
              <p className='text-xs sm:text-sm text-slate-600 mt-1'>
                Pilih bank tujuan Anda untuk melihat tabel tier nominal, simulasi per tenor, dan
                verifikasi penjaminan LPS 2026.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
            {BANK_CALCULATOR_PAGES.map((bankPage) => (
              <Link
                key={bankPage.slug}
                to={`/kalkulator-deposito/${bankPage.slug}/`}
                className='p-3.5 rounded-xl bg-slate-50 hover:bg-brand-50/60 border border-slate-200 hover:border-brand-300 transition-all flex items-center justify-between gap-2 group'
              >
                <div className='min-w-0'>
                  <div className='text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-700 truncate'>
                    Deposito {bankPage.shortName}
                  </div>
                  <div className='text-[11px] text-slate-500 truncate'>{bankPage.badgeLabel}</div>
                </div>
                <Icon
                  name='arrow-right'
                  className='w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all flex-shrink-0'
                />
              </Link>
            ))}
          </div>
        </div>

        {/* 3. Formula, 3 Pillars & Contextual Internal Link Sculpting */}
        <div className='max-w-4xl mx-auto space-y-8'>
          <div className='text-center max-w-2xl mx-auto'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight'>
              Cara Menghitung Bunga Deposito Setelah Pajak 20%
            </h2>
            <p className='mt-3 text-slate-600 text-sm sm:text-base leading-relaxed'>
              Bunga bersih deposito dihitung dengan mengalikan pokok simpanan, suku bunga tahunan,
              dan rasio hari tenor (30/365 hari), lalu dikurangi potongan PPh Final 20% apabila
              saldo melebihi Rp7,5 juta. Kalkulator bank umumnya hanya menampilkan satu produk milik
              sendiri — InvestCount membandingkan 35 produk lintas bank secara netral.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between'>
              <div>
                <h3 className='text-base font-bold text-slate-900 mb-2'>
                  Bunga Bersih Setelah PPh 20%
                </h3>
                <p className='text-xs sm:text-sm text-slate-600 leading-relaxed mb-3'>
                  Suku bunga promosi selalu bersifat bruto tahunan. Sistem otomatis memisahkan saldo
                  bebas pajak (≤ Rp7,5 juta) dan potongan PPh Final Pasal 4 ayat (2).
                </p>
              </div>
              <Link
                to='/blog/pajak-deposito-20-persen/'
                className='text-xs font-semibold text-brand-700 hover:underline inline-flex items-center gap-1'
              >
                <span>Aturan pajak deposito 20%</span>
                <Icon name='arrow-right' className='w-3 h-3' />
              </Link>
            </div>

            <div className='p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between'>
              <div>
                <h3 className='text-base font-bold text-slate-900 mb-2'>
                  Cek Status Penjaminan LPS
                </h3>
                <p className='text-xs sm:text-sm text-slate-600 leading-relaxed mb-3'>
                  13 dari 21 bank digital saat ini menawarkan bunga di atas batas TBP LPS (
                  {formatPercentId(LPS_RATES.bankUmumIdr)}% Bank Umum vs{' '}
                  {formatPercentId(LPS_RATES.bprIdr)}% BPR). Ketahui risikonya sebelum menempatkan
                  dana.
                </p>
              </div>
              <Link
                to='/blog/deposito-bpr-vs-bank-umum/'
                className='text-xs font-semibold text-brand-700 hover:underline inline-flex items-center gap-1'
              >
                <span>Deposito BPR vs Bank Umum</span>
                <Icon name='arrow-right' className='w-3 h-3' />
              </Link>
            </div>

            <div className='p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between'>
              <div>
                <h3 className='text-base font-bold text-slate-900 mb-2'>
                  Simulasi ARO, ARO+ &amp; Inflasi
                </h3>
                <p className='text-xs sm:text-sm text-slate-600 leading-relaxed mb-3'>
                  Bandingkan hasil cair langsung (Non-ARO) dengan gulungan bunga majemuk (ARO+), dan
                  pastikan bunga bersih Anda tetap mengungguli laju inflasi tahunan.
                </p>
              </div>
              <div className='flex flex-col gap-1'>
                <Link
                  to='/blog/deposito-aro-vs-non-aro/'
                  className='text-xs font-semibold text-brand-700 hover:underline inline-flex items-center gap-1'
                >
                  <span>Perbedaan ARO, Non-ARO &amp; ARO+</span>
                  <Icon name='arrow-right' className='w-3 h-3' />
                </Link>
                <Link
                  to='/blog/inflasi-dan-deposito/'
                  className='text-xs font-semibold text-slate-600 hover:text-brand-700 hover:underline inline-flex items-center gap-1'
                >
                  <span>Return riil deposito vs inflasi</span>
                  <Icon name='arrow-right' className='w-3 h-3' />
                </Link>
              </div>
            </div>
          </div>

          {/* Guide & E-E-A-T Attribution Box */}
          <div className='p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-4'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <div>
                <h3 className='text-base sm:text-lg font-bold text-slate-900 mb-1'>
                  Pelajari Rumus Manual &amp; Daftar Suku Bunga Tertinggi 2026
                </h3>
                <p className='text-xs sm:text-sm text-slate-600'>
                  Lihat contoh hitungan bulanan serta perbandingan lengkap{' '}
                  <Link
                    to='/blog/bunga-deposito-bank-indonesia-2026/'
                    className='text-brand-700 font-semibold hover:underline'
                  >
                    daftar bunga deposito bank tertinggi 2026
                  </Link>
                  .
                </p>
              </div>
              <Link
                to='/blog/cara-menghitung-bunga-deposito/'
                className='btn bg-brand-600 hover:bg-brand-700 text-white border-0 rounded-xl px-5 py-2.5 h-auto text-xs sm:text-sm font-semibold whitespace-nowrap inline-flex items-center gap-1.5'
              >
                <span>Baca Panduan Rumus</span>
                <Icon name='arrow-right' className='w-3.5 h-3.5' />
              </Link>
            </div>

            <div className='pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500'>
              <span>
                Data 35 produk diaudit dari RIPLAY resmi per{' '}
                <strong className='text-slate-700'>{LPS_RATES.dataUpdatedLabel}</strong> mengacu
                pada{' '}
                <a
                  href='https://www.lps.go.id'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-brand-700 font-medium hover:underline'
                >
                  LPS
                </a>{' '}
                &amp;{' '}
                <a
                  href='https://www.ojk.go.id'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-brand-700 font-medium hover:underline'
                >
                  OJK
                </a>
                .
              </span>
              <span className='flex items-center gap-3'>
                <Link to='/sumber-data/' className='text-brand-700 font-semibold hover:underline'>
                  Metodologi &amp; Sumber Data
                </Link>
                <span>•</span>
                <Link to='/tentang/' className='hover:text-slate-800 hover:underline'>
                  Oleh Syubban Fakhriya
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* 4. FAQ Accordion Section (Upgraded to H2) */}
        <div className='max-w-3xl mx-auto'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl sm:text-3xl font-bold font-display text-slate-900'>
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className='text-xs sm:text-sm text-slate-600 mt-2'>
              Jawaban ringkas seputar simulasi nominal deposito, pajak 20%, dan batas penjaminan
              LPS.
            </p>
          </div>

          <div className='space-y-3'>
            {homeFAQs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={index}
                  className='rounded-xl border border-slate-200 overflow-hidden bg-slate-50 transition-colors'
                >
                  <button
                    type='button'
                    className='w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-brand-600 transition-colors'
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-600 border-brand-200' : ''
                      }`}
                    >
                      <Icon name='chevron-down' className='w-4 h-4' />
                    </span>
                  </button>

                  {isOpen && (
                    <div className='px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3'>
                      <p>{faq.answer}</p>
                      {faq.link && (
                        <div className='mt-2.5 pt-2 border-t border-slate-200/40'>
                          <Link
                            to={faq.link.url}
                            className='inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700'
                          >
                            <span>{faq.link.text}</span>
                            <Icon name='arrow-right' className='w-3 h-3' />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SEOContentSection

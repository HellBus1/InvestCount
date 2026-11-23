import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@/components/Icon/Icon'
import { homeFAQs } from '@/data/faqs'
import { LPS_RATES, formatPercentId } from '@/constants/lpsRates'

const SEOContentSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className='py-16 md:py-24 bg-white border-t border-slate-200/80'>
      <div className='layout'>
        {/* Educational Content Section */}
        <div className='max-w-4xl mx-auto mb-16'>
          <div className='text-center mb-12'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight'>
              Kenapa Membandingkan Deposito di InvestCount?
            </h2>
            <p className='mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto'>
              Kalkulator bank umumnya hanya menampilkan bunga kotor produknya sendiri. InvestCount
              memudahkan Anda melihat bunga bersih setelah pajak, membandingkan 35 produk lintas
              bank, dan mengecek status penjaminan LPS di satu halaman.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
            <div className='p-6 rounded-2xl bg-slate-50 border border-slate-200'>
              <h3 className='text-base font-bold text-slate-900 mb-2'>
                Bunga Bersih Setelah Pajak
              </h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                Suku bunga yang dipajang bank bersifat bruto tahunan. InvestCount otomatis
                memperhitungkan PPh Final 20% untuk simpanan di atas Rp7,5 juta.
              </p>
            </div>

            <div className='p-6 rounded-2xl bg-slate-50 border border-slate-200'>
              <h3 className='text-base font-bold text-slate-900 mb-2'>Komparasi &amp; Cek LPS</h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                Bandingkan bank digital, konvensional, dan BPR sekaligus. Produk di atas batas TBP
                LPS ({formatPercentId(LPS_RATES.bankUmumIdr)}% Bank Umum /{' '}
                {formatPercentId(LPS_RATES.bprIdr)}% BPR) langsung ditandai.
              </p>
            </div>

            <div className='p-6 rounded-2xl bg-slate-50 border border-slate-200'>
              <h3 className='text-base font-bold text-slate-900 mb-2'>
                Simulasi ARO &amp; Anggaran
              </h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                Lihat proyeksi bunga berbunga (<em>compounding</em>) untuk ARO+, atau cek langsung
                berapa persen tagihan rutin bulanan Anda yang tertutup bunga deposito.
              </p>
            </div>
          </div>

          {/* Quick Guide Box */}
          <div className='p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5'>
            <div>
              <h3 className='text-base sm:text-lg font-bold text-slate-900 mb-1'>
                Ingin melihat rumus manualnya?
              </h3>
              <p className='text-xs sm:text-sm text-slate-600'>
                Pelajari cara hitung bunga bulanan, harian, dan ketentuan PPh Final Pasal 4 ayat 2.
              </p>
            </div>
            <Link
              to='/blog/cara-menghitung-bunga-deposito'
              className='btn bg-brand-600 hover:bg-brand-700 text-white border-0 rounded-xl px-5 py-2.5 h-auto text-xs sm:text-sm font-semibold whitespace-nowrap inline-flex items-center gap-1.5'
            >
              <span>Baca Panduan Rumus</span>
              <Icon name='arrow-right' className='w-3.5 h-3.5' />
            </Link>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className='max-w-3xl mx-auto'>
          <div className='text-center mb-8'>
            <h3 className='text-xl sm:text-2xl md:text-3xl font-bold font-display text-slate-900'>
              Pertanyaan yang Sering Diajukan
            </h3>
            <p className='text-xs sm:text-sm text-slate-600 mt-2'>
              Jawaban singkat seputar rumus bunga deposito, pajak, dan batas penjaminan LPS.
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

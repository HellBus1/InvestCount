import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@/components/Icon/Icon'
import { homeFAQs } from '@/data/faqs'

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
            <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-3'>
              <Icon name='sparkles' className='w-3.5 h-3.5' />
              <span>Panduan Cerdas Deposito</span>
            </span>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight'>
              Mengapa Harus Membandingkan Bunga Deposito di InvestCount?
            </h2>
            <p className='mt-4 text-slate-600 text-sm sm:text-base leading-relaxed'>
              Sebagian besar bank hanya menyediakan simulasi untuk produk mereka sendiri.
              InvestCount adalah platform independen pertama yang memungkinkan Anda membandingkan
              suku bunga resmi, menghitung pajak 20% secara transparan, dan memilih penempatan dana
              paling menguntungkan.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
            <div className='p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-300 transition-colors'>
              <div className='w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-4'>
                1
              </div>
              <h3 className='text-base font-bold text-slate-900 mb-2'>
                Hitung Bunga Bersih (Netto)
              </h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                Bunga yang dipublikasikan bank adalah bunga kotor tahunan. InvestCount langsung
                memperhitungkan potongan PPh Final 20% untuk saldo di atas Rp7,5 Juta.
              </p>
            </div>

            <div className='p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-300 transition-colors'>
              <div className='w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-4'>
                2
              </div>
              <h3 className='text-base font-bold text-slate-900 mb-2'>Komparasi Multi-Bank</h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                Bandingkan suku bunga bank konvensional (BCA, Mandiri, BRI, BNI) dengan bank digital
                (Seabank, Krom, Jago) dan BPR yang menawarkan bunga hingga 6,75% p.a.
              </p>
            </div>

            <div className='p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-300 transition-colors'>
              <div className='w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-4'>
                3
              </div>
              <h3 className='text-base font-bold text-slate-900 mb-2'>Simulasi Efek ARO Majemuk</h3>
              <p className='text-xs sm:text-sm text-slate-600 leading-relaxed'>
                Lihat proyeksi pertumbuhan dana Anda jika bunga diinvestasikan kembali (ARO+)
                menciptakan efek bunga bergulung (*compounding interest*) tanpa modal tambahan.
              </p>
            </div>
          </div>

          {/* Quick Guide Box */}
          <div className='p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-50 to-slate-50 border border-brand-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6'>
            <div>
              <h3 className='text-base sm:text-lg font-bold text-slate-900 mb-1'>
                Pelajari Formula Lengkap Bunga Deposito
              </h3>
              <p className='text-xs sm:text-sm text-slate-600'>
                Pahami cara kerja rumus bunga bulanan, harian, dan regulasi perpajakan PPh Final.
              </p>
            </div>
            <Link
              to='/blog/cara-menghitung-bunga-deposito'
              className='btn bg-brand-600 hover:bg-brand-700 text-white border-0 rounded-xl px-5 py-2 text-xs font-semibold whitespace-nowrap flex items-center gap-1.5'
            >
              <span>Baca Panduan Formula</span>
              <Icon name='arrow-right' className='w-3.5 h-3.5' />
            </Link>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className='max-w-3xl mx-auto'>
          <div className='text-center mb-8'>
            <h3 className='text-xl sm:text-2xl md:text-3xl font-bold font-display text-slate-900'>
              Pertanyaan yang Sering Diajukan (FAQ)
            </h3>
            <p className='text-xs sm:text-sm text-slate-600 mt-2'>
              Informasi terpercaya seputar perhitungan bunga deposito, pajak, dan penjaminan LPS.
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
                      className={`w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-600' : ''
                      }`}
                    >
                      ▼
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

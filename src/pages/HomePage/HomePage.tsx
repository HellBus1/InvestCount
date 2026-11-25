import BudgetPlannerSection from '@/pages/HomePage/components/BudgetPlannerSection/BudgetPlannerSection'
import DepositRateComparisonSection from '@/pages/HomePage/components/DepositRateComparisonSection/DepositRateComparisonSection'
import DepositSection from '@/pages/HomePage/components/DepositSection/DepositSection'
import Footer from '@/components/Footer/Footer'
import Hero from '@/pages/HomePage/components/Hero/Hero'
import LPSSection from '@/pages/HomePage/components/LPSSection/LPSSection'
import TrustBadgesSection from '@/pages/HomePage/components/TrustBadgesSection/TrustBadgesSection'
import SEOContentSection from '@/pages/HomePage/components/SEOContentSection/SEOContentSection'
import { homeFAQs } from '@/data/faqs'
import { useSEO } from '@/hooks/useSEO'
import { useRef } from 'react'

const HomePage = () => {
  const depositSectionRef = useRef<HTMLDivElement | null>(null)

  useSEO({
    title: 'Kalkulator Deposito 2026: Hitung Bunga Bersih & 35 Bank',
    description:
      'Hitung bunga deposito bersih setelah PPh 20% dan cek status LPS dari 35 bank & BPR (BCA, Mandiri, SeaBank, Krom). Gratis tanpa iklan — coba sekarang.',
    canonicalUrl: '/',
    exactTitle: true,
    keywords: [
      'kalkulator deposito',
      'simulasi deposito',
      'hitung bunga deposito',
      'kalkulator bunga deposito',
      'bunga deposito 2026',
      'pajak deposito 20%',
      'kalkulator deposito bpr',
      'deposito bank digital',
      'ARO deposito'
    ],
    schema: [
      {
        '@type': 'WebSite',
        '@id': 'https://investtcount.mattrmost.com/#website',
        name: 'InvestCount',
        url: 'https://investtcount.mattrmost.com/',
        inLanguage: 'id-ID',
        description:
          'Kalkulator deposito independen untuk menghitung bunga bersih setelah pajak 20% dan membandingkan 35 produk bank serta BPR di Indonesia.'
      },
      {
        '@type': 'Organization',
        '@id': 'https://investtcount.mattrmost.com/#organization',
        name: 'InvestCount',
        url: 'https://investtcount.mattrmost.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://investtcount.mattrmost.com/assets/web_icon.svg'
        },
        founder: {
          '@type': 'Person',
          name: 'Syubban Fakhriya',
          url: 'https://www.linkedin.com/in/syubban-fakhriya/'
        },
        sameAs: ['https://github.com/HellBus1', 'https://www.linkedin.com/in/syubban-fakhriya/']
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Kalkulator Deposito InvestCount',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        inLanguage: 'id-ID',
        url: 'https://investtcount.mattrmost.com/',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'IDR'
        }
      },
      {
        '@type': 'HowTo',
        name: 'Cara Menghitung Bunga Deposito Setelah Pajak 20%',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Pilih tipe perpanjangan deposito',
            text: 'Pilih Non-ARO, ARO, atau ARO+ (bunga berbunga majemuk).'
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Masukkan nominal pokok, suku bunga, dan tenor',
            text: 'Isi jumlah simpanan, suku bunga tahunan (% p.a.), dan tenor bulan.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Lihat hasil bunga bersih & cek status LPS',
            text: 'Sistem menghitung potongan PPh Final 20% (atau 0% untuk saldo ≤ Rp7,5 juta) dan membandingkannya dengan TBP LPS.'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: homeFAQs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  })

  const handleScrollToDeposit = () => {
    depositSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <>
      <Hero onScrollToDepositClick={handleScrollToDeposit} />
      <TrustBadgesSection />
      <DepositSection depositSectionRef={depositSectionRef} />
      <DepositRateComparisonSection />
      <BudgetPlannerSection />
      <LPSSection />
      <SEOContentSection />
      <Footer />
    </>
  )
}

export default HomePage

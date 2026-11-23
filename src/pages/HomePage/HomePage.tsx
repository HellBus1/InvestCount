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
    title:
      'Kalkulator Deposito Indonesia - Hitung Bunga Bersih & Bandingkan Semua Bank | InvestCount',
    description:
      'Kalkulator deposito gratis untuk menghitung bunga bersih setelah pajak 20%, menyusun rencana anggaran bulanan, dan membandingkan 35 produk bank digital, konvensional, dan BPR beserta status penjaminan LPS.',
    canonicalUrl: '/',
    keywords: [
      'kalkulator deposito',
      'hitung bunga deposito',
      'simulasi deposito',
      'deposito bank',
      'bunga deposito',
      'pajak deposito 20%',
      'deposito indonesia',
      'kalkulator bunga deposito',
      'deposito online',
      'ARO deposito'
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'InvestCount',
        url: 'https://investtcount.mattrmost.com/',
        inLanguage: 'id-ID',
        description: 'Kalkulator deposito gratis dan pembanding suku bunga bank Indonesia.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Kalkulator Deposito InvestCount',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        url: 'https://investtcount.mattrmost.com/',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'IDR'
        }
      },
      {
        '@context': 'https://schema.org',
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

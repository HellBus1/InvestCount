import BudgetPlannerSection from '@/pages/HomePage/components/BudgetPlannerSection/BudgetPlannerSection'
import DepositRateComparisonSection from '@/pages/HomePage/components/DepositRateComparisonSection/DepositRateComparisonSection'
import DepositSection from '@/pages/HomePage/components/DepositSection/DepositSection'
import Footer from '@/pages/HomePage/components/Footer/Footer'
import Hero from '@/pages/HomePage/components/Hero/Hero'
import LPSSection from '@/pages/HomePage/components/LPSSection/LPSSection'
import { useRef } from 'react'

const HomePage = () => {
  const depositSectionRef = useRef<HTMLDivElement | null>(null)

  const handleScrollToDeposit = () => {
    depositSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <>
      <Hero onScrollToDepositClick={handleScrollToDeposit} />
      <DepositSection depositSectionRef={depositSectionRef} />
      <DepositRateComparisonSection />
      <BudgetPlannerSection />
      <LPSSection />
      <Footer />
    </>
  )
}

export default HomePage

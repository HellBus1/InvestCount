import BudgetPlannerSection from '@/components/BudgetPlannerSection/BudgetPlannerSection'
import DepositRateComparisonSection from '@/components/DepositRateComparisonSection/DepositRateComparisonSection'
import DepositSection from '@/components/DepositSection/DepositSection'
import Footer from '@/components/Footer/Footer'
import Hero from '@/components/Hero/Hero'
import LPSSection from '@/components/LPSSection/LPSSection'
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

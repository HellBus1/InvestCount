import DepositSection from '@/components/DepositSection/DepositSection'
import Footer from '@/components/Footer/Footer'
import Hero from '@/components/Hero/Hero'
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
      <Footer />
    </>
  )
}

export default HomePage

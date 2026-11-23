import {
  calculateBudgetCoverage,
  getEligibleBanksForDeposit,
  getFriendlyBankDisplay
} from '../../src/services/budgetPlannerServices'
import { Bank } from '../../src/pages/HomePage/components/DepositRateComparisonSection/depositRateComparisonProps'

const SAMPLE_BANKS: Bank[] = [
  {
    bankName: 'Deposito Berjangka by BCA',
    category: 'konvensional',
    logoUrl: '/assets/banks/bca.svg',
    website: 'https://www.bca.co.id/id/Individu/produk/simpanan/Deposito-Berjangka',
    minBalance: 8_000_000,
    rates: { '1': 2.75, '3': 2.75, '6': 3.0, '12': 2.5 }
  },
  {
    bankName: 'Deposito Berjangka by BCA',
    category: 'konvensional',
    logoUrl: '/assets/banks/bca.svg',
    website: 'https://www.bca.co.id/id/Individu/produk/simpanan/Deposito-Berjangka',
    minBalance: 2_000_000_000,
    rates: { '1': 3.1, '3': 3.1, '6': 3.1, '12': 2.5 }
  },
  {
    bankName: 'Deposito Supra by BPR Supra',
    category: 'bpr',
    logoUrl: '/assets/banks/bpr-supra.svg',
    website: 'https://bprsupra.com/',
    minBalance: 1_000_000,
    rates: { '1': 5.75, '3': 6.0, '6': 6.25, '12': 6.25 }
  },
  {
    bankName: 'Krom by Krom Bank',
    category: 'digital',
    logoUrl: '/assets/banks/krom.svg',
    website: 'https://krom.id/#produk',
    minBalance: 100_000,
    rates: { '1': 6.75, '3': 7.0, '6': 7.0, '12': 7.5 }
  }
]

describe('budgetPlannerServices', () => {
  it('formats conventional, BPR, and digital bank display names cleanly without undefined', () => {
    expect(getFriendlyBankDisplay('Deposito Berjangka by BCA', 'konvensional')).toBe('BCA')
    expect(getFriendlyBankDisplay('Deposito Supra by BPR Supra', 'bpr')).toBe('BPR Supra')
    expect(getFriendlyBankDisplay('Krom by Krom Bank', 'digital')).toBe('Krom (Krom Bank)')
  })

  it('selects matching minBalance tier and 1-month rate sorted highest first', () => {
    const options = getEligibleBanksForDeposit(SAMPLE_BANKS, 2_000_000_000)
    expect(options.map((b) => b.displayName)).toEqual(['Krom (Krom Bank)', 'BPR Supra', 'BCA'])
    const bca = options.find((b) => b.displayName === 'BCA')
    expect(bca?.rate).toBe(3.1)
    expect(bca?.lps.isGuaranteed).toBe(true)

    const krom = options.find((b) => b.displayName === 'Krom (Krom Bank)')
    expect(krom?.lps.isGuaranteed).toBe(false)
  })

  it('applies 0% tax for deposits up to Rp7.5 million and 20% tax above Rp7.5 million', () => {
    const lowDepositOptions = getEligibleBanksForDeposit(SAMPLE_BANKS, 5_000_000)
    const bprLow = lowDepositOptions.find((b) => b.displayName === 'BPR Supra') || null
    const lowSummary = calculateBudgetCoverage(1_000_000, 5_000_000, bprLow)
    expect(lowSummary?.taxRatePercent).toBe(0)

    const highDepositOptions = getEligibleBanksForDeposit(SAMPLE_BANKS, 150_000_000)
    const bprHigh = highDepositOptions.find((b) => b.displayName === 'BPR Supra') || null
    const highSummary = calculateBudgetCoverage(2_200_000, 150_000_000, bprHigh)
    expect(highSummary?.taxRatePercent).toBe(20)
    expect(highSummary?.monthlyNetInterest).toBeGreaterThan(500_000)
    expect(highSummary?.requiredCapitalForFullCoverage).toBeGreaterThan(150_000_000)
    expect(highSummary?.plainTextSummary).toContain('BPR Supra')
  })
})

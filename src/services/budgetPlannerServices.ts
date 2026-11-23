import { calculateInterest } from './depositServices'
import { getProductName, getRupiahFormat } from './inputServices'
import { Bank } from '../pages/HomePage/components/DepositRateComparisonSection/depositRateComparisonProps'
import {
  BankCategory,
  LpsEvaluation,
  evaluateLpsStatus,
  formatPercentId
} from '../constants/lpsRates'

export const TAX_FREE_THRESHOLD = 7_500_000

export interface EligibleBankOption {
  bankName: string
  displayName: string
  category: BankCategory
  logoUrl: string
  website: string
  rate: number
  minimumDeposit: number
  lps: LpsEvaluation
}

export interface BudgetCalculationSummary {
  totalNeeds: number
  totalDeposits: number
  selectedBank: EligibleBankOption
  taxRatePercent: number
  monthlyNetInterest: number
  coveragePercent: number
  rawCoveragePercent: number
  difference: number
  requiredCapitalForFullCoverage: number
  plainTextSummary: string
}

export const getFriendlyBankDisplay = (bankName: string, category: BankCategory): string => {
  const { bank, productName } = getProductName(bankName)
  if (category === 'bpr' || category === 'konvensional') {
    return productName
  }
  return bank === productName ? bank : `${bank} (${productName})`
}

export const getEligibleBanksForDeposit = (
  banks: Bank[],
  totalDeposits: number
): EligibleBankOption[] => {
  if (!Number.isFinite(totalDeposits) || totalDeposits <= 0) return []

  const grouped = new Map<string, Bank[]>()
  banks.forEach((bank) => {
    if (totalDeposits < bank.minBalance) return
    const existing = grouped.get(bank.bankName) || []
    existing.push(bank)
    grouped.set(bank.bankName, existing)
  })

  const options: EligibleBankOption[] = []
  grouped.forEach((tiers) => {
    const sorted = tiers.sort((a, b) => a.minBalance - b.minBalance)
    const bestTier = sorted[sorted.length - 1]
    const monthlyRate = bestTier.rates['1']

    options.push({
      bankName: bestTier.bankName,
      displayName: getFriendlyBankDisplay(bestTier.bankName, bestTier.category),
      category: bestTier.category,
      logoUrl: bestTier.logoUrl,
      website: bestTier.website,
      rate: monthlyRate,
      minimumDeposit: bestTier.minBalance,
      lps: evaluateLpsStatus(monthlyRate, bestTier.category, totalDeposits)
    })
  })

  return options.sort((a, b) => b.rate - a.rate)
}

const getDaysInYear = (year = new Date().getFullYear()): number => {
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  return isLeap ? 366 : 365
}

export const calculateBudgetCoverage = (
  totalNeeds: number,
  totalDeposits: number,
  selectedBank: EligibleBankOption | null
): BudgetCalculationSummary | null => {
  if (!selectedBank || totalDeposits <= 0 || totalNeeds <= 0) {
    return null
  }

  const taxRatePercent = totalDeposits > TAX_FREE_THRESHOLD ? 20 : 0
  const monthlyNetInterest = parseFloat(
    calculateInterest(
      totalDeposits.toString(),
      taxRatePercent.toString(),
      selectedBank.rate.toString(),
      '1'
    )
  )

  const rawCoveragePercent = (monthlyNetInterest / totalNeeds) * 100
  const coveragePercent = Math.min(100, Math.round(rawCoveragePercent))
  const difference = monthlyNetInterest - totalNeeds

  const daysInYear = getDaysInYear()
  const netMonthlyFactor = (selectedBank.rate / 100) * (30 / daysInYear) * (1 - 0.2)
  const requiredCapitalForFullCoverage =
    netMonthlyFactor > 0 ? Math.ceil(totalNeeds / netMonthlyFactor) : 0

  const lpsStatusLine = selectedBank.lps.isGuaranteed
    ? 'Dijamin LPS'
    : `Tidak Dijamin LPS (${selectedBank.lps.reason || 'Melebihi ketentuan LPS'})`

  const statusSummary =
    difference >= 0
      ? `Surplus ${getRupiahFormat(difference)} per bulan setelah seluruh pengeluaran tertutup.`
      : `Masih kurang ${getRupiahFormat(Math.abs(difference))} per bulan (estimasi modal penuh sekitar ${getRupiahFormat(requiredCapitalForFullCoverage)}).`

  const plainTextSummary = [
    'Ringkasan Rencana Anggaran Deposito - InvestCount',
    `1. Modal Deposito: ${getRupiahFormat(totalDeposits)}`,
    `2. Total Pengeluaran Bulanan: ${getRupiahFormat(totalNeeds)}`,
    `3. Bank / BPR Pilihan: ${selectedBank.displayName} (${formatPercentId(selectedBank.rate)}% p.a. tenor 1 bln • ${lpsStatusLine})`,
    `4. Estimasi Bunga Bersih/Bulan (PPh ${taxRatePercent}%): ${getRupiahFormat(monthlyNetInterest)} (${Math.round(rawCoveragePercent)}% dari pengeluaran)`,
    `5. Kesimpulan: ${statusSummary}`
  ].join('\n')

  return {
    totalNeeds,
    totalDeposits,
    selectedBank,
    taxRatePercent,
    monthlyNetInterest,
    coveragePercent,
    rawCoveragePercent,
    difference,
    requiredCapitalForFullCoverage,
    plainTextSummary
  }
}

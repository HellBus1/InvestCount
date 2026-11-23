export type BankCategory = 'digital' | 'konvensional' | 'bpr'
export type BankCategoryFilter = 'all' | BankCategory

export const LPS_RATES = {
  bankUmumIdr: 3.75,
  bprIdr: 6.25,
  bankUmumValas: 2.0,
  maxGuaranteedBalance: 2_000_000_000,
  effectivePeriod: '1 Oktober 2026 – 31 Januari 2027',
  dataUpdatedIso: '2026-11-23',
  dataUpdatedLabel: '23 November 2026',
  sourceUrl: 'https://www.lps.go.id'
} as const

export const BANK_CATEGORY_LABELS: Record<BankCategoryFilter, string> = {
  all: 'Semua',
  digital: 'Bank Digital',
  konvensional: 'Bank Konvensional',
  bpr: 'BPR'
}

export interface LpsEvaluation {
  isGuaranteed: boolean
  threshold: number
  exceedsRate: boolean
  exceedsBalance: boolean
  reason: string | null
  shortReason: string | null
}

export const formatPercentId = (value: number): string => {
  return value.toLocaleString('id-ID', {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  })
}

export const getLpsThresholdForCategory = (category: BankCategory): number => {
  return category === 'bpr' ? LPS_RATES.bprIdr : LPS_RATES.bankUmumIdr
}

export const evaluateLpsStatus = (
  rate: number,
  category: BankCategory,
  balance = 0
): LpsEvaluation => {
  const threshold = getLpsThresholdForCategory(category)
  const exceedsRate = rate > threshold
  const exceedsBalance = balance > LPS_RATES.maxGuaranteedBalance
  const isGuaranteed = !exceedsRate && !exceedsBalance
  const thresholdLabel = `${formatPercentId(threshold)}%`

  let reason: string | null = null
  let shortReason: string | null = null

  if (exceedsRate && exceedsBalance) {
    reason = `Bunga melebihi TBP LPS ${thresholdLabel} dan saldo di atas Rp2 Miliar`
    shortReason = `> ${thresholdLabel} & > Rp2 M`
  } else if (exceedsRate) {
    reason = `Bunga melebihi batas TBP LPS ${category === 'bpr' ? 'BPR' : 'Bank Umum'} (${thresholdLabel})`
    shortReason = `> TBP ${thresholdLabel}`
  } else if (exceedsBalance) {
    reason = 'Saldo melebihi plafon penjaminan LPS Rp2 Miliar per nasabah per bank'
    shortReason = 'Saldo > Rp2 M'
  }

  return {
    isGuaranteed,
    threshold,
    exceedsRate,
    exceedsBalance,
    reason,
    shortReason
  }
}

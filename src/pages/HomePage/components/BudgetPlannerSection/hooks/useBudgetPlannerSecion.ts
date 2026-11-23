import { useState, useMemo, useCallback } from 'react'
import bankDepositoDatas from '../../../../../data/bankDepositos.json'
import { formatNumberWithCommas, parseAmountInputFromCommas } from '@/services/inputServices'
import { Bank } from '../../DepositRateComparisonSection/depositRateComparisonProps'
import {
  BudgetCalculationSummary,
  EligibleBankOption,
  calculateBudgetCoverage,
  getEligibleBanksForDeposit
} from '@/services/budgetPlannerServices'

export type { BudgetCalculationSummary, EligibleBankOption }

export interface Need {
  id: string
  need: string
  price: number
}

export interface BudgetPreset {
  id: string
  label: string
  description: string
  depositAmount: number
  preferredBankName: string
  needs: Array<{ need: string; price: number }>
}

export interface QuickExpenseItem {
  need: string
  price: number
}

export const QUICK_ADD_EXPENSES: QuickExpenseItem[] = [
  { need: 'Listrik & Air', price: 350_000 },
  { need: 'Internet / WiFi', price: 350_000 },
  { need: 'Kos / Kontrakan', price: 1_500_000 },
  { need: 'Belanja Bulanan', price: 2_000_000 },
  { need: 'Langganan Digital', price: 150_000 }
]

export const BUDGET_PRESETS: BudgetPreset[] = [
  {
    id: 'anak-kos',
    label: 'Anak Kos',
    description: 'Pengeluaran Rp2,2 jt/bln • Modal Rp150 jt',
    depositAmount: 150_000_000,
    preferredBankName: 'Deposito Supra by BPR Supra',
    needs: [
      { need: 'Kos Bulanan', price: 1_500_000 },
      { need: 'Internet / WiFi', price: 300_000 },
      { need: 'Listrik & Air', price: 250_000 },
      { need: 'Langganan Digital', price: 150_000 }
    ]
  },
  {
    id: 'keluarga-muda',
    label: 'Keluarga Muda',
    description: 'Pengeluaran Rp4,5 jt/bln • Modal Rp300 jt',
    depositAmount: 300_000_000,
    preferredBankName: 'Deposito Universal by Universal BPR',
    needs: [
      { need: 'Belanja Dapur & Rumah', price: 2_500_000 },
      { need: 'Transportasi', price: 800_000 },
      { need: 'Listrik & Air', price: 750_000 },
      { need: 'Internet Rumah', price: 450_000 }
    ]
  },
  {
    id: 'dana-pensiun',
    label: 'Dana Pensiun',
    description: 'Pengeluaran Rp6 jt/bln • Modal Rp1,65 M',
    depositAmount: 1_650_000_000,
    preferredBankName: 'Deposito Supra by BPR Supra',
    needs: [
      { need: 'Kebutuhan Harian', price: 3_500_000 },
      { need: 'Kesehatan & Asuransi', price: 1_500_000 },
      { need: 'Utilitas Rumah', price: 1_000_000 }
    ]
  }
]

const buildNeedsFromPreset = (preset: BudgetPreset): Need[] =>
  preset.needs.map((item, idx) => ({
    id: `${preset.id}-${idx}`,
    need: item.need,
    price: item.price
  }))

const useBudgetPlannerSection = () => {
  const defaultPreset = BUDGET_PRESETS[0]
  const [activePresetId, setActivePresetId] = useState<string | null>(defaultPreset.id)
  const [needs, setNeeds] = useState<Need[]>(() => buildNeedsFromPreset(defaultPreset))
  const [needInput, setNeedInput] = useState('')
  const [priceInput, setPriceInput] = useState('')
  const [depositInput, setDepositInput] = useState(
    formatNumberWithCommas(defaultPreset.depositAmount.toString())
  )
  const [selectedBankName, setSelectedBankName] = useState<string>(defaultPreset.preferredBankName)

  const typedBanks = bankDepositoDatas as Bank[]

  const totalDeposits = useMemo(() => {
    const parsed = Number(parseAmountInputFromCommas(depositInput))
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
  }, [depositInput])

  const totalNeeds = useMemo(() => {
    return needs.reduce((sum, item) => sum + item.price, 0)
  }, [needs])

  const filteredBanks = useMemo(
    () => getEligibleBanksForDeposit(typedBanks, totalDeposits),
    [typedBanks, totalDeposits]
  )

  const activeBank: EligibleBankOption | null = useMemo(() => {
    if (filteredBanks.length === 0) return null
    return filteredBanks.find((bank) => bank.bankName === selectedBankName) || filteredBanks[0]
  }, [filteredBanks, selectedBankName])

  const summary = useMemo(
    () => calculateBudgetCoverage(totalNeeds, totalDeposits, activeBank),
    [totalNeeds, totalDeposits, activeBank]
  )

  const handleAddNeed = useCallback((need: string, price: string) => {
    const numericPrice = Number(price)
    if (!need.trim() || !Number.isFinite(numericPrice) || numericPrice <= 0) return

    setNeeds((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        need: need.trim(),
        price: numericPrice
      }
    ])
    setNeedInput('')
    setPriceInput('')
    setActivePresetId(null)
  }, [])

  const handleQuickAddNeed = useCallback((item: QuickExpenseItem) => {
    setNeeds((prev) => [
      ...prev,
      {
        id: `quick-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        need: item.need,
        price: item.price
      }
    ])
    setActivePresetId(null)
  }, [])

  const handleRemoveNeed = useCallback((id: string) => {
    setNeeds((prev) => prev.filter((item) => item.id !== id))
    setActivePresetId(null)
  }, [])

  const handleApplyPreset = useCallback((preset: BudgetPreset) => {
    setActivePresetId(preset.id)
    setNeeds(buildNeedsFromPreset(preset))
    setDepositInput(formatNumberWithCommas(preset.depositAmount.toString()))
    setSelectedBankName(preset.preferredBankName)
    setNeedInput('')
    setPriceInput('')
  }, [])

  const handleReset = useCallback(() => {
    setActivePresetId(null)
    setNeeds([])
    setDepositInput('')
    setNeedInput('')
    setPriceInput('')
  }, [])

  const handleBankSelection = useCallback((bankName: string) => {
    setSelectedBankName(bankName)
  }, [])

  return {
    activePresetId,
    needs,
    totalNeeds,
    needInput,
    priceInput,
    depositInput,
    totalDeposits,
    filteredBanks,
    activeBank,
    summary,
    setNeedInput,
    setPriceInput,
    setDepositInput,
    handleAddNeed,
    handleQuickAddNeed,
    handleRemoveNeed,
    handleApplyPreset,
    handleReset,
    handleBankSelection
  }
}

export default useBudgetPlannerSection

import { calculateInterest } from '@/services/depositServices'
import { useState, useMemo, useEffect } from 'react'
import bankDepositoDatas from '../../../data/bankDepositos.json'
import { parseAmountInputFromCommas } from '@/services/inputServices'

interface Need {
  need: string
  price: string
}

const useBudgetPlannerSection = () => {
  const [recommendation, setRecommendation] = useState<string | null>(null)
  const [needs, setNeeds] = useState<Need[]>([])
  const [needInput, setNeedInput] = useState('')
  const [priceInput, setPriceInput] = useState('')
  const [depositInput, setDepositInput] = useState('')

  useEffect(() => {
    setRecommendation(null)
  }, [needs, depositInput])

  const handleAddNeed = (need: string, price: string) => {
    if (need && price) {
      setNeeds([...needs, { need: need, price: price }])
      setNeedInput('')
      setPriceInput('')
    }
  }

  const handleRemoveNeed = (index: number) => {
    const updatedNeeds = [...needs]
    updatedNeeds.splice(index, 1)
    setNeeds(updatedNeeds)
  }

  const calculateTotalNeeds = () => {
    return needs.reduce((total, item) => total + Number(item.price), 0)
  }

  const handleBankSelection = (bankName: string) => {
    const totalNeeds = calculateTotalNeeds()
    const totalDeposits = Number(parseAmountInputFromCommas(depositInput))

    if (totalDeposits === 0 || isNaN(totalDeposits)) {
      setRecommendation('Please enter a valid deposit amount to get recommendations.')
      return
    }

    const selectedBankData = bankDepositoDatas.find((bank) => bank.bankName === bankName)
    if (!selectedBankData) {
      setRecommendation('Please select a valid bank to calculate the deposit return.')
      return
    }

    const applicableRate = Object.entries(selectedBankData.rates).reduce(
      (bestRate, [amount, rate]) => {
        return totalDeposits >= Number(amount) ? Math.max(bestRate, rate) : bestRate
      },
      0
    )

    const monthlyReturn = parseFloat(
      calculateInterest(
        parseAmountInputFromCommas(depositInput),
        '20',
        applicableRate.toString(),
        '1'
      )
    )
    const remainingNeeds = totalNeeds - monthlyReturn

    let recommendationMessage = `1. Your total deposits is ${totalDeposits.toLocaleString()} IDR\n`
    recommendationMessage += `2. Your total needs is ${totalNeeds.toLocaleString()} IDR\n`
    recommendationMessage += `3. Monthly return from ${selectedBankData.bankName}: ${monthlyReturn.toLocaleString()} IDR.\n`

    if (remainingNeeds > 0) {
      recommendationMessage += `4. You still need ${remainingNeeds.toLocaleString()} IDR to cover your needs.`
    } else {
      recommendationMessage += `5. You have ${Math.abs(remainingNeeds).toLocaleString()} IDR remaining.`
    }

    setRecommendation(recommendationMessage)
  }

  const filteredBanks = useMemo(() => {
    const totalDeposits = Number(parseAmountInputFromCommas(depositInput))

    if (isNaN(totalDeposits) || totalDeposits === 0) {
      return []
    }

    // Filter banks based on the minimum deposit amount and pick the most applicable 1-month rate
    return bankDepositoDatas
      .filter((bank) => totalDeposits >= bank.minBalance) // Only include banks where the deposit meets the minimum balance
      .reduce(
        (
          uniqueBanks: {
            bankName: string
            logoUrl: string
            website: string
            rate: number
            minimumDeposit: number
          }[],
          currentBank
        ) => {
          // Check if the bank is already in the uniqueBanks list
          const existingBank = uniqueBanks.find((bank) => bank.bankName === currentBank.bankName)

          if (!existingBank) {
            // Add the bank if it's not already in the list
            uniqueBanks.push({
              bankName: currentBank.bankName,
              logoUrl: currentBank.logoUrl,
              website: currentBank.website,
              rate: currentBank.rates['1'], // Only pick the 1-month rate
              minimumDeposit: currentBank.minBalance
            })
          } else if (currentBank.minBalance > existingBank.minimumDeposit) {
            // Replace the bank if the current one has a higher minimum deposit that the deposit satisfies
            existingBank.rate = currentBank.rates['1']
            existingBank.minimumDeposit = currentBank.minBalance
          }

          return uniqueBanks
        },
        []
      )
  }, [depositInput])

  return {
    needs,
    needInput,
    priceInput,
    depositInput,
    recommendation,
    filteredBanks,
    setNeedInput,
    setPriceInput,
    setDepositInput,
    handleAddNeed,
    handleRemoveNeed,
    handleBankSelection
  }
}

export default useBudgetPlannerSection

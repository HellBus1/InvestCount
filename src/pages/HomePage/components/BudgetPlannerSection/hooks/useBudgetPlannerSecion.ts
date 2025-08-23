import { calculateInterest } from '@/services/depositServices'
import { useState, useMemo, useEffect } from 'react'
import bankDepositoDatas from '../../../../../data/bankDepositos.json'
import { getRupiahFormat, parseAmountInputFromCommas } from '@/services/inputServices'

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
      setRecommendation('Mohon masukkan jumlah deposit yang valid.')
      return
    }

    const selectedBankData = bankDepositoDatas.find((bank) => bank.bankName === bankName)
    if (!selectedBankData) {
      setRecommendation('Pilih bank yang valid untuk deposit.')
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

    let recommendationMessage = `1. Total deposit kamu ${getRupiahFormat(totalDeposits)}\n`
    recommendationMessage += `2. Kebutuhan kamu ${getRupiahFormat(totalNeeds)}\n`
    recommendationMessage += `3. Bunga yang kamu dapat dalam sebulan dari ${selectedBankData.bankName.split('by')[1]}: ${getRupiahFormat(monthlyReturn)}\n`

    if (remainingNeeds > 0) {
      recommendationMessage += `4. Kamu masih membutuhkan ${getRupiahFormat(remainingNeeds)} untuk memenuhi kebutuhanmu.`
    } else {
      recommendationMessage += `5. Kamu memiliki sisa ${getRupiahFormat(Math.abs(remainingNeeds))}.`
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

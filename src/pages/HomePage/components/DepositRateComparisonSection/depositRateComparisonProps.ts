import { YAxisProps } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { TooltipProps } from 'recharts/types/component/Tooltip'
import { BankCategory, LpsEvaluation } from '@/constants/lpsRates'

interface Bank {
  bankName: string
  category: BankCategory
  logoUrl: string
  website: string
  minBalance: number
  rates: { [key: string]: number }
}

interface FilteredBank {
  bank: string
  bankName: string
  displayName: string
  category: BankCategory
  interest: number
  logo: string
  website: string
  minBalance: number
  lps: LpsEvaluation
}

interface CustomYAxisProps extends YAxisProps {
  payload: {
    coordinate: number
    index: number
    isShow: boolean
    offset: number
    tickCoord: number
    value: string
  }
  x: number
  y: number
}

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  active?: boolean
  payload?: Array<{
    payload: FilteredBank
  }>
}

export type { Bank, FilteredBank, CustomYAxisProps, CustomTooltipProps }

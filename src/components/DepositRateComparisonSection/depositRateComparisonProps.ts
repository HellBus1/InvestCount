import { YAxisProps } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { TooltipProps } from 'recharts/types/component/Tooltip'

interface Bank {
  bankName: string
  logoUrl: string
  website: string
  minBalance: number
  rates: { [key: string]: number }
}

interface FilteredBank {
  bank: string
  interest: number
  logo: string
  website: string
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

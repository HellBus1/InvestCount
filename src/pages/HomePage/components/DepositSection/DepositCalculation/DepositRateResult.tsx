import { getRupiahFormat } from '@/services/inputServices'

interface DepositRateResultProps {
  interest: number
  month: number
}

const DepositRateResult = (props: DepositRateResultProps) => {
  return (
    <div className='mt-12 md:mt-0'>
      <div className='text-charter-blue-600 font-bold text-base md:text-lg mb-2'>
        Estimasi Keuntungan Deposito Anda:{' '}
        <span className='text-jess'>{getRupiahFormat(props.interest)}</span> untuk {props.month}{' '}
        bulan
      </div>
      <div className='text-charter-blue-600 text-xs md:text-sm mb-4'>
        *Simulasi dihitung otomatis dengan bunga tahunan dan potongan pajak deposito.
      </div>
    </div>
  )
}

export default DepositRateResult

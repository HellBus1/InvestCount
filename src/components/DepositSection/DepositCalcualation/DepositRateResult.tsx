interface DepositRateResultProps {
  interest: number
  month: number
  tax: number
}

const DepositRateResult = (props: DepositRateResultProps) => {
  const getRupiahFormat = (interest: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(interest)
  }

  return (
    <div>
      <div className='text-charter-blue-600 font-bold text-lg mb-2'>
        Estimated earnings on your deposit:{' '}
        <span className='text-jess'>{getRupiahFormat(props.interest)}</span> for {props.month}{' '}
        months
      </div>
      <div className='text-charter-blue-600 font-bold text-xs'>
        *Calculated with an interest rate of {props.interest ? props.tax : 0}% p.a., net of tax.
      </div>
    </div>
  )
}

export default DepositRateResult

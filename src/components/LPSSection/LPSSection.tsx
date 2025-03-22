const LPSSection = () => {
  const rates = [
    {
      rate: '4.25%',
      label: 'Bank Umum (IDR)'
    },
    {
      rate: '6.75%',
      label: 'BPR'
    },
    {
      rate: '2.25%',
      label: 'Bank Umum (Valas)'
    }
  ]

  return (
    <div className='py-10 w-full mb-10'>
      <h2 className='text-center text-2xl md:text-3xl font-bold text-charter-blue-600 mt-8 mb-4'>
        LPS Protection
      </h2>
      <p className='text-center text-charter-blue text-lg md:text-xl mx-4 md:mx-20 lg:mx-36 mb-16'>
        The maximum deposit amount that will be protected is IDR 2 billion per depositor per bank.
      </p>
      <div className='flex flex-col md:flex-row justify-center items-center gap-6'>
        {rates.map((item, index) => (
          <div
            key={index}
            className='border rounded-lg p-6 w-64 text-center shadow-md border-charter-blue bg-white'
          >
            <div className='text-3xl font-bold text-charter-blue'>{item.rate}</div>
            <div className='mt-2 text-sm text-charter-blue-400'>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LPSSection

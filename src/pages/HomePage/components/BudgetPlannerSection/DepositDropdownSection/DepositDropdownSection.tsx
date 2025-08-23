import { getImagePath, getProductName } from '@/services/inputServices'

interface FilteredBank {
  bankName: string
  logoUrl: string
  website: string
  rate: number
  minimumDeposit: number
}

interface DepositDropdownSectionProps {
  filteredBanks: FilteredBank[]
  handleBankSelection: (bankName: string) => void
}

const DepositDropdownSection = (props: DepositDropdownSectionProps) => {
  const { filteredBanks, handleBankSelection } = props

  const renderBankNameAndRate = (filteredBank: FilteredBank) => {
    const { productName } = getProductName(filteredBank.bankName)
    return productName
  }

  return (
    <div className='mt-4'>
      <h3 className='text-lg font-semibold text-charter-blue-600 mb-2'>Pilih Bank untuk Deposit</h3>
      <div className='dropdown'>
        <div tabIndex={0} role='button' className='btn btn-primary text-[#ffffff]'>
          Pilih Bank
        </div>
        <div
          tabIndex={0}
          className='dropdown-content card bg-base-100 z-10 shadow-md mt-2 w-96 max-h-64 overflow-y-auto'
        >
          <div className='card-body'>
            {filteredBanks.map((bank, index) => (
              <div
                key={index}
                onClick={() => handleBankSelection(bank.bankName)}
                className='flex items-center gap-4 p-2 hover:bg-gray-100 rounded cursor-pointer'
              >
                <img
                  src={getImagePath(bank.logoUrl)}
                  alt={`${bank.bankName} logo`}
                  className='w-8 h-8 object-contain'
                />
                <span className='text-sm font-medium'>
                  {renderBankNameAndRate(bank)} ({bank.rate}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepositDropdownSection

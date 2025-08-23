import { DepositType } from '@/constants/DepositType'

interface DepositTypeSelectorProps {
  selectedOption: string
  setSelectedOption: (option: string) => void
}

const DepositTypeSelector = (props: DepositTypeSelectorProps) => {
  const { selectedOption, setSelectedOption } = props

  return (
    <div className='mt-8'>
      <div role='tablist' className='tabs tabs-lifted'>
        <button
          role='tab'
          className={`tab ${selectedOption === DepositType.NONARO ? 'tab-active' : ''} font-bold text-charter-blue`}
          onClick={() => setSelectedOption(DepositType.NONARO)}
        >
          {DepositType.NONARO}
        </button>
        <button
          role='tab'
          className={`tab ${selectedOption === DepositType.ARO ? 'tab-active' : ''} font-bold text-charter-blue`}
          onClick={() => setSelectedOption(DepositType.ARO)}
        >
          {DepositType.ARO}
        </button>
        <button
          role='tab'
          className={`tab ${selectedOption === DepositType.AROPLUS ? 'tab-active' : ''} font-bold text-charter-blue`}
          onClick={() => setSelectedOption(DepositType.AROPLUS)}
        >
          {DepositType.AROPLUS}
        </button>
      </div>

      <div className='p-4 md:p-10'>
        {selectedOption === DepositType.NONARO && (
          <p className='text-base md:text-lg text-charter-blue'>
            <strong>Tanpa Perpanjangan Otomatis</strong> Bunga deposito dibayarkan langsung ke
            rekening Anda.
            <br />
            <br />
            Contoh: Rp10.000.000 dengan bunga 5% setahun menghasilkan Rp500.000 (sebelum pajak).
          </p>
        )}
        {selectedOption === DepositType.ARO && (
          <p className='text-base md:text-lg text-charter-blue'>
            <strong>Perpanjangan Otomatis</strong> Bunga deposito ditambahkan ke saldo pokok, lalu
            diperpanjang otomatis di periode berikutnya.
            <br />
            <br />
            Contoh: Rp10.000.000 dengan bunga 5% menambah Rp500.000 ke saldo Anda.
          </p>
        )}
        {selectedOption === DepositType.AROPLUS && (
          <p className='text-base md:text-lg text-charter-blue'>
            <strong>Bunga Berbunga / Compounding</strong> Nikmati keuntungan bunga berbunga karena
            pokok + bunga terus diperpanjang
            <br />
            <br />
            Contoh: Rp10.000.000 dengan bunga 5% tumbuh jadi Rp10.500.000, lalu terus menghasilkan
            bunga di periode berikutnya.
          </p>
        )}
      </div>
    </div>
  )
}

export default DepositTypeSelector

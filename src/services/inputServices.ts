const formatNumberWithCommas = (value: string) => {
  const EMPTY_STRING = ''
  if (value === EMPTY_STRING) return value
  const numericValue = value.replace(/,/g, '')
  if (isNaN(Number(numericValue))) return value
  return parseFloat(numericValue).toLocaleString('en-US')
}

const getImagePath = (basePath: string) => {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}${basePath}`
  }
  return basePath
}

const parseAmountInputFromCommas = (amount: string) => {
  return amount.replace(/,/g, '')
}

const getProductName = (bankNameAndProduct: string) => {
  const splittedBankName = bankNameAndProduct.split('by')
  const bank = splittedBankName[0].trim()
  const productName = splittedBankName[splittedBankName.length - 1].trim()
  return { bank, productName }
}

const getRupiahFormat = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount)
}

export {
  formatNumberWithCommas,
  getImagePath,
  parseAmountInputFromCommas,
  getProductName,
  getRupiahFormat
}

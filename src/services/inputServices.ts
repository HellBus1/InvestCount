const formatNumberWithCommas = (value: string) => {
  const EMPTY_STRING = ''
  if (value === EMPTY_STRING) return value
  const numericValue = value.replace(/,/g, '')
  if (isNaN(Number(numericValue))) return value
  return parseFloat(numericValue).toLocaleString('en-US')
}

const getImagePath = (basePath: string) => {
  if (!basePath) return basePath
  if (basePath.startsWith('http') || basePath.startsWith('/')) {
    return basePath
  }
  return `/${basePath}`
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
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export {
  formatNumberWithCommas,
  getImagePath,
  parseAmountInputFromCommas,
  getProductName,
  getRupiahFormat
}

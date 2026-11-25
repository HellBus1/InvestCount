import {
  BANK_CALCULATOR_PAGES,
  computeNetReturnPreview,
  getBankCalculatorPage,
  getTiersForBankPage
} from '../../src/data/bankCalculatorPages'
import { normalizeCanonicalUrl } from '../../src/hooks/useSEO'

describe('SEO & Programmatic Bank Pages', () => {
  test('normalizes canonical URLs with trailing slash while preserving root', () => {
    expect(normalizeCanonicalUrl('/')).toBe('https://investtcount.mattrmost.com/')
    expect(normalizeCanonicalUrl('/tentang')).toBe('https://investtcount.mattrmost.com/tentang/')
    expect(normalizeCanonicalUrl('/blog/deposito-aro-vs-non-aro')).toBe(
      'https://investtcount.mattrmost.com/blog/deposito-aro-vs-non-aro/'
    )
    expect(normalizeCanonicalUrl('/kalkulator-deposito/bca/')).toBe(
      'https://investtcount.mattrmost.com/kalkulator-deposito/bca/'
    )
  })

  test('all 12 programmatic bank pages have valid metadata lengths and audited tiers', () => {
    expect(BANK_CALCULATOR_PAGES).toHaveLength(12)

    for (const page of BANK_CALCULATOR_PAGES) {
      expect(page.title.length).toBeLessThanOrEqual(60)
      expect(page.metaDescription.length).toBeLessThanOrEqual(156)
      expect(page.faqs.length).toBeGreaterThanOrEqual(3)

      const tiers = getTiersForBankPage(page)
      expect(tiers.length).toBeGreaterThan(0)
      expect(getBankCalculatorPage(page.slug)?.slug).toBe(page.slug)
    }
  })

  test('computes 0% PPh Final up to Rp7.500.000 and 20% above', () => {
    const exempt = computeNetReturnPreview(5_000_000, 6, 1)
    expect(exempt.taxRatePercent).toBe(0)
    expect(exempt.tax).toBe(0)
    expect(exempt.net).toBeCloseTo(exempt.gross, 2)

    const taxed = computeNetReturnPreview(100_000_000, 6, 1)
    expect(taxed.taxRatePercent).toBe(20)
    expect(taxed.net).toBeCloseTo(taxed.gross * 0.8, 2)
  })
})

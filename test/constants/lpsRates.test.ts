import { evaluateLpsStatus, LPS_RATES } from '../../src/constants/lpsRates'

describe('lpsRates', () => {
  it('marks conventional bank at or below 3.75% as guaranteed', () => {
    const result = evaluateLpsStatus(3.75, 'konvensional', 100_000_000)
    expect(result.isGuaranteed).toBe(true)
    expect(result.threshold).toBe(LPS_RATES.bankUmumIdr)
    expect(result.reason).toBeNull()
  })

  it('flags digital bank above 3.75% as not guaranteed by LPS', () => {
    const result = evaluateLpsStatus(6.0, 'digital', 100_000_000)
    expect(result.isGuaranteed).toBe(false)
    expect(result.exceedsRate).toBe(true)
    expect(result.exceedsBalance).toBe(false)
    expect(result.shortReason).toContain('3,75%')
  })

  it('allows BPR up to 6.25% as guaranteed by LPS', () => {
    const result = evaluateLpsStatus(6.25, 'bpr', 500_000_000)
    expect(result.isGuaranteed).toBe(true)
    expect(result.threshold).toBe(LPS_RATES.bprIdr)
  })

  it('flags balance above Rp2 billion even when interest rate is within LPS limit', () => {
    const result = evaluateLpsStatus(3.0, 'konvensional', 5_000_000_000)
    expect(result.isGuaranteed).toBe(false)
    expect(result.exceedsBalance).toBe(true)
    expect(result.shortReason).toBe('Saldo > Rp2 M')
  })
})

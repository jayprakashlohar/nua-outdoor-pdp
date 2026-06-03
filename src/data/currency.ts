/** Fake Store API prices are USD — display as INR for this storefront. */
export const USD_TO_INR = 83

export function usdToInr(usd: number): number {
  return Math.round(usd * USD_TO_INR)
}

export function formatInr(usdAmount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(usdToInr(usdAmount))
}

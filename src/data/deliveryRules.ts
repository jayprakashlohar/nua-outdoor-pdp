export type DeliveryEstimateContext = {
  variantSelected: boolean
  variantInStock: boolean
}

export function shouldShowDeliveryEstimate({
  variantSelected,
  variantInStock,
}: DeliveryEstimateContext): boolean {
  return variantSelected && variantInStock
}

export const DELIVERY_ESTIMATE_TEXT =
  'Estimated delivery: 3–5 business days'

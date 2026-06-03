/**
 * When to show the delivery estimate line (below Add to Cart).
 * Tune when product/variant logic exists (Step 8+).
 */
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

/** Placeholder copy until real estimates are wired. */
export const DELIVERY_ESTIMATE_TEXT =
  'Estimated delivery: 3–5 business days'

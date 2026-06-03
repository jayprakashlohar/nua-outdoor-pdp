/** Fake Store API — https://fakestoreapi.com */

export const FAKE_STORE_API_BASE_URL = 'https://fakestoreapi.com'

export const API_ENDPOINTS = {
  products: `${FAKE_STORE_API_BASE_URL}/products`,
  productById: (id: number) => `${FAKE_STORE_API_BASE_URL}/products/${id}`,
} as const

/** Default product for the PDP until routing is added (Step 10). */
export const DEFAULT_PRODUCT_ID = 1

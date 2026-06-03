import { QUANTITY_MIN, STORAGE_KEYS } from '../data/constants'
import type { CartItem } from '../data/types'
import { clampLineQuantity, resolveLineMaxStock } from './cartUtils'

function normalizeCartItem(raw: unknown): CartItem | null {
  if (!raw || typeof raw !== 'object') return null
  const item = raw as CartItem
  if (
    typeof item.lineKey !== 'string' ||
    typeof item.productId !== 'number' ||
    typeof item.colorId !== 'string' ||
    typeof item.sizeId !== 'string' ||
    typeof item.title !== 'string' ||
    typeof item.price !== 'number'
  ) {
    return null
  }

  const quantity = Math.max(QUANTITY_MIN, Number(item.quantity) || QUANTITY_MIN)
  const draft = { ...item, quantity }
  const maxStock = resolveLineMaxStock(draft)

  return {
    ...draft,
    maxStock,
    quantity: clampLineQuantity(quantity, maxStock),
  }
}

export function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.cart)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown[]
    if (!Array.isArray(parsed)) return []
    return parsed
      .map(normalizeCartItem)
      .filter((item): item is CartItem => item !== null)
  } catch {
    return []
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items))
}

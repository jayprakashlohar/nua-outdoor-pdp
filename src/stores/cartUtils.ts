import { QUANTITY_MIN } from '../data/constants'
import type { CartItem } from '../data/types'

export function cartLineKey(
  productId: number,
  colorId: string,
  sizeId: string,
): string {
  return `${productId}-${colorId}-${sizeId}`
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function resolveLineMaxStock(item: CartItem): number {
  if (typeof item.maxStock === 'number' && item.maxStock > 0) {
    return item.maxStock
  }
  return Math.max(item.quantity, QUANTITY_MIN)
}

export function clampLineQuantity(quantity: number, maxStock: number): number {
  const cap = Math.max(maxStock, QUANTITY_MIN)
  return Math.min(Math.max(quantity, QUANTITY_MIN), cap)
}

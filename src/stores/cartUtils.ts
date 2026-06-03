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

import { STORAGE_KEYS } from '../data/constants'
import type { CartItem } from '../data/types'

export function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.cart)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items))
}

import { STORAGE_KEYS } from '../data/constants'
import type { WishlistItem } from '../data/types'

function normalizeWishlistItem(raw: unknown): WishlistItem | null {
  if (!raw || typeof raw !== 'object') return null
  const item = raw as WishlistItem
  if (
    typeof item.productId !== 'number' ||
    typeof item.title !== 'string' ||
    typeof item.price !== 'number' ||
    typeof item.image !== 'string'
  ) {
    return null
  }
  return {
    productId: item.productId,
    title: item.title,
    price: item.price,
    image: item.image,
  }
}

export function loadWishlistFromStorage(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.wishlist)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown[]
    if (!Array.isArray(parsed)) return []
    const seen = new Set<number>()
    return parsed
      .map(normalizeWishlistItem)
      .filter((item): item is WishlistItem => {
        if (!item || seen.has(item.productId)) return false
        seen.add(item.productId)
        return true
      })
  } catch {
    return []
  }
}

export function saveWishlistToStorage(items: WishlistItem[]): void {
  localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(items))
}

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { WishlistItem } from '../data/types'
import { loadWishlistFromStorage, saveWishlistToStorage } from './wishlistStorage'

export type WishlistProductInput = {
  productId: number
  title: string
  price: number
  image: string
}

type WishlistContextValue = {
  items: WishlistItem[]
  itemCount: number
  isInWishlist: (productId: number) => boolean
  addToWishlist: (input: WishlistProductInput) => void
  removeFromWishlist: (productId: number) => void
  toggleWishlist: (input: WishlistProductInput) => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => loadWishlistFromStorage())

  useEffect(() => {
    saveWishlistToStorage(items)
  }, [items])

  const itemCount = items.length

  const isInWishlist = useCallback(
    (productId: number) => items.some((item) => item.productId === productId),
    [items],
  )

  const addToWishlist = useCallback((input: WishlistProductInput) => {
    setItems((prev) => {
      if (prev.some((item) => item.productId === input.productId)) return prev
      return [...prev, { ...input }]
    })
  }, [])

  const removeFromWishlist = useCallback((productId: number) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId))
  }, [])

  const toggleWishlist = useCallback((input: WishlistProductInput) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.productId === input.productId)
      if (exists) {
        return prev.filter((item) => item.productId !== input.productId)
      }
      return [...prev, { ...input }]
    })
  }, [])

  const value = useMemo(
    () => ({
      items,
      itemCount,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
    }),
    [
      items,
      itemCount,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
    ],
  )

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return ctx
}

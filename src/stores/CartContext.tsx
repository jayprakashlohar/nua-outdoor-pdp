import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CartItem, PdpProduct } from '../data/types'
import { findVariant } from '../data/productMapper'
import { QUANTITY_MIN } from '../data/constants'
import { cartItemCount, cartLineKey, cartSubtotal } from './cartUtils'
import { loadCartFromStorage, saveCartToStorage } from './cartStorage'

type AddToCartInput = {
  pdp: PdpProduct
  colorId: string
  sizeId: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  total: number
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  addToCart: (input: AddToCartInput) => void
  updateQuantity: (lineKey: string, quantity: number) => void
  removeFromCart: (lineKey: string) => void
  isVariantInCart: (productId: number, colorId: string, sizeId: string) => boolean
  getCartQuantityForVariant: (
    productId: number,
    colorId: string,
    sizeId: string,
  ) => number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage())
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    saveCartToStorage(items)
  }, [items])

  const itemCount = useMemo(() => cartItemCount(items), [items])
  const subtotal = useMemo(() => cartSubtotal(items), [items])
  const total = subtotal

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])
  const toggleDrawer = useCallback(() => setIsDrawerOpen((open) => !open), [])

  const isVariantInCart = useCallback(
    (productId: number, colorId: string, sizeId: string) =>
      items.some(
        (item) =>
          item.productId === productId &&
          item.colorId === colorId &&
          item.sizeId === sizeId,
      ),
    [items],
  )

  const getCartQuantityForVariant = useCallback(
    (productId: number, colorId: string, sizeId: string) => {
      const key = cartLineKey(productId, colorId, sizeId)
      return items.find((item) => item.lineKey === key)?.quantity ?? 0
    },
    [items],
  )

  const addToCart = useCallback(({ pdp, colorId, sizeId, quantity }: AddToCartInput) => {
    const variant = findVariant(pdp, colorId, sizeId)
    if (!variant || variant.stock <= 0) return

    const color = pdp.colors.find((c) => c.id === colorId)
    const size = pdp.sizes.find((s) => s.id === sizeId)
    if (!color || !size) return

    const key = cartLineKey(pdp.id, colorId, sizeId)
    const qty = Math.min(Math.max(quantity, QUANTITY_MIN), variant.stock)

    setItems((prev) => {
      const existing = prev.find((item) => item.lineKey === key)
      if (existing) {
        const nextQty = Math.min(existing.quantity + qty, variant.stock)
        return prev.map((item) =>
          item.lineKey === key ? { ...item, quantity: nextQty, maxStock: variant.stock } : item,
        )
      }

      const line: CartItem = {
        lineKey: key,
        productId: pdp.id,
        colorId,
        colorName: color.name,
        sizeId,
        sizeLabel: size.label,
        title: pdp.title,
        price: pdp.price,
        image: pdp.images[0]?.url ?? '',
        quantity: qty,
        maxStock: variant.stock,
      }
      return [...prev, line]
    })
  }, [])

  const updateQuantity = useCallback((lineKey: string, quantity: number) => {
    setItems((prev) => {
      if (quantity < QUANTITY_MIN) {
        return prev.filter((item) => item.lineKey !== lineKey)
      }
      return prev.map((item) => {
        if (item.lineKey !== lineKey) return item
        const nextQty = Math.min(quantity, item.maxStock)
        return { ...item, quantity: nextQty }
      })
    })
  }, [])

  const removeFromCart = useCallback((lineKey: string) => {
    setItems((prev) => prev.filter((item) => item.lineKey !== lineKey))
  }, [])

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      total,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      addToCart,
      updateQuantity,
      removeFromCart,
      isVariantInCart,
      getCartQuantityForVariant,
    }),
    [
      items,
      itemCount,
      subtotal,
      total,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      addToCart,
      updateQuantity,
      removeFromCart,
      isVariantInCart,
      getCartQuantityForVariant,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider')
  }
  return ctx
}

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { QUANTITY_MIN, URL_PARAMS } from '../data/constants'
import { findVariant, getStockStatus } from '../data/productMapper'
import type { PdpProduct } from '../data/types'
import { useCart } from '../stores/CartContext'

function firstInStockColorId(pdp: PdpProduct): string {
  for (const color of pdp.colors) {
    const hasStock = pdp.sizes.some((size) => {
      const v = findVariant(pdp, color.id, size.id)
      return v && v.stock > 0
    })
    if (hasStock) return color.id
  }
  return pdp.colors[0]?.id ?? ''
}

function firstInStockSizeId(pdp: PdpProduct, colorId: string): string {
  for (const size of pdp.sizes) {
    const v = findVariant(pdp, colorId, size.id)
    if (v && v.stock > 0) return size.id
  }
  return pdp.sizes[0]?.id ?? ''
}

export function useProductVariant(pdp: PdpProduct | null) {
  const { getCartQuantityForVariant } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()
  const [quantity, setQuantity] = useState(QUANTITY_MIN)

  const colorFromUrl = searchParams.get(URL_PARAMS.color)
  const sizeFromUrl = searchParams.get(URL_PARAMS.size)

  const [colorId, setColorId] = useState('')
  const [sizeId, setSizeId] = useState('')

  useEffect(() => {
    if (!pdp) return

    const defaultColor = colorFromUrl && pdp.colors.some((c) => c.id === colorFromUrl)
      ? colorFromUrl
      : firstInStockColorId(pdp)

    const defaultSize =
      sizeFromUrl &&
      pdp.sizes.some((s) => s.id === sizeFromUrl) &&
      findVariant(pdp, defaultColor, sizeFromUrl)?.stock
        ? sizeFromUrl
        : firstInStockSizeId(pdp, defaultColor)

    setColorId(defaultColor)
    setSizeId(defaultSize)
  }, [pdp?.id, pdp?.colors, pdp?.sizes, colorFromUrl, sizeFromUrl])

  const syncUrl = useCallback(
    (nextColor: string, nextSize: string) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev)
          params.set(URL_PARAMS.color, nextColor)
          params.set(URL_PARAMS.size, nextSize)
          return params
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const selectColor = useCallback(
    (nextColorId: string) => {
      if (!pdp) return
      setColorId(nextColorId)
      const nextSize = firstInStockSizeId(pdp, nextColorId)
      setSizeId(nextSize)
      setQuantity(QUANTITY_MIN)
      syncUrl(nextColorId, nextSize)
    },
    [pdp, syncUrl],
  )

  const selectSize = useCallback(
    (nextSizeId: string) => {
      if (!pdp) return
      setSizeId(nextSizeId)
      setQuantity(QUANTITY_MIN)
      setColorId((currentColor) => {
        syncUrl(currentColor, nextSizeId)
        return currentColor
      })
    },
    [pdp, syncUrl],
  )

  const variant = useMemo(() => {
    if (!pdp || !colorId || !sizeId) return undefined
    return findVariant(pdp, colorId, sizeId)
  }, [pdp, colorId, sizeId])

  const stockStatus = variant ? getStockStatus(variant.stock) : 'sold-out'
  const maxQuantity = variant?.stock ?? 0

  useEffect(() => {
    if (!pdp || !colorId || !sizeId) return
    const inCartQty = getCartQuantityForVariant(pdp.id, colorId, sizeId)
    setQuantity(inCartQty > 0 ? inCartQty : QUANTITY_MIN)
  }, [pdp?.id, colorId, sizeId, getCartQuantityForVariant])

  useEffect(() => {
    if (quantity > maxQuantity && maxQuantity > 0) {
      setQuantity(maxQuantity)
    }
  }, [maxQuantity, quantity])

  const setQuantityClamped = useCallback(
    (next: number) => {
      if (maxQuantity <= 0) return
      setQuantity(Math.min(Math.max(next, QUANTITY_MIN), maxQuantity))
    },
    [maxQuantity],
  )

  return {
    colorId,
    sizeId,
    quantity,
    setQuantity: setQuantityClamped,
    selectColor,
    selectSize,
    variant,
    stockStatus,
    maxQuantity,
  }
}

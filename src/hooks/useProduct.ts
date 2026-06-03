import { useCallback, useEffect, useState } from 'react'
import { API_ENDPOINTS, DEFAULT_PRODUCT_ID } from '../data/api'
import type { FakeStoreProduct } from '../data/types'

type UseProductState = {
  product: FakeStoreProduct | null
  isLoading: boolean
  error: string | null
}

type UseProductResult = UseProductState & {
  refetch: () => void
}

export function useProduct(productId: number = DEFAULT_PRODUCT_ID): UseProductResult {
  const [product, setProduct] = useState<FakeStoreProduct | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadProduct() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(API_ENDPOINTS.productById(productId), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Could not load product (${response.status})`)
        }

        const data = (await response.json()) as FakeStoreProduct
        setProduct(data)
      } catch (err) {
        if (controller.signal.aborted) return

        const message =
          err instanceof Error ? err.message : 'Something went wrong loading the product'
        setProduct(null)
        setError(message)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadProduct()

    return () => controller.abort()
  }, [productId, reloadKey])

  return { product, isLoading, error, refetch }
}

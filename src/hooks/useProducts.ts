import { useCallback, useEffect, useState } from 'react'
import { API_ENDPOINTS } from '../data/api'
import type { FakeStoreProduct } from '../data/types'

export function useProducts() {
  const [products, setProducts] = useState<FakeStoreProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(() => {
    setIsLoading(true)
    setError(null)
    fetch(API_ENDPOINTS.products)
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load products (${res.status})`)
        return res.json() as Promise<FakeStoreProduct[]>
      })
      .then(setProducts)
      .catch((err: Error) => {
        setProducts([])
        setError(err.message)
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { products, isLoading, error, refetch }
}

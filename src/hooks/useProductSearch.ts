import { useMemo, useState } from 'react'
import { SEARCH_DEBOUNCE_MS } from '../data/constants'
import type { FakeStoreProduct } from '../data/types'
import { useDebouncedValue } from './useDebouncedValue'

export function filterProductsByQuery(
  products: FakeStoreProduct[],
  query: string,
): FakeStoreProduct[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return products

  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(normalized) ||
      product.category.toLowerCase().includes(normalized),
  )
}

export function useProductSearch(
  products: FakeStoreProduct[],
  debounceMs = SEARCH_DEBOUNCE_MS,
) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, debounceMs)

  const filteredProducts = useMemo(
    () => filterProductsByQuery(products, debouncedQuery),
    [products, debouncedQuery],
  )

  const clearSearch = () => setQuery('')

  return {
    query,
    setQuery,
    clearSearch,
    debouncedQuery,
    filteredProducts,
    hasActiveSearch: query.trim().length > 0,
    isDebouncing: query !== debouncedQuery,
  }
}

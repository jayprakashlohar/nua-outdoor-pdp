import { useMemo, useState } from 'react'
import { SEARCH_DEBOUNCE_MS } from '../data/constants'
import {
  applyProductFilters,
  getProductCategories,
  type PriceRangeId,
  type ProductSort,
} from '../data/productFilters'
import type { FakeStoreProduct } from '../data/types'
import { useDebouncedValue } from './useDebouncedValue'

export function useProductCatalog(
  products: FakeStoreProduct[],
  debounceMs = SEARCH_DEBOUNCE_MS,
) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [priceRangeId, setPriceRangeId] = useState<PriceRangeId>('all')
  const [minRating, setMinRating] = useState<number | null>(null)
  const [sort, setSort] = useState<ProductSort>('default')

  const debouncedQuery = useDebouncedValue(query, debounceMs)

  const categories = useMemo(
    () => getProductCategories(products),
    [products],
  )

  const filteredProducts = useMemo(
    () =>
      applyProductFilters(products, {
        query: debouncedQuery,
        category,
        priceRangeId,
        minRating,
        sort,
      }),
    [
      products,
      debouncedQuery,
      category,
      priceRangeId,
      minRating,
      sort,
    ],
  )

  const hasActiveSearch = query.trim().length > 0
  const hasActiveFilters =
    category !== '' ||
    priceRangeId !== 'all' ||
    minRating !== null ||
    sort !== 'default'

  const isDebouncing = query !== debouncedQuery

  const clearSearch = () => setQuery('')

  const clearFilters = () => {
    setCategory('')
    setPriceRangeId('all')
    setMinRating(null)
    setSort('default')
  }

  const clearAll = () => {
    setQuery('')
    clearFilters()
  }

  return {
    query,
    setQuery,
    clearSearch,
    debouncedQuery,
    category,
    setCategory,
    priceRangeId,
    setPriceRangeId,
    minRating,
    setMinRating,
    sort,
    setSort,
    categories,
    filteredProducts,
    hasActiveSearch,
    hasActiveFilters,
    isDebouncing,
    clearFilters,
    clearAll,
  }
}

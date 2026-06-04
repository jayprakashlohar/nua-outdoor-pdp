import type { FakeStoreProduct } from './types'

export type ProductSort = 'default' | 'price-asc' | 'price-desc' | 'rating-desc'

export type PriceRangeId = 'all' | 'under-30' | '30-60' | '60-100' | 'over-100'

export type PriceRangeOption = {
  id: PriceRangeId
  label: string
  minUsd: number | null
  maxUsd: number | null
}

export const PRICE_RANGE_OPTIONS: PriceRangeOption[] = [
  { id: 'all', label: 'All prices', minUsd: null, maxUsd: null },
  { id: 'under-30', label: 'Under ₹2,500', minUsd: null, maxUsd: 30 },
  { id: '30-60', label: '₹2,500 – ₹5,000', minUsd: 30, maxUsd: 60 },
  { id: '60-100', label: '₹5,000 – ₹8,300', minUsd: 60, maxUsd: 100 },
  { id: 'over-100', label: 'Over ₹8,300', minUsd: 100, maxUsd: null },
]

export const RATING_FILTER_OPTIONS = [
  { value: '', label: 'All ratings' },
  { value: '4', label: '4★ & up' },
  { value: '3', label: '3★ & up' },
] as const

export const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Top rated' },
]

export function formatCategoryLabel(category: string): string {
  if (!category) return category
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export function getProductCategories(products: FakeStoreProduct[]): string[] {
  const set = new Set<string>()
  for (const product of products) {
    if (product.category) set.add(product.category)
  }
  return [...set].sort((a, b) => a.localeCompare(b))
}

export function filterByCategory(
  products: FakeStoreProduct[],
  category: string,
): FakeStoreProduct[] {
  if (!category) return products
  return products.filter((p) => p.category === category)
}

export function filterByPriceRange(
  products: FakeStoreProduct[],
  rangeId: PriceRangeId,
): FakeStoreProduct[] {
  const range = PRICE_RANGE_OPTIONS.find((r) => r.id === rangeId)
  if (!range || rangeId === 'all') return products

  return products.filter((p) => {
    if (range.minUsd !== null && p.price < range.minUsd) return false
    if (range.maxUsd !== null && p.price > range.maxUsd) return false
    return true
  })
}

export function filterByMinRating(
  products: FakeStoreProduct[],
  minRating: number | null,
): FakeStoreProduct[] {
  if (minRating === null) return products
  return products.filter((p) => p.rating.rate >= minRating)
}

export function sortProducts(
  products: FakeStoreProduct[],
  sort: ProductSort,
): FakeStoreProduct[] {
  const list = [...products]
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price)
    case 'rating-desc':
      return list.sort((a, b) => b.rating.rate - a.rating.rate)
    default:
      return list.sort((a, b) => a.id - b.id)
  }
}

export type ApplyFiltersInput = {
  query: string
  category: string
  priceRangeId: PriceRangeId
  minRating: number | null
  sort: ProductSort
}

export function applyProductFilters(
  products: FakeStoreProduct[],
  filters: ApplyFiltersInput,
): FakeStoreProduct[] {
  const normalized = filters.query.trim().toLowerCase()
  let list = products

  if (normalized) {
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(normalized) ||
        p.category.toLowerCase().includes(normalized),
    )
  }

  list = filterByCategory(list, filters.category)
  list = filterByPriceRange(list, filters.priceRangeId)
  list = filterByMinRating(list, filters.minRating)
  return sortProducts(list, filters.sort)
}

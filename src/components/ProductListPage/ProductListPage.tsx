import { Link } from 'react-router-dom'
import { PRODUCTS_PER_PAGE } from '../../data/constants'
import { formatInr } from '../../data/currency'
import {
  formatCategoryLabel,
  PRICE_RANGE_OPTIONS,
  RATING_FILTER_OPTIONS,
  SORT_OPTIONS,
} from '../../data/productFilters'
import { mapFakeStoreToPdp, getFirstInStockVariant } from '../../data/productMapper'
import { usePagination } from '../../hooks/usePagination'
import { useProductCatalog } from '../../hooks/useProductCatalog'
import { useProducts } from '../../hooks/useProducts'
import { Loader } from '../Loader'
import { Pagination } from '../Pagination/Pagination'
import { WishlistButton } from '../WishlistButton/WishlistButton'
import { useCart } from '../../stores/CartContext'
import styles from './ProductListPage.module.scss'

export function ProductListPage() {
  const { products, isLoading, error, refetch } = useProducts()
  const { addToCart, openDrawer, isVariantInCart } = useCart()
  const {
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
    onSaleOnly,
    setOnSaleOnly,
    sort,
    setSort,
    categories,
    filteredProducts,
    hasActiveSearch,
    hasActiveFilters,
    isDebouncing,
    clearAll,
  } = useProductCatalog(products)

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    goToPrevious,
    goToNext,
    hasPagination,
  } = usePagination(filteredProducts, PRODUCTS_PER_PAGE)

  const handleQuickAdd = (productId: number) => {
    const raw = products.find((p) => p.id === productId)
    if (!raw) return
    const pdp = mapFakeStoreToPdp(raw)
    const picked = getFirstInStockVariant(pdp)
    if (!picked) return
    if (isVariantInCart(pdp.id, picked.color.id, picked.size.id)) {
      openDrawer()
      return
    }
    addToCart({
      pdp,
      colorId: picked.color.id,
      sizeId: picked.size.id,
      quantity: 1,
    })
    openDrawer()
  }

  if (isLoading) {
    return <Loader message="Loading products…" centered inPanel />
  }

  if (error) {
    return (
      <div className={styles.status}>
        <p>{error}</p>
        <button type="button" onClick={refetch}>
          Try again
        </button>
      </div>
    )
  }

  const showNoResults = !isDebouncing && filteredProducts.length === 0
  const showClearAll = hasActiveSearch || hasActiveFilters

  return (
    <div className={styles.page}>
      <section className={styles.shopPanel} aria-label="Browse and filter products">
        <div className={styles.shopTop}>
          <div className={styles.titleBlock}>
            <h1 className={styles.heading}>Shop outdoor gear</h1>
            <p className={styles.resultCount} role="status">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'}
              {isDebouncing && hasActiveSearch ? ' · searching…' : ''}
            </p>
          </div>
          <div className={styles.searchField}>
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3-3" />
            </svg>
            <input
              id="product-search"
              type="search"
              className={styles.searchInput}
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products by name or category"
              aria-busy={isDebouncing}
            />
            {hasActiveSearch && (
              <button
                type="button"
                className={styles.clearIcon}
                onClick={clearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className={styles.categoryScroll} role="group" aria-label="Category">
          <button
            type="button"
            className={`${styles.chip} ${category === '' ? styles.chipActive : ''}`}
            aria-pressed={category === ''}
            onClick={() => setCategory('')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.chip} ${category === cat ? styles.chipActive : ''}`}
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
            >
              {formatCategoryLabel(cat)}
            </button>
          ))}
        </div>

        <div className={styles.controlRow}>
          <div className={styles.selectGroup}>
            <select
              className={styles.select}
              value={priceRangeId}
              onChange={(e) =>
                setPriceRangeId(e.target.value as typeof priceRangeId)
              }
              aria-label="Filter by price"
            >
              {PRICE_RANGE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              value={minRating === null ? '' : String(minRating)}
              onChange={(e) => {
                const v = e.target.value
                setMinRating(v === '' ? null : Number(v))
              }}
              aria-label="Filter by rating"
            >
              {RATING_FILTER_OPTIONS.map((opt) => (
                <option key={opt.label} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.controlActions}>
            <button
              type="button"
              className={`${styles.togglePill} ${onSaleOnly ? styles.togglePillActive : ''}`}
              aria-pressed={onSaleOnly}
              onClick={() => setOnSaleOnly((v) => !v)}
            >
              Sale
            </button>
            {showClearAll && (
              <button type="button" className={styles.resetBtn} onClick={clearAll}>
                Reset
              </button>
            )}
          </div>
        </div>
      </section>

      {showNoResults ? (
        <p className={styles.noResults} role="status">
          {hasActiveSearch ? (
            <>
              No products match &ldquo;{debouncedQuery.trim()}&rdquo; with the
              current filters.
            </>
          ) : (
            <>No products match the current filters.</>
          )}{' '}
          <button type="button" className={styles.clearFiltersInline} onClick={clearAll}>
            Clear all
          </button>
        </p>
      ) : (
        <>
          <ul className={styles.grid}>
            {paginatedItems.map((product) => {
              const inCartAny = mapFakeStoreToPdp(product)
              const picked = getFirstInStockVariant(inCartAny)
              const alreadyAdded =
                picked &&
                isVariantInCart(product.id, picked.color.id, picked.size.id)
              const noStock = !picked

              return (
                <li key={product.id} className={styles.card}>
                  <WishlistButton
                    product={{
                      productId: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                    }}
                    className={styles.wishlistBtn}
                  />
                  <Link to={`/product/${product.id}`} className={styles.cardLink}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.cardImage}
                    />
                    <p className={styles.cardCategory}>
                      {formatCategoryLabel(product.category)}
                    </p>
                    <h2 className={styles.cardTitle}>{product.title}</h2>
                    <p className={styles.cardPrice}>{formatInr(product.price)}</p>
                  </Link>
                  <button
                    type="button"
                    className={styles.addBtn}
                    disabled={noStock || Boolean(alreadyAdded)}
                    onClick={() => handleQuickAdd(product.id)}
                  >
                    {noStock
                      ? 'Out of stock'
                      : alreadyAdded
                        ? 'Added'
                        : 'Add to cart'}
                  </button>
                </li>
              )
            })}
          </ul>

          {hasPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              onPrevious={goToPrevious}
              onNext={goToNext}
            />
          )}
        </>
      )}
    </div>
  )
}

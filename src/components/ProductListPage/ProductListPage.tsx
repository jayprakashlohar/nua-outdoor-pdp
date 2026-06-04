import { Link } from 'react-router-dom'
import { PRODUCTS_PER_PAGE } from '../../data/constants'
import { formatInr } from '../../data/currency'
import { mapFakeStoreToPdp, getFirstInStockVariant } from '../../data/productMapper'
import { usePagination } from '../../hooks/usePagination'
import { useProductSearch } from '../../hooks/useProductSearch'
import { useProducts } from '../../hooks/useProducts'
import { Loader } from '../Loader'
import { Pagination } from '../Pagination/Pagination'
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
    filteredProducts,
    hasActiveSearch,
    isDebouncing,
  } = useProductSearch(products)

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

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <h1 className={styles.heading}>Shop outdoor gear</h1>
        <div className={styles.searchArea}>
          <div className={styles.searchField}>
            <input
              id="product-search"
              type="text"
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
      </div>

      {isDebouncing && hasActiveSearch && (
        <p className={styles.searching} role="status">
          Searching…
        </p>
      )}

      {showNoResults ? (
        <p className={styles.noResults} role="status">
          No products match &ldquo;{debouncedQuery.trim()}&rdquo;. Try another
          search.
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
                  <Link to={`/product/${product.id}`} className={styles.cardLink}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.cardImage}
                    />
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

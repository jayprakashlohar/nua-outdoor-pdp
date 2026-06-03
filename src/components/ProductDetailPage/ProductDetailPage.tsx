import { useMemo } from 'react'
import { DEFAULT_PRODUCT_ID } from '../../data/api'
import { findVariant, getStockStatus, mapFakeStoreToPdp } from '../../data/productMapper'
import { useProduct } from '../../hooks/useProduct'
import { ImageGallery } from '../ImageGallery/ImageGallery'
import { ProductDetailLayout } from '../ProductDetailLayout/ProductDetailLayout'
import layoutStyles from '../ProductDetailLayout/ProductDetailLayout.module.scss'
import styles from './ProductDetailPage.module.scss'

export function ProductDetailPage() {
  const { product, isLoading, error, refetch } = useProduct(DEFAULT_PRODUCT_ID)

  const pdp = useMemo(
    () => (product ? mapFakeStoreToPdp(product) : null),
    [product],
  )

  if (isLoading) {
    return (
      <div className={styles.status} role="status" aria-live="polite">
        <p className={styles.statusTitle}>Loading product…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.status} role="alert">
        <p className={styles.statusTitle}>Could not load product</p>
        <p className={styles.statusMessage}>{error}</p>
        <button type="button" className={styles.retryButton} onClick={refetch}>
          Try again
        </button>
      </div>
    )
  }

  if (!pdp) return null

  return (
    <ProductDetailLayout
      gallery={<ImageGallery images={pdp.images} />}
      info={
        <div className={layoutStyles.panelPlaceholder}>
          <p className={layoutStyles.panelLabel}>Product info</p>
          <p className={styles.brand}>{pdp.brand}</p>
          <h1 className={styles.title}>{pdp.title}</h1>
          <div className={styles.priceRow}>
            {pdp.onSale && pdp.originalPrice && (
              <span className={styles.originalPrice}>
                ${pdp.originalPrice.toFixed(2)}
              </span>
            )}
            <span className={styles.price}>${pdp.price.toFixed(2)}</span>
            {pdp.onSale && <span className={styles.saleBadge}>Sale</span>}
          </div>
          <p className={styles.variantLabel}>
            {pdp.colors.length} colours · {pdp.sizes.length} sizes
          </p>
          <ul className={styles.sizeList}>
            {pdp.sizes.map((size) => {
              const variant = findVariant(pdp, pdp.colors[0].id, size.id)
              const status = variant ? getStockStatus(variant.stock) : 'sold-out'
              return (
                <li key={size.id} className={styles.sizeItem}>
                  <span>{size.label}</span>
                  <span className={styles[`stock_${status}`]}>
                    {status === 'low' && variant
                      ? `Only ${variant.stock} left`
                      : status === 'sold-out'
                        ? 'Sold out'
                        : 'In stock'}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      }
    />
  )
}

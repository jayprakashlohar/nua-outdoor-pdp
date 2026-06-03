import { useMemo } from 'react'
import { DEFAULT_PRODUCT_ID } from '../../data/api'
import { findVariant, getStockStatus, mapFakeStoreToPdp } from '../../data/productMapper'
import { useProduct } from '../../hooks/useProduct'
import { ProductDetailLayout } from '../ProductDetailLayout/ProductDetailLayout'
import layoutStyles from '../ProductDetailLayout/ProductDetailLayout.module.scss'
import styles from './ProductDetailPage.module.scss'

export function ProductDetailPage() {
  const { product, isLoading, error, refetch } = useProduct(DEFAULT_PRODUCT_ID)

  const pdp = useMemo(
    () => (product ? mapFakeStoreToPdp(product) : null),
    [product],
  )

  const previewVariant = useMemo(() => {
    if (!pdp) return null
    return findVariant(pdp, pdp.colors[0].id, pdp.sizes[2].id)
  }, [pdp])

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
      gallery={
        <div className={layoutStyles.panelPlaceholder}>
          <p className={layoutStyles.panelLabel}>Gallery</p>
          <img
            src={pdp.images[0].url}
            alt={pdp.images[0].alt}
            className={styles.previewImage}
            width={400}
            height={400}
          />
        </div>
      }
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
          {previewVariant && (
            <p className={styles.hint}>
              Layout shell ready — gallery &amp; controls in next steps.
            </p>
          )}
        </div>
      }
    />
  )
}

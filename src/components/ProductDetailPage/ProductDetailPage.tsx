import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DEFAULT_PRODUCT_ID } from '../../data/api'
import { mapFakeStoreToPdp } from '../../data/productMapper'
import { useProduct } from '../../hooks/useProduct'
import { useProductVariant } from '../../hooks/useProductVariant'
import { Loader } from '../Loader'
import { ImageGallery } from '../ImageGallery/ImageGallery'
import { ProductDetailLayout } from '../ProductDetailLayout/ProductDetailLayout'
import { ProductDetailsSection } from '../ProductDetailsSection/ProductDetailsSection'
import { ProductInfoPanel } from '../ProductInfoPanel/ProductInfoPanel'
import styles from './ProductDetailPage.module.scss'

export function ProductDetailPage() {
  const { productId: productIdParam } = useParams()
  const productId = Number(productIdParam) || DEFAULT_PRODUCT_ID
  const { product, isLoading, error, refetch } = useProduct(productId)

  const pdp = useMemo(
    () => (product ? mapFakeStoreToPdp(product) : null),
    [product],
  )

  const variantState = useProductVariant(pdp)

  const backLink = (
    <Link to="/" className={styles.backLink}>
      <span className={styles.backIcon} aria-hidden>
        ←
      </span>
      Back to products
    </Link>
  )

  if (isLoading) {
    return (
      <div className={styles.page}>
        {backLink}
        <div className={styles.loaderSection}>
          <Loader message="Loading product…" centered />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.page}>
        {backLink}
        <div className={styles.status} role="alert">
          <p className={styles.statusTitle}>Could not load product</p>
          <p className={styles.statusMessage}>{error}</p>
          <button type="button" className={styles.retryButton} onClick={refetch}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!pdp) return null

  return (
    <div className={styles.page}>
      {backLink}
      <ProductDetailLayout
        gallery={<ImageGallery images={pdp.images} />}
        info={
          <ProductInfoPanel
            pdp={pdp}
            colorId={variantState.colorId}
            sizeId={variantState.sizeId}
            quantity={variantState.quantity}
            stockStatus={variantState.stockStatus}
            maxQuantity={variantState.maxQuantity}
            onColorSelect={variantState.selectColor}
            onSizeSelect={variantState.selectSize}
            onQuantityChange={variantState.setQuantity}
          />
        }
      />
      <ProductDetailsSection pdp={pdp} />
    </div>
  )
}

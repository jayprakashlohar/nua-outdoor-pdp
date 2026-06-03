import { formatInr } from '../../data/currency'
import { DELIVERY_ESTIMATE_TEXT, shouldShowDeliveryEstimate } from '../../data/deliveryRules'
import { QUANTITY_MIN } from '../../data/constants'
import type { PdpProduct } from '../../data/types'
import { findVariant, getStockStatus } from '../../data/productMapper'
import { useCart } from '../../stores/CartContext'
import styles from './ProductInfoPanel.module.scss'

type ProductInfoPanelProps = {
  pdp: PdpProduct
  colorId: string
  sizeId: string
  quantity: number
  stockStatus: ReturnType<typeof getStockStatus>
  maxQuantity: number
  onColorSelect: (colorId: string) => void
  onSizeSelect: (sizeId: string) => void
  onQuantityChange: (quantity: number) => void
}

export function ProductInfoPanel({
  pdp,
  colorId,
  sizeId,
  quantity,
  stockStatus,
  maxQuantity,
  onColorSelect,
  onSizeSelect,
  onQuantityChange,
}: ProductInfoPanelProps) {
  const { addToCart, isVariantInCart, openDrawer } = useCart()

  const isSoldOut = stockStatus === 'sold-out'
  const inCart = isVariantInCart(pdp.id, colorId, sizeId)
  const showDelivery = shouldShowDeliveryEstimate({
    variantSelected: Boolean(colorId && sizeId),
    variantInStock: !isSoldOut,
  })

  const handleAddToCart = () => {
    if (isSoldOut || inCart) return
    addToCart({ pdp, colorId, sizeId, quantity })
    openDrawer()
  }

  const ctaLabel = isSoldOut
    ? 'Out of stock'
    : inCart
      ? 'Already added'
      : 'Add to cart'

  return (
    <div className={styles.panel}>
      <p className={styles.brand}>{pdp.brand}</p>
      <h1 className={styles.title}>{pdp.title}</h1>

      <div className={styles.priceRow}>
        {pdp.onSale && pdp.originalPrice && (
          <span className={styles.originalPrice}>{formatInr(pdp.originalPrice)}</span>
        )}
        <span className={styles.price}>{formatInr(pdp.price)}</span>
        {pdp.onSale && <span className={styles.saleBadge}>Sale</span>}
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Colour</legend>
        <div className={styles.swatches} role="radiogroup" aria-label="Colour">
          {pdp?.colors?.map((color) => (
            <button
              key={color.id}
              type="button"
              role="radio"
              aria-checked={colorId === color.id}
              aria-label={color.name}
              className={`${styles.swatch} ${colorId === color.id ? styles.swatchActive : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => onColorSelect(color.id)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Size</legend>
        <div className={styles.sizes} role="radiogroup" aria-label="Size">
          {pdp.sizes.map((size) => {
            const variant = findVariant(pdp, colorId, size.id)
            const status = variant ? getStockStatus(variant.stock) : 'sold-out'
            const isActive = sizeId === size.id
            const isDisabled = status === 'sold-out'

            return (
              <button
                key={size.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                disabled={isDisabled}
                className={`${styles.sizeBtn} ${isActive ? styles.sizeActive : ''} ${isDisabled ? styles.sizeDisabled : ''}`}
                onClick={() => onSizeSelect(size.id)}
              >
                <span>{size.label}</span>
                {status === 'low' && variant && (
                  <span className={styles.sizeHint}>Only {variant.stock} left</span>
                )}
                {status === 'sold-out' && (
                  <span className={styles.sizeHint}>Sold out</span>
                )}
              </button>
            )
          })}
        </div>
      </fieldset>

      {!isSoldOut && (
        <div className={styles.quantityRow}>
          <label className={styles.legend} htmlFor="quantity">
            Quantity
          </label>
          <div className={styles.quantityControls}>
            <button
              type="button"
              className={styles.qtyBtn}
              aria-label="Decrease quantity"
              disabled={quantity <= QUANTITY_MIN}
              onClick={() => onQuantityChange(quantity - 1)}
            >
              −
            </button>
            <span id="quantity" className={styles.qtyValue}>
              {quantity}
            </span>
            <button
              type="button"
              className={styles.qtyBtn}
              aria-label="Increase quantity"
              disabled={quantity >= maxQuantity}
              onClick={() => onQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      )}

      {stockStatus === 'low' && maxQuantity > 0 && (
        <p className={styles.stockMessage}>Only {maxQuantity} left in this size</p>
      )}

      {isSoldOut && (
        <p className={styles.stockMessage} role="status">
          This combination is out of stock — try another colour or size.
        </p>
      )}

      <button
        type="button"
        className={styles.addToCart}
        disabled={isSoldOut || inCart}
        onClick={handleAddToCart}
      >
        {ctaLabel}
      </button>

      {showDelivery && (
        <p className={styles.delivery}>{DELIVERY_ESTIMATE_TEXT}</p>
      )}
    </div>
  )
}

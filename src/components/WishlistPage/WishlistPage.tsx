import { Link } from 'react-router-dom'
import { formatInr } from '../../data/currency'
import { mapFakeStoreToPdp, getFirstInStockVariant } from '../../data/productMapper'
import { useProducts } from '../../hooks/useProducts'
import { useCart } from '../../stores/CartContext'
import { useWishlist } from '../../stores/WishlistContext'
import { WishlistButton } from '../WishlistButton/WishlistButton'
import styles from './WishlistPage.module.scss'

export function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist()
  const { products } = useProducts()
  const { addToCart, openDrawer, isVariantInCart } = useCart()

  const handleAddToCart = (productId: number) => {
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

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Wishlist</h1>
        {items.length > 0 && (
          <p className={styles.count}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Nothing saved yet</p>
          <p className={styles.emptySubtitle}>
            Tap the heart on a product to save it for later.
          </p>
          <Link to="/" className={styles.shopLink}>
            Browse products
          </Link>
        </div>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => {
            const raw = products.find((p) => p.id === item.productId)
            const pdp = raw ? mapFakeStoreToPdp(raw) : null
            const picked = pdp ? getFirstInStockVariant(pdp) : null
            const noStock = !picked

            return (
              <li key={item.productId} className={styles.card}>
                <Link to={`/product/${item.productId}`} className={styles.thumbLink}>
                  <img
                    src={item.image}
                    alt=""
                    className={styles.thumb}
                    width={96}
                    height={96}
                  />
                </Link>
                <div className={styles.meta}>
                  <Link
                    to={`/product/${item.productId}`}
                    className={styles.titleLink}
                  >
                    <h2 className={styles.title}>{item.title}</h2>
                  </Link>
                  <p className={styles.price}>{formatInr(item.price)}</p>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.addBtn}
                      disabled={noStock}
                      onClick={() => handleAddToCart(item.productId)}
                    >
                      {noStock ? 'Out of stock' : 'Add to cart'}
                    </button>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeFromWishlist(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <WishlistButton
                  product={{
                    productId: item.productId,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                  }}
                  className={styles.wishlistBtn}
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

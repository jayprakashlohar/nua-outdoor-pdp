import { Link } from 'react-router-dom'
import { formatInr } from '../../data/currency'
import { useCart } from '../../stores/CartContext'
import styles from './CartDrawer.module.scss'

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    total,
  } = useCart()

  if (!isDrawerOpen) return null

  return (
    <>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close cart"
        onClick={closeDrawer}
      />
      <aside className={styles.drawer} aria-label="Shopping cart">
        <div className={styles.header}>
          <h2 className={styles.title}>Your cart</h2>
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Close cart"
            onClick={closeDrawer}
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Your cart feels lonely 😔</p>
              <p className={styles.emptySubtitle}>
                Add some items to make it happy 😄
              </p>
              <Link to="/" className={styles.shopLink} onClick={closeDrawer}>
                Continue shopping
              </Link>
            </div>
          ) : (
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.lineKey} className={styles.line}>
                  <img
                    src={item.image}
                    alt=""
                    className={styles.thumb}
                    width={64}
                    height={64}
                  />
                  <div className={styles.lineMeta}>
                    <p className={styles.lineTitle}>{item.title}</p>
                    <p className={styles.lineVariant}>
                      {item.colorName} · {item.sizeLabel}
                    </p>
                    <p className={styles.linePrice}>
                      {formatInr(item.price)} each
                    </p>
                    <div className={styles.lineActions}>
                      <div className={styles.lineControls}>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(item.lineKey, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className={styles.qty}>{item.quantity}</span>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          aria-label="Increase quantity"
                          disabled={item.quantity >= item.maxStock}
                          onClick={() =>
                            updateQuantity(item.lineKey, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        aria-label={`Remove ${item.title} from cart`}
                        onClick={() => removeFromCart(item.lineKey)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className={styles.lineAside}>
                    <p className={styles.lineTotal}>
                      {formatInr(item.price * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>{formatInr(subtotal)}</span>
            </div>
            <div className={`${styles.totalRow} ${styles.totalRowBold}`}>
              <span>Total</span>
              <span>{formatInr(total)}</span>
            </div>
          </div>
          <button type="button" className={styles.checkout} disabled>
            Checkout
          </button>
        </div>
      </aside>
    </>
  )
}

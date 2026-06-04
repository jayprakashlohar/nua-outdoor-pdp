import { Link } from 'react-router-dom'
import { useCart } from '../../stores/CartContext'
import { useWishlist } from '../../stores/WishlistContext'
import styles from './SiteHeader.module.scss'

export function SiteHeader() {
  const { itemCount: cartCount, openDrawer: openCart } = useCart()
  const { itemCount: wishlistCount } = useWishlist()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logoLink} aria-label="Nua — home">
          <img
            src="/nua-logo.png"
            alt="Nua"
            className={styles.logo}
            width={120}
            height={42}
          />
        </Link>

        <div className={styles.actions}>
          <Link
            to="/wishlist"
            className={`${styles.iconBtn} ${wishlistCount > 0 ? styles.iconBtnActive : ''}`}
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              aria-hidden
              fill={wishlistCount > 0 ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {wishlistCount > 0 && (
              <span className={styles.badge} aria-hidden>
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className={`${styles.iconBtn} ${cartCount > 0 ? styles.iconBtnActive : ''}`}
            aria-label={`Open cart, ${cartCount} items`}
            onClick={openCart}
          >
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
              <path d="M6 6L5 3H2" />
            </svg>
            {cartCount > 0 && (
              <span className={styles.badge} aria-hidden>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

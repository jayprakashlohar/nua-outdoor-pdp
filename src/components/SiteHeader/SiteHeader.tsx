import { Link } from 'react-router-dom'
import { useCart } from '../../stores/CartContext'
import styles from './SiteHeader.module.scss'

export function SiteHeader() {
  const { itemCount, openDrawer } = useCart()

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

        <button
          type="button"
          className={styles.cartBtn}
          aria-label={`Open cart, ${itemCount} items`}
          onClick={openDrawer}
        >
          <svg
            className={styles.cartIcon}
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
          {itemCount > 0 && (
            <span className={styles.badge} aria-hidden>
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

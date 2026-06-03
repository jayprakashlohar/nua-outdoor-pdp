import { DEFAULT_PRODUCT_ID } from './data/api'
import { useProduct } from './hooks/useProduct'
import styles from './App.module.scss'

function App() {
  const { product, isLoading, error, refetch } = useProduct(DEFAULT_PRODUCT_ID)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a
            href="https://nuawoman.com/"
            className={styles.logoLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nua — go to nuawoman.com"
          >
            <img
              src="/nua-logo.png"
              alt="Nua"
              className={styles.logo}
              width={120}
              height={42}
            />
          </a>
        </div>
      </header>

      <main className={styles.main}>
        {isLoading && (
          <div className={styles.status} role="status" aria-live="polite">
            <p className={styles.statusTitle}>Loading product…</p>
          </div>
        )}

        {!isLoading && error && (
          <div className={styles.status} role="alert">
            <p className={styles.statusTitle}>Could not load product</p>
            <p className={styles.statusMessage}>{error}</p>
            <button type="button" className={styles.retryButton} onClick={refetch}>
              Try again
            </button>
          </div>
        )}

        {!isLoading && product && (
          <article className={styles.productPreview}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
              width={280}
              height={280}
            />
            <div className={styles.productMeta}>
              <p className={styles.productCategory}>{product.category}</p>
              <h1 className={styles.title}>{product.title}</h1>
              <p className={styles.productPrice}>
                ${product.price.toFixed(2)}
              </p>
              <p className={styles.subtitle}>
                Fetched from Fake Store API (product #{product.id}). Full PDP layout
                comes in the next steps.
              </p>
            </div>
          </article>
        )}
      </main>
    </div>
  )
}

export default App

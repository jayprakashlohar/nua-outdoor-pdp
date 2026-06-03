import styles from './SiteHeader.module.scss'

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
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
  )
}

import styles from './App.module.scss'

function App() {
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
        <div className={styles.placeholder}>
          <h1 className={styles.title}>Outdoor PDP</h1>
          <p className={styles.subtitle}>
            Product detail page for <span className={styles.accent}>Nua</span> —
            build in progress.
          </p>
        </div>
      </main>
    </div>
  )
}

export default App

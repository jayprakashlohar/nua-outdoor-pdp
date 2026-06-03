import { ProductDetailPage } from './components/ProductDetailPage/ProductDetailPage'
import { SiteHeader } from './components/SiteHeader/SiteHeader'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <ProductDetailPage />
      </main>
    </div>
  )
}

export default App

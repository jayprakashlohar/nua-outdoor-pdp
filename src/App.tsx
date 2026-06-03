import { BrowserRouter } from 'react-router-dom'
import { CartDrawer } from './components/CartDrawer/CartDrawer'
import { SiteHeader } from './components/SiteHeader/SiteHeader'
import { AppRouter } from './router/AppRouter'
import { CartProvider } from './stores/CartContext'
import styles from './App.module.scss'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className={styles.page}>
          <SiteHeader />
          <main className={styles.main}>
            <AppRouter />
          </main>
          <CartDrawer />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App

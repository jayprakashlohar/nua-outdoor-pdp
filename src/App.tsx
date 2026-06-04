import { BrowserRouter } from 'react-router-dom'
import { CartDrawer } from './components/CartDrawer/CartDrawer'
import { SiteHeader } from './components/SiteHeader/SiteHeader'
import { AppRouter } from './router/AppRouter'
import { CartProvider } from './stores/CartContext'
import { WishlistProvider } from './stores/WishlistContext'
import styles from './App.module.scss'

function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <CartProvider>
          <div className={styles.page}>
            <SiteHeader />
            <main className={styles.main}>
              <AppRouter />
            </main>
            <CartDrawer />
          </div>
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  )
}

export default App

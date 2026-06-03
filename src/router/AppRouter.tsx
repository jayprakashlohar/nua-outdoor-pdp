import { Navigate, Route, Routes } from 'react-router-dom'
import { ProductDetailPage } from '../components/ProductDetailPage/ProductDetailPage'
import { ProductListPage } from '../components/ProductListPage/ProductListPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/product/:productId" element={<ProductDetailPage />} />
      <Route path="/products" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

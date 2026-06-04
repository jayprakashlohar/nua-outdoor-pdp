export type FakeStoreProduct = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type Review = {
  id: string
  author: string
  rating: number
  date: string
  body: string
}

export type StockStatus = 'available' | 'low' | 'sold-out'

export type ColorOption = {
  id: string
  name: string
  hex: string
}

export type SizeOption = {
  id: string
  label: string
}

export type ProductVariant = {
  colorId: string
  sizeId: string
  stock: number
  sku: string
}

export type GalleryImage = {
  id: string
  url: string
  alt: string
}

export type SpecificationRow = {
  label: string
  value: string
}

export type CategoryKind = 'clothing' | 'electronics' | 'jewelry' | 'general'

export type VariantLabels = {
  color: string
  size: string
}

export type PdpProduct = {
  id: number
  title: string
  brand: string
  description: string
  category: string
  categoryKind: CategoryKind
  variantLabels: VariantLabels
  images: GalleryImage[]
  colors: ColorOption[]
  sizes: SizeOption[]
  variants: ProductVariant[]
  price: number
  originalPrice: number | null
  onSale: boolean
  specifications: SpecificationRow[]
}

export type CartItem = {
  lineKey: string
  productId: number
  colorId: string
  colorName: string
  sizeId: string
  sizeLabel: string
  title: string
  price: number
  image: string
  quantity: number
  maxStock: number
}

export type WishlistItem = {
  productId: number
  title: string
  price: number
  image: string
}

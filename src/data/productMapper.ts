import { LOW_STOCK_THRESHOLD } from './constants'
import {
  getCategoryVariantProfile,
  shouldShowSizeSelector,
} from './categoryVariants'
import type {
  FakeStoreProduct,
  PdpProduct,
  ProductVariant,
  StockStatus,
  ColorOption,
  SizeOption,
} from './types'

const BRAND_NAME = 'Nua Outdoor'

function variantStock(
  productId: number,
  colorId: string,
  sizeId: string,
): number {
  const seed =
    productId * 17 +
    colorId.charCodeAt(0) * 3 +
    sizeId.charCodeAt(0) * 7 +
    sizeId.length

  const bucket = seed % 10
  if (bucket === 0) return 0
  if (bucket <= 2) return LOW_STOCK_THRESHOLD
  if (bucket <= 5) return 8
  return 15
}

function buildVariants(
  productId: number,
  colors: ColorOption[],
  sizes: SizeOption[],
): ProductVariant[] {
  const variants: ProductVariant[] = []

  for (const color of colors) {
    for (const size of sizes) {
      variants.push({
        colorId: color.id,
        sizeId: size.id,
        stock: variantStock(productId, color.id, size.id),
        sku: `NUA-${productId}-${color.id}-${size.id}`.toUpperCase(),
      })
    }
  }

  return variants
}

function buildGalleryImages(product: FakeStoreProduct) {
  return [0, 1, 2, 3].map((index) => ({
    id: `img-${index}`,
    url: product.image,
    alt: `${product.title} — view ${index + 1}`,
  }))
}

export function isProductOnSale(product: FakeStoreProduct): boolean {
  return product.id % 2 === 0 || product.price < 80
}

function isOnSale(product: FakeStoreProduct): boolean {
  return isProductOnSale(product)
}

function saleOriginalPrice(price: number): number {
  return Math.round(price * 1.25 * 100) / 100
}

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) return 'sold-out'
  if (stock <= LOW_STOCK_THRESHOLD) return 'low'
  return 'available'
}

export function findVariant(
  pdp: PdpProduct,
  colorId: string,
  sizeId: string,
): ProductVariant | undefined {
  return pdp.variants.find((v) => v.colorId === colorId && v.sizeId === sizeId)
}

export function getFirstInStockVariant(pdp: PdpProduct) {
  for (const color of pdp.colors) {
    for (const size of pdp.sizes) {
      const variant = findVariant(pdp, color.id, size.id)
      if (variant && variant.stock > 0) {
        return { color, size, variant }
      }
    }
  }
  return null
}

export function mapFakeStoreToPdp(product: FakeStoreProduct): PdpProduct {
  const onSale = isOnSale(product)
  const profile = getCategoryVariantProfile(product)

  return {
    id: product.id,
    title: product.title,
    brand: BRAND_NAME,
    description: product.description,
    category: product.category,
    categoryKind: profile.kind,
    variantLabels: profile.labels,
    images: buildGalleryImages(product),
    colors: profile.colors,
    sizes: profile.sizes,
    variants: buildVariants(product.id, profile.colors, profile.sizes),
    price: product.price,
    originalPrice: onSale ? saleOriginalPrice(product.price) : null,
    onSale,
    specifications: [
      { label: 'Category', value: product.category },
      { label: 'Brand', value: BRAND_NAME },
      { label: 'Rating', value: `${product.rating.rate} / 5` },
      { label: 'Reviews', value: String(product.rating.count) },
      ...(shouldShowSizeSelector(profile.sizes)
        ? []
        : [{ label: profile.labels.size, value: profile.sizes[0]?.label ?? 'One size' }]),
    ],
  }
}

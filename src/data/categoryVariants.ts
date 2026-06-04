import type {
  CategoryKind,
  ColorOption,
  FakeStoreProduct,
  SizeOption,
  VariantLabels,
} from './types'

export type CategoryVariantProfile = {
  kind: CategoryKind
  labels: VariantLabels
  colors: ColorOption[]
  sizes: SizeOption[]
}

const CLOTHING_COLORS: ColorOption[] = [
  { id: 'forest', name: 'Forest Green', hex: '#3d5c3a' },
  { id: 'sand', name: 'Sandstone', hex: '#c4a574' },
  { id: 'slate', name: 'Slate Grey', hex: '#5c6b73' },
  { id: 'coral', name: 'Coral', hex: '#f67b6d' },
]

const CLOTHING_SIZES: SizeOption[] = [
  { id: 'xs', label: 'XS' },
  { id: 's', label: 'S' },
  { id: 'm', label: 'M' },
  { id: 'l', label: 'L' },
  { id: 'xl', label: 'XL' },
]

const ELECTRONICS_FINISH: ColorOption[] = [
  { id: 'black', name: 'Black', hex: '#1f1f1f' },
  { id: 'silver', name: 'Silver', hex: '#b8bcc4' },
  { id: 'white', name: 'White', hex: '#f4f4f4' },
]

const MONITOR_SIZES: SizeOption[] = [
  { id: '27', label: '27"' },
  { id: '32', label: '32"' },
  { id: '49', label: '49"' },
]

const STORAGE_SIZES: SizeOption[] = [
  { id: '128gb', label: '128 GB' },
  { id: '256gb', label: '256 GB' },
  { id: '512gb', label: '512 GB' },
]

const STANDARD_SIZES: SizeOption[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'plus', label: 'Plus' },
]

const JEWELRY_METALS: ColorOption[] = [
  { id: 'gold', name: 'Gold', hex: '#d4af37' },
  { id: 'silver', name: 'Silver', hex: '#c0c0c0' },
  { id: 'rose', name: 'Rose gold', hex: '#e8b4a8' },
]

const RING_SIZES: SizeOption[] = [
  { id: '6', label: '6' },
  { id: '7', label: '7' },
  { id: '8', label: '8' },
  { id: '9', label: '9' },
  { id: '10', label: '10' },
]

const GENERAL_COLORS: ColorOption[] = [
  { id: 'default', name: 'Default', hex: '#6b5b55' },
  { id: 'alt', name: 'Alternate', hex: '#5c6b73' },
]

const ONE_SIZE: SizeOption[] = [{ id: 'one-size', label: 'One size' }]

export function normalizeCategorySlug(category: string): string {
  return category.trim().toLowerCase()
}

export function getCategoryKind(category: string): CategoryKind {
  const slug = normalizeCategorySlug(category)
  if (slug.includes('clothing')) return 'clothing'
  if (slug.includes('electronics')) return 'electronics'
  if (slug.includes('jewel')) return 'jewelry'
  return 'general'
}

function isMonitorLikeProduct(product: FakeStoreProduct): boolean {
  const text = `${product.title} ${product.description}`.toLowerCase()
  return (
    text.includes('monitor') ||
    text.includes('display') ||
    /\d{2}[-\s]?inch/.test(text) ||
    text.includes('ultrawide')
  )
}

function getElectronicsSizes(product: FakeStoreProduct): SizeOption[] {
  if (isMonitorLikeProduct(product)) return MONITOR_SIZES
  if (product.price >= 100) return STORAGE_SIZES
  return STANDARD_SIZES
}

export function getCategoryVariantProfile(
  product: FakeStoreProduct,
): CategoryVariantProfile {
  const kind = getCategoryKind(product.category)

  switch (kind) {
    case 'clothing':
      return {
        kind,
        labels: { color: 'Colour', size: 'Size' },
        colors: CLOTHING_COLORS,
        sizes: CLOTHING_SIZES,
      }
    case 'electronics':
      return {
        kind,
        labels: {
          color: 'Finish',
          size: isMonitorLikeProduct(product) ? 'Screen size' : 'Configuration',
        },
        colors: ELECTRONICS_FINISH,
        sizes: getElectronicsSizes(product),
      }
    case 'jewelry':
      return {
        kind,
        labels: { color: 'Metal', size: 'Ring size' },
        colors: JEWELRY_METALS,
        sizes: RING_SIZES,
      }
    default:
      return {
        kind,
        labels: { color: 'Option', size: 'Size' },
        colors: GENERAL_COLORS,
        sizes: ONE_SIZE,
      }
  }
}

export function shouldShowSizeSelector(sizes: SizeOption[]): boolean {
  return sizes.length > 1 || sizes[0]?.id !== 'one-size'
}

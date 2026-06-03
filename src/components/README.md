# `src/components`

**Assignment:** Reusable UI components. Keep each file focused — split if a component grows too large.

## Shared UI

| Component | Purpose |
|-----------|---------|
| `Loader` | Reusable spinner + message (`centered`, `inPanel`, `size`) |

## Files in use (Step 5)

| Component | Purpose |
|-----------|---------|
| `SiteHeader` | Nua logo bar |
| `ProductDetailLayout` | 55% gallery / 45% info desktop; stacked mobile (≤767px) |
| `ProductDetailPage` | Fetches product, maps PDP, fills layout placeholders |

## Files in use (Step 6)

| Component / hook | Purpose |
|------------------|---------|
| `ImageGallery` | Main image, thumbnails, active state, mobile scroll + dots |
| `useImageGallery` | Active index state |
| `useMediaQuery` / `useIsMobile` | Mobile-only dot indicator |

## Suggested components (next)

| Area | Examples |
|------|----------|
| Image gallery | Desktop zoom refinements (if needed) |
| Product info | `ProductInfoPanel`, `ColourSwatches`, `SizeSelector`, `QuantityPicker`, `AddToCartButton` |
| Below fold | `ProductDetailsSection`, `SpecificationsTable`, `ReviewCard` |

## Styling

Use **SCSS modules** per component (e.g. `ImageGallery.module.scss`) — no Tailwind, no CSS-in-JS.

## UI states to handle

- Sold out, low stock ("Only 2 left"), loading, error
- Active thumbnail, disabled Add to Cart, quantity min/max vs stock

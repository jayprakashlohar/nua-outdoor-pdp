# `src/components`

**Assignment:** Reusable UI components. Keep each file focused — split if a component grows too large.

## Files in use (Step 5)

| Component | Purpose |
|-----------|---------|
| `SiteHeader` | Nua logo bar |
| `ProductDetailLayout` | 55% gallery / 45% info desktop; stacked mobile (≤767px) |
| `ProductDetailPage` | Fetches product, maps PDP, fills layout placeholders |

## Suggested components (next)

| Area | Examples |
|------|----------|
| Image gallery | `ImageGallery`, `ThumbnailStrip`, `ThumbnailDotIndicator` (mobile) |
| Product info | `ProductInfoPanel`, `ColourSwatches`, `SizeSelector`, `QuantityPicker`, `AddToCartButton` |
| Below fold | `ProductDetailsSection`, `SpecificationsTable`, `ReviewCard` |

## Styling

Use **SCSS modules** per component (e.g. `ImageGallery.module.scss`) — no Tailwind, no CSS-in-JS.

## UI states to handle

- Sold out, low stock ("Only 2 left"), loading, error
- Active thumbnail, disabled Add to Cart, quantity min/max vs stock

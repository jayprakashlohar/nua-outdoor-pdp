# `src/components`

**Assignment:** Reusable UI components. Keep each file focused — split if a component grows too large.

## Suggested components (build in this folder)

| Area | Examples |
|------|----------|
| Image gallery | `ImageGallery`, `ThumbnailStrip`, `ThumbnailDotIndicator` (mobile) |
| Product info | `ProductInfoPanel`, `PriceDisplay`, `ColourSwatches`, `SizeSelector`, `QuantityPicker`, `AddToCartButton`, `DeliveryEstimate` |
| Below fold | `ProductDetailsSection` (tabs or accordion wrapper), `DescriptionPanel`, `SpecificationsTable`, `ReviewCard` |
| Layout | `ProductDetailPage` (page shell), `ProductDetailLayout` (two-column / single-column) |

## Styling

Use **SCSS modules** per component (e.g. `ImageGallery.module.scss`) — no Tailwind, no CSS-in-JS.

## UI states to handle

- Sold out, low stock ("Only 2 left"), loading, error
- Active thumbnail, disabled Add to Cart, quantity min/max vs stock

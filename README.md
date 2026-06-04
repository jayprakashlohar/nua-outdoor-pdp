# Nua Outdoor PDP

Product listing and detail experience for outdoor gear, built with React, Vite, TypeScript, and SCSS modules. Product data comes from the [Fake Store API](https://fakestoreapi.com). Cart and wishlist state persist in `localStorage`.

## Live demo

**https://nua-outdoor-pdp.vercel.app/**

## Setup

Node 18+

```bash
npm install
npm run dev
```

```bash
npm run build
```

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Local dev server         |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |

## Features

- Product grid with search, category filters, price/rating/sort, and pagination
- Product detail page with image gallery, category-specific variants, and tabs
- Cart drawer with stock-aware quantities
- Wishlist page (`/wishlist`)
- INR pricing (converted from API USD)
- URL sync for variant selection on the PDP (`?color=` & `?size=`)

## Notes

- Variant options (colour, size, finish, screen size, etc.) depend on the product category from the API.

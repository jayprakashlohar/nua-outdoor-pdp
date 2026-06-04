# Nua Outdoor PDP

Product listing and detail experience for outdoor gear, built with React, Vite, TypeScript, and SCSS modules. Product data comes from the [Fake Store API](https://fakestoreapi.com). Cart state persists in `localStorage`.

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

## Notes

- Prices are shown in INR (converted from API USD).
- Colour and size selections sync to the URL query string on the product page.
- Lighthouse screenshot: add to `docs/` when ready.

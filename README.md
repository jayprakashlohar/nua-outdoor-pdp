# nua-outdoor-pdp

Premium outdoor gear **product detail page (PDP)** — frontend take-home assignment.

## Stack (required)

| Tool | Choice |
|------|--------|
| Framework | React 18+ (hooks) |
| Build | Vite |
| Language | TypeScript (preferred) |
| Styles | Sass / SCSS modules only |
| Data | [Fake Store API](https://fakestoreapi.com) |
| Persistence | `localStorage` (cart + UI state) |
| Global state | React Context API |

**Not allowed:** Tailwind, CSS-in-JS, class components.

## Setup

**Requirements:** Node 18+

```bash
npm install
npm run dev
```

```bash
npm run build
```

## Project structure

```
nua-outdoor-pdp/
├── DECISIONS.md          # 300–500 words — interview focus (required)
├── README.md             # This file — setup, decisions, trade-offs
├── docs/                 # Lighthouse screenshot(s)
├── tests/                # Unit tests (bonus)
└── src/
    ├── components/       # Reusable UI (gallery, info panel, tabs/accordion, …)
    ├── hooks/            # Shared logic (API, localStorage, variants, …)
    ├── stores/           # Context + cart persistence
    ├── router/           # Routes + URL sync for colour/size
    ├── data/             # Constants, API config, static reviews, mappers
    └── styles/           # Global Sass partials; modules live with components
```

Each folder has a **README** with assignment-aligned guidance.

## Core features checklist

- [ ] Image gallery (thumbnails, active state, mobile scroll + dots, desktop hover zoom)
- [ ] Product info (name, brand, price, sale, swatches, sizes, quantity, Add to Cart, delivery line)
- [ ] Cart persists in `localStorage` after refresh
- [ ] Details section: Description, Specifications, Reviews (tabs or accordion — justify in `DECISIONS.md`)
- [ ] Responsive: 2-column desktop (>767px), single column mobile (≤767px)
- [ ] URL reflects selected colour + size (deep-linkable)

## Deliverables

1. Public GitHub repo (or shared access)
2. `npm run dev` and `npm run build` work on fresh clone
3. `DECISIONS.md` completed honestly
4. Product data from Fake Store API

## Bonus (after core)

- [ ] Deploy (Vercel / Netlify) — add live URL here: _TBD_
- [ ] Unit tests in `/tests`
- [ ] Mock async Add to Cart with loading + random failure

## Design decisions & trade-offs

_Add as you build._

## Known issues

_List any known limitations._

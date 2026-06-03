# `src/stores`

**Assignment:** Global state. Use **React Context API** (justify in `DECISIONS.md`).

## Responsibilities

| Concern | Notes |
|---------|--------|
| Cart | Items, quantities; **persist in `localStorage`**; rehydrate on load |
| Variant selection | Colour + size; sync with **URL** for deep-linking |
| UI state | Any other persistent UI state the spec implies |

## Suggested files

- `CartContext.tsx` — provider + consumer hook (e.g. `useCartContext`)
- `cartStorage.ts` — localStorage keys, serialize/deserialize (can live here or under `src/data`)

Refresh must **not** clear the cart.

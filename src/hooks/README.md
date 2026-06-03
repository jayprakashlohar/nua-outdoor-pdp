# `src/hooks`

**Assignment:** Shared React hooks (logic reused across components).

## Suggested hooks

| Hook | Purpose |
|------|---------|
| `useProduct` | Fetch product from Fake Store API (`https://fakestoreapi.com`) |
| `useLocalStorage` | Read/write persisted cart or UI state |
| `useProductVariant` | Selected colour + size, stock, sale price |
| `useMediaQuery` | Breakpoint at **767px** (mobile ≤767, desktop >767) |
| `useImageGallery` | Active image index, thumbnail selection |
| `useCart` | Optional thin wrapper if not all logic lives in Context |

Keep hooks small and testable where possible (bonus tests target variant/cart behaviour).

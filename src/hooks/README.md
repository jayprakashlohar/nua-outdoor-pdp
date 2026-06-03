# `src/hooks`

**Assignment:** Shared React hooks (logic reused across components).

## Files in use (Step 3)

| Hook | Purpose |
|------|---------|
| `useProduct` | Fetches one product by id; `isLoading`, `error`, `refetch` |

## Suggested hooks (later)

| Hook | Purpose |
|------|---------|
| `useLocalStorage` | Read/write persisted cart or UI state |
| `useProductVariant` | Selected colour + size, stock, sale price |
| `useMediaQuery` | Breakpoint at **767px** (mobile ≤767, desktop >767) |
| `useImageGallery` | Active image index, thumbnail selection |
| `useCart` | Optional thin wrapper if not all logic lives in Context |

Keep hooks small and testable where possible (bonus tests target variant/cart behaviour).

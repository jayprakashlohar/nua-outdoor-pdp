# `src/hooks`

**Assignment:** Shared React hooks (logic reused across components).

## Files in use (Step 3)

| Hook | Purpose |
|------|---------|
| `useProduct` | Fetches one product by id; `isLoading`, `error`, `refetch` |

## Files in use (Step 6)

| Hook | Purpose |
|------|---------|
| `useImageGallery` | Active image index |
| `useMediaQuery` / `useIsMobile` | Breakpoint at **767px** |

## Suggested hooks (later)

| Hook | Purpose |
|------|---------|
| `useLocalStorage` | Read/write persisted cart or UI state |
| `useProductVariant` | Selected colour + size, stock, sale price |
| `useCart` | Optional thin wrapper if not all logic lives in Context |

Keep hooks small and testable where possible (bonus tests target variant/cart behaviour).

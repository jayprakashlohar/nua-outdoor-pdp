# `src/data`

**Assignment:** Local constants, static config, and non-UI data helpers.

## Files in use (Step 2)

| File | Purpose |
|------|---------|
| `api.ts` | Fake Store API base URL, endpoints, `DEFAULT_PRODUCT_ID` |
| `constants.ts` | Breakpoint `767`, localStorage keys, URL params, quantity / low-stock rules |
| `types.ts` | `FakeStoreProduct`, `Review` |
| `mockReviews.ts` | 3 static review cards |
| `deliveryRules.ts` | When to show delivery estimate + placeholder copy |
| `index.ts` | Barrel exports |

## Files in use (Step 4)

| File | Purpose |
|------|---------|
| `productMapper.ts` | `mapFakeStoreToPdp`, variants, stock status, sale pricing |

Product **fetch** lives in `src/hooks` (Step 3).

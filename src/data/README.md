# `src/data`

**Assignment:** Local constants, static config, and non-UI data helpers.

## Suggested contents

| File / area | Purpose |
|-------------|---------|
| `api.ts` | Fake Store API base URL, endpoints |
| `constants.ts` | Breakpoints (`767px`), localStorage keys, max quantity rules |
| `mockReviews.ts` | 2–3 static review cards for Reviews panel |
| `productMapper.ts` | Map API product → colours, sizes, stock, sale flags (API has no variants — your design choice) |
| `deliveryRules.ts` | When to show the delivery estimate line |

Product **fetch** can live in a hook (`src/hooks`); **static** data and config belong here.

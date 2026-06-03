# `src/styles`

**Assignment:** Sass/SCSS — **no Tailwind, no CSS-in-JS.**

## Files in use (Step 1)

| File | Purpose |
|------|---------|
| `_variables.scss` | Nua brand colours (coral `#f67b6d`, cream bg, brown text), breakpoints |
| `_mixins.scss` | `mobile` / `desktop` at 767px, container, focus ring |
| `global.scss` | Reset + `body` — imported in `main.tsx` |
| `../App.module.scss` | Page shell + header (example SCSS module) |

## Later

| File | Purpose |
|------|---------|
| `*.module.scss` | Co-located with components under `src/components` |

## Layout (from spec)

- **Desktop (>767px):** two columns — gallery ~55% left, product info right
- **Mobile (≤767px):** single column; horizontal thumbnail scroll + dot indicator

Use CSS variables or Sass variables consistently so the layout holds when resized.

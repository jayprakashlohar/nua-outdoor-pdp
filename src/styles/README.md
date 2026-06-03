# `src/styles`

**Assignment:** Sass/SCSS — **no Tailwind, no CSS-in-JS.**

## Suggested files

| File | Purpose |
|------|---------|
| `_variables.scss` | Colours, spacing, typography, breakpoints |
| `_mixins.scss` | Media queries, focus rings, truncate text |
| `global.scss` | Reset, base `body`, fonts — import once in `main.tsx` |
| `*.module.scss` | Co-located with components under `src/components` |

## Layout (from spec)

- **Desktop (>767px):** two columns — gallery ~55% left, product info right
- **Mobile (≤767px):** single column; horizontal thumbnail scroll + dot indicator

Use CSS variables or Sass variables consistently so the layout holds when resized.

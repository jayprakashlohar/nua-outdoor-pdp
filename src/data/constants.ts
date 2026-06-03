/** Matches `$breakpoint-mobile-max` in `src/styles/_variables.scss` */
export const BREAKPOINT_MOBILE_MAX_PX = 767

export const QUANTITY_MIN = 1

/** Sizes at or below this count show "Only X left" */
export const LOW_STOCK_THRESHOLD = 2

export const STORAGE_KEYS = {
  cart: 'nua-outdoor-pdp:cart',
} as const

/** URL query params for deep-linking colour + size (Step 10). */
export const URL_PARAMS = {
  color: 'color',
  size: 'size',
} as const

export const GALLERY = {
  /** Mobile dot indicator — one dot per visible thumbnail “page” (tune in gallery step). */
  thumbnailsPerPageMobile: 4,
} as const

export const SEARCH_DEBOUNCE_MS = 300

export const PRODUCTS_PER_PAGE = 8

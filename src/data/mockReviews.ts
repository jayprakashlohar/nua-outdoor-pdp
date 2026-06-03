import type { Review } from './types'

/** Static reviews for the Reviews panel (assignment: 2–3 cards). */
export const MOCK_REVIEWS: Review[] = [
  {
    id: 'review-1',
    author: 'Priya M.',
    rating: 5,
    date: '2026-02-14',
    body: 'Comfortable for long hikes and true to size. The fabric breathes well in warm weather.',
  },
  {
    id: 'review-2',
    author: 'Ananya K.',
    rating: 4,
    date: '2026-01-08',
    body: 'Great quality and colour. Took one star off because delivery was a day later than estimated.',
  },
  {
    id: 'review-3',
    author: 'Rhea S.',
    rating: 5,
    date: '2025-11-22',
    body: 'Worth it — sturdy zippers and pockets where you need them. Would buy another colour.',
  },
]

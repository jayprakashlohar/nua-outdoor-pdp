import { useState } from 'react'
import { MOCK_REVIEWS } from '../../data/mockReviews'
import type { PdpProduct } from '../../data/types'
import styles from './ProductDetailsSection.module.scss'

type TabId = 'description' | 'specifications' | 'reviews'

type ProductDetailsSectionProps = {
  pdp: PdpProduct
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'description', label: 'Description' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'reviews', label: 'Reviews' },
]

export function ProductDetailsSection({ pdp }: ProductDetailsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>('description')

  return (
    <section className={styles.section} aria-label="Product details">
      <div className={styles.tabs} role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.panel} role="tabpanel">
        {activeTab === 'description' && (
          <p className={styles.description}>{pdp.description}</p>
        )}

        {activeTab === 'specifications' && (
          <table className={styles.table}>
            <tbody>
              {pdp.specifications.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'reviews' && (
          <ul className={styles.reviews}>
            {MOCK_REVIEWS.map((review) => (
              <li key={review.id} className={styles.review}>
                <div className={styles.reviewHead}>
                  <span className={styles.reviewAuthor}>{review.author}</span>
                  <span className={styles.reviewRating}>
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </span>
                </div>
                <time className={styles.reviewDate} dateTime={review.date}>
                  {review.date}
                </time>
                <p className={styles.reviewBody}>{review.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

import styles from './Pagination.module.scss'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onPrevious: () => void
  onNext: () => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className={styles.pagination} aria-label="Product pages">
      <button
        type="button"
        className={styles.pageBtn}
        disabled={currentPage <= 1}
        onClick={onPrevious}
        aria-label="Previous page"
      >
        Prev
      </button>

      <ul className={styles.pageList}>
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`${styles.pageBtn} ${page === currentPage ? styles.pageActive : ''}`}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.pageBtn}
        disabled={currentPage >= totalPages}
        onClick={onNext}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  )
}

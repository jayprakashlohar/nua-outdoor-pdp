import styles from './Loader.module.scss'

type LoaderProps = {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  centered?: boolean
  inPanel?: boolean
  className?: string
}

export function Loader({
  message = 'Loading…',
  size = 'md',
  centered = false,
  inPanel = false,
  className = '',
}: LoaderProps) {
  const innerClass = [styles.inner, styles[size], inPanel ? styles.panel : '', className]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <div className={innerClass}>
      <span className={styles.spinner} aria-hidden="true" />
      {message ? <p className={styles.message}>{message}</p> : null}
    </div>
  )

  if (centered) {
    return (
      <div
        className={styles.centeredWrap}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        {inner}
      </div>
    )
  }

  return (
    <div
      className={innerClass}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className={styles.spinner} aria-hidden="true" />
      {message ? <p className={styles.message}>{message}</p> : null}
    </div>
  )
}

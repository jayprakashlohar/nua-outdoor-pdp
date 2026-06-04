import styles from './Loader.module.scss'

type LoaderProps = {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  centered?: boolean
  className?: string
}

export function Loader({
  message = 'Loading…',
  size = 'md',
  centered = false,
  className = '',
}: LoaderProps) {
  const rootClass = [
    centered ? styles.centered : styles.inline,
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass} role="status" aria-live="polite" aria-busy="true">
      <span className={styles.spinner} aria-hidden="true" />
      {message ? <p className={styles.message}>{message}</p> : null}
    </div>
  )
}

import type { ReactNode } from 'react'
import styles from './ProductDetailLayout.module.scss'

type ProductDetailLayoutProps = {
  gallery: ReactNode
  info: ReactNode
}

export function ProductDetailLayout({ gallery, info }: ProductDetailLayoutProps) {
  return (
    <div className={styles.layout}>
      <section className={styles.galleryColumn} aria-label="Product gallery">
        {gallery}
      </section>
      <section className={styles.infoColumn} aria-label="Product information">
        {info}
      </section>
    </div>
  )
}

import { useCallback, useRef } from 'react'
import type { GalleryImage } from '../../data/types'
import { useImageGallery } from '../../hooks/useImageGallery'
import { useIsMobile } from '../../hooks/useMediaQuery'
import styles from './ImageGallery.module.scss'

type ImageGalleryProps = {
  images: GalleryImage[]
}

const THUMB_GAP_PX = 8

export function ImageGallery({ images }: ImageGalleryProps) {
  const { activeIndex, activeImage, selectImage } = useImageGallery(images)
  const isMobile = useIsMobile()
  const thumbStripRef = useRef<HTMLDivElement>(null)

  const scrollThumbIntoView = useCallback((index: number) => {
    const strip = thumbStripRef.current
    if (!strip) return
    const thumb = strip.querySelector<HTMLButtonElement>(
      `[data-thumb-index="${index}"]`,
    )
    thumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [])

  const handleSelect = (index: number) => {
    selectImage(index)
    if (isMobile) scrollThumbIntoView(index)
  }

  const handleThumbScroll = () => {
    const strip = thumbStripRef.current
    if (!strip || strip.children.length === 0) return

    const firstThumb = strip.children[0] as HTMLElement
    const step = firstThumb.offsetWidth + THUMB_GAP_PX
    const index = Math.round(strip.scrollLeft / step)
    selectImage(Math.min(Math.max(index, 0), images.length - 1))
  }

  if (!activeImage) return null

  return (
    <div className={styles.gallery}>
      <div className={styles.mainWrap}>
        <img
          src={activeImage.url}
          alt={activeImage.alt}
          className={styles.mainImage}
          width={560}
          height={560}
        />
      </div>

      <div
        ref={thumbStripRef}
        className={styles.thumbStrip}
        onScroll={isMobile ? handleThumbScroll : undefined}
      >
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            data-thumb-index={index}
            className={`${styles.thumb} ${index === activeIndex ? styles.thumbActive : ''}`}
            onClick={() => handleSelect(index)}
            aria-label={`View image ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <img src={image.url} alt="" className={styles.thumbImage} />
          </button>
        ))}
      </div>

      {isMobile && images.length > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Gallery position">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              role="tab"
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
              aria-label={`Image ${index + 1} of ${images.length}`}
              aria-selected={index === activeIndex}
              onClick={() => handleSelect(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

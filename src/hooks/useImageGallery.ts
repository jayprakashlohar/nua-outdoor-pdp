import { useCallback, useMemo, useState } from 'react'
import type { GalleryImage } from '../data/types'

export function useImageGallery(images: GalleryImage[]) {
  const [activeIndex, setActiveIndex] = useState(0)

  const safeIndex = images.length === 0 ? 0 : Math.min(activeIndex, images.length - 1)

  const activeImage = useMemo(
    () => images[safeIndex] ?? null,
    [images, safeIndex],
  )

  const selectImage = useCallback((index: number) => {
    if (index < 0 || index >= images.length) return
    setActiveIndex(index)
  }, [images.length])

  return {
    activeIndex: safeIndex,
    activeImage,
    selectImage,
  }
}

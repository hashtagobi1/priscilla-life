'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/queries'
import { VideoEmbed } from '@/components/shared/VideoEmbed'
import type { FoodMedia } from '@/lib/sanity/types'

interface MediaLightboxProps {
  media: FoodMedia[]
  initialIndex?: number
  onClose: () => void
}

export function MediaLightbox({ media, initialIndex = 0, onClose }: MediaLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const currentMedia = media[currentIndex]
  const hasNext = currentIndex < media.length - 1
  const hasPrev = currentIndex > 0

  const goToNext = () => {
    if (hasNext) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrev = () => {
    if (hasPrev) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Add keyboard listener
  useEffect(() => {
    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) goToPrev()
      if (e.key === 'ArrowRight' && hasNext) goToNext()
    }
    window.addEventListener('keydown', handleKeyDownGlobal)
    return () => window.removeEventListener('keydown', handleKeyDownGlobal)
  }, [hasPrev, hasNext, onClose, goToPrev, goToNext])

    const imageUrl = currentMedia?.type === 'image' && currentMedia.image
      ? urlFor(currentMedia.image, { width: 1920, height: 1080, quality: 90 })
      : null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
          aria-label="Close lightbox"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Navigation Buttons */}
        {hasPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrev()
            }}
            className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Media Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-7xl w-full h-full flex items-center justify-center p-8"
        >
          {currentMedia?.type === 'image' && imageUrl && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={imageUrl}
                alt={currentMedia.caption || 'Food portfolio image'}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}

                {currentMedia?.type === 'video' && currentMedia.videoUrl && (
                  <div className="relative w-full aspect-video max-w-5xl">
                    <VideoEmbed
                      url={currentMedia.videoUrl}
                      title={currentMedia.caption || 'Food portfolio video'}
                      className="rounded-lg"
                    />
                  </div>
                )}

          {/* Caption */}
          {currentMedia?.caption && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm px-6 py-3 rounded-lg text-white text-center max-w-2xl">
              <p className="text-sm font-light">{currentMedia.caption}</p>
            </div>
          )}

          {/* Media Counter */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            {currentIndex + 1} / {media.length}
          </div>
        </motion.div>

        {/* Thumbnail Strip */}
        {media.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto px-4 pb-2">
            {media.map((item, index) => {
                    const thumbUrl = item.type === 'image' && item.image && item.image.asset?._ref ? urlFor(item.image, { width: 160, height: 160, quality: 75 }) : null
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    index === currentIndex
                      ? 'border-white scale-110'
                      : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  {thumbUrl ? (
                    <Image
                      src={thumbUrl}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : item.type === 'video' ? (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  ) : null}
                </button>
              )
            })}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}


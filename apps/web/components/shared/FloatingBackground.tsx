'use client'

import { useGlobalSettings } from '@/lib/sanity/hooks'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/queries'
import { motion } from 'framer-motion'

export function FloatingBackground() {
  const { data: settings } = useGlobalSettings()
  const backgroundImages = settings?.backgroundImages || []

  if (backgroundImages.length === 0) return null

  const getSizeClass = (size?: string) => {
    switch (size) {
      case 'small':
        return 'w-32 h-32 md:w-40 md:h-40'
      case 'large':
        return 'w-64 h-64 md:w-80 md:h-80'
      default:
        return 'w-48 h-48 md:w-60 md:h-60'
    }
  }

  const getPositionClass = (position?: string) => {
    switch (position) {
      case 'top-left':
        return 'top-10 left-10'
      case 'top-right':
        return 'top-10 right-10'
      case 'bottom-left':
        return 'bottom-10 left-10'
      case 'bottom-right':
        return 'bottom-10 right-10'
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {backgroundImages.map((bgImage, index) => {
        // Handle both direct image object and nested image structure
        const imageObj = bgImage.image
        const imageUrl = imageObj ? urlFor(imageObj, { width: 400, height: 400, quality: 75 }) : null
        
        if (!imageUrl) {
          console.warn('Background image missing URL:', bgImage)
          return null
        }

        const zIndex = bgImage.layer === 'foreground' ? 1 : 0
        const opacity = (bgImage.opacity || 20) / 100

        return (
          <motion.div
            key={bgImage._key || `bg-${index}`}
            className={`absolute ${getPositionClass(bgImage.position)} ${getSizeClass(bgImage.size)}`}
            style={{ zIndex }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity,
              scale: 1,
              x: [0, 10, -10, 0],
              y: [0, -10, 10, 0],
            }}
            transition={{
              duration: 20 + index * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.5,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={imageUrl}
                alt="Background decoration"
                fill
                className="object-contain"
                style={{ opacity }}
                loading="lazy"
                quality={75}
                sizes="(max-width: 768px) 160px, 240px"
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}


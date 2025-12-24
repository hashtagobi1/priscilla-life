'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, UtensilsCrossed, Play, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/queries'
import type { Food } from '@/lib/sanity/types'
import { MediaLightbox } from './MediaLightbox'

interface FoodCardProps {
  food: Food
  index: number
}

export function FoodCard({ food, index }: FoodCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Get first media item for card preview
  const firstMedia = food.media && food.media.length > 0 ? food.media[0] : null
  const firstImageUrl = firstMedia?.type === 'image' && firstMedia.image && firstMedia.image.asset?._ref
    ? urlFor(firstMedia.image, { width: 800, height: 600, quality: 85 })
    : null

  const handleMediaClick = () => {
    if (food.media && food.media.length > 0) {
      setLightboxIndex(0)
      setLightboxOpen(true)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
        whileHover={{ y: -8, scale: 1.01 }}
        className="group overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-border/50 floating floating-hover transition-all duration-300 cursor-pointer"
        onClick={handleMediaClick}
      >
        {firstImageUrl && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative h-64 w-full overflow-hidden"
          >
            {/* @ts-ignore - React 19 type compatibility */}
            <Image
              src={firstImageUrl}
              alt={food.title || 'Food portfolio'}
              fill
              className="object-cover image-zoom"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center"
            >
              <div className="text-white text-center">
                {food.media && food.media.length > 1 && (
                  <div className="flex items-center gap-2">
                    {/* @ts-ignore - React 19 type compatibility */}
                    <ImageIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      View {food.media.length} {food.media.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                )}
                {firstMedia?.type === 'video' && (
                  <div className="flex items-center gap-2">
                    {/* @ts-ignore - React 19 type compatibility */}
                    <Play className="h-5 w-5" />
                    <span className="text-sm font-medium">Play Video</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {firstMedia?.type === 'video' && !firstImageUrl && (
          <div className="relative h-64 w-full bg-muted flex items-center justify-center">
            {/* @ts-ignore - React 19 type compatibility */}
            <Play className="h-12 w-12 text-primary" />
          </div>
        )}

        <div className="p-6">
          <div className="mb-2 flex items-center gap-2">
            {food.eventType && (
              <motion.span
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                      {/* @ts-ignore - React 19 type compatibility */}
                      <UtensilsCrossed className="h-3 w-3" />
                </motion.div>
                {food.eventType}
              </motion.span>
            )}
            {food.date && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.1 }}
                className="flex items-center gap-1 text-xs text-muted-foreground"
              >
                {/* @ts-ignore - React 19 type compatibility */}
                <Calendar className="h-3 w-3" />
                {new Date(food.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                })}
              </motion.span>
            )}
          </div>

          <motion.h3
            whileHover={{ x: 4 }}
            className="mb-2 text-xl font-serif font-medium gradient-text"
          >
            {food.title}
          </motion.h3>
          {food.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 font-light">
              {food.description}
            </p>
          )}

          {food.media && food.media.length > 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ x: 4 }}
              className="mt-4 text-xs text-muted-foreground"
            >
              +{food.media.length - 1} more {food.media.length - 1 === 1 ? 'item' : 'items'}
            </motion.p>
          )}
        </div>
      </motion.div>

      {lightboxOpen && food.media && food.media.length > 0 && (
        <MediaLightbox
          media={food.media}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}


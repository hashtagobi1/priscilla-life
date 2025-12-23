'use client'

import { motion } from 'framer-motion'
import { Calendar, UtensilsCrossed } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/queries'
import type { Food } from '@/lib/sanity/types'

interface FoodCardProps {
  food: Food
  index: number
}

export function FoodCard({ food, index }: FoodCardProps) {
  const firstImage = food.images && food.images[0] ? urlFor(food.images[0]) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-border/50 floating floating-hover transition-all duration-300"
    >
      {firstImage && (
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={firstImage}
            alt={food.title || 'Food portfolio'}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        <div className="mb-2 flex items-center gap-2">
          {food.eventType && (
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <UtensilsCrossed className="h-3 w-3" />
              {food.eventType}
            </span>
          )}
          {food.date && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(food.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              })}
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-serif font-medium">{food.title}</h3>
        {food.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 font-light">
            {food.description}
          </p>
        )}

        {food.images && food.images.length > 1 && (
          <p className="mt-4 text-xs text-muted-foreground">
            +{food.images.length - 1} more image{food.images.length - 1 !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </motion.div>
  )
}


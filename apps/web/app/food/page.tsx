'use client'

import { useFood } from '@/lib/sanity/hooks'
import { FoodCard } from '@/components/food/FoodCard'
import { BookingForm } from '@/components/forms/BookingForm'
import { UtensilsCrossed, ChefHat, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FoodPage() {
  const { data: food, isLoading, error } = useFood()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-center"
        >
          <ChefHat className="h-12 w-12 text-primary" />
        </motion.div>
        <h1 className="mb-6 text-6xl font-serif font-medium md:text-7xl">
          Food & Catering
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-light">
          Culinary excellence for weddings, corporate events, and private
          gatherings
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-center text-destructive">
          <p>Failed to load food portfolio. Please try again later.</p>
        </div>
      )}

      {/* Food Grid */}
      {food && food.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {food.map((item, index) => (
            <FoodCard key={item._id} food={item} index={index} />
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="py-20 text-center text-muted-foreground">
            <UtensilsCrossed className="mx-auto mb-4 h-16 w-16 opacity-50" />
            <p className="text-lg">No food portfolio available yet.</p>
          </div>
        )
      )}

      {/* Inquiry Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-20"
      >
        <div className="mb-8 text-center">
          <Calendar className="mx-auto mb-6 h-12 w-12 text-primary" />
          <h2 className="mb-3 text-3xl font-serif font-medium">Catering Inquiry</h2>
          <p className="text-muted-foreground font-light">
            Fill out the form below to request a quote for your event
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <BookingForm />
        </div>
      </motion.div>
    </div>
  )
}

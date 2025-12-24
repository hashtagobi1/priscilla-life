'use client'

import { motion } from 'framer-motion'
import { Calendar, Quote, ExternalLink } from 'lucide-react'
import { VideoEmbed } from '@/components/shared/VideoEmbed'
import type { Host } from '@/lib/sanity/types'

interface EventCardProps {
  event: Host
  index: number
}

export function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-border/50 floating floating-hover transition-all duration-300"
    >
      {/* Main Content: Description on left, Video on right */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Left: Description and Details */}
        <div className="flex flex-col">
          <motion.h3
            whileHover={{ x: 4 }}
            className="text-2xl font-serif font-medium mb-4 gradient-text"
          >
            {event.title}
          </motion.h3>
          
          {event.eventDate && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                {/* @ts-ignore - React 19 type compatibility */}
                <Calendar className="h-4 w-4" />
              </motion.div>
              <span>
                {new Date(event.eventDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </motion.div>
          )}

          {event.description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.1 }}
              className="text-muted-foreground leading-relaxed"
            >
              {event.description}
            </motion.p>
          )}
        </div>

        {/* Right: Video */}
        {event.videoUrl && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="w-full"
          >
            <VideoEmbed
              url={event.videoUrl}
              title={event.title}
              className="shadow-lg"
            />
          </motion.div>
        )}
      </div>

      {/* Testimonial underneath */}
      {event.testimonial && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          whileHover={{ scale: 1.02, backgroundColor: 'hsl(var(--primary) / 0.08)' }}
          className="rounded-xl bg-primary/5 border border-primary/10 p-6 transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            {/* @ts-ignore - React 19 type compatibility */}
            <Quote className="mb-3 h-5 w-5 text-primary" />
          </motion.div>
          <p className="italic text-foreground/70 font-light leading-relaxed">{event.testimonial}</p>
        </motion.div>
      )}
    </motion.div>
  )
}


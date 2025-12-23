'use client'

import { motion } from 'framer-motion'
import { Calendar, Quote, ExternalLink } from 'lucide-react'
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
      transition={{ delay: index * 0.1 }}
      className="group overflow-hidden rounded-lg bg-secondary/50 p-6 transition-all hover:bg-secondary"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-semibold">{event.title}</h3>
          {event.eventDate && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(event.eventDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          )}
        </div>
      </div>

      {event.description && (
        <p className="mb-4 text-muted-foreground">{event.description}</p>
      )}

      {event.videoUrl && (
        <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <iframe
            src={event.videoUrl.replace('watch?v=', 'embed/')}
            title={event.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {event.testimonial && (
        <div className="rounded-lg bg-primary/5 p-4">
          <Quote className="mb-2 h-5 w-5 text-primary" />
          <p className="italic text-foreground/80">{event.testimonial}</p>
        </div>
      )}
    </motion.div>
  )
}


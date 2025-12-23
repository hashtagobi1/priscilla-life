'use client'

import { useHost, useShowreel } from '@/lib/sanity/hooks'
import { EventCard } from '@/components/host/EventCard'
import { BookingForm } from '@/components/forms/BookingForm'
import { Mic, Video, Calendar, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HostPage() {
  const { data: events, isLoading: eventsLoading } = useHost()
  const { data: showreel, isLoading: showreelLoading } = useShowreel()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-center"
        >
          <Mic className="h-12 w-12 text-primary" />
        </motion.div>
        <h1 className="mb-4 text-5xl font-bold md:text-6xl">
          Host & Presenter
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Professional hosting and presenting services for events, shows, and
          conferences
        </p>
      </div>

      {/* Showreel Section */}
      {showreel && !showreelLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="mb-6 flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-semibold">Showreel</h2>
          </div>
          <div className="overflow-hidden rounded-lg bg-muted">
            {showreel.videoUrl && (
              <div className="aspect-video w-full">
                <iframe
                  src={showreel.videoUrl.replace('watch?v=', 'embed/')}
                  title={showreel.title || 'Showreel'}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
          {showreel.description && (
            <p className="mt-4 text-muted-foreground">{showreel.description}</p>
          )}
        </motion.div>
      )}

      {/* Events Grid */}
      <div className="mb-6 flex items-center gap-2">
        <Calendar className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-semibold">Past Events</h2>
      </div>

      {eventsLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      {events && events.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event, index) => (
            <EventCard key={event._id} event={event} index={index} />
          ))}
        </div>
      ) : (
        !eventsLoading && (
          <div className="py-20 text-center text-muted-foreground">
            <Mic className="mx-auto mb-4 h-16 w-16 opacity-50" />
            <p className="text-lg">No events available yet.</p>
          </div>
        )
      )}

      {/* Booking Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16"
      >
        <div className="mb-6 text-center">
          <Star className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="mb-2 text-2xl font-semibold">Book Priscilla</h2>
          <p className="text-muted-foreground">
            Fill out the form below to discuss your hosting needs
          </p>
        </div>
        <BookingForm />
      </motion.div>
    </div>
  )
}

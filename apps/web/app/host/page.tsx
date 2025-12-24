'use client'

import { useHost, useShowreel } from '@/lib/sanity/hooks'
import { EventCard } from '@/components/host/EventCard'
import { BookingForm } from '@/components/forms/BookingForm'
import { VideoEmbed } from '@/components/shared/VideoEmbed'
import { Mic, Video, Calendar, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HostPage() {
  const { data: events, isLoading: eventsLoading } = useHost()
  const { data: showreel, isLoading: showreelLoading } = useShowreel()

  return (
    <div className="container mx-auto px-4 py-12" data-theme="host">
      {/* Header */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-center"
        >
          <Mic className="h-12 w-12 text-primary" />
        </motion.div>
        <h1 className="mb-6 text-6xl font-serif font-medium md:text-7xl">
          Host & Presenter
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-light">
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
          
          {/* Detect if video is vertical (TikTok) or horizontal (YouTube) */}
          {(() => {
            const isVertical = showreel.videoUrl?.includes('tiktok.com')
            const isHorizontal = showreel.videoUrl?.includes('youtube.com') || showreel.videoUrl?.includes('youtu.be') || showreel.videoUrl?.includes('vimeo.com')
            
            if (isVertical) {
              // Vertical video: Description on left, video on right
              return (
                <div className="grid md:grid-cols-2 gap-6 rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-border/50 floating">
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-serif font-medium mb-4 gradient-text">
                      {showreel.title || 'Showreel'}
                    </h3>
                    {showreel.description && (
                      <p className="text-muted-foreground leading-relaxed">
                        {showreel.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    {showreel.videoUrl && (
                      <VideoEmbed
                        url={showreel.videoUrl}
                        title={showreel.title || 'Showreel'}
                        className="shadow-lg"
                      />
                    )}
                  </div>
                </div>
              )
            } else {
              // Horizontal video: Video on top, description below
              return (
                <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-border/50 floating">
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif font-medium mb-4 gradient-text">
                      {showreel.title || 'Showreel'}
                    </h3>
                    {showreel.description && (
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {showreel.description}
                      </p>
                    )}
                  </div>
                  <div className="overflow-hidden rounded-lg bg-muted">
                    {showreel.videoUrl && (
                      <VideoEmbed
                        url={showreel.videoUrl}
                        title={showreel.title || 'Showreel'}
                      />
                    )}
                  </div>
                </div>
              )
            }
          })()}
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
        className="mt-20"
      >
        <div className="mb-8 text-center">
          <Star className="mx-auto mb-6 h-12 w-12 text-primary" />
          <h2 className="mb-3 text-3xl font-serif font-medium">Book Priscilla</h2>
          <p className="text-muted-foreground font-light">
            Fill out the form below to discuss your hosting needs
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <BookingForm />
        </div>
      </motion.div>
    </div>
  )
}

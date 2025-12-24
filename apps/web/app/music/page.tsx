'use client'

import { useMusic } from '@/lib/sanity/hooks'
import { MusicCard } from '@/components/music/MusicCard'
import { Music, Headphones, Radio } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MusicPage() {
  const { data: music, isLoading, error } = useMusic()

  return (
    <div className="container mx-auto px-4 py-12" data-theme="music">
      {/* Header */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-center"
        >
          {/* @ts-ignore - React 19 type compatibility */}
          <Music className="h-12 w-12 text-primary" />
        </motion.div>
        <h1 className="mb-6 text-6xl font-serif font-medium md:text-7xl">Music</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-light">
          Discover Priscilla's musical journey through her latest releases and
          streaming platforms
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
          <p>Failed to load music. Please try again later.</p>
        </div>
      )}

      {/* Music Grid */}
      {music && music.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {music.map((track, index) => (
            <MusicCard key={track._id} music={track} index={index} />
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="py-20 text-center text-muted-foreground">
            {/* @ts-ignore - React 19 type compatibility */}
            <Headphones className="mx-auto mb-4 h-16 w-16 opacity-50" />
            <p className="text-lg">No music available yet.</p>
            <p className="text-sm">Check back soon for new releases!</p>
          </div>
        )
      )}

      {/* Streaming Platforms Section */}
      <div className="mt-20 rounded-2xl bg-white/60 backdrop-blur-sm border border-border/50 p-12 text-center floating">
        {/* @ts-ignore - React 19 type compatibility */}
        <Radio className="mx-auto mb-6 h-12 w-12 text-primary" />
        <h2 className="mb-4 text-3xl font-serif font-medium">Stream Everywhere</h2>
        <p className="mb-8 text-muted-foreground font-light">
          Find Priscilla's music on all major streaming platforms
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {['Spotify', 'Apple Music', 'YouTube', 'SoundCloud'].map(
            (platform, idx) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-secondary/50 px-6 py-3 font-medium text-sm border border-border/30 cursor-pointer floating-hover"
              >
                {platform}
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

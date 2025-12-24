'use client'

import { motion } from 'framer-motion'
import { Play, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/queries'
import type { Music } from '@/lib/sanity/types'

interface MusicCardProps {
  music: Music
  index: number
}

export function MusicCard({ music, index }: MusicCardProps) {
  const imageUrl = music.coverImage ? urlFor(music.coverImage) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-6 border border-border/50 floating floating-hover transition-all duration-300 cursor-pointer"
    >
      {imageUrl && (
        <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            <Image
              src={imageUrl}
              alt={music.title || 'Album cover'}
              fill
              className="object-cover image-zoom"
            />
          </motion.div>
          {music.audioUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <motion.button
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-primary p-4 text-primary-foreground shadow-lg btn-interactive"
              >
                <Play className="h-6 w-6 fill-current" />
              </motion.button>
            </motion.div>
          )}
        </div>
      )}

      <div>
        <motion.h3
          whileHover={{ x: 4 }}
          className="text-xl font-serif font-medium mb-1 gradient-text"
        >
          {music.title}
        </motion.h3>
        <p className="text-muted-foreground text-sm font-light">{music.artist}</p>

        {music.streamingLinks && music.streamingLinks.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {music.streamingLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary transition-all hover:bg-primary hover:text-primary-foreground btn-interactive"
              >
                {link.platform}
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.2 }}
                >
                  <ExternalLink className="h-3 w-3" />
                </motion.span>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}


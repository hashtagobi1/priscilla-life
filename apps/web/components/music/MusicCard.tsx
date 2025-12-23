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
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg bg-secondary/50 p-6 transition-all hover:bg-secondary"
    >
      {imageUrl && (
        <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={music.title || 'Album cover'}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {music.audioUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <button className="rounded-full bg-primary p-4 text-primary-foreground transition-transform hover:scale-110">
                <Play className="h-6 w-6 fill-current" />
              </button>
            </div>
          )}
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold">{music.title}</h3>
        <p className="text-muted-foreground">{music.artist}</p>

        {music.streamingLinks && music.streamingLinks.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {music.streamingLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {link.platform}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}


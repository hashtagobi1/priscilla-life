'use client'

import { motion } from 'framer-motion'
import { useGlobalSettings } from '@/lib/sanity/hooks'
import { VideoBackground } from '@/components/shared/VideoBackground'
import { BrandsBanner } from '@/components/shared/BrandsBanner'

export default function HomePage() {
  const { data: settings } = useGlobalSettings()

  return (
    <div className="min-h-screen flex flex-col relative">
      <VideoBackground />
      <div className="flex-1 flex items-center justify-center px-4 py-20 relative z-10">
        <div className="text-center space-y-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif font-medium mb-6 text-foreground">
              Priscilla Dina Toko
            </h1>
          </motion.div>

          {settings?.bio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed">
                {settings.bio}
              </p>
            </motion.div>
          )}
        </div>
      </div>
      <BrandsBanner />
    </div>
  )
}



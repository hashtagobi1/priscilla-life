'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useGlobalSettings } from '@/lib/sanity/hooks'

export default function HomePage() {
  const { data: settings } = useGlobalSettings()
  const domains = [
    { href: '/music', label: 'Music', emoji: '🎵' },
    { href: '/host', label: 'Host', emoji: '🎤' },
    { href: '/food', label: 'Food', emoji: '🍽️' },
    { href: '/social', label: 'Social', emoji: '📱' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center space-y-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-8xl font-serif font-medium mb-6 text-foreground">
            Priscilla Dina Toko
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
            Music • Host • Food • Social
          </p>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {domains.map((domain, index) => (
            <Link
              key={domain.href}
              href={domain.href}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="floating floating-hover rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 3,
                    delay: index * 0.2
                  }}
                  className="text-4xl mb-3"
                >
                  {domain.emoji}
                </motion.div>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="text-lg font-medium text-foreground group-hover:text-primary transition-colors"
                >
                  {domain.label}
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
}



'use client'

import { useSocial } from '@/lib/sanity/hooks'
import { Instagram, TrendingUp, Users, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/queries'

const platformIcons: Record<string, any> = {
  Instagram: Instagram,
  TikTok: TrendingUp,
}

export default function SocialPage() {
  const { data: social, isLoading, error } = useSocial()

  return (
    <div className="container mx-auto px-4 py-12" data-theme="social">
      {/* Header */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-center"
        >
          {/* @ts-ignore - React 19 type compatibility */}
          <Users className="h-12 w-12 text-primary" />
        </motion.div>
        <h1 className="mb-6 text-6xl font-serif font-medium md:text-7xl">Social</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-light">
          Connect with Priscilla across all social media platforms
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
          <p>Failed to load social media data. Please try again later.</p>
        </div>
      )}

      {/* Social Platforms */}
      {social && social.length > 0 ? (
        <div className="space-y-8">
          {social.map((platform, index) => {
            const Icon = platformIcons[platform.platform] || Users
            return (
              <motion.div
                key={platform._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white/80 backdrop-blur-sm border border-border/50 p-10 floating"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif font-medium">
                        {platform.platform}
                      </h2>
                      {platform.handle && (
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline transition-colors"
                        >
                          {platform.handle}
                        </a>
                      )}
                      {platform.followers && platform.followers > 0 && (
                        <p className="text-muted-foreground mt-1">
                          {platform.followers.toLocaleString()} followers
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                {platform.achievements && platform.achievements.length > 0 && (
                  <div className="mb-6">
                    <div className="mb-3 flex items-center gap-2">
                      {/* @ts-ignore - React 19 type compatibility */}
                      <Award className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Achievements</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                    {platform.achievements.map((achievement, idx) => {
                      // Handle both string and object formats
                      const achievementText = typeof achievement === 'string' ? achievement : achievement.value
                      const achievementKey = typeof achievement === 'string' ? `achievement-${idx}` : achievement._key || `achievement-${idx}`
                      return (
                        <motion.span
                          key={achievementKey}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm text-primary font-light cursor-default"
                        >
                          {achievementText}
                        </motion.span>
                      )
                    })}
                    </div>
                  </div>
                )}

                {/* Recent Posts */}
                {platform.recentPosts && platform.recentPosts.length > 0 && (
                  <div>
                    <h3 className="mb-4 font-semibold">Recent Posts</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      {platform.recentPosts.map((post, idx) => {
                        const imageUrl = post.image ? urlFor(post.image, { width: 600, height: 600, quality: 85 }) : null
                        return (
                          <motion.a
                            key={idx}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            className="group overflow-hidden rounded-lg bg-background floating border border-border/30"
                          >
                            {imageUrl && (
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                className="relative aspect-square w-full overflow-hidden"
                              >
                                {/* @ts-ignore - React 19 type compatibility */}
                                <Image
                                  src={imageUrl}
                                  alt={post.caption || 'Social media post'}
                                  fill
                                  className="object-cover image-zoom"
                                />
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end"
                                >
                                  <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    whileHover={{ y: 0, opacity: 1 }}
                                    className="p-3 text-sm text-white font-medium"
                                  >
                                    View Post →
                                  </motion.p>
                                </motion.div>
                              </motion.div>
                            )}
                            {post.caption && (
                              <p className="p-3 text-sm text-muted-foreground line-clamp-2">
                                {post.caption}
                              </p>
                            )}
                          </motion.a>
                        )
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      ) : (
        !isLoading && (
          <div className="py-20 text-center text-muted-foreground">
            {/* @ts-ignore - React 19 type compatibility */}
            <Users className="mx-auto mb-4 h-16 w-16 opacity-50" />
            <p className="text-lg">No social media data available yet.</p>
          </div>
        )
      )}
    </div>
  )
}

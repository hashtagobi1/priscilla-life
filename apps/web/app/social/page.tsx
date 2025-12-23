'use client'

import { useSocial } from '@/lib/sanity/hooks'
import { Instagram, Twitter, TrendingUp, Users, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/queries'

const platformIcons: Record<string, any> = {
  Instagram: Instagram,
  Twitter: Twitter,
  TikTok: TrendingUp,
}

export default function SocialPage() {
  const { data: social, isLoading, error } = useSocial()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-center"
        >
          <Users className="h-12 w-12 text-primary" />
        </motion.div>
        <h1 className="mb-4 text-5xl font-bold md:text-6xl">Social</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
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
                className="rounded-lg bg-secondary/50 p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">
                        {platform.platform}
                      </h2>
                      {platform.followers && (
                        <p className="text-muted-foreground">
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
                      <Award className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Achievements</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {platform.achievements.map((achievement, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Posts */}
                {platform.recentPosts && platform.recentPosts.length > 0 && (
                  <div>
                    <h3 className="mb-4 font-semibold">Recent Posts</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      {platform.recentPosts.map((post, idx) => {
                        const imageUrl = post.image ? urlFor(post.image) : null
                        return (
                          <a
                            key={idx}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group overflow-hidden rounded-lg bg-background transition-transform hover:scale-105"
                          >
                            {imageUrl && (
                              <div className="relative aspect-square w-full">
                                <Image
                                  src={imageUrl}
                                  alt={post.caption || 'Social media post'}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            {post.caption && (
                              <p className="p-3 text-sm text-muted-foreground line-clamp-2">
                                {post.caption}
                              </p>
                            )}
                          </a>
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
            <Users className="mx-auto mb-4 h-16 w-16 opacity-50" />
            <p className="text-lg">No social media data available yet.</p>
          </div>
        )
      )}
    </div>
  )
}

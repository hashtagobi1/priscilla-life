'use client'

import { useGlobalSettings } from '@/lib/sanity/hooks'
import { Instagram } from 'lucide-react'
import { motion } from 'framer-motion'

// TikTok icon component (lucide-react doesn't have TikTok)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

const socialIcons: Record<string, any> = {
  Instagram: Instagram,
  TikTok: TikTokIcon,
}

export function Footer() {
  const { data: settings, isLoading } = useGlobalSettings()

  // Get all social links (should only be Instagram and TikTok now)
  const footerSocials = settings?.socialLinks || []

  return (
    <footer className="border-t border-border/50 mt-auto py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-muted-foreground font-light">
              &copy; {new Date().getFullYear()} Priscilla Dina Toko. All rights reserved.
            </p>
            <motion.a
              href="http://lightwave-agency.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              className="text-xs text-muted-foreground hover:text-primary transition-colors font-light"
            >
              Made by LightWave
            </motion.a>
          </div>
          
          {!isLoading && footerSocials.length > 0 && (
            <div className="flex items-center gap-4">
              {footerSocials.map((social, index) => {
                const Icon = socialIcons[social.platform]
                if (!Icon || !social.url) return null
                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label={`Follow on ${social.platform}`}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}



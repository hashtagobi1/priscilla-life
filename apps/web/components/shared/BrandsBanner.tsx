'use client'

import { useBrands } from '@/lib/sanity/hooks'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/queries'
import { motion } from 'framer-motion'

export function BrandsBanner() {
  const { data: brands, isLoading } = useBrands()

  if (isLoading || !brands || brands.length === 0) return null

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands]

  return (
    <div className="relative w-full overflow-hidden py-12 bg-muted/30 border-y border-border/30">
      <div className="container mx-auto px-6 mb-6">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-center text-foreground mb-2">
          Brands Worked With
        </h2>
        <p className="text-sm md:text-base text-muted-foreground text-center font-light">
          Trusted by leading brands and organizations
        </p>
      </div>
      <div className="flex items-center gap-12 animate-scroll hover:[animation-play-state:paused]">
        {duplicatedBrands.map((brand, index) => {
          const logoUrl = brand.logo ? urlFor(brand.logo, { width: 200, height: 100, quality: 80 }) : null
          if (!logoUrl) return null

          return (
            <motion.div
              key={`${brand._id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0"
            >
              {brand.url ? (
                <a
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                >
                  <div className="relative w-32 h-16 md:w-40 md:h-20">
                    {/* @ts-ignore - React 19 type compatibility */}
                    <Image
                      src={logoUrl}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>
              ) : (
                <div className="relative w-32 h-16 md:w-40 md:h-20">
                  {/* @ts-ignore - React 19 type compatibility */}
                  <Image
                    src={logoUrl}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}


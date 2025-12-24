'use client'

import { useMemo } from 'react'

interface VideoEmbedProps {
  url: string
  title?: string
  className?: string
}

export function VideoEmbed({ url, title = 'Video', className = '' }: VideoEmbedProps) {
  const embedUrl = useMemo(() => {
    if (!url) return null

    // Check if it's a YouTube URL
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Handle YouTube URLs
      let videoId = ''
      
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('watch?v=')[1]?.split('&')[0] || ''
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('embed/')[1]?.split('?')[0] || ''
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
      }
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }
    
    // Check if it's a TikTok URL
    if (url.includes('tiktok.com')) {
      // Extract video ID from TikTok URL
      // TikTok URL formats:
      // - https://www.tiktok.com/@username/video/{videoId}
      // - https://tiktok.com/@username/video/{videoId}
      // - https://vm.tiktok.com/{shortCode} (needs to be resolved to full URL)
      
      let videoId = ''
      
      // Handle standard TikTok video URLs - extract the numeric video ID
      // Pattern: /video/ followed by numbers
      const videoMatch = url.match(/\/video\/(\d+)/)
      if (videoMatch && videoMatch[1]) {
        videoId = videoMatch[1]
      } else {
        // Try alternative patterns
        // Some TikTok URLs might have query parameters
        const altMatch = url.match(/\/video\/(\d+)(?:\?|$)/)
        if (altMatch && altMatch[1]) {
          videoId = altMatch[1]
        }
      }
      
      if (videoId) {
        // TikTok embed format: https://www.tiktok.com/embed/v2/{videoId}
        return `https://www.tiktok.com/embed/v2/${videoId}`
      } else if (url.includes('vm.tiktok.com')) {
        // For short links, we can't directly embed them
        // Return a message or try to use the short code (may not work)
        console.warn('TikTok short links (vm.tiktok.com) need to be resolved to full URLs for embedding')
        return null
      }
    }
    
    // If we can't determine the platform, return null
    return null
  }, [url])

  if (!embedUrl) {
    return (
      <div className={`aspect-video w-full bg-muted flex items-center justify-center rounded-lg ${className}`}>
        <p className="text-muted-foreground text-sm">Unable to load video</p>
      </div>
    )
  }

  const isTikTok = embedUrl.includes('tiktok.com')

  // For TikTok videos, use vertical aspect ratio (9:16)
  const isTikTokVideo = embedUrl?.includes('tiktok.com')
  const aspectClass = isTikTokVideo 
    ? 'aspect-[9/16] max-w-sm mx-auto' 
    : 'aspect-video'

  return (
    <div className={`${aspectClass} w-full overflow-hidden rounded-lg ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          // TikTok embeds need specific styling
          ...(isTikTok && {
            border: 'none',
            overflow: 'hidden',
          }),
        }}
      />
    </div>
  )
}


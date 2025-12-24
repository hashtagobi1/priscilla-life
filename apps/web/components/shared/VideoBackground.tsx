'use client'

import { useGlobalSettings } from '@/lib/sanity/hooks'
import { urlFor } from '@/lib/sanity/queries'

export function VideoBackground() {
  const { data: settings } = useGlobalSettings()
  const backgroundVideo = settings?.backgroundVideo

  if (!backgroundVideo?.videoUrl) return null

  const opacity = (backgroundVideo.opacity || 30) / 100
  const posterUrl = backgroundVideo.posterImage ? urlFor(backgroundVideo.posterImage) : null

  // Extract video ID for YouTube loop
  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = ''
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0] || ''
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
    }
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`
    }
    return null
  }

  // Get TikTok embed URL
  const getTikTokEmbedUrl = (url: string) => {
    const videoMatch = url.match(/\/video\/(\d+)/)
    if (videoMatch && videoMatch[1]) {
      return `https://www.tiktok.com/embed/v2/${videoMatch[1]}`
    }
    return null
  }

  // Get Vimeo embed URL
  const getVimeoEmbedUrl = (url: string) => {
    const videoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (videoMatch && videoMatch[1]) {
      return `https://player.vimeo.com/video/${videoMatch[1]}?autoplay=1&muted=1&loop=1&background=1`
    }
    return null
  }

  const isYouTube = backgroundVideo.videoUrl.includes('youtube.com') || backgroundVideo.videoUrl.includes('youtu.be')
  const isTikTok = backgroundVideo.videoUrl.includes('tiktok.com')
  const isVimeo = backgroundVideo.videoUrl.includes('vimeo.com')

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Video Background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
      >
        {isYouTube ? (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              transform: 'scale(1.15)',
              transformOrigin: 'center',
            }}
          >
            <iframe
              src={getYouTubeEmbedUrl(backgroundVideo.videoUrl) || ''}
              className="absolute inset-0 w-full h-full"
              style={{ 
                objectFit: 'cover',
                pointerEvents: 'none',
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        ) : isTikTok ? (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              transform: 'scale(1.15)',
              transformOrigin: 'center',
            }}
          >
            <iframe
              src={getTikTokEmbedUrl(backgroundVideo.videoUrl) || ''}
              className="absolute inset-0 w-full h-full"
              style={{ 
                objectFit: 'cover',
                pointerEvents: 'none',
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        ) : isVimeo ? (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              transform: 'scale(1.15)',
              transformOrigin: 'center',
            }}
          >
            <iframe
              src={getVimeoEmbedUrl(backgroundVideo.videoUrl) || ''}
              className="absolute inset-0 w-full h-full"
              style={{ 
                objectFit: 'cover',
                pointerEvents: 'none',
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        ) : (
          // Direct video file
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: 'scale(1.15)',
              objectPosition: 'center',
            }}
            poster={posterUrl || undefined}
          >
            <source src={backgroundVideo.videoUrl} type="video/mp4" />
            <source src={backgroundVideo.videoUrl} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      
      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 pointer-events-none" />
    </div>
  )
}

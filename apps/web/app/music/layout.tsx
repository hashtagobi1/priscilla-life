import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Music - Priscilla Dina Toko',
  description: 'Explore Priscilla\'s music collection, albums, singles, and streaming links. Listen to her latest releases on Spotify, Apple Music, and more.',
  openGraph: {
    title: 'Music - Priscilla Dina Toko',
    description: 'Explore Priscilla\'s music collection and streaming links',
    type: 'website',
  },
}

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


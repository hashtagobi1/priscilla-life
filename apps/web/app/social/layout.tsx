import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Social Media - Priscilla Dina Toko',
  description: 'Connect with Priscilla across all social media platforms. Follow for updates on music, food, hosting, and more.',
  openGraph: {
    title: 'Social Media - Priscilla Dina Toko',
    description: 'Connect with Priscilla on social media',
    type: 'website',
  },
}

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


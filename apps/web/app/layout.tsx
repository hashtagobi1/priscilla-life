import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { PageTransition } from '@/components/transitions/PageTransition'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Priscilla Dina Toko - Music • Host • Food • Social',
    template: '%s | Priscilla Dina Toko',
  },
  description: 'Welcome to Priscilla Dina Toko\'s world - Music, Hosting, Food, and Social Media',
  keywords: ['Priscilla Dina Toko', 'music', 'host', 'presenter', 'chef', 'catering', 'social media'],
  authors: [{ name: 'Priscilla Dina Toko' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Priscilla Dina Toko',
    title: 'Priscilla Dina Toko - Music • Host • Food • Social',
    description: 'Welcome to Priscilla Dina Toko\'s world',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Priscilla Dina Toko',
    description: 'Music • Host • Food • Social',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <QueryProvider>
          <Navigation />
          <main className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}



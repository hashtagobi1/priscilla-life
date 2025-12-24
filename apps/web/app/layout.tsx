import type { Metadata } from 'next'
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
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
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



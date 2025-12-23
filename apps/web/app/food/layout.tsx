import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Food & Catering - Priscilla Dina Toko',
  description: 'Culinary excellence for weddings, corporate events, and private gatherings. Request a catering quote for your next event.',
  openGraph: {
    title: 'Food & Catering - Priscilla Dina Toko',
    description: 'Culinary excellence for events and gatherings',
    type: 'website',
  },
}

export default function FoodLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


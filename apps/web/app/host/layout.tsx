import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Host & Presenter - Priscilla Dina Toko',
  description: 'Professional hosting and presenting services for events, shows, and conferences. Book Priscilla for your next event.',
  openGraph: {
    title: 'Host & Presenter - Priscilla Dina Toko',
    description: 'Professional hosting and presenting services',
    type: 'website',
  },
}

export default function HostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


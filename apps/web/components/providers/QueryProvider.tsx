'use client'

import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes (content rarely changes)
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime in v4)
            refetchOnWindowFocus: false,
            refetchOnMount: false, // Don't refetch if data exists
          },
        },
      })
  )

  return (
    // @ts-ignore - React 19 type compatibility
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}


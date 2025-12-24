// Simple in-memory rate limiter
// For production, consider using Redis or Vercel Edge Config

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 5 // Max 5 requests per window

export async function rateLimit(
  request: Request,
  identifier?: string
): Promise<{ success: boolean; remaining?: number; reset?: number }> {
  // Get identifier from IP or custom identifier
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown'
  const key = identifier || ip
  const now = Date.now()

  // Clean up old entries
  Object.keys(store).forEach((k) => {
    if (store[k].resetTime < now) {
      delete store[k]
    }
  })

  // Check or create entry
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
    return {
      success: true,
      remaining: MAX_REQUESTS - 1,
      reset: store[key].resetTime,
    }
  }

  // Increment count
  store[key].count++

  if (store[key].count > MAX_REQUESTS) {
    return {
      success: false,
      remaining: 0,
      reset: store[key].resetTime,
    }
  }

  return {
    success: true,
    remaining: MAX_REQUESTS - store[key].count,
    reset: store[key].resetTime,
  }
}


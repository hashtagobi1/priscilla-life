import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { escapeHtml } from '@/lib/sanitize'

const resend = new Resend(process.env.RESEND_API_KEY)

// Validation schema
const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20, 'Phone number too long').optional(),
  eventType: z.string().min(1, 'Event type is required'),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  guestCount: z.string().max(10).optional(),
  budget: z.string().max(50).optional(),
  message: z.string().max(1000, 'Message too long').optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          reset: rateLimitResult.reset,
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '900', // 15 minutes in seconds
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.reset?.toString() || '',
          },
        }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validated = bookingSchema.parse(body)

    // Sanitize all user input
    const sanitized = {
      name: escapeHtml(validated.name),
      email: escapeHtml(validated.email),
      phone: validated.phone ? escapeHtml(validated.phone) : 'Not provided',
      eventType: escapeHtml(validated.eventType),
      eventDate: escapeHtml(validated.eventDate),
      guestCount: validated.guestCount ? escapeHtml(validated.guestCount) : 'Not specified',
      budget: validated.budget ? escapeHtml(validated.budget) : 'Not specified',
      message: validated.message ? escapeHtml(validated.message) : 'No message provided',
    }

    // Validate environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error('CONTACT_EMAIL is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Priscilla Life <noreply@priscilla.life>',
      to: process.env.CONTACT_EMAIL,
      subject: `New Booking Inquiry: ${sanitized.eventType}`,
      html: `
        <h2>New Booking Inquiry</h2>
        <p><strong>Name:</strong> ${sanitized.name}</p>
        <p><strong>Email:</strong> ${sanitized.email}</p>
        <p><strong>Phone:</strong> ${sanitized.phone}</p>
        <p><strong>Event Type:</strong> ${sanitized.eventType}</p>
        <p><strong>Event Date:</strong> ${sanitized.eventDate}</p>
        <p><strong>Guest Count:</strong> ${sanitized.guestCount}</p>
        <p><strong>Prospective Budget:</strong> ${sanitized.budget}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitized.message}</p>
      `,
      reply_to: validated.email, // Use original email for reply-to (not sanitized)
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        data,
        rateLimit: {
          remaining: rateLimitResult.remaining,
          reset: rateLimitResult.reset,
        },
      },
      {
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining?.toString() || '0',
          'X-RateLimit-Reset': rateLimitResult.reset?.toString() || '',
        },
      }
    )
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      )
    }

    // Generic error handling
    console.error('Booking API error:', error)
    const errorMessage = process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}


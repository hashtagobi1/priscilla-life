'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'

interface BookingFormData {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  guestCount: string
  budget: string
  message: string
}

export function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          guestCount: '',
          budget: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-border/50 p-8 floating"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-light"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-light"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-light"
          />
        </div>

        <div>
          <label htmlFor="eventType" className="mb-2 block text-sm font-medium">
            Event Type *
          </label>
          <select
            id="eventType"
            required
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
            className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-light"
          >
            <option value="">Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate</option>
            <option value="private">Private Event</option>
            <option value="charity">Charity</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="eventDate" className="mb-2 block text-sm font-medium">
            Event Date *
          </label>
          <input
            type="date"
            id="eventDate"
            required
            value={formData.eventDate}
            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
            className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-light"
          />
        </div>

        <div>
          <label htmlFor="guestCount" className="mb-2 block text-sm font-medium">
            Guest Count
          </label>
          <input
            type="number"
            id="guestCount"
            min="1"
            value={formData.guestCount}
            onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
            className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-light"
          />
        </div>

        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium">
            Prospective Budget
          </label>
          <input
            type="text"
            id="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            placeholder="e.g., $5,000 - $10,000"
            className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-light"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Tell us about your event..."
        />
      </div>

      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="rounded-lg bg-green-500/10 p-4 text-green-600 border border-green-500/20"
          >
            Thank you! Your inquiry has been sent successfully.
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="rounded-lg bg-destructive/10 p-4 text-destructive border border-destructive/20"
          >
            Something went wrong. Please try again.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:hover:scale-100 floating btn-interactive"
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              {/* @ts-ignore - React 19 type compatibility */}
              <Loader2 className="h-4 w-4" />
            </motion.div>
            Sending...
          </>
        ) : (
          <>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {/* @ts-ignore - React 19 type compatibility */}
              <Send className="h-4 w-4" />
            </motion.span>
            Send Inquiry
          </>
        )}
      </motion.button>
    </motion.form>
  )
}


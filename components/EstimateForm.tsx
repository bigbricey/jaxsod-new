'use client'

import { useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'

export default function EstimateForm() {
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return

    setStatus('submitting')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          notes: form.notes.trim() || undefined,
          website: form.website.trim(),
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', phone: '', address: '', notes: '', website: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border-2 border-[#22c55e] rounded-[20px] p-8 text-center bg-[rgba(15,25,15,0.6)] backdrop-blur-[20px]">
        <FiCheckCircle className="text-5xl text-[#22c55e] mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
        <p className="text-[rgba(200,230,200,0.5)]">
          The Jax Sod team will reach out shortly to schedule your free estimate.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-[rgba(34,197,94,0.15)] rounded-[20px] p-8 bg-[rgba(15,25,15,0.6)] backdrop-blur-[20px]">
      <h3 className="text-2xl font-bold mb-2">Request a Free Estimate</h3>
      <p className="text-[rgba(200,230,200,0.5)] mb-6">
        Fill out the form and we&apos;ll get back to you within 1-2 hours during business hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="est-name" className="block text-sm font-semibold text-[#e8f5e8] mb-1">
            Name *
          </label>
          <input
            id="est-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full border border-[rgba(34,197,94,0.15)] rounded-lg px-4 py-3 bg-[rgba(10,15,10,0.8)] text-[#e8f5e8] focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] placeholder-[rgba(200,230,200,0.3)]"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="est-phone" className="block text-sm font-semibold text-[#e8f5e8] mb-1">
            Phone *
          </label>
          <input
            id="est-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full border border-[rgba(34,197,94,0.15)] rounded-lg px-4 py-3 bg-[rgba(10,15,10,0.8)] text-[#e8f5e8] focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] placeholder-[rgba(200,230,200,0.3)]"
            placeholder="(904) 555-1234"
          />
        </div>

        <div>
          <label htmlFor="est-address" className="block text-sm font-semibold text-[#e8f5e8] mb-1">
            Property Address
          </label>
          <input
            id="est-address"
            type="text"
            value={form.address}
            onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
            className="w-full border border-[rgba(34,197,94,0.15)] rounded-lg px-4 py-3 bg-[rgba(10,15,10,0.8)] text-[#e8f5e8] focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] placeholder-[rgba(200,230,200,0.3)]"
            placeholder="Where the sod work would be"
          />
        </div>

        <div>
          <label htmlFor="est-notes" className="block text-sm font-semibold text-[#e8f5e8] mb-1">
            Tell us about your project
          </label>
          <textarea
            id="est-notes"
            rows={3}
            value={form.notes}
            onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full border border-[rgba(34,197,94,0.15)] rounded-lg px-4 py-3 bg-[rgba(10,15,10,0.8)] text-[#e8f5e8] focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] placeholder-[rgba(200,230,200,0.3)] resize-none"
            placeholder="Front yard, back yard, approximate size, etc."
          />
        </div>

        {status === 'error' && (
          <p className="text-red-400 text-sm">Something went wrong. Please try again or call us at (904) 901-1457.</p>
        )}

        {/* Honeypot - hidden from real users, bots fill it */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
          <label htmlFor="est-website">Website</label>
          <input
            id="est-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => setForm(prev => ({ ...prev, website: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Get My Free Estimate'}
        </button>
      </form>
    </div>
  )
}

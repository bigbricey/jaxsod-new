'use client'

import { useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'

export default function EstimateForm() {
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' })
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
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', phone: '', address: '', notes: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-primary-50 border-2 border-primary-600 rounded-lg p-8 text-center">
        <FiCheckCircle className="text-5xl text-primary-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-secondary-900 mb-2">Request Received!</h3>
        <p className="text-secondary-700">
          The Jax Sod team will reach out shortly to schedule your free estimate.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-primary-50 border-2 border-primary-600 rounded-lg p-8">
      <h3 className="text-2xl font-bold text-secondary-900 mb-2">Request a Free Estimate</h3>
      <p className="text-secondary-600 mb-6">
        Fill out the form and we&apos;ll get back to you within 1-2 hours during business hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="est-name" className="block text-sm font-semibold text-secondary-800 mb-1">
            Name *
          </label>
          <input
            id="est-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-secondary-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="est-phone" className="block text-sm font-semibold text-secondary-800 mb-1">
            Phone *
          </label>
          <input
            id="est-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-secondary-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            placeholder="(904) 555-1234"
          />
        </div>

        <div>
          <label htmlFor="est-address" className="block text-sm font-semibold text-secondary-800 mb-1">
            Property Address
          </label>
          <input
            id="est-address"
            type="text"
            value={form.address}
            onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-secondary-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            placeholder="Where the sod work would be"
          />
        </div>

        <div>
          <label htmlFor="est-notes" className="block text-sm font-semibold text-secondary-800 mb-1">
            Tell us about your project
          </label>
          <textarea
            id="est-notes"
            rows={3}
            value={form.notes}
            onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-secondary-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
            placeholder="Front yard, back yard, approximate size, etc."
          />
        </div>

        {status === 'error' && (
          <p className="text-red-600 text-sm">Something went wrong. Please try again or call us at (904) 901-1457.</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-primary-600 text-white rounded-lg py-4 font-semibold text-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Get My Free Estimate'}
        </button>
      </form>
    </div>
  )
}

import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export interface LeadData {
  name: string
  phone: string
  address: string
  grassType?: string
  yardSize?: string
  notes?: string
}

export async function POST(req: NextRequest) {
  let body: LeadData
  try {
    body = await req.json()
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { name, phone, address, grassType, yardSize, notes } = body

  if (!name || !phone) {
    return new Response(
      JSON.stringify({ error: 'Name and phone are required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Build the lead details text
  const details = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address || 'Not provided'}`,
    grassType ? `Grass Type: ${grassType}` : null,
    yardSize ? `Yard Size: ${yardSize}` : null,
    notes ? `Notes: ${notes}` : null,
  ].filter(Boolean).join('\n')

  const errors: string[] = []

  // Send email notification via Gmail API
  try {
    const emailApiKey = process.env.GOOGLE_WORKSPACE_NOTIFY_URL
    if (emailApiKey) {
      // If we have a webhook URL for notifications, use it
      await fetch(emailApiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: process.env.LEAD_NOTIFY_EMAIL || 'brice@jaxsod.com',
          subject: `New Sod Estimate Lead: ${name}`,
          body: `New lead from the Jax Sod website chatbot:\n\n${details}\n\nSubmitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}`,
        }),
      })
    } else {
      // Fallback: use nodemailer or similar if configured
      // For now, log the lead so it's not lost
      console.log('=== NEW LEAD ===')
      console.log(details)
      console.log('================')
    }
  } catch (err) {
    console.error('Failed to send email notification:', err)
    errors.push('email')
  }

  // Create Google Calendar event for follow-up
  try {
    const calendarWebhook = process.env.GOOGLE_CALENDAR_WEBHOOK_URL
    if (calendarWebhook) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(9, 0, 0, 0)
      const endTime = new Date(tomorrow)
      endTime.setHours(10, 0, 0, 0)

      await fetch(calendarWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: `Follow up: ${name} - Sod Estimate`,
          startTime: tomorrow.toISOString(),
          endTime: endTime.toISOString(),
          description: details,
          location: address || undefined,
        }),
      })
    }
  } catch (err) {
    console.error('Failed to create calendar event:', err)
    errors.push('calendar')
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Lead captured successfully.',
      errors: errors.length > 0 ? errors : undefined,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}

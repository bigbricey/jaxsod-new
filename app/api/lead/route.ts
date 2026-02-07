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

  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })

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

  // Always log so Vercel logs have it
  console.log('=== NEW LEAD ===')
  console.log(details)
  console.log(`Submitted: ${timestamp}`)
  console.log('================')

  // 1. Send SMS notification via Twilio
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER
    const ownerPhone = process.env.OWNER_PHONE

    if (accountSid && authToken && twilioPhone && ownerPhone) {
      const smsBody = `🌱 NEW LEAD from jaxsod.com\n\n${details}\n\nSubmitted: ${timestamp}`

      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
      const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64')

      const twilioRes = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: ownerPhone,
          From: twilioPhone,
          Body: smsBody,
        }).toString(),
      })

      const twilioData = await twilioRes.json()
      if (!twilioRes.ok) {
        console.error('Twilio SMS failed:', twilioRes.status, JSON.stringify(twilioData))
        errors.push('sms')
      } else {
        console.log('Twilio SMS sent successfully. SID:', twilioData.sid)
      }
    } else {
      console.warn('Twilio SMS skipped — missing env vars:', {
        hasAccountSid: !!accountSid,
        hasAuthToken: !!authToken,
        hasTwilioPhone: !!twilioPhone,
        hasOwnerPhone: !!ownerPhone,
      })
    }
  } catch (err) {
    console.error('Failed to send SMS notification:', err)
    errors.push('sms')
  }

  // 2. Log to Google Sheet via Apps Script webhook
  try {
    const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL
    if (sheetWebhook) {
      await fetch(sheetWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: timestamp,
          name,
          phone,
          address: address || 'Not provided',
          grassType: grassType || '',
          yardSize: yardSize || '',
          notes: notes || '',
        }),
      })
    }
  } catch (err) {
    console.error('Failed to log to Google Sheet:', err)
    errors.push('sheet')
  }

  // 3. Send email notification via webhook
  try {
    const emailWebhook = process.env.GOOGLE_WORKSPACE_NOTIFY_URL
    if (emailWebhook) {
      await fetch(emailWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: process.env.LEAD_NOTIFY_EMAIL || 'bigbricey@gmail.com',
          subject: `New Sod Estimate Lead: ${name}`,
          body: `New lead from the Jax Sod website chatbot:\n\n${details}\n\nSubmitted: ${timestamp}`,
        }),
      })
    }
  } catch (err) {
    console.error('Failed to send email notification:', err)
    errors.push('email')
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

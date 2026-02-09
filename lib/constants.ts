// ─── Business Information Constants ───────────────────────────────────────────
// Single source of truth for all business data used across the site.
// Update values here and they propagate everywhere automatically.

export const BUSINESS_NAME = 'Jax Sod'

export const PHONE = '(904) 901-1457'
export const PHONE_E164 = '+19049011457'
export const PHONE_HREF = `tel:${PHONE_E164}`
export const SMS_HREF = `sms:${PHONE_E164}`

export const EMAIL = 'info@jaxsod.com'
export const EMAIL_HREF = `mailto:${EMAIL}`

export const SITE_URL = 'https://jaxsod.com'

// ─── Address ─────────────────────────────────────────────────────────────────
export const ADDRESS = {
  locality: 'Jacksonville',
  region: 'FL',
  postalCode: '32256',
  country: 'US',
  /** Short display string */
  short: 'Jacksonville, FL',
} as const

export const GEO = {
  latitude: 30.3322,
  longitude: -81.6557,
} as const

// ─── Business Hours ──────────────────────────────────────────────────────────
export const BUSINESS_HOURS = {
  weekdays: { days: 'Monday - Friday', open: '7:00 AM', close: '5:00 PM' },
  saturday: { days: 'Saturday', open: '8:00 AM', close: '2:00 PM' },
  sunday: 'Closed',
  /** Schema.org formatted hours for structured data */
  schema: [
    {
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '14:00',
    },
  ],
} as const

// ─── Experience ──────────────────────────────────────────────────────────────
export const FOUNDING_YEAR = 1986

/** Returns the number of full years since the founding year. */
export function getYearsExperience(): number {
  return new Date().getFullYear() - FOUNDING_YEAR
}

/**
 * Returns a human-friendly experience string, e.g. "Nearly 40 Years".
 * Rounds to the nearest 5 and uses "Nearly" if within 2 years of the next
 * multiple of 5, otherwise "Over".
 */
export function getExperienceText(): string {
  const years = getYearsExperience()
  const nearestFive = Math.round(years / 5) * 5
  if (years < nearestFive) {
    return `Nearly ${nearestFive} Years`
  }
  return `Over ${nearestFive} Years`
}

// ─── Ratings / Reviews ───────────────────────────────────────────────────────
export const RATING = 4.9
export const REVIEW_COUNT = 150

// ─── Price Range ─────────────────────────────────────────────────────────────
export const PRICE_RANGE = '$$'

// ─── Service Areas (for schema & footer) ─────────────────────────────────────
export const SERVICE_AREA_NAMES = [
  'Jacksonville',
  'Jacksonville Beach',
  'Atlantic Beach',
  'Ponte Vedra',
  'Nocatee',
  'Orange Park',
  'Fleming Island',
  'Mandarin',
  'St. Augustine',
] as const

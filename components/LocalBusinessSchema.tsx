import {
  BUSINESS_NAME,
  SITE_URL,
  PHONE_E164,
  PRICE_RANGE,
  ADDRESS,
  GEO,
  BUSINESS_HOURS,
  RATING,
  REVIEW_COUNT,
  SERVICE_AREA_NAMES,
  getYearsExperience,
} from '@/lib/constants'

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE_URL,
    name: BUSINESS_NAME,
    image: `${SITE_URL}/opengraph-image`,
    description: `Professional sod installation services in ${ADDRESS.short}. ${getYearsExperience()}+ years of experience connecting customers with expert sod installers for residential and commercial projects.`,
    url: SITE_URL,
    telephone: PHONE_E164,
    priceRange: PRICE_RANGE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    openingHoursSpecification: BUSINESS_HOURS.schema,
    areaServed: SERVICE_AREA_NAMES.map((name) => ({
      '@type': 'City',
      name,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(RATING),
      reviewCount: String(REVIEW_COUNT),
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sod Installation Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Residential Sod Installation',
            description: 'Professional sod installation for homes and residential properties.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Commercial Sod Installation',
            description: 'Large-scale sod installation for commercial properties.',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

import {
  BUSINESS_NAME,
  SITE_URL,
  PHONE_E164,
  PRICE_RANGE,
  ADDRESS,
  BUSINESS_HOURS,
  RATING,
  REVIEW_COUNT,
  getYearsExperience,
} from '@/lib/constants'
import { ServiceArea } from '@/data/service-areas'

interface ServiceAreaSchemaProps {
  area: ServiceArea
}

export default function ServiceAreaSchema({ area }: ServiceAreaSchemaProps) {
  const yearsExperience = getYearsExperience()
  const pageUrl = `${SITE_URL}/service-areas/${area.slug}`

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      // Primary LocalBusiness entity with area-specific details
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': `${SITE_URL}/#business`,
        name: BUSINESS_NAME,
        description: area.description,
        url: SITE_URL,
        telephone: PHONE_E164,
        priceRange: PRICE_RANGE,
        image: `${SITE_URL}/opengraph-image`,
        foundingDate: `${new Date().getFullYear() - yearsExperience}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: ADDRESS.locality,
          addressRegion: ADDRESS.region,
          postalCode: ADDRESS.postalCode,
          addressCountry: ADDRESS.country,
        },
        ...(area.geo && {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: area.geo.latitude,
            longitude: area.geo.longitude,
          },
        }),
        openingHoursSpecification: BUSINESS_HOURS.schema,
        areaServed: {
          '@type': 'City',
          name: area.name,
          ...(area.geo && {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: area.geo.latitude,
              longitude: area.geo.longitude,
            },
          }),
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: String(RATING),
          reviewCount: String(REVIEW_COUNT),
          bestRating: '5',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Sod Installation Services in ${area.name}`,
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `Residential Sod Installation in ${area.name}`,
                description: `Professional residential sod installation for homes in ${area.name}, FL.`,
                areaServed: {
                  '@type': 'City',
                  name: area.name,
                },
                provider: {
                  '@id': `${SITE_URL}/#business`,
                },
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `Commercial Sod Installation in ${area.name}`,
                description: `Large-scale commercial sod installation for properties in ${area.name}, FL.`,
                areaServed: {
                  '@type': 'City',
                  name: area.name,
                },
                provider: {
                  '@id': `${SITE_URL}/#business`,
                },
              },
            },
          ],
        },
      },
      // Service schema linking the business to this specific area
      {
        '@type': 'Service',
        name: `Sod Installation in ${area.name}`,
        description: area.content,
        url: pageUrl,
        provider: {
          '@id': `${SITE_URL}/#business`,
        },
        areaServed: {
          '@type': 'City',
          name: area.name,
          ...(area.geo && {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: area.geo.latitude,
              longitude: area.geo.longitude,
            },
          }),
        },
        serviceType: 'Sod Installation',
        additionalType: 'http://www.productontology.org/id/Landscaping',
      },
      // WebPage schema for the service area page
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: area.title,
        description: area.metaDescription,
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#business`,
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: SITE_URL,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Service Areas',
              item: `${SITE_URL}/service-areas`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: area.name,
              item: pageUrl,
            },
          ],
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

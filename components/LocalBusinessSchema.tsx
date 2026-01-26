export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://jaxsod.com',
    name: 'Jax Sod',
    image: 'https://jaxsod.com/og-image.jpg',
    description:
      'Professional sod installation services in Jacksonville, FL. Nearly 40 years of experience connecting customers with expert sod installers for residential and commercial projects.',
    url: 'https://jaxsod.com',
    telephone: '+19049011457',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jacksonville',
      addressRegion: 'FL',
      postalCode: '32256',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.3322,
      longitude: -81.6557,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '14:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Jacksonville' },
      { '@type': 'City', name: 'Jacksonville Beach' },
      { '@type': 'City', name: 'Atlantic Beach' },
      { '@type': 'City', name: 'Ponte Vedra' },
      { '@type': 'City', name: 'Nocatee' },
      { '@type': 'City', name: 'Orange Park' },
      { '@type': 'City', name: 'Fleming Island' },
      { '@type': 'City', name: 'Mandarin' },
      { '@type': 'City', name: 'St. Augustine' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
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

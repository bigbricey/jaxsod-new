import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Hero from '@/components/Hero'
import CTASection from '@/components/CTASection'
import ContactForm from '@/components/ContactForm'
import { serviceAreas } from '@/data/service-areas'
import { FiCheckCircle, FiMapPin } from 'react-icons/fi'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = serviceAreas.find((a) => a.slug === params.slug)
  if (!area) return {}
  return {
    title: area.title,
    description: area.metaDescription,
    alternates: { canonical: `https://jaxsod.com/service-areas/${area.slug}` },
    openGraph: {
      title: area.title,
      description: area.metaDescription,
      type: 'website',
    },
  }
}

export default function ServiceAreaPage({ params }: Props) {
  const area = serviceAreas.find((a) => a.slug === params.slug)
  if (!area) notFound()

  const otherAreas = serviceAreas.filter((a) => a.slug !== area.slug).slice(0, 4)

  return (
    <>
      <Hero
        title={`Sod Installation in ${area.name}`}
        subtitle="Professional Sod Installation"
        description={`Expert sod installation services for ${area.name}, FL. Nearly 40 years of experience delivering beautiful lawns with St. Augustine, Zoysia, Bermuda, and Bahia sod.`}
        backgroundImage="https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=2000&auto=format&fit=crop"
        height="medium"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="heading-lg mb-6">
                Professional Sod Installation in {area.name}
              </h2>
              <p className="text-lg text-secondary-700 mb-8">{area.content}</p>

              <h3 className="heading-md mb-4">Our Services in {area.name}</h3>
              <ul className="space-y-3 mb-8">
                {[
                  `Residential sod installation in ${area.name}`,
                  `Commercial sod installation in ${area.name}`,
                  'Complete lawn replacement',
                  'New construction sod',
                  'Erosion control solutions',
                  'Expert sod type selection for your property',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FiCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
                    <span className="text-secondary-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="heading-md mb-4">Sod Types Available in {area.name}</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['St. Augustine', 'Zoysia', 'Bermuda', 'Bahia'].map((type) => (
                  <div
                    key={type}
                    className="bg-primary-50 p-4 rounded-lg text-center font-semibold text-primary-800"
                  >
                    {type}
                  </div>
                ))}
              </div>

              {area.neighborhoods && area.neighborhoods.length > 0 && (
                <>
                  <h3 className="heading-md mb-4">
                    Neighborhoods We Serve in {area.name}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                    {area.neighborhoods.map((n) => (
                      <div key={n} className="flex items-center gap-2">
                        <FiMapPin className="text-primary-600 flex-shrink-0" />
                        <span className="text-secondary-700">{n}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="lg:col-span-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Other Service Areas */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-md mb-6 text-center">Other Areas We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherAreas.map((a) => (
              <Link
                key={a.slug}
                href={`/service-areas/${a.slug}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center font-medium text-secondary-700 hover:text-primary-600"
              >
                {a.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/service-areas" className="text-primary-600 font-semibold hover:text-primary-700">
              View All Service Areas →
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

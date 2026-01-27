import { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import Breadcrumbs from '@/components/Breadcrumbs'
import CTASection from '@/components/CTASection'
import { serviceAreas } from '@/data/service-areas'
import { FiMapPin, FiArrowRight } from 'react-icons/fi'
import { SITE_URL, getExperienceText } from '@/lib/constants'

const experienceText = getExperienceText()

export const metadata: Metadata = {
  title: 'Service Areas | Sod Installation Northeast Florida',
  description:
    'Professional sod installation serving Jacksonville, Atlantic Beach, Fleming Island, Mandarin, Ponte Vedra, Nocatee, Orange Park, St. Augustine, and Jacksonville Beach.',
  alternates: { canonical: `${SITE_URL}/service-areas` },
}

export default function ServiceAreasPage() {
  return (
    <>
      <Hero
        title="Service Areas"
        description="Professional sod installation across Northeast Florida. We serve Jacksonville and surrounding communities with expert installers and premium sod varieties."
        backgroundImage="https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=2000&auto=format&fit=crop"
        height="medium"
      />

      <section className="section-padding">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Service Areas' }]} />
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Areas We Serve</h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              With {experienceText.toLowerCase()} of experience in Northeast Florida, we know the local soil
              conditions, climate challenges, and best sod varieties for every community we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <FiMapPin className="text-primary-600 text-xl" />
                  <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                    {area.name}
                  </h3>
                </div>
                <p className="text-secondary-600 mb-4">{area.description}</p>
                <span className="text-primary-600 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <FiArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-md mb-6">Don&apos;t See Your Area?</h2>
            <p className="text-lg text-secondary-700 mb-8">
              We serve all of Northeast Florida. If you&apos;re within driving distance of
              Jacksonville, we can likely help. Contact us to discuss your project.
            </p>
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Contact Us About Your Area
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

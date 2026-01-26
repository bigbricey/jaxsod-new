import { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import CTASection from '@/components/CTASection'
import { FiCheckCircle } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Sod Installation Services Jacksonville FL',
  description:
    'Professional residential and commercial sod installation services in Jacksonville, FL. Lawn replacement, new construction sod, erosion control, and more. Free quotes!',
  alternates: { canonical: 'https://jaxsod.com/services' },
}

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Our Sod Installation Services"
        description="From residential lawns to large commercial projects, Jax Sod delivers professional sod installation tailored to your property's needs."
        backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop"
        height="medium"
      />

      <section className="section-padding" id="residential">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="heading-lg mb-6">Residential Sod Installation</h2>
              <p className="text-lg text-secondary-700 mb-6">
                Whether you&apos;re building a new home, replacing a worn-out lawn, or renovating your
                landscape, our team of expert installers delivers beautiful results that last for
                years.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Complete lawn replacement',
                  'New construction sod installation',
                  'Front yard & backyard projects',
                  'Landscape renovation',
                  'Sod repair and patching',
                  'Expert variety selection for your conditions',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FiCheckCircle className="text-primary-600 mt-1 flex-shrink-0 text-xl" />
                    <span className="text-secondary-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary">
                Get a Free Residential Quote
              </Link>
            </div>
            <div className="bg-primary-50 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">What&apos;s Included</h3>
              <div className="space-y-4">
                {[
                  { step: 'Site Assessment', desc: 'We measure, evaluate sun/shade, and recommend the ideal sod type.' },
                  { step: 'Old Turf Removal', desc: 'Existing grass and weeds removed to create a clean foundation.' },
                  { step: 'Surface Smoothing', desc: 'Ground is leveled and smoothed for optimal sod-to-soil contact.' },
                  { step: 'Premium Sod Installation', desc: 'Farm-fresh sod laid with professional technique and rolled for contact.' },
                  { step: 'Aftercare Instructions', desc: 'Detailed watering and care plan tailored to your sod type and season.' },
                ].map((item, i) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-secondary-900">{item.step}</p>
                      <p className="text-secondary-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary-50" id="commercial">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1 bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-bold mb-4">Commercial Capabilities</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Office Complexes',
                  'Retail Centers',
                  'Hotels & Resorts',
                  'HOA Communities',
                  'Apartment Communities',
                  'Industrial Parks',
                  'Municipal Projects',
                  'Sports Facilities',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <FiCheckCircle className="text-primary-600 flex-shrink-0" />
                    <span className="text-secondary-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="heading-lg mb-6">Commercial Sod Installation</h2>
              <p className="text-lg text-secondary-700 mb-6">
                Large-scale projects demand experienced coordination. We manage the logistics of
                multi-truck deliveries, large crews, and tight deadlines to deliver professional
                results on schedule.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Projects of any size — 5,000 to 500,000+ sq ft',
                  'Coordination with GCs and project managers',
                  'Certificate of Occupancy deadline compliance',
                  'Staggered delivery scheduling',
                  'Safety-compliant crew operations',
                  'Post-install maintenance coordination',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FiCheckCircle className="text-primary-600 mt-1 flex-shrink-0 text-xl" />
                    <span className="text-secondary-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary">
                Get a Commercial Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-12">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Lawn Replacement',
                desc: 'Old lawn failing? We strip the old turf, prepare the soil, and install fresh premium sod for a complete transformation.',
              },
              {
                title: 'New Construction',
                desc: 'Building a new home? We coordinate with your builder to ensure proper site prep and premium sod installation.',
              },
              {
                title: 'Erosion Control',
                desc: 'Sod provides immediate ground stabilization for slopes, swales, and lake banks where seed or spray fail.',
              },
            ].map((service) => (
              <div key={service.title} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-primary-700">{service.title}</h3>
                <p className="text-secondary-700">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

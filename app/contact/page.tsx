import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Breadcrumbs from '@/components/Breadcrumbs'
import ContactForm from '@/components/ContactForm'
import { FiPhone, FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi'
import { BUSINESS_NAME, PHONE, PHONE_HREF, SITE_URL, BUSINESS_HOURS, getExperienceText } from '@/lib/constants'

const experienceText = getExperienceText()

export const metadata: Metadata = {
  title: `Contact ${BUSINESS_NAME} | Free Sod Installation Quote Jacksonville FL`,
  description: `Get a free sod installation quote in Jacksonville, FL. Call or text ${PHONE}. ${experienceText} of experience. Fast response!`,
  alternates: { canonical: `${SITE_URL}/contact` },
}

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Get Your Free Quote"
        description={`Ready to transform your lawn? Contact ${BUSINESS_NAME} for a free, no-obligation estimate. We respond fast — usually within 1-2 hours during business hours.`}
        backgroundImage="https://images.unsplash.com/photo-1560749003-f4b1e17e2dff?q=80&w=2000&auto=format&fit=crop"
        height="small"
      />

      <section className="section-padding">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-lg mb-6">Contact Information</h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Phone / Text</h3>
                    <a
                      href={PHONE_HREF}
                      className="text-primary-600 hover:text-primary-700 text-xl font-semibold"
                    >
                      {PHONE}
                    </a>
                    <p className="text-secondary-600 text-sm mt-1">
                      Text for fastest response!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Service Area</h3>
                    <p className="text-secondary-700">Jacksonville, FL &amp; surrounding areas</p>
                    <p className="text-secondary-600 text-sm mt-1">
                      Atlantic Beach, Fleming Island, Mandarin, Ponte Vedra, Nocatee, Orange Park,
                      St. Augustine, Jacksonville Beach
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiClock className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Business Hours</h3>
                    <p className="text-secondary-700">{BUSINESS_HOURS.weekdays.days}: {BUSINESS_HOURS.weekdays.open} – {BUSINESS_HOURS.weekdays.close}</p>
                    <p className="text-secondary-700">{BUSINESS_HOURS.saturday.days}: {BUSINESS_HOURS.saturday.open} – {BUSINESS_HOURS.saturday.close}</p>
                    <p className="text-secondary-600 text-sm mt-1">
                      {BUSINESS_HOURS.sunday}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">What to Expect</h3>
                <ul className="space-y-3">
                  {[
                    'Quick response — usually within 1-2 hours',
                    'Free on-site property assessment',
                    'Detailed quote with no hidden fees',
                    'Expert sod type recommendations',
                    'Installation usually within 1-2 weeks',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <FiCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
                      <span className="text-secondary-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}

import Link from 'next/link'
import { FiPhone, FiMapPin, FiClock, FiMail } from 'react-icons/fi'
import {
  BUSINESS_NAME,
  PHONE,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
  ADDRESS,
  BUSINESS_HOURS,
  getExperienceText,
} from '@/lib/constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary-400 mb-4">{BUSINESS_NAME}</h3>
            <p className="text-secondary-300 mb-4">
              Jacksonville&apos;s trusted sod company with {getExperienceText().toLowerCase()} of experience.
              Connecting you with expert installers for residential and commercial projects.
            </p>
            <p className="text-secondary-400 text-sm">
              Serving Jacksonville, Atlantic Beach, Fleming Island, Mandarin, Ponte Vedra,
              Nocatee, Orange Park, St. Augustine, and Jacksonville Beach.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/sod-types', label: 'Sod Types' },
                { href: '/service-areas', label: 'Service Areas' },
                { href: '/calculators', label: 'Calculators' },
                { href: '/articles', label: 'Articles' },
                { href: '/reviews', label: 'Reviews' },
                { href: '/faq', label: 'FAQ' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-300 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {[
                { label: 'Residential Sod Installation', href: '/services' },
                { label: 'Commercial Sod Installation', href: '/services' },
                { label: 'Sod Replacement', href: '/services' },
                { label: 'Lawn Renovation', href: '/services' },
                { label: 'New Construction Sod', href: '/services' },
                { label: 'Erosion Control', href: '/services' },
              ].map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-secondary-300 hover:text-primary-400 transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiPhone className="text-primary-400 mt-1 flex-shrink-0" />
                <a
                  href={PHONE_HREF}
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  {PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="text-primary-400 mt-1 flex-shrink-0" />
                <a
                  href={EMAIL_HREF}
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-secondary-300">{ADDRESS.short}</span>
              </li>
              <li className="flex items-start gap-3">
                <FiClock className="text-primary-400 mt-1 flex-shrink-0" />
                <div className="text-secondary-300">
                  {BUSINESS_HOURS.weekdays.days}: {BUSINESS_HOURS.weekdays.open} - {BUSINESS_HOURS.weekdays.close}
                  <br />
                  {BUSINESS_HOURS.saturday.days}: {BUSINESS_HOURS.saturday.open} - {BUSINESS_HOURS.saturday.close}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-400">
            <p>&copy; {currentYear} {BUSINESS_NAME}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

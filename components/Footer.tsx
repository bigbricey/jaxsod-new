import Link from 'next/link'
import { FiPhone, FiMapPin, FiClock } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary-400 mb-4">Jax Sod</h3>
            <p className="text-secondary-300 mb-4">
              Jacksonville&apos;s trusted sod company with nearly 40 years of experience.
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
                { href: '/articles', label: 'Articles' },
                { href: '/reviews', label: 'Reviews' },
                { href: '/faq', label: 'FAQ' },
                { href: '/about', label: 'About Us' },
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
            <ul className="space-y-2 text-secondary-300">
              <li>Residential Sod Installation</li>
              <li>Commercial Sod Installation</li>
              <li>Sod Replacement</li>
              <li>Lawn Renovation</li>
              <li>New Construction Sod</li>
              <li>Erosion Control</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiPhone className="text-primary-400 mt-1 flex-shrink-0" />
                <a
                  href="tel:9049011457"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  (904) 901-1457
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-secondary-300">Jacksonville, FL</span>
              </li>
              <li className="flex items-start gap-3">
                <FiClock className="text-primary-400 mt-1 flex-shrink-0" />
                <div className="text-secondary-300">
                  Mon-Fri: 7:00 AM - 5:00 PM
                  <br />
                  Sat: 8:00 AM - 2:00 PM
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-400">
            <p>&copy; {currentYear} Jax Sod. All rights reserved.</p>
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

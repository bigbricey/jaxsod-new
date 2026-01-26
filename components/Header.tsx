'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiPhone, FiMenu, FiX } from 'react-icons/fi'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/sod-types', label: 'Sod Types' },
    { href: '/service-areas', label: 'Service Areas' },
    { href: '/articles', label: 'Articles' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-primary-700 text-white">
        <div className="container-custom py-2">
          <div className="flex justify-between items-center text-sm">
            <span className="hidden sm:inline font-medium">
              Nearly 40 Years of Professional Sod Installation in Jacksonville
            </span>
            <a
              href="tel:9049011457"
              className="flex items-center gap-2 hover:text-primary-200 transition-colors"
            >
              <FiPhone className="text-lg" />
              <span className="font-semibold">(904) 901-1457</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">J</span>
            </div>
            <span className="text-2xl font-bold text-primary-700">Jax Sod</span>
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors text-sm xl:text-base"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary text-sm">
              Get Free Quote
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <a href="tel:9049011457" className="btn-primary text-sm py-2 px-3">
              <FiPhone className="inline mr-1" /> Call
            </a>
            <button
              className="text-2xl text-secondary-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-secondary-100 z-50">
          <div className="container-custom py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-secondary-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-colors py-3 px-4 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Link
                href="/contact"
                className="btn-primary w-full text-center block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

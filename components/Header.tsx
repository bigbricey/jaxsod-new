'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiPhone, FiMenu, FiX } from 'react-icons/fi'
import { BUSINESS_NAME, PHONE, PHONE_HREF, getExperienceText } from '@/lib/constants'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
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
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-400">
      {/* Top bar */}
      <div className="border-b border-[rgba(34,197,94,0.1)]">
        <div className="container-custom py-2">
          <div className="flex justify-between items-center text-sm">
            <span className="hidden sm:inline font-medium text-[rgba(200,230,200,0.5)]">
              {getExperienceText()} of Professional Sod Installation in Jacksonville
            </span>
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-[#22c55e] hover:text-[#4ade80] transition-colors"
            >
              <FiPhone className="text-lg" />
              <span className="font-semibold">{PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`backdrop-blur-xl border-b border-[rgba(34,197,94,0.15)] transition-all duration-400 ${
          scrolled
            ? 'bg-[rgba(10,15,10,0.95)] py-2'
            : 'bg-[rgba(10,15,10,0.7)] py-4'
        }`}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-1">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-[#22c55e]">Jax</span>
                <span className="text-[#e8f5e8]">Sod</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-5 xl:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[rgba(200,230,200,0.5)] hover:text-[#22c55e] font-medium transition-colors text-sm tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="bg-[#22c55e] text-[#0a0f0a] px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#4ade80] transition-all hover:scale-105"
              >
                Get Free Quote
              </Link>
            </div>

            <div className="lg:hidden flex items-center gap-3">
              <a
                href={PHONE_HREF}
                className="bg-[#22c55e] text-[#0a0f0a] text-sm py-2 px-3 rounded-full font-semibold"
              >
                <FiPhone className="inline mr-1" /> Call
              </a>
              <button
                className="text-2xl text-[#e8f5e8]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[rgba(10,15,10,0.95)] backdrop-blur-xl border-b border-[rgba(34,197,94,0.15)] z-50">
          <div className="container-custom py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[rgba(200,230,200,0.5)] hover:text-[#22c55e] hover:bg-[rgba(34,197,94,0.05)] font-medium transition-colors py-3 px-4 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Link
                href="/contact"
                className="bg-[#22c55e] text-[#0a0f0a] w-full text-center block py-3 rounded-full font-semibold hover:bg-[#4ade80] transition-all"
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

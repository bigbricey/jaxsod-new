import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LocalBusinessSchema from '@/components/LocalBusinessSchema'
import { BUSINESS_NAME, SITE_URL, getExperienceText } from '@/lib/constants'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const experienceText = getExperienceText()

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Professional Sod Installation Jacksonville FL | ${BUSINESS_NAME}`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description: `Professional sod installation in Jacksonville, FL. ${experienceText} of experience connecting you with expert sod installers. St. Augustine, Zoysia, Bermuda, Bahia. Free quotes!`,
  keywords: [
    'sod installation Jacksonville',
    'Jacksonville sod',
    'sod installer Jacksonville FL',
    'lawn installation',
    'Florida sod',
    'St. Augustine sod',
    'Zoysia sod',
    'sod company Jacksonville',
    'residential sod installation',
    'commercial sod installation',
  ],
  authors: [{ name: BUSINESS_NAME }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    title: `Professional Sod Installation in Jacksonville, FL | ${BUSINESS_NAME}`,
    description: `${experienceText} of professional sod installation experience in Jacksonville, FL. Residential and commercial specialists.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BUSINESS_NAME} - Professional Sod Installation Jacksonville FL`,
    description: `${experienceText} of expert sod installation in Jacksonville, FL. Free quotes!`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'Wnm-bygOB00tSa6gDG6qoUjjtBsUXmz92sYVnV8kEPA',
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

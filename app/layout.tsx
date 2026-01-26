import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LocalBusinessSchema from '@/components/LocalBusinessSchema'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jaxsod.com'),
  title: {
    default: 'Professional Sod Installation Jacksonville FL | Jax Sod',
    template: '%s | Jax Sod',
  },
  description:
    'Professional sod installation in Jacksonville, FL. Nearly 40 years of experience connecting you with expert sod installers. St. Augustine, Zoysia, Bermuda, Bahia. Free quotes!',
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
  authors: [{ name: 'Jax Sod' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jaxsod.com',
    siteName: 'Jax Sod',
    title: 'Professional Sod Installation in Jacksonville, FL | Jax Sod',
    description:
      'Nearly 40 years of professional sod installation experience in Jacksonville, FL. Residential and commercial specialists.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jax Sod - Professional Sod Installation Jacksonville FL',
    description:
      'Nearly 40 years of expert sod installation in Jacksonville, FL. Free quotes!',
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
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://jaxsod.com',
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
      </body>
    </html>
  )
}

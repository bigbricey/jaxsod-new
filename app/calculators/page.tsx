import { Metadata } from 'next'
import Link from 'next/link'
import CTASection from '@/components/CTASection'
import { FiArrowRight, FiGrid } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Landscaping Calculators Jacksonville FL | Jax Sod',
  description:
    'Free landscaping calculators for Jacksonville, FL homeowners. Estimate sod, mulch, rock, and topsoil needs for your next project. Get instant quotes from Jax Sod.',
  alternates: { canonical: 'https://jaxsod.com/calculators' },
  openGraph: {
    title: 'Free Landscaping Calculators – Jax Sod Jacksonville FL',
    description:
      'Estimate your landscaping materials with our free calculators. Sod, mulch, rock, topsoil, and more for Jacksonville, FL projects.',
    url: 'https://jaxsod.com/calculators',
    type: 'website',
  },
}

interface CalculatorCard {
  title: string
  description: string
  href: string
  available: boolean
  icon: React.ReactNode
  color: string
}

const calculators: CalculatorCard[] = [
  {
    title: 'Sod Calculator',
    description:
      'Estimate square footage, pallets needed, and cost for St. Augustine, Zoysia, Bermuda, or Bahia sod installation.',
    href: '/calculators/sod-calculator',
    available: true,
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="6" y="10" width="36" height="28" rx="3" className="fill-primary-100 stroke-primary-600" strokeWidth="2" />
        <path d="M6 20 H42" className="stroke-primary-400" strokeWidth="1.5" />
        <path d="M6 30 H42" className="stroke-primary-400" strokeWidth="1.5" />
        <path d="M18 10 V38" className="stroke-primary-400" strokeWidth="1.5" />
        <path d="M30 10 V38" className="stroke-primary-400" strokeWidth="1.5" />
      </svg>
    ),
    color: 'primary',
  },
  {
    title: 'Mulch Calculator',
    description:
      'Calculate how many cubic yards of mulch you need for your flower beds, garden, and landscaping areas.',
    href: '/calculators',
    available: false,
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M8 38 L14 22 L24 30 L34 18 L42 38Z" className="fill-amber-100 stroke-amber-600" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="24" cy="14" r="5" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
      </svg>
    ),
    color: 'amber',
  },
  {
    title: 'Rock & Gravel Calculator',
    description:
      'Determine the tons of decorative rock, gravel, or river stone needed for your landscaping project.',
    href: '/calculators',
    available: false,
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <ellipse cx="16" cy="30" rx="10" ry="8" className="fill-slate-100 stroke-slate-500" strokeWidth="2" />
        <ellipse cx="34" cy="32" rx="8" ry="6" className="fill-slate-100 stroke-slate-500" strokeWidth="2" />
        <ellipse cx="24" cy="20" rx="7" ry="5" className="fill-slate-100 stroke-slate-500" strokeWidth="2" />
      </svg>
    ),
    color: 'slate',
  },
  {
    title: 'Topsoil Calculator',
    description:
      'Figure out how much topsoil to order for leveling, garden beds, raised beds, and new lawn preparation.',
    href: '/calculators',
    available: false,
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="6" y="24" width="36" height="16" rx="2" className="fill-yellow-100 stroke-yellow-700" strokeWidth="2" />
        <path d="M14 24 V16 C14 14 16 12 18 14 C20 10 26 10 28 14 C30 12 34 14 34 16 V24" className="fill-green-100 stroke-green-600" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    color: 'yellow',
  },
]

export default function CalculatorsPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/4 translate-y-1/4" />
        </div>
        <div className="container-custom relative z-10 py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-primary-200">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-white font-medium">Calculators</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
                <FiGrid className="text-white text-2xl" />
              </div>
              <h1 className="heading-xl text-white">Landscaping Calculators</h1>
            </div>
            <p className="text-xl text-primary-100 leading-relaxed">
              Free tools to help you plan your Jacksonville landscaping project. Estimate materials, costs, and quantities before you buy.
            </p>
          </div>
        </div>
      </section>

      {/* ── Calculator Grid ────────────────────────────────── */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {calculators.map((calc) => (
              <div key={calc.title} className="relative group">
                {calc.available ? (
                  <Link
                    href={calc.href}
                    className="block bg-white rounded-2xl shadow-md border border-secondary-100 p-6 sm:p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300 h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      {calc.icon}
                      <FiArrowRight className="text-primary-600 text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <h2 className="text-xl font-bold text-secondary-900 mb-2">{calc.title}</h2>
                    <p className="text-secondary-600 leading-relaxed">{calc.description}</p>
                    <span className="inline-block mt-4 text-sm font-semibold text-primary-600">
                      Use Calculator →
                    </span>
                  </Link>
                ) : (
                  <div className="bg-white rounded-2xl shadow-md border border-secondary-100 p-6 sm:p-8 opacity-60 h-full">
                    <div className="flex items-start justify-between mb-4">
                      {calc.icon}
                      <span className="text-xs font-bold text-secondary-400 bg-secondary-100 px-3 py-1 rounded-full uppercase tracking-wider">
                        Coming Soon
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-secondary-900 mb-2">{calc.title}</h2>
                    <p className="text-secondary-600 leading-relaxed">{calc.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-secondary-500 text-sm">
              More calculators are on the way! Need help with your project now?
            </p>
            <Link href="/contact" className="btn-primary mt-4 inline-block">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <CTASection />
    </>
  )
}

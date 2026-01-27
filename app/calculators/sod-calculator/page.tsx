import { Metadata } from 'next'
import Link from 'next/link'
import SodCalculator from './SodCalculator'
import Breadcrumbs from '@/components/Breadcrumbs'
import CTASection from '@/components/CTASection'
import { FiCheckCircle, FiMapPin, FiTarget, FiGrid, FiClipboard, FiArrowRight } from 'react-icons/fi'
import { BUSINESS_NAME, PHONE, SITE_URL, getExperienceText } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Sod Calculator Jacksonville FL – Estimate Square Footage & Pallets | ${BUSINESS_NAME}`,
  description:
    'Free sod calculator for Jacksonville, FL homeowners. Instantly estimate square footage and pallets needed for St. Augustine, Zoysia, Bermuda, and Bahia sod installation.',
  keywords: [
    'sod calculator',
    'sod calculator jacksonville',
    'how much sod do I need',
    'sod pallet calculator',
    'lawn calculator',
    'jacksonville sod',
    'sod installation jacksonville fl',
    'how many pallets of sod',
  ],
  alternates: { canonical: `${SITE_URL}/calculators/sod-calculator` },
  openGraph: {
    title: `Sod Calculator – Estimate Your Jacksonville Lawn Needs | ${BUSINESS_NAME}`,
    description:
      'Free sod calculator: enter your lawn dimensions and get an instant estimate for square footage and pallets needed in Jacksonville, FL.',
    url: `${SITE_URL}/calculators/sod-calculator`,
    type: 'website',
  },
}

// JSON-LD Schema
function SodCalculatorSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `Sod Calculator – ${BUSINESS_NAME} Jacksonville FL`,
    description:
      'Free sod calculator for Jacksonville homeowners. Estimate square footage and pallets needed for St. Augustine, Zoysia, Bermuda, and Bahia sod.',
    url: `${SITE_URL}/calculators/sod-calculator`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      telephone: PHONE,
      areaServed: {
        '@type': 'City',
        name: 'Jacksonville',
        containedInPlace: {
          '@type': 'State',
          name: 'Florida',
        },
      },
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function FAQSchema() {
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much sod do I need for my lawn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Measure your lawn\'s length and width in feet, then multiply to get square footage. For irregular shapes, divide into rectangles and add them up. Add 10% extra for waste from cutting and edges.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I know which sod type is best for my Jacksonville yard?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best sod for your Jacksonville yard depends on sun exposure, foot traffic, and maintenance preferences. St. Augustine is the most popular all-around choice. Zoysia is great for high-traffic sunny yards. Bermuda is ideal for large open areas. Bahia works best for large, low-maintenance properties. Contact a local sod professional for a personalized recommendation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many pallets of sod do I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sod pallet sizes vary by grass type and supplier — commonly 400, 450, or 500 square feet per pallet. Calculate your total square footage first, then check with your sod supplier for their pallet size to determine how many you need. Always add 10% extra for waste from cutting and edges.',
        },
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
}

export default function SodCalculatorPage() {
  return (
    <>
      <SodCalculatorSchema />
      <FAQSchema />

      {/* ── Hero Section ───────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container-custom relative z-10 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="heading-xl text-white mb-4">
              Sod Calculator
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed mb-2">
              Estimate how much sod you need for your Jacksonville lawn in seconds. Calculate square footage and pallets — completely free.
            </p>
            <p className="text-primary-200 text-sm flex items-center gap-2">
              <FiMapPin className="flex-shrink-0" /> Serving Jacksonville, FL and surrounding areas
            </p>
          </div>
        </div>
      </section>

      {/* ── Calculator Section ─────────────────────────────────── */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom max-w-5xl">
          <Breadcrumbs items={[{ label: 'Calculators', href: '/calculators' }, { label: 'Sod Calculator' }]} />
          <SodCalculator />
        </div>
      </section>

      {/* ── How to Measure Section ─────────────────────────────── */}
      <section className="section-padding bg-white" id="how-to-measure">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-lg text-center mb-4">How to Measure Your Lawn</h2>
          <p className="text-center text-secondary-600 text-lg mb-12 max-w-2xl mx-auto">
            Accurate measurements are key to ordering the right amount of sod. Follow these simple steps.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: FiTarget,
                title: 'Step 1: Choose Your Tool',
                desc: 'Use a measuring tape for small areas or a measuring wheel for larger yards. You can also use Google Maps\' measure tool for a rough estimate from your computer.',
              },
              {
                icon: FiGrid,
                title: 'Step 2: Break It Into Shapes',
                desc: 'Divide your yard into simple shapes — rectangles, triangles, or circles. Measure each shape separately and add the square footage together.',
              },
              {
                icon: FiClipboard,
                title: 'Step 3: Record Your Measurements',
                desc: 'Write down the length and width of each section in feet. For triangles, measure the base and height. For circles, measure the radius from center to edge.',
              },
              {
                icon: FiCheckCircle,
                title: 'Step 4: Add Waste Factor',
                desc: 'Always add 10% extra for waste due to cutting around edges, curves, walkways, and garden beds. Our calculator does this automatically when toggled on.',
              },
            ].map((step) => (
              <div key={step.title} className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <step.icon className="text-primary-700 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-secondary-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 sm:p-8">
            <h3 className="heading-sm text-primary-800 mb-4">💡 Pro Tips for Accurate Measurements</h3>
            <ul className="space-y-3">
              {[
                'Measure in feet for the easiest calculation. One large step ≈ 3 feet.',
                'Subtract areas you DON\'T need sod for — driveways, patios, garden beds, pools.',
                'For oddly shaped areas, use the "irregular" option and estimate total square footage.',
                'When in doubt, round up. Extra sod is better than running short mid-install.',
                'Take a photo of your yard from Google Maps — it helps when talking to your installer.',
                'Sod pallet sizes vary (400, 450, or 500 sq ft) depending on sod type and supplier — check with your supplier for exact coverage.',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <FiCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-secondary-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Jacksonville Sod Info ──────────────────────────────── */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-lg text-center mb-4">Sod Installation in Jacksonville, FL</h2>
          <p className="text-center text-secondary-600 text-lg mb-10 max-w-2xl mx-auto">
            Everything you need to know about sod and installation in the Jacksonville area.
          </p>

          <div className="prose max-w-none">
            <h3>Why Install New Sod in Jacksonville?</h3>
            <p>
              New sod instantly transforms your yard, boosts curb appeal, and increases property value. 
              Jacksonville&apos;s warm climate means sod establishes quickly, and with the right variety 
              for your yard conditions, you&apos;ll have a lush lawn in weeks — not months.
              The best way to get an accurate quote is to <strong>contact a local professional</strong> who 
              can assess your soil, sunlight, and drainage conditions.
            </p>

            <h3>Which Sod Type Is Best for Jacksonville?</h3>
            <p>
              Jacksonville&apos;s hot, humid climate and sandy soils make it ideal for warm-season grasses. Here&apos;s a quick guide:
            </p>
            <ul>
              <li><strong>St. Augustine (Floratam):</strong> Best all-around choice. Handles partial shade, looks lush, and is well-adapted to Northeast Florida.</li>
              <li><strong>Zoysia (Empire):</strong> Dense, drought-tolerant, and low-maintenance. Great for sunny yards with foot traffic.</li>
              <li><strong>Bermuda (Celebration):</strong> Fast-growing and extremely durable. Ideal for large open areas and sports turf.</li>
              <li><strong>Bahia (Argentine):</strong> Most budget-friendly option with deep roots and excellent drought tolerance. Perfect for large, low-maintenance properties.</li>
            </ul>

            <h3>How Many Pallets of Sod Do I Need?</h3>
            <p>
              Sod pallets in Jacksonville typically cover <strong>400 to 500 square feet</strong>, depending on the grass type and supplier. 
              For example, a typical 2,000 sq ft lawn would need <strong>4 pallets</strong> of sod 
              (plus we recommend an extra 10% for waste). Use our calculator above to get your exact estimate.
            </p>

            <h3>When Is the Best Time to Install Sod in Jacksonville?</h3>
            <p>
              In Jacksonville, sod can be installed year-round thanks to our mild winters. However, the 
              ideal time is <strong>spring through early fall</strong> (March–October) when warm temperatures promote 
              rapid root establishment. Avoid installing during freezes or extreme heat without an irrigation plan.
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link href="/sod-types" className="btn-secondary inline-flex items-center gap-2">
              Compare All Sod Types <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────── */}
      <CTASection
        title="Ready to Get Your Sod Installed?"
        description={`Use your calculator estimate as a starting point, then get an exact quote from Jacksonville's trusted sod professionals. ${getExperienceText()} of experience — free quotes, no obligation.`}
      />
    </>
  )
}

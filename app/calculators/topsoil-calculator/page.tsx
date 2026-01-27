import { Metadata } from 'next'
import Link from 'next/link'
import TopsoilCalculator from './TopsoilCalculator'
import Breadcrumbs from '@/components/Breadcrumbs'
import CTASection from '@/components/CTASection'
import { FiCheckCircle, FiMapPin, FiTarget, FiGrid, FiClipboard, FiLayers } from 'react-icons/fi'
import { BUSINESS_NAME, PHONE, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Topsoil Calculator Jacksonville FL – Estimate Cubic Yards Needed | ${BUSINESS_NAME}`,
  description:
    'Free topsoil calculator for Jacksonville, FL homeowners. Instantly estimate cubic yards of topsoil, garden mix, compost, or fill dirt needed for your project.',
  keywords: [
    'topsoil calculator',
    'topsoil calculator jacksonville',
    'how much topsoil do I need',
    'how much topsoil do I need jacksonville',
    'cubic yards of topsoil',
    'garden soil calculator',
    'fill dirt calculator',
    'soil calculator for raised beds',
    'landscaping soil jacksonville fl',
  ],
  alternates: { canonical: `${SITE_URL}/calculators/topsoil-calculator` },
  openGraph: {
    title: `Topsoil Calculator – Estimate Your Jacksonville Soil Needs | ${BUSINESS_NAME}`,
    description:
      'Free topsoil calculator: enter your area dimensions and get an instant estimate for cubic yards of soil needed in Jacksonville, FL.',
    url: `${SITE_URL}/calculators/topsoil-calculator`,
    type: 'website',
  },
}

function TopsoilCalculatorSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `Topsoil Calculator – ${BUSINESS_NAME} Jacksonville FL`,
    description:
      'Free topsoil calculator for Jacksonville homeowners. Estimate cubic yards of topsoil, garden mix, compost, or fill dirt needed for your project.',
    url: `${SITE_URL}/calculators/topsoil-calculator`,
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
        name: 'How much topsoil do I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Measure the length and width of your area in feet to get square footage, then decide on depth. For garden beds, 2-4 inches is typical. For new lawn preparation, 4-6 inches is recommended. Use our calculator to convert your measurements to cubic yards — the standard unit for ordering topsoil in bulk.',
        },
      },
      {
        '@type': 'Question',
        name: 'How deep should topsoil be for a new lawn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For new lawn preparation in Jacksonville, aim for 4-6 inches of quality topsoil. This provides adequate depth for grass roots to establish. For overseeding or top-dressing an existing lawn, 1-2 inches is usually sufficient to level low spots and improve soil quality.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between topsoil, garden mix, and fill dirt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Topsoil is the upper layer of natural soil, good for general landscaping. Garden mix is topsoil blended with compost and organic matter, ideal for planting beds. Fill dirt is subsoil without organic content, used for grading and structural fill — not for growing plants. Sandy loam is a balanced mix perfect for Florida gardens.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is topsoil sold in Jacksonville?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Topsoil is typically sold by the cubic yard for bulk delivery. One cubic yard covers about 108 square feet at 3 inches deep. For smaller projects, bagged topsoil is available at local garden centers. For larger projects, bulk delivery is more economical — contact a local landscaping supplier for delivery quotes.',
        },
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
}

export default function TopsoilCalculatorPage() {
  return (
    <>
      <TopsoilCalculatorSchema />
      <FAQSchema />

      {/* ── Hero Section ───────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container-custom relative z-10 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="heading-xl text-white mb-4">
              Topsoil Calculator
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed mb-2">
              Estimate how much topsoil you need for your Jacksonville project. Calculate cubic yards for garden beds, lawn prep, and more — completely free.
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
          <Breadcrumbs items={[{ label: 'Calculators', href: '/calculators' }, { label: 'Topsoil Calculator' }]} />
          <TopsoilCalculator />
        </div>
      </section>

      {/* ── How to Measure Section ─────────────────────────────── */}
      <section className="section-padding bg-white" id="how-to-measure">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-lg text-center mb-4">How to Measure for Topsoil</h2>
          <p className="text-center text-secondary-600 text-lg mb-12 max-w-2xl mx-auto">
            Accurate measurements ensure you order the right amount of soil for your project.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: FiTarget,
                title: 'Step 1: Define Your Area',
                desc: 'Outline the area where you need topsoil. For garden beds, measure the bed dimensions. For new lawns, measure the entire yard area minus hardscape.',
              },
              {
                icon: FiGrid,
                title: 'Step 2: Measure Dimensions',
                desc: 'Use a tape measure or measuring wheel to record length and width in feet. For irregular areas, break them into rectangles and add the totals together.',
              },
              {
                icon: FiLayers,
                title: 'Step 3: Determine Depth',
                desc: 'Choose your depth: 2-4 inches for garden beds, 4-6 inches for new lawn prep, or 1-2 inches for top-dressing existing areas.',
              },
              {
                icon: FiClipboard,
                title: 'Step 4: Calculate Cubic Yards',
                desc: 'Enter your measurements into our calculator. It converts everything to cubic yards — the standard unit for ordering bulk topsoil delivery.',
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
            <h3 className="heading-sm text-primary-800 mb-4">💡 Pro Tips for Topsoil Projects</h3>
            <ul className="space-y-3">
              {[
                'One cubic yard of topsoil covers approximately 108 sq ft at 3" deep, or 162 sq ft at 2" deep.',
                'Test your existing soil before ordering — you may need amendments like compost or sand to improve drainage in Jacksonville\'s sandy conditions.',
                'For raised beds, calculate the interior volume: length × width × height (all in feet), then divide by 27 for cubic yards.',
                'Topsoil settles 10-15% over time, so order slightly more than your exact calculation suggests.',
                'Schedule delivery before planting — give soil time to settle and be worked before adding plants or sod.',
                'For new lawn prep in Jacksonville, sandy loam or a topsoil/compost blend works best for sod installation.',
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

      {/* ── Jacksonville Topsoil Info ──────────────────────────── */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-lg text-center mb-4">Topsoil &amp; Soil in Jacksonville, FL</h2>
          <p className="text-center text-secondary-600 text-lg mb-10 max-w-2xl mx-auto">
            Everything you need to know about soil for your Jacksonville landscaping project.
          </p>

          <div className="prose max-w-none">
            <h3>Why Quality Topsoil Matters in Jacksonville</h3>
            <p>
              Jacksonville&apos;s native soil is predominantly sandy, which drains quickly but doesn&apos;t retain 
              nutrients well. Quality topsoil provides the foundation your plants need to thrive. Whether you&apos;re 
              building new garden beds, preparing for sod installation, or leveling your yard, the right soil 
              makes all the difference in long-term plant health.
            </p>

            <h3>Choosing the Right Soil Type</h3>
            <ul>
              <li><strong>Topsoil:</strong> The most versatile and budget-friendly option. Good for general filling, grading, and establishing new lawns over existing soil.</li>
              <li><strong>Garden Mix:</strong> A premium blend of topsoil and compost — ideal for vegetable gardens, flower beds, and raised beds where nutrition matters.</li>
              <li><strong>Compost:</strong> Pure organic matter for amending existing soil. Mix into your current soil to improve structure, drainage, and nutrient content.</li>
              <li><strong>Fill Dirt:</strong> Structural subsoil for grading and filling. Not suitable for growing, but essential for raising elevation and fixing drainage issues.</li>
              <li><strong>Sandy Loam:</strong> The best all-purpose growing soil for Jacksonville. Balances drainage (from sand) with water and nutrient retention (from silt and clay).</li>
            </ul>

            <h3>How Much Topsoil Do You Need?</h3>
            <p>
              The amount of topsoil depends on your project:
            </p>
            <ul>
              <li><strong>Top-dressing existing lawn:</strong> 1-2 inches (about 3-6 cubic yards per 1,000 sq ft)</li>
              <li><strong>New garden beds:</strong> 3-4 inches (about 9-12 cubic yards per 1,000 sq ft)</li>
              <li><strong>New lawn preparation:</strong> 4-6 inches (about 12-18 cubic yards per 1,000 sq ft)</li>
              <li><strong>Raised beds:</strong> Fill to your bed height, typically 8-12 inches</li>
            </ul>

            <h3>Ordering &amp; Delivery</h3>
            <p>
              Topsoil is sold by the cubic yard for bulk delivery. One cubic yard weighs approximately 
              2,000-2,500 pounds depending on moisture content. For large projects, bulk delivery is the 
              most economical option. <strong>Contact us for a free delivery quote</strong> to your Jacksonville property.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────── */}
      <CTASection
        title="Ready to Get Your Topsoil Delivered?"
        description="Use your calculator estimate as a starting point, then get an exact quote from Jacksonville's trusted landscaping professionals. Free quotes, no obligation."
      />
    </>
  )
}

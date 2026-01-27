import { Metadata } from 'next'
import Link from 'next/link'
import MulchCalculator from './MulchCalculator'
import CTASection from '@/components/CTASection'
import { FiCheckCircle, FiMapPin, FiTarget, FiGrid, FiClipboard, FiLayers } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Mulch Calculator Jacksonville FL – Estimate Cubic Yards & Bags | Jax Sod',
  description:
    'Free mulch calculator for Jacksonville, FL homeowners. Instantly estimate cubic yards and bags needed for pine bark, cypress, hardwood, cedar, and more.',
  keywords: [
    'mulch calculator',
    'mulch calculator jacksonville',
    'how much mulch do I need',
    'cubic yards of mulch',
    'mulch calculator cubic yards',
    'landscaping mulch jacksonville fl',
    'pine bark mulch calculator',
    'cypress mulch calculator',
  ],
  alternates: { canonical: 'https://jaxsod.com/calculators/mulch-calculator' },
  openGraph: {
    title: 'Mulch Calculator – Estimate Your Jacksonville Mulch Needs | Jax Sod',
    description:
      'Free mulch calculator: enter your bed dimensions and get an instant estimate for cubic yards and bags needed in Jacksonville, FL.',
    url: 'https://jaxsod.com/calculators/mulch-calculator',
    type: 'website',
  },
}

function MulchCalculatorSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Mulch Calculator – Jax Sod Jacksonville FL',
    description:
      'Free mulch calculator for Jacksonville homeowners. Estimate cubic yards and bags needed for pine bark, cypress, hardwood, cedar, and more.',
    url: 'https://jaxsod.com/calculators/mulch-calculator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'LocalBusiness',
      name: 'Jax Sod',
      telephone: '(904) 901-1457',
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
        name: 'How much mulch do I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Measure the length and width of your bed in feet to get square footage. Then decide on depth — 2-3 inches for established beds, 4+ inches for new installations. Use our calculator to convert to cubic yards. As a rule of thumb, one cubic yard covers about 162 square feet at 2 inches deep.',
        },
      },
      {
        '@type': 'Question',
        name: 'How deep should mulch be?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For most established landscape beds, 2-3 inches of mulch is ideal. New installations or areas with heavy weed pressure benefit from 4 inches. Avoid piling mulch deeper than 4 inches, and keep it 3-6 inches away from plant stems and tree trunks to prevent rot.',
        },
      },
      {
        '@type': 'Question',
        name: 'What type of mulch is best for Jacksonville, FL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best mulch for Jacksonville depends on your project. Pine bark and pine straw are budget-friendly and widely available. Cypress resists floating in heavy rain. Hardwood mulch is a great mid-range option that enriches soil as it decomposes. Cedar is a premium choice with natural pest resistance. Contact a local landscaping professional for personalized advice.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many bags of mulch do I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bag sizes vary by brand — common sizes are 2 cubic feet and 3 cubic feet. One cubic yard equals 27 cubic feet, so you would need about 14 bags of 2 cu ft mulch or 9 bags of 3 cu ft mulch per cubic yard. Use our calculator above for an exact estimate based on your area and depth.',
        },
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
}

export default function MulchCalculatorPage() {
  return (
    <>
      <MulchCalculatorSchema />
      <FAQSchema />

      {/* ── Hero Section ───────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container-custom relative z-10 py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-primary-200">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/calculators" className="hover:text-white transition-colors">Calculators</Link></li>
              <li>/</li>
              <li className="text-white font-medium">Mulch Calculator</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <h1 className="heading-xl text-white mb-4">
              Mulch Calculator
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed mb-2">
              Estimate how much mulch you need for your Jacksonville landscaping beds. Calculate cubic yards and bags — completely free.
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
          <MulchCalculator />
        </div>
      </section>

      {/* ── How to Measure Section ─────────────────────────────── */}
      <section className="section-padding bg-white" id="how-to-measure">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-lg text-center mb-4">How to Measure Your Mulch Beds</h2>
          <p className="text-center text-secondary-600 text-lg mb-12 max-w-2xl mx-auto">
            Accurate measurements ensure you order the right amount of mulch — not too much, not too little.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: FiTarget,
                title: 'Step 1: Outline Your Beds',
                desc: 'Walk the perimeter of each bed and note the general shape. Most beds are roughly rectangular, but use triangles or circles for curved areas.',
              },
              {
                icon: FiGrid,
                title: 'Step 2: Measure Length & Width',
                desc: 'Use a tape measure or measuring wheel to record the length and width of each bed in feet. For irregular beds, break them into simpler shapes.',
              },
              {
                icon: FiLayers,
                title: 'Step 3: Decide on Depth',
                desc: 'Choose your mulch depth: 2-3 inches for refreshing existing beds, 4+ inches for new installations. If you already have mulch, measure the remaining depth first.',
              },
              {
                icon: FiClipboard,
                title: 'Step 4: Add It All Up',
                desc: 'Enter each bed\'s dimensions into our calculator. Add 10% waste factor for uneven edges and settling. The calculator will give you total cubic yards needed.',
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
            <h3 className="heading-sm text-primary-800 mb-4">💡 Pro Tips for Mulching</h3>
            <ul className="space-y-3">
              {[
                'One cubic yard of mulch covers approximately 162 sq ft at 2" deep, 108 sq ft at 3" deep, or 81 sq ft at 4" deep.',
                'Keep mulch 3-6 inches away from tree trunks and plant stems to prevent rot ("volcano mulching" is harmful).',
                'In Jacksonville\'s climate, plan to refresh mulch beds once or twice per year as organic mulch decomposes.',
                'For weed suppression, lay landscape fabric or cardboard under new mulch before spreading.',
                'Bulk delivery is often more economical for projects needing 3+ cubic yards — ask for a free delivery quote.',
                'Wet mulch down lightly after spreading to help it settle and stay in place.',
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

      {/* ── Jacksonville Mulch Info ──────────────────────────── */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-lg text-center mb-4">Mulch Landscaping in Jacksonville, FL</h2>
          <p className="text-center text-secondary-600 text-lg mb-10 max-w-2xl mx-auto">
            Everything you need to know about mulching in the Jacksonville area.
          </p>

          <div className="prose max-w-none">
            <h3>Why Mulch Your Landscape Beds?</h3>
            <p>
              Mulch is one of the most impactful and affordable landscaping improvements you can make. 
              It suppresses weeds, retains soil moisture (critical in Jacksonville&apos;s hot summers), 
              regulates soil temperature, and gives your beds a clean, finished look. As organic mulch 
              decomposes, it also enriches your soil with nutrients.
            </p>

            <h3>Choosing the Right Mulch for Jacksonville</h3>
            <p>
              Jacksonville&apos;s climate — hot, humid summers and mild winters — means you need mulch that 
              holds up to heavy rain and heat. Here&apos;s a quick guide:
            </p>
            <ul>
              <li><strong>Pine Bark &amp; Pine Straw:</strong> Budget-friendly choices that are widely available in Northeast Florida. Pine straw is excellent for sloped areas since it stays in place better than shredded mulch.</li>
              <li><strong>Cypress Mulch:</strong> A mid-range option that resists washing away in Jacksonville&apos;s frequent summer downpours. Light color reflects heat.</li>
              <li><strong>Hardwood Mulch:</strong> Dense and long-lasting. Available in natural and dyed colors. A versatile mid-range choice for most beds.</li>
              <li><strong>Cedar Mulch:</strong> Premium option with natural insect-repellent properties — especially valuable in Florida&apos;s bug-heavy environment.</li>
              <li><strong>Rubber Mulch:</strong> Does not decompose and lasts for years. Best for playgrounds and permanent installations, but does not enrich soil.</li>
            </ul>

            <h3>How Often Should You Remulch in Jacksonville?</h3>
            <p>
              In Jacksonville&apos;s warm, humid climate, organic mulch breaks down faster than in cooler regions. 
              Plan to <strong>refresh your mulch 1-2 times per year</strong> — typically in spring and optionally again in fall. 
              If your existing mulch still has good depth, you may only need a thin top-up layer of 1-2 inches.
            </p>

            <h3>Bulk vs. Bagged Mulch</h3>
            <p>
              For small projects (under 2-3 cubic yards), bagged mulch from your local garden center may be convenient. 
              For larger projects, <strong>bulk delivery is typically more economical</strong> and saves you multiple 
              trips. Contact us for a free quote on mulch delivery to your Jacksonville property.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────── */}
      <CTASection
        title="Ready to Get Your Mulch Delivered?"
        description="Use your calculator estimate as a starting point, then get an exact quote from Jacksonville's trusted landscaping professionals. Free quotes, no obligation."
      />
    </>
  )
}

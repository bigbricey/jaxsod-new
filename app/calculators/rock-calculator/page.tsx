import { Metadata } from 'next'
import Link from 'next/link'
import RockCalculator from './RockCalculator'
import CTASection from '@/components/CTASection'
import { FiCheckCircle, FiMapPin, FiTarget, FiGrid, FiClipboard, FiLayers } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Rock & Gravel Calculator Jacksonville FL – Estimate Cubic Yards & Tons | Jax Sod',
  description:
    'Free rock and gravel calculator for Jacksonville, FL homeowners. Instantly estimate cubic yards and tons needed for pea gravel, river rock, crushed limestone, and more.',
  keywords: [
    'gravel calculator',
    'rock calculator',
    'rock calculator jacksonville',
    'gravel calculator jacksonville',
    'how much gravel do I need',
    'cubic yards of gravel',
    'tons of rock calculator',
    'pea gravel calculator',
    'river rock calculator',
    'landscaping rock jacksonville fl',
  ],
  alternates: { canonical: 'https://jaxsod.com/calculators/rock-calculator' },
  openGraph: {
    title: 'Rock & Gravel Calculator – Estimate Your Jacksonville Project Needs | Jax Sod',
    description:
      'Free rock and gravel calculator: enter your area dimensions and get an instant estimate for cubic yards and tons needed in Jacksonville, FL.',
    url: 'https://jaxsod.com/calculators/rock-calculator',
    type: 'website',
  },
}

function RockCalculatorSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Rock & Gravel Calculator – Jax Sod Jacksonville FL',
    description:
      'Free rock and gravel calculator for Jacksonville homeowners. Estimate cubic yards and tons for pea gravel, river rock, crushed limestone, and more.',
    url: 'https://jaxsod.com/calculators/rock-calculator',
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
        name: 'How much gravel do I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Measure the length and width of your area in feet to get square footage. Then decide on depth — typically 2-4 inches for most landscaping projects. Use our calculator to convert to cubic yards and estimated tons. As a general rule, one cubic yard of gravel weighs approximately 1.4 tons, but this varies by material.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many tons of rock do I need per cubic yard?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The weight per cubic yard varies by material type. Most gravel and rock averages about 1.4 tons per cubic yard. Crushed limestone and decomposed granite are slightly heavier at about 1.5 tons per cubic yard. Lava rock is much lighter at about 0.5 tons per cubic yard due to its porous nature.',
        },
      },
      {
        '@type': 'Question',
        name: 'What type of rock is best for landscaping in Jacksonville?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best rock for your Jacksonville project depends on the application. Pea gravel is versatile and great for walkways and drainage. River rock works well for decorative beds and dry creek beds. Crushed limestone is ideal for driveways and compacted surfaces. Contact a local landscaping professional for personalized recommendations.',
        },
      },
      {
        '@type': 'Question',
        name: 'How deep should landscaping rock be?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For most decorative landscaping, 2-3 inches of rock provides good coverage. Driveways and high-traffic areas should have 3-4 inches. For drainage projects, 4 inches or more may be recommended. Using landscape fabric underneath helps prevent rock from sinking into soil over time.',
        },
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
}

export default function RockCalculatorPage() {
  return (
    <>
      <RockCalculatorSchema />
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
              <li className="text-white font-medium">Rock &amp; Gravel Calculator</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <h1 className="heading-xl text-white mb-4">
              Rock &amp; Gravel Calculator
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed mb-2">
              Estimate how much rock or gravel you need for your Jacksonville landscaping project. Calculate cubic yards and tons — completely free.
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
          <RockCalculator />
        </div>
      </section>

      {/* ── How to Measure Section ─────────────────────────────── */}
      <section className="section-padding bg-white" id="how-to-measure">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-lg text-center mb-4">How to Measure Your Rock Area</h2>
          <p className="text-center text-secondary-600 text-lg mb-12 max-w-2xl mx-auto">
            Accurate measurements help you order the right amount of rock or gravel the first time.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: FiTarget,
                title: 'Step 1: Define the Area',
                desc: 'Mark the boundaries of your rock or gravel area with stakes or spray paint. Note the overall shape — rectangle, circle, or irregular.',
              },
              {
                icon: FiGrid,
                title: 'Step 2: Measure Dimensions',
                desc: 'Use a tape measure for the length and width of each section in feet. For curved areas, measure the radius from center to edge.',
              },
              {
                icon: FiLayers,
                title: 'Step 3: Choose Your Depth',
                desc: 'Select your rock depth: 2" for decorative cover, 3" for general landscaping, 4" for driveways and heavy traffic areas.',
              },
              {
                icon: FiClipboard,
                title: 'Step 4: Calculate & Order',
                desc: 'Enter your dimensions into our calculator to get cubic yards and estimated tons. Add 10% for waste and settling, then request a delivery quote.',
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
            <h3 className="heading-sm text-primary-800 mb-4">💡 Pro Tips for Rock &amp; Gravel Projects</h3>
            <ul className="space-y-3">
              {[
                'Always install landscape fabric or a weed barrier under rock to prevent weeds and keep stones from sinking into soil.',
                'Rock doesn\'t decompose like mulch, making it a long-term investment — but plan for occasional top-ups due to settling.',
                'Use edging (steel, aluminum, or plastic) to keep gravel contained and prevent it from spreading into lawn areas.',
                'For drainage projects, crushed angular stone compacts better than round river rock.',
                'Bulk delivery is recommended for orders over 1 cubic yard — it\'s more economical and saves multiple trips.',
                'In Jacksonville\'s sandy soil, a compacted base layer may be needed under decorative rock for stability.',
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

      {/* ── Jacksonville Rock Info ──────────────────────────── */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-lg text-center mb-4">Rock &amp; Gravel Landscaping in Jacksonville, FL</h2>
          <p className="text-center text-secondary-600 text-lg mb-10 max-w-2xl mx-auto">
            Everything you need to know about using rock and gravel in your Jacksonville landscape.
          </p>

          <div className="prose max-w-none">
            <h3>Why Use Rock in Your Jacksonville Landscape?</h3>
            <p>
              Rock and gravel landscaping offers a low-maintenance alternative to organic mulch that thrives in 
              Jacksonville&apos;s climate. Unlike mulch, rock doesn&apos;t decompose, wash away in heavy rain, 
              or need annual replacement. It&apos;s perfect for creating defined walkways, decorative beds, 
              dry creek beds, and drainage solutions.
            </p>

            <h3>Popular Rock Types for Jacksonville</h3>
            <ul>
              <li><strong>Pea Gravel:</strong> The most versatile option. Small, rounded stones that are comfortable to walk on and provide excellent drainage. A budget-friendly choice for paths and patios.</li>
              <li><strong>River Rock:</strong> Smooth, naturally rounded stones available in various sizes. Creates a premium, natural look for decorative beds and water features.</li>
              <li><strong>Crushed Limestone:</strong> Angular stone that compacts well, making it ideal for driveways, pathways, and base layers. A practical mid-range choice.</li>
              <li><strong>Lava Rock:</strong> Lightweight volcanic rock with excellent drainage. The distinctive red-black color adds visual interest to xeriscaping projects.</li>
              <li><strong>Marble Chips:</strong> Bright white angular chips for a premium, clean look. Popular for accent areas and formal landscapes.</li>
              <li><strong>Decomposed Granite:</strong> Finely crushed granite that packs down to create a firm, natural-looking surface. Great for patios and rustic pathways.</li>
            </ul>

            <h3>Rock vs. Mulch: Which Is Better?</h3>
            <p>
              Both have their place in Jacksonville landscaping. <strong>Rock</strong> is better for permanent installations, 
              low-maintenance areas, drainage, and modern aesthetics. <strong>Mulch</strong> is better for areas around plants 
              that benefit from soil enrichment, moisture retention, and seasonal refreshing. Many Jacksonville homeowners 
              use both — rock in hardscape areas and mulch in planting beds.
            </p>

            <h3>Ordering Rock for Your Project</h3>
            <p>
              Rock and gravel are sold by the cubic yard (volume) or by the ton (weight). Our calculator provides 
              both measurements so you can order from any supplier. For delivery estimates and professional 
              installation, <strong>contact us for a free quote</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────── */}
      <CTASection
        title="Ready to Get Your Rock & Gravel Delivered?"
        description="Use your calculator estimate as a starting point, then get an exact quote from Jacksonville's trusted landscaping professionals. Free quotes, no obligation."
      />
    </>
  )
}

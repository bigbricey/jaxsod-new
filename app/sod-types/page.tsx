import { Metadata } from 'next'
import Hero from '@/components/Hero'
import CTASection from '@/components/CTASection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sod Types for Jacksonville FL | St. Augustine, Zoysia, Bermuda, Bahia',
  description:
    'Compare the best sod types for Jacksonville, FL lawns: St. Augustine, Zoysia, Bermuda, and Bahia. Expert guide to choosing the right grass for your property.',
  alternates: { canonical: 'https://jaxsod.com/sod-types' },
}

export default function SodTypesPage() {
  const sodTypes = [
    {
      name: 'St. Augustine',
      tagline: 'The Florida Classic',
      description:
        'The most popular residential grass in Northeast Florida. St. Augustine produces a lush, wide-bladed, deep-green lawn that thrives in our climate. Multiple varieties offer different levels of shade tolerance.',
      pros: [
        'Best shade tolerance of any Florida grass',
        'Excellent salt tolerance for coastal properties',
        'Dense growth that crowds out weeds',
        'Lush, carpet-like appearance',
      ],
      cons: [
        'Susceptible to chinch bugs',
        'Higher water requirements',
        'Prone to fungal issues in humid conditions',
        'Not great for heavy foot traffic',
      ],
      varieties: [
        { name: 'Floratam', desc: 'King of sun-loving lawns. Most aggressive grower.' },
        { name: 'Palmetto', desc: 'Best shade tolerance. Finer texture, deeper green.' },
        { name: 'Seville', desc: 'Heavy shade specialist with dwarf growth habit.' },
        { name: 'CitraBlue', desc: 'Newer UF variety. Blue-green hue, less fertilizer needed.' },
      ],
      bestFor: 'Shaded yards, coastal properties, established neighborhoods',
    },
    {
      name: 'Zoysia',
      tagline: 'The Premium Up-and-Comer',
      description:
        'Zoysia has exploded in popularity for good reason. Its fine-textured, dense growth creates a "golf course" look, and it handles foot traffic, drought, and pests better than St. Augustine.',
      pros: [
        'Soft, carpet-like texture — best barefoot grass',
        'Excellent traffic tolerance for kids and pets',
        'Chinch bug resistant',
        'Superior drought tolerance',
      ],
      cons: [
        'Higher upfront cost than St. Augustine',
        'Slower to repair from damage',
        'Builds thatch that needs periodic management',
        'Goes dormant (browns) in winter',
      ],
      varieties: [
        { name: 'Empire', desc: 'Most popular. Wider blade, incredibly durable.' },
        { name: 'Zeon', desc: 'Fine-bladed luxury variety. Stunning visual appeal.' },
        { name: 'Icon', desc: 'Fine-textured, great for high-end properties.' },
      ],
      bestFor: 'Active families, pet owners, full-sun yards, drought-prone areas',
    },
    {
      name: 'Bermuda',
      tagline: 'The Athlete',
      description:
        'Bermuda is the grass of golf courses and sports fields. It recovers from damage faster than any other grass and maintains a beautiful, fine-textured appearance when maintained properly.',
      pros: [
        'Fastest damage recovery of any warm-season grass',
        'Highest traffic tolerance available',
        'Beautiful fine texture when mowed low',
        'Aggressive spreading fills bare spots quickly',
      ],
      cons: [
        'Zero shade tolerance — full sun only',
        'Highest maintenance requirements',
        'Invasive — will spread into flower beds',
        'Requires frequent mowing',
      ],
      varieties: [
        { name: 'Tifway 419', desc: 'The industry standard for sports turf.' },
        { name: 'Celebration', desc: 'Excellent color and drought tolerance.' },
      ],
      bestFor: 'Full-sun properties, sports areas, high-traffic commercial sites',
    },
    {
      name: 'Bahia',
      tagline: 'The Budget-Friendly Workhorse',
      description:
        'Bahia is the toughest, most low-maintenance grass for Florida. Deep roots make it nearly indestructible once established. Not the prettiest lawn, but the most practical for large areas.',
      pros: [
        'Lowest cost sod option',
        'Incredible drought tolerance with deep roots',
        'Minimal fertilizer needs',
        'Resistant to virtually all pests and diseases',
      ],
      cons: [
        'Open, coarse texture — not a "manicured" look',
        'Prolific seed head production',
        'Poor shade tolerance',
        'Allows weeds to mix in due to open growth',
      ],
      varieties: [
        { name: 'Argentine', desc: 'Best for lawns. Wider blades, darker green.' },
        { name: 'Pensacola', desc: 'Highway medians and erosion control.' },
      ],
      bestFor: 'Large lots, budget-conscious projects, properties without irrigation',
    },
  ]

  return (
    <>
      <Hero
        title="Sod Types for Jacksonville"
        description="St. Augustine, Zoysia, Bermuda, or Bahia? Choose the right grass for your property's sun, shade, traffic, and maintenance needs."
        backgroundImage="https://images.unsplash.com/photo-1458245201577-fc8a130b8829?q=80&w=2000&auto=format&fit=crop"
        height="medium"
      />

      {/* Comparison Table */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-8">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-secondary-200 text-sm md:text-base">
              <thead className="bg-primary-50">
                <tr>
                  <th className="border border-secondary-200 p-3 text-left">Feature</th>
                  <th className="border border-secondary-200 p-3 text-left">St. Augustine</th>
                  <th className="border border-secondary-200 p-3 text-left">Zoysia</th>
                  <th className="border border-secondary-200 p-3 text-left">Bermuda</th>
                  <th className="border border-secondary-200 p-3 text-left">Bahia</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Shade Tolerance', '⭐⭐⭐⭐ Best', '⭐⭐⭐ Moderate', '❌ None', '⭐ Poor'],
                  ['Traffic Tolerance', '⭐⭐ Fair', '⭐⭐⭐⭐⭐ Excellent', '⭐⭐⭐⭐⭐ Best', '⭐⭐ OK'],
                  ['Drought Tolerance', '⭐⭐ Needs water', '⭐⭐⭐⭐ Great', '⭐⭐⭐⭐ Great', '⭐⭐⭐⭐⭐ Best'],
                  ['Maintenance', 'Medium', 'Medium', 'High', 'Low'],
                  ['Cost', '$$', '$$$', '$$', '$'],
                  ['Blade Texture', 'Broad, coarse', 'Fine, dense', 'Very fine', 'Open, coarse'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-secondary-50'}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`border border-secondary-200 p-3 ${j === 0 ? 'font-semibold' : ''}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Sod Types */}
      {sodTypes.map((sod, index) => (
        <section
          key={sod.name}
          className={`section-padding ${index % 2 === 0 ? 'bg-secondary-50' : ''}`}
          id={sod.name.toLowerCase().replace(/\s+/g, '-')}
        >
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <h2 className="heading-lg mb-2">{sod.name} Grass</h2>
              <p className="text-primary-600 font-semibold text-lg mb-6">{sod.tagline}</p>
              <p className="text-lg text-secondary-700 mb-8">{sod.description}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="font-bold text-green-800 mb-3 text-lg">Pros</h3>
                  <ul className="space-y-2">
                    {sod.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-green-800">
                        <span className="mt-0.5">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
                  <h3 className="font-bold text-red-800 mb-3 text-lg">Cons</h3>
                  <ul className="space-y-2">
                    {sod.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-red-800">
                        <span className="mt-0.5">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="font-bold text-lg mb-4">Varieties Available</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {sod.varieties.map((v) => (
                    <div key={v.name} className="flex gap-3">
                      <span className="text-primary-600 font-bold">{v.name}:</span>
                      <span className="text-secondary-700">{v.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="bg-primary-50 p-4 rounded-lg text-primary-800 font-medium">
                <strong>Best For:</strong> {sod.bestFor}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* Decision Helper */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg text-center mb-8">Not Sure Which to Choose?</h2>
            <div className="space-y-4">
              {[
                { q: 'Have large oak trees?', a: 'St. Augustine (Palmetto or Seville) — best shade tolerance.' },
                { q: 'Active kids and dogs?', a: 'Zoysia (Empire) — handles foot traffic like a champ.' },
                { q: 'Full sun, athletic use?', a: 'Bermuda — the sports turf champion.' },
                { q: 'No irrigation system?', a: "Bahia — survives on rainfall alone once established." },
                { q: 'Want the best-looking lawn?', a: 'St. Augustine (Floratam) or Zoysia (Empire) with proper care.' },
              ].map((item) => (
                <div key={item.q} className="bg-secondary-50 p-5 rounded-lg">
                  <h3 className="font-bold text-secondary-900 text-lg">{item.q}</h3>
                  <p className="text-secondary-700 mt-1">{item.a}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Get Expert Help Choosing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

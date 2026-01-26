import { Metadata } from 'next'
import Hero from '@/components/Hero'
import CTASection from '@/components/CTASection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ | Sod Installation Questions Jacksonville FL',
  description:
    'Frequently asked questions about sod installation in Jacksonville, FL. Learn about costs, timing, sod types, aftercare, and more from Jax Sod experts.',
  alternates: { canonical: 'https://jaxsod.com/faq' },
}

export default function FAQPage() {
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I get a quote for sod installation?',
          a: 'The easiest way is to text us at (904) 901-1457 with your name, address, and which areas of your yard you want sodded. We\'ll schedule a free on-site assessment and provide a detailed quote. Most quotes are delivered within 1-2 business days of the site visit.',
        },
        {
          q: 'How quickly can you install after I approve a quote?',
          a: 'Most projects begin within 1-2 weeks of approval, depending on scope, sod availability, and weather. Larger commercial projects may require more lead time for sod sourcing and crew scheduling.',
        },
        {
          q: 'Do you offer free estimates?',
          a: 'Yes! Every estimate is free and includes an on-site property assessment, sod type recommendation, and detailed pricing breakdown with no hidden fees.',
        },
      ],
    },
    {
      category: 'Sod Selection',
      questions: [
        {
          q: 'Which sod type is best for my yard?',
          a: 'It depends on your sun/shade conditions, foot traffic, and maintenance preferences. St. Augustine is best for shade, Zoysia handles traffic and drought best, Bermuda is for full-sun athletic use, and Bahia is the budget-friendly, low-maintenance option. We assess your yard and make an honest recommendation.',
        },
        {
          q: 'Can I mix different sod types in my yard?',
          a: 'We occasionally install different types in different areas — for example, shade-tolerant Palmetto St. Augustine under trees and Empire Zoysia in sunny sections. However, mixing types in the same visible area creates an uneven appearance.',
        },
        {
          q: 'What is the most popular sod in Jacksonville?',
          a: 'St. Augustine is by far the most popular, accounting for roughly 70-80% of residential lawns in Northeast Florida. Empire Zoysia is a fast-growing second choice, especially for newer developments.',
        },
      ],
    },
    {
      category: 'Installation Process',
      questions: [
        {
          q: 'What does the installation process include?',
          a: 'A complete installation includes: removal of existing turf, surface smoothing and prep, delivery of farm-fresh sod, professional installation with staggered seams and tight joints, rolling for soil contact, and a detailed aftercare plan.',
        },
        {
          q: 'How long does installation take?',
          a: 'Most residential projects (2,000-5,000 sq ft) are completed in a single day. Larger projects may take 2-3 days. Commercial installations are scheduled based on project scope.',
        },
        {
          q: 'Do I need to be home during installation?',
          a: 'Not necessarily, but someone should be available for the initial walkthrough and final review. Many homeowners continue their normal routine while our crew works.',
        },
      ],
    },
    {
      category: 'Cost & Pricing',
      questions: [
        {
          q: 'How much does sod installation cost?',
          a: 'Pricing varies based on sod type, square footage, site conditions, and prep work needed. St. Augustine is generally the most affordable, while Zoysia costs more. We provide transparent, all-inclusive pricing with no surprises.',
        },
        {
          q: 'Do you offer financing?',
          a: 'Please contact us to discuss payment options for your specific project. We work with homeowners and commercial clients to find solutions that fit their budget.',
        },
      ],
    },
    {
      category: 'Aftercare',
      questions: [
        {
          q: 'How often should I water new sod?',
          a: 'For the first 7-10 days, water 2-3 times daily to keep the sod pad moist. During weeks 2-3, reduce to once daily with deeper watering. After 3-4 weeks, transition to a normal schedule of 2-3 times per week with deep soaking. We provide a detailed schedule specific to your sod type and season.',
        },
        {
          q: 'When can I mow new sod?',
          a: 'Wait at least 2-3 weeks until the sod is firmly rooted (passes the "tug test"). For your first mow, set the mower to the highest setting and only remove the top 1/3 of the blade. Use a sharp mower blade to avoid tearing.',
        },
        {
          q: 'When can I walk on new sod?',
          a: 'Light foot traffic is okay after 2 weeks. Normal use can resume after 3-4 weeks. Avoid heavy traffic, playing, and pets on new sod for the first 3 weeks to prevent displacement and compaction.',
        },
        {
          q: 'How long does it take for sod to fully root?',
          a: 'In Florida\'s growing season (spring/summer), sod typically roots in 2-4 weeks. Winter installations may take 6-8 weeks since growth is slower. Full establishment with deep roots takes 30-60 days.',
        },
      ],
    },
    {
      category: 'Seasonal & Timing',
      questions: [
        {
          q: 'What is the best time of year to install sod in Jacksonville?',
          a: 'Spring (March-May) is ideal — warm soil, mild temps, and the full growing season ahead. Early fall (September-October) is also excellent. Summer works with diligent watering, and winter installations are viable but slower to establish.',
        },
        {
          q: 'Can you install sod in winter?',
          a: 'Yes! Jacksonville rarely freezes, so sod can be installed year-round. Winter sod will look dormant for a few months but will green up and root when spring arrives. Water requirements are lower in winter.',
        },
      ],
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap((cat) =>
      cat.questions.map((q) => ({
        '@type': 'Question',
        name: q.q,
        acceptedAnswer: { '@type': 'Answer', text: q.a },
      }))
    ),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Hero
        title="Frequently Asked Questions"
        description="Everything you need to know about sod installation in Jacksonville. Can't find your answer? Text us at (904) 901-1457."
        backgroundImage="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2000&auto=format&fit=crop"
        height="small"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {faqs.map((category) => (
              <div key={category.category} className="mb-12">
                <h2 className="heading-md mb-6 text-primary-700">{category.category}</h2>
                <div className="space-y-6">
                  {category.questions.map((faq) => (
                    <div key={faq.q} className="bg-white border border-secondary-200 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-secondary-900 mb-3">{faq.q}</h3>
                      <p className="text-secondary-700 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary-50">
        <div className="container-custom text-center">
          <h2 className="heading-md mb-4">Still Have Questions?</h2>
          <p className="text-lg text-secondary-700 mb-6 max-w-2xl mx-auto">
            We&apos;re happy to help! Text or call us for personalized answers about your specific
            sod installation project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
            <a href="tel:9049011457" className="btn-secondary">
              Call (904) 901-1457
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

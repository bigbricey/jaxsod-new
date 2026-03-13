import AnimatedGrassHero from '@/components/AnimatedGrassHero'
import ServiceCard from '@/components/ServiceCard'
import TestimonialCard from '@/components/TestimonialCard'
import EstimateForm from '@/components/EstimateForm'
import CTASection from '@/components/CTASection'
import ScrollReveal from '@/components/ScrollReveal'
import OpenChatButton from '@/components/OpenChatButton'
import Image from 'next/image'
import Link from 'next/link'
import {
  FiHome,
  FiCheckCircle,
  FiBriefcase,
  FiAward,
  FiClock,
  FiUsers,
  FiArrowRight,
} from 'react-icons/fi'
import { BUSINESS_NAME, getExperienceText } from '@/lib/constants'

const experienceText = getExperienceText()

export const metadata = {
  title: `Professional Sod Installation Jacksonville FL | ${experienceText} | ${BUSINESS_NAME}`,
  description: `Transform your lawn with professional sod installation in Jacksonville, FL. ${experienceText} of experience, expert installers, St. Augustine, Zoysia, Bermuda & Bahia sod. Free quotes!`,
}

export default function Home() {
  const sodVarieties = [
    {
      name: 'St. Augustine',
      slug: 'st-augustine',
      image:
        'https://images.unsplash.com/photo-1593617589445-a9cb66fbae15?q=80&w=600&auto=format&fit=crop',
      bullets: [
        'Thrives in coastal humidity and salt exposure',
        'Ideal for shady spots under Jacksonville oaks',
      ],
      gradient: 'from-[#166534] to-[#22c55e]',
    },
    {
      name: 'Zoysia',
      slug: 'zoysia',
      image:
        'https://images.unsplash.com/photo-1544914379-806667cd9489?q=80&w=600&auto=format&fit=crop',
      bullets: [
        'Dense, carpet-like texture for active yards',
        'Handles heavy foot traffic from kids and pets',
      ],
      gradient: 'from-[#14532d] to-[#16a34a]',
    },
    {
      name: 'Bermuda',
      slug: 'bermuda',
      image:
        'https://images.unsplash.com/photo-1597040827713-24d4c7e4b0e2?q=80&w=600&auto=format&fit=crop',
      bullets: [
        'Excellent for full-sun properties',
        'Recovers quickly from wear in high-traffic areas',
      ],
      gradient: 'from-[#365314] to-[#65a30d]',
    },
    {
      name: 'Bahia',
      slug: 'bahia',
      image:
        'https://images.unsplash.com/photo-1509218541462-aa68e407d0ca?q=80&w=600&auto=format&fit=crop',
      bullets: [
        'Budget-friendly with strong drought tolerance',
        'Great for larger lots and utility areas',
      ],
      gradient: 'from-[#3f6212] to-[#84cc16]',
    },
  ]

  const processSteps = [
    {
      num: '01',
      title: 'Free Assessment',
      description:
        'We walk your property, evaluate sunlight and soil conditions, and measure every square foot. No cost, no commitment.',
    },
    {
      num: '02',
      title: 'Surface Prep',
      description:
        'Old turf removed. Ground leveled and graded. The foundation for a lawn that lasts starts here.',
    },
    {
      num: '03',
      title: 'Sod Installation',
      description:
        'Premium, farm-fresh sod delivered and installed same day. Staggered seams, rolled tight, edges cut clean.',
    },
    {
      num: '04',
      title: 'Aftercare Plan',
      description:
        'Custom watering schedule and maintenance guide tailored to your grass type and property. We don\'t disappear after install.',
    },
  ]

  const homepageFaqs = [
    {
      q: 'How much does sod installation cost in Jacksonville?',
      a: 'Pricing depends on the sod variety, square footage, and site conditions like accessibility and prep work needed. Every yard is different, so we provide free on-site estimates with transparent, all-inclusive pricing — no hidden fees.',
    },
    {
      q: 'What is the best type of sod for shade in Florida?',
      a: 'St. Augustine varieties like Palmetto and CitraBlue are the top performers in shade for Northeast Florida. They handle the humidity well and stay green under Jacksonville\'s large oak canopies. We assess your yard\'s specific sun and shade patterns during the free estimate.',
    },
    {
      q: 'How long does it take for new sod to root in Jacksonville?',
      a: 'In Florida\'s growing season (spring and summer), sod typically roots in 2–4 weeks. Winter installations take 6–8 weeks since growth slows. Full establishment with deep roots takes 30–60 days with proper watering.',
    },
    {
      q: 'When is the best time to install sod in Jacksonville, FL?',
      a: 'Spring (March–May) is ideal — warm soil, mild temps, and the full growing season ahead. Early fall (September–October) is also excellent. Summer works with diligent watering, and Jacksonville\'s mild winters allow year-round installation.',
    },
    {
      q: 'How often should I water new sod?',
      a: 'For the first 7–10 days, water 2–3 times daily to keep the sod pad moist. Weeks 2–3, reduce to once daily with deeper soaking. After 3–4 weeks, transition to 2–3 times per week. We provide a watering schedule customized to your sod type and season.',
    },
    {
      q: 'How quickly can you install after I approve a quote?',
      a: 'Most Jacksonville projects start within 1–2 weeks of approval, depending on scope, sod availability, and weather. We coordinate fresh sod delivery directly from the farm for maximum vitality.',
    },
    {
      q: 'Do you help choose the right sod for my yard?',
      a: 'Yes — during the free on-site assessment, we evaluate your sun and shade conditions, foot traffic, soil type, and maintenance preferences to recommend the best sod variety for your specific yard.',
    },
    {
      q: 'What does your sod installation include?',
      a: 'Every installation includes old turf removal, surface smoothing and prep, professional sod laying with staggered seams, rolling for soil contact, and a custom aftercare plan. We handle everything from start to finish.',
    },
  ]

  return (
    <>
      {/* Animated Grass Hero */}
      <AnimatedGrassHero
        title="Beautiful Lawns"
        highlightText="Delivered."
        description="Transform your property with expert sod installation. Nearly 40 years of excellence across Northeast Florida. From first assessment to final roll."
        badgeText="Serving Jacksonville Since 1986"
      />

      {/* Stats Bar */}
      <div className="border-t border-b border-[rgba(34,197,94,0.15)] py-12 bg-[rgba(34,197,94,0.02)]">
        <div className="container-custom">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '38+', label: 'Years of Experience' },
                { value: '5,000+', label: 'Lawns Installed' },
                { value: '9', label: 'Service Areas' },
                { value: '100%', label: 'Satisfaction Guaranteed' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl md:text-5xl font-black text-[#22c55e] tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[rgba(200,230,200,0.5)] mt-2 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#22c55e] mb-3">
                Why Choose Us
              </p>
              <h2 className="heading-lg mb-4">Why Choose {BUSINESS_NAME}?</h2>
              <p className="text-lg text-[rgba(200,230,200,0.5)] max-w-2xl mx-auto">
                Nearly four decades of expertise delivering beautiful, healthy lawns across
                Jacksonville and Northeast Florida.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <FiAward />,
                title: `${experienceText} Experience`,
                desc: 'Decades of sod installation expertise serving the Jacksonville area.',
              },
              {
                icon: <FiCheckCircle />,
                title: 'Expert Installer Network',
                desc: 'We connect you with vetted, professional sod installers who do the job right.',
              },
              {
                icon: <FiUsers />,
                title: 'Residential & Commercial',
                desc: 'From family homes to large commercial properties, we handle projects of any size.',
              },
              {
                icon: <FiClock />,
                title: 'Fast Turnaround',
                desc: 'Most projects start within 1–2 weeks of your approved quote.',
              },
              {
                icon: <FiCheckCircle />,
                title: 'Quality Guaranteed',
                desc: 'Premium sod varieties sourced fresh from local farms for maximum vitality.',
              },
              {
                icon: <FiBriefcase />,
                title: 'Licensed & Insured',
                desc: 'Fully licensed and insured for your protection and peace of mind.',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="border border-[rgba(34,197,94,0.15)] rounded-[20px] p-8 bg-[rgba(15,25,15,0.6)] backdrop-blur-[20px] transition-all duration-500 hover:border-[rgba(34,197,94,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-center h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-[rgba(34,197,94,0.1)] text-[#22c55e] rounded-xl mb-4 text-2xl">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-[rgba(200,230,200,0.5)]">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="glow-divider" />

      {/* Our Process */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#22c55e] mb-3">
                Steps
              </p>
              <h2 className="heading-lg mb-3">How it works</h2>
              <p className="text-lg text-[rgba(200,230,200,0.5)] max-w-[600px] leading-relaxed">
                From your first call to a finished lawn. Four steps, no surprises.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(34,197,94,0.15)] rounded-[20px] overflow-hidden mt-8">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 100}>
                <div className="bg-[rgba(15,25,15,0.6)] backdrop-blur-[20px] p-8 transition-all duration-500 hover:bg-[rgba(34,197,94,0.05)] h-full">
                  <div className="text-5xl font-black text-[rgba(34,197,94,0.1)] leading-none mb-6">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-[rgba(200,230,200,0.5)] leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#22c55e] mb-3">
                Services
              </p>
              <h2 className="heading-lg mb-3">What we do</h2>
              <p className="text-lg text-[rgba(200,230,200,0.5)] max-w-[600px] leading-relaxed">
                Residential and commercial sod installation across Northeast Florida.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ScrollReveal>
              <ServiceCard
                icon={<FiHome />}
                title="Residential Installation"
                description="Front yards, backyards, new construction, renovations. We handle every size property and make it look like a magazine cover."
                features={['Front & Back Yards', 'New Construction', 'Renovation', 'Expert Prep']}
                link="/services"
                linkText="Learn More"
              />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <ServiceCard
                icon={<FiBriefcase />}
                title="Commercial Installation"
                description="Office complexes, retail centers, HOA communities, hotels. Large-scale projects completed on schedule and on budget."
                features={['Office Complexes', 'Retail Centers', 'HOA Communities', 'Hotels']}
                link="/services"
                linkText="Learn More"
              />
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="text-center">
              <Link href="/services" className="btn-primary">
                View All Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="glow-divider" />

      {/* Sod Varieties */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#22c55e] mb-3">
                Sod Types
              </p>
              <h2 className="heading-lg mb-3">Engineered for Florida</h2>
              <p className="text-lg text-[rgba(200,230,200,0.5)] max-w-[600px] mx-auto leading-relaxed">
                Every grass type we install is selected for Northeast Florida&apos;s climate, soil, and conditions.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sodVarieties.map((v, i) => (
              <ScrollReveal key={v.name} delay={i * 100}>
                <div className="border border-[rgba(34,197,94,0.15)] rounded-[20px] p-8 bg-[rgba(10,15,10,0.8)] backdrop-blur-[30px] text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#22c55e] hover:shadow-[0_20px_60px_rgba(34,197,94,0.15)] h-full">
                  {/* Gradient circle */}
                  <div className={`w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-br ${v.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-[3px] rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent)' }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{v.name}</h3>
                  <ul className="space-y-2 text-sm text-[rgba(200,230,200,0.5)] text-left">
                    {v.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <FiCheckCircle className="text-[#22c55e] mt-0.5 flex-shrink-0 w-4 h-4" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-8">
              <Link href="/sod-types" className="btn-secondary">
                View All Sod Types
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote + Contact Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <div className="border border-[rgba(34,197,94,0.15)] rounded-[20px] p-8 bg-[rgba(15,25,15,0.6)] backdrop-blur-[20px]">
                <h2 className="heading-lg mb-4">Get Your Free Custom Quote</h2>
                <p className="text-lg text-[rgba(200,230,200,0.5)] mb-6 leading-relaxed">
                  Every sod project is unique. We tailor recommendations for your square footage,
                  sunlight, and soil so you get exactly what your lawn needs to thrive.
                </p>
                <p className="font-semibold mb-3">
                  What&apos;s included in your quote:
                </p>
                <ul className="space-y-3 text-[rgba(200,230,200,0.5)]">
                  {[
                    'Free on-site property assessment',
                    'Detailed pricing with no hidden fees',
                    'Expert sod type recommendations',
                    'Custom aftercare plan',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <FiCheckCircle className="text-[#22c55e] mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <EstimateForm />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="glow-divider" />

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#22c55e] mb-3">
                Reviews
              </p>
              <h2 className="heading-lg mb-4">What our customers say</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal>
              <TestimonialCard
                name="Michael Thompson"
                location="Jacksonville, FL"
                rating={5}
                text="Incredible work on our front and back yard. The crew was professional from start to finish. Our neighbors can't stop asking who did the lawn."
                date="September 2024"
              />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <TestimonialCard
                name="Sarah Martinez"
                location="Jacksonville Beach, FL"
                rating={5}
                text="Quick installation and the sod is thriving months later. They really know which grass works for our area. Worth every penny."
                date="August 2024"
              />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <TestimonialCard
                name="David Chen"
                location="Mandarin, FL"
                rating={5}
                text="New construction home and Jax Sod made the yard look amazing. Completed on time for our move-in. Couldn't be happier with the results."
                date="July 2024"
              />
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <div className="text-center mt-8">
              <Link
                href="/reviews"
                className="text-[#22c55e] font-semibold hover:text-[#4ade80] inline-flex items-center gap-2"
              >
                Read More Reviews <FiArrowRight />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#22c55e] mb-3">
                Coverage
              </p>
              <h2 className="heading-lg mb-3">Where we work</h2>
              <p className="text-lg text-[rgba(200,230,200,0.5)] mx-auto">
                Serving all of Northeast Florida.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: 'Jacksonville', slug: 'jacksonville' },
                { name: 'Atlantic Beach', slug: 'atlantic-beach' },
                { name: 'Fleming Island', slug: 'fleming-island' },
                { name: 'Mandarin', slug: 'mandarin' },
                { name: 'Ponte Vedra', slug: 'ponte-vedra' },
                { name: 'Nocatee', slug: 'nocatee' },
                { name: 'Orange Park', slug: 'orange-park' },
                { name: 'St. Augustine', slug: 'st-augustine' },
                { name: 'Jacksonville Beach', slug: 'jacksonville-beach' },
              ].map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="border border-[rgba(34,197,94,0.15)] rounded-xl p-4 bg-[rgba(15,25,15,0.6)] font-semibold text-sm text-center transition-all duration-300 hover:border-[#22c55e] hover:text-[#22c55e] hover:bg-[rgba(34,197,94,0.05)] hover:-translate-y-0.5"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section with Schema */}
      <section className="section-padding">
        <div className="container-custom">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: homepageFaqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
            }) }}
          />
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-8">
              <div>
                <h2 className="heading-lg">Frequently Asked Questions</h2>
                <p className="text-[rgba(200,230,200,0.5)] max-w-3xl mt-2">
                  Quick answers for Jacksonville homeowners and property managers.
                </p>
              </div>
              <Link href="/faq" className="btn-secondary self-start">
                View All FAQs
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homepageFaqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={(i % 2) * 100}>
                <div className="border border-[rgba(34,197,94,0.15)] rounded-[20px] p-6 bg-[rgba(15,25,15,0.6)] backdrop-blur-[20px] transition-all duration-300 hover:border-[rgba(34,197,94,0.3)] h-full">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-[rgba(200,230,200,0.5)] leading-relaxed">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import TestimonialCard from '@/components/TestimonialCard'
import ContactForm from '@/components/ContactForm'
import CTASection from '@/components/CTASection'
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
    },
  ]

  const processSteps = [
    {
      title: 'Free Property Assessment',
      description:
        'We walk your site, evaluate sunlight conditions, and capture accurate square footage for precise pricing.',
    },
    {
      title: 'Old Turf Removal & Surface Prep',
      description:
        'Existing grass is cleared and the surface is smoothed to ensure new sod lies flat against the soil.',
    },
    {
      title: 'Premium Sod Installation',
      description:
        'Fresh sod is delivered directly from the farm and installed with expert technique — staggered seams, tight joints, and proper rolling.',
    },
    {
      title: 'Custom Aftercare Plan',
      description:
        'Before we leave, we provide a watering and mowing schedule tailored specifically to your yard and sod type.',
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
      <Hero
        title="Professional Sod Installation in Jacksonville, FL"
        subtitle={`${experienceText} of Excellence`}
        description="Transform your property with expert sod installation services. Our network of professional installers delivers beautiful, healthy lawns for residential and commercial properties throughout Jacksonville."
        ctaSlot={
          <OpenChatButton className="btn-primary text-lg px-8 py-4">
            Get a Free Estimate
          </OpenChatButton>
        }
        secondaryCtaText="View Our Services"
        secondaryCtaLink="/services"
        backgroundImage="https://images.unsplash.com/photo-1595757872761-992fd6d3ab25?auto=format&fit=crop&w=2000&q=80"
      />

      {/* Why Choose Us */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Why Choose {BUSINESS_NAME}?</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Nearly four decades of expertise delivering beautiful, healthy lawns across
              Jacksonville and Northeast Florida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4 text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-secondary-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-3">Our Sod Installation Process</h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              A proven process that ensures your new lawn is set up for long-term success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.title} className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="w-12 h-12 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-xl mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-secondary-900 mb-2">{step.title}</h3>
                <p className="text-secondary-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Sod Installation Services</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Professional sod installation tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ServiceCard
              icon={<FiHome />}
              title="Residential Sod Installation"
              description="Transform your home's curb appeal with a lush, healthy lawn. Perfect for new construction, lawn replacement, or landscape renovation."
              features={[
                'Front and backyard installation',
                'New construction lawns',
                'Lawn replacement and renovation',
                'Expert ground preparation',
              ]}
              link="/services"
              linkText="Learn More"
            />
            <ServiceCard
              icon={<FiBriefcase />}
              title="Commercial Sod Installation"
              description="Large-scale sod installation for commercial properties. On-schedule delivery and professional results."
              features={[
                'Office complexes and parks',
                'Retail and shopping centers',
                'Hotels and resorts',
                'HOA and community projects',
              ]}
              link="/services"
              linkText="Learn More"
            />
          </div>

          <div className="text-center">
            <Link href="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Sod Varieties */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
            <div>
              <h2 className="heading-lg mb-3">
                Sod Varieties for Northeast Florida
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl">
                Choose from proven grasses that handle Jacksonville&apos;s heat, humidity, and
                coastal conditions. We help you pick the best match.
              </p>
            </div>
            <Link href="/sod-types" className="btn-primary self-start">
              View All Sod Types
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sodVarieties.map((v) => (
              <div key={v.name} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <Image
                    src={v.image}
                    alt={`${v.name} sod in Jacksonville`}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{v.name}</h3>
                <ul className="space-y-2 text-secondary-700">
                  {v.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <FiCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote + Contact Form */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="heading-lg mb-4">Get Your Free Custom Quote</h2>
              <p className="text-lg text-secondary-700 mb-6">
                Every sod project is unique. We tailor recommendations for your square footage,
                sunlight, and soil so you get exactly what your lawn needs to thrive.
              </p>
              <p className="text-secondary-900 font-semibold mb-3">
                What&apos;s included in your quote:
              </p>
              <ul className="space-y-3 text-secondary-700">
                {[
                  'Free on-site property assessment',
                  'Detailed pricing with no hidden fees',
                  'Expert sod type recommendations',
                  'Custom aftercare plan',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FiCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">What Our Customers Say</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Hear from Jacksonville homeowners and businesses who trust {BUSINESS_NAME}.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Michael Thompson"
              location="Jacksonville, FL"
              rating={5}
              text="Jax Sod did an amazing job on our front and back yards. The crew was professional, efficient, and the lawn looks fantastic. Highly recommend!"
              date="September 2024"
            />
            <TestimonialCard
              name="Sarah Martinez"
              location="Jacksonville Beach, FL"
              rating={5}
              text="With decades of experience, you can tell they know what they're doing. Our new sod is thriving and the installation was quick and clean."
              date="August 2024"
            />
            <TestimonialCard
              name="David Chen"
              location="Mandarin, FL"
              rating={5}
              text="Best decision we made for our new construction home. The sod looks beautiful and the team was very knowledgeable about care and maintenance."
              date="July 2024"
            />
          </div>
          <div className="text-center mt-8">
            <Link
              href="/reviews"
              className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center gap-2"
            >
              Read More Reviews <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Serving All of Northeast Florida</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Professional sod installation across Jacksonville and surrounding communities.
            </p>
          </div>
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
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center font-medium text-secondary-700 hover:text-primary-600"
              >
                {area.name}
              </Link>
            ))}
          </div>
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-8">
            <div>
              <h2 className="heading-lg">Frequently Asked Questions</h2>
              <p className="text-secondary-700 max-w-3xl mt-2">
                Quick answers for Jacksonville homeowners and property managers.
              </p>
            </div>
            <Link href="/faq" className="btn-secondary self-start">
              View All FAQs
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homepageFaqs.map((faq) => (
              <div key={faq.q} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-secondary-900 mb-2">{faq.q}</h3>
                <p className="text-secondary-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

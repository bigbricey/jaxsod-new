import { Metadata } from 'next'
import Hero from '@/components/Hero'
import CTASection from '@/components/CTASection'
import { FiCheckCircle } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'About Jax Sod | Jacksonville Sod Installation Experts',
  description:
    'Learn about Jax Sod — nearly 40 years of professional sod installation experience in Jacksonville, FL. Connecting customers with expert installers across Northeast Florida.',
  alternates: { canonical: 'https://jaxsod.com/about' },
}

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Jax Sod"
        subtitle="Nearly 40 Years Serving Jacksonville"
        description="A trusted name in Northeast Florida sod installation, connecting homeowners and businesses with expert installers who deliver beautiful, lasting results."
        backgroundImage="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2000&auto=format&fit=crop"
        height="medium"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg mb-6">Jacksonville&apos;s Trusted Sod Company</h2>
            <p className="text-lg text-secondary-700 mb-6">
              For nearly four decades, Jax Sod has been a trusted name in the Jacksonville sod
              industry. We&apos;ve built our reputation on connecting customers with quality sod
              installers who understand Northeast Florida&apos;s unique climate, soil conditions,
              and the specific needs of our region.
            </p>
            <p className="text-lg text-secondary-700 mb-6">
              Our approach is simple: we leverage nearly 40 years of experience to help you choose
              the right sod for your property, coordinate professional installation through our
              network of expert installers, and ensure you have everything you need for a lawn
              that thrives for years to come.
            </p>
            <p className="text-lg text-secondary-700 mb-8">
              Whether it&apos;s a small front yard or a massive commercial project, we bring the
              same level of professionalism, expertise, and commitment to quality. That&apos;s why
              Jacksonville homeowners and businesses continue to trust Jax Sod year after year.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-primary-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-primary-800">Our Mission</h3>
                <p className="text-secondary-700">
                  To provide Jacksonville and Northeast Florida with the highest quality sod
                  installation experience — from expert variety selection to professional
                  installation and aftercare support.
                </p>
              </div>
              <div className="bg-secondary-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-secondary-800">Our Values</h3>
                <ul className="space-y-2">
                  {[
                    'Honest recommendations over upsells',
                    'Quality installation every time',
                    'Clear communication throughout',
                    'Stand behind our work',
                  ].map((v) => (
                    <li key={v} className="flex items-start gap-2 text-secondary-700">
                      <FiCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="heading-md mb-6">What Sets Us Apart</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Deep Local Knowledge',
                  desc: 'We know Jacksonville — the soil types in Mandarin, the salt conditions at the beaches, the shade challenges in established neighborhoods. This knowledge translates into better recommendations and longer-lasting results.',
                },
                {
                  title: 'Expert Installer Network',
                  desc: 'Our network of professional installers are vetted, experienced, and equipped to handle projects of any size. We coordinate every detail so you get a seamless experience.',
                },
                {
                  title: 'Honest Assessments',
                  desc: "If your lawn can be repaired instead of replaced, we'll tell you. If shade makes grass impractical in certain areas, we'll recommend alternatives. Our goal is the right solution, not the biggest sale.",
                },
                {
                  title: 'Complete Support',
                  desc: 'From the initial assessment through installation and aftercare, we guide you through every step. You\'ll know exactly what sod to choose, how to care for it, and what to expect.',
                },
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-primary-600 pl-6">
                  <h3 className="text-lg font-bold text-secondary-900 mb-2">{item.title}</h3>
                  <p className="text-secondary-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

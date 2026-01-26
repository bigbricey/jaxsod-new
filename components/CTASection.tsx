import Link from 'next/link'

interface CTASectionProps {
  title?: string
  description?: string
}

const CTASection = ({
  title = 'Ready to Transform Your Lawn?',
  description = 'Get a free, no-obligation quote from Jacksonville\'s trusted sod experts. With nearly 40 years of experience, we\'ll connect you with the right installers for a perfect lawn.',
}: CTASectionProps) => {
  return (
    <section className="section-padding bg-primary-700 text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">{title}</h2>
          <p className="text-xl mb-8 opacity-90">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-outline text-lg px-8 py-4">
              Get a Free Quote
            </Link>
            <a
              href="tel:9049011457"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block text-center"
            >
              Call (904) 901-1457
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Jax Sod - Professional sod installation in Jacksonville, FL.',
  alternates: { canonical: 'https://jaxsod.com/terms' },
}

export default function TermsPage() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto prose">
          <h1 className="heading-lg mb-8">Terms of Service</h1>
          <p className="text-secondary-600 mb-6">Last updated: January 2025</p>

          <h2>Services</h2>
          <p>Jax Sod provides professional sod installation services in the Jacksonville, Florida area. All services are subject to availability, weather conditions, and site accessibility.</p>

          <h2>Estimates and Pricing</h2>
          <p>All estimates are provided free of charge and are valid for 30 days unless otherwise noted. Final pricing may vary if site conditions differ from the initial assessment.</p>

          <h2>Payment</h2>
          <p>Payment terms are agreed upon at the time of contract signing. Details will be provided with your specific quote.</p>

          <h2>Warranty</h2>
          <p>We stand behind the quality of our installation work. Warranty details are provided with each project contract. Note that sod is a living product and its long-term success depends on proper aftercare including watering, mowing, and maintenance.</p>

          <h2>Contact</h2>
          <p>For questions about these terms, contact us at (904) 901-1457.</p>
        </div>
      </div>
    </section>
  )
}

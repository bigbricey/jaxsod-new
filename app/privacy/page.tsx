import { Metadata } from 'next'
import { BUSINESS_NAME, PHONE, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${BUSINESS_NAME} - Professional sod installation in Jacksonville, FL.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
}

export default function PrivacyPage() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto prose">
          <h1 className="heading-lg mb-8">Privacy Policy</h1>
          <p className="text-secondary-600 mb-6">Last updated: January 2025</p>

          <h2>Information We Collect</h2>
          <p>When you contact {BUSINESS_NAME}, we may collect your name, phone number, email address, and property address for the purpose of providing sod installation estimates and services.</p>

          <h2>How We Use Your Information</h2>
          <p>We use the information you provide to:</p>
          <ul>
            <li>Respond to your inquiries and provide quotes</li>
            <li>Schedule and perform sod installation services</li>
            <li>Communicate about your project</li>
            <li>Improve our services</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information with trusted service providers who assist in operating our business, provided they agree to keep your information confidential.</p>

          <h2>Contact</h2>
          <p>If you have questions about this privacy policy, contact us at {PHONE}.</p>
        </div>
      </div>
    </section>
  )
}

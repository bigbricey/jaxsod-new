'use client'

import { FiMessageCircle, FiCheckCircle, FiPhone } from 'react-icons/fi'

const ContactForm = () => {
  return (
    <div className="bg-primary-50 border-2 border-primary-600 rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <FiMessageCircle className="text-4xl text-primary-600" />
        <h3 className="text-2xl font-bold text-secondary-900">Text Us for a Free Quote</h3>
      </div>

      <p className="text-lg text-secondary-700 mb-6">
        Our team is often in the field installing sod. For the fastest response, please text us!
        We typically reply much quicker than voicemail.
      </p>

      <div className="bg-white rounded-lg p-6 mb-6">
        <p className="font-bold text-secondary-900 mb-4 text-lg">Text this information to:</p>
        <a
          href="sms:9049011457"
          className="text-3xl font-bold text-primary-600 hover:text-primary-700 block mb-6"
        >
          (904) 901-1457
        </a>

        <p className="font-bold text-secondary-900 mb-3">Please include:</p>
        <ul className="space-y-3">
          {[
            'Your name',
            'Your phone number',
            'Your property address',
            'Which area(s) of your yard you need an estimate for (front, back, both, etc.)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <FiCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
              <span className="text-secondary-700">
                <strong>{item}</strong>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="sms:9049011457"
          className="flex-1 bg-primary-600 text-white rounded-lg p-4 text-center font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
        >
          <FiMessageCircle className="text-xl" />
          Text Us Now
        </a>
        <a
          href="tel:9049011457"
          className="flex-1 bg-secondary-800 text-white rounded-lg p-4 text-center font-semibold hover:bg-secondary-900 transition-colors flex items-center justify-center gap-2"
        >
          <FiPhone className="text-xl" />
          Call Us
        </a>
      </div>

      <p className="text-center text-secondary-600 text-sm mt-4">
        We typically respond within 1–2 hours during business hours!
      </p>
    </div>
  )
}

export default ContactForm

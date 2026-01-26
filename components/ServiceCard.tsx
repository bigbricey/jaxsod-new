import Link from 'next/link'
import { ReactNode } from 'react'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  features?: string[]
  link?: string
  linkText?: string
}

const ServiceCard = ({
  icon,
  title,
  description,
  features,
  link,
  linkText = 'Learn More',
}: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="text-primary-600 mb-4 text-4xl">{icon}</div>
      <h3 className="heading-sm mb-4 text-secondary-900">{title}</h3>
      <p className="text-secondary-600 mb-6 leading-relaxed">{description}</p>
      {features && features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-secondary-700">
              <svg
                className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
      {link && (
        <Link
          href={link}
          className="text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center gap-2"
        >
          {linkText}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}

export default ServiceCard

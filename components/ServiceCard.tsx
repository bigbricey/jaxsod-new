'use client'

import Link from 'next/link'
import { ReactNode, useRef } from 'react'

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
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px')
    card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px')
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="glow-card border border-[rgba(34,197,94,0.15)] rounded-[20px] p-8 bg-[rgba(15,25,15,0.6)] backdrop-blur-[20px] transition-all duration-500 hover:border-[rgba(34,197,94,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative overflow-hidden group"
    >
      {/* Top glow line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22c55e] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="w-[50px] h-[50px] rounded-xl bg-[rgba(34,197,94,0.1)] flex items-center justify-center mb-6 text-[#22c55e] text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-[#e8f5e8]">{title}</h3>
      <p className="text-[rgba(200,230,200,0.5)] mb-6 leading-relaxed text-sm">{description}</p>
      {features && features.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {features.map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1.5 border border-[rgba(34,197,94,0.15)] rounded-full text-xs text-[rgba(200,230,200,0.5)]"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
      {link && (
        <Link
          href={link}
          className="text-[#22c55e] font-semibold hover:text-[#4ade80] transition-colors inline-flex items-center gap-2 text-sm"
        >
          {linkText}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}

export default ServiceCard

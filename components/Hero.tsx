import Image from 'next/image'
import Link from 'next/link'
import { PHONE, PHONE_HREF } from '@/lib/constants'

interface HeroProps {
  title: string
  subtitle?: string
  description: string
  ctaText?: string
  ctaLink?: string
  ctaSlot?: React.ReactNode
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage: string
  height?: 'small' | 'medium' | 'large'
}

const Hero = ({
  title,
  subtitle,
  description,
  ctaText = 'Get a Free Quote',
  ctaLink = '/contact',
  ctaSlot,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  height = 'large',
}: HeroProps) => {
  const heightClasses = {
    small: 'min-h-[400px]',
    medium: 'min-h-[500px]',
    large: 'min-h-[600px] lg:min-h-[700px]',
  }

  return (
    <section className={`relative ${heightClasses[height]} flex items-center mt-[100px]`}>
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0a]/90 to-[#0a0f0a]/60" />
      </div>

      <div className="container-custom relative z-10 text-[#e8f5e8]">
        <div className="max-w-3xl">
          {subtitle && (
            <p className="text-[#22c55e] font-semibold text-lg md:text-xl mb-4">{subtitle}</p>
          )}
          <h1 className="heading-xl mb-6">{title}</h1>
          <p className="text-lg md:text-xl text-[rgba(200,230,200,0.5)] mb-8 leading-relaxed">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {ctaSlot || (
              <Link href={ctaLink} className="btn-primary text-lg px-8 py-4">
                {ctaText}
              </Link>
            )}
            {secondaryCtaText && secondaryCtaLink && (
              <Link href={secondaryCtaLink} className="btn-outline text-lg px-8 py-4">
                {secondaryCtaText}
              </Link>
            )}
            <a
              href={PHONE_HREF}
              className="btn-outline text-lg px-8 py-4 sm:hidden"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

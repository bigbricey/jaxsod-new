import { PHONE, PHONE_HREF, getExperienceText } from '@/lib/constants'
import OpenChatButton from './OpenChatButton'

interface CTASectionProps {
  title?: string
  description?: string
}

const CTASection = ({
  title = 'Ready for a New Lawn?',
  description = `Get a free, no-obligation quote from Jacksonville's trusted sod experts. With ${getExperienceText().toLowerCase()} of experience, we'll connect you with the right installers for a perfect lawn.`,
}: CTASectionProps) => {
  return (
    <section className="section-padding relative overflow-hidden text-center">
      {/* Radial glow background */}
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full pointer-events-none animate-[ctaPulse_4s_ease_infinite]"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.3), transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#22c55e] mb-4">
            Get Started
          </p>
          <h2 className="heading-lg mb-4 max-w-[700px] mx-auto">{title}</h2>
          <p className="text-lg text-[rgba(200,230,200,0.5)] mb-8 max-w-[600px] mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a href={PHONE_HREF} className="btn-primary text-lg px-8 py-4">
              Call {PHONE}
            </a>
            <OpenChatButton className="btn-secondary text-lg px-8 py-4">
              Request Quote Online
            </OpenChatButton>
          </div>
          <a
            href={PHONE_HREF}
            className="inline-block mt-6 text-2xl font-extrabold text-[#22c55e] hover:scale-105 transition-transform"
            style={{ textShadow: '0 0 30px rgba(34,197,94,0.3)' }}
          >
            {PHONE}
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTASection

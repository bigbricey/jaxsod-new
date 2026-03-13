import { FiStar } from 'react-icons/fi'

interface TestimonialCardProps {
  name: string
  location: string
  rating: number
  text: string
  date: string
}

const TestimonialCard = ({ name, location, rating, text, date }: TestimonialCardProps) => {
  return (
    <div className="border border-[rgba(34,197,94,0.15)] rounded-[20px] p-8 bg-[rgba(15,25,15,0.6)] backdrop-blur-[20px] transition-all duration-500 hover:border-[rgba(34,197,94,0.3)] hover:-translate-y-1">
      <div className="flex gap-1 mb-4 text-[#22c55e] tracking-wider" aria-label={`${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-[#22c55e] text-[#22c55e]' : 'text-[rgba(200,230,200,0.2)]'
            }`}
          />
        ))}
      </div>
      <blockquote className="text-[#e8f5e8] mb-6 leading-relaxed italic text-sm">
        &ldquo;{text}&rdquo;
      </blockquote>
      <div>
        <p className="font-semibold text-[#e8f5e8] text-sm">{name}</p>
        <p className="text-xs text-[rgba(200,230,200,0.5)]">{location}</p>
        <p className="text-xs text-[rgba(200,230,200,0.3)] mt-1">{date}</p>
      </div>
    </div>
  )
}

export default TestimonialCard

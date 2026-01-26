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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex gap-1 mb-3" aria-label={`${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-secondary-300'
            }`}
          />
        ))}
      </div>
      <p className="text-secondary-700 mb-4 leading-relaxed italic">&ldquo;{text}&rdquo;</p>
      <div className="border-t border-secondary-200 pt-4">
        <p className="font-semibold text-secondary-900">{name}</p>
        <p className="text-sm text-secondary-600">{location}</p>
        <p className="text-xs text-secondary-500 mt-1">{date}</p>
      </div>
    </div>
  )
}

export default TestimonialCard

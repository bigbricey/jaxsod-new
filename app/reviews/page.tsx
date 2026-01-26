import { Metadata } from 'next'
import Hero from '@/components/Hero'
import TestimonialCard from '@/components/TestimonialCard'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Reviews & Testimonials | Jax Sod Jacksonville FL',
  description:
    'Read reviews from satisfied Jax Sod customers across Jacksonville, FL. See why homeowners and businesses trust us for professional sod installation.',
  alternates: { canonical: 'https://jaxsod.com/reviews' },
}

export default function ReviewsPage() {
  const reviews = [
    {
      name: 'Michael Thompson',
      location: 'Jacksonville, FL',
      rating: 5,
      text: 'Jax Sod did an amazing job on our front and back yards. The crew was professional, efficient, and the lawn looks fantastic. They recommended Palmetto St. Augustine for our shaded backyard and it was the perfect choice. Highly recommend!',
      date: 'September 2024',
    },
    {
      name: 'Sarah Martinez',
      location: 'Jacksonville Beach, FL',
      rating: 5,
      text: "With decades of experience, you can tell they know what they're doing. Our new sod is thriving and the installation was quick and clean. They really understood the coastal conditions at our beach house.",
      date: 'August 2024',
    },
    {
      name: 'David Chen',
      location: 'Mandarin, FL',
      rating: 5,
      text: 'Best decision we made for our new construction home. The builder sod was failing and Jax Sod replaced it with Empire Zoysia. The lawn looks incredible and the team was very knowledgeable about aftercare.',
      date: 'July 2024',
    },
    {
      name: 'Jennifer Walsh',
      location: 'Ponte Vedra, FL',
      rating: 5,
      text: "We had a large property that needed complete re-sodding. Jax Sod handled the entire project professionally from start to finish. The Zoysia they installed looks like a golf course. Our neighbors keep asking who did our lawn!",
      date: 'June 2024',
    },
    {
      name: 'Robert Williams',
      location: 'Orange Park, FL',
      rating: 5,
      text: "After our old lawn was destroyed by chinch bugs, we called Jax Sod. They not only replaced everything but helped us choose a more resistant variety. It's been 8 months and the lawn looks better than ever.",
      date: 'May 2024',
    },
    {
      name: 'Maria Gonzalez',
      location: 'Fleming Island, FL',
      rating: 5,
      text: "Fast, professional, and reasonably priced. The crew arrived on time, prepped the ground thoroughly, and had our new sod down in one day. They even walked us through the watering schedule. Can't say enough good things.",
      date: 'April 2024',
    },
    {
      name: 'James Anderson',
      location: 'Nocatee, FL',
      rating: 5,
      text: "Our builder sod was terrible — thin, patchy, wrong variety for our yard. Jax Sod came out, assessed everything, and recommended a complete replacement. The difference is night and day. Should have called them first!",
      date: 'March 2024',
    },
    {
      name: 'Patricia Davis',
      location: 'Atlantic Beach, FL',
      rating: 5,
      text: 'We needed salt-tolerant sod for our beachside property. The team knew exactly which variety would work and the installation was flawless. Six months later, the lawn is lush and green despite the salt air.',
      date: 'February 2024',
    },
    {
      name: 'Tom Baker',
      location: 'St. Augustine, FL',
      rating: 5,
      text: "Commercial project for our office complex — 15,000 sq ft. Jax Sod handled the logistics perfectly. Delivered on time, on budget, and the result is beautiful. Already recommended them to other property managers.",
      date: 'January 2024',
    },
  ]

  return (
    <>
      <Hero
        title="Customer Reviews"
        description="Don't just take our word for it — hear from Jacksonville homeowners and businesses who trust Jax Sod for their sod installation needs."
        backgroundImage="https://images.unsplash.com/photo-1595757872761-992fd6d3ab25?auto=format&fit=crop&w=2000&q=80"
        height="small"
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Summary */}
          <div className="bg-primary-50 rounded-lg p-8 mb-12 text-center">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-3xl">★</span>
              ))}
            </div>
            <p className="text-2xl font-bold text-secondary-900 mb-2">4.9 out of 5 Stars</p>
            <p className="text-secondary-600">Based on 150+ verified customer reviews</p>
          </div>

          {/* Review Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <TestimonialCard key={review.name} {...review} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Join Our Satisfied Customers?"
        description="Get a free quote and see why Jacksonville trusts Jax Sod for professional sod installation."
      />
    </>
  )
}

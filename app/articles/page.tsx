import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/Hero'
import { getAllArticles } from '@/data/articles'
import { FiArrowRight, FiCalendar, FiTag } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Sod & Lawn Care Articles | Expert Guides for Jacksonville FL',
  description:
    'Expert articles on sod installation, lawn care, and landscaping for Jacksonville, FL. Guides on St. Augustine, Zoysia, irrigation, pest control, and more.',
  alternates: { canonical: 'https://jaxsod.com/articles' },
}

export default function ArticlesPage() {
  const articles = getAllArticles()
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const categories = Array.from(new Set(articles.map((a) => a.category)))

  return (
    <>
      <Hero
        title="Sod & Lawn Care Articles"
        description="Expert guides, tips, and insights on sod installation, lawn care, and landscaping for Jacksonville and Northeast Florida homeowners."
        backgroundImage="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2000&auto=format&fit=crop"
        height="small"
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Category tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <span
                key={cat}
                className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-secondary-500">
                    <span className="flex items-center gap-1">
                      <FiTag /> {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCalendar />{' '}
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-secondary-600 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <span className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article <FiArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

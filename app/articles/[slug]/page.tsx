import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles } from '@/data/articles'
import CTASection from '@/components/CTASection'
import { FiCalendar, FiTag, FiClock, FiArrowLeft } from 'react-icons/fi'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const articles = getAllArticles()
  const article = articles.find((a) => a.slug === params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `https://jaxsod.com/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      images: [{ url: article.image }],
    },
  }
}

export default function ArticlePage({ params }: Props) {
  const articles = getAllArticles()
  const article = articles.find((a) => a.slug === params.slug)
  if (!article) notFound()

  const readingTime = Math.ceil(article.wordCount / 250)

  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    image: article.image,
    author: { '@type': 'Organization', name: 'Jax Sod' },
    publisher: {
      '@type': 'Organization',
      name: 'Jax Sod',
      url: 'https://jaxsod.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://jaxsod.com/articles/${article.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Article Header */}
      <section className="relative">
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
        </div>
        <div className="container-custom relative -mt-32 z-10 pb-8">
          <div className="max-w-4xl">
            <Link
              href="/articles"
              className="text-gray-300 hover:text-white inline-flex items-center gap-2 mb-4 text-sm"
            >
              <FiArrowLeft /> Back to Articles
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
              <span className="flex items-center gap-1">
                <FiTag /> {article.category}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar />{' '}
                {new Date(article.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <FiClock /> {readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose max-w-none">{article.content}</div>

            {/* CTA */}
            <div className="mt-12 bg-primary-50 border-2 border-primary-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Need Professional Sod Installation?</h3>
              <p className="text-secondary-700 mb-6 max-w-2xl mx-auto">
                Jax Sod connects you with expert installers across Jacksonville and Northeast
                Florida. Nearly 40 years of experience. Free quotes!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary">
                  Get a Free Quote
                </Link>
                <a href="tel:9049011457" className="btn-secondary">
                  Call (904) 901-1457
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="section-padding bg-secondary-50">
          <div className="container-custom">
            <h2 className="heading-md mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/articles/${related.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-40">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-secondary-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-secondary-600 text-sm mt-2 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}

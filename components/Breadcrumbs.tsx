import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Always prepend Home
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-secondary-500">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <span className="text-secondary-400" aria-hidden="true">/</span>
                )}
                {isLast || !item.href ? (
                  <span className="text-secondary-700 font-medium">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-secondary-500 hover:text-primary-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

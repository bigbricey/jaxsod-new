import { getMarkdownArticles } from '@/lib/markdown'
import MarkdownContent from '@/components/MarkdownContent'

// --- ARTICLE DATA & CONTENT ---
export interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  wordCount: number
  content: JSX.Element
  image: string
}

/**
 * Returns all articles from markdown files in content/articles/*.md
 * Previously included hardcoded JSX articles, which have been migrated to markdown.
 */
export function getAllArticles(): Article[] {
  // Load all markdown articles (no exclusions needed since hardcoded articles are removed)
  const markdownArticles = getMarkdownArticles()

  // Convert markdown data to Article objects with JSX content
  const mdAsArticles: Article[] = markdownArticles.map((md) => ({
    slug: md.slug,
    title: md.title,
    excerpt: md.excerpt,
    date: md.date,
    category: md.category,
    wordCount: md.wordCount,
    image: md.image,
    content: <MarkdownContent html={md.htmlContent} />,
  }))

  return mdAsArticles
}

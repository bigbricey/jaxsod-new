import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export interface MarkdownArticleData {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  wordCount: number
  htmlContent: string
  image: string
}

// Unique Unsplash images mapped to each markdown article slug
const imageMap: Record<string, string> = {
  'best-outdoor-lighting-ideas-for-jacksonville-landscapes':
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1200&auto=format&fit=crop',
  'best-time-lay-sod-jacksonville-fl':
    'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=1200&auto=format&fit=crop',
  'common-lawn-pests-jacksonville-fl':
    'https://images.unsplash.com/photo-1585003791123-4903aaf9f8e1?q=80&w=1200&auto=format&fit=crop',
  'diy-vs-professional-sod-installation-jacksonville':
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  'drainage-solutions-jacksonville-yards':
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
  'fertilizer-schedule-jacksonville-fl-lawns':
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop',
  'fix-bare-spots-jacksonville-lawn':
    'https://images.unsplash.com/photo-1558635924-b60e7d3984d4?q=80&w=1200&auto=format&fit=crop',
  'florida-friendly-landscaping-jacksonville':
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
  'how-to-build-raised-garden-bed-jacksonville-fl':
    'https://images.unsplash.com/photo-1416543974351-c28453497ef4?q=80&w=1200&auto=format&fit=crop',
  'irrigation-guide-jacksonville-lawns':
    'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1200&auto=format&fit=crop',
  'jacksonville-soil-guide-understanding-your-lawns-foundation':
    'https://images.unsplash.com/photo-1509813685-e5e15e03e5a2?q=80&w=1200&auto=format&fit=crop',
  'kill-weeds-without-killing-lawn-jacksonville':
    'https://images.unsplash.com/photo-1589923188651-268a9765e432?q=80&w=1200&auto=format&fit=crop',
  'lawn-edging-options-jacksonville':
    'https://images.unsplash.com/photo-1598902108854-d1446413a259?q=80&w=1200&auto=format&fit=crop',
  'new-sod-care-first-30-days-jacksonville':
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
  'paver-patios-walkways-jacksonville-homeowner-guide':
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop',
  'prepare-jacksonville-lawn-hurricane-season':
    'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=1200&auto=format&fit=crop',
  'st-augustine-vs-bermuda-grass-jacksonville':
    'https://images.unsplash.com/photo-1560749003-f4b1e17e2dff?q=80&w=1200&auto=format&fit=crop',
  'tree-selection-guide-jacksonville-fl-best-shade-trees':
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop',
  // Fallbacks for any articles that also exist as hardcoded (won't normally be used since hardcoded takes priority)
  'best-landscaping-ideas-jacksonville-fl':
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop',
  'best-plants-shade-jacksonville-fl':
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop',
  'jacksonville-lawn-care-calendar-2026':
    'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?q=80&w=1200&auto=format&fit=crop',
  'sod-installation-cost-jacksonville-2026':
    'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=1200&auto=format&fit=crop',
  'types-mulch-jacksonville-landscapes':
    'https://images.unsplash.com/photo-1599629954294-43125087c2c0?q=80&w=1200&auto=format&fit=crop',
}

// Category assignment based on slug keywords
function assignCategory(slug: string, title: string): string {
  const text = `${slug} ${title}`.toLowerCase()

  if (text.includes('sod installation') || text.includes('lay sod') || text.includes('sod care') || text.includes('diy vs professional sod') || text.includes('sod-installation-cost') || text.includes('new-sod-care')) {
    return 'Sod Installation'
  }
  if (text.includes('st-augustine') || text.includes('bermuda') || text.includes('grass')) {
    return 'Grass Types'
  }
  if (text.includes('pest') || text.includes('weed') || text.includes('chinch') || text.includes('bug')) {
    return 'Pest Control'
  }
  if (text.includes('fertilizer') || text.includes('soil')) {
    return 'Soil & Fertilization'
  }
  if (text.includes('irrigation') || text.includes('drainage') || text.includes('water')) {
    return 'Irrigation & Drainage'
  }
  if (text.includes('hurricane') || text.includes('storm')) {
    return 'Seasonal Care'
  }
  if (text.includes('calendar') || text.includes('bare spot') || text.includes('lawn care') || text.includes('edging') || text.includes('mow')) {
    return 'Lawn Care'
  }
  if (text.includes('tree') || text.includes('shade tree')) {
    return 'Trees & Shrubs'
  }
  if (text.includes('garden bed') || text.includes('raised garden')) {
    return 'Garden'
  }
  if (text.includes('paver') || text.includes('patio') || text.includes('walkway')) {
    return 'Hardscaping'
  }
  if (text.includes('lighting') || text.includes('light')) {
    return 'Outdoor Lighting'
  }
  if (text.includes('mulch') || text.includes('landscaping') || text.includes('landscape') || text.includes('plant')) {
    return 'Landscaping'
  }
  return 'Lawn Care'
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles')

export function getMarkdownArticles(excludeSlugs: string[] = []): MarkdownArticleData[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const excludeSet = new Set(excludeSlugs)
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))
  const articles: MarkdownArticleData[] = []

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content: markdownBody } = matter(raw)

    const slug = frontmatter.slug || file.replace(/\.md$/, '')

    // Skip if this slug is already in the hardcoded articles
    if (excludeSet.has(slug)) {
      continue
    }

    // Convert markdown to HTML synchronously using remark
    // We use remarkSync approach via processSync
    const processed = remark().use(remarkHtml, { sanitize: false }).processSync(markdownBody)
    const htmlContent = processed.toString()

    // Calculate word count from plain text (strip HTML tags)
    const plainText = markdownBody.replace(/[#*_\[\]()>-]/g, ' ')
    const wordCount = plainText.split(/\s+/).filter((w) => w.length > 0).length

    const title = frontmatter.title || slug.replace(/-/g, ' ')
    const excerpt = frontmatter.description || ''
    const date = frontmatter.date
      ? typeof frontmatter.date === 'string'
        ? frontmatter.date
        : new Date(frontmatter.date).toISOString().split('T')[0]
      : '2026-01-26'

    const image = imageMap[slug] || 'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1200&auto=format&fit=crop'
    const category = assignCategory(slug, title)

    articles.push({
      slug,
      title,
      excerpt,
      date,
      category,
      wordCount,
      htmlContent,
      image,
    })
  }

  return articles
}

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

// Unique Unsplash images — verified to match article topics
const imageMap: Record<string, string> = {
  // Outdoor lighting — garden path lights at night
  'best-outdoor-lighting-ideas-for-jacksonville-landscapes':
    'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=1200&auto=format&fit=crop',
  // Sod timing — rolls of fresh sod on green lawn
  'best-time-lay-sod-jacksonville-fl':
    'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1200&auto=format&fit=crop',
  // Lawn pests — close-up of lawn/grass texture
  'common-lawn-pests-jacksonville-fl':
    'https://images.unsplash.com/photo-1589923188651-268a9765e432?q=80&w=1200&auto=format&fit=crop',
  // DIY vs pro — person pushing wheelbarrow in yard
  'diy-vs-professional-sod-installation-jacksonville':
    'https://images.unsplash.com/photo-1597040827713-24d4c7e4b0e2?q=80&w=1200&auto=format&fit=crop',
  // Drainage — rain puddle on grass/yard
  'drainage-solutions-jacksonville-yards':
    'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1200&auto=format&fit=crop',
  // Fertilizer — soil and gardening supplies
  'fertilizer-schedule-jacksonville-fl-lawns':
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop',
  // Bare spots — patchy lawn needing repair
  'fix-bare-spots-jacksonville-lawn':
    'https://images.unsplash.com/photo-1595757872761-992fd6d3ab25?q=80&w=1200&auto=format&fit=crop',
  // Florida-friendly landscaping — tropical garden
  'florida-friendly-landscaping-jacksonville':
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop',
  // Raised garden bed — wooden raised bed with plants
  'how-to-build-raised-garden-bed-jacksonville-fl':
    'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=1200&auto=format&fit=crop',
  // Irrigation — lawn sprinkler watering grass
  'irrigation-guide-jacksonville-lawns':
    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1200&auto=format&fit=crop',
  // Soil guide — hands holding rich soil
  'jacksonville-soil-guide-understanding-your-lawns-foundation':
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop',
  // Weed control — dandelion in lawn
  'kill-weeds-without-killing-lawn-jacksonville':
    'https://images.unsplash.com/photo-1455659817273-f96807779a8a?q=80&w=1200&auto=format&fit=crop',
  // Lawn edging — neat lawn edge along walkway
  'lawn-edging-options-jacksonville':
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  // New sod care — fresh green sod lawn
  'new-sod-care-first-30-days-jacksonville':
    'https://images.unsplash.com/photo-1544914379-806667cd9489?q=80&w=1200&auto=format&fit=crop',
  // Paver patios — stone patio with landscaping
  'paver-patios-walkways-jacksonville-homeowner-guide':
    'https://images.unsplash.com/photo-1598902108854-d1446413a259?q=80&w=1200&auto=format&fit=crop',
  // Hurricane prep — stormy sky over Florida
  'prepare-jacksonville-lawn-hurricane-season':
    'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=1200&auto=format&fit=crop',
  // St Augustine vs Bermuda — two-tone grass comparison
  'st-augustine-vs-bermuda-grass-jacksonville':
    'https://images.unsplash.com/photo-1593617589445-a9cb66fbae15?q=80&w=1200&auto=format&fit=crop',
  // Shade trees — large oak tree in yard
  'tree-selection-guide-jacksonville-fl-best-shade-trees':
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop',
  // Fallbacks for overlapping slugs (hardcoded takes priority, these rarely used)
  'best-landscaping-ideas-jacksonville-fl':
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop',
  'best-plants-shade-jacksonville-fl':
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop',
  'jacksonville-lawn-care-calendar-2026':
    'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1200&auto=format&fit=crop',
  'sod-installation-cost-jacksonville-2026':
    'https://images.unsplash.com/photo-1597040827713-24d4c7e4b0e2?q=80&w=1200&auto=format&fit=crop',
  'types-mulch-jacksonville-landscapes':
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop',
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

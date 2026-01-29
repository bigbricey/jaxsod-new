import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { injectCrossLinks } from './crossLinker'

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

// Keyword-to-category mapping - matches local folder names in public/images/
const KEYWORD_PATTERNS = [
  // Sod-specific keywords
  { keywords: ['new-sod', 'sod-care', 'lay-sod', 'install-sod', 'sod-installation', 'laying-sod', 'fresh-sod'], category: 'sodCloseup', weight: 10 },

  // Specific grass types - route to dedicated folders
  { keywords: ['st-augustine', 'st augustine', 'floratam', 'palmetto-grass'], category: 'stAugustineGrass', weight: 12 },
  { keywords: ['bermuda', 'bermudagrass', 'tifway', 'celebration'], category: 'bermudaGrass', weight: 12 },
  { keywords: ['zoysia', 'zoysiagrass', 'empire', 'emerald-zoysia'], category: 'zoysiaGrass', weight: 12 },

  // Generic grass type articles (fallback)
  { keywords: ['bahia', 'centipede', 'grass-type', 'which-grass', 'best-grass'], category: 'sodCloseup', weight: 9 },

  // New construction & renovation
  { keywords: ['new-construction', 'new-home', 'builder', 'subdivision', 'development'], category: 'newConstruction', weight: 10 },

  // Pets & lawns
  { keywords: ['pet', 'dog', 'cat', 'pet-friendly', 'urine', 'dog-spot', 'pet-damage'], category: 'petsAndLawns', weight: 10 },

  // Waterfront properties
  { keywords: ['waterfront', 'lakefront', 'riverside', 'oceanfront', 'beach', 'coastal-lawn'], category: 'waterfront', weight: 10 },

  // Sports turf & golf
  { keywords: ['sports', 'athletic', 'field', 'soccer', 'football', 'baseball'], category: 'sportsTurf', weight: 10 },
  { keywords: ['golf', 'putting-green', 'fairway', 'tee-box'], category: 'golfCourse', weight: 10 },

  // Drought tolerant landscaping
  { keywords: ['drought', 'xeriscape', 'water-wise', 'low-water', 'drought-tolerant'], category: 'droughtTolerant', weight: 10 },

  // Mowing & edging
  { keywords: ['mow', 'mowing', 'edge', 'edging', 'trim', 'trimming', 'cut', 'cutting-height', 'lawn-height'], category: 'lawnMowing', weight: 10 },

  // Irrigation & watering
  { keywords: ['irrigation', 'sprinkler', 'water', 'watering', 'hose', 'drip-system', 'smart-irrigation'], category: 'irrigation', weight: 10 },

  // Drainage
  { keywords: ['drainage', 'puddle', 'flooding', 'standing-water', 'runoff', 'french-drain'], category: 'drainage', weight: 10 },

  // DIY & installation services
  { keywords: ['diy', 'professional', 'install', 'cost', 'price', 'estimate', 'contractor', 'crew'], category: 'crewsWorking', weight: 9 },

  // Florida-specific
  { keywords: ['florida', 'jacksonville', 'subtropical', 'hot-humid', 'zone-9', 'coastal'], category: 'floridaYards', weight: 8 },

  // Palm trees & tropical
  { keywords: ['palm', 'palmetto', 'sago', 'tropical', 'hibiscus', 'birds-of-paradise', 'bougainvillea'], category: 'palmTrees', weight: 10 },

  // Oak & shade trees
  { keywords: ['oak', 'live-oak', 'shade-tree', 'magnolia', 'maple', 'tree-selection', 'canopy'], category: 'oakTrees', weight: 10 },

  // Flowers & gardens
  { keywords: ['flower', 'garden-bed', 'raised-bed', 'perennial', 'annual', 'blooming', 'colorful'], category: 'flowerBeds', weight: 10 },

  // Mulch & ground cover
  { keywords: ['mulch', 'pine-straw', 'bark', 'wood-chips', 'ground-cover', 'weed-barrier'], category: 'mulch', weight: 10 },

  // Pavers & hardscaping
  { keywords: ['paver', 'patio', 'walkway', 'pathway', 'stone', 'hardscape', 'retaining-wall', 'brick'], category: 'pavers', weight: 10 },

  // Pests & diseases
  { keywords: ['pest', 'chinch-bug', 'grub', 'fungus', 'disease', 'brown-patch', 'damage', 'dying-lawn', 'bare-spot'], category: 'pestDamage', weight: 10 },

  // Lush green lawns (default good lawn)
  { keywords: ['lush', 'green', 'healthy', 'perfect-lawn', 'thick-lawn', 'dense'], category: 'lushLawn', weight: 7 },

  // Pools
  { keywords: ['pool', 'swimming', 'poolside', 'deck'], category: 'pools', weight: 10 },

  // Commercial
  { keywords: ['commercial', 'business', 'hoa', 'community', 'apartment', 'property-management'], category: 'commercial', weight: 9 },

  // Seasonal
  { keywords: ['spring', 'summer', 'fall', 'autumn', 'winter', 'seasonal', 'season'], category: 'seasonal', weight: 8 },

  // Soil & fertilizer
  { keywords: ['soil', 'dirt', 'sand', 'clay', 'topsoil', 'compost', 'fertilize', 'fertilizer', 'nutrients'], category: 'soil', weight: 10 },

  // Tools & equipment
  { keywords: ['tool', 'equipment', 'mower', 'trimmer', 'blower', 'aerator', 'dethatcher'], category: 'tools', weight: 9 },

  // Rain & storms
  { keywords: ['rain', 'storm', 'hurricane', 'weather', 'lightning', 'wind', 'prepare-for'], category: 'rain', weight: 10 },

  // Shade gardening
  { keywords: ['shade', 'shady', 'low-light', 'under-tree'], category: 'shadeGarden', weight: 10 },

  // Lighting
  { keywords: ['light', 'lighting', 'outdoor-light', 'landscape-light', 'path-light', 'accent-light'], category: 'lighting', weight: 10 },

  // General yards
  { keywords: ['yard', 'front-yard', 'backyard', 'landscape', 'landscaping', 'curb-appeal'], category: 'yards', weight: 6 },
]

// Simple string hash function for deterministic selection
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Find the best matching category for an article
function findBestCategory(slug: string, title: string): string {
  const text = `${slug} ${title}`.toLowerCase()

  let bestMatch = 'lushLawn' // default fallback
  let bestScore = 0

  for (const pattern of KEYWORD_PATTERNS) {
    let score = 0
    for (const keyword of pattern.keywords) {
      if (text.includes(keyword)) {
        score += pattern.weight
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = pattern.category
    }
  }

  return bestMatch
}

// Helper to get all image files from a directory
function getLocalImagesForCategory(category: string): string[] {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', category)
    if (!fs.existsSync(imagesDir)) {
      return []
    }

    // Read files and filter for valid image extensions
    const files = fs.readdirSync(imagesDir)
    return files
      .filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file))
      .map(file => `/images/${category}/${file}`)
  } catch (error) {
    console.warn(`Could not read images for category: ${category}`, error)
    return []
  }
}

// Fallback images if a category is empty or missing locally
// Using a generic placeholder relative logic or hardcoded trusted fallback if absolute despair
const FALLBACK_CATEGORY = 'lushLawn'

// Get a deterministic visual asset from the local filesystem
function getImageForArticle(
  slug: string,
  title: string,
  recentImages: string[]
): string {
  // 1. Determine local category
  const category = findBestCategory(slug, title)

  // 2. Fetch local files
  let imagePool = getLocalImagesForCategory(category)

  // 3. Fallback if category is empty
  if (imagePool.length === 0) {
    imagePool = getLocalImagesForCategory(FALLBACK_CATEGORY)
  }

  // 4. If still empty (lushLawn missing?), use a placeholder or safe hardcoded one
  // (Ideally this never happens since we just moved files, but good for safety)
  if (imagePool.length === 0) {
    return '/images/placeholder.jpg' // You should ensure this exists or similar
  }

  // 5. Filter out recently used images to add variety
  const availableImages = imagePool.filter(img => !recentImages.includes(img))

  // 6. If all images in this category were recently used, use the full pool again
  const finalPool = availableImages.length > 0 ? availableImages : imagePool

  // 7. Use hash to deterministically select an image from the pool
  const hash = hashString(slug)
  const index = hash % finalPool.length

  return finalPool[index]
}

// Category assignment based on slug keywords (Display Category)
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

  // Track recently assigned images to ensure variety (last 5 images)
  const recentImages: string[] = []
  const RECENT_LIMIT = 5

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
    // Added table support if needed, but keeping basic for now
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

    // Get image using smart assignment logic
    const image = getImageForArticle(slug, title, recentImages)

    // Update recent images tracker
    recentImages.push(image)
    if (recentImages.length > RECENT_LIMIT) {
      recentImages.shift() // Remove oldest
    }

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

  // Second pass: inject internal cross-links now that we have all articles
  for (const article of articles) {
    article.htmlContent = injectCrossLinks(article.htmlContent, article.slug)
  }

  return articles
}

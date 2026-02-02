import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { CHUNK_SIZE, CHUNK_OVERLAP, CHAT_CONTEXT_CHUNKS } from './chatbot-config'

export interface ContentChunk {
  text: string
  source: string // article slug or knowledge file name
  title: string
  category: string
}

// Split text into overlapping chunks
function chunkText(text: string, size: number, overlap: number): string[] {
  const chunks: string[] = []
  let start = 0
  while (start < text.length) {
    const end = Math.min(start + size, text.length)
    chunks.push(text.slice(start, end))
    start += size - overlap
    if (end === text.length) break
  }
  return chunks
}

// Strip markdown/HTML to plain text
function stripToPlainText(content: string): string {
  return content
    .replace(/<[^>]*>/g, '') // HTML tags
    .replace(/#{1,6}\s/g, '') // Markdown headings
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    .replace(/\*([^*]+)\*/g, '$1') // Italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Images
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // Code
    .replace(/\n{3,}/g, '\n\n') // Excessive newlines
    .trim()
}

// Simple category assignment (mirrors markdown.ts logic)
function assignCategory(slug: string, title: string): string {
  const text = `${slug} ${title}`.toLowerCase()
  if (text.includes('sod installation') || text.includes('lay sod') || text.includes('sod care') || text.includes('sod-installation-cost') || text.includes('new-sod-care')) return 'Sod Installation'
  if (text.includes('st-augustine') || text.includes('bermuda') || text.includes('grass')) return 'Grass Types'
  if (text.includes('pest') || text.includes('weed') || text.includes('chinch') || text.includes('bug')) return 'Pest Control'
  if (text.includes('fertilizer') || text.includes('soil')) return 'Soil & Fertilization'
  if (text.includes('irrigation') || text.includes('drainage') || text.includes('water')) return 'Irrigation & Drainage'
  if (text.includes('hurricane') || text.includes('storm')) return 'Seasonal Care'
  if (text.includes('calendar') || text.includes('bare spot') || text.includes('lawn care') || text.includes('edging') || text.includes('mow')) return 'Lawn Care'
  if (text.includes('tree') || text.includes('shade tree')) return 'Trees & Shrubs'
  if (text.includes('garden bed') || text.includes('raised garden')) return 'Garden'
  if (text.includes('paver') || text.includes('patio') || text.includes('walkway')) return 'Hardscaping'
  if (text.includes('lighting') || text.includes('light')) return 'Outdoor Lighting'
  if (text.includes('mulch') || text.includes('landscaping') || text.includes('landscape') || text.includes('plant')) return 'Landscaping'
  return 'Lawn Care'
}

// Build the full chunk index from articles + knowledge docs
let cachedChunks: ContentChunk[] | null = null
let cachedAt = 0
const CACHE_TTL = 60 * 1000 // Re-index every 60 seconds in dev, effectively once per cold start in prod

export function getContentChunks(): ContentChunk[] {
  const now = Date.now()
  if (cachedChunks && now - cachedAt < CACHE_TTL) {
    return cachedChunks
  }

  const chunks: ContentChunk[] = []

  // Index articles from content/articles/
  const articlesDir = path.join(process.cwd(), 'content', 'articles')
  if (fs.existsSync(articlesDir)) {
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))
    for (const file of files) {
      const raw = fs.readFileSync(path.join(articlesDir, file), 'utf-8')
      const { data: frontmatter, content } = matter(raw)
      const slug = frontmatter.slug || file.replace(/\.md$/, '')
      const title = frontmatter.title || slug.replace(/-/g, ' ')
      const category = assignCategory(slug, title)
      const plainText = stripToPlainText(content)

      const textChunks = chunkText(plainText, CHUNK_SIZE, CHUNK_OVERLAP)
      for (const text of textChunks) {
        chunks.push({ text, source: slug, title, category })
      }
    }
  }

  // Index knowledge docs from content/knowledge/ (if they exist)
  const knowledgeDir = path.join(process.cwd(), 'content', 'knowledge')
  if (fs.existsSync(knowledgeDir)) {
    const files = fs.readdirSync(knowledgeDir).filter(f => f.endsWith('.md') || f.endsWith('.txt'))
    for (const file of files) {
      const raw = fs.readFileSync(path.join(knowledgeDir, file), 'utf-8')
      const plainText = stripToPlainText(raw)
      const name = file.replace(/\.(md|txt)$/, '')

      const textChunks = chunkText(plainText, CHUNK_SIZE, CHUNK_OVERLAP)
      for (const text of textChunks) {
        chunks.push({ text, source: name, title: name.replace(/-/g, ' '), category: 'Knowledge Base' })
      }
    }
  }

  cachedChunks = chunks
  cachedAt = now
  return chunks
}

// Simple keyword-based search — scores chunks by word overlap with query
export function searchContent(query: string, maxResults?: number): ContentChunk[] {
  const limit = maxResults ?? CHAT_CONTEXT_CHUNKS
  const chunks = getContentChunks()

  // Tokenize query into meaningful words (3+ chars, lowercase)
  const queryWords = query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/\s+/)
    .filter(w => w.length >= 3)

  // Score each chunk
  const scored = chunks.map(chunk => {
    const textLower = chunk.text.toLowerCase()
    const titleLower = chunk.title.toLowerCase()
    let score = 0

    for (const word of queryWords) {
      // Count occurrences in chunk text
      const regex = new RegExp(word, 'gi')
      const textMatches = (textLower.match(regex) || []).length
      score += textMatches

      // Bonus for title matches
      if (titleLower.includes(word)) {
        score += 3
      }
    }

    // Bonus for exact phrase match
    const queryLower = query.toLowerCase()
    if (textLower.includes(queryLower)) {
      score += 10
    }

    return { chunk, score }
  })

  // Sort by score descending, return top results
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.chunk)
}

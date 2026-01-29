/**
 * Multi-signal related articles scoring.
 *
 * Replaces the simple category-only filter with a weighted scoring system:
 *   - Same category: +10
 *   - Related category bonus: +3 to +5
 *   - Title keyword overlap: +3 per shared keyword
 *   - Slug token overlap: +2 per shared token
 */

interface ArticleSummary {
  slug: string
  title: string
  category: string
}

// Category affinity groups — articles in related categories get a bonus
const CATEGORY_AFFINITY: Record<string, { related: string[]; bonus: number }[]> = {
  'Sod Installation': [
    { related: ['Grass Types', 'Soil & Fertilization', 'Lawn Care'], bonus: 5 },
    { related: ['Irrigation & Drainage'], bonus: 3 },
  ],
  'Grass Types': [
    { related: ['Sod Installation', 'Lawn Care'], bonus: 5 },
    { related: ['Pest Control', 'Soil & Fertilization'], bonus: 3 },
  ],
  'Pest Control': [
    { related: ['Lawn Care', 'Grass Types'], bonus: 4 },
    { related: ['Seasonal Care', 'Soil & Fertilization'], bonus: 3 },
  ],
  'Soil & Fertilization': [
    { related: ['Sod Installation', 'Lawn Care'], bonus: 5 },
    { related: ['Grass Types', 'Irrigation & Drainage'], bonus: 3 },
  ],
  'Irrigation & Drainage': [
    { related: ['Lawn Care', 'Sod Installation'], bonus: 4 },
    { related: ['Seasonal Care'], bonus: 3 },
  ],
  'Seasonal Care': [
    { related: ['Lawn Care'], bonus: 5 },
    { related: ['Pest Control', 'Irrigation & Drainage', 'Grass Types'], bonus: 3 },
  ],
  'Lawn Care': [
    { related: ['Sod Installation', 'Grass Types'], bonus: 4 },
    { related: ['Soil & Fertilization', 'Seasonal Care', 'Pest Control'], bonus: 3 },
  ],
  'Trees & Shrubs': [
    { related: ['Landscaping', 'Garden'], bonus: 5 },
    { related: ['Lawn Care'], bonus: 3 },
  ],
  'Garden': [
    { related: ['Landscaping', 'Trees & Shrubs'], bonus: 5 },
    { related: ['Soil & Fertilization'], bonus: 3 },
  ],
  'Hardscaping': [
    { related: ['Landscaping', 'Outdoor Lighting'], bonus: 5 },
    { related: ['Garden'], bonus: 3 },
  ],
  'Outdoor Lighting': [
    { related: ['Landscaping', 'Hardscaping'], bonus: 4 },
  ],
  'Landscaping': [
    { related: ['Garden', 'Trees & Shrubs', 'Hardscaping'], bonus: 4 },
    { related: ['Sod Installation', 'Outdoor Lighting'], bonus: 3 },
  ],
}

// Common stop words to exclude from keyword matching
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'it', 'as', 'be', 'was', 'are',
  'your', 'you', 'how', 'what', 'when', 'why', 'do', 'does', 'can',
  'will', 'vs', 'fl', 'jacksonville', 'florida', 'guide', 'best',
])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/[\s-]+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
}

function getCategoryBonus(sourceCategory: string, targetCategory: string): number {
  const affinities = CATEGORY_AFFINITY[sourceCategory]
  if (!affinities) return 0
  for (const group of affinities) {
    if (group.related.includes(targetCategory)) {
      return group.bonus
    }
  }
  return 0
}

/**
 * Score and return the top related articles for a given article.
 *
 * @param currentSlug    Slug of the current article
 * @param currentTitle   Title of the current article
 * @param currentCategory Category of the current article
 * @param allArticles    Array of all articles (slug, title, category)
 * @param count          Number of related articles to return (default 3)
 */
export function getRelatedArticles<T extends ArticleSummary>(
  currentSlug: string,
  currentTitle: string,
  currentCategory: string,
  allArticles: T[],
  count = 3
): T[] {
  const titleTokens = tokenize(currentTitle)
  const slugTokens = tokenize(currentSlug)

  const scored = allArticles
    .filter((a) => a.slug !== currentSlug)
    .map((candidate) => {
      let score = 0

      // Same category: +10
      if (candidate.category === currentCategory) {
        score += 10
      } else {
        // Related category bonus
        score += getCategoryBonus(currentCategory, candidate.category)
      }

      // Title keyword overlap: +3 each
      const candidateTitleTokens = tokenize(candidate.title)
      for (const token of titleTokens) {
        if (candidateTitleTokens.includes(token)) {
          score += 3
        }
      }

      // Slug token overlap: +2 each
      const candidateSlugTokens = tokenize(candidate.slug)
      for (const token of slugTokens) {
        if (candidateSlugTokens.includes(token)) {
          score += 2
        }
      }

      return { article: candidate, score }
    })

  // Sort by score descending, break ties by title alphabetically
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.article.title.localeCompare(b.article.title)
  })

  return scored.slice(0, count).map((s) => s.article)
}

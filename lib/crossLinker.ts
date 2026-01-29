/**
 * Cross-linking engine for internal SEO links between articles.
 *
 * Post-processes article HTML to inject <a> tags pointing to other articles.
 * Rules:
 *   - First occurrence of each phrase only
 *   - Max 7 links per article
 *   - Skips headings (h1-h6) and existing <a> tags
 *   - Preserves original case of matched text
 *   - No self-links
 */

// Maps topic phrases (lowercase) → article slug
// Ordered roughly by SEO value / search volume
const TOPIC_SLUG_MAP: Record<string, string> = {
  // --- Grass types ---
  'st. augustine grass': 'warm-season-grass-types-northeast-florida',
  'st augustine grass': 'warm-season-grass-types-northeast-florida',
  'bermuda grass': 'warm-season-grass-types-northeast-florida',
  'zoysia grass': 'zoysia-grass-care-guide-jacksonville',
  'bahia grass': 'bahia-grass-care-guide-jacksonville',
  'empire zoysia': 'empire-zoysia-grass-jacksonville-fl',
  'tiftuf bermuda': 'tiftuf-bermuda-grass-jacksonville',
  'celebration bermuda': 'celebration-bermuda-grass-jacksonville',
  'floratam': 'floratam-vs-palmetto-st-augustine-jacksonville',
  'palmetto grass': 'floratam-vs-palmetto-st-augustine-jacksonville',
  'citrablue': 'citrablue-st-augustine-grass-jacksonville',
  'provista': 'provista-st-augustine-grass-jacksonville',
  'ornamental grass': 'ornamental-grass-varieties-jacksonville',
  'warm season grass': 'warm-season-grass-types-northeast-florida',

  // --- Sod installation ---
  'sod installation': 'sod-installation-step-by-step-jacksonville',
  'install sod': 'sod-installation-step-by-step-jacksonville',
  'laying sod': 'sod-installation-step-by-step-jacksonville',
  'sod installation cost': 'sod-installation-cost-jacksonville-2026',
  'cost of sod': 'sod-installation-cost-jacksonville-2026',
  'sod per pallet': 'how-much-sod-do-i-need-calculator-guide',
  'pallet of sod': 'sod-pallet-coverage-guide-jacksonville',
  'sod delivery': 'sod-delivery-jacksonville-fl',
  'new sod care': 'new-sod-care-first-30-days-jacksonville',
  'sod vs seed': 'sod-vs-seed-jacksonville-fl',
  'sod vs artificial turf': 'sod-vs-artificial-turf-jacksonville',
  'hydroseeding': 'sod-vs-hydroseeding-jacksonville-comparison',
  'diy vs professional': 'diy-vs-professional-sod-installation-jacksonville',
  'sod warranty': 'sod-warranty-what-to-expect-jacksonville',

  // --- Lawn care basics ---
  'lawn mowing': 'lawn-mowing-schedule-jacksonville-fl',
  'mowing height': 'mowing-height-guide-jacksonville-lawns',
  'lawn edging': 'lawn-edging-options-jacksonville',
  'lawn aeration': 'lawn-aeration-dethatching-jacksonville-fl',
  'dethatching': 'lawn-aeration-dethatching-jacksonville-fl',
  'top dressing': 'top-dressing-lawn-jacksonville-fl',
  'lawn striping': 'lawn-striping-patterns-jacksonville',
  'overseeding': 'how-to-overseed-lawn-jacksonville',
  'bare spots': 'fix-bare-spots-jacksonville-lawn',
  'lawn renovation': 'complete-lawn-renovation-jacksonville',
  'lawn scalping': 'lawn-scalping-damage-jacksonville-repair',

  // --- Soil & fertilization ---
  'soil preparation': 'soil-preparation-for-sod',
  'soil test': 'how-to-read-soil-test-jacksonville',
  'soil amendment': 'soil-amendment-guide-jacksonville-fl',
  'fertilizer schedule': 'fertilizer-schedule-jacksonville-fl-lawns',
  'compost vs fertilizer': 'compost-vs-fertilizer-jacksonville-lawns',
  'lawn ph': 'lawn-ph-testing-jacksonville-soil',

  // --- Irrigation & water ---
  'irrigation system': 'irrigation-guide-jacksonville-lawns',
  'sprinkler system': 'how-to-install-sprinkler-system-jacksonville',
  'smart irrigation': 'smart-irrigation-systems-jacksonville',
  'watering schedule': 'best-time-to-water-lawn-jacksonville',
  'watering restrictions': 'jacksonville-lawn-watering-restrictions',
  'overwatering': 'overwatering-vs-underwatering-lawn-jacksonville',
  'drip irrigation': 'drip-irrigation-gardens-jacksonville-guide',
  'backflow preventer': 'backflow-preventer-jacksonville-irrigation',

  // --- Pests & disease ---
  'chinch bugs': 'chinch-bug-damage-st-augustine-jacksonville',
  'lawn grubs': 'lawn-grub-treatment-jacksonville-fl',
  'fire ants': 'fire-ant-control-jacksonville-lawns',
  'brown patch': 'brown-patch-fungus-jacksonville-sod',
  'lawn fungus': 'lawn-fungus-treatment-jacksonville-fl',
  'dollar spot': 'dollar-spot-fungus-jacksonville-lawns',
  'gray leaf spot': 'gray-leaf-spot-st-augustine-jacksonville',
  'take-all root rot': 'take-all-root-rot-jacksonville-lawns',
  'armyworms': 'armyworm-damage-jacksonville-lawns',
  'mole damage': 'mole-damage-lawn-jacksonville',
  'lawn pests': 'common-lawn-pests-jacksonville-fl',

  // --- Weeds ---
  'pre-emergent herbicide': 'pre-emergent-herbicide-schedule-jacksonville',
  'crabgrass': 'crabgrass-prevention-jacksonville-fl',
  'burweed': 'burweed-stickerweed-florida',
  'sticker weed': 'burweed-stickerweed-florida',
  'kill weeds': 'kill-weeds-without-killing-lawn-jacksonville',

  // --- Seasonal ---
  'spring lawn care': 'spring-lawn-care-jacksonville-fl',
  'summer lawn care': 'summer-lawn-care-jacksonville-fl',
  'fall lawn care': 'fall-lawn-care-jacksonville-fl',
  'winter lawn care': 'winter-lawn-care-jacksonville-fl',
  'hurricane lawn': 'prepare-jacksonville-lawn-hurricane-season',
  'frost protection': 'frost-protection-jacksonville-lawns',
  'heat stress': 'heat-stress-lawn-jacksonville-summer',
  'rainy season': 'lawn-care-during-florida-rainy-season',

  // --- Trees & plants ---
  'palm trees': 'palm-tree-guide-jacksonville-fl',
  'shade trees': 'shade-trees-jacksonville',
  'fruit trees': 'fruit-trees-jacksonville-fl-guide',
  'crape myrtle': 'crape-myrtle-care-jacksonville-fl',
  'native plants': 'native-plants-jacksonville-fl-landscaping',
  'drought tolerant plants': 'drought-tolerant-plants-jacksonville-fl',
  'privacy hedge': 'privacy-hedge-plants-jacksonville-fl',
  'azaleas': 'azalea-care-jacksonville-fl',

  // --- Landscaping ---
  'mulch': 'types-mulch-jacksonville-landscapes',
  'paver patio': 'paver-patios-walkways-jacksonville-homeowner-guide',
  'retaining wall': 'retaining-wall-options-jacksonville',
  'landscape lighting': 'best-outdoor-lighting-ideas-for-jacksonville-landscapes',
  'flower bed': 'flower-bed-design-jacksonville-fl',
  'raised garden bed': 'how-to-build-raised-garden-bed-jacksonville-fl',
  'curb appeal': 'curb-appeal-landscaping-jacksonville',
  'xeriscaping': 'xeriscaping-jacksonville-fl',
  'rain garden': 'rain-garden-jacksonville-fl',
  'ground cover': 'ground-cover-plants-jacksonville-fl',
  'landscape rock': 'landscape-rock-and-stone-options-jacksonville',
  'drainage solutions': 'drainage-solutions-jacksonville-yards',

  // --- Situational ---
  'pet-safe lawn': 'pet-safe-lawn-care-jacksonville',
  'dog friendly grass': 'best-grass-for-dogs-jacksonville-fl',
  'shade grass': 'best-grass-for-shade-jacksonville-fl',
  'salt tolerant grass': 'best-salt-tolerant-grass-jacksonville',
  'low maintenance grass': 'best-low-maintenance-grass-jacksonville',
  'pool landscaping': 'pool-landscaping-ideas-jacksonville-fl',
  'hoa lawn': 'hoa-lawn-requirements-jacksonville-fl',
  'new construction': 'new-construction-sod-installation-jacksonville',
  'commercial landscaping': 'commercial-sod-installation-jacksonville',
  'organic lawn care': 'organic-lawn-care-jacksonville-fl',
  'growing zones': 'jacksonville-growing-zones-explained',
}

// Tags inside which we must NOT inject links
const SKIP_TAGS = /(<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>|<a[^>]*>[\s\S]*?<\/a>)/gi

/**
 * Inject cross-links into article HTML.
 *
 * @param html          The article's rendered HTML string
 * @param currentSlug   The slug of the current article (to avoid self-links)
 * @param maxLinks      Maximum number of links to inject (default 7)
 * @returns             HTML string with internal links injected
 */
export function injectCrossLinks(
  html: string,
  currentSlug: string,
  maxLinks = 7
): string {
  // Build list of eligible phrases (exclude those pointing to the current article)
  const eligible = Object.entries(TOPIC_SLUG_MAP).filter(
    ([, slug]) => slug !== currentSlug
  )

  // Sort by phrase length descending so longer phrases match before shorter ones
  // e.g. "st. augustine grass" before "grass"
  eligible.sort((a, b) => b[0].length - a[0].length)

  let linksInjected = 0
  const usedSlugs = new Set<string>()

  // Split HTML into "safe" and "skip" segments
  // Skip segments are headings and existing <a> tags
  const segments = html.split(SKIP_TAGS)

  const result = segments.map((segment) => {
    // If this segment is a heading or link, leave it untouched
    if (SKIP_TAGS.test(segment)) {
      // Reset lastIndex since SKIP_TAGS has the g flag
      SKIP_TAGS.lastIndex = 0
      return segment
    }

    // Process this text segment for cross-link opportunities
    for (const [phrase, slug] of eligible) {
      if (linksInjected >= maxLinks) break
      if (usedSlugs.has(slug)) continue

      // Build a case-insensitive regex for the phrase, word-bounded
      const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const re = new RegExp(`\\b(${escaped})\\b`, 'i')
      const match = segment.match(re)

      if (match && match.index !== undefined) {
        const original = match[1] // preserves original case
        const link = `<a href="/articles/${slug}">${original}</a>`
        segment =
          segment.slice(0, match.index) +
          link +
          segment.slice(match.index + original.length)
        linksInjected++
        usedSlugs.add(slug)
      }
    }

    return segment
  })

  return result.join('')
}

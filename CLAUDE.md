# Jax Sod Website - Project Memory

## Overview
- **Site**: https://jaxsod.com
- **Business**: Sod installation company, Jacksonville FL, ~40 years experience
- **Stack**: Next.js 14.2.15, React 18, TypeScript, Tailwind CSS 3
- **Hosting**: Vercel (auto-deploys from GitHub)
- **Repo**: ~/jaxsod-website (moved from ~/clawd/jaxsod-new on 2026-01-27)
- **Phone**: (904) 901-1457

## Project Structure
```
jaxsod-website/
  app/                  # Next.js App Router pages
    articles/           # Blog listing + [slug] dynamic routes
    service-areas/      # Location pages
    sod-types/          # Grass type pages
    calculators/        # Sod, mulch, rock, topsoil calculators
    sitemap.ts          # BROKEN - only includes 26 hardcoded articles
    not-found.tsx       # 404 page (exists, looks fine)
    layout.tsx          # Root layout - has broken Google verification placeholder
    globals.css         # Tailwind styles + hand-rolled prose styles
  components/           # 9 React components
    Header.tsx          # Sticky header, mobile menu, placeholder "J" logo
    Footer.tsx          # Footer with hardcoded business info
    Hero.tsx            # Reusable hero banner
    CTASection.tsx      # Call-to-action section
    ContactForm.tsx     # MISLEADING NAME - actually a "Text Us" prompt, no form
    LocalBusinessSchema.tsx  # JSON-LD structured data (hardcoded values)
    MarkdownContent.tsx # Renders markdown HTML (no sanitization)
    ServiceCard.tsx     # Service display card
    TestimonialCard.tsx # Testimonial display card
  content/articles/     # 200 markdown article files
  data/
    articles.tsx        # 26 hardcoded articles (2,632 lines of inline JSX) + getAllArticles()
    service-areas.ts    # 9 service areas (phone number hardcoded in descriptions)
  lib/
    markdown.ts         # Markdown processing + IMAGE_LIBRARY (150 URLs, 22 categories) + keyword matching
  docs/                 # Planning & strategy documents (not deployed)
  public/               # EMPTY - no favicon, no images, no og-image, nothing
```

## Content Inventory (as of 2026-01-27)
- **26 hardcoded articles** in data/articles.tsx (inline JSX — should be converted to markdown)
- **200 markdown articles** in content/articles/ (generated via AI, varying quality)
- **~226 total** after deduplication (some slugs overlap, hardcoded takes precedence)
- **10 static pages**: home, services, sod-types, service-areas, articles, reviews, faq, about, contact, calculators
- **4 calculators**: sod, mulch, rock, topsoil
- **9 service area pages**: Jacksonville, Atlantic Beach, Fleming Island, Mandarin, Ponte Vedra, Nocatee, Orange Park, St. Augustine, Jacksonville Beach

## Known Bugs & Issues

### P0 - BROKEN
1. **Sitemap broken** — imports raw `articles` (26) instead of `getAllArticles()` (226). ~200 articles invisible to Google.
2. **Google Search Console not verified** — `layout.tsx` has placeholder `'your-google-verification-code'`.
3. **Missing og-image.jpg** — LocalBusinessSchema references it but file doesn't exist. Structured data points to 404.
4. **No favicon** — `public/` directory is completely empty.
5. **Broken image URL** — `lib/markdown.ts` line 88 has corrupted Unsplash URL (period in photo ID).
6. **Broken local image ref** — Irrigation article references `/irrigation-sprinkler.png` that doesn't exist.

### P1 - Wrong Images
- Polar bears, chickens, fashion photos on a landscaping site
- Same ~30-40 images recycled across 226 articles
- Keyword matching too loose (e.g., "waterfront" triggers irrigation)
- Duplicate URLs across categories
- No fallback for broken image URLs

### P2 - Architecture
- **No constants file** — Phone number hardcoded in 20+ places. Business name, hours, address scattered everywhere.
- **Two article systems** — 26 hardcoded JSX + 200 markdown. Should all be markdown.
- **Nav mismatch** — Header has 10 items, Footer has 9 (missing Calculators).
- **Two separate category matching systems** — image category vs display category use different logic.
- **ContactForm has no form** — It's just a "Text Us" prompt. Misnamed component.
- **No real contact form** — Desktop users can't submit inquiries without texting.

### P3 - SEO
- Zero analytics (no GA, no Vercel Analytics — can't measure anything)
- Duplicate articles covering same topics with different slugs
- Near-duplicate meta descriptions on service area pages
- No breadcrumbs
- No structured data on service area or review pages
- No internal cross-linking between articles

### P4 - Security & Performance
- No security headers configured
- X-Powered-By header exposed
- HTML sanitization disabled on markdown rendering
- No error.tsx error boundary
- No loading.tsx loading states
- No `sharp` package for image optimization

## Image System
- All images are external Unsplash URLs in lib/markdown.ts
- IMAGE_LIBRARY: 22 categories, ~150 URLs
- KEYWORD_PATTERNS: matches article slug/title text to image category
- hashString(): deterministic image selection per article
- findBestCategory(): weighted keyword scoring for image category
- assignCategory(): SEPARATE function with different keywords for display category
- getImageForArticle(): selects from pool with "recent" deduplication (window of 5)

## Architecture Notes
- Markdown: gray-matter (frontmatter) + remark/remark-html (HTML conversion)
- getAllArticles() merges hardcoded + markdown, deduplicates by slug
- generateStaticParams() for SSG on article pages
- JSON-LD Article schema on each article page
- next.config.js: only remote pattern is images.unsplash.com
- No API routes exist (no app/api/ directory)
- No environment variables used (.env doesn't exist)

## Planning Docs (in docs/)
- jaxsod-article-master-plan.md — Master tracker for all articles
- jaxsod-articles-tracking.md — Current article status tracking
- jaxsod-seo-keywords.md — SEO keyword map + competitor analysis
- jaxsod_seo_strategy.md — Strategy for ranking improvement
- jaxsod-new-articles-plan.md — Plan for the 200 article batch
- jaxsod-chatbot-research.md — AI chatbot platform comparison (Tidio recommended)

## Previous Versions (archived, do not use)
- ~/clawd/projects/jaxsod-website — Older 23-page version, no articles, superseded
- ~/.gemini/antigravity/scratch/.../jaxsod-website — Earliest version with gallery page concept
- ~/clawd/jaxsod-new — Original location (project copied from here on 2026-01-27)

## History
- Original site built as simple 23-page brochure site
- Expanded to current version with 200+ articles for SEO
- Articles generated in batches (63 at a time) to reach 200 target
- Images assigned programmatically via Unsplash — many are wrong/irrelevant
- Built by a different AI wrapper (also Opus 4.5, different orchestration)
- Moved from ~/clawd/jaxsod-new to ~/jaxsod-website on 2026-01-27
- Full audit completed 2026-01-27: found broken sitemap, wrong images, no favicon, no analytics, no constants file, hardcoded phone in 20+ places, two article systems, security gaps

# Jax Sod Website - Project Memory

## Overview
- **Site**: https://jaxsod.com
- **Business**: Sod installation company, Jacksonville FL, est. 1986
- **Stack**: Next.js 14.2.15, React 18, TypeScript, Tailwind CSS 3
- **Hosting**: Vercel (auto-deploys from GitHub `main` branch)
- **Repo**: https://github.com/bigbricey/jaxsod-new
- **Local path**: ~/Desktop/all jax sod stuff/jaxsod-website
- **Phone**: (904) 901-1457

## Project Structure
```
jaxsod-website/
  app/                    # Next.js App Router pages
    layout.tsx            # Root layout (Google verification still placeholder)
    page.tsx              # Home page
    globals.css           # Tailwind styles + hand-rolled prose styles
    icon.svg              # Favicon (simple "J" logo)
    opengraph-image.tsx   # Dynamic OG image generator
    robots.ts             # Robots.txt config
    sitemap.ts            # Sitemap (uses getAllArticles - includes all 221 articles)
    error.tsx             # Error boundary
    loading.tsx           # Loading skeleton
    not-found.tsx         # 404 page
    articles/             # Blog listing + [slug] dynamic routes
    service-areas/        # Location pages (9 areas)
    sod-types/            # Grass type page
    services/             # Services page
    about/                # About page
    contact/              # Contact page
    reviews/              # Reviews page
    faq/                  # FAQ page
    privacy/              # Privacy policy
    terms/                # Terms of service
    calculators/          # Hub + 4 calculator pages (sod, mulch, rock, topsoil)
  components/             # 11 React components
    Header.tsx            # Sticky header, mobile menu, placeholder "J" logo
    Footer.tsx            # Footer with business info
    Hero.tsx              # Reusable hero banner
    CTASection.tsx        # Call-to-action section
    ContactForm.tsx       # "Text Us" prompt (misnamed - not a form)
    LocalBusinessSchema.tsx  # JSON-LD structured data
    ServiceAreaSchema.tsx # Service area JSON-LD
    MarkdownContent.tsx   # Renders markdown HTML
    Breadcrumbs.tsx       # Breadcrumb navigation
    ServiceCard.tsx       # Service display card
    TestimonialCard.tsx   # Testimonial display card
  content/articles/       # 221 markdown article files
  data/
    articles.tsx          # Article loader (37 lines, refactored from 2600+ lines of JSX)
    service-areas.ts      # 9 service areas
  lib/
    constants.ts          # Centralized business data (phone, address, hours, etc.)
    markdown.ts           # Markdown processing + IMAGE_LIBRARY + keyword matching
  public/
    images/               # 201 AI-generated images across 25 categories (see Image System)
  docs/                   # Planning & strategy documents (not deployed)
```

## Content Inventory (as of 2026-01-27)
- **221 markdown articles** in content/articles/ (all articles now markdown, no more hardcoded JSX)
- **10 static pages**: home, services, sod-types, service-areas, articles, reviews, faq, about, contact, calculators
- **4 calculators**: sod, mulch, rock, topsoil
- **9 service area pages**: Jacksonville, Atlantic Beach, Fleming Island, Mandarin, Ponte Vedra, Nocatee, Orange Park, St. Augustine, Jacksonville Beach

## Image System
- **201 local AI-generated images** in public/images/ across 25 categories
- Images generated via Google Gemini (Imagen) - rate-limited, ~80% complete
- Categories with 8 images each: bermudaGrass, commercial, crewsWorking, drainage, flowerBeds, irrigation, lawnMowing, lighting, lushLawn, mulch, oakTrees, palmTrees, pavers, pestDamage, pools, rain, seasonal, shadeGarden, sodCloseup, soil, tools, zoysiaGrass
- Categories with 10 images: floridaYards, yards
- Partial: stAugustineGrass (5 images, 3 remaining)
- Empty (not started): droughtTolerant, golfCourse, newConstruction, petsAndLawns, sportsTurf, waterfront
- **Also still uses** external Unsplash URLs via lib/markdown.ts IMAGE_LIBRARY (22 categories, ~150 URLs, many broken/irrelevant)
- Image handoff doc: docs/jax_sod_image_handoff.md (resume instructions for completing remaining images)
- Image prompts: docs/JAX-SOD-IMAGE-PROMPTS.md

## What's Been Fixed (vs original audit)
- Sitemap now uses getAllArticles() - all 221 articles included
- Constants file created (lib/constants.ts) - phone, address, hours centralized
- Articles refactored - all markdown now, articles.tsx is just a 37-line loader
- Security headers configured in next.config.js (X-Frame-Options, HSTS, etc.)
- X-Powered-By disabled
- error.tsx and loading.tsx added
- icon.svg favicon added
- opengraph-image.tsx dynamic generator added
- robots.ts added
- Breadcrumbs component added
- ServiceAreaSchema component added
- GitHub repo name restored to jaxsod-new (Gemini had renamed to jaxsod-v2)

## Known Remaining Issues

### P0 - Needs Fixing
1. **Google verification placeholder** - layout.tsx:61 still has `'your-google-verification-code'`

### P1 - Images
- Local images (201) only cover 25 of 31 categories - 6 categories still empty
- Unsplash IMAGE_LIBRARY still has ~12 broken URLs (404s)
- Unsplash IMAGE_LIBRARY has ~25 irrelevant images (polar bears, fashion, etc.)
- Keyword matching too loose (e.g., "waterfront" triggers irrigation)
- Need to integrate local images into the article image system (currently still using Unsplash URLs)

### P2 - SEO & Analytics
- Zero analytics (no GA, no Vercel Analytics)
- Some duplicate article topics with different slugs
- Near-duplicate meta descriptions on service area pages
- No internal cross-linking between articles

### P3 - Nice to Have
- ContactForm is misnamed (it's a "Text Us" prompt, not a form)
- No real contact form for desktop users
- Placeholder "J" logo instead of real logo
- No sharp package for image optimization
- HTML sanitization disabled on markdown rendering (uses dangerouslySetInnerHTML)

## Architecture Notes
- Markdown: gray-matter (frontmatter) + remark/remark-html (HTML conversion)
- getAllArticles() loads all markdown files, deduplicates by slug
- generateStaticParams() for SSG on article pages
- JSON-LD Article schema on each article page
- next.config.js: remote pattern for images.unsplash.com, security headers enabled
- lib/constants.ts: BUSINESS_NAME, PHONE, SITE_URL, ADDRESS, GEO, BUSINESS_HOURS, FOUNDING_YEAR, dynamic getYearsExperience()
- No API routes (no app/api/ directory)
- No environment variables needed (.env doesn't exist)

## Planning Docs (in docs/)
- JAX-SOD-IMAGE-PROMPTS.md - Master list of image generation prompts
- jax_sod_image_handoff.md - Image generation status & resume instructions
- image-audit-report.md - Unsplash image library audit
- jaxsod-article-master-plan.md - Master tracker for all articles
- jaxsod-articles-tracking.md - Current article status tracking
- jaxsod-seo-keywords.md - SEO keyword map + competitor analysis
- jaxsod_seo_strategy.md - Strategy for ranking improvement
- jaxsod-new-articles-plan.md - Plan for the 200 article batch
- jaxsod-chatbot-research.md - AI chatbot feature ideas (will be custom-built, no paid services)

## Rules
- **No paid subscriptions or services.** Everything gets built custom. No Tidio, no SaaS chatbots, no paid analytics platforms. If it costs money, we build it ourselves.

## History
- Original site built as simple 23-page brochure site
- Expanded with 200+ articles for SEO (batches of 63)
- Full audit 2026-01-27: found broken sitemap, wrong images, no favicon, no analytics, hardcoded phone in 20+ places, two article systems
- Major refactor 2026-01-27: constants file, sitemap fix, article consolidation, security headers, error/loading states
- Image generation started 2026-01-27: 201 of ~252 AI images generated before Gemini rate limit
- Gemini incident 2026-01-27: Gemini renamed GitHub repo to jaxsod-v2, created confusion. Restored to jaxsod-new.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for Jax Sod, a sod installation company in Jacksonville, FL (est. 1986). SEO-focused static site with 221 markdown articles, 9 service area pages, and 4 calculators. Deployed on Vercel from the `main` branch.

- **Live site**: https://jaxsod.com
- **Repo**: https://github.com/bigbricey/jaxsod-new
- **Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS 3

## Commands

```bash
npm run dev          # Dev server at localhost:3000
npm run build        # Production build (SSG for all 221 articles)
npm run start        # Serve production build locally
npm run lint         # ESLint
```

No test framework is configured.

## Architecture

### Content Pipeline

Articles are markdown files in `content/articles/` with YAML frontmatter. The pipeline:

1. `lib/markdown.ts` — Reads markdown files, parses frontmatter (gray-matter), converts to HTML (remark + remark-html), matches keywords to image categories via `KEYWORD_PATTERNS`
2. `data/articles.tsx` — `getAllArticles()` wraps the markdown loader, returns `Article[]`
3. `app/articles/[slug]/page.tsx` — Uses `generateStaticParams()` for SSG, `generateMetadata()` for SEO

All 221 articles are statically generated at build time. The sitemap (`app/sitemap.ts`) also calls `getAllArticles()`.

### Business Data

`lib/constants.ts` is the single source of truth for all business info (phone, address, hours, service areas, ratings). Used by components, metadata, and JSON-LD schemas. Never hardcode business data elsewhere.

### Image System (in transition)

Two systems currently coexist:
- **Local AI images**: 201 images in `public/images/` across 25 categories (generated via Gemini Imagen)
- **Unsplash fallback**: `IMAGE_LIBRARY` in `lib/markdown.ts` with external URLs (many broken/irrelevant)

`KEYWORD_PATTERNS` in `lib/markdown.ts` maps article content keywords to image categories. The local images are not yet wired into the article rendering — articles still use Unsplash URLs.

### SEO & Structured Data

- `components/LocalBusinessSchema.tsx` — JSON-LD for the business entity
- `components/ServiceAreaSchema.tsx` — JSON-LD for service area pages
- `app/opengraph-image.tsx` — Dynamic OG image generation
- Each article page generates its own Article schema + metadata
- `app/robots.ts` and `app/sitemap.ts` for crawlers

### Service Areas

Defined in `data/service-areas.ts` (9 Jacksonville-area locations). Rendered via `app/service-areas/[slug]/page.tsx` with SSG.

### Styling

Tailwind CSS with custom green/gray color palettes in `tailwind.config.ts`. Hand-rolled prose styles in `app/globals.css` (no Tailwind Typography plugin). Import alias `@/*` maps to project root.

## Key Files

| File | Purpose |
|------|---------|
| `lib/constants.ts` | All business data — phone, address, hours, geo, service areas |
| `lib/markdown.ts` | Markdown processing, IMAGE_LIBRARY, KEYWORD_PATTERNS |
| `data/articles.tsx` | Article loader (`getAllArticles()`) |
| `data/service-areas.ts` | Service area definitions |
| `app/layout.tsx` | Root layout, global metadata, Google verification (placeholder at line 61) |
| `next.config.js` | Security headers, Unsplash remote image pattern |
| `components/ContactForm.tsx` | Misnamed — it's a "Text Us" CTA, not a form |

## Known Issues

- `layout.tsx:61` has placeholder Google Search Console verification code
- 6 image categories are empty (droughtTolerant, golfCourse, newConstruction, petsAndLawns, sportsTurf, waterfront)
- Unsplash IMAGE_LIBRARY has ~12 broken URLs and ~25 irrelevant images
- No analytics configured
- `MarkdownContent.tsx` uses `dangerouslySetInnerHTML` without sanitization

## Planning Docs

Strategy and tracking documents live in `docs/` (not deployed):
- `jax_sod_image_handoff.md` — Image generation status & resume instructions
- `JAX-SOD-IMAGE-PROMPTS.md` — Image generation prompts
- `jaxsod-article-master-plan.md` — Article tracker
- `jaxsod-seo-keywords.md` — SEO keyword map
- `jaxsod_seo_strategy.md` — Ranking strategy
- `jaxsod-chatbot-research.md` — Future AI chatbot ideas

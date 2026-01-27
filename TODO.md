# Jax Sod Website - TODO

## Done
- [x] Fix sitemap to include all articles (uses getAllArticles now)
- [x] Add favicon (icon.svg)
- [x] Add OG image (opengraph-image.tsx dynamic generator)
- [x] Create constants file (lib/constants.ts - phone, address, hours centralized)
- [x] Convert hardcoded articles to markdown (articles.tsx now 37-line loader)
- [x] Add security headers (next.config.js)
- [x] Disable X-Powered-By header
- [x] Add error.tsx error boundary
- [x] Add loading.tsx loading state
- [x] Add Breadcrumbs component
- [x] Add ServiceAreaSchema component
- [x] Add robots.ts
- [x] Make years of experience dynamic (getYearsExperience() in constants.ts)
- [x] Fix GitHub repo name (restored to jaxsod-new after Gemini renamed it)
- [x] Generate 201 local AI images (25 of 31 categories complete)

## P0 - Fix Now
1. Google verification placeholder — layout.tsx:61 still has `'your-google-verification-code'`. Need real code from Google Search Console.

## P1 - Images
2. Finish remaining image generation — 6 empty categories: droughtTolerant, golfCourse, newConstruction, petsAndLawns, sportsTurf, waterfront. Plus 3 more for stAugustineGrass. See docs/jax_sod_image_handoff.md for resume instructions.
3. Integrate local images into article system — lib/markdown.ts still serves Unsplash URLs. Need to update IMAGE_LIBRARY to use local /images/ paths instead.
4. Clean up Unsplash IMAGE_LIBRARY — Remove broken URLs (12 known 404s) and irrelevant images (polar bears, fashion photos, etc.).
5. Fix keyword matching — KEYWORD_PATTERNS in lib/markdown.ts too loose (e.g., "waterfront" triggers irrigation).

## P2 - SEO & Analytics
6. Add Google Analytics or Vercel Analytics — Zero traffic measurement right now.
7. Fix duplicate article slugs — sod-vs-seed has 3 variants, best-time-to-install has 2 variants covering same topic.
8. Improve service area meta descriptions — Currently near-duplicate across 9 pages.
9. Add internal cross-linking — Articles should link to related articles and service pages.

## P3 - Nice to Have
10. Rename ContactForm component — It's a "Text Us" prompt, not a form.
11. Add a real contact form — Desktop users can't submit inquiries without texting.
12. Replace placeholder logo — Header shows a green box with "J".
13. Install sharp — Next.js recommends it for production image optimization.
14. Add HTML sanitization — MarkdownContent uses dangerouslySetInnerHTML without sanitization.
15. Unify nav links — Header has 10 items, Footer has 9 (missing Calculators).

## Future
16. AI chatbot — Build custom (no paid services). See docs/jaxsod-chatbot-research.md for feature ideas.
17. Gallery page — Was in earlier version, could return with real project photos.
18. Upgrade to Next.js 15 / React 19.
19. Add Tailwind Typography plugin to replace hand-rolled prose styles.

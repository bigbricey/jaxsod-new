# Jax Sod Website - Master TODO

Everything that needs fixing, in order of importance.

1. Fix sitemap — `app/sitemap.ts` only includes 26 hardcoded articles. ~200 markdown articles are invisible to Google.
2. Fix Google Search Console verification — `layout.tsx` has placeholder text instead of a real verification code. Google can't verify the site.
3. Add og-image.jpg — `LocalBusinessSchema.tsx` references it but the file doesn't exist. Structured data points to a 404.
4. Add favicon — No `favicon.ico` in `public/`. The site has no icon in browser tabs.
5. Fix broken image URL — `lib/markdown.ts` line 88 has a corrupted Unsplash URL with a period in the photo ID.
6. Fix broken local image reference — One hardcoded article references `/irrigation-sprinkler.png` but the file doesn't exist in `public/`.
7. Audit all Unsplash URLs — Go through every URL in `lib/markdown.ts` IMAGE_LIBRARY (22 categories, ~150 URLs). Remove anything not related to landscaping.
8. Replace bad images — Find proper Unsplash photos: actual lawns, sod, irrigation, crews working, Florida yards, palm trees, etc.
9. Fix keyword matching — `KEYWORD_PATTERNS` in `lib/markdown.ts` is too loose. "waterfront" triggers the irrigation category.
10. Increase image variety — Only ~150 images for 226 articles. Many articles share the same photo. Need 300+ unique images minimum.
11. Remove duplicate URLs across categories — Same Unsplash URLs appear in multiple categories, so unrelated articles get identical images.
12. Add image fallbacks — If an Unsplash URL goes 404, articles show a broken image.
13. Create constants file — Phone number `(904) 901-1457` is hardcoded in 20+ places. Business name, hours, address, service areas all scattered everywhere. One phone number change means editing 20 files.
14. Convert 26 hardcoded articles to markdown — `data/articles.tsx` is 2,632 lines of inline JSX. These should be `.md` files like the other 200. Also permanently fixes the sitemap bug.
15. Unify navigation links — Header has 10 nav items, Footer has 9. Footer is missing "Calculators". Header says "About", Footer says "About Us".
16. Unify image category and display category logic — `findBestCategory()` for images and `assignCategory()` for display use completely different keyword matching. Should be one system.
17. Fix ContactForm naming — Component is called "ContactForm" but contains zero form elements. It's a "Text Us" prompt.
18. Remove duplicate paragraph — First article in `data/articles.tsx` has the same paragraph copied twice.
19. Add analytics — Zero analytics on the site. No Google Analytics, no Vercel Analytics. Can't measure traffic, rankings, or which articles work.
20. Verify all 226 articles render — Build locally and confirm every article slug resolves to a page.
21. Fix duplicate articles — `sod-vs-seed` and `sod-vs-seed-jacksonville` cover the same topic. Same with `when-to-install-sod-florida` and `best-time-to-install-sod-florida`.
22. Add internal cross-linking — Articles should link to related articles and service pages.
23. Verify meta descriptions — Check all 200 markdown articles have proper descriptions in frontmatter.
24. Add breadcrumbs — Good for SEO structured data. Was in an older version of the site.
25. Add structured data to service area pages — Articles have JSON-LD but service areas and reviews pages don't.
26. Fix near-duplicate meta descriptions — Service area pages all have very similar meta descriptions. Google may flag as thin content.
27. Add security headers — No X-Frame-Options, Content-Security-Policy, Strict-Transport-Security, or X-Content-Type-Options.
28. Disable X-Powered-By header — Next.js exposes this by default.
29. Add HTML sanitization — Markdown rendering uses `dangerouslySetInnerHTML` with sanitization explicitly disabled.
30. Install sharp — Next.js recommends it for production image optimization.
31. Add error.tsx — No error boundary. Runtime errors show an ugly default screen.
32. Add loading.tsx — No loading states. The articles page processes 226 articles with no loading indicator.
33. Add prefers-reduced-motion guard — `scroll-behavior: smooth` has no accessibility guard for users with motion sensitivity.
34. Enable next-gen image formats — Add avif and webp support in next.config.js.
35. Add a real contact form — Currently text/call only. Desktop users may prefer a web form.
36. Add a real logo — Header just shows a green box with the letter "J".
37. Make years of experience dynamic — "Nearly 40 years" is hardcoded in 10+ places. Calculate from a founding year so it never goes stale.
38. Make aggregate rating dynamic — LocalBusinessSchema hardcodes 4.9 stars / 150 reviews. Will go stale.
39. Add apple-touch-icon — Missing. iPhones show a blank icon if someone saves the site to home screen.
40. Add site.webmanifest — Basic PWA metadata.
41. Install Tailwind Typography plugin — Replace hand-rolled prose styles with the official plugin.
42. Remove use client from ContactForm — Has no client-side interactivity.
43. Add Prettier — No code formatting tool configured.
44. Add TypeScript check script — Add `tsc --noEmit` to package.json.
45. Consider upgrading to Next.js 15 and React 19.
46. AI chatbot — Tidio AI was recommended (see docs/jaxsod-chatbot-research.md).
47. Gallery page — Was in an earlier version, could be re-added with real project photos.
48. Pricing page — Was in the older version, not in current site.
49. Promotional video — Remotion promo exists at ~/remotion-videos/out/jaxsod-promo.mp4.

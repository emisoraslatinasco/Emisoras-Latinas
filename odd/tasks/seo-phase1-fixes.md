# seo-phase1-fixes

## Objective

Fix the SEO defects found in the 2026-11-02 audit that waste ranking signals,
without changing what already works (canonicals, 404 noindex, 30-day cache,
structured data, AI-friendly robots).

## Problem

- Station genre chips and footer genre links point to `/radio/<c>?categories=X`,
  which canonicalises to the country page: internal link equity never reaches
  the genre pages.
- Genre pages `/radio/<c>/genero/<genre>` are missing from every sitemap and use
  English, capitalised, space-encoded slugs (`Christian`, `Pop%20Music`).
- Related stations are not filtered by country (backend
  `stations.service.ts` ~210-245), while the frontend builds
  `/radio/<currentCountry>/<slug>` for each: wrong-country links / 404s.
- Sitemap index and non-station entries use `lastmod = new Date()`; per-country
  legal pages (nosotros/privacidad/terminos/contacto x33) are in sitemaps.
- `/admin-emisoras` has no noindex and is not disallowed.
- Hardcoded stale figures ("27 países", "21.000+") in llms.txt and copy.

## Scope

- Frontend `Emisoras-Latinas` (branch `feat/seo-phase1`).
- Backend `Emisoras-backend` (branch `fix/related-same-country`), related-stations query only.
- Out of scope: content enrichment, city pages, CWV, ads. The user's uncommitted
  ad changes (`app/layout.tsx`, `components/ads/AdsterraBanner.tsx`,
  `package-lock.json`, `app/preguntas-frecuentes/`) are NOT touched or staged.

## Constraints

- Free tiers only (Vercel Hobby, Render free, Supabase Free). No extra origin
  queries per request beyond what already exists.
- Old genre URLs must 301 to the new slug (no lost indexed URLs).
- TDD: strict (source: user global config). Backend runner: `jest`
  (`npm test`). Frontend has no test runner: RED/GREEN not observable there;
  checks are `npm run lint`, `npm run build`, and HTTP checks on `next start`.

## Tasks

- [x] T1 — Backend: related stations restricted to the same country (city match
  first, then genre fill, both same country). Route: delegated (service + spec).
  Evidence: backend commit `3edf84c1`; jest spec RED (3 failed) -> GREEN (3
  passed); `nest build` OK; parent re-ran spec (3 passed) and ran the
  `station.country_id` query read-only against the real DB (rows returned).
  Risk: high -> independent parent check done.
- [x] T2 — Frontend crawl hygiene: real `lastmod` (index and non-station
  entries), legal pages out of sitemaps, `/admin-emisoras` noindex + robots
  Disallow, robots sitemap list consistent, stale figures derived from data.
  Route: delegated (4+ files). Evidence: frontend commit `bd0162fa`; `next
  build` OK; `next start` curl checks OK (no request-time lastmod, 1657 URLs in
  /sitemaps/co without legal pages, admin `noindex, nofollow`). Lint: 2
  pre-existing errors in nosotros/page.tsx:182-183. Risk: high -> parent diff
  review done. Pending: `app/layout.tsx:102` still says "+21,000" (user WIP file).
- [x] T3 — Frontend genres: Spanish lowercase hyphenated slugs, 301 from legacy
  genre URLs, station chips + footer link to genre pages, genre pages added to
  per-country sitemaps. Route: delegated (4+ files). Evidence: frontend commit
  `2d0af1bc`; `utils/genreSlug.ts` (243 API names -> 95 slugs, deliberate
  merges News/Noticias, Sports/Deportes, Culture/Cultura, Classic Hits/Clásicos);
  build + tsc OK; local curl: Christian -> 308 cristiana (200), Pop%20Music ->
  308 pop, unknown -> 404, canonical = slug, 69 genre URLs in /sitemaps/co
  (min 3 stations). Homepage featured genres that were already 404 replaced.
  Risk: high -> parent reviewed resolveGenreParam (case variants redirect by
  code; local `CRISTIANA` 200 attributed to Windows case-insensitive ISR files).
  Pending: verify case-variant redirect on Vercel after deploy.

## Acceptance criteria

- No related-station link points to a different country.
- `/sitemaps/<c>` lists genre pages, no legal pages, and no request-time lastmod.
- `/radio/co/genero/Christian` -> 301 -> new Spanish slug that returns 200.
- Station page HTML has no `?categories=` links.
- `/admin-emisoras` served with `noindex`.

## Delivery

Strategy: ask-on-risk. Forecast ~350 authored lines across both repos.
Push/PR/merge/deploy are the user's decision.

## Progress

- Engram mirror: pending (project ambiguous between emisoras-latinas / emisoras-backend).

## Next step

All tasks done. Delivery (merge/push/deploy of `feat/seo-phase1` and
`fix/related-same-country`) is the user's decision. After deploy: verify on
production and resubmit sitemap in GSC.

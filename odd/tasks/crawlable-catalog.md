# crawlable-catalog

## Objective

Make every station page discoverable by search engines: listed in the sitemap
and reachable through a plain HTML internal link.

## Problem

- `/sitemap.xml` linked only `/sitemaps/<country>` (page 1, capped at 1,000
  stations) and a hand-written list of 27 of the 33 countries. 7,803 of 22,299
  stations were missing from the sitemap (6,514 over the cap, 1,289 in the six
  unlisted countries: AU, TR, PL, PA, TH, HR).
- `/radio/<country>` paginates in the browser, so its HTML links only the first
  batch of stations and `?page=N` canonicalises to page 1. Stations past that
  batch had no crawlable internal link.
- Every sitemap `lastmod` was the request time, which search engines discard.

## Scope

Frontend only (`Emisoras-Latinas`). No backend, database or API changes.

## Constraints

- No extra origin queries: reuse the existing slugs fetch and the per-country
  station load.
- TDD mode: strict (source: user global config). No test runner is installed in
  this project, so RED/GREEN could not be observed; checks below are functional.

## Tasks

- [x] T1 — A-Z index page `/radio/<country>/todas` with an HTML link to every
  station, linked from the country page. Route: inline (one new file plus a
  mechanical link in the country page).
- [x] T2 — Sitemap covers the whole catalog: cap raised to the protocol limit,
  country list derived from `countries`, real `lastmod` per station, index page
  included. Route: inline (two already-understood route handlers).

## Verification evidence (local production build against the production API)

- `tsc --noEmit`: clean. `eslint` on changed files: 0 errors (1 pre-existing
  unused-import warning in the country page).
- `next build`: succeeded; `/radio/[country]/todas` prerendered (SSG) for the
  33 countries.
- Sitemap: 33 country sitemaps, 22,497 URLs = 22,299 stations + 6 fixed URLs per
  country. 21 distinct `lastmod` dates in the Colombia sitemap.
- Index pages: US 4,170 links / 1.32 MB, FR 2,386 / 0.76 MB, CO 1,659 /
  0.56 MB, JM 67 / 0.08 MB; unknown country returns 404.

## Delivery

- Commits `a0794760` (T1) and `366bf9fe` (T2), fast-forwarded to `master` and
  deployed on 2026-10-13.
- Verified in production: 33 country sitemaps, 22,497 URLs; `/radio/co/todas`,
  `/radio/us/todas` and `/radio/au/todas` return 200 with 1,659 / 4,170 / 906
  links; country pages link to their index.

## Pending

- Resubmit `sitemap.xml` in Search Console (owner action).
- Engram mirror `odd/crawlable-catalog/tasks` pending (server unavailable).

## Follow-ups found, out of scope

- Station pages (`/radio/[country]/[slug]`) have no `generateStaticParams`, so
  they render on every request (`Cache-Control: no-store` in production).
- The `/stations/slugs/all` response (2.6 MB) exceeds the 2 MB Next data cache
  limit, so it is refetched on every uncached sitemap request.
- The US country page (`/radio/us`) weighs 2.97 MB of HTML because it
  serialises the whole catalog for the client-side grid.

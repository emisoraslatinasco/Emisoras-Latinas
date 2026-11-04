/**
 * Region slugs for /radio/<country>/region/<slug>.
 *
 * Despite its name, the station column `ciudad` holds the first-level region
 * (department, province, state). Raw values are noisy: administrative prefixes
 * ("Departamento de Antioquia"), accent/case/whitespace variants ("Bogotá" /
 * "Bogota", "SANTIAGO", "Barahona "), and oddities ("Veracruz-Llave").
 * Display labels are cleaned, the slug is derived from the label, and raw
 * variants that share a slug are merged under one URL.
 */

import { slugify } from "@/utils/genreSlug";

/** Regions with fewer active stations are thin content: 404 and not in sitemap. */
export const MIN_STATIONS_PER_REGION = 5;

export interface RegionContext {
  /** ISO-like country code, upper case ("CO", "MX", "AR"). */
  code?: string;
  /** Country display name; region values equal to it are ignored. */
  name?: string;
}

/** lowercase, accents and punctuation stripped, single spaces. */
function normalizeKey(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const ADMIN_PREFIX =
  /^(?:departamento|provincia|estado|regi[oó]n|region|state|province|comunidad)\s+(?:de\s+la|de\s+los|de\s+las|del|de|of\s+the|of)\s+/i;

const SMALL_WORDS = new Set(["de", "del", "la", "las", "los", "el", "y", "e", "of", "the"]);

function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((word, i) =>
      i > 0 && SMALL_WORDS.has(word)
        ? word
        : word.replace(/(^|[-(])(\p{L})/gu, (_m, sep: string, ch: string) => sep + ch.toUpperCase()),
    )
    .join(" ");
}

/** Cleaned display label for a raw region value ("" when unusable). */
export function regionLabel(raw: string | null | undefined, ctx: RegionContext = {}): string {
  if (!raw) return "";
  let label = raw.replace(/\s+/g, " ").trim().replace(/[.,;]+$/, "").trim();
  if (!/[\p{L}\p{N}]/u.test(label)) return "";

  const key = normalizeKey(label);
  const isAr = !ctx.code || ctx.code === "AR";
  const isMx = !ctx.code || ctx.code === "MX";

  // Known oddities first (they would otherwise be mangled by prefix stripping).
  if (["veracruz llave", "veracruz de ignacio de la llave"].includes(key)) return "Veracruz";
  if (["bogota d c", "bogota dc", "bogota"].includes(key)) return "Bogotá";
  if (isMx && ["distrito federal", "ciudad de mexico", "cdmx", "mexico city"].includes(key)) {
    return "Ciudad de México";
  }
  if (isAr && ["ciudad autonoma de buenos aires", "capital federal", "caba"].includes(key)) {
    return "Buenos Aires (CABA)";
  }
  if (key === "provincia de buenos aires") return "Provincia de Buenos Aires";

  // ALL-CAPS values ("SANTIAGO") -> Title Case; short codes ("NY") stay as is.
  if (label.length > 3 && label === label.toUpperCase()) label = titleCase(label);

  const stripped = label.replace(ADMIN_PREFIX, "").trim();
  // "Estado de México" must not collapse into the country name.
  if (stripped && (!ctx.name || normalizeKey(stripped) !== normalizeKey(ctx.name))) {
    label = stripped;
  }
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/** Canonical slug for a raw region value ("" when unusable or the country itself). */
export function regionSlug(raw: string | null | undefined, ctx: RegionContext = {}): string {
  const label = regionLabel(raw, ctx);
  if (!label) return "";
  if (ctx.name && normalizeKey(label) === normalizeKey(ctx.name)) return "";
  return slugify(label);
}

export interface RegionGroup<S> {
  slug: string;
  label: string;
  stations: S[];
}

/**
 * Groups stations by canonical region slug. Variants that share a slug merge;
 * the group label is the most frequent cleaned label (ties prefer accents).
 * Result is a Map in descending station-count order.
 */
export function groupStationsByRegion<S extends { ciudad?: string | null }>(
  stations: S[],
  ctx: RegionContext = {},
): Map<string, RegionGroup<S>> {
  const groups = new Map<string, RegionGroup<S>>();
  const labelVotes = new Map<string, Map<string, number>>();

  for (const station of stations) {
    const label = regionLabel(station.ciudad, ctx);
    const slug = regionSlug(station.ciudad, ctx);
    if (!slug) continue;
    const group = groups.get(slug) ?? { slug, label, stations: [] };
    group.stations.push(station);
    groups.set(slug, group);
    const votes = labelVotes.get(slug) ?? new Map<string, number>();
    votes.set(label, (votes.get(label) ?? 0) + 1);
    labelVotes.set(slug, votes);
  }

  for (const [slug, votes] of labelVotes) {
    let best = "";
    let bestScore = -1;
    for (const [label, n] of votes) {
      const score = n * 2 + (/[^\x00-\x7f]/.test(label) ? 1 : 0);
      if (score > bestScore) {
        best = label;
        bestScore = score;
      }
    }
    const group = groups.get(slug);
    if (group) group.label = best;
  }

  return new Map([...groups].sort((a, b) => b[1].stations.length - a[1].stations.length));
}

/** Groups that reach MIN_STATIONS_PER_REGION, in descending count order. */
export function qualifyingRegions<S>(groups: Map<string, RegionGroup<S>>): RegionGroup<S>[] {
  return [...groups.values()].filter((g) => g.stations.length >= MIN_STATIONS_PER_REGION);
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export interface ResolvedRegion<S> {
  group: RegionGroup<S>;
  /** True when the incoming param already was the canonical slug. */
  isCanonical: boolean;
}

/**
 * Resolves a URL param (canonical slug, raw legacy value, any case/accents) to
 * a region group. Returns null when nothing matches.
 */
export function resolveRegionParam<S>(
  param: string,
  groups: Map<string, RegionGroup<S>>,
  ctx: RegionContext = {},
): ResolvedRegion<S> | null {
  const decoded = safeDecode(param);
  const candidates = [decoded, regionSlug(decoded, ctx), slugify(decoded)];
  for (const candidate of candidates) {
    const group = candidate ? groups.get(candidate) : undefined;
    if (group) return { group, isCanonical: param === group.slug };
  }
  return null;
}

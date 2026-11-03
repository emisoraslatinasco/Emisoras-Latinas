/**
 * Genre slugs for /radio/<country>/genero/<slug>.
 *
 * The API stores genres with raw English names ("Christian", "Pop Music"),
 * some with scraping artifacts ("Categoria: \nRock", mojibake). Users search in
 * Spanish, so the canonical slug is the slugified Spanish display label:
 * "Christian" -> "cristiana", "Pop Music" -> "pop".
 *
 * Several raw names may deliberately share one slug (synonyms and scraping
 * duplicates such as "News" / "Noticias" / "Categoria: \nNews"); the genre page
 * then merges their stations under a single URL.
 */

// Keys: cleaned raw genre name, lowercased. Values: Spanish display label.
const GENRE_LABELS_ES: Record<string, string> = {
  "aaa - adult album alternative": "Adulto Alternativo",
  "adult contemporary": "Adulto Contemporáneo",
  "alternative rock": "Rock Alternativo",
  "arabic music": "Música Árabe",
  "brazilian music": "Música Brasileña",
  "children’s music": "Música Infantil",
  "christian contemporary": "Cristiana Contemporánea",
  "classic country": "Country Clásico",
  "classic hits": "Clásicos",
  "classic rock": "Rock Clásico",
  "edm - electronic dance music": "Música Electrónica de Baile",
  "easy listening": "Música Suave",
  "euro hits": "Éxitos Europeos",
  "mexican music": "Música Mexicana",
  "modern rock": "Rock Moderno",
  "pop music": "Pop",
  "smooth jazz": "Jazz Suave",
  "soundtracks": "Bandas Sonoras",
  "top 40": "Top 40",
  "world music": "Música del Mundo",
  "bossa nova": "Bossa Nova",
  "hip hop": "Hip Hop",
  "hot ac": "Hot AC",
  "latín pop": "Pop Latino",
  "música tropical": "Música Tropical",
  "news podcast": "Podcast de Noticias",
  "r&b": "R&B",
  bailables: "Bailables",
  baladas: "Baladas",
  business: "Negocios",
  caribbean: "Caribeña",
  catholic: "Católica",
  chillout: "Chillout",
  christian: "Cristiana",
  christmas: "Navidad",
  classical: "Clásica",
  clásicos: "Clásicos",
  college: "Universitaria",
  comedy: "Comedia",
  community: "Comunitaria",
  country: "Country",
  cultura: "Cultura",
  culture: "Cultura",
  dance: "Dance",
  deportes: "Deportes",
  disco: "Disco",
  eclectic: "Ecléctica",
  educational: "Educativa",
  electronic: "Electrónica",
  ethnic: "Étnica",
  folk: "Folk",
  gospel: "Gospel",
  indie: "Indie",
  international: "Internacional",
  islam: "Islam",
  jazz: "Jazz",
  latino: "Latina",
  local: "Local",
  lounge: "Lounge",
  metal: "Metal",
  música: "Música",
  news: "Noticias",
  noticias: "Noticias",
  oldies: "Oldies",
  public: "Pública",
  reggae: "Reggae",
  reggaeton: "Reggaeton",
  regional: "Regional",
  religious: "Religiosa",
  rock: "Rock",
  romantic: "Romántica",
  scanner: "Scanner",
  soul: "Soul",
  spirituality: "Espiritualidad",
  sports: "Deportes",
  talk: "Hablada",
  techno: "Techno",
  traffic: "Tráfico",
  variety: "Variedad",
};

/** Strips scraping artifacts: "Categoria: \nRock" prefixes and mojibake. */
export function cleanGenreName(raw: string): string {
  return raw
    .replace(/â€™/g, "’")
    .replace(/^\s*categor(?:ia|ies)\s*:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Spanish display label for a raw genre name (cleaned name if unmapped). */
export function genreLabelEs(raw: string): string {
  const cleaned = cleanGenreName(raw);
  return GENRE_LABELS_ES[cleaned.toLowerCase()] ?? cleaned;
}

/** lowercase, accents stripped, non-alphanumerics -> "-", trimmed. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/r&b/g, "rnb")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Canonical slug for a raw genre name. */
export function genreSlug(raw: string): string {
  return slugify(genreLabelEs(raw));
}

/** Safe decodeURIComponent (malformed escapes return the input as-is). */
function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export interface ResolvedGenre {
  /** Canonical slug for the URL. */
  slug: string;
  /** Spanish display label. */
  label: string;
  /** Raw API genre names that belong to this slug (use them to filter). */
  names: string[];
  /** True when the incoming param already was the canonical slug. */
  isCanonical: boolean;
}

/**
 * Resolves an incoming URL param (canonical slug, legacy raw name in any case,
 * or a Spanish label) to a genre among `availableGenres` (raw names present in
 * the country). Returns null when nothing matches.
 */
export function resolveGenreParam(
  param: string,
  availableGenres: string[],
): ResolvedGenre | null {
  const decoded = safeDecode(param);
  const bySlug = new Map<string, string[]>();
  for (const name of availableGenres) {
    const s = genreSlug(name);
    if (!s) continue;
    const list = bySlug.get(s);
    if (list) list.push(name);
    else bySlug.set(s, [name]);
  }

  // Candidates in priority order: already canonical, legacy raw name, bare slugify.
  const candidates = [decoded, genreSlug(decoded), slugify(decoded)];
  for (const candidate of candidates) {
    const names = bySlug.get(candidate);
    if (names) {
      return {
        slug: candidate,
        label: genreLabelEs(names[0]),
        names,
        isCanonical: param === candidate,
      };
    }
  }
  return null;
}

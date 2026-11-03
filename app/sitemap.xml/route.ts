import { countries } from "@/data/stationsByCountry";

// Sitemap-index real: /sitemap.xml apunta a un sitemap por país en
// /sitemaps/[country]. Estructura jerárquica que Google entiende mejor que
// una lista plana con miles de URLs.
export const dynamic = "force-static";
export const revalidate = 86400;

// Derivado de `countries`: la lista escrita a mano se había quedado en 27 de
// los 33 países y dejaba 6 fuera del sitemap.
const COUNTRY_CODES = countries.map((c) => c.code.toLowerCase());

// No <lastmod>: this index does not load station data, and a request-time date
// would be discarded by Google as unreliable. Omitting it is the honest option.
export async function GET() {
  const baseUrl = "https://www.emisoraslatinas.online";

  const sitemaps = COUNTRY_CODES.map(
    (code) => `  <sitemap>
    <loc>${baseUrl}/sitemaps/${code}</loc>
  </sitemap>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

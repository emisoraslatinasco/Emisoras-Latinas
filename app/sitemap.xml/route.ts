// Sitemap-index real: /sitemap.xml apunta a los 27 sitemaps por país que están
// en /sitemaps/[country]. Estructura jerárquica que Google entiende mejor que
// una lista plana con miles de URLs.
export const dynamic = "force-static";
export const revalidate = 86400;

const COUNTRY_CODES = [
  "co", "ar", "pe", "br", "ve", "ec", "mx", "gt", "bo", "sv",
  "hn", "ni", "jm", "pr", "do", "ua", "uy", "cl", "cr", "dk",
  "es", "pt", "tt", "us", "gb", "fr", "it",
];

export async function GET() {
  const baseUrl = "https://www.emisoraslatinas.online";
  const lastmod = new Date().toISOString();

  const sitemaps = COUNTRY_CODES.map(
    (code) => `  <sitemap>
    <loc>${baseUrl}/sitemaps/${code}</loc>
    <lastmod>${lastmod}</lastmod>
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

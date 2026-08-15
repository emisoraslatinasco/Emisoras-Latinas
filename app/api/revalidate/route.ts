import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// Webhook de revalidación on-demand. Lo llama el BACKEND tras crear/editar/
// borrar/VIP una emisora, para que el cambio se refleje al instante sin
// esperar el TTL de 30 días de la página. Protegido por un secreto compartido
// (REVALIDATE_SECRET) que debe coincidir en frontend (Vercel) y backend (Render).
//
// Payload esperado (POST JSON):
//   { "slug": "radio-caracol-897", "country": "co", "sitemap": true }
// - slug + country  -> invalida la página de esa emisora (tag + path)
// - sitemap: true   -> además invalida la lista de slugs de los sitemaps
//                      (para altas/bajas de emisoras)
//
// El secreto viaja en la cabecera `x-revalidate-secret`.

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected) {
    return NextResponse.json(
      { revalidated: false, error: 'REVALIDATE_SECRET no configurado en el frontend' },
      { status: 500 },
    );
  }
  if (secret !== expected) {
    return NextResponse.json({ revalidated: false, error: 'No autorizado' }, { status: 401 });
  }

  let body: { slug?: string; country?: string; sitemap?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ revalidated: false, error: 'JSON inválido' }, { status: 400 });
  }

  const { slug, country, sitemap } = body;
  const revalidated: string[] = [];

  // Next 16: revalidateTag exige un perfil. `{ expire: 0 }` = expiración
  // inmediata (la siguiente petición regenera con datos frescos), ideal para
  // que el admin vea su edición al instante.
  if (slug) {
    revalidateTag(`station-${slug}`, { expire: 0 });
    revalidated.push(`tag:station-${slug}`);
    if (country) {
      revalidatePath(`/radio/${country.toLowerCase()}/${slug}`, 'page');
      revalidated.push(`path:/radio/${country.toLowerCase()}/${slug}`);
    }
  }

  // Altas/bajas de emisoras cambian la lista de slugs de los sitemaps
  // Y el listado de la página de país (que antes quedaba servido stale
  // hasta las 6h de su propio ISR).
  if (sitemap) {
    revalidateTag('sitemap-slugs', { expire: 0 });
    revalidated.push('tag:sitemap-slugs');

    if (country) {
      revalidatePath(`/radio/${country.toLowerCase()}`, 'page');
      revalidated.push(`path:/radio/${country.toLowerCase()}`);
    }
  }

  if (revalidated.length === 0) {
    return NextResponse.json(
      { revalidated: false, error: 'Falta slug (y opcionalmente country/sitemap)' },
      { status: 400 },
    );
  }

  return NextResponse.json({ revalidated: true, now: Date.now(), items: revalidated });
}

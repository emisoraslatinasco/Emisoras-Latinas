import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página no encontrada | Emisoras Latinas',
  description: 'La página que buscas no existe. Explora más de 20.000 emisoras de radio en vivo gratis de Latinoamérica.',
  robots: { index: false, follow: true },
};

const topCountries = [
  { code: 'co', name: 'Colombia' },
  { code: 'mx', name: 'México' },
  { code: 'ar', name: 'Argentina' },
  { code: 'pe', name: 'Perú' },
  { code: 'es', name: 'España' },
  { code: 'us', name: 'Estados Unidos' },
  { code: 'cl', name: 'Chile' },
  { code: 'ec', name: 'Ecuador' },
  { code: 've', name: 'Venezuela' },
  { code: 'br', name: 'Brasil' },
  { code: 'fr', name: 'Francia' },
  { code: 'it', name: 'Italia' },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-slate-700 mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-4">Página no encontrada</h1>
        <p className="text-slate-400 mb-8">
          La emisora o página que buscas no está disponible. Explora nuestro directorio con más de 20.000 radios en vivo de Latinoamérica.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {topCountries.map((c) => (
            <Link
              key={c.code}
              href={`/radio/${c.code}`}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm transition-colors border border-slate-700/50"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-semibold"
        >
          <i className="fas fa-home"></i>
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}

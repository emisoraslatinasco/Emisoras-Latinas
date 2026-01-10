import { Footer } from '@/components/layout';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Términos y Condiciones | Emisoras Latinas',
  description: 'Términos y condiciones de uso de Emisoras Latinas.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logos_general/logo_miniatura_emisoras_latinas.jpg.png"
              alt="Emisoras Latinas"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-white font-bold text-xl">Emisoras Latinas</span>
          </Link>
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            <i className="fas fa-arrow-left mr-2"></i>
            Volver
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl text-slate-300">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-slate-700 pb-4">
            Términos y Condiciones
          </h1>

          <div className="space-y-6">
            <p>
              ¡Bienvenido a Emisoras Latinas! Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Emisoras Latinas, ubicado en https://www.emisoraslatinas.online.
            </p>
            <p>
              Al acceder a este sitio web asumimos que aceptas estos términos y condiciones. No continúes usando Emisoras Latinas si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Licencia</h2>
            <p>
              A menos que se indique lo contrario, Emisoras Latinas y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en Emisoras Latinas. Todos los derechos de propiedad intelectual son reservados. Puedes acceder a esto desde Emisoras Latinas para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.
            </p>
            <p>No debes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Republicar material de Emisoras Latinas.</li>
              <li>Vender, alquilar o sublicenciar material de Emisoras Latinas.</li>
              <li>Reproducir, duplicar o copiar material de Emisoras Latinas.</li>
              <li>Redistribuir contenido de Emisoras Latinas sin permiso expreso.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Propiedad Intelectual de Terceros</h2>
            <p>
              Las marcas registradas, logotipos y nombres de las emisoras de radio mostradas en este sitio son propiedad de sus respectivos dueños. Emisoras Latinas actúa únicamente como un directorio facilitador de acceso a streams públicos y no reclama propiedad sobre las transmisiones de audio ni los logotipos de las estaciones, salvo que se indique lo contrario. Si usted es propietario de una emisora y desea retirarla de nuestro directorio, contáctenos inmediatamente.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Limitación de Responsabilidad</h2>
            <p>
              Emisoras Latinas no garantiza que el sitio web esté disponible de forma ininterrumpida o libre de errores. Los enlaces a las transmisiones de audio (streaming) son proporcionados por terceros y pueden estar sujetos a interrupciones ajenas a nuestro control. En ningún caso Emisoras Latinas será responsable de cualquier daño indirecto, consecuente o especial que surja del uso o la imposibilidad de uso de este sitio.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Enlaces a Otros Sitios Web</h2>
            <p>
              Nuestro Servicio puede contener enlaces a sitios web o servicios de terceros que no son propiedad ni están controlados por Emisoras Latinas. Emisoras Latinas no tiene control ni asume responsabilidad por el contenido, las políticas de privacidad o las prácticas de sitios web o servicios de terceros.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Cambios en los Términos</h2>
            <p>
              Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Al continuar accediendo o utilizando nuestro Servicio después de que esas revisiones entren en vigencia, aceptas estar sujeto a los términos revisados.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre estos Términos, por favor contáctenos en: <strong>emisoraslatinasco@gmail.com</strong>.
            </p>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}

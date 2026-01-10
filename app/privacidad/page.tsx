import { Footer } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Política de Privacidad | Emisoras Latinas",
  description:
    "Política de privacidad y protección de datos de Emisoras Latinas. Requisitos de cookies y AdSense.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
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
            <span className="text-white font-bold text-xl">
              Emisoras Latinas
            </span>
          </Link>
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Volver
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl text-slate-300">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-slate-700 pb-4">
            Política de Privacidad
          </h1>

          <div className="space-y-6">
            <p>
              En <strong>Emisoras Latinas</strong> (en adelante, &quot;el
              Sitio&quot;), accesible desde https://www.emisoraslatinas.online,
              una de nuestras principales prioridades es la privacidad de
              nuestros visitantes. Este documento de Política de Privacidad
              contiene tipos de información que es recopilada y registrada por
              Emisoras Latinas y cómo la utilizamos.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              1. Archivos de Registro (Log Files)
            </h2>
            <p>
              Emisoras Latinas sigue un procedimiento estándar de uso de
              archivos de registro. Estos archivos registran a los visitantes
              cuando visitan sitios web. La información recopilada por los
              archivos de registro incluye direcciones de protocolo de Internet
              (IP), tipo de navegador, proveedor de servicios de Internet (ISP),
              fecha y hora, páginas de referencia/salida y posiblemente el
              número de clics. Estos no están vinculados a ninguna información
              que sea personalmente identificable.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              2. Cookies y Web Beacons
            </h2>
            <p>
              Como cualquier otro sitio web, Emisoras Latinas utiliza
              &quot;cookies&quot;. Estas cookies se utilizan para almacenar
              información, incluidas las preferencias de los visitantes y las
              páginas del sitio web que el visitante accedió o visitó. La
              información se utiliza para optimizar la experiencia de los
              usuarios personalizando el contenido de nuestra página web según
              el tipo de navegador de los visitantes y/u otra información.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              3. Cookie de Google DoubleClick DART
            </h2>
            <p>
              Google es uno de los proveedores externos en nuestro sitio.
              También utiliza cookies, conocidas como cookies DART, para
              publicar anuncios a los visitantes de nuestro sitio en función de
              su visita a www.emisoraslatinas.online y otros sitios en Internet.
              Sin embargo, los visitantes pueden optar por rechazar el uso de
              cookies DART visitando la Política de privacidad de la red de
              contenido y anuncios de Google en la siguiente URL:{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                https://policies.google.com/technologies/ads
              </a>
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              4. Políticas de Privacidad de Socios Publicitarios
            </h2>
            <p>
              Servidores de anuncios de terceros o redes publicitarias utilizan
              tecnologías como cookies, JavaScript o Web Beacons que se utilizan
              en sus respectivos anuncios y enlaces que aparecen en Emisoras
              Latinas, los cuales son enviados directamente al navegador de los
              usuarios. Reciben automáticamente su dirección IP cuando esto
              ocurre. Estas tecnologías se utilizan para medir la efectividad de
              sus campañas publicitarias y/o para personalizar el contenido
              publicitario que ve en los sitios web que visita.
            </p>
            <p>
              Tenga en cuenta que Emisoras Latinas no tiene acceso ni control
              sobre estas cookies que son utilizadas por anunciantes de
              terceros.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              5. Información para Niños
            </h2>
            <p>
              Otra parte de nuestra prioridad es agregar protección para los
              niños mientras usan Internet. Emisoras Latinas no recopila a
              sabiendas ninguna Información de Identificación Personal de niños
              menores de 13 años.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              6. Contacto
            </h2>
            <p>
              Si tiene preguntas adicionales o requiere más información sobre
              nuestra Política de Privacidad, no dude en contactarnos a través
              del correo electrónico:{" "}
              <strong>emisoraslatinasco@gmail.com</strong>.
            </p>

            <p className="text-xs text-slate-500 mt-8">
              Última actualización: 10 de Enero de 2026.
            </p>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}

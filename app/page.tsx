import { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: { absolute: "Emisoras Latinas · +21.000 Radios En Vivo Gratis 24/7" },
  description:
    "Escucha más de 21.000 emisoras de radio en vivo de Latinoamérica, España, Estados Unidos y Europa. Streaming gratis 24/7 sin cortes ni registro. ¡Dale play!",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.emisoraslatinas.online/",
    title: "Emisoras Latinas · +21.000 Radios En Vivo Gratis 24/7",
    description:
      "El directorio más completo de radio online de Latinoamérica. 27 países, +21.000 emisoras en vivo, gratis, sin registro.",
    siteName: "Emisoras Latinas",
    locale: "es_CO",
    images: [
      {
        url: "/logos_general/logo_emisoras_latinas.jpg",
        width: 1200,
        height: 630,
        alt: "Emisoras Latinas - Radio Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emisoras Latinas · +21.000 Radios En Vivo Gratis",
    description:
      "Radio online de Latinoamérica, España, USA y Europa. Streaming 24/7 sin cortes.",
    images: ["/logos_general/logo_emisoras_latinas.jpg"],
  },
};

export default function Page() {
  return <HomePage />;
}

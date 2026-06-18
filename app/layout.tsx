import * as React from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { RadioProvider } from "@/context/RadioContext";
import CookieConsent from "@/components/ui/CookieConsent";
import SeoJsonLd from "@/components/seo/JsonLd";
import DynamicLang from "@/components/seo/DynamicLang";
import MonetagAds from "@/components/ads/MonetagAds";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// viewport export separado (Next.js 15+). Antes estaba implícito; ser explícito
// apaga warnings de mobile usability en Google Search Console.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.emisoraslatinas.online'),
  title: {
    // default: usado solo cuando una página no aporta su propio title (raro). 51 chars, cabe en SERP.
    default: 'Emisoras Latinas - +20.000 Radios Gratis Online 24/7',
    // template: se concatena a cada page.title. Recortado de 53 → 19 chars para no comerse el SERP.
    template: '%s | Emisoras Latinas',
  },
  description: 'Escucha ahora +20.000 emisoras de Latinoamérica gratis. Radio en vivo 24/7 sin cortes. App gratis, streaming HD. Colombia, México, Argentina y más.',
  keywords: [
    'escuchar radio colombia',
    'radio en vivo gratis',
    'emisoras colombianas en vivo',
    'radio online gratis',
    'emisoras latinas',
    'radio cristiana en vivo',
    'salsa radio online',
    'vallenato en vivo',
    'noticias radio colombia',
    'caracol radio en vivo',
    'rcn radio',
    'blu radio',
    'radio argentina online',
    'radio mexico en vivo',
    'streaming radio latinoamerica'
  ],
  authors: [{ name: 'Emisoras Latinas', url: 'https://www.emisoraslatinas.online' }],
  creator: 'Emisoras Latinas',
  publisher: 'Emisoras Latinas',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/logos_general/logo_miniatura_emisoras_latinas.jpg', type: 'image/jpeg', sizes: '32x32' },
      { url: '/logos_general/logo_miniatura_emisoras_latinas.jpg', type: 'image/jpeg', sizes: '16x16' },
    ],
    apple: '/logos_general/logo_miniatura_emisoras_latinas.jpg',
    shortcut: '/logos_general/logo_miniatura_emisoras_latinas.jpg',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.emisoraslatinas.online/',
    title: 'Emisoras Latinas - Radio Online Gratis en Vivo',
    description: 'Escucha las mejores emisoras de radio online de Colombia y Latinoamérica. Música cristiana, salsa, vallenato, noticias y más. Streaming gratis 24/7.',
    siteName: 'Emisoras Latinas',
    locale: 'es_CO',
    images: [
      {
        url: '/logos_general/logo_emisoras_latinas.jpg',
        width: 1200,
        height: 630,
        alt: 'Emisoras Latinas - Radio Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emisoras Latinas - Escuchar Radio en Vivo Gratis',
    description: 'Directorio de radios online de Latinoamérica. +21,000 emisoras de Colombia, Argentina, México y más.',
    images: ['/logos_general/logo_emisoras_latinas.jpg'],
    creator: '@emisoraslatinas',
  },
  verification: {
    // PASO 5: pega aquí tu código de verificación de Google Search Console.
    // search.google.com/search-console → Configuración → Verificación →
    // Etiqueta HTML → copia SOLO el valor del atributo content (sin comillas).
    // Ej: google: 'A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0',
    google: '',
  },
  category: 'entertainment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        {/* Pre-conectar dominios de terceros antes de que los scripts los usen */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        {/* Google Consent Mode v2 — estado por defecto DENEGADO hasta que el
            usuario acepte en el banner de cookies. Cumple GDPR/ePrivacy y lo usa
            GA4 para el consentimiento de analytics. CookieConsent.tsx hace el
            gtag('consent','update',...) al aceptar/rechazar. beforeInteractive
            para que se ejecute antes que GA4. */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500
});`}
        </Script>
        {/* Google Analytics 4 — G-P9TELHQ4YF. afterInteractive para no bloquear LCP. */}
        <Script
          id="ga4-loader"
          src="https://www.googletagmanager.com/gtag/js?id=G-P9TELHQ4YF"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-P9TELHQ4YF');`}
        </Script>
        {/* Monetag: formatos NO intrusivos In-Page Push + Vignette, cargados con
            un simple <script> (sin service worker ni permiso de notificaciones;
            el formato Push clásico sigue retirado en public/sw.js). Las zonas se
            configuran dentro de MonetagAds.tsx. */}
        <MonetagAds />
        <SeoJsonLd />
        <link rel="icon" type="image/jpeg" href="/logos_general/logo_miniatura_emisoras_latinas.jpg" />
        <link rel="shortcut icon" type="image/jpeg" href="/logos_general/logo_miniatura_emisoras_latinas.jpg" />
        <link rel="apple-touch-icon" href="/logos_general/logo_miniatura_emisoras_latinas.jpg" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <RadioProvider>
            {children}
            {/* AudioPlayer eliminado - La reproducción solo ocurre en páginas individuales */}
            <DynamicLang />
            <CookieConsent />
          </RadioProvider>
        </Providers>
        {/* Botón flotante de WhatsApp, visible en todas las páginas */}
        <WhatsAppButton />
      </body>
    </html>
  );
}


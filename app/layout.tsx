import * as React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { RadioProvider } from "@/context/RadioContext";
import CookieConsent from "@/components/ui/CookieConsent";
import SeoJsonLd from "@/components/seo/JsonLd";
import AdInterferenceGuard from "@/components/ads/AdInterferenceGuard";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
    google: '', // Agregar código de Google Search Console
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
        <Script
          id="adsbygoogle"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2219150000991117"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="monetag-push"
          src="https://5gvci.com/act/files/tag.min.js?z=11061710"
          strategy="afterInteractive"
          data-cfasync="false"
        />
        {/* Monetag Vignette Banner — full-screen entre transiciones */}
        <Script id="monetag-vignette" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='11061798',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>
        {/* Monetag In-Page Push / Social Bar — banner discreto in-page */}
        <Script id="monetag-inpage" strategy="lazyOnload">
          {`(function(s){s.dataset.zone='11061802',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>
        {/* Monetag Onclick / Popunder — frequency cap 1/24h en dashboard */}
        <Script id="monetag-onclick" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='11061806',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>
        <SeoJsonLd />
        <link rel="icon" type="image/jpeg" href="/logos_general/logo_miniatura_emisoras_latinas.jpg" />
        <link rel="shortcut icon" type="image/jpeg" href="/logos_general/logo_miniatura_emisoras_latinas.jpg" />
        <link rel="apple-touch-icon" href="/logos_general/logo_miniatura_emisoras_latinas.jpg" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* Google AdSense */}
      
        <Providers>
          <RadioProvider>
            {children}
            {/* AudioPlayer eliminado - La reproducción solo ocurre en páginas individuales */}
            <AdInterferenceGuard />
            <CookieConsent />
          </RadioProvider>
        </Providers>
      </body>
    </html>
  );
}


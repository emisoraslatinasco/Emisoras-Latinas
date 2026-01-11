import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { RadioProvider } from "@/context/RadioContext";
import { AudioPlayer } from "@/components/radio";
import CookieConsent from "@/components/ui/CookieConsent";
import SeoJsonLd from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.emisoraslatinas.online'),
  title: {
    default: 'Emisoras Latinas - Escuchar Radio Colombia y Latinoamérica en Vivo Gratis',
    template: '%s | Emisoras Latinas'
  },
  description: 'Directorio de Radio Online #1 de Latinoamérica. Escucha gratis +1000 emisoras de Colombia, Argentina, México, Perú y más. Radio en vivo 24/7: música cristiana, salsa, vallenato, noticias, deportes. Sin descargas, streaming HD.',
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
    icon: '/logos_general/logo_miniatura_emisoras_latinas.jpg.png',
    apple: '/logos_general/logo_miniatura_emisoras_latinas.jpg.png',
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
    description: 'Directorio de radios online de Latinoamérica. +1000 emisoras de Colombia, Argentina, México y más.',
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
        <SeoJsonLd />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <RadioProvider>
            {children}
            <AudioPlayer />
            <CookieConsent />
          </RadioProvider>
        </Providers>
      </body>
    </html>
  );
}

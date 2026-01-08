import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { RadioProvider } from "@/context/RadioContext";
import { AudioPlayer } from "@/components/radio";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emisoras Latinas - Radio Online Gratis | Música Cristiana, Salsa, Noticias en Vivo",
  description: "Directorio de Emisoras de Radio Online - Escucha gratis tus radios favoritas en vivo. Música cristiana, salsa, noticias y más. Streaming HD 24/7 sin descargas.",
  keywords: "radio online, emisoras latinas, radio en vivo, música cristiana online, salsa radio, radios gratis, streaming radio, emisoras cristianas, noticias en vivo, radio tropical",
  authors: [{ name: "Emisoras Latinas" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://www.emisoraslatinas.com/",
    title: "Emisoras Latinas - Radio Online Gratis en Vivo",
    description: "Escucha las mejores emisoras de radio online: música cristiana, salsa, noticias y más. Streaming en vivo gratis las 24 horas.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emisoras Latinas - Radio Online Gratis",
    description: "Directorio de radios online. Escucha música cristiana, salsa, noticias en vivo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
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
          </RadioProvider>
        </Providers>
      </body>
    </html>
  );
}

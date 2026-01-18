import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Desactivar la optimización de imágenes de Vercel
    // para evitar el error 402 (límite de plan gratuito excedido)
    unoptimized: true,
  },
};

export default nextConfig;

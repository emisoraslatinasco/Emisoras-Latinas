import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permitir imágenes de cualquier dominio externo (por si algún logo es URL completa)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    // No optimizar imágenes externas (ya son JPGs optimizados)
    unoptimized: true,
  },
};

export default nextConfig;

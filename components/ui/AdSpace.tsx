"use client";

interface AdSpaceProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

/**
 * Slot de anuncios reservado. Actualmente retorna null (no renderiza nada).
 * Se descartó Google AdSense; estos espacios quedan libres para banners propios
 * o de afiliado (Amazon) si se quieren rellenar más adelante.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AdSpace(_props: AdSpaceProps) {
  return null;
}


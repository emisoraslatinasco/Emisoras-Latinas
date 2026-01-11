"use client";

interface AdSpaceProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

/**
 * Componente placeholder para anuncios de Google AdSense
 * Actualmente retorna null (vacío). Una vez aprobado en AdSense,
 * aquí se insertará el código real de anuncios automáticos.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AdSpace(_props: AdSpaceProps) {
  // Retornar null para no mostrar placeholders visibles
  // Google AdSense insertará los anuncios automáticamente una vez aprobado
  return null;
}


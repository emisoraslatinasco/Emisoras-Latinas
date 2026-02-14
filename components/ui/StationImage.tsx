'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

const DEFAULT_LOGO = '/logos_general/antena.png';

/**
 * Componente cliente que envuelve next/image con fallback automático.
 * Cuando la imagen principal falla (onError), muestra /logos_general/antena.png
 */
export default function StationImage(props: ImageProps) {
  const [src, setSrc] = useState(props.src);

  return (
    <Image
      {...props}
      src={src}
      onError={() => {
        if (src !== DEFAULT_LOGO) {
          setSrc(DEFAULT_LOGO);
        }
      }}
    />
  );
}

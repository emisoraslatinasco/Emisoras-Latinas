import { useState, useEffect } from 'react';

/**
 * Hook personalizado para debounce de valores
 * Previene ejecuciones excesivas de funciones costosas durante inputs rápidos
 * 
 * @param value - Valor a debounce
 * @param delay - Tiempo de espera en milisegundos (default: 300ms)
 * @returns Valor debounced después del delay especificado
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Configurar timer para actualizar el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar timeout si el valor cambia antes de que el delay termine
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  compact?: boolean;
}

export default function Pagination({ currentPage, totalPages, onPageChange, compact = false }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 4; // Mostrar 4 botones principales
    
    if (totalPages <= showPages + 2) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar primera página
      pages.push(1);
      
      // Determinar rango de páginas a mostrar
      let start: number;
      let end: number;
      
      if (currentPage <= 3) {
        // Cerca del inicio: mostrar 1, 2, 3, 4, ..., última
        start = 2;
        end = showPages;
      } else if (currentPage >= totalPages - 2) {
        // Cerca del final: mostrar 1, ..., (últimas 4 páginas)
        start = totalPages - showPages + 1;
        end = totalPages - 1;
      } else {
        // En el medio: mostrar 1, ..., actual-1, actual, actual+1, actual+2, ..., última
        start = currentPage - 1;
        end = currentPage + 2;
      }
      
      // Agregar puntos suspensivos si es necesario
      if (start > 2) {
        pages.push('...');
      }
      
      // Agregar páginas del rango
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }
      
      // Agregar puntos suspensivos finales si es necesario
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Siempre mostrar última página
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className={`flex items-center ${compact ? 'gap-1' : 'justify-center gap-2'}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-lg bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
          compact ? 'px-2 py-1.5 text-sm' : 'px-4 py-2'
        }`}
        aria-label="Página anterior"
      >
        ←
      </button>

      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`rounded-lg transition-all ${
              compact ? 'px-2.5 py-1.5 text-sm' : 'px-4 py-2'
            } ${
              currentPage === page
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/50'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
            aria-label={`Página ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={index} className={`text-slate-500 ${compact ? 'px-1' : 'px-2'}`}>
            {page}
          </span>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-lg bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
          compact ? 'px-2 py-1.5 text-sm' : 'px-4 py-2'
        }`}
        aria-label="Página siguiente"
      >
        →
      </button>
    </div>
  );
}
